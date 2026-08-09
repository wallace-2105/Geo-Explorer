import { Link } from "@tanstack/react-router";
import { ArrowRight, Layers, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Trail } from "@/types";
import { LevelBadge, ProgressBlock, StatusBadge, TechBadge } from "./badges";

export function TrailCard({ trail }: { trail: Trail }) {
  const cta =
    trail.status === "completed"
      ? "Revisar trilha"
      : trail.status === "in_progress"
        ? "Continuar"
        : "Ver trilha";

  return (
    <article className="surface-card flex flex-col gap-4 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40">
      <div className="flex flex-wrap gap-2">
        <TechBadge technology={trail.technology} />
        <LevelBadge level={trail.level} />
        <StatusBadge status={trail.status} />
      </div>

      <div className="space-y-1.5">
        <h3 className="font-display text-lg font-semibold leading-snug">{trail.title}</h3>
        <p className="line-clamp-3 text-sm text-muted-foreground">{trail.description}</p>
      </div>

      <dl className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Layers className="size-3.5" aria-hidden="true" />
          <dt className="sr-only">Módulos</dt>
          <dd>{trail.modulesCount} módulos</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <Timer className="size-3.5" aria-hidden="true" />
          <dt className="sr-only">Duração estimada</dt>
          <dd>{trail.estimatedHours}h estimadas</dd>
        </div>
      </dl>

      <ProgressBlock value={trail.progress} />

      <Button asChild variant="secondary" className="mt-auto w-full justify-between">
        <Link to="/trilhas/$id" params={{ id: trail.id }}>
          {cta}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </Button>
    </article>
  );
}
