"use client";

import { useEffect, useState } from "react";

type Overview = {
  btcDominance: number;
  mood: string;
  moodColor: string;
  sectorRotation: string;
  macroTone: string;
};

// Placeholder — will be wired to /api/market-overview
const MOCK: Overview = {
  btcDominance: 54.2,
  mood: "Risk-On",
  moodColor: "var(--bullish)",
  sectorRotation: "Capital rotating from BTC into L1/AI alts",
  macroTone: "DXY softening — risk assets supported",
};

const STATS = [
  { label: "BTC Dominance", getValue: (d: Overview) => `${d.btcDominance}%` },
  { label: "Market Mood", getValue: (d: Overview) => d.mood },
  { label: "Sector Rotation", getValue: (d: Overview) => d.sectorRotation },
  { label: "Macro Tone", getValue: (d: Overview) => d.macroTone },
];

export default function MarketOverview() {
  const [data] = useState<Overview>(MOCK);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
          Today&apos;s Market
        </p>
        <span className="h-px flex-1" style={{ background: "var(--border)" }} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-4 border flex flex-col gap-2"
            style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              {s.label}
            </span>
            <span
              className="text-sm font-semibold leading-tight"
              style={{
                color: s.label === "Market Mood" ? data.moodColor : "var(--text-primary)",
              }}
            >
              {s.getValue(data)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
