import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, TrendingDown, TrendingUp, Scale } from "lucide-react";
import { PageHeader, Section, SectionTitle, Card, StatCard, InsightBox } from "../components/ui-kit";
import { DemandSupplyChart, GapChart } from "../components/charts";
import { SKILLS, SHORTAGES, OVERSUPPLY } from "../data/skills";
import { cn } from "../lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Skill Gap Dashboard — Demand vs Supply | Skill Gap Analyzer" },
      {
        name: "description",
        content:
          "The main skill gap dashboard: compare industry demand against student supply, see gap percentages, shortages, oversupply, and the most critical skill gaps.",
      },
      { property: "og:title", content: "Skill Gap Dashboard" },
      { property: "og:description", content: "Demand vs supply, gap analysis, and the most critical skill gaps." },
    ],
  }),
  component: Dashboard,
});

const comparison = SKILLS.map((s) => ({ name: s.short, Demand: s.demand, Supply: s.supply }));
const gapData = [...SKILLS].sort((a, b) => a.gap - b.gap).map((s) => ({ name: s.skill, gap: s.gap }));

function Dashboard() {
  const critical = SHORTAGES[0];
  const biggestOversupply = OVERSUPPLY[0];

  return (
    <>
      <PageHeader
        eyebrow="Gap Analysis Sheet"
        title="Skill Gap Dashboard"
        subtitle="The core analysis — where student supply meets, exceeds, or falls short of industry demand across all eight skills."
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard accent value={SKILLS.length} label="Skills Compared" icon={<Scale className="h-5 w-5" />} />
          <StatCard
            value={<span className="text-destructive">{SHORTAGES.length}</span>}
            label="Skills in Shortage"
            icon={<TrendingDown className="h-5 w-5" />}
          />
          <StatCard
            value={critical.skill}
            label={`Most Critical Gap (${critical.gap}%)`}
            icon={<AlertTriangle className="h-5 w-5" />}
          />
          <StatCard
            value={`+${biggestOversupply.gap}%`}
            label={`Largest Oversupply — ${biggestOversupply.skill}`}
            icon={<TrendingUp className="h-5 w-5" />}
          />
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="mb-1 text-lg font-bold">Demand vs Supply</h3>
            <p className="mb-4 text-sm text-muted-foreground">Industry requirement compared with student availability.</p>
            <DemandSupplyChart data={comparison} />
          </Card>
          <Card>
            <h3 className="mb-1 text-lg font-bold">Gap Analysis (Supply − Demand)</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              <span className="font-semibold text-success">Green</span> = oversupply,{" "}
              <span className="font-semibold text-destructive">red</span> = market shortage.
            </p>
            <GapChart data={gapData} />
          </Card>
        </div>
      </Section>

      {/* Ranking table */}
      <Section className="pt-0">
        <SectionTitle title="Skill Ranking Table" subtitle="Full breakdown of demand, supply, gap, and market status." />
        <Card className="overflow-x-auto p-0">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-4 font-semibold">Skill</th>
                <th className="px-5 py-4 text-right font-semibold">Demand %</th>
                <th className="px-5 py-4 text-right font-semibold">Supply %</th>
                <th className="px-5 py-4 text-right font-semibold">Gap %</th>
                <th className="px-5 py-4 text-right font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {[...SKILLS].sort((a, b) => a.gap - b.gap).map((s) => {
                const shortage = s.gap < 0;
                return (
                  <tr key={s.skill} className="border-b border-border/60 last:border-0 hover:bg-muted/50">
                    <td className="px-5 py-4 font-semibold">{s.skill}</td>
                    <td className="px-5 py-4 text-right tabular-nums">{s.demand}%</td>
                    <td className="px-5 py-4 text-right tabular-nums">{s.supply}%</td>
                    <td className={cn("px-5 py-4 text-right font-bold tabular-nums", shortage ? "text-destructive" : "text-success")}>
                      {s.gap > 0 ? "+" : ""}{s.gap}%
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
                          shortage
                            ? "bg-destructive/10 text-destructive"
                            : s.gap < 25
                              ? "bg-warning/15 text-warning"
                              : "bg-success/10 text-success",
                        )}
                      >
                        {shortage ? "Shortage" : s.gap < 25 ? "Balanced" : "Oversupply"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </Section>

      {/* Key findings */}
      <Section className="pt-0">
        <SectionTitle title="Key Findings" subtitle="The headline takeaways from the gap analysis." />
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-l-4 border-l-destructive">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
              <TrendingDown className="h-5 w-5" />
            </div>
            <h3 className="font-bold">Critical Shortage</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              <strong>{critical.skill}</strong> is the only skill where demand exceeds supply ({critical.demand}% demand vs{" "}
              {critical.supply}% supply). It's the top priority for students to learn.
            </p>
          </Card>
          <Card className="border-l-4 border-l-warning">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-warning/15 text-warning">
              <Scale className="h-5 w-5" />
            </div>
            <h3 className="font-bold">Strong Alignment</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Python shows healthy demand (40%) with solid supply (74%) — students are reasonably well-prepared for the most
              in-demand technical skill.
            </p>
          </Card>
          <Card className="border-l-4 border-l-success">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-success/10 text-success">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="font-bold">Largest Oversupply</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              <strong>{biggestOversupply.skill}</strong> (+{biggestOversupply.gap}%) far exceeds demand — a strong foundation,
              but students should diversify toward scarcer technical skills.
            </p>
          </Card>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionTitle title="Research Conclusion" subtitle="The headline takeaway from the full gap analysis." />
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 text-primary-foreground sm:p-12">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative max-w-3xl">
            <p className="text-lg leading-relaxed sm:text-xl">
              The analysis reveals that <strong>Machine Learning</strong> is the only skill where industry demand
              exceeds student supply, indicating a potential skill shortage. <strong>Excel</strong>,{" "}
              <strong>Communication Skills</strong>, <strong>SQL</strong>, and <strong>Python</strong> show strong
              student availability compared to current market demand.
            </p>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <InsightBox title="The bottom line">
          <p>
            Students hold abundant foundational and communication skills, but the market's appetite for advanced technical
            capability — especially <strong>Machine Learning</strong> — outpaces supply. Closing this single gap would
            dramatically improve graduate employability.
          </p>
        </InsightBox>
      </Section>
    </>
  );
}
