import { AppError } from "../errors/app-error.js";
import { TrailService } from "./trail.service.js";
import { prisma } from "../lib/prisma.js";

export class ProgressService {
  constructor(private readonly trails: TrailService) {}

  async list(userId: string) {
    const list = await prisma.trailProgress.findMany({ where: { userId } });
    return list.map(p => ({
      userId: p.userId,
      trailId: p.trailId,
      status: p.status,
      percent: p.progress,
      completedModuleIds: (p.completedModules as string[]) || [],
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
    
    let progressRecord = await prisma.trailProgress.findUnique({
      where: { userId_trailId: { userId: input.userId, trailId: input.trailId } }
    });

    let completedModuleIds: string[] = progressRecord 
      ? ((progressRecord.completedModules as string[]) || [])
      : trail.modules.filter((m) => m.completed).map((m) => m.id);

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

    progressRecord = await prisma.trailProgress.upsert({
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

    // Optional: we can update the in-memory trail object to return back, although it's not strictly necessary for the backend since the frontend handles its state.
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

    return {
      userId: progressRecord.userId,
      trailId: progressRecord.trailId,
      status: progressRecord.status,
      percent: progressRecord.progress,
      completedModuleIds,
      updatedAt: progressRecord.updatedAt.toISOString(),
    };
  }
}
