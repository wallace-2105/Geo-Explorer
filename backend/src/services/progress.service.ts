import { AppError } from "../errors/app-error.js";
import { TrailService } from "./trail.service.js";
import { prisma } from "../lib/prisma.js";
import { env } from "../config/env.js";

export class ProgressService {
  private inMemoryProgress = new Map<string, {
    userId: string;
    trailId: string;
    status: string;
    progress: number;
    completedModules: string[];
    updatedAt: Date;
  }>();

  constructor(private readonly trails: TrailService) {}

  async list(userId: string) {
    if (env.NODE_ENV !== "test") {
      try {
        const list = await prisma.trailProgress.findMany({ where: { userId } });
        return list.map(p => ({
          userId: p.userId,
          trailId: p.trailId,
          status: p.status,
          percent: p.progress,
          completedModuleIds: (p.completedModules as string[]) || [],
          updatedAt: p.updatedAt.toISOString(),
        }));
      } catch {
        // fallback
      }
    }
    const list = Array.from(this.inMemoryProgress.values()).filter(p => p.userId === userId);
    return list.map(p => ({
      userId: p.userId,
      trailId: p.trailId,
      status: p.status,
      percent: p.progress,
      completedModuleIds: p.completedModules || [],
      updatedAt: p.updatedAt.toISOString(),
    }));
  }

  async update(input: {
    userId: string;
    trailId: string;
    moduleId?: string | undefined;
    action: "start" | "complete_module" | "complete_trail";
  }) {
    const trail = await this.trails.get(input.trailId);
    
    let completedModuleIds: string[] = [];
    const cacheKey = `${input.userId}_${input.trailId}`;

    if (env.NODE_ENV !== "test") {
      try {
        const progressRecord = await prisma.trailProgress.findUnique({
          where: { userId_trailId: { userId: input.userId, trailId: input.trailId } }
        });
        if (progressRecord) {
          completedModuleIds = (progressRecord.completedModules as string[]) || [];
        } else {
          completedModuleIds = trail.modules.filter((m) => m.completed).map((m) => m.id);
        }
      } catch {
        const mem = this.inMemoryProgress.get(cacheKey);
        if (mem) {
          completedModuleIds = mem.completedModules;
        } else {
          completedModuleIds = trail.modules.filter((m) => m.completed).map((m) => m.id);
        }
      }
    } else {
      const mem = this.inMemoryProgress.get(cacheKey);
      if (mem) {
        completedModuleIds = mem.completedModules;
      } else {
        completedModuleIds = trail.modules.filter((m) => m.completed).map((m) => m.id);
      }
    }

    if (input.action === "complete_module") {
      if (!input.moduleId || !trail.modules.some((module) => module.id === input.moduleId))
        throw new AppError("MODULE_NOT_FOUND", "Módulo não encontrado nesta trilha.", 404);
      completedModuleIds = [...new Set([...completedModuleIds, input.moduleId])];
    }

    if (input.action === "complete_trail") {
      completedModuleIds = trail.modules.map((module) => module.id);
    }

    const percent = Math.round((completedModuleIds.length / trail.modules.length) * 100);
    const status = percent === 100 ? "completed" : percent > 0 ? "in_progress" : "not_started";
    const updatedAt = new Date();

    if (env.NODE_ENV !== "test") {
      try {
        const progressRecord = await prisma.trailProgress.upsert({
          where: { userId_trailId: { userId: input.userId, trailId: input.trailId } },
          update: {
            status,
            progress: percent,
            completedModules: completedModuleIds,
          },
          create: {
            userId: input.userId,
            trailId: input.trailId,
            status,
            progress: percent,
            completedModules: completedModuleIds,
          }
        });
        this.inMemoryProgress.set(cacheKey, {
          userId: progressRecord.userId,
          trailId: progressRecord.trailId,
          status: progressRecord.status,
          progress: progressRecord.progress,
          completedModules: completedModuleIds,
          updatedAt: progressRecord.updatedAt,
        });
      } catch {
        this.inMemoryProgress.set(cacheKey, {
          userId: input.userId,
          trailId: input.trailId,
          status,
          progress: percent,
          completedModules: completedModuleIds,
          updatedAt,
        });
      }
    } else {
      this.inMemoryProgress.set(cacheKey, {
        userId: input.userId,
        trailId: input.trailId,
        status,
        progress: percent,
        completedModules: completedModuleIds,
        updatedAt,
      });
    }

    trail.progress = percent;
    trail.status = status;
    trail.modules = trail.modules.map((module) => ({
      ...module,
      completed: completedModuleIds.includes(module.id),
      lessons: module.lessons.map((lesson) => ({
        ...lesson,
        completed: completedModuleIds.includes(module.id),
      })),
    }));

    await this.trails.save(trail);

    return {
      userId: input.userId,
      trailId: input.trailId,
      status,
      percent,
      completedModuleIds,
      updatedAt: updatedAt.toISOString(),
    };
  }
}
