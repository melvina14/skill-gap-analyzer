import { createFileRoute } from "@tanstack/react-router";
import { Users, GraduationCap, Star } from "lucide-react";
import { PageHeader, Section, SectionTitle, Card, StatCard, InsightBox } from "../components/ui-kit";
import { SkillBarChart, SkillRadarChart } from "../components/charts";
import { SKILLS, SUPPLY_RANKING, TOTAL_STUDENTS } from "../data/skills";

export const Route = createFileRoute("/student-supply")({
  head: () => ({
    meta: [
      { title: "Student Skill Supply Analysis — Skill Gap Analyzer" },
      {
        name: "description",
        content:
          "What skills do students currently possess? Supply analysis across 50 student survey responses for 8 key data skills.",
      },
      { property: "og:title", content: "Student Skill Supply Analysis" },
      { property: "og:description", content: "What skills do students currently possess?" },
    ],
  }),
  component: StudentSupply,
});

const barData = [...SKILLS].sort((a, b) => b.supply - a.supply).map((s) => ({ name: s.short, supply: s.supply }));
const radarData = SKILLS.map((s) => ({ name: s.short, supply: s.supply }));
const topSupply = SUPPLY_RANKING[0];
const lowSupply = SUPPLY_RANKING[SUPPLY_RANKING.length - 1];

function StudentSupply() {
  return (
    <>
      <PageHeader
        eyebrow="Students Sheet · 50 responses"
        title="Student Skill Supply Analysis"
        subtitle="Measuring how many surveyed students currently possess each skill to understand the talent pool's strengths and gaps."
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard accent value={TOTAL_STUDENTS} label="Students Surveyed" icon={<Users className="h-5 w-5" />} />
          <StatCard value={`${topSupply.supply}%`} label={`Most Common — ${topSupply.skill}`} icon={<Star className="h-5 w-5" />} />
          <StatCard value={`${lowSupply.supply}%`} label={`Least Common — ${lowSupply.skill}`} icon={<GraduationCap className="h-5 w-5" />} />
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="mb-1 text-lg font-bold">Supply Percentage by Skill</h3>
            <p className="mb-4 text-sm text-muted-foreground">Share of the 50 students who possess each skill.</p>
            <SkillBarChart data={barData} dataKey="supply" label="Supply" color="#9333ea" />
          </Card>
          <Card>
            <h3 className="mb-1 text-lg font-bold">Skill Coverage Profile</h3>
            <p className="mb-4 text-sm text-muted-foreground">Radar view of overall student skill coverage.</p>
            <SkillRadarChart data={radarData} dataKey="supply" />
          </Card>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionTitle title="Summary Cards" subtitle="Quick view of every skill and how widely students hold it." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SUPPLY_RANKING.map((s) => (
            <Card key={s.skill} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{s.skill}</span>
                <span className="text-lg font-extrabold text-secondary">{s.supply}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-secondary" style={{ width: `${s.supply}%` }} />
              </div>
              <span className="text-xs text-muted-foreground">{s.studentCount} of {TOTAL_STUDENTS} students</span>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <InsightBox title="What skills do students currently possess?">
          <p>
            Students are strongest in foundational and soft skills: <strong>{topSupply.skill}</strong> ({topSupply.supply}%) and{" "}
            <strong>{SUPPLY_RANKING[1].skill}</strong> ({SUPPLY_RANKING[1].supply}%) are nearly universal.
          </p>
          <p>
            Advanced, specialized capabilities lag behind — <strong>{lowSupply.skill}</strong> sits at just {lowSupply.supply}%,
            and Machine Learning remains uncommon. This signals strong basics but limited depth in the high-value technical areas
            employers increasingly require.
          </p>
        </InsightBox>
      </Section>
    </>
  );
}
