import Link from "next/link";

const PROJECTS = [
  { slug: "btc", name: "Bitcoin", symbol: "BTC", price: 94200, change: 1.8, mcap: "$1.86T", category: "Layer 1" },
  { slug: "eth", name: "Ethereum", symbol: "ETH", price: 3480, change: 2.4, mcap: "$418B", category: "Layer 1" },
  { slug: "sol", name: "Solana", symbol: "SOL", price: 182, change: -0.6, mcap: "$86B", category: "Layer 1" },
  { slug: "bnb", name: "BNB", symbol: "BNB", price: 598, change: 0.9, mcap: "$87B", category: "Exchange" },
  { slug: "xrp", name: "XRP", symbol: "XRP", price: 0.62, change: -1.2, mcap: "$68B", category: "Payments" },
  { slug: "avax", name: "Avalanche", symbol: "AVAX", price: 38.4, change: 3.1, mcap: "$16B", category: "Layer 1" },
  { slug: "uni", name: "Uniswap", symbol: "UNI", price: 8.9, change: 4.2, mcap: "$5.4B", category: "DeFi" },
  { slug: "arb", name: "Arbitrum", symbol: "ARB", price: 1.12, change: -2.1, mcap: "$3.6B", category: "Layer 2" },
  { slug: "tao", name: "Bittensor", symbol: "TAO", price: 448, change: 6.7, mcap: "$3.2B", category: "AI" },
  { slug: "rndr", name: "Render", symbol: "RNDR", price: 7.8, change: 5.3, mcap: "$3.0B", category: "AI" },
  { slug: "doge", name: "Dogecoin", symbol: "DOGE", price: 0.14, change: 2.8, mcap: "$20B", category: "Memecoins" },
  { slug: "pepe", name: "Pepe", symbol: "PEPE", price: 0.000011, change: 8.4, mcap: "$4.6B", category: "Memecoins" },
];

const CATEGORIES = ["All", "Layer 1", "Layer 2", "DeFi", "AI", "Memecoins", "Exchange", "Payments"];

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Projects</p>
        <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>Token Research</h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Click any token to get AI-powered market analysis, signals, and final take.</p>
      </div>

      {/* Table */}
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-card)" }}>
              {["Token", "Price", "24H", "Market Cap", "Category", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-semibold" style={{ color: "var(--text-muted)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROJECTS.map((p, i) => {
              const isPos = p.change >= 0;
              return (
                <tr
                  key={p.slug}
                  style={{
                    borderBottom: i < PROJECTS.length - 1 ? "1px solid var(--border)" : "none",
                    background: "var(--bg-card)",
                  }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold" style={{ color: "var(--text-primary)" }}>{p.name}</span>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>{p.symbol}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold" style={{ color: "var(--text-primary)" }}>
                    ${p.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-bold" style={{ color: isPos ? "var(--bullish)" : "var(--bearish)" }}>
                    {isPos ? "+" : ""}{p.change}%
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--text-secondary)" }}>{p.mcap}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded" style={{ background: "var(--accent-dim)", color: "var(--accent)" }}>
                      {p.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="text-xs font-semibold hover:opacity-70 transition-opacity"
                      style={{ color: "var(--accent)" }}
                    >
                      Analyze →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
