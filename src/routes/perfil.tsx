import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Flame, ListChecks, Target, TrendingUp } from "lucide-react";
import { CertificateCardMini } from "@/components/certificates/certificate-card-mini";
import { ProgressBlock, StatCard, TechBadge } from "@/components/shared/badges";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { PageHeader, SectionHeading } from "@/components/shared/page-header";
import { EmptyState, ErrorState, StatSkeletonRow } from "@/components/shared/states";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCertificates, useProfile, useTrails } from "@/hooks/use-geo-queries";
import { formatDate } from "@/utils/format";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil | Geo-Explorer" },
      {
        name: "description",
        content:
          "Perfil do desenvolvedor: progresso, trilhas concluídas, desafios realizados, certificados e tecnologias estudadas.",
      },
      { property: "og:title", content: "Meu perfil | Geo-Explorer" },
      {
        property: "og:description",
        content: "Progresso, certificados e tecnologias estudadas no Geo-Explorer.",
      },
    ],
  }),
  component: ProfilePage,
});

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

function ProfilePage() {
  const profile = useProfile();
  const certificates = useCertificates();
  const trails = useTrails();

  const completedTrails = (trails.data ?? []).filter((t) => t.status === "completed");

  return (
    <ProtectedRoute>
      <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-8 sm:px-6 sm:py-12">
        <PageHeader eyebrow="Conta" title="Meu perfil" />

      <section className="surface-card p-6" aria-label="Identificação">
        {profile.isPending ? (
          <div className="flex items-center gap-4" aria-busy="true">
            <Skeleton className="size-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>
        ) : profile.isError ? (
          <ErrorState onRetry={() => void profile.refetch()} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
            <Avatar className="size-16 ring-2 ring-primary/30">
              <AvatarFallback className="bg-primary/12 font-display text-lg text-primary">
                {initials(profile.data.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 space-y-2">
              <h2 className="truncate font-display text-xl font-semibold">{profile.data.name}</h2>
              <p className="text-sm text-muted-foreground">{profile.data.headline}</p>
              <p className="text-xs text-muted-foreground">
                {profile.data.email} · membro desde {formatDate(profile.data.memberSince)}
              </p>
              <div className="max-w-sm pt-2">
                <ProgressBlock value={profile.data.stats.currentProgress} label="Progresso geral" />
              </div>
            </div>
          </div>
        )}
      </section>

      <section aria-labelledby="numeros">
        <h2 id="numeros" className="sr-only">
          Números
        </h2>
        {profile.isPending ? (
          <StatSkeletonRow />
        ) : profile.isError ? null : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={ListChecks}
              label="Trilhas concluídas"
              value={profile.data.stats.completedTrails}
            />
            <StatCard
              icon={Target}
              label="Desafios realizados"
              value={profile.data.stats.challengesSolved}
            />
            <StatCard icon={Award} label="Certificados" value={profile.data.stats.certificates} />
            <StatCard
              icon={Flame}
              label="Horas de estudo"
              value={`${profile.data.stats.hoursStudied}h`}
            />
          </div>
        )}
      </section>

      <section aria-labelledby="tecnologias">
        <SectionHeading icon={TrendingUp} title="Tecnologias estudadas" />
        <h2 id="tecnologias" className="sr-only">
          Tecnologias estudadas
        </h2>
        {profile.data ? (
          <div className="flex flex-wrap gap-2">
            {profile.data.technologies.map((tech) => (
              <TechBadge key={tech} technology={tech} />
            ))}
          </div>
        ) : (
          <Skeleton className="h-8 w-72" />
        )}
      </section>

      <div className="grid gap-10 lg:grid-cols-2">
        <section aria-labelledby="trilhas-concluidas">
          <SectionHeading icon={ListChecks} title="Trilhas concluídas" />
          <h2 id="trilhas-concluidas" className="sr-only">
            Trilhas concluídas
          </h2>
          {trails.isPending ? (
            <Skeleton className="h-32 w-full rounded-xl" />
          ) : completedTrails.length === 0 ? (
            <EmptyState
              title="Nenhuma trilha concluída"
              description="Conclua sua primeira trilha para vê-la aqui."
              action={
                <Button asChild size="sm">
                  <Link to="/trilhas">Ver trilhas</Link>
                </Button>
              }
            />
          ) : (
            <ul className="surface-card divide-y divide-border">
              {completedTrails.map((trail) => (
                <li
                  key={trail.id}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{trail.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {trail.technology} · {trail.level}
                    </p>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="shrink-0">
                    <Link to="/trilhas/$id" params={{ id: trail.id }}>
                      Abrir
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="perfil-certificados">
          <SectionHeading icon={Award} title="Certificados" />
          <h2 id="perfil-certificados" className="sr-only">
            Certificados
          </h2>
          {certificates.isPending ? (
            <Skeleton className="h-32 w-full rounded-xl" />
          ) : certificates.isError ? (
            <ErrorState onRetry={() => void certificates.refetch()} />
          ) : certificates.data.length === 0 ? (
            <EmptyState title="Nenhum certificado" />
          ) : (
            <div className="grid gap-3">
              {certificates.data.map((cert) => (
                <CertificateCardMini key={cert.id} certificate={cert} />
              ))}
            </div>
          )}
        </section>
      </div>
      </div>
    </ProtectedRoute>
  );
}
