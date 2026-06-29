import type { ReactNode } from "react";
import { cn } from "../lib/utils";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {eyebrow && (
          <p className="animate-float-up text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
            {eyebrow}
          </p>
        )}
        <h1 className="animate-float-up mt-3 max-w-3xl text-3xl font-extrabold sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="animate-float-up mt-4 max-w-2xl text-base text-primary-foreground/80 sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export function Section({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16", className)}>
      {children}
    </section>
  );
}

export function SectionTitle({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 max-w-2xl", className)}>
      <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function StatCard({
  value,
  label,
  icon,
  accent,
}: {
  value: ReactNode;
  label: string;
  icon?: ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 shadow-card transition-transform hover:-translate-y-1",
        accent
          ? "border-transparent bg-gradient-brand text-primary-foreground"
          : "border-border bg-card text-card-foreground",
      )}
    >
      {icon && (
        <div
          className={cn(
            "mb-4 flex h-11 w-11 items-center justify-center rounded-xl",
            accent ? "bg-white/15" : "bg-gradient-brand-soft text-primary",
          )}
        >
          {icon}
        </div>
      )}
      <div className="font-display text-3xl font-extrabold sm:text-4xl">{value}</div>
      <div className={cn("mt-1 text-sm", accent ? "text-primary-foreground/80" : "text-muted-foreground")}>
        {label}
      </div>
    </div>
  );
}

export function InsightBox({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-gradient-brand-soft p-6">
      <h3 className="text-lg font-bold text-primary">{title}</h3>
      <div className="mt-3 space-y-2 text-sm text-foreground/80">{children}</div>
    </div>
  );
}
