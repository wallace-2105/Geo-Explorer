import { buildMockChallenge, mockChallengeHistory } from "@/data/challenges.mock";
import type {
  Challenge,
  ChallengeHistoryItem,
  ChallengeSubmission,
  ChallengeSubmissionResult,
  GenerateChallengeInput,
} from "@/types";
import { apiRequest, delay, USE_MOCKS } from "./api";

export const challengesService = {
  /**
   * Futuramente o backend (Node.js + MCP + IA) gera o desafio.
   * A interface já trata carregamento, sucesso, erro e nova geração.
   */
  generate(input: GenerateChallengeInput): Promise<Challenge> {
    if (USE_MOCKS) return delay(buildMockChallenge(input), 1200);
    return apiRequest<Challenge>("/challenges/generate", {
      method: "POST",
      body: input,
    }).catch((err) => {
      console.warn("Backend indisponível ao gerar desafio, usando fallback:", err);
      return delay(buildMockChallenge(input), 800);
    });
  },

  submit(submission: ChallengeSubmission): Promise<ChallengeSubmissionResult> {
    if (USE_MOCKS) {
      return delay(
        {
          submissionId: `sub-${Date.now()}`,
          status: submission.code.trim().length > 40 ? "passed" : "failed",
          score: submission.code.trim().length > 40 ? 92 : 41,
          feedback:
            submission.code.trim().length > 40
              ? "Solução aceita. A avaliação detalhada será feita pelo backend."
              : "A solução parece incompleta. Revise os requisitos e tente novamente.",
          submittedAt: new Date().toISOString(),
        } satisfies ChallengeSubmissionResult,
        1000,
      );
    }
    return apiRequest<ChallengeSubmissionResult>("/challenges/submissions", {
      method: "POST",
      body: submission,
    }).catch((err) => {
      console.warn("Backend indisponível ao avaliar solução, usando fallback:", err);
      return delay(
        {
          submissionId: `sub-${Date.now()}`,
          status: submission.code.trim().length > 40 ? "passed" : "failed",
          score: submission.code.trim().length > 40 ? 92 : 41,
          feedback:
            submission.code.trim().length > 40
              ? "Solução aceita (avaliação de demonstração). Inicie o backend com `npm run dev:api` para avaliação em tempo real com IA."
              : "A solução parece incompleta. Revise os requisitos e tente novamente.",
          submittedAt: new Date().toISOString(),
        } satisfies ChallengeSubmissionResult,
        800,
      );
    });
  },

  history(): Promise<ChallengeHistoryItem[]> {
    if (USE_MOCKS) return delay(mockChallengeHistory);
    return apiRequest<ChallengeHistoryItem[]>("/challenges/history").catch((err) => {
      console.warn("Backend indisponível ao carregar histórico, usando mock:", err);
      return delay(mockChallengeHistory, 400);
    });
  },
};
