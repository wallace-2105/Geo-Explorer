import type { Certificate } from "@/types";

export const mockCertificates: Certificate[] = [
  {
    id: "cert-react-avancado",
    userName: "Lucas Andrade",
    trailId: "react-avancado",
    trailName: "React avançado e performance",
    technology: "React",
    level: "Avançado",
    issuedAt: "2026-07-18T00:00:00Z",
    credentialId: "GEO-RC-2026-0184",
    hoursCompleted: 26,
  },
  {
    id: "cert-js-moderno",
    userName: "Lucas Andrade",
    trailId: "js-moderno",
    trailName: "JavaScript moderno na prática",
    technology: "JavaScript",
    level: "Iniciante",
    issuedAt: "2026-05-02T00:00:00Z",
    credentialId: "GEO-JS-2026-0091",
    hoursCompleted: 14,
  },
  {
    id: "cert-py-dados",
    userName: "Lucas Andrade",
    trailId: "python-dados",
    trailName: "Python para dados e automação",
    technology: "Python",
    level: "Intermediário",
    issuedAt: "2026-03-11T00:00:00Z",
    credentialId: "GEO-PY-2026-0037",
    hoursCompleted: 22,
  },
];
