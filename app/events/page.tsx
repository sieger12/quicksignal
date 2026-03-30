"use client";

import { useState } from "react";

const EVENTS = [
  { id: "1", project: "Arbitrum (ARB)", type: "unlock" as const, date: "Apr 3, 2026", amount: "$120M", aiTake: "Large unlock — short-term sell pressure possible. Monitor exchange inflows closely." },
  { id: "2", project: "Monad", type: "fundraising" as const, date: "Apr 5, 2026", amount: "$225M", aiTake: "High-profile raise signals continued institutional appetite for L1 infra." },
  { id: "3", project: "Starknet (STRK)", type: "unlock" as const, date: "Apr 7, 2026", amount: "$44M", aiTake: "Moderate unlock — ecosystem activity needed to absorb supply." },
  { id: "4", project: "Berachain", type: "fundraising" as const, date: "Apr 9, 2026", amount: "$100M", aiTake: "Series B signals long-term bet on novel DeFi consensus model." },
  { id: "5", project: "EigenLayer (EIGEN)", type: "unlock" as const, date: "Apr 12, 2026", amount: "$88M", aiTake: "Restaking demand could partially absorb sell pressure. Watch on-chain flows." },
  { id: "6", project: "Optimism (OP)", type: "unlock" as const, date: "Apr 18, 2026", amount: "$62M", aiTake: "Regular unlock cadence — market has largely priced this in. Impact should be limited." },
  { id: "7", project: "Eclipse", type: "fundraising" as const, date: "Apr 22, 2026", amount: "$65M", aiTake: "SVM on Ethereum gaining traction. Raises narrative interest for Solana ecosystem." },
  { id: "8", project: "Aptos (APT)", type: "unlock" as const, date: "Apr 25, 2026", amount: "$75M", aiTake: "Significant unlock — APT has struggled with persistent sell pressure from prior unlocks." },
];

const TYPE_CONFIG = {
  unlock: { label: "Token Unlock", color: "var(--bearish)", bg: "rgba(239,68,68,0.1)" },
  fundraising: { label: "Fundraising", color: "var(--bullish)", bg: "rgba(34,197,94,0.1)" },
};

type TabType = "all" | "unlock" | "fundraising";

export default function EventsPage() {
  const [tab, setTab] = useState<TabType>("all");

  const filtered = tab === "all" ? EVENTS : EVENTS.filter((e) => e.type === tab);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Events</p>
        <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>Upcoming Events</h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Token unlocks, fundraising rounds, and key dates — with AI interpretation.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["all", "unlock", "fundraising"] as TabType[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="text-sm font-semibold px-4 py-2 rounded-lg border transition-all capitalize"
            style={{
              background: tab === t ? "var(--accent)" : "var(--bg-card)",
              borderColor: tab === t ? "var(--accent)" : "var(--border)",
              color: tab === t ? "#fff" : "var(--text-secondary)",
            }}
          >
            {t === "all" ? "All" : t === "unlock" ? "Token Unlocks" : "Fundraising"}
          </button>
        ))}
      </div>

      {/* Events list */}
      <div className="flex flex-col gap-3">
        {filtered.map((ev) => {
          const cfg = TYPE_CONFIG[ev.type];
          return (
            <div
              key={ev.id}
              className="rounded-xl border p-5 flex flex-col md:flex-row md:items-start gap-4"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div className="flex flex-col gap-1 md:w-36 shrink-0">
                <span className="text-xs font-semibold px-2 py-0.5 rounded self-start" style={{ background: cfg.bg, color: cfg.color }}>
                  {cfg.label}
                </span>
                <span className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{ev.date}</span>
              </div>

              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-base font-bold" style={{ color: "var(--text-primary)" }}>{ev.project}</span>
                  <span className="text-sm font-bold" style={{ color: cfg.color }}>{ev.amount}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{ev.aiTake}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
