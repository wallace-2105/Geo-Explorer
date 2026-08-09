import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Award, Download, X } from "lucide-react";
import { toast } from "sonner";
import { CertificatePreview } from "@/components/certificates/certificate-preview";
import { LevelBadge, TechBadge } from "@/components/shared/badges";
import { PageHeader } from "@/components/shared/page-header";
import { CardSkeletonGrid, EmptyState, ErrorState } from "@/components/shared/states";
import { Button } from "@/components/ui/button";
import { useCertificates } from "@/hooks/use-geo-queries";
import { formatDate } from "@/utils/format";

export const Route = createFileRoute("/certificados")({
  validateSearch: (search: Record<string, unknown>) => ({
    id: typeof search["id"] === "string" ? search["id"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Certificados | Geo-Explorer" },
      {
        name: "description",
        content:
          "Visualize e compartilhe os certificados das trilhas de aprendizagem concluídas no Geo-Explorer.",
      },
      { property: "og:title", content: "Certificados | Geo-Explorer" },
      {
        property: "og:description",
        content: "Certificados de conclusão das trilhas de programação.",
      },
    ],
  }),
  component: CertificatesPage,
});

function CertificatesPage() {
  const { id } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const { data, isPending, isError, refetch } = useCertificates();

  const selected = data?.find((c) => c.id === id);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 sm:py-12">
      <PageHeader
        eyebrow="Conquistas"
        title="Certificados"
        description="Cada trilha concluída gera um certificado com identificador único."
      />

      {selected ? (
        <section className="space-y-4" aria-label="Certificado selecionado">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold">Visualização do certificado</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.info("Exportação em PDF será feita pelo backend.")}
              >
                <Download className="size-4" aria-hidden="true" />
                Baixar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => void navigate({ to: ".", search: {} })}
              >
                <X className="size-4" aria-hidden="true" />
                Fechar
              </Button>
            </div>
          </div>
          <CertificatePreview certificate={selected} />
        </section>
      ) : null}

      <section aria-label="Lista de certificados">
        {isPending ? (
          <CardSkeletonGrid />
        ) : isError ? (
          <ErrorState onRetry={() => void refetch()} />
        ) : data.length === 0 ? (
          <EmptyState
            title="Nenhum certificado ainda"
            description="Conclua uma trilha completa para emitir seu primeiro certificado."
            action={
              <Button asChild size="sm">
                <Link to="/trilhas">Ver trilhas</Link>
              </Button>
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {data.map((cert) => (
              <article key={cert.id} className="surface-card flex flex-col gap-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                    <Award className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {cert.credentialId}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-display text-base font-semibold leading-snug">
                    {cert.trailName}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Emitido em {formatDate(cert.issuedAt)} · {cert.hoursCompleted}h
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <TechBadge technology={cert.technology} />
                  <LevelBadge level={cert.level} />
                </div>
                <Button
                  variant="secondary"
                  className="mt-auto w-full"
                  onClick={() => void navigate({ to: ".", search: { id: cert.id } })}
                >
                  Visualizar certificado
                </Button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
