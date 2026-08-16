import { randomUUID } from "node:crypto";
import { AppError } from "../errors/app-error.js";
import type { AIProvider } from "../ai/ai-provider.js";
import type { Difficulty, Level, Technology } from "../types/domain.js";
import { prisma } from "../lib/prisma.js";

export class ChallengeService {
  private challenges = new Map<string, any>();

  constructor(private readonly ai: AIProvider) {}

  async generate(input: { technology: Technology; level: Level; difficulty: Difficulty; userId: string }) {
    const content = await this.ai.generateChallenge(input);
    const challenge = {
      ...content,
      id: `chl-${randomUUID()}`,
      generatedAt: new Date().toISOString(),
    };
    this.challenges.set(challenge.id, challenge);
    return challenge;
  }

  async get(id: string, userId: string) {
    const challenge = this.challenges.get(id);
    if (!challenge) {
      throw new AppError("CHALLENGE_NOT_FOUND", "Desafio não encontrado. Por favor gere um novo desafio.", 404);
    }
    return challenge;
  }

  async submit(input: { challengeId: string; code: string; language?: string | undefined; userId: string }) {
    const challenge = await this.get(input.challengeId, input.userId);
    const evaluation = await this.ai.evaluateSolution({
      challenge: challenge,
      code: input.code,
      language: input.language,
    });
    
    const status = evaluation.score >= 70 ? "passed" : "failed";

    const result = await prisma.challengeHistory.create({
      data: {
        userId: input.userId,
        challengeId: input.challengeId,
        challengeTitle: challenge.title ?? 'Untitled Challenge',
        technology: challenge.technology,
        level: challenge.level,
        difficulty: challenge.difficulty,
        status: status,
      }
    });

    return {
      submissionId: result.id,
      status: result.status,
      score: evaluation.score,
      feedback: evaluation.feedback,
      submittedAt: result.solvedAt.toISOString(),
    };
  }

  async history(userId: string) {
    const history = await prisma.challengeHistory.findMany({
      where: { userId },
      orderBy: { solvedAt: 'desc' },
    });
    return history.map((item) => ({
      challengeId: item.challengeId,
      challengeTitle: item.challengeTitle,
      technology: item.technology,
      level: item.level,
      difficulty: item.difficulty,
      status: item.status,
      solvedAt: item.solvedAt.toISOString(),
    }));
  }
}
