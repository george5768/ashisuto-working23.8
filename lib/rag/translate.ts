import OpenAI from "openai";

function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is required for translation.");
  }

  return new OpenAI({ apiKey });
}

function getTranslationModel(): string {
  return process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini";
}

export async function translateToEnglishForRetrieval(
  input: string
): Promise<string> {
  const cleaned = input.trim();
  if (!cleaned) {
    return cleaned;
  }

  const client = getOpenAIClient();
  const completion = await client.chat.completions.create({
    model: getTranslationModel(),
    temperature: 0,
    max_tokens: 300,
    messages: [
      {
        role: "system",
        content:
          "Translate the user text into concise natural English for semantic retrieval. Preserve product names, URLs, and specific technical terms. Return only the translated text.",
      },
      {
        role: "user",
        content: cleaned,
      },
    ],
  });

  const translated = completion.choices[0]?.message?.content?.trim();
  return translated || cleaned;
}
