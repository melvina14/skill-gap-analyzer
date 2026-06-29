import { Link } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { TOTAL_JOBS, TOTAL_STUDENTS, TOTAL_SKILLS } from "../data/skills";

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground">
              <BarChart3 className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold">Skill Gap Analyzer</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-background/60">
            A data-driven analysis comparing student skills against real industry demand to help
            learners close the gap.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-background">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-background/60">
            <li><Link to="/industry-demand" className="hover:text-background">Industry Demand</Link></li>
            <li><Link to="/student-supply" className="hover:text-background">Student Supply</Link></li>
            <li><Link to="/dashboard" className="hover:text-background">Gap Dashboard</Link></li>
            <li><Link to="/assessment" className="hover:text-background">Skill Assessment</Link></li>
            <li><Link to="/recommendations" className="hover:text-background">Learning Paths</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-background">Project Details</h4>
          <ul className="mt-4 space-y-2 text-sm text-background/60">
            <li><span className="text-background/80">Project:</span> Skill Gap Analyzer</li>
            <li><span className="text-background/80">Department:</span> Integrated Msc Computational Statistics &amp; Data Analytics</li>
            <li><span className="text-background/80">Academic Year:</span> 2023–2028</li>
            <li>{TOTAL_JOBS} job postings · {TOTAL_STUDENTS} student responses · {TOTAL_SKILLS} skills</li>
            <li><Link to="/about" className="hover:text-background">Methodology &amp; sources</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10 py-5 text-center text-xs text-background/50">
        © {new Date().getFullYear()} Skill Gap Analyzer — Built using real student survey and job market data. React, TypeScript &amp; Recharts.
      </div>
    </footer>
  );
}
