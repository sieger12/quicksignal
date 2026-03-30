"use client";

import Link from "next/link";

type Brief = {
  id: string;
  slug: string;
  topic: string;
  summary: string;
  tone: "bullish" | "neutral" | "bearish";
  category: string;
  createdAt: string;
};

const MOCK_BRIEFS: Brief[] = [
  {
    id: "1",
    slug: "btc-outlook",
    topic: "BTC Outlook",
    summary: "Bitcoin holding key structure above $94K. Spot demand intact, funding not overheated. Exchange outflows continuing — holding demand solid.",
    tone: "bullish",
    category: "Bitcoin",
    createdAt: "2h ago",
  },
  {
    id: "2",
    slug: "ai-sector-watch",
    topic: "AI Sector Watch",
    summary: "AI coin sector showing broad rotation. Volume rising across top-5 names. Narrative still alive but watch for overextension near resistance.",
    tone: "neutral",
    category: "AI Coins",
    createdAt: "4h ago",
  },
  {
    id: "3",
    slug: "defi-weekly",
    topic: "DeFi Weekly",
    summary: "TVL recovering across major protocols. ETH/BTC ratio stabilizing. DEX volumes at 3-month highs — real usage demand, not just speculation.",
    tone: "bullish",
    category: "DeFi",
    createdAt: "6h ago",
  },
  {
    id: "4",
    slug: "stablecoin-flows",
    topic: "Stablecoin Flows",
    summary: "USDT + USDC inflows to exchanges at elevated levels. Suggests dry powder building. Historically precedes increased risk-on activity.",
    tone: "bullish",
    category: "On-chain",
    createdAt: "8h ago",
  },
  {
    id: "5",
    slug: "sol-analysis",
    topic: "SOL Analysis",
    summary: "Solana ecosystem activity high but derivatives overheating. Funding spiked to 0.08%. Short-term correction risk elevated despite strong fundamentals.",
    tone: "neutral",
    category: "Layer 1",
    createdAt: "10h ago",
  },
  {
    id: "6",
    slug: "macro-update",
    topic: "Macro Update",
    summary: "DXY declining for 3rd consecutive session. 10Y yields softening. Risk-on tone globally — historically positive for BTC and high-beta crypto.",
    tone: "bullish",
    category: "Macro",
    createdAt: "12h ago",
  },
];

const TONE_CONFIG = {
  bullish: { label: "Bullish", color: "var(--bullish)", bg: "rgba(34,197,94,0.1)" },
  neutral: { label: "Neutral", color: "var(--neutral)", bg: "rgba(245,158,11,0.1)" },
  bearish: { label: "Bearish", color: "var(--bearish)", bg: "rgba(239,68,68,0.1)" },
};

export default function LatestBriefs() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
            Latest Briefs
          </p>
          <span className="h-px w-16" style={{ background: "var(--border)" }} />
        </div>
        <Link
          href="/research"
          className="text-xs font-medium transition-opacity hover:opacity-70"
          style={{ color: "var(--accent)" }}
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {MOCK_BRIEFS.map((brief) => {
          const tone = TONE_CONFIG[brief.tone];
          return (
            <Link
              key={brief.id}
              href={`/research/${brief.slug}`}
              className="rounded-xl border p-5 flex flex-col gap-3 transition-all hover:-translate-y-0.5 hover:border-opacity-30"
              style={{
                background: "var(--bg-card)",
                borderColor: "var(--border)",
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded"
                  style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
                >
                  {brief.category}
                </span>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded"
                  style={{ background: tone.bg, color: tone.color }}
                >
                  {tone.label}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
                {brief.topic}
              </h3>

              {/* Summary */}
              <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "var(--text-secondary)" }}>
                {brief.summary}
              </p>

              {/* Footer */}
              <span className="text-xs mt-auto" style={{ color: "var(--text-muted)" }}>
                {brief.createdAt}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
