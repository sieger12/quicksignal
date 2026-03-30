import { notFound } from "next/navigation";
import Link from "next/link";
import { getBriefBySlug } from "@/app/actions/generate";

const TONE_CONFIG = {
  bullish: { label: "Bullish", color: "var(--bullish)", bg: "rgba(34,197,94,0.1)" },
  neutral: { label: "Neutral", color: "var(--neutral)", bg: "rgba(245,158,11,0.1)" },
  bearish: { label: "Bearish", color: "var(--bearish)", bg: "rgba(239,68,68,0.1)" },
};

const SECTIONS = [
  { key: "funding_rate", label: "Funding Rate" },
  { key: "open_interest", label: "Open Interest" },
  { key: "liquidations", label: "Liquidations" },
  { key: "exchange_flow", label: "Exchange Flow" },
  { key: "whale_activity", label: "Whale Activity" },
  { key: "macro", label: "Macro" },
] as const;

export default async function BriefPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brief = await getBriefBySlug(slug);

  if (!brief) notFound();

  if (brief.status === "processing") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center flex flex-col gap-4">
        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
          Analyzing
        </p>
        <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)" }}>
          {brief.topic}
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Generating your brief — this takes about 10 seconds.
        </p>
        <meta httpEquiv="refresh" content="4" />
      </div>
    );
  }

  if (brief.status === "failed") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center flex flex-col gap-4">
        <h1 className="text-2xl font-extrabold" style={{ color: "var(--bearish)" }}>Generation failed</h1>
        <Link href="/" className="text-sm" style={{ color: "var(--accent)" }}>← Back to home</Link>
      </div>
    );
  }

  const tone = TONE_CONFIG[brief.tone as keyof typeof TONE_CONFIG] ?? TONE_CONFIG.neutral;
  const date = new Date(brief.created_at).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-8">
      {/* Back */}
      <Link href="/research" className="text-xs font-medium hover:opacity-70 transition-opacity" style={{ color: "var(--accent)" }}>
        ← Research
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {brief.category && (
            <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ background: "var(--accent-dim)", color: "var(--accent)" }}>
              {brief.category}
            </span>
          )}
          <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ background: tone.bg, color: tone.color }}>
            {tone.label}
          </span>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>{date}</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
          {brief.topic}
        </h1>
      </div>

      {/* Summary */}
      {brief.summary && (
        <div className="rounded-xl border p-5 flex flex-col gap-2" style={{ background: "var(--bg-card)", borderColor: "var(--border-accent)" }}>
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Summary</span>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-primary)" }}>{brief.summary}</p>
        </div>
      )}

      {/* Signal rows */}
      <div className="flex flex-col gap-2">
        {SECTIONS.map(({ key, label }) => {
          const value = brief[key as keyof typeof brief] as string;
          if (!value) return null;
          return (
            <div
              key={key}
              className="rounded-xl border px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <span className="text-xs font-semibold shrink-0 w-36" style={{ color: "var(--text-muted)" }}>
                {label}
              </span>
              <span className="text-sm" style={{ color: "var(--text-primary)" }}>{value}</span>
            </div>
          );
        })}
      </div>

      {/* Final Take */}
      {brief.final_take && (
        <div
          className="rounded-xl border p-5 flex flex-col gap-2"
          style={{ background: "var(--accent-dim)", borderColor: "var(--border-accent)" }}
        >
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--accent)" }}>
            Final Take
          </span>
          <p className="text-base font-semibold leading-relaxed" style={{ color: "var(--text-primary)" }}>
            {brief.final_take}
          </p>
        </div>
      )}

      {/* Generate another */}
      <div className="pt-4 border-t" style={{ borderColor: "var(--border)" }}>
        <Link
          href="/"
          className="inline-block text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          Generate another brief →
        </Link>
      </div>
    </div>
  );
}
