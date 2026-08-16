import { AppError } from "../errors/app-error.js";
import type { TrailRepository } from "../repositories/trail.repository.js";
import type { Trail, TrailStatus } from "../types/domain.js";
import { prisma } from "../lib/prisma.js";

export class TrailService {
  constructor(private readonly repository: TrailRepository) {}
  async list(filters: {
    search?: string | undefined;
    technology?: Trail["technology"] | undefined;
    level?: Trail["level"] | undefined;
    status?: TrailStatus | undefined;
  }) {
    const trails = await this.repository.list();
    const search = filters.search?.toLocaleLowerCase();
    return trails.filter(
      (trail) =>
        (!search ||
          `${trail.title} ${trail.description} ${trail.tags.join(" ")}`
            .toLocaleLowerCase()
            .includes(search)) &&
        (!filters.technology || trail.technology === filters.technology) &&
        (!filters.level || trail.level === filters.level) &&
        (!filters.status || trail.status === filters.status),
    );
  }
  async get(identifier: string) {
    const trail = await this.repository.findByIdentifier(identifier);
    if (!trail) throw new AppError("TRAIL_NOT_FOUND", "Trilha não encontrada.", 404);
    return trail;
  }
  async enroll(identifier: string, userId: string) {
    const trail = await this.get(identifier);
    
    await prisma.trailProgress.upsert({
      where: { userId_trailId: { userId, trailId: trail.id } },
      update: {},
      create: {
        userId,
        trailId: trail.id,
        status: "in_progress",
        progress: 0,
        completedModules: []
      }
    });

    return { trailId: trail.id };
  }
  async save(trail: Trail) {
    await this.repository.save(trail);
  }
}
