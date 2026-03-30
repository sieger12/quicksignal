"use client";

import Link from "next/link";

type Event = {
  id: string;
  project: string;
  type: "unlock" | "fundraising";
  date: string;
  amount: string;
  aiTake: string;
};

const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    project: "Arbitrum (ARB)",
    type: "unlock",
    date: "Apr 3",
    amount: "$120M",
    aiTake: "Large unlock — short-term sell pressure possible, but liquidity is limited",
  },
  {
    id: "2",
    project: "Starknet (STRK)",
    type: "unlock",
    date: "Apr 7",
    amount: "$44M",
    aiTake: "Moderate unlock — ecosystem activity needed to absorb supply",
  },
  {
    id: "3",
    project: "Monad",
    type: "fundraising",
    date: "Apr 5",
    amount: "$225M",
    aiTake: "High-profile raise signals continued institutional appetite for L1 infra",
  },
  {
    id: "4",
    project: "EigenLayer (EIGEN)",
    type: "unlock",
    date: "Apr 12",
    amount: "$88M",
    aiTake: "Watch restaking demand — could partially absorb sell pressure",
  },
];

const TYPE_CONFIG = {
  unlock: { label: "Token Unlock", color: "var(--bearish)", bg: "rgba(239,68,68,0.1)" },
  fundraising: { label: "Fundraising", color: "var(--bullish)", bg: "rgba(34,197,94,0.1)" },
};

export default function UpcomingEvents() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
            Upcoming Events
          </p>
          <span className="h-px w-16" style={{ background: "var(--border)" }} />
        </div>
        <Link
          href="/events"
          className="text-xs font-medium transition-opacity hover:opacity-70"
          style={{ color: "var(--accent)" }}
        >
          View all →
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {MOCK_EVENTS.map((ev) => {
          const cfg = TYPE_CONFIG[ev.type];
          return (
            <div
              key={ev.id}
              className="rounded-xl border p-4 flex flex-col md:flex-row md:items-center gap-3"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              {/* Type badge */}
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded self-start md:self-auto shrink-0"
                style={{ background: cfg.bg, color: cfg.color }}
              >
                {cfg.label}
              </span>

              {/* Project + date */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                    {ev.project}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {ev.date} · {ev.amount}
                  </span>
                </div>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {ev.aiTake}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
