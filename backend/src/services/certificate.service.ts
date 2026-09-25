import { randomUUID } from "node:crypto";
import { AppError } from "../errors/app-error.js";
import { TrailService } from "./trail.service.js";
import { prisma } from "../lib/prisma.js";
import { env } from "../config/env.js";

export class CertificateService {
  private inMemoryCerts = new Map<string, any>();

  constructor(private readonly trails: TrailService) {}

  async list(userId: string) {
    if (env.NODE_ENV !== "test") {
      try {
        const certs = await prisma.certificate.findMany({
          where: { userId },
          include: { user: true },
        });
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
      } catch {
        // fallback
      }
    }
      const certs = Array.from(this.inMemoryCerts.values()).filter(c => c.userId === userId);
      return Promise.all(
        certs.map(async (c) => {
          const trail = await this.trails.get(c.trailId).catch(() => null);
          return {
            id: c.id,
            userName: c.userName,
            trailId: c.trailId,
            trailName: c.trailTitle,
            technology: trail?.technology ?? "N/A",
            level: trail?.level ?? "N/A",
            issuedAt: c.issuedAt,
            credentialId: c.verifyCode,
            hoursCompleted: trail?.estimatedHours ?? 0,
          };
        })
      );
  }

  async get(id: string, userId: string) {
    if (env.NODE_ENV !== "test") {
      try {
        const c = await prisma.certificate.findUnique({
          where: { id, userId },
          include: { user: true },
        });
        if (c) {
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
      } catch {
        // Prisma offline, proceed to check in-memory
      }
    }

    const mem = this.inMemoryCerts.get(id);
    if (!mem || mem.userId !== userId) {
      throw new AppError("CERTIFICATE_NOT_FOUND", "Certificado não encontrado.", 404);
    }

    const trail = await this.trails.get(mem.trailId).catch(() => null);
    return {
      id: mem.id,
      userName: mem.userName,
      trailId: mem.trailId,
      trailName: mem.trailTitle,
      technology: trail?.technology ?? "N/A",
      level: trail?.level ?? "N/A",
      issuedAt: mem.issuedAt,
      credentialId: mem.verifyCode,
      hoursCompleted: trail?.estimatedHours ?? 0,
    };
  }

  async generate(input: { trailId: string; userName: string; userId: string }) {
    const trail = await this.trails.get(input.trailId);
    
    let isCompleted = trail.status === "completed" || trail.progress === 100;
    if (env.NODE_ENV !== "test") {
      try {
        const progress = await prisma.trailProgress.findUnique({
          where: { userId_trailId: { userId: input.userId, trailId: input.trailId } }
        });
        if (progress) {
          isCompleted = progress.status === "completed";
        }
      } catch {
        // Offline: use trail in-memory state
      }
    }

    if (!isCompleted) {
      throw new AppError(
        "TRAIL_NOT_COMPLETED",
        "Conclua a trilha antes de emitir o certificado.",
        409,
      );
    }

    if (env.NODE_ENV !== "test") {
      try {
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
      } catch {
        // fallback to memory
      }
    }

    const existingMem = Array.from(this.inMemoryCerts.values()).find(
      c => c.userId === input.userId && c.trailId === input.trailId
    );
    if (existingMem) {
      return {
        id: existingMem.id,
        userName: existingMem.userName,
        trailId: existingMem.trailId,
        trailName: existingMem.trailTitle,
        technology: trail.technology,
        level: trail.level,
        issuedAt: existingMem.issuedAt,
        credentialId: existingMem.verifyCode,
        hoursCompleted: trail.estimatedHours,
      };
    }

    const suffix = randomUUID().slice(0, 8).toUpperCase();
    const verifyCode = `GEO-${trail.technology
        .replace(/[^A-Za-z]/g, "")
        .slice(0, 3)
        .toUpperCase()}-${new Date().getFullYear()}-${suffix}`;

    const certId = randomUUID();
    const issuedAt = new Date().toISOString();

    if (env.NODE_ENV !== "test") {
      try {
        const c = await prisma.certificate.create({
          data: {
            id: certId,
            userId: input.userId,
            trailId: trail.id,
            trailTitle: trail.title,
            verifyCode,
          },
          include: { user: true }
        });

        return {
          id: c.id,
          userName: `${c.user?.firstName ?? input.userName} ${c.user?.lastName ?? ""}`.trim(),
          trailId: c.trailId,
          trailName: c.trailTitle,
          technology: trail.technology,
          level: trail.level,
          issuedAt: c.issueDate.toISOString(),
          credentialId: c.verifyCode,
          hoursCompleted: trail.estimatedHours,
        };
      } catch {
        // fallback to memory
      }
    }
      const record = {
        id: certId,
        userId: input.userId,
        userName: input.userName,
        trailId: trail.id,
        trailTitle: trail.title,
        verifyCode,
        issuedAt,
      };
      this.inMemoryCerts.set(certId, record);

      return {
        id: certId,
        userName: input.userName,
        trailId: trail.id,
        trailName: trail.title,
        technology: trail.technology,
        level: trail.level,
        issuedAt,
        credentialId: verifyCode,
        hoursCompleted: trail.estimatedHours,
      };
  }
}
