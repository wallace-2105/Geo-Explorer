import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  ArrowRight,
  Flame,
  ListChecks,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { CertificateCardMini } from "@/components/certificates/certificate-card-mini";
import { PageHeader, SectionHeading } from "@/components/shared/page-header";
import { StatCard, DifficultyBadge, TechBadge } from "@/components/shared/badges";
import {
  CardSkeletonGrid,
  EmptyState,
  ErrorState,
  StatSkeletonRow,
} from "@/components/shared/states";
import { TrailCard } from "@/components/trails/trail-card";
import { Button } from "@/components/ui/button";
import {
  useCertificates,
  useChallengeHistory,
  useProfile,
  useTrails,
} from "@/hooks/use-geo-queries";
import { firstName, formatShortDate, greeting } from "@/utils/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard | Geo-Explorer" },
      {
        name: "description",
        content:
          "Acompanhe seu progresso em trilhas de programação, desafios resolvidos e certificados conquistados no Geo-Explorer.",
      },
      { property: "og:title", content: "Dashboard | Geo-Explorer" },
      {
        property: "og:description",
        content:
          "Painel de aprendizagem para desenvolvedores: trilhas, desafios e certificados em um só lugar.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const profile = useProfile();
  const trails = useTrails();
  const certificates = useCertificates();
  const history = useChallengeHistory();

  const inProgress = (trails.data ?? []).filter((t) => t.status === "in_progress");
  const available = (trails.data ?? []).filter((t) => t.status !== "completed").slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-12 px-4 py-8 sm:px-6 sm:py-12">
      <section className="hero-surface relative overflow-hidden rounded-2xl border border-border p-6 sm:p-10">
        <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="min-w-0 space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
              Plataforma de trilhas
            </p>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              {greeting()}, {profile.data ? firstName(profile.data.name) : "dev"}.
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
              Continue de onde parou, resolva um desafio novo e some mais um certificado
              à sua jornada.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link to="/trilhas">
                Explorar trilhas
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/desafios">
                <Sparkles className="size-4" aria-hidden="true" />
                Gerar desafio
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section aria-labelledby="estatisticas">
        <h2 id="estatisticas" className="sr-only">
          Estatísticas
        </h2>
        {profile.isPending ? (
          <StatSkeletonRow />
        ) : profile.isError ? (
          <ErrorState onRetry={() => void profile.refetch()} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={ListChecks}
              label="Trilhas concluídas"
              value={profile.data.stats.completedTrails}
              hint={`${profile.data.stats.hoursStudied}h de estudo`}
            />
            <StatCard
              icon={Target}
              label="Desafios realizados"
              value={profile.data.stats.challengesSolved}
              hint="Última semana: 4"
            />
            <StatCard
              icon={TrendingUp}
              label="Progresso atual"
              value={`${profile.data.stats.currentProgress}%`}
              hint="Média entre trilhas ativas"
            />
            <StatCard
              icon={Flame}
              label="Sequência"
              value={`${profile.data.stats.streakDays} dias`}
              hint="Continue hoje para manter"
            />
          </div>
        )}
      </section>

      <section aria-labelledby="andamento">
        <SectionHeading
          icon={TrendingUp}
          title="Trilhas em andamento"
          description="Retome o próximo módulo"
          action={
            <Button asChild variant="ghost" size="sm">
              <Link to="/trilhas">Ver todas</Link>
            </Button>
          }
        />
        <h2 id="andamento" className="sr-only">
          Trilhas em andamento
        </h2>
        {trails.isPending ? (
          <CardSkeletonGrid count={2} />
        ) : trails.isError ? (
          <ErrorState onRetry={() => void trails.refetch()} />
        ) : inProgress.length === 0 ? (
          <EmptyState
            title="Nenhuma trilha em andamento"
            description="Escolha uma trilha para começar sua jornada."
            action={
              <Button asChild size="sm">
                <Link to="/trilhas">Explorar trilhas</Link>
              </Button>
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {inProgress.map((trail) => (
              <TrailCard key={trail.id} trail={trail} />
            ))}
          </div>
        )}
      </section>

      <section aria-labelledby="disponiveis">
        <SectionHeading icon={ListChecks} title="Trilhas disponíveis" description="Sugestões para você" />
        <h2 id="disponiveis" className="sr-only">
          Trilhas disponíveis
        </h2>
        {trails.isPending ? (
          <CardSkeletonGrid />
        ) : trails.isError ? (
          <ErrorState onRetry={() => void trails.refetch()} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {available.map((trail) => (
              <TrailCard key={trail.id} trail={trail} />
            ))}
          </div>
        )}
      </section>

      <div className="grid gap-10 lg:grid-cols-2">
        <section aria-labelledby="desafios-recentes">
          <SectionHeading
            icon={Target}
            title="Desafios recentes"
            action={
              <Button asChild variant="ghost" size="sm">
                <Link to="/desafios">Novo desafio</Link>
              </Button>
            }
          />
          <h2 id="desafios-recentes" className="sr-only">
            Desafios recentes
          </h2>
          {history.isPending ? (
            <div className="surface-card h-56 animate-pulse" aria-busy="true" />
          ) : history.isError ? (
            <ErrorState onRetry={() => void history.refetch()} />
          ) : history.data.length === 0 ? (
            <EmptyState title="Nenhum desafio ainda" description="Gere seu primeiro desafio." />
          ) : (
            <ul className="surface-card divide-y divide-border">
              {history.data.map((item) => (
                <li key={item.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4">
                  <div className="min-w-0 space-y-1.5">
                    <p className="truncate text-sm font-medium">{item.challengeTitle}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <TechBadge technology={item.technology} />
                      <DifficultyBadge difficulty={item.difficulty} />
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p
                      className={
                        item.status === "passed"
                          ? "text-sm font-medium text-success"
                          : "text-sm font-medium text-destructive"
                      }
                    >
                      {item.status === "passed" ? "Aprovado" : "Reprovado"}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatShortDate(item.solvedAt)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="certificados-recentes">
          <SectionHeading
            icon={Award}
            title="Certificados conquistados"
            action={
              <Button asChild variant="ghost" size="sm">
                <Link to="/certificados">Ver todos</Link>
              </Button>
            }
          />
          <h2 id="certificados-recentes" className="sr-only">
            Certificados conquistados
          </h2>
          {certificates.isPending ? (
            <div className="surface-card h-56 animate-pulse" aria-busy="true" />
          ) : certificates.isError ? (
            <ErrorState onRetry={() => void certificates.refetch()} />
          ) : certificates.data.length === 0 ? (
            <EmptyState title="Nenhum certificado" description="Conclua uma trilha para emitir o primeiro." />
          ) : (
            <div className="grid gap-3">
              {certificates.data.slice(0, 3).map((cert) => (
                <CertificateCardMini key={cert.id} certificate={cert} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
