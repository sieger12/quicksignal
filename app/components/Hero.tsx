"use client";

const QUICK_BUTTONS = [
  { label: "BTC Outlook", value: "BTC outlook" },
  { label: "ETH Outlook", value: "ETH analysis" },
  { label: "AI Sector", value: "AI coins sector" },
  { label: "Altcoin Opportunities", value: "Altcoin opportunities" },
];

type Props = {
  topic: string;
  setTopic: (v: string) => void;
  isGenerating: boolean;
  onGenerate: (text: string) => void;
};

export default function Hero({ topic, setTopic, isGenerating, onGenerate }: Props) {
  return (
    <section className="flex flex-col items-center text-center gap-6 pt-6">
      {/* Badge */}
      <span
        className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border"
        style={{
          color: "var(--accent)",
          borderColor: "var(--border-accent)",
          background: "var(--accent-dim)",
        }}
      >
        AI Research Platform
      </span>

      {/* Headline */}
      <h1
        className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-2xl"
        style={{ color: "var(--text-primary)" }}
      >
        Get crypto research{" "}
        <span style={{ color: "var(--accent)" }}>in seconds</span>
      </h1>

      <p className="text-base max-w-lg" style={{ color: "var(--text-secondary)" }}>
        Market, sector, and token-level signals summarized by AI.
        All the signals. None of the noise.
      </p>

      {/* Quick buttons */}
      <div className="flex flex-wrap justify-center gap-2 mt-1">
        {QUICK_BUTTONS.map((btn) => (
          <button
            key={btn.value}
            onClick={() => onGenerate(btn.value)}
            disabled={isGenerating}
            className="text-sm font-medium px-4 py-2 rounded-full border transition-all hover:-translate-y-0.5 disabled:opacity-40"
            style={{
              color: "var(--accent)",
              borderColor: "var(--border-accent)",
              background: "var(--accent-dim)",
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Input + Generate */}
      <div className="flex w-full max-w-xl gap-3 mt-1">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") onGenerate(topic); }}
          placeholder="e.g. BTC outlook / DeFi sector / SOL analysis"
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
          className="px-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90 disabled:opacity-40 whitespace-nowrap"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          {isGenerating ? "Analyzing..." : "Generate Brief"}
        </button>
      </div>

      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
        Free · No signup · Results in seconds
      </p>
    </section>
  );
}
