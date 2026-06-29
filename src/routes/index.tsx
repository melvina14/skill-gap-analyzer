import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Briefcase,
  Users,
  Layers,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Target,
  LineChart,
  GraduationCap,
  CheckCircle2,
  Code2,
  Brain,
  MessageSquare,
  PieChart,
} from "lucide-react";
import { Section, SectionTitle, StatCard, Card } from "../components/ui-kit";
import { DemandSupplyChart } from "../components/charts";
import {
  SKILLS,
  TOTAL_JOBS,
  TOTAL_STUDENTS,
  TOTAL_SKILLS,
  SHORTAGES,
} from "../data/skills";
import { cn } from "../lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Skill Gap Analyzer — Student Skills vs Industry Demand" },
      {
        name: "description",
        content:
          "Analyzing the gap between student skills and industry requirements using 75 job postings and 50 student survey responses across 8 in-demand data skills.",
      },
      { property: "og:title", content: "Skill Gap Analyzer" },
      {
        property: "og:description",
        content:
          "Analyzing the gap between student skills and industry requirements using real-world data.",
      },
    ],
  }),
  component: Home,
});

const chartData = SKILLS.map((s) => ({ name: s.short, Demand: s.demand, Supply: s.supply }));

function Home() {
  const criticalGap = SHORTAGES[0];

  const insights = [
    {
      label: "Most Demanded Skill",
      value: "Python",
      sub: "40%",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      label: "Biggest Skill Gap",
      value: "Machine Learning",
      sub: "Demand exceeds supply",
      icon: <Brain className="h-5 w-5" />,
    },
    {
      label: "Strongest Student Skill",
      value: "Communication Skills",
      sub: "96%",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      label: "Lowest Demand Skill",
      value: "Tableau",
      sub: "4%",
      icon: <TrendingDown className="h-5 w-5" />,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-secondary/30 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="animate-float-up inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur">
            <TrendingUp className="h-3.5 w-3.5" /> Data Analytics Research Project
          </div>
          <h1 className="animate-float-up mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            Skill Gap <span className="text-primary-foreground/70">Analyzer</span>
          </h1>
          <p className="animate-float-up mt-6 max-w-2xl text-lg font-semibold text-primary-foreground/90 sm:text-xl">
            Bridging the Gap Between Student Skills and Industry Needs
          </p>
          <p className="animate-float-up mt-3 max-w-2xl text-base text-primary-foreground/75">
            Analyzing the gap between student skills and industry requirements using real-world data
            from {TOTAL_JOBS} job postings and {TOTAL_STUDENTS} student survey responses.
          </p>
          <div className="animate-float-up mt-8 flex flex-wrap gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary shadow-glow transition-transform hover:scale-[1.03]"
            >
              Explore Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-primary-foreground backdrop-blur transition-colors hover:bg-white/20"
            >
              Check My Skills
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Section className="-mt-12 lg:-mt-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard accent value={TOTAL_JOBS} label="Job Postings Analyzed" icon={<Briefcase className="h-5 w-5" />} />
          <StatCard value={TOTAL_STUDENTS} label="Student Responses Collected" icon={<Users className="h-5 w-5" />} />
          <StatCard value={TOTAL_SKILLS} label="Skills Evaluated" icon={<Layers className="h-5 w-5" />} />
          <StatCard
            value={<span className="text-destructive">{criticalGap.skill}</span>}
            label="Most Critical Skill Shortage"
            icon={<TrendingUp className="h-5 w-5" />}
          />
        </div>
      </Section>

      {/* Key Findings */}
      <Section>
        <SectionTitle
          title="Key Findings"
          subtitle="Skill-by-skill comparison of industry demand against student supply, with the resulting gap."
        />
        <Card className="overflow-x-auto p-0">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-4 font-semibold">Skill</th>
                <th className="px-5 py-4 text-right font-semibold">Job Demand (75)</th>
                <th className="px-5 py-4 text-right font-semibold">Demand %</th>
                <th className="px-5 py-4 text-right font-semibold">Students (50)</th>
                <th className="px-5 py-4 text-right font-semibold">Supply %</th>
                <th className="px-5 py-4 text-right font-semibold">Gap %</th>
              </tr>
            </thead>
            <tbody>
              {SKILLS.map((s) => {
                const shortage = s.gap < 0;
                return (
                  <tr key={s.skill} className="border-b border-border/60 last:border-0 transition-colors hover:bg-muted/40">
                    <td className="px-5 py-3.5 font-semibold">{s.skill}</td>
                    <td className="px-5 py-3.5 text-right tabular-nums">{s.jobCount}</td>
                    <td className="px-5 py-3.5 text-right tabular-nums">{s.demand}%</td>
                    <td className="px-5 py-3.5 text-right tabular-nums">{s.studentCount}</td>
                    <td className="px-5 py-3.5 text-right tabular-nums">{s.supply}%</td>
                    <td className={cn("px-5 py-3.5 text-right font-bold tabular-nums", shortage ? "text-destructive" : "text-success")}>
                      {s.gap > 0 ? "+" : ""}{s.gap}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </Section>

      {/* Snapshot chart */}
      <Section>
        <SectionTitle
          title="Industry Skill Gap Insights"
          subtitle="A side-by-side look at what the market demands versus what students currently supply, across all eight skills."
        />
        <Card>
          <DemandSupplyChart data={chartData} />
        </Card>
      </Section>

      {/* Key Insights */}
      <Section>
        <SectionTitle
          title="Key Insights"
          subtitle="The most important takeaways from our analysis of 75 job postings and 50 student responses."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {insights.map((insight) => (
            <Card key={insight.label} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand-soft text-primary">
                {insight.icon}
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{insight.label}</p>
              <p className="mt-1 text-xl font-bold">{insight.value}</p>
              <p className="mt-1 text-sm font-medium text-primary">{insight.sub}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Objective */}
      <section className="bg-muted/50">
        <Section>
          <SectionTitle
            title="Why Skill Gap Analysis Matters"
            subtitle="Bridging the distance between classroom learning and employer expectations is the fastest path to employability."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <Target className="h-6 w-6" />,
                title: "Pinpoint Missing Skills",
                body: "Identify exactly which high-demand skills students lack, so learning effort targets what employers actually want.",
              },
              {
                icon: <LineChart className="h-6 w-6" />,
                title: "Data-Driven Decisions",
                body: "Move beyond guesswork — every recommendation is grounded in real job postings and survey responses.",
              },
              {
                icon: <GraduationCap className="h-6 w-6" />,
                title: "Boost Employability",
                body: "Help students align their preparation with market reality and stand out in a competitive job market.",
              },
            ].map((o) => (
              <Card key={o.title}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand-soft text-primary">
                  {o.icon}
                </div>
                <h3 className="text-lg font-bold">{o.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{o.body}</p>
              </Card>
            ))}
          </div>
        </Section>
      </section>

      {/* Explore Dashboard */}
      <Section>
        <SectionTitle
          title="Explore Dashboard"
          subtitle="Dive deeper into the data across dedicated analysis pages."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { to: "/industry-demand", label: "Industry Demand", desc: "What employers seek" },
            { to: "/student-supply", label: "Student Supply", desc: "What students know" },
            { to: "/dashboard", label: "Gap Dashboard", desc: "Demand vs supply" },
            { to: "/assessment", label: "Skill Check", desc: "Test your readiness" },
          ].map((c) => (
            <Link key={c.to} to={c.to}>
              <Card className="group h-full transition-transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">{c.label}</h3>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero px-6 py-14 text-center text-primary-foreground sm:px-12">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative">
            <CheckCircle2 className="mx-auto h-10 w-10" />
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Ready to find your skill gaps?</h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
              Run the interactive skill assessment to get your personalized readiness score and a tailored learning roadmap.
            </p>
            <Link
              to="/assessment"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary shadow-glow transition-transform hover:scale-[1.03]"
            >
              Start Skill Assessment <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
