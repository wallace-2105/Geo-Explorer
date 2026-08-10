import { AppError } from "../errors/app-error.js";
import { ProgressRepository } from "../repositories/memory.repository.js";
import { TrailService } from "./trail.service.js";
export class ProgressService {
  constructor(
    private readonly repository: ProgressRepository,
    private readonly trails: TrailService,
  ) {}
  async list(userId: string) {
    return this.repository.listByUser(userId);
  }
  async update(input: {
    userId: string;
    trailId: string;
    moduleId?: string | undefined;
    action: "start" | "complete_module" | "complete_trail";
  }) {
    const trail = await this.trails.get(input.trailId);
    const progress = (await this.repository.find(input.userId, trail.id)) ?? {
      userId: input.userId,
      trailId: trail.id,
      completedModuleIds: trail.modules
        .filter((module) => module.completed)
        .map((module) => module.id),
      status: trail.status,
      percent: trail.progress,
      updatedAt: new Date().toISOString(),
    };
    if (input.action === "complete_module") {
      if (!input.moduleId || !trail.modules.some((module) => module.id === input.moduleId))
        throw new AppError("MODULE_NOT_FOUND", "Módulo não encontrado nesta trilha.", 404);
      progress.completedModuleIds = [...new Set([...progress.completedModuleIds, input.moduleId])];
    }
    if (input.action === "complete_trail")
      progress.completedModuleIds = trail.modules.map((module) => module.id);
    progress.percent = Math.round(
      (progress.completedModuleIds.length / trail.modules.length) * 100,
    );
    progress.status =
      progress.percent === 100 ? "completed" : progress.percent > 0 ? "in_progress" : "not_started";
    progress.updatedAt = new Date().toISOString();
    trail.progress = progress.percent;
    trail.status = progress.status;
    trail.modules = trail.modules.map((module) => ({
      ...module,
      completed: progress.completedModuleIds.includes(module.id),
      lessons: module.lessons.map((lesson) => ({
        ...lesson,
        completed: progress.completedModuleIds.includes(module.id),
      })),
    }));
    await this.repository.save(progress);
    await this.trails.save(trail);
    return progress;
  }
}
