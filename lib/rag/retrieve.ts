import { query } from "@/lib/rag/db";

export type RetrievedChunk = {
  content: string;
  url: string;
  title: string;
  section: string | null;
  similarity: number;
};

export type RetrievalResult = {
  chunks: RetrievedChunk[];
  citations: string[];
};

type DbChunkRow = {
  content: string;
  url: string;
  title: string;
  section: string | null;
  similarity: number;
};

function toPgVectorLiteral(vector: number[]): string {
  return `[${vector.join(",")}]`;
}

function getTopK(): number {
  const value = Number(process.env.RAG_TOP_K || "5");
  if (!Number.isFinite(value) || value < 1) {
    return 5;
  }

  return Math.min(12, Math.floor(value));
}

function getSimilarityThreshold(): number {
  const value = Number(process.env.RAG_MIN_SIMILARITY || "0.45");
  if (!Number.isFinite(value) || value < 0 || value > 1) {
    return 0.45;
  }

  return value;
}

export async function retrieveRelevantChunks(
  queryEmbedding: number[]
): Promise<RetrievalResult> {
  const topK = getTopK();
  const threshold = getSimilarityThreshold();

  const vectorLiteral = toPgVectorLiteral(queryEmbedding);

  const result = await query<DbChunkRow>(
    `
      SELECT
        content,
        url,
        title,
        section,
        1 - (embedding <=> $1::vector) AS similarity
      FROM rag_chunks
      ORDER BY embedding <=> $1::vector
      LIMIT $2
    `,
    [vectorLiteral, topK]
  );

  const typedRows = result.rows as DbChunkRow[];
  const chunks: RetrievedChunk[] = typedRows.filter(
    (row: DbChunkRow) => row.similarity >= threshold
  );

  const citations: string[] = Array.from(
    new Set(chunks.map((row: RetrievedChunk) => row.url))
  ).slice(0, 5);

  return {
    chunks,
    citations,
  };
}
