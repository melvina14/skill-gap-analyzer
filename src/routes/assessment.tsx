import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles, RotateCcw, ArrowRight, ThumbsUp, AlertCircle, BookOpen } from "lucide-react";
import { PageHeader, Section, Card } from "../components/ui-kit";
import { SKILLS } from "../data/skills";
import { cn } from "../lib/utils";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Student Skill Assessment — Skill Gap Analyzer" },
      {
        name: "description",
        content:
          "Interactive skill checker: select the skills you possess and instantly get your market readiness score, strengths, and missing high-demand skills.",
      },
      { property: "og:title", content: "Student Skill Assessment" },
      { property: "og:description", content: "Select your skills and get an instant market-readiness score." },
    ],
  }),
  component: Assessment,
});

const HIGH_DEMAND_THRESHOLD = 25; // % demand considered "high-demand"
const totalDemand = SKILLS.reduce((sum, s) => sum + s.demand, 0);

function Assessment() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [result, setResult] = useState<ReturnType<typeof compute> | null>(null);

  const toggle = (skill: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(skill) ? next.delete(skill) : next.add(skill);
      return next;
    });

  function compute(picked: Set<string>) {
    const haveDemand = SKILLS.filter((s) => picked.has(s.skill)).reduce((sum, s) => sum + s.demand, 0);
    const readiness = Math.round((haveDemand / totalDemand) * 100);
    const highDemand = SKILLS.filter((s) => s.demand >= HIGH_DEMAND_THRESHOLD);
    const haveHigh = highDemand.filter((s) => picked.has(s.skill));
    const industryMatch = highDemand.length
      ? Math.round((haveHigh.length / highDemand.length) * 100)
      : 0;
    const strong = SKILLS.filter((s) => picked.has(s.skill) && s.demand >= HIGH_DEMAND_THRESHOLD);
    const missingHigh = SKILLS.filter((s) => !picked.has(s.skill) && s.demand >= HIGH_DEMAND_THRESHOLD).sort(
      (a, b) => b.demand - a.demand,
    );
    const recommended = SKILLS.filter((s) => !picked.has(s.skill)).sort((a, b) => b.demand - a.demand).slice(0, 4);
    return { readiness, industryMatch, strong, missingHigh, recommended };
  }

  const analyze = () => setResult(compute(selected));
  const reset = () => {
    setSelected(new Set());
    setResult(null);
  };

  const radarData = useMemo(
    () => SKILLS.map((s) => ({ name: s.short, You: selected.has(s.skill) ? 100 : 0, Demand: s.demand })),
    [selected],
  );

  const verdict =
    !result ? "" : result.readiness >= 70 ? "Market Ready" : result.readiness >= 40 ? "Getting There" : "Needs Work";

  return (
    <>
      <PageHeader
        eyebrow="Interactive · No login required"
        title="Student Skill Assessment"
        subtitle="Select the skills you currently possess, then analyze your readiness against real industry demand."
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-lg font-bold">Select your skills</h3>
            <p className="mt-1 text-sm text-muted-foreground">Tick every skill you're confident using.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {SKILLS.map((s) => {
                const active = selected.has(s.skill);
                return (
                  <button
                    key={s.skill}
                    onClick={() => toggle(s.skill)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all",
                      active
                        ? "border-primary bg-gradient-brand-soft ring-2 ring-primary/30"
                        : "border-border bg-card hover:border-primary/40 hover:bg-muted/50",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors",
                        active ? "border-primary bg-gradient-brand text-primary-foreground" : "border-muted-foreground/40",
                      )}
                    >
                      {active && <Check className="h-4 w-4" />}
                    </span>
                    <span className="text-sm font-semibold">{s.skill}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={analyze}
                disabled={selected.size === 0}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-card transition-transform enabled:hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" /> Analyze
              </button>
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
            </div>
          </Card>

          <Card className="flex flex-col">
            <h3 className="text-lg font-bold">Your skills vs market demand</h3>
            <p className="mt-1 text-sm text-muted-foreground">A radar view of your coverage against demand.</p>
            <div className="mt-2 flex-1">
              <SkillRadarChartDual data={radarData} />
            </div>
          </Card>
        </div>
      </Section>

      {result && (
        <Section className="pt-0">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Score gauges */}
            {/* Readiness */}
            <Card className="flex flex-col items-center justify-center text-center">
              <div className="relative flex h-40 w-40 items-center justify-center">
                <svg className="h-40 w-40 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="oklch(0.92 0.01 264)" strokeWidth="12" />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="url(#grad)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${(result.readiness / 100) * 327} 327`}
                  />
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#5b3fd6" />
                      <stop offset="100%" stopColor="#9333ea" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute flex flex-col">
                  <span className="font-display text-4xl font-extrabold text-gradient">{result.readiness}%</span>
                  <span className="text-xs text-muted-foreground">Readiness</span>
                </div>
              </div>
              <span
                className={cn(
                  "mt-4 rounded-full px-4 py-1.5 text-sm font-semibold",
                  result.readiness >= 70
                    ? "bg-success/10 text-success"
                    : result.readiness >= 40
                      ? "bg-warning/15 text-warning"
                      : "bg-destructive/10 text-destructive",
                )}
              >
                {verdict}
              </span>
              <p className="mt-3 text-sm text-muted-foreground">
                Weighted by how strongly the market demands each skill you selected.
              </p>
            </Card>

            {/* Industry Match */}
            <Card className="flex flex-col items-center justify-center text-center">
              <div className="relative flex h-40 w-40 items-center justify-center">
                <svg className="h-40 w-40 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="oklch(0.92 0.01 264)" strokeWidth="12" />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="url(#grad2)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${(result.industryMatch / 100) * 327} 327`}
                  />
                  <defs>
                    <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#9333ea" />
                      <stop offset="100%" stopColor="#2a9bd1" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute flex flex-col">
                  <span className="font-display text-4xl font-extrabold text-gradient">{result.industryMatch}%</span>
                  <span className="text-xs text-muted-foreground">Industry Match</span>
                </div>
              </div>
              <span
                className={cn(
                  "mt-4 rounded-full px-4 py-1.5 text-sm font-semibold",
                  result.industryMatch >= 70
                    ? "bg-success/10 text-success"
                    : result.industryMatch >= 40
                      ? "bg-warning/15 text-warning"
                      : "bg-destructive/10 text-destructive",
                )}
              >
                {result.strong.length} of {result.strong.length + result.missingHigh.length} high-demand skills
              </span>
              <p className="mt-3 text-sm text-muted-foreground">
                Share of the market's high-demand skills that you already cover.
              </p>
            </Card>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {/* Strong skills */}
            <Card>
              <div className="mb-3 flex items-center gap-2 text-success">
                <ThumbsUp className="h-5 w-5" />
                <h3 className="font-bold text-foreground">Strong Skills</h3>
              </div>
              {result.strong.length ? (
                <ul className="space-y-2">
                  {result.strong.map((s) => (
                    <li key={s.skill} className="flex items-center justify-between rounded-lg bg-success/5 px-3 py-2 text-sm">
                      <span className="font-medium">{s.skill}</span>
                      <span className="text-xs font-semibold text-success">{s.demand}% demand</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  You haven't selected any high-demand skills yet. Focus on the recommendations to build market-valued strengths.
                </p>
              )}
            </Card>

            {/* Missing high-demand */}
            <Card>
              <div className="mb-3 flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <h3 className="font-bold text-foreground">Missing High-Demand Skills</h3>
              </div>
              {result.missingHigh.length ? (
                <ul className="space-y-2">
                  {result.missingHigh.map((s) => (
                    <li key={s.skill} className="flex items-center justify-between rounded-lg bg-destructive/5 px-3 py-2 text-sm">
                      <span className="font-medium">{s.skill}</span>
                      <span className="text-xs font-semibold text-destructive">{s.demand}% demand</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Excellent — you cover every high-demand skill in this analysis!
                </p>
              )}
            </Card>
          </div>

          {/* Recommended */}
          <Card className="mt-6">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold">Recommended Skills To Learn</h3>
            </div>
            {result.recommended.length ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {result.recommended.map((s) => (
                  <div key={s.skill} className="rounded-xl border border-border p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">{s.skill}</span>
                      <span className="rounded-full bg-gradient-brand-soft px-2 py-0.5 text-xs font-semibold text-primary">
                        {s.demand}%
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">Demanded by {s.jobCount} of 75 postings.</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">You already possess every skill in the analysis. Outstanding!</p>
            )}
            <Link
              to="/recommendations"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-card transition-transform hover:scale-[1.03]"
            >
              View full learning roadmap <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
        </Section>
      )}
    </>
  );
}

// Dual-series radar (You vs Demand)
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
} from "recharts";

function SkillRadarChartDual({ data }: { data: { name: string; You: number; Demand: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <RadarChart data={data} outerRadius="70%">
        <PolarGrid stroke="#e3e0ee" />
        <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b6685" }} />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: "#9b96b0" }} />
        <Radar name="You" dataKey="You" stroke="#5b3fd6" fill="#5b3fd6" fillOpacity={0.35} />
        <Radar name="Demand" dataKey="Demand" stroke="#9333ea" fill="#9333ea" fillOpacity={0.15} />
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e6e3f0", fontSize: 13 }} formatter={(v: number) => `${v}%`} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
