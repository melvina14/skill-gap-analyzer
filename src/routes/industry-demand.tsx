import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, TrendingUp, Trophy } from "lucide-react";
import { PageHeader, Section, SectionTitle, Card, StatCard, InsightBox } from "../components/ui-kit";
import { SkillBarChart, SkillPieChart } from "../components/charts";
import { SKILLS, DEMAND_RANKING, TOTAL_JOBS } from "../data/skills";

export const Route = createFileRoute("/industry-demand")({
  head: () => ({
    meta: [
      { title: "Industry Demand Analysis — Skill Gap Analyzer" },
      {
        name: "description",
        content:
          "What skills are employers seeking? Demand analysis across 75 job and internship postings for 8 key data skills.",
      },
      { property: "og:title", content: "Industry Demand Analysis" },
      { property: "og:description", content: "What skills are employers currently seeking?" },
    ],
  }),
  component: IndustryDemand,
});

const barData = [...SKILLS].sort((a, b) => b.demand - a.demand).map((s) => ({ name: s.short, demand: s.demand }));
const pieData = SKILLS.map((s) => ({ name: s.short, value: s.jobCount }));
const topDemand = DEMAND_RANKING[0];

function IndustryDemand() {
  return (
    <>
      <PageHeader
        eyebrow="Jobs Sheet · 75 postings"
        title="Industry Demand Analysis"
        subtitle="Measuring how often each skill is required across real job and internship postings to reveal what the market actually wants."
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard accent value={TOTAL_JOBS} label="Total Jobs Analyzed" icon={<Briefcase className="h-5 w-5" />} />
          <StatCard value={`${topDemand.demand}%`} label={`Top Skill — ${topDemand.skill}`} icon={<Trophy className="h-5 w-5" />} />
          <StatCard value={topDemand.jobCount} label={`Postings requiring ${topDemand.skill}`} icon={<TrendingUp className="h-5 w-5" />} />
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <h3 className="mb-1 text-lg font-bold">Demand Percentage by Skill</h3>
            <p className="mb-4 text-sm text-muted-foreground">Share of the 75 postings that require each skill.</p>
            <SkillBarChart data={barData} dataKey="demand" label="Demand" />
          </Card>
          <Card className="lg:col-span-2">
            <h3 className="mb-1 text-lg font-bold">Distribution of Requirements</h3>
            <p className="mb-4 text-sm text-muted-foreground">How total skill mentions split across postings.</p>
            <SkillPieChart data={pieData} dataKey="value" />
          </Card>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionTitle title="Skill Demand Ranking" subtitle="Skills ordered from most to least demanded by employers." />
        <Card className="p-0">
          <div className="space-y-1 p-4">
            {DEMAND_RANKING.map((s, i) => (
              <div key={s.skill} className="flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-muted/60">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-brand-soft text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <span className="w-32 shrink-0 text-sm font-semibold sm:w-44">{s.skill}</span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${s.demand}%` }} />
                </div>
                <span className="w-14 shrink-0 text-right text-sm font-bold tabular-nums">{s.demand}%</span>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section className="pt-0">
        <InsightBox title="What skills are employers currently seeking?">
          <p>
            <strong>{topDemand.skill}</strong> leads the market, appearing in {topDemand.demand}% of postings, followed closely
            by <strong>{DEMAND_RANKING[1].skill}</strong> ({DEMAND_RANKING[1].demand}%) and{" "}
            <strong>{DEMAND_RANKING[2].skill}</strong> ({DEMAND_RANKING[2].demand}%).
          </p>
          <p>
            Technical depth (Python, Machine Learning) and the ability to communicate insights dominate hiring criteria, while
            specialized BI tools such as Tableau remain niche. Employers reward candidates who blend programming, analytics, and
            clear communication.
          </p>
        </InsightBox>
      </Section>
    </>
  );
}
