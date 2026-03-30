"use server";

import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import { headers } from "next/headers";

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// ── Rate limiter (per Vercel instance) ───────────────────────────────────────
const rl = new Map<string, { count: number; resetAt: number }>();

function allow(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const e = rl.get(key);
  if (!e || e.resetAt < now) {
    rl.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (e.count >= limit) return false;
  e.count++;
  return true;
}

async function getClientIp(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
}

function toSlug(topic: string): string {
  return topic
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60) || "brief";
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = base;
  let attempt = 2;
  while (true) {
    const { data } = await admin.from("briefs").select("id").eq("slug", slug).maybeSingle();
    if (!data) return slug;
    slug = `${base}-${attempt++}`;
    if (attempt > 99) return `${base}-${Date.now()}`;
  }
}

function strip(s: string): string {
  return s.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
}

function norm(v: unknown): string {
  if (typeof v === "string") return v.trim();
  if (v == null) return "";
  return String(v).trim();
}

// ── Main action ───────────────────────────────────────────────────────────────
export async function generateBrief(topic: string): Promise<{ slug: string }> {
  const ip = await getClientIp();

  if (!allow(`generate:${ip}`, 5, 60 * 60 * 1000)) {
    throw new Error("Too many requests. Please try again in an hour.");
  }

  const cleanTopic = topic.trim().slice(0, 200);
  if (!cleanTopic) throw new Error("Topic is required.");

  const slug = await uniqueSlug(toSlug(cleanTopic));

  // 1. Insert placeholder
  const { data: created, error: createErr } = await admin
    .from("briefs")
    .insert({ topic: cleanTopic, slug, status: "processing" })
    .select()
    .single();

  if (createErr || !created) throw new Error("Failed to create brief.");

  // 2. Generate with OpenAI
  try {
    const completion = await openai.chat.completions.create(
      {
        model: "gpt-4.1-mini",
        temperature: 0.5,
        messages: [
          {
            role: "system",
            content: `You are a crypto market analyst writing for experienced traders.
Write a SHORT, structured brief. Rules:
- Max 200 words total across all fields
- No fluff, no disclaimers
- Clear signals, actionable tone
- Be specific and direct

Return valid JSON only (no markdown fences):
{
  "tone": "bullish" | "neutral" | "bearish",
  "category": string (e.g. "Bitcoin", "DeFi", "Layer 1", "AI Coins", "Macro", "On-chain"),
  "summary": string (2-3 sentences max),
  "fundingRate": string (1 sentence),
  "openInterest": string (1 sentence),
  "liquidations": string (1 sentence),
  "exchangeFlow": string (1 sentence),
  "whaleActivity": string (1 sentence),
  "macro": string (1 sentence),
  "finalTake": string (1-2 sentences, clear conclusion)
}`,
          },
          {
            role: "user",
            content: `Write a crypto market brief for: ${cleanTopic}`,
          },
        ],
      },
      { timeout: 30000 }
    );

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const p = JSON.parse(strip(raw));

    const tone = ["bullish", "neutral", "bearish"].includes(p.tone) ? p.tone : "neutral";

    await admin
      .from("briefs")
      .update({
        status: "done",
        tone,
        category: norm(p.category),
        summary: norm(p.summary),
        funding_rate: norm(p.fundingRate),
        open_interest: norm(p.openInterest),
        liquidations: norm(p.liquidations),
        exchange_flow: norm(p.exchangeFlow),
        whale_activity: norm(p.whaleActivity),
        macro: norm(p.macro),
        final_take: norm(p.finalTake),
      })
      .eq("id", created.id);
  } catch (err) {
    await admin.from("briefs").update({ status: "failed" }).eq("id", created.id);
    throw err;
  }

  return { slug };
}

export async function getBriefBySlug(slug: string) {
  const { data, error } = await admin
    .from("briefs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data;
}

export async function getLatestBriefs(limit = 9) {
  const { data } = await admin
    .from("briefs")
    .select("*")
    .eq("status", "done")
    .order("created_at", { ascending: false })
    .limit(limit);

  return data ?? [];
}
