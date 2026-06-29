import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, BarChart3 } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/industry-demand", label: "Industry Demand" },
  { to: "/student-supply", label: "Student Supply" },
  { to: "/dashboard", label: "Gap Dashboard" },
  { to: "/assessment", label: "Skill Check" },
  { to: "/recommendations", label: "Learning" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-glow">
            <BarChart3 className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Skill<span className="text-gradient">Gap</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "bg-accent text-accent-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          to="/assessment"
          className="hidden rounded-lg bg-gradient-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-card transition-transform hover:scale-[1.03] lg:inline-flex"
        >
          Check My Skills
        </Link>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "bg-accent text-accent-foreground" }}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
