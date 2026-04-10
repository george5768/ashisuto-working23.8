import OpenAI from "openai";
import { NextResponse } from "next/server";
import { z } from "zod";

import { createEmbedding } from "@/lib/rag/embeddings";
import {
  buildGroundedSystemPrompt,
  buildGroundedUserPrompt,
} from "@/lib/rag/prompt";
import { retrieveRelevantChunks } from "@/lib/rag/retrieve";
import { translateToEnglishForRetrieval } from "@/lib/rag/translate";

const REQUEST_SCHEMA = z.object({
  message: z.string().trim().min(1).max(1000),
  lang: z.string().trim().min(1).max(16).optional(),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(1000),
      })
    )
    .max(12)
    .optional()
    .default([]),
});

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 12;
const rateLimitStore = new Map<string, RateLimitEntry>();

const SUPPORTED_SITE_LANGS = new Set(["EN", "JP", "TH", "CN", "TW", "BM"]);

const NO_CONTEXT_BY_LANG: Record<string, string> = {
  EN: "I do not have enough information from the current website content to answer that yet. Could you rephrase or ask about Ashisuto services, solutions, or contact details?",
  JP: "現在のウェブサイト内容だけでは十分な情報がなく、まだ回答できません。言い換えるか、Ashisuto のサービス・ソリューション・連絡先についてご質問ください。",
  TH: "ขณะนี้ฉันยังมีข้อมูลจากเนื้อหาเว็บไซต์ไม่เพียงพอที่จะตอบคำถามนี้ โปรดลองพิมพ์ใหม่ หรือสอบถามเกี่ยวกับบริการ โซลูชัน หรือข้อมูลติดต่อของ Ashisuto",
  CN: "根据当前网站内容，我暂时没有足够信息来回答这个问题。您可以换个问法，或咨询 Ashisuto 的服务、解决方案或联系方式。",
  TW: "根據目前網站內容，我暫時沒有足夠資訊回答這個問題。您可以換個問法，或詢問 Ashisuto 的服務、解決方案或聯絡方式。",
  BM: "Saya belum mempunyai maklumat yang mencukupi daripada kandungan laman web semasa untuk menjawab soalan itu. Boleh anda parafrasa, atau tanya tentang perkhidmatan, penyelesaian, atau maklumat hubungan Ashisuto?",
};

function normalizeSiteLanguage(lang?: string): string {
  const normalized = (lang || "EN").trim().toUpperCase();
  return SUPPORTED_SITE_LANGS.has(normalized) ? normalized : "EN";
}

function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  const realIp = req.headers.get("x-real-ip");
  return realIp || "unknown";
}

function checkRateLimit(key: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true };
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterSeconds = Math.ceil((existing.resetAt - now) / 1000);
    return { allowed: false, retryAfter: retryAfterSeconds };
  }

  existing.count += 1;
  rateLimitStore.set(key, existing);
  return { allowed: true };
}

function getAllowedOrigins(): string[] {
  const configured = process.env.CHATBOT_ALLOWED_ORIGINS;
  if (!configured) {
    return [];
  }

  return configured
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function isAllowedOrigin(req: Request): boolean {
  const allowedOrigins = getAllowedOrigins();
  if (allowedOrigins.length === 0) {
    return true;
  }

  const origin = req.headers.get("origin");
  if (!origin) {
    return false;
  }

  return allowedOrigins.includes(origin);
}

async function parseJsonSafely(req: Request): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

function getModel(): string {
  return process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini";
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Server is missing OpenAI configuration." },
      { status: 500 }
    );
  }

  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ error: "Origin not allowed." }, { status: 403 });
  }

  const contentLength = Number(req.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > 10_000) {
    return NextResponse.json({ error: "Payload too large." }, { status: 413 });
  }

  const ip = getClientIp(req);
  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: {
          "Retry-After": String(limit.retryAfter || 60),
        },
      }
    );
  }

  const body = await parseJsonSafely(req);
  const parsed = REQUEST_SCHEMA.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }

  const { message, lang, history } = parsed.data;

  try {
    const mode: "chat" | "rag" = "rag";
    const selectedLanguage = normalizeSiteLanguage(lang);
    let retrievalQuery = message;

    try {
      retrievalQuery = await translateToEnglishForRetrieval(message);
    } catch (error) {
      console.warn("Retrieval translation failed, using original message.", error);
    }

    const queryEmbedding = await createEmbedding(retrievalQuery);
    const retrieval = await retrieveRelevantChunks(queryEmbedding);

    if (retrieval.chunks.length === 0) {
      return NextResponse.json(
        {
          answer: NO_CONTEXT_BY_LANG[selectedLanguage] || NO_CONTEXT_BY_LANG.EN,
          citations: [],
          mode,
        },
        { status: 200 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: getModel(),
      temperature: 0.2,
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content: buildGroundedSystemPrompt(selectedLanguage),
        },
        ...history.map((item) => ({
          role: item.role,
          content: item.content,
        })),
        {
          role: "user",
          content: buildGroundedUserPrompt(
            message,
            retrieval.chunks,
            selectedLanguage,
            retrievalQuery
          ),
        },
      ],
    });

    const answer = completion.choices[0]?.message?.content?.trim();

    if (!answer) {
      return NextResponse.json(
        { error: "No response generated." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        answer,
        citations: retrieval.citations,
        mode,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { error: "Unable to process your request right now." },
      { status: 500 }
    );
  }
}
