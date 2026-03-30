import Link from "next/link";

const SECTORS = [
  { slug: "ai", name: "AI", change24h: 4.2, coins: ["TAO", "RNDR", "FET", "AGIX"], summary: "Strong narrative momentum. Capital flowing in from BTC rotation. Volume increasing across sector.", mood: "bullish" as const },
  { slug: "defi", name: "DeFi", change24h: 2.1, coins: ["UNI", "AAVE", "CRV", "MKR"], summary: "TVL recovering. DEX volumes at 3-month highs. Real usage demand, not speculation.", mood: "bullish" as const },
  { slug: "layer1", name: "Layer 1", change24h: -0.8, coins: ["SOL", "AVAX", "ADA", "NEAR"], summary: "Mixed signals. BTC dominance keeping alt pressure high. Watch for breakout above key levels.", mood: "neutral" as const },
  { slug: "memecoins", name: "Memecoins", change24h: 7.4, coins: ["DOGE", "SHIB", "PEPE", "WIF"], summary: "Sentiment spike. Volume surging but thin liquidity. High risk, no structural support.", mood: "neutral" as const },
  { slug: "depin", name: "DePIN", change24h: 1.3, coins: ["HNT", "IOTX", "MOBILE", "FIL"], summary: "Quiet accumulation phase. Narrative building but not yet reflected in price.", mood: "neutral" as const },
  { slug: "gaming", name: "Gaming", change24h: -1.5, coins: ["AXS", "SAND", "MANA", "IMX"], summary: "Lagging behind broader market. Narrative weak. Wait for sector-specific catalyst.", mood: "bearish" as const },
  { slug: "rwa", name: "RWA", change24h: 0.9, coins: ["ONDO", "MKR", "POLYX", "CFG"], summary: "Institutional interest growing. Steady inflows. Slow but structural demand building.", mood: "bullish" as const },
  { slug: "l2", name: "Layer 2", change24h: 1.7, coins: ["ARB", "OP", "STRK", "MATIC"], summary: "Moderate recovery. ETH strength helping. Token unlock pressure remains a headwind.", mood: "neutral" as const },
];

const MOOD_CONFIG = {
  bullish: { color: "var(--bullish)", bg: "rgba(34,197,94,0.1)", label: "Bullish" },
  neutral: { color: "var(--neutral)", bg: "rgba(245,158,11,0.1)", label: "Neutral" },
  bearish: { color: "var(--bearish)", bg: "rgba(239,68,68,0.1)", label: "Bearish" },
};

export default function SectorsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Sectors</p>
        <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>Sector Overview</h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>24H performance and AI interpretation across major crypto sectors.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SECTORS.map((s) => {
          const mood = MOOD_CONFIG[s.mood];
          const isPos = s.change24h >= 0;
          return (
            <Link
              key={s.slug}
              href={`/sectors/${s.slug}`}
              className="rounded-xl border p-6 flex flex-col gap-4 transition-all hover:-translate-y-0.5"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-extrabold" style={{ color: "var(--text-primary)" }}>{s.name}</h2>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ background: mood.bg, color: mood.color }}>
                    {mood.label}
                  </span>
                </div>
                <span className="text-2xl font-extrabold" style={{ color: isPos ? "var(--bullish)" : "var(--bearish)" }}>
                  {isPos ? "+" : ""}{s.change24h}%
                </span>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{s.summary}</p>

              <div className="flex flex-wrap gap-1.5">
                {s.coins.map((c) => (
                  <span key={c} className="text-xs px-2 py-0.5 rounded font-medium" style={{ background: "var(--bg)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
                    {c}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
