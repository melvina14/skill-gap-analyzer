// Data derived from Dataset.xlsx (Jobs: 75 postings, Students: 50 responses)
// Authoritative figures from the "Gap Analysis" sheet.
// Demand % = (jobs requiring skill / 75) * 100
// Supply % = (students possessing skill / 50) * 100
// Gap %    = Supply % - Demand %

export interface SkillRecord {
  skill: string;
  short: string;
  jobCount: number; // out of 75
  studentCount: number; // out of 50
  demand: number; // %
  supply: number; // %
  gap: number; // %
}

export const TOTAL_JOBS = 75;
export const TOTAL_STUDENTS = 50;
export const TOTAL_SKILLS = 8;

export const SKILLS: SkillRecord[] = [
  { skill: "SQL", short: "SQL", jobCount: 10, studentCount: 34, demand: 13.3, supply: 68.0, gap: 54.7 },
  { skill: "Excel", short: "Excel", jobCount: 11, studentCount: 46, demand: 14.7, supply: 92.0, gap: 77.3 },
  { skill: "Python", short: "Python", jobCount: 30, studentCount: 37, demand: 40.0, supply: 74.0, gap: 34.0 },
  { skill: "Power BI", short: "Power BI", jobCount: 7, studentCount: 23, demand: 9.3, supply: 46.0, gap: 36.7 },
  { skill: "Tableau", short: "Tableau", jobCount: 3, studentCount: 9, demand: 4.0, supply: 18.0, gap: 14.0 },
  { skill: "Statistics", short: "Stats", jobCount: 7, studentCount: 25, demand: 9.3, supply: 50.0, gap: 40.7 },
  { skill: "Machine Learning", short: "ML", jobCount: 24, studentCount: 14, demand: 32.0, supply: 28.0, gap: -4.0 },
  { skill: "Communication Skills", short: "Comm-skills", jobCount: 23, studentCount: 48, demand: 30.7, supply: 96.0, gap: 65.3 },
];

export const SKILL_NAMES = SKILLS.map((s) => s.skill);

// Skills ranked by market demand (descending)
export const DEMAND_RANKING = [...SKILLS].sort((a, b) => b.demand - a.demand);

// Skills ranked by student supply (descending)
export const SUPPLY_RANKING = [...SKILLS].sort((a, b) => b.supply - a.supply);

// Negative gap = market shortage (demand exceeds supply) -> critical
export const SHORTAGES = SKILLS.filter((s) => s.gap < 0).sort((a, b) => a.gap - b.gap);

// Large positive gap = oversupply (more students than the market needs)
export const OVERSUPPLY = [...SKILLS].sort((a, b) => b.gap - a.gap).slice(0, 3);

export interface Recommendation {
  skill: string;
  importance: string;
  demandLevel: "High" | "Medium" | "Low";
  path: string[];
  resources: string[];
}

export const RECOMMENDATIONS: Recommendation[] = [
  {
    skill: "Machine Learning",
    importance:
      "Machine Learning is the most under-supplied high-demand skill. With 32% of postings requiring it but only 28% of students equipped, it is the single most critical gap to close.",
    demandLevel: "High",
    path: [
      "Master Python fundamentals & NumPy/Pandas",
      "Learn core ML algorithms (regression, trees, clustering)",
      "Build projects with scikit-learn",
      "Explore deep learning with TensorFlow / PyTorch",
      "Deploy a model end-to-end",
    ],
    resources: ["Andrew Ng – Machine Learning", "fast.ai", "Kaggle Competitions"],
  },
  {
    skill: "Python",
    importance:
      "Python is the highest-demand technical skill (40% of jobs). It underpins data analysis, automation, and machine learning workflows.",
    demandLevel: "High",
    path: [
      "Syntax, data structures & functions",
      "Pandas & NumPy for data wrangling",
      "Visualization with Matplotlib / Seaborn",
      "APIs, automation & scripting",
    ],
    resources: ["Python for Everybody", "Real Python", "Automate the Boring Stuff"],
  },
  {
    skill: "Communication Skills",
    importance:
      "Communication appears in 31% of postings — employers consistently seek candidates who can present insights clearly to non-technical stakeholders.",
    demandLevel: "High",
    path: [
      "Data storytelling fundamentals",
      "Presentation & visualization design",
      "Stakeholder reporting practice",
      "Mock interviews & case presentations",
    ],
    resources: ["Storytelling with Data", "Toastmasters", "LinkedIn Learning"],
  },
  {
    skill: "SQL",
    importance:
      "SQL is foundational for every data role. Demand sits at 13%, and fluency is expected even when not explicitly listed.",
    demandLevel: "Medium",
    path: [
      "SELECT, WHERE, ORDER BY basics",
      "JOINs & aggregations",
      "Subqueries & window functions",
      "Query optimization",
    ],
    resources: ["Mode SQL Tutorial", "SQLZoo", "LeetCode Database"],
  },
  {
    skill: "Power BI",
    importance:
      "Power BI powers business reporting. 9% of postings require it, and it pairs strongly with Excel and SQL.",
    demandLevel: "Medium",
    path: [
      "Connect & transform data with Power Query",
      "Build interactive dashboards",
      "Write DAX measures",
      "Publish & share reports",
    ],
    resources: ["Microsoft Learn – Power BI", "Enterprise DNA", "SQLBI"],
  },
  {
    skill: "Excel",
    importance:
      "Excel remains a baseline analytics tool (15% of postings) and the gateway to formulas, pivot tables, and modeling.",
    demandLevel: "Medium",
    path: [
      "Formulas & functions",
      "Pivot tables & charts",
      "Lookup functions & data cleaning",
      "Dashboards & what-if analysis",
    ],
    resources: ["Excel Exposure", "Chandoo.org", "Microsoft Learn"],
  },
  {
    skill: "Statistics",
    importance:
      "Statistics underpins sound analysis and modeling. 9% of postings list it, and it strengthens every other data skill.",
    demandLevel: "Medium",
    path: [
      "Descriptive statistics",
      "Probability & distributions",
      "Hypothesis testing",
      "Regression & inference",
    ],
    resources: ["Khan Academy Statistics", "StatQuest", "Think Stats"],
  },
  {
    skill: "Tableau",
    importance:
      "Tableau is a leading visualization platform. Demand is lower (4%) but it differentiates candidates in BI-focused roles.",
    demandLevel: "Low",
    path: [
      "Connect data sources",
      "Build worksheets & charts",
      "Create dashboards & stories",
      "Publish to Tableau Public",
    ],
    resources: ["Tableau Public", "Tableau eLearning", "Workout Wednesday"],
  },
];
