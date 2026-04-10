import { readFile } from "node:fs/promises";
import path from "node:path";
import { Pool } from "pg";

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const pool = new Pool({
  user: required("DB_USER_APP"),
  password: required("DB_PASSWORD_APP"),
  host: required("DB_HOST_APP"),
  port: Number(required("DB_PORT_APP")),
  database: required("DB_NAME_APP"),
  ssl: {
    rejectUnauthorized: false,
  },
});

const migrations = [
  path.join(process.cwd(), "db", "migrations", "001_enable_pgvector.sql"),
  path.join(process.cwd(), "db", "migrations", "002_create_rag_tables.sql"),
];

try {
  for (const migrationPath of migrations) {
    const sql = await readFile(migrationPath, "utf8");
    await pool.query(sql);
    console.log(`Applied migration: ${path.basename(migrationPath)}`);
  }

  console.log("RAG migrations completed.");
} finally {
  await pool.end();
}
