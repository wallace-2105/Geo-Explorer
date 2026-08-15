import type { UserProfile } from "../types/domain.js";
import {
  CertificateRepository,
  ChallengeRepository,
  ProgressRepository,
} from "../repositories/memory.repository.js";
import { TrailService } from "./trail.service.js";
import { AppError } from "../errors/app-error.js";
const baseUser = {
  id: "usr-1",
  name: "Dev",
  headline: "Desenvolvedor full-stack",
  email: "dev@geoexplorer.dev",
  memberSince: "2025-11-04T00:00:00Z",
  technologies: ["TypeScript", "Node.js", "React", "JavaScript", "Python"],
} as const;
export class UserService {
  constructor(
    private readonly trails: TrailService,
    private readonly progress: ProgressRepository,
    private readonly certificates: CertificateRepository,
    private readonly challenges: ChallengeRepository,
  ) {}
  async get(id = "usr-1"): Promise<UserProfile> {
    if (id !== "usr-1") throw new AppError("USER_NOT_FOUND", "Usuário não encontrado.", 404);
    const trails = await this.trails.list({});
    const savedProgress = await this.progress.listByUser(id);
    const certificates = await this.certificates.list();
    const history = await this.challenges.history();
    const effective = savedProgress.length
      ? savedProgress
      : trails.map((trail) => ({ status: trail.status, percent: trail.progress }));
    const active = effective.filter((item) => item.status === "in_progress");
    const currentProgress = active.length
      ? Math.round(active.reduce((sum, item) => sum + item.percent, 0) / active.length)
      : 0;
    return {
      ...baseUser,
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
