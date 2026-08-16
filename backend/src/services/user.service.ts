import type { UserProfile } from "../types/domain.js";
import { TrailService } from "./trail.service.js";
import { AppError } from "../errors/app-error.js";
import { prisma } from "../lib/prisma.js";

const baseUser = {
  headline: "Desenvolvedor full-stack",
  technologies: ["TypeScript", "Node.js", "React", "JavaScript", "Python"],
} as const;

export class UserService {
  constructor(private readonly trails: TrailService) {}

  async get(id: string, userToken?: any): Promise<UserProfile> {
    if (!id) throw new AppError("USER_NOT_FOUND", "Usuário não encontrado.", 404);

    let firstName = "Dev";
    let lastName = "User";
    let email = userToken?.email ?? "dev@geoexplorer.dev";
    
    if (userToken?.user_metadata) {
      if (userToken.user_metadata.first_name) firstName = userToken.user_metadata.first_name;
      if (userToken.user_metadata.last_name) lastName = userToken.user_metadata.last_name;
    }

    // Upsert the user in Prisma (creates if not exists, updates if exists)
    const user = await prisma.user.upsert({
      where: { id },
      update: { firstName, lastName, email },
      create: { id, firstName, lastName, email },
    });

    const trails = await this.trails.list({});
    const savedProgress = await prisma.trailProgress.findMany({ where: { userId: id } });
    const certificates = await prisma.certificate.findMany({ where: { userId: id } });
    const history = await prisma.challengeHistory.findMany({ where: { userId: id } });

    const effective = savedProgress.length
      ? savedProgress.map(p => ({ status: p.status, percent: p.progress }))
      : trails.map((trail) => ({ status: trail.status, percent: trail.progress }));
    
    const active = effective.filter((item) => item.status === "in_progress");
    const currentProgress = active.length
      ? Math.round(active.reduce((sum, item) => sum + item.percent, 0) / active.length)
      : 0;

    return {
      ...baseUser,
      id: user.id,
      name: `${user.firstName} ${user.lastName}`.trim(),
      email: user.email,
      memberSince: user.createdAt.toISOString(),
      technologies: [...baseUser.technologies],
      stats: {
        completedTrails: effective.filter((item) => item.status === "completed").length,
        challengesSolved: history.filter((item) => item.status === "passed").length,
        currentProgress,
        certificates: certificates.length,
        streakDays: 12,
        hoursStudied: trails
          .filter((trail) => trail.status === "completed")
          .reduce((sum, trail) => sum + trail.estimatedHours, 0),
      },
    };
  }
}

