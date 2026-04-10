import { Pool, QueryResult, QueryResultRow } from "pg";

declare global {
  var __ragPool: Pool | undefined;
}

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function createPool(): Pool {
  return new Pool({
    user: getRequiredEnv("DB_USER_APP"),
    password: getRequiredEnv("DB_PASSWORD_APP"),
    host: getRequiredEnv("DB_HOST_APP"),
    port: Number(getRequiredEnv("DB_PORT_APP")),
    database: getRequiredEnv("DB_NAME_APP"),
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

export function getPool(): Pool {
  if (!global.__ragPool) {
    global.__ragPool = createPool();
  }

  return global.__ragPool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
    text: string,
    values?: unknown[]
    ): Promise<QueryResult<T>> {
        return getPool().query<T>(text, values);
}

export async function closePool(): Promise<void> {
  if (global.__ragPool) {
    await global.__ragPool.end();
    global.__ragPool = undefined;
  }
}
