import { createFileRoute } from "@tanstack/react-router";
import { Loader2, RefreshCw, Send, Sparkles, Terminal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DifficultyBadge, LevelBadge, TechBadge } from "@/components/shared/badges";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState, ErrorState } from "@/components/shared/states";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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

function ChallengesPage() {
  const [technology, setTechnology] = useState<Technology>("TypeScript");
  const [level, setLevel] = useState<Level>("Intermediário");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [code, setCode] = useState("");

  const generate = useGenerateChallenge();
  const submit = useSubmitChallenge();
  const challenge = generate.data;

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
        description="Escolha tecnologia, nível e dificuldade. O desafio será gerado pelo backend com apoio de IA."
      />

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="surface-card h-fit space-y-4 p-5 lg:sticky lg:top-24">
          <h2 className="font-display text-base font-semibold">Configuração</h2>

          <div className="space-y-1.5">
            <Label htmlFor="tech">Tecnologia</Label>
            <Select value={technology} onValueChange={(v) => setTechnology(v as Technology)}>
              <SelectTrigger id="tech" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TECHNOLOGIES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
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
            <Select value={difficulty} onValueChange={(v) => setDifficulty(v as Difficulty)}>
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
        </aside>

        <section aria-live="polite" aria-busy={generate.isPending} className="space-y-6">
          {generate.isPending ? (
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
