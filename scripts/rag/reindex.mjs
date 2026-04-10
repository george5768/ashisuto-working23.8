import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import OpenAI from "openai";
import { Pool } from "pg";

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

let pool = null;
let openai = null;

const chunkSize = Number(process.env.RAG_CHUNK_SIZE || "700");
const chunkOverlap = Number(process.env.RAG_CHUNK_OVERLAP || "120");
const embeddingModel = process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small";

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function hashContent(value) {
  return createHash("sha256").update(value).digest("hex");
}

function chunkText(content) {
  const chunks = [];
  let start = 0;

  while (start < content.length) {
    const end = Math.min(start + chunkSize, content.length);
    const chunk = content.slice(start, end).trim();
    if (chunk.length > 0) {
      chunks.push(chunk);
    }

    if (end >= content.length) {
      break;
    }

    start = Math.max(0, end - chunkOverlap);
  }

  return chunks;
}

async function embedText(input) {
  if (!openai) {
    throw new Error("OpenAI client is not initialized.");
  }

  const response = await openai.embeddings.create({
    model: embeddingModel,
    input,
  });

  const embedding = response.data[0]?.embedding;
  if (!embedding) {
    throw new Error("Embedding creation failed.");
  }

  return embedding;
}

function normalizeRecordFields(raw, index) {
  const title = typeof raw.title === "string" ? normalizeWhitespace(raw.title) : "";
  const url = typeof raw.url === "string" ? raw.url.trim() : "";
  const section = typeof raw.section === "string" ? normalizeWhitespace(raw.section) : "";
  const content = typeof raw.content === "string" ? raw.content.trim() : "";

  if (!title) {
    throw new Error(`Record ${index} is missing required field: title`);
  }
  if (!url) {
    throw new Error(`Record ${index} is missing required field: url`);
  }
  if (!section) {
    throw new Error(`Record ${index} is missing required field: section`);
  }
  if (!content || content.length < 10) {
    throw new Error(`Record ${index} is missing required field: content`);
  }

  const sourceType = typeof raw.sourceType === "string" && raw.sourceType.trim()
    ? raw.sourceType.trim()
    : "manual";
  const sourceKey = typeof raw.sourceKey === "string" && raw.sourceKey.trim()
    ? raw.sourceKey.trim()
    : `manual:${index}:${hashContent(`${title}|${url}|${section}`)}`;

  return {
    sourceKey,
    sourceType,
    url,
    title,
    section,
    content,
  };
}

async function loadRecordsFromFile(inputPath) {
  const resolvedPath = path.isAbsolute(inputPath)
    ? inputPath
    : path.resolve(process.cwd(), inputPath);
  const raw = await readFile(resolvedPath, "utf8");
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new Error(`Invalid JSON in ${resolvedPath}: ${error.message}`);
  }

  if (!Array.isArray(parsed)) {
    throw new Error(`Input file must be a JSON array: ${resolvedPath}`);
  }

  return parsed.map((record, index) => normalizeRecordFields(record, index));
}

async function upsertRecord(record, dryRun) {
  if (dryRun) {
    return chunkText(record.content).length;
  }
  if (!pool) {
    throw new Error("Database pool is not initialized.");
  }

  const contentHash = hashContent(record.content);

  const upsertDocResult = await pool.query(
    `
      INSERT INTO rag_documents
        (source_key, source_type, url, title, section, content, content_hash, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      ON CONFLICT (source_key)
      DO UPDATE SET
        source_type = EXCLUDED.source_type,
        url = EXCLUDED.url,
        title = EXCLUDED.title,
        section = EXCLUDED.section,
        content = EXCLUDED.content,
        content_hash = EXCLUDED.content_hash,
        updated_at = NOW()
      RETURNING id
    `,
    [
      record.sourceKey,
      record.sourceType,
      record.url,
      record.title,
      record.section,
      record.content,
      contentHash,
    ]
  );

  const documentId = upsertDocResult.rows[0].id;

  await pool.query("DELETE FROM rag_chunks WHERE document_id = $1", [documentId]);

  const chunks = chunkText(record.content);
  for (let index = 0; index < chunks.length; index += 1) {
    const chunk = chunks[index];
    const embedding = await embedText(chunk);
    const vectorLiteral = `[${embedding.join(",")}]`;

    await pool.query(
      `
        INSERT INTO rag_chunks
          (document_id, chunk_index, content, embedding, url, title, section, source_type)
        VALUES ($1, $2, $3, $4::vector, $5, $6, $7, $8)
      `,
      [
        documentId,
        index,
        chunk,
        vectorLiteral,
        record.url,
        record.title,
        record.section,
        record.sourceType,
      ]
    );
  }

  return chunks.length;
}

async function run() {
  const args = process.argv.slice(2);
  let inputPath = "scripts/rag/input.json";
  let dryRun = false;

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--input") {
      inputPath = args[index + 1];
      index += 1;
      if (!inputPath) {
        throw new Error("--input requires a file path.");
      }
      continue;
    }
    if (arg === "--dry-run") {
      dryRun = true;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  const allRecords = await loadRecordsFromFile(inputPath);

  if (!dryRun) {
    pool = new Pool({
      user: required("DB_USER"),
      password: required("DB_PASSWORD"),
      host: required("DB_HOST"),
      port: Number(required("DB_PORT")),
      database: required("DB_NAME"),
      ssl: { rejectUnauthorized: false },
    });

    openai = new OpenAI({ apiKey: required("OPENAI_API_KEY") });
  }

  console.log(`Records prepared: ${allRecords.length}`);

  let totalChunks = 0;
  for (const record of allRecords) {
    const chunkCount = await upsertRecord(record, dryRun);
    totalChunks += chunkCount;
    const suffix = dryRun ? "(dry-run)" : "";
    console.log(`Indexed ${record.sourceKey} (${chunkCount} chunks) ${suffix}`);
  }

  console.log(`RAG indexing complete. Total chunks: ${totalChunks}`);
}

try {
  await run();
} finally {
  if (pool) {
    await pool.end();
  }
}
