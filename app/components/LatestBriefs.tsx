import Link from "next/link";
import { getLatestBriefs } from "@/lib/db";

const TONE_CONFIG = {
  bullish: { label: "Bullish", color: "var(--bullish)", bg: "rgba(34,197,94,0.1)" },
  neutral: { label: "Neutral", color: "var(--neutral)", bg: "rgba(245,158,11,0.1)" },
  bearish: { label: "Bearish", color: "var(--bearish)", bg: "rgba(239,68,68,0.1)" },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default async function LatestBriefs() {
  const briefs = await getLatestBriefs(6);

  if (briefs.length === 0) {
    return (
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
            Latest Briefs
          </p>
          <span className="h-px w-16" style={{ background: "var(--border)" }} />
        </div>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          No briefs yet — generate the first one above.
        </p>
      </section>
    );
  }

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
        {briefs.map((brief) => {
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
              <h3 className="text-base font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
                {brief.topic}
              </h3>
              {brief.summary && (
                <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "var(--text-secondary)" }}>
                  {brief.summary}
                </p>
              )}
              <span className="text-xs mt-auto" style={{ color: "var(--text-muted)" }}>
                {timeAgo(brief.created_at)}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
