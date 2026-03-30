"use client";

import { useState } from "react";
import Link from "next/link";

const BRIEFS = [
  { slug: "btc-outlook", topic: "BTC Outlook", summary: "Bitcoin holding key structure above $94K. Spot demand intact, funding not overheated. Exchange outflows continuing — holding demand solid.", tone: "bullish" as const, category: "Bitcoin", createdAt: "2h ago" },
  { slug: "eth-analysis", topic: "ETH Analysis", summary: "ETH/BTC ratio stabilizing. Spot ETF inflows supporting price. Network activity recovering — real demand, not just speculation.", tone: "bullish" as const, category: "Ethereum", createdAt: "3h ago" },
  { slug: "ai-sector-watch", topic: "AI Sector Watch", summary: "AI coin sector showing broad rotation. Volume rising across top-5 names. Narrative alive but watch for overextension near resistance.", tone: "neutral" as const, category: "AI Coins", createdAt: "4h ago" },
  { slug: "defi-weekly", topic: "DeFi Weekly", summary: "TVL recovering across major protocols. DEX volumes at 3-month highs — real usage demand, not speculation.", tone: "bullish" as const, category: "DeFi", createdAt: "6h ago" },
  { slug: "sol-analysis", topic: "SOL Analysis", summary: "Ecosystem activity high but derivatives overheating. Funding spiked to 0.08%. Short-term correction risk elevated.", tone: "neutral" as const, category: "Layer 1", createdAt: "8h ago" },
  { slug: "macro-update", topic: "Macro Update", summary: "DXY declining 3rd consecutive session. 10Y yields softening. Risk-on tone globally — historically positive for BTC.", tone: "bullish" as const, category: "Macro", createdAt: "10h ago" },
  { slug: "stablecoin-flows", topic: "Stablecoin Flows", summary: "USDT + USDC inflows to exchanges elevated. Dry powder building — historically precedes increased risk-on activity.", tone: "bullish" as const, category: "On-chain", createdAt: "12h ago" },
  { slug: "memecoin-sector", topic: "Memecoin Sector", summary: "Sentiment spike across meme names. Volume surging but thin liquidity. High risk, high reward — no structural support.", tone: "neutral" as const, category: "Memecoins", createdAt: "14h ago" },
  { slug: "btc-dominance", topic: "BTC Dominance", summary: "Dominance at 54.2% — capital still concentrated in BTC. Alt season unlikely until dominance breaks below 52%.", tone: "neutral" as const, category: "Bitcoin", createdAt: "16h ago" },
];

const TONE_CONFIG = {
  bullish: { label: "Bullish", color: "var(--bullish)", bg: "rgba(34,197,94,0.1)" },
  neutral: { label: "Neutral", color: "var(--neutral)", bg: "rgba(245,158,11,0.1)" },
  bearish: { label: "Bearish", color: "var(--bearish)", bg: "rgba(239,68,68,0.1)" },
};

const CATEGORIES = ["All", "Bitcoin", "Ethereum", "AI Coins", "DeFi", "Layer 1", "Macro", "On-chain", "Memecoins"];

export default function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? BRIEFS : BRIEFS.filter((b) => b.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
          Research
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
          Latest Briefs
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Short, actionable AI-generated research. Built for traders, not readers.
        </p>
      </div>

      {/* Generate input */}
      <div
        className="rounded-xl border p-5 flex flex-col sm:flex-row gap-3"
        style={{ background: "var(--bg-card)", borderColor: "var(--border-accent)" }}
      >
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter any topic — BTC outlook, DeFi sector, SOL analysis..."
          className="flex-1 px-4 py-2.5 rounded-lg text-sm outline-none border"
          style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text-primary)" }}
        />
        <button
          className="px-6 py-2.5 rounded-lg text-sm font-bold whitespace-nowrap hover:opacity-90 transition-opacity"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          Generate Brief
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((brief) => {
          const tone = TONE_CONFIG[brief.tone];
          return (
            <Link
              key={brief.slug}
              href={`/research/${brief.slug}`}
              className="rounded-xl border p-5 flex flex-col gap-3 transition-all hover:-translate-y-0.5"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ background: "var(--accent-dim)", color: "var(--accent)" }}>
                  {brief.category}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ background: tone.bg, color: tone.color }}>
                  {tone.label}
                </span>
              </div>
              <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>{brief.topic}</h3>
              <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "var(--text-secondary)" }}>{brief.summary}</p>
              <span className="text-xs mt-auto" style={{ color: "var(--text-muted)" }}>{brief.createdAt}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
