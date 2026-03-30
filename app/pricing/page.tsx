import Link from "next/link";

const FREE_FEATURES = [
  "5 AI briefs per day",
  "Latest briefs feed",
  "Sector overview",
  "Market overview",
  "Basic project pages",
  "Upcoming events",
];

const PRO_FEATURES = [
  "Unlimited AI briefs",
  "Real-time signal alerts",
  "Deep project analysis",
  "Token unlock notifications",
  "Fundraising deal flow",
  "Sector rotation signals",
  "Export to PDF",
  "Priority support",
];

export default function PricingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 flex flex-col gap-12">
      {/* Header */}
      <div className="text-center flex flex-col gap-3">
        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Pricing</p>
        <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
          All the signals.<br />
          <span style={{ color: "var(--accent)" }}>None of the noise.</span>
        </h1>
        <p className="text-base max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
          Start free. Upgrade when you need more.
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free */}
        <div
          className="rounded-2xl border p-8 flex flex-col gap-6"
          style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>Free</span>
            <div className="flex items-end gap-1">
              <span className="text-5xl font-extrabold" style={{ color: "var(--text-primary)" }}>$0</span>
              <span className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>/month</span>
            </div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Start exploring the market.</p>
          </div>

          <ul className="flex flex-col gap-3">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <span style={{ color: "var(--bullish)" }}>✓</span>
                {f}
              </li>
            ))}
          </ul>

          <Link
            href="/"
            className="mt-auto text-center py-3 rounded-xl font-bold text-sm border transition-opacity hover:opacity-80"
            style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
          >
            Get Started Free
          </Link>
        </div>

        {/* Pro */}
        <div
          className="rounded-2xl border p-8 flex flex-col gap-6 relative overflow-hidden"
          style={{ background: "var(--bg-card)", borderColor: "var(--accent)" }}
        >
          <div
            className="absolute top-0 right-0 text-xs font-bold px-3 py-1 rounded-bl-xl"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            MOST POPULAR
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--accent)" }}>Pro</span>
            <div className="flex items-end gap-1">
              <span className="text-5xl font-extrabold" style={{ color: "var(--text-primary)" }}>$19</span>
              <span className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>/month</span>
            </div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>For serious traders.</p>
          </div>

          <ul className="flex flex-col gap-3">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                <span style={{ color: "var(--accent)" }}>✓</span>
                {f}
              </li>
            ))}
          </ul>

          <button
            className="mt-auto py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-90"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            Coming Soon
          </button>
        </div>
      </div>

      {/* Bottom note */}
      <p className="text-center text-sm" style={{ color: "var(--text-muted)" }}>
        No credit card required for free plan. Cancel anytime.
      </p>
    </div>
  );
}
