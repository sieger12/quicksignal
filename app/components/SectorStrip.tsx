"use client";

import Link from "next/link";

type Sector = {
  slug: string;
  name: string;
  change24h: number;
  summary: string;
};

const MOCK_SECTORS: Sector[] = [
  { slug: "ai", name: "AI", change24h: 4.2, summary: "Strong narrative momentum" },
  { slug: "defi", name: "DeFi", change24h: 2.1, summary: "TVL recovering" },
  { slug: "layer1", name: "Layer 1", change24h: -0.8, summary: "Mixed — BTC leads" },
  { slug: "memecoins", name: "Memecoins", change24h: 7.4, summary: "Sentiment spike" },
  { slug: "depin", name: "DePIN", change24h: 1.3, summary: "Quiet accumulation" },
  { slug: "gaming", name: "Gaming", change24h: -1.5, summary: "Lagging behind" },
];

export default function SectorStrip() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
            Sectors
          </p>
          <span className="h-px w-16" style={{ background: "var(--border)" }} />
        </div>
        <Link
          href="/sectors"
          className="text-xs font-medium transition-opacity hover:opacity-70"
          style={{ color: "var(--accent)" }}
        >
          All sectors →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {MOCK_SECTORS.map((s) => {
          const isPos = s.change24h >= 0;
          return (
            <Link
              key={s.slug}
              href={`/sectors/${s.slug}`}
              className="rounded-xl border p-4 flex flex-col gap-2 transition-all hover:-translate-y-0.5"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                {s.name}
              </span>
              <span
                className="text-lg font-extrabold"
                style={{ color: isPos ? "var(--bullish)" : "var(--bearish)" }}
              >
                {isPos ? "+" : ""}{s.change24h}%
              </span>
              <span className="text-xs leading-tight" style={{ color: "var(--text-muted)" }}>
                {s.summary}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
