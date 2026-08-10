import { randomUUID } from "node:crypto";
import { AppError } from "../errors/app-error.js";
import type { AIProvider } from "../ai/ai-provider.js";
import { ChallengeRepository } from "../repositories/memory.repository.js";
import type { Difficulty, Level, Technology } from "../types/domain.js";
export class ChallengeService {
  constructor(
    private readonly repository: ChallengeRepository,
    private readonly ai: AIProvider,
  ) {}
  async generate(input: { technology: Technology; level: Level; difficulty: Difficulty }) {
    const content = await this.ai.generateChallenge(input);
    const challenge = {
      ...content,
      id: `chl-${randomUUID()}`,
      generatedAt: new Date().toISOString(),
    };
    await this.repository.save(challenge);
    return challenge;
  }
  async get(id: string) {
    const challenge = await this.repository.find(id);
    if (!challenge) throw new AppError("CHALLENGE_NOT_FOUND", "Desafio não encontrado.", 404);
    return challenge;
  }
  async submit(input: { challengeId: string; code: string; language?: string | undefined }) {
    const challenge = await this.get(input.challengeId);
    const evaluation = await this.ai.evaluateSolution({
      challenge,
      code: input.code,
      language: input.language,
    });
    const result = {
      submissionId: `sub-${randomUUID()}`,
      status: evaluation.score >= 70 ? ("passed" as const) : ("failed" as const),
      score: evaluation.score,
      feedback: evaluation.feedback,
      submittedAt: new Date().toISOString(),
    };
    await this.repository.addSubmission(challenge, result);
    return result;
  }
  async history() {
    return this.repository.history();
  }
}
