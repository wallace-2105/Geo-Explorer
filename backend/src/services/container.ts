import { env } from "../config/env.js";
import { MockAIProvider } from "../ai/mock-ai-provider.js";
import { OpenAICompatibleProvider } from "../ai/openai-compatible-provider.js";
import { seedTrails } from "../data/trails.seed.js";
import {
  CertificateRepository,
  ChallengeRepository,
  ProgressRepository,
} from "../repositories/memory.repository.js";
import { InMemoryTrailRepository } from "../repositories/trail.repository.js";
import { CertificateService } from "./certificate.service.js";
import { ChallengeService } from "./challenge.service.js";
import { ProgressService } from "./progress.service.js";
import { TrailService } from "./trail.service.js";
import { UserService } from "./user.service.js";
export function createServices() {
  const trails = new TrailService(new InMemoryTrailRepository(seedTrails));
  const challengesRepository = new ChallengeRepository();
  const certificatesRepository = new CertificateRepository();
  const progressRepository = new ProgressRepository();
  const ai =
    env.AI_PROVIDER === "openai-compatible" && env.AI_API_KEY
      ? new OpenAICompatibleProvider(env.AI_API_KEY, env.AI_MODEL, env.AI_BASE_URL)
      : new MockAIProvider();
  const challenges = new ChallengeService(challengesRepository, ai);
  return {
    trails,
    challenges,
    progress: new ProgressService(progressRepository, trails),
    certificates: new CertificateService(certificatesRepository, trails),
    users: new UserService(
      trails,
      progressRepository,
      certificatesRepository,
      challengesRepository,
    ),
  };
}
export type Services = ReturnType<typeof createServices>;
