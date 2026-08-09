import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { CardSkeletonGrid, EmptyState, ErrorState } from "@/components/shared/states";
import { TrailCard } from "@/components/trails/trail-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTrails } from "@/hooks/use-geo-queries";
import type { Level, Technology, TrailFilters, TrailStatus } from "@/types";
import { LEVELS, TECHNOLOGIES, TRAIL_STATUS_LABEL } from "@/types";

export const Route = createFileRoute("/trilhas/")({
  head: () => ({
    meta: [
      { title: "Explorar trilhas | Geo-Explorer" },
      {
        name: "description",
        content:
          "Filtre trilhas de aprendizagem por tecnologia, nível e status: JavaScript, TypeScript, Python, Java, Node.js e React.",
      },
      { property: "og:title", content: "Explorar trilhas | Geo-Explorer" },
      {
        property: "og:description",
        content: "Trilhas de programação organizadas por tecnologia, nível e progresso.",
      },
    ],
  }),
  component: TrailsPage,
});

const STATUSES: TrailStatus[] = ["not_started", "in_progress", "completed"];

function TrailsPage() {
  const [search, setSearch] = useState("");
  const [technology, setTechnology] = useState<Technology | "all">("all");
  const [level, setLevel] = useState<Level | "all">("all");
  const [status, setStatus] = useState<TrailStatus | "all">("all");

  const filters = useMemo<TrailFilters>(
    () => ({ search, technology, level, status }),
    [search, technology, level, status],
  );

  const { data, isPending, isError, refetch } = useTrails(filters);
  const hasFilters =
    search !== "" || technology !== "all" || level !== "all" || status !== "all";

  function clearFilters() {
    setSearch("");
    setTechnology("all");
    setLevel("all");
    setStatus("all");
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 sm:py-12">
      <PageHeader
        eyebrow="Catálogo"
        title="Explorar trilhas"
        description="Escolha uma tecnologia e um nível para encontrar a trilha certa para o seu momento."
      />

      <section className="surface-card space-y-4 p-4 sm:p-5" aria-label="Filtros de trilhas">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Filtros
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-1.5">
            <Label htmlFor="busca">Buscar</Label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="busca"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Nome, descrição ou tag"
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tecnologia">Tecnologia</Label>
            <Select
              value={technology}
              onValueChange={(v) => setTechnology(v as Technology | "all")}
            >
              <SelectTrigger id="tecnologia" className="w-full">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as tecnologias</SelectItem>
                {TECHNOLOGIES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="nivel">Nível</Label>
            <Select value={level} onValueChange={(v) => setLevel(v as Level | "all")}>
              <SelectTrigger id="nivel" className="w-full">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os níveis</SelectItem>
                {LEVELS.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as TrailStatus | "all")}>
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {TRAIL_STATUS_LABEL[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {hasFilters ? (
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Limpar filtros
            </Button>
          </div>
        ) : null}
      </section>

      <section aria-label="Resultados">
        {isPending ? (
          <CardSkeletonGrid count={6} />
        ) : isError ? (
          <ErrorState onRetry={() => void refetch()} />
        ) : data.length === 0 ? (
          <EmptyState
            title="Nenhuma trilha encontrada"
            description="Ajuste os filtros ou limpe a busca para ver mais resultados."
            action={
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Limpar filtros
              </Button>
            }
          />
        ) : (
          <>
            <p className="pb-4 text-sm text-muted-foreground" aria-live="polite">
              {data.length} {data.length === 1 ? "trilha encontrada" : "trilhas encontradas"}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {data.map((trail) => (
                <TrailCard key={trail.id} trail={trail} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
