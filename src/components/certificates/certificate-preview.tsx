import { Hexagon, ShieldCheck } from "lucide-react";
import type { Certificate } from "@/types";
import { formatDate } from "@/utils/format";

export function CertificatePreview({ certificate }: { certificate: Certificate }) {
  return (
    <article
      aria-label={`Certificado da trilha ${certificate.trailName}`}
      className="hero-surface relative overflow-hidden rounded-2xl border border-primary/25 bg-surface p-6 sm:p-10"
    >
      <div
        className="grid-backdrop pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      <div className="relative space-y-8">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
              <Hexagon className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-semibold">Geo-Explorer</p>
              <p className="text-xs text-muted-foreground">Certificado de conclusão</p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/12 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/30">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            Verificado
          </span>
        </header>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Certificamos que</p>
          <p className="font-display text-2xl font-semibold sm:text-4xl">{certificate.userName}</p>
          <p className="max-w-xl text-sm text-muted-foreground">
            concluiu com aproveitamento a trilha de aprendizagem
          </p>
          <p className="font-display text-lg font-semibold text-primary sm:text-2xl">
            {certificate.trailName}
          </p>
        </div>

        <dl className="grid gap-4 border-t border-border/70 pt-6 sm:grid-cols-4">
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">Tecnologia</dt>
            <dd className="mt-1 text-sm font-medium">{certificate.technology}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">Nível</dt>
            <dd className="mt-1 text-sm font-medium">{certificate.level}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">Emissão</dt>
            <dd className="mt-1 text-sm font-medium">{formatDate(certificate.issuedAt)}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">
              Identificador
            </dt>
            <dd className="mt-1 font-mono text-sm font-medium">{certificate.credentialId}</dd>
          </div>
        </dl>

        <p className="text-xs text-muted-foreground">
          Documento fictício, emitido como parte de um projeto de portfólio.
        </p>
      </div>
    </article>
  );
}
