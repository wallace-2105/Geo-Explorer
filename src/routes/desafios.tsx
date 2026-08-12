import { createFileRoute } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Lock,
  RefreshCw,
  Send,
  Sparkles,
  Terminal,
  Trophy,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DifficultyBadge, LevelBadge, TechBadge } from "@/components/shared/badges";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState, ErrorState } from "@/components/shared/states";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useGenerateChallenge, useSubmitChallenge } from "@/hooks/use-geo-queries";
import type { Difficulty, Level, Technology } from "@/types";
import { DIFFICULTY_LABEL, LEVELS, TECHNOLOGIES } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/services/api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/desafios")({
  head: () => ({
    meta: [
      { title: "Desafios de programação | Geo-Explorer" },
      {
        name: "description",
        content:
          "Gere desafios de programação por tecnologia, nível e dificuldade, e envie sua solução para avaliação.",
      },
      { property: "og:title", content: "Desafios de programação | Geo-Explorer" },
      {
        property: "og:description",
        content: "Pratique com desafios sob medida por tecnologia, nível e dificuldade.",
      },
    ],
  }),
  component: ChallengesPage,
});

const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

// ─── Types for Language phases ───────────────────────────────────────────────
interface PhaseTestResult {
  passed: boolean;
  description: string;
  input: string;
  expected: string;
  received: string;
  error?: string;
}

interface PhaseEvalResult {
  passedTests: number;
  totalTests: number;
  score: number;
  status: "passed" | "failed";
  results: PhaseTestResult[];
  feedback: string;
}

interface PhaseChallenge {
  id: string;
  phase: number;
  level: Level;
  difficulty: Difficulty;
  title: string;
  description: string;
  requirements: string[];
  starterCode: string;
  testCases: Array<{ input: string; expected: string; description: string }>;
  hint: string;
  example: { input: string; output: string; explanation: string };
}

// ─── Language Phases Mode ────────────────────────────────────────────────────
function useLanguagePhases(technology: Technology, level: Level, difficulty: Difficulty, enabled: boolean) {
  return useQuery({
    queryKey: ["lang-phases", technology, level, difficulty],
    queryFn: () =>
      apiRequest<PhaseChallenge[]>(`/${technology.toLowerCase()}/phases?level=${encodeURIComponent(level)}&difficulty=${difficulty}`),
    enabled,
    staleTime: 1000 * 60 * 60,
  });
}

function useLanguageSubmit(technology: Technology) {
  return useMutation({
    mutationFn: ({ id, code }: { id: string; code: string }) =>
      apiRequest<PhaseEvalResult>(`/${technology.toLowerCase()}/phases/${id}/submit`, {
        method: "POST",
        body: JSON.stringify({ code }),
      }),
  });
}

// ─── Phase Progress Bar ─────────────────────────────────────────────
function PhaseProgressBar({
  phases,
  current,
  completed,
  onSelect,
}: {
  phases: PhaseChallenge[];
  current: number;
  completed: Set<number>;
  onSelect: (phase: number) => void;
}) {
  const progressPct = (completed.size / phases.length) * 100;

  return (
    <div className="surface-card space-y-3 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">Progresso</span>
        <span className="font-mono text-sm text-muted-foreground">
          {completed.size}/{phases.length} fases
        </span>
      </div>
      <Progress value={progressPct} className="h-2" />
      <div className="flex gap-2">
        {phases.map((p) => {
          const isDone = completed.has(p.phase);
          const isActive = current === p.phase;
          const isLocked = !isDone && p.phase > Math.max(1, ...Array.from(completed)) + 1;

          return (
            <button
              key={p.id}
              onClick={() => !isLocked && onSelect(p.phase)}
              disabled={isLocked}
              title={isLocked ? "Complete a fase anterior primeiro" : p.title}
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-all",
                isDone && "bg-success/20 text-success ring-1 ring-success/40",
                isActive && !isDone && "bg-primary/20 text-primary ring-2 ring-primary/60",
                !isDone && !isActive && !isLocked && "bg-secondary text-muted-foreground hover:bg-secondary/80",
                isLocked && "cursor-not-allowed bg-secondary/40 text-muted-foreground/40",
              )}
            >
              {isDone ? <CheckCircle2 className="size-4" /> : isLocked ? <Lock className="size-3" /> : p.phase}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Phase Evaluation Results Panel ──────────────────────────────────────
function EvaluationResults({ result }: { result: PhaseEvalResult }) {
  return (
    <div
      className={cn(
        "space-y-4 rounded-xl border p-5",
        result.status === "passed"
          ? "border-success/30 bg-success/5"
          : "border-destructive/30 bg-destructive/5",
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        {result.status === "passed" ? (
          <Trophy className="mt-0.5 size-5 shrink-0 text-success" />
        ) : (
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-destructive" />
        )}
        <div className="min-w-0">
          <p className="font-semibold">
            {result.status === "passed" ? "Fase aprovada!" : "Fase não aprovada"}
            <span className="ml-2 font-mono text-sm opacity-70">{result.score}/100</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{result.feedback}</p>
        </div>
      </div>

      {/* Score bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Taxa de acerto</span>
          <span>
            {result.passedTests}/{result.totalTests} testes
          </span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              result.score === 100
                ? "bg-success"
                : result.score >= 70
                  ? "bg-primary"
                  : result.score >= 40
                    ? "bg-warning"
                    : "bg-destructive",
            )}
            style={{ width: `${result.score}%` }}
          />
        </div>
      </div>

      {/* Per-test results */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Casos de teste
        </p>
        {result.results.map((r, i) => (
          <div
            key={i}
            className={cn(
              "rounded-lg border p-3",
              r.passed ? "border-success/20 bg-success/5" : "border-destructive/20 bg-destructive/5",
            )}
          >
            <div className="flex items-center gap-2">
              {r.passed ? (
                <CheckCircle2 className="size-4 shrink-0 text-success" />
              ) : (
                <XCircle className="size-4 shrink-0 text-destructive" />
              )}
              <span className="text-sm font-medium">{r.description}</span>
            </div>
            {!r.passed && (
              <div className="mt-2 space-y-1 pl-6">
                <p className="font-mono text-xs text-muted-foreground">
                  Entrada: <span className="text-foreground">{r.input}</span>
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  Esperado: <span className="text-success/80">{r.expected}</span>
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  Recebido:{" "}
                  <span className="text-destructive/80">
                    {r.error ? `ERRO: ${r.error}` : r.received || "(sem saída)"}
                  </span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Phase Viewer ────────────────────────────────────────────────────
function PhaseMode({
  technology,
  level,
  difficulty,
}: {
  technology: Technology;
  level: Level;
  difficulty: Difficulty;
}) {
  const { data: phases, isLoading, isError } = useLanguagePhases(technology, level, difficulty, true);
  const submit = useLanguageSubmit(technology);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [code, setCode] = useState("");
  const [evalResult, setEvalResult] = useState<PhaseEvalResult | null>(null);
  const [completedPhases, setCompletedPhases] = useState<Set<number>>(new Set());
  const [showHint, setShowHint] = useState(false);

  if (isLoading) {
    return (
      <div className="surface-card space-y-4 p-6">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (isError || !phases || phases.length === 0) {
    return (
      <ErrorState
        title="Não foi possível carregar as fases"
        description="Verifique sua conexão com o backend."
        onRetry={() => window.location.reload()}
      />
    );
  }

  const phase = phases.find((p) => p.phase === currentPhase) ?? phases[0];
  const allDone = completedPhases.size === phases.length;

  if (!phase) return null;


  function handlePhaseSelect(phaseNum: number) {
    setCurrentPhase(phaseNum);
    const p = phases!.find((ph) => ph.phase === phaseNum);
    if (p) setCode(p.starterCode);
    setEvalResult(null);
    setShowHint(false);
  }

  function handleSubmit() {
    if (!code.trim() || code.trim() === phase!.starterCode.trim()) {
      toast.warning("Implemente sua solução antes de enviar.");
      return;
    }

    submit.mutate(
      { id: phase!.id, code },
      {
        onSuccess: (result) => {
          setEvalResult(result);
          if (result.status === "passed") {
            const next = new Set(completedPhases);
            next.add(currentPhase);
            setCompletedPhases(next);
            toast.success(`Fase ${currentPhase} aprovada!`, {
              description: `${result.passedTests}/${result.totalTests} testes passaram.`,
            });
            // Auto-advance to next phase
            if (currentPhase < phases!.length) {
              setTimeout(() => handlePhaseSelect(currentPhase + 1), 1200);
            }
          } else {
            toast.error("Solução recusada", {
              description: `${result.passedTests}/${result.totalTests} testes passaram.`,
            });
          }
        },
        onError: () => toast.error("Não foi possível enviar sua solução."),
      },
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <PhaseProgressBar
        phases={phases}
        current={currentPhase}
        completed={completedPhases}
        onSelect={handlePhaseSelect}
      />

      {allDone && (
        <div className="flex items-center gap-3 rounded-xl border border-success/30 bg-success/10 p-5">
          <Trophy className="size-6 text-success" />
          <div>
            <p className="font-semibold text-success">
              🏆 Python {level} {DIFFICULTY_LABEL[difficulty]} — Concluído!
            </p>
            <p className="text-sm text-muted-foreground">
              Parabéns! Você completou todas as {phases.length} fases.
            </p>
          </div>
        </div>
      )}

      {/* Challenge */}
      <article className="surface-card space-y-5 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-primary/30">
            Fase {phase.phase} de {phases.length}
          </span>
          <LevelBadge level={level} />
          <DifficultyBadge difficulty={difficulty} />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 font-mono text-xs text-muted-foreground ring-1 ring-inset ring-border">
            <Terminal className="size-3" aria-hidden="true" />
            python
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{phase.title}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{phase.description}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Requisitos</h3>
          <ul className="space-y-1.5">
            {phase.requirements.map((req) => (
              <li key={req} className="flex gap-2 text-sm text-muted-foreground">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                {req}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-surface p-4">
          <p className="font-mono text-xs text-muted-foreground">Exemplo</p>
          <p className="mt-1 font-mono text-xs">
            Entrada: <span className="text-foreground">{phase.example.input}</span>
          </p>
          <p className="mt-1 font-mono text-xs">
            Saída: <span className="text-primary">{phase.example.output}</span>
          </p>
          {phase.example.explanation && (
            <p className="mt-2 text-xs text-muted-foreground">{phase.example.explanation}</p>
          )}
        </div>

        {/* Hint toggle */}
        <button
          onClick={() => setShowHint((v) => !v)}
          className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
        >
          {showHint ? "Ocultar dica" : "Mostrar dica 💡"}
        </button>
        {showHint && (
          <div className="rounded-lg border border-warning/30 bg-warning/5 p-3 text-sm text-muted-foreground">
            💡 {phase.hint}
          </div>
        )}
      </article>

      {/* Code editor */}
      <section className="surface-card space-y-4 p-6" aria-labelledby="solucao">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <h2 id="solucao" className="truncate text-lg font-semibold">
            Sua solução — Python
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setCode(phase.starterCode);
              setEvalResult(null);
            }}
            className="shrink-0"
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            Restaurar base
          </Button>
        </div>

        <Label htmlFor="codigo-python" className="sr-only">
          Código da solução Python
        </Label>
        <Textarea
          id="codigo-python"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          rows={14}
          placeholder={phase.starterCode}
          className="resize-y bg-surface font-mono text-sm leading-relaxed"
        />

        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            {phase.testCases.length} casos de teste serão executados.
          </p>
          <Button onClick={handleSubmit} disabled={submit.isPending} className="shrink-0">
            {submit.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Executando testes…
              </>
            ) : (
              <>
                <Send className="size-4" aria-hidden="true" />
                Enviar solução
              </>
            )}
          </Button>
        </div>

        {evalResult && <EvaluationResults result={evalResult} />}
      </section>

      {/* Next phase button */}
      {evalResult?.status === "passed" && currentPhase < phases.length && (
        <Button className="w-full" onClick={() => handlePhaseSelect(currentPhase + 1)}>
          Próxima fase — Fase {currentPhase + 1}
          <ChevronRight className="size-4" />
        </Button>
      )}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
function ChallengesPage() {
  const [technology, setTechnology] = useState<Technology>("TypeScript");
  const [level, setLevel] = useState<Level>("Intermediário");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [code, setCode] = useState("");

  const generate = useGenerateChallenge();
  const submit = useSubmitChallenge();
  const challenge = generate.data;

  const isPhaseMode = technology === "Python" || technology === "JavaScript";

  function handleGenerate() {
    submit.reset();
    generate.mutate(
      { technology, level, difficulty },
      {
        onSuccess: (data) => {
          setCode(data.starterCode);
          toast.success("Desafio gerado", { description: data.title });
        },
        onError: () =>
          toast.error("Falha ao gerar o desafio", {
            description: "Verifique sua conexão e tente novamente.",
          }),
      },
    );
  }

  function handleSubmit() {
    if (!challenge) return;
    if (code.trim().length === 0) {
      toast.warning("Escreva sua solução antes de enviar.");
      return;
    }
    submit.mutate(
      { challengeId: challenge.id, code },
      {
        onSuccess: (result) =>
          result.status === "passed"
            ? toast.success("Solução aceita", { description: result.feedback })
            : toast.error("Solução recusada", { description: result.feedback }),
        onError: () => toast.error("Não foi possível enviar sua solução."),
      },
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 sm:py-12">
      <PageHeader
        eyebrow="Prática"
        title="Desafios de programação"
        description={
          isPhaseMode
            ? `Modo ${technology} — complete as 5 fases em sequência. Seu código é executado e avaliado com casos de teste reais.`
            : "Escolha tecnologia, nível e dificuldade. O desafio será gerado pelo backend com apoio de IA."
        }
      />

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="surface-card h-fit space-y-4 p-5 lg:sticky lg:top-24">
          <h2 className="font-display text-base font-semibold">Configuração</h2>

          <div className="space-y-1.5">
            <Label htmlFor="tech">Tecnologia</Label>
            <Select
              value={technology}
              onValueChange={(v) => setTechnology(v as Technology)}
            >
              <SelectTrigger id="tech" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TECHNOLOGIES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                    {(t === "Python" || t === "JavaScript") && (
                      <span className="ml-1.5 rounded bg-primary/15 px-1.5 py-0.5 text-xs text-primary">
                        Fases
                      </span>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lvl">Nível</Label>
            <Select value={level} onValueChange={(v) => setLevel(v as Level)}>
              <SelectTrigger id="lvl" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LEVELS.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="dif">Dificuldade</Label>
            <Select
              value={difficulty}
              onValueChange={(v) => setDifficulty(v as Difficulty)}
            >
              <SelectTrigger id="dif" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DIFFICULTIES.map((d) => (
                  <SelectItem key={d} value={d}>
                    {DIFFICULTY_LABEL[d]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isPhaseMode ? (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs text-muted-foreground">
              {technology === "Python" ? "🐍" : "🟨"} <span className="font-semibold text-primary">Modo {technology} Fases</span>
              <br />
              5 desafios progressivos com avaliação real do código. Complete cada fase para desbloquear a próxima.
            </div>
          ) : (
            <>
              <Button className="w-full" onClick={handleGenerate} disabled={generate.isPending}>
                {generate.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Gerando desafio…
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" aria-hidden="true" />
                    {challenge ? "Gerar novamente" : "Gerar desafio"}
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground">
                A geração e a avaliação serão executadas pelo backend (Node.js + IA/MCP).
              </p>
            </>
          )}
        </aside>

        {/* Main content */}
        <section aria-live="polite" aria-busy={generate.isPending} className="space-y-6">
          {isPhaseMode ? (
            <PhaseMode technology={technology} level={level} difficulty={difficulty} />
          ) : generate.isPending ? (
            <div className="surface-card space-y-4 p-6">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-40 w-full rounded-lg" />
            </div>
          ) : generate.isError ? (
            <ErrorState
              title="Não foi possível gerar o desafio"
              description="O serviço de geração está indisponível no momento."
              onRetry={handleGenerate}
            />
          ) : !challenge ? (
            <EmptyState
              title="Nenhum desafio gerado ainda"
              description="Defina a configuração ao lado e gere seu primeiro desafio."
              action={
                <Button size="sm" onClick={handleGenerate}>
                  <Sparkles className="size-4" aria-hidden="true" />
                  Gerar desafio
                </Button>
              }
            />
          ) : (
            <>
              <article className="surface-card space-y-5 p-6">
                <div className="flex flex-wrap gap-2">
                  <TechBadge technology={challenge.technology} />
                  <LevelBadge level={challenge.level} />
                  <DifficultyBadge difficulty={challenge.difficulty} />
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 font-mono text-xs text-muted-foreground ring-1 ring-inset ring-border">
                    <Terminal className="size-3" aria-hidden="true" />
                    {challenge.language}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">{challenge.title}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {challenge.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">Requisitos</h3>
                  <ul className="space-y-1.5">
                    {challenge.requirements.map((req) => (
                      <li key={req} className="flex gap-2 text-sm text-muted-foreground">
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                        />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Exemplos</h3>
                  {challenge.examples.map((ex, i) => (
                    <div key={i} className="rounded-lg border border-border bg-surface p-4">
                      <p className="font-mono text-xs text-muted-foreground">Entrada</p>
                      <pre className="mt-1 overflow-x-auto font-mono text-xs text-foreground">
                        {ex.input}
                      </pre>
                      <p className="mt-3 font-mono text-xs text-muted-foreground">Saída</p>
                      <pre className="mt-1 overflow-x-auto font-mono text-xs text-foreground">
                        {ex.output}
                      </pre>
                      {ex.explanation ? (
                        <p className="mt-3 text-xs text-muted-foreground">{ex.explanation}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </article>

              <section className="surface-card space-y-4 p-6" aria-labelledby="solucao">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <h2 id="solucao" className="truncate text-lg font-semibold">
                    Sua solução
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCode(challenge.starterCode)}
                    className="shrink-0"
                  >
                    <RefreshCw className="size-4" aria-hidden="true" />
                    Restaurar base
                  </Button>
                </div>

                <Label htmlFor="codigo" className="sr-only">
                  Código da solução
                </Label>
                <Textarea
                  id="codigo"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                  rows={14}
                  className="resize-y bg-surface font-mono text-sm leading-relaxed"
                />

                <div className="grid gap-3 sm:flex sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    A avaliação real será feita pelo backend.
                  </p>
                  <Button onClick={handleSubmit} disabled={submit.isPending} className="shrink-0">
                    {submit.isPending ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                        Enviando…
                      </>
                    ) : (
                      <>
                        <Send className="size-4" aria-hidden="true" />
                        Enviar solução
                      </>
                    )}
                  </Button>
                </div>

                {submit.data ? (
                  <div
                    role="status"
                    className={
                      submit.data.status === "passed"
                        ? "rounded-lg border border-success/40 bg-success/10 p-4"
                        : "rounded-lg border border-destructive/40 bg-destructive/10 p-4"
                    }
                  >
                    <p className="text-sm font-semibold">
                      {submit.data.status === "passed" ? "Solução aceita" : "Solução recusada"} ·{" "}
                      <span className="font-mono">{submit.data.score}/100</span>
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{submit.data.feedback}</p>
                  </div>
                ) : null}
              </section>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
