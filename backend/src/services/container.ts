import { env } from "../config/env.js";
import { MockAIProvider } from "../ai/mock-ai-provider.js";
import { OpenAICompatibleProvider } from "../ai/openai-compatible-provider.js";
import { seedTrails } from "../data/trails.seed.js";
import { InMemoryTrailRepository } from "../repositories/trail.repository.js";
import { CertificateService } from "./certificate.service.js";
import { ChallengeService } from "./challenge.service.js";
import { ProgressService } from "./progress.service.js";
import { TrailService } from "./trail.service.js";
import { UserService } from "./user.service.js";

export function createServices() {
  const trails = new TrailService(new InMemoryTrailRepository(seedTrails));
  
  const ai =
    env.AI_PROVIDER === "openai-compatible" && env.AI_API_KEY
      ? new OpenAICompatibleProvider(env.AI_API_KEY, env.AI_MODEL, env.AI_BASE_URL)
      : new MockAIProvider();
      
  const challenges = new ChallengeService(ai);
  
  return {
    trails,
    challenges,
    progress: new ProgressService(trails),
    certificates: new CertificateService(trails),
    users: new UserService(trails),
  };
}
export type Services = ReturnType<typeof createServices>;
