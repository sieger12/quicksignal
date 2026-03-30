"use client";

const QUICK_BUTTONS = [
  { label: "⚡ BTC Outlook", value: "BTC outlook" },
  { label: "🔥 ETH Analysis", value: "ETH analysis" },
  { label: "🤖 AI Sector", value: "AI coins sector" },
  { label: "🌊 DeFi Pulse", value: "DeFi sector overview" },
];

const SAMPLE = {
  topic: "BTC Weekly Outlook",
  category: "Bitcoin",
  tone: { label: "Bullish", color: "var(--bullish)", bg: "rgba(34,197,94,0.1)" },
  summary: "Spot demand outpacing sell pressure. Exchange outflows at 3-month highs. Funding rates healthy — no signs of overheating.",
  rows: [
    { label: "Funding Rate", value: "0.012% — neutral, room to run" },
    { label: "Whale Activity", value: "Large wallets accumulating sub-$94K" },
    { label: "Exchange Flow", value: "Net outflows for 8 consecutive days" },
    { label: "Macro", value: "DXY softening — risk-on tone intact" },
  ],
  finalTake: "Structure intact. Dips to $92K remain buyable with tight stops.",
};

type Props = {
  topic: string;
  setTopic: (v: string) => void;
  isGenerating: boolean;
  loadingStep: string;
  onGenerate: (text: string) => void;
};

export default function Hero({ topic, setTopic, isGenerating, loadingStep, onGenerate }: Props) {
  return (
    <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }} className="hero-grid pt-4">
      {/* ── LEFT: Copy + Input ── */}
      <div className="flex flex-col gap-6">
        {/* Badge */}
        <span
          className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border self-start"
          style={{ color: "var(--accent)", borderColor: "var(--border-accent)", background: "var(--accent-dim)" }}
        >
          AI Signal Platform
        </span>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          <span style={{ color: "var(--text-primary)" }}>Stop scanning charts.</span>
          <br />
          <span style={{ color: "var(--accent)" }}>Get the signal.</span>
        </h1>

        <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)", maxWidth: "420px" }}>
          Enter any crypto topic. Get a structured AI brief — funding rates, whale activity, macro context — in 10 seconds.
        </p>

        {/* Quick buttons */}
        <div className="flex flex-wrap gap-2">
          {QUICK_BUTTONS.map((btn) => (
            <button
              key={btn.value}
              onClick={() => onGenerate(btn.value)}
              disabled={isGenerating}
              className="text-sm font-semibold px-4 py-2.5 rounded-full border transition-all disabled:opacity-40"
              style={{
                color: "var(--accent)",
                borderColor: "var(--border-accent)",
                background: "var(--accent-dim)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)";
                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--accent-dim)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Input row */}
        <div className="flex gap-2">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") onGenerate(topic); }}
            placeholder="Any topic — SOL outlook, Memecoins, L2 sector..."
            disabled={isGenerating}
            className="flex-1 px-4 py-3 rounded-xl text-sm outline-none border"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
          />
          <button
            onClick={() => onGenerate(topic)}
            disabled={isGenerating || !topic.trim()}
            className="px-5 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90 disabled:opacity-40 whitespace-nowrap"
            style={{ background: "var(--accent)", color: "#fff", minWidth: "140px" }}
          >
            {isGenerating ? "Analyzing..." : "Generate Brief →"}
          </button>
        </div>

        {/* Loading step / trust line */}
        {isGenerating ? (
          <p className="text-sm font-medium loading-pulse" style={{ color: "var(--accent)" }}>
            {loadingStep}
          </p>
        ) : (
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Free · No signup required · Results in ~10 seconds
          </p>
        )}
      </div>

      {/* ── RIGHT: Sample Brief Card ── */}
      <div
        className="hero-sample rounded-2xl border flex flex-col gap-4 p-6"
        style={{ background: "var(--bg-card)", borderColor: "var(--border-accent)" }}
      >
        {/* Card header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-medium px-2 py-0.5 rounded"
              style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
            >
              {SAMPLE.category}
            </span>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded"
              style={{ background: SAMPLE.tone.bg, color: SAMPLE.tone.color }}
            >
              {SAMPLE.tone.label}
            </span>
          </div>
          <span
            className="text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded"
            style={{ background: "rgba(245,158,11,0.15)", color: "var(--neutral)" }}
          >
            SAMPLE
          </span>
        </div>

        <h3 className="text-lg font-extrabold" style={{ color: "var(--text-primary)" }}>
          {SAMPLE.topic}
        </h3>

        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          {SAMPLE.summary}
        </p>

        {/* Signal rows */}
        <div className="flex flex-col gap-2">
          {SAMPLE.rows.map((row) => (
            <div
              key={row.label}
              className="flex gap-3 rounded-lg px-3 py-2.5"
              style={{ background: "var(--bg)", borderColor: "var(--border)" }}
            >
              <span className="text-xs font-semibold shrink-0 w-28" style={{ color: "var(--text-muted)" }}>
                {row.label}
              </span>
              <span className="text-xs" style={{ color: "var(--text-primary)" }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Final Take */}
        <div
          className="rounded-xl p-3 flex flex-col gap-1"
          style={{ background: "var(--accent-dim)", borderLeft: "3px solid var(--accent)" }}
        >
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--accent)" }}>
            Final Take
          </span>
          <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            {SAMPLE.finalTake}
          </p>
        </div>

        <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
          👆 Your brief looks like this — generated in ~10 seconds
        </p>
      </div>
    </section>
  );
}
