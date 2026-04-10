import OpenAI from "openai";

function getEmbeddingModel(): string {
  return process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small";
}

function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is required for embeddings.");
  }

  return new OpenAI({ apiKey });
}

export async function createEmbedding(input: string): Promise<number[]> {
  const cleaned = input.trim();
  if (!cleaned) {
    throw new Error("Embedding input cannot be empty.");
  }

  const client = getOpenAIClient();
  const response = await client.embeddings.create({
    model: getEmbeddingModel(),
    input: cleaned,
  });

  const embedding = response.data[0]?.embedding;
  if (!embedding) {
    throw new Error("Failed to generate embedding.");
  }

  return embedding;
}
