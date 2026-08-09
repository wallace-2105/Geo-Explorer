import { Link } from "@tanstack/react-router";
import { Award } from "lucide-react";
import type { Certificate } from "@/types";
import { formatShortDate } from "@/utils/format";

export function CertificateCardMini({ certificate }: { certificate: Certificate }) {
  return (
    <Link
      to="/certificados"
      search={{ id: certificate.id }}
      className="surface-card grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-4 transition-colors hover:border-primary/40"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
        <Award className="size-5" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium">{certificate.trailName}</span>
        <span className="block truncate text-xs text-muted-foreground">
          {certificate.technology} · {certificate.level}
        </span>
      </span>
      <span className="shrink-0 text-xs text-muted-foreground">
        {formatShortDate(certificate.issuedAt)}
      </span>
    </Link>
  );
}
