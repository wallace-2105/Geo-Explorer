import type { LucideIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { Difficulty, Level, Technology, TrailStatus } from "@/types";
import { DIFFICULTY_LABEL, TRAIL_STATUS_LABEL } from "@/types";
import { difficultyTone, levelTone, statusTone, technologyAccent } from "@/utils/format";

const toneClass: Record<string, string> = {
  beginner: "bg-success/12 text-success ring-success/30",
  intermediate: "bg-warning/12 text-warning ring-warning/30",
  advanced: "bg-destructive/12 text-destructive ring-destructive/30",
  muted: "bg-secondary text-muted-foreground ring-border",
  progress: "bg-accent/12 text-accent ring-accent/30",
  done: "bg-primary/12 text-primary ring-primary/30",
};

function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TechBadge({ technology }: { technology: Technology }) {
  return (
    <Pill className={cn("bg-secondary ring-border", technologyAccent[technology])}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {technology}
    </Pill>
  );
}

export function LevelBadge({ level }: { level: Level }) {
  return <Pill className={toneClass[levelTone[level]]}>{level}</Pill>;
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return <Pill className={toneClass[difficultyTone[difficulty]]}>{DIFFICULTY_LABEL[difficulty]}</Pill>;
}

export function StatusBadge({ status }: { status: TrailStatus }) {
  return <Pill className={toneClass[statusTone[status]]}>{TRAIL_STATUS_LABEL[status]}</Pill>;
}

export function ProgressBlock({
  value,
  label = "Progresso",
}: {
  value: number;
  label?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span className="font-mono text-foreground">{value}%</span>
      </div>
      <Progress value={value} aria-label={`${label}: ${value}%`} className="h-1.5" />
    </div>
  );
}

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="surface-card group relative overflow-hidden p-5 transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 font-display text-3xl font-semibold tabular-nums">{value}</p>
          {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary transition-transform group-hover:scale-105">
          <Icon className="size-4.5" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
