import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Users, Database, Sigma, Target, CheckCircle2 } from "lucide-react";
import { PageHeader, Section, SectionTitle, Card } from "../components/ui-kit";
import { SKILL_NAMES, TOTAL_JOBS, TOTAL_STUDENTS } from "../data/skills";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Methodology — Skill Gap Analyzer" },
      {
        name: "description",
        content:
          "How the Skill Gap Analyzer works: data collection from 75 job postings and 50 student responses, the demand/supply/gap formulas, objectives, and conclusions.",
      },
      { property: "og:title", content: "About & Methodology" },
      { property: "og:description", content: "Data collection, methodology, formulas, objectives, and conclusions." },
    ],
  }),
  component: About,
});

const formulas = [
  { icon: <Briefcase className="h-5 w-5" />, label: "Demand %", formula: "(Jobs requiring skill ÷ 75 jobs) × 100" },
  { icon: <Users className="h-5 w-5" />, label: "Supply %", formula: "(Students possessing skill ÷ 50 students) × 100" },
  { icon: <Sigma className="h-5 w-5" />, label: "Gap %", formula: "Supply % − Demand %" },
];

function About() {
  return (
    <>
      <PageHeader
        eyebrow="About the project"
        title="About & Methodology"
        subtitle="A transparent look at how this analysis was built — the data, the formulas, and what we learned."
      />

      <Section>
        <SectionTitle
          title="Data Collection"
          subtitle="The analysis combines two real-world datasets to compare market demand with student supply."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand-soft text-primary">
              <Briefcase className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold">{TOTAL_JOBS} Job & Internship Postings</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Each posting was reviewed and tagged for which of the eight skills it required, building the demand side of the
              analysis (the <em>Jobs</em> sheet).
            </p>
          </Card>
          <Card>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand-soft text-primary">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold">{TOTAL_STUDENTS} Student Survey Responses</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Students reported the skills they currently possess, building the supply side of the analysis (the{" "}
              <em>Students</em> sheet).
            </p>
          </Card>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionTitle title="Skills Analyzed" subtitle="Eight skills central to data analytics and data science roles." />
        <Card>
          <div className="flex flex-wrap gap-3">
            {SKILL_NAMES.map((s) => (
              <span key={s} className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-2 text-sm font-semibold">
                <Database className="h-4 w-4 text-primary" /> {s}
              </span>
            ))}
          </div>
        </Card>
      </Section>

      <Section className="pt-0">
        <SectionTitle title="Methodology" subtitle="Three simple formulas turn raw counts into comparable percentages." />
        <div className="grid gap-6 md:grid-cols-3">
          {formulas.map((f) => (
            <Card key={f.label}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold">{f.label}</h3>
              <code className="mt-3 block rounded-lg bg-muted px-3 py-2 text-sm text-foreground">{f.formula}</code>
            </Card>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          A <strong>positive gap</strong> means more students possess the skill than the market needs (oversupply). A{" "}
          <strong>negative gap</strong> means demand exceeds supply (a shortage that students should prioritize).
        </p>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <div className="mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold">Project Objectives</h3>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Quantify the gap between student skills and industry requirements.",
                "Identify which high-demand skills students most often lack.",
                "Provide actionable, prioritized learning recommendations.",
                "Equip students with a self-assessment tool to measure readiness.",
              ].map((o) => (
                <li key={o} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {o}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <div className="mb-4 flex items-center gap-2">
              <Sigma className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold">Conclusions</h3>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "Students excel in foundational tools (Excel) and communication.",
                "Machine Learning is the most critical shortage — demand outpaces supply.",
                "Python is in high demand and reasonably well-supplied.",
                "Targeting advanced technical skills offers the biggest employability gains.",
              ].map((o) => (
                <li key={o} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {o}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>
    </>
  );
}
