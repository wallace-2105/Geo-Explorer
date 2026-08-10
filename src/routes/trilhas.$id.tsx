import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Circle,
  Code2,
  FileText,
  PlayCircle,
  Rocket,
  Timer,
} from "lucide-react";
import { toast } from "sonner";
import { LevelBadge, ProgressBlock, StatusBadge, TechBadge } from "@/components/shared/badges";
import { ErrorState } from "@/components/shared/states";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTrail } from "@/hooks/use-geo-queries";
import { trailsService } from "@/services/trails";
import type { LessonType } from "@/types";
import { formatMinutes } from "@/utils/format";

export const Route = createFileRoute("/trilhas/$id")({
  head: () => ({
    meta: [
      { title: "Detalhes da trilha | Geo-Explorer" },
      {
        name: "description",
        content:
          "Veja módulos, aulas, projeto final e progresso da trilha de aprendizagem selecionada.",
      },
      { property: "og:title", content: "Detalhes da trilha | Geo-Explorer" },
      {
        property: "og:description",
        content: "Módulos, aulas e projeto final da trilha de aprendizagem.",
      },
    ],
  }),
  component: TrailDetailPage,
});

const LESSON_ICON: Record<LessonType, typeof PlayCircle> = {
  video: PlayCircle,
  reading: FileText,
  exercise: Code2,
  project: Rocket,
};

const LESSON_LABEL: Record<LessonType, string> = {
  video: "Vídeo",
  reading: "Leitura",
  exercise: "Exercício",
  project: "Projeto",
};

function TrailDetailPage() {
  const { id } = Route.useParams();
  const { data: trail, isPending, isError, refetch } = useTrail(id);

  async function handleStart() {
    if (!trail) return;
    try {
      await trailsService.enroll(trail.id);
      toast.success(
        trail.status === "not_started" ? "Trilha iniciada!" : "Bom retorno aos estudos!",
        { description: trail.title },
      );
    } catch {
      toast.error("Não foi possível iniciar a trilha", {
        description: "Tente novamente em instantes.",
      });
    }
  }

  if (isPending) {
    return (
      <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-10 sm:px-6" aria-busy="true">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (isError || !trail) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <ErrorState
          title="Trilha não encontrada"
          description="Essa trilha não existe ou foi removida do catálogo."
          onRetry={() => void refetch()}
        />
        <div className="mt-4 text-center">
          <Button asChild variant="ghost" size="sm">
            <Link to="/trilhas">Voltar para trilhas</Link>
          </Button>
        </div>
      </div>
    );
  }

  const totalLessons = trail.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-10 px-4 py-8 sm:px-6 sm:py-12">
      <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit">
        <Link to="/trilhas">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Trilhas
        </Link>
      </Button>

      <header className="hero-surface relative overflow-hidden rounded-2xl border border-border p-6 sm:p-8">
        <div
          className="grid-backdrop pointer-events-none absolute inset-0 opacity-60"
          aria-hidden="true"
        />
        <div className="relative space-y-5">
          <div className="flex flex-wrap gap-2">
            <TechBadge technology={trail.technology} />
            <LevelBadge level={trail.level} />
            <StatusBadge status={trail.status} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold sm:text-3xl">{trail.title}</h1>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
              {trail.description}
            </p>
          </div>
          <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <BookOpen className="size-4" aria-hidden="true" />
              <dt className="sr-only">Módulos</dt>
              <dd>
                {trail.modulesCount} módulos · {totalLessons} conteúdos
              </dd>
            </div>
            <div className="flex items-center gap-1.5">
              <Timer className="size-4" aria-hidden="true" />
              <dt className="sr-only">Carga horária</dt>
              <dd>{trail.estimatedHours}h estimadas</dd>
            </div>
          </dl>
          <div className="max-w-md">
            <ProgressBlock value={trail.progress} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => void handleStart()}>
              {trail.status === "not_started"
                ? "Iniciar trilha"
                : trail.status === "completed"
                  ? "Revisar trilha"
                  : "Continuar trilha"}
            </Button>
            <Button asChild variant="outline">
              <Link to="/desafios">Praticar com um desafio</Link>
            </Button>
          </div>
        </div>
      </header>

      <section aria-labelledby="modulos" className="space-y-5">
        <h2 id="modulos" className="text-lg font-semibold">
          Módulos da trilha
        </h2>

        <ol className="relative space-y-4 border-l border-border pl-6 sm:pl-8">
          {trail.modules.map((module) => (
            <li key={module.id} className="relative">
              <span
                aria-hidden="true"
                className={
                  module.completed
                    ? "absolute -left-[31px] top-5 grid size-5 place-items-center rounded-full bg-primary text-primary-foreground sm:-left-[39px]"
                    : "absolute -left-[31px] top-5 grid size-5 place-items-center rounded-full border border-border bg-surface text-muted-foreground sm:-left-[39px]"
                }
              >
                {module.completed ? (
                  <CheckCircle2 className="size-3.5" />
                ) : (
                  <Circle className="size-3" />
                )}
              </span>

              <article className="surface-card p-5">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Módulo {module.order}
                    </p>
                    <h3 className="mt-1 font-display text-base font-semibold">{module.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{module.summary}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {module.lessons.length} conteúdos
                  </span>
                </div>

                <ul className="mt-4 divide-y divide-border/70 border-t border-border/70">
                  {module.lessons.map((lesson) => {
                    const Icon = LESSON_ICON[lesson.type];
                    return (
                      <li
                        key={lesson.id}
                        className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 py-2.5"
                      >
                        <Icon
                          className={
                            lesson.completed
                              ? "size-4 shrink-0 text-primary"
                              : "size-4 shrink-0 text-muted-foreground"
                          }
                          aria-hidden="true"
                        />
                        <span className="min-w-0">
                          <span className="block truncate text-sm">{lesson.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {LESSON_LABEL[lesson.type]}
                          </span>
                        </span>
                        <span className="shrink-0 font-mono text-xs text-muted-foreground">
                          {formatMinutes(lesson.durationMinutes)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="projeto-final" className="surface-card p-6">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-primary/12 text-primary">
            <Rocket className="size-4.5" aria-hidden="true" />
          </span>
          <h2 id="projeto-final" className="text-lg font-semibold">
            Projeto final
          </h2>
        </div>
        <h3 className="mt-4 font-display text-base font-semibold">{trail.finalProject.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{trail.finalProject.description}</p>
        <ul className="mt-4 space-y-2">
          {trail.finalProject.deliverables.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
