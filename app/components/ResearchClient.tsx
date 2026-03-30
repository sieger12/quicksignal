"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { generateBrief } from "@/app/actions/generate";

const TONE_CONFIG = {
  bullish: { label: "Bullish", color: "var(--bullish)", bg: "rgba(34,197,94,0.1)" },
  neutral: { label: "Neutral", color: "var(--neutral)", bg: "rgba(245,158,11,0.1)" },
  bearish: { label: "Bearish", color: "var(--bearish)", bg: "rgba(239,68,68,0.1)" },
};

const CATEGORIES = ["All", "Bitcoin", "Ethereum", "AI Coins", "DeFi", "Layer 1", "Macro", "On-chain", "Memecoins"];

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

type Brief = {
  id: string;
  slug: string;
  topic: string;
  summary: string | null;
  tone: string | null;
  category: string | null;
  created_at: string;
};

export default function ResearchClient({ briefs }: { briefs: Brief[] }) {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? briefs : briefs.filter((b) => b.category === filter);

  const handleGenerate = async () => {
    const t = topic.trim();
    if (!t || isGenerating) return;
    setIsGenerating(true);
    try {
      const { slug } = await generateBrief(t);
      router.push(`/research/${slug}`);
    } catch (err: any) {
      alert(err?.message || "Failed to generate brief.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* Generate input */}
      <div
        className="rounded-xl border p-5 flex flex-col sm:flex-row gap-3"
        style={{ background: "var(--bg-card)", borderColor: "var(--border-accent)" }}
      >
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          placeholder="Enter any topic — BTC outlook, DeFi sector, SOL analysis..."
          className="flex-1 px-4 py-2.5 rounded-lg text-sm outline-none border"
          style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text-primary)" }}
        />
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="px-6 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap hover:opacity-90 transition-opacity disabled:opacity-50"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          {isGenerating ? "Generating..." : "Generate Brief"}
        </button>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="text-xs font-medium px-3 py-1.5 rounded-full border transition-all"
            style={{
              background: filter === cat ? "var(--accent)" : "var(--bg-card)",
              borderColor: filter === cat ? "var(--accent)" : "var(--border)",
              color: filter === cat ? "#fff" : "var(--text-secondary)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Briefs grid */}
      {filtered.length === 0 ? (
        <p className="text-sm py-8 text-center" style={{ color: "var(--text-muted)" }}>
          No briefs yet in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((brief) => {
            const tone = TONE_CONFIG[brief.tone as keyof typeof TONE_CONFIG] ?? TONE_CONFIG.neutral;
            return (
              <Link
                key={brief.id}
                href={`/research/${brief.slug}`}
                className="rounded-xl border p-5 flex flex-col gap-3 transition-all hover:-translate-y-0.5"
                style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <div className="flex items-start justify-between gap-2">
                  {brief.category && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ background: "var(--accent-dim)", color: "var(--accent)" }}>
                      {brief.category}
                    </span>
                  )}
                  <span className="text-xs font-semibold px-2 py-0.5 rounded ml-auto" style={{ background: tone.bg, color: tone.color }}>
                    {tone.label}
                  </span>
                </div>
                <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>{brief.topic}</h3>
                {brief.summary && (
                  <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "var(--text-secondary)" }}>{brief.summary}</p>
                )}
                <span className="text-xs mt-auto" style={{ color: "var(--text-muted)" }}>{timeAgo(brief.created_at)}</span>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
