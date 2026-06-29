import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Route as RouteIcon } from "lucide-react";
import { PageHeader, Section, SectionTitle, Card } from "../components/ui-kit";
import { RECOMMENDATIONS } from "../data/skills";
import { cn } from "../lib/utils";

export const Route = createFileRoute("/recommendations")({
  head: () => ({
    meta: [
      { title: "Learning Recommendations & Roadmap — Skill Gap Analyzer" },
      {
        name: "description",
        content:
          "Personalized learning recommendations and step-by-step roadmaps for the most in-demand data skills, prioritized by market need.",
      },
      { property: "og:title", content: "Learning Recommendations" },
      { property: "og:description", content: "Step-by-step learning roadmaps to close your skill gaps." },
    ],
  }),
  component: Recommendations,
});

const demandBadge: Record<string, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-warning/15 text-warning",
  Low: "bg-muted text-muted-foreground",
};

function Recommendations() {
  const recommendedSkills = JSON.parse(
    localStorage.getItem("recommendedSkills") || "[]"
  );

  return (
    <>
      <PageHeader
        eyebrow="Close the gap"
        title="Learning Recommendations"
        subtitle="Targeted guidance for every major skill — why it matters, how strongly the market wants it, and a clear path to learn it."
      />

      <Section>
        <SectionTitle
          title="Recommended Learning Roadmap"
          subtitle="Skills are ordered by priority — start at the top to maximize employability fastest."
        />
        <div className="space-y-6">
          {RECOMMENDATIONS
            .filter((r) => recommendedSkills.includes(r.skill))
            .map((r, i) => (
              <Card key={r.skill} className="overflow-hidden">
                <div className="flex flex-col gap-6 lg:flex-row">
                  <div className="lg:w-2/5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-sm font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                      <h3 className="text-xl font-bold">{r.skill}</h3>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold", demandBadge[r.demandLevel])}>
                        <Flame className="h-3 w-3" /> {r.demandLevel} demand
                      </span>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">{r.importance}</p>
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Resources</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {r.resources.map((res) => (
                          <span key={res} className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium">
                            {res}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-3/5">
                    <p className="mb-4 flex items-center gap-2 text-sm font-semibold">
                      <RouteIcon className="h-4 w-4 text-primary" /> Suggested learning path
                    </p>
                    <ol className="relative space-y-4 border-l-2 border-border pl-6">
                      {r.path.map((step, idx) => (
                        <li key={idx} className="relative">
                          <span className="absolute -left-[31px] flex h-5 w-5 items-center justify-center rounded-full bg-gradient-brand text-[10px] font-bold text-primary-foreground">
                            {idx + 1}
                          </span>
                          <p className="text-sm">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </Section>
    </>
  );
}
