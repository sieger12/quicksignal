import { getLatestBriefs } from "@/app/actions/generate";
import ResearchClient from "@/app/components/ResearchClient";

export default async function ResearchPage() {
  const briefs = await getLatestBriefs(50);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
          Research
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
          Latest Briefs
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Short, actionable AI-generated research. Built for traders, not readers.
        </p>
      </div>

      <ResearchClient briefs={briefs} />
    </div>
  );
}
