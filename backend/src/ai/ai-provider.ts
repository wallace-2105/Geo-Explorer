import type { Challenge, Difficulty, Level, Technology } from "../types/domain.js";
export interface SolutionEvaluation {
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
}
export interface AIProvider {
  generateChallenge(input: {
    technology: Technology;
    level: Level;
    difficulty: Difficulty;
  }): Promise<Omit<Challenge, "id" | "generatedAt">>;
  evaluateSolution(input: {
    challenge: Challenge;
    code: string;
    language?: string | undefined;
  }): Promise<SolutionEvaluation>;
  generateLearningSuggestion(input: { technology: Technology; level: Level }): Promise<string>;
}
