import { randomUUID } from "node:crypto";
import { AppError } from "../errors/app-error.js";
import { CertificateRepository } from "../repositories/memory.repository.js";
import { TrailService } from "./trail.service.js";
export class CertificateService {
  constructor(
    private readonly repository: CertificateRepository,
    private readonly trails: TrailService,
  ) {}
  async list() {
    return this.repository.list();
  }
  async get(id: string) {
    const certificate = await this.repository.find(id);
    if (!certificate)
      throw new AppError("CERTIFICATE_NOT_FOUND", "Certificado não encontrado.", 404);
    return certificate;
  }
  async generate(input: { trailId: string; userName: string }) {
    const trail = await this.trails.get(input.trailId);
    if (trail.status !== "completed")
      throw new AppError(
        "TRAIL_NOT_COMPLETED",
        "Conclua a trilha antes de emitir o certificado.",
        409,
      );
    const suffix = randomUUID().slice(0, 8).toUpperCase();
    const certificate = {
      id: `cert-${randomUUID()}`,
      userName: input.userName,
      trailId: trail.id,
      trailName: trail.title,
      technology: trail.technology,
      level: trail.level,
      issuedAt: new Date().toISOString(),
      credentialId: `GEO-${trail.technology
        .replace(/[^A-Za-z]/g, "")
        .slice(0, 3)
        .toUpperCase()}-${new Date().getFullYear()}-${suffix}`,
      hoursCompleted: trail.estimatedHours,
    };
    await this.repository.save(certificate);
    return certificate;
  }
}
