import { randomUUID } from "node:crypto";
import { AppError } from "../errors/app-error.js";
import { TrailService } from "./trail.service.js";
import { prisma } from "../lib/prisma.js";

export class CertificateService {
  constructor(private readonly trails: TrailService) {}

  async list(userId: string) {
    const certs = await prisma.certificate.findMany({
      where: { userId },
      include: { user: true },
    });
    // We map them to the domain type. Since trails are static in memory, we fetch trail details too.
    return Promise.all(
      certs.map(async (c) => {
        const trail = await this.trails.get(c.trailId).catch(() => null);
        return {
          id: c.id,
          userName: `${c.user.firstName} ${c.user.lastName}`.trim(),
          trailId: c.trailId,
          trailName: c.trailTitle,
          technology: trail?.technology ?? "N/A",
          level: trail?.level ?? "N/A",
          issuedAt: c.issueDate.toISOString(),
          credentialId: c.verifyCode,
          hoursCompleted: trail?.estimatedHours ?? 0,
        };
      })
    );
  }

  async get(id: string, userId: string) {
    const c = await prisma.certificate.findUnique({
      where: { id, userId },
      include: { user: true },
    });
    if (!c) throw new AppError("CERTIFICATE_NOT_FOUND", "Certificado não encontrado.", 404);

    const trail = await this.trails.get(c.trailId).catch(() => null);
    return {
      id: c.id,
      userName: `${c.user.firstName} ${c.user.lastName}`.trim(),
      trailId: c.trailId,
      trailName: c.trailTitle,
      technology: trail?.technology ?? "N/A",
      level: trail?.level ?? "N/A",
      issuedAt: c.issueDate.toISOString(),
      credentialId: c.verifyCode,
      hoursCompleted: trail?.estimatedHours ?? 0,
    };
  }

  async generate(input: { trailId: string; userName: string; userId: string }) {
    const trail = await this.trails.get(input.trailId);
    
    // Check if progress is 100%
    const progress = await prisma.trailProgress.findUnique({
      where: { userId_trailId: { userId: input.userId, trailId: input.trailId } }
    });

    if (progress?.status !== "completed") {
      throw new AppError(
        "TRAIL_NOT_COMPLETED",
        "Conclua a trilha antes de emitir o certificado.",
        409,
      );
    }

    const existing = await prisma.certificate.findFirst({
      where: { userId: input.userId, trailId: input.trailId },
      include: { user: true }
    });

    if (existing) {
      return {
        id: existing.id,
        userName: `${existing.user.firstName} ${existing.user.lastName}`.trim(),
        trailId: existing.trailId,
        trailName: existing.trailTitle,
        technology: trail.technology,
        level: trail.level,
        issuedAt: existing.issueDate.toISOString(),
        credentialId: existing.verifyCode,
        hoursCompleted: trail.estimatedHours,
      };
    }

    const suffix = randomUUID().slice(0, 8).toUpperCase();
    const verifyCode = `GEO-${trail.technology
        .replace(/[^A-Za-z]/g, "")
        .slice(0, 3)
        .toUpperCase()}-${new Date().getFullYear()}-${suffix}`;

    const c = await prisma.certificate.create({
      data: {
        userId: input.userId,
        trailId: trail.id,
        trailTitle: trail.title,
        verifyCode,
      },
      include: { user: true }
    });

    return {
      id: c.id,
      userName: `${c.user.firstName} ${c.user.lastName}`.trim(),
      trailId: c.trailId,
      trailName: c.trailTitle,
      technology: trail.technology,
      level: trail.level,
      issuedAt: c.issueDate.toISOString(),
      credentialId: c.verifyCode,
      hoursCompleted: trail.estimatedHours,
    };
  }
}
