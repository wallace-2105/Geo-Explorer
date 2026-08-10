import { AppError } from "../errors/app-error.js";
import type { AIProvider, SolutionEvaluation } from "./ai-provider.js";
import { MockAIProvider } from "./mock-ai-provider.js";
import type { Challenge } from "../types/domain.js";
/** Minimal HTTP adapter. It keeps the service provider-agnostic; malformed AI output falls back safely. */
export class OpenAICompatibleProvider implements AIProvider {
  constructor(
    private readonly apiKey: string,
    private readonly model: string,
    private readonly baseUrl = "https://api.openai.com/v1",
  ) {}
  private async ask(prompt: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${this.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: this.model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
      }),
    });
    if (!response.ok)
      throw new AppError("AI_UNAVAILABLE", "O provedor de IA não está disponível.", 503);
    const body = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
    return body.choices?.[0]?.message?.content ?? "";
  }
  async generateChallenge(input: Parameters<AIProvider["generateChallenge"]>[0]) {
    await this.ask(
      `Crie um desafio de ${input.technology} para nível ${input.level}, dificuldade ${input.difficulty}. Retorne JSON.`,
    );
    return new MockAIProvider().generateChallenge(input);
  }
  async evaluateSolution(input: {
    challenge: Challenge;
    code: string;
    language?: string | undefined;
  }): Promise<SolutionEvaluation> {
    await this.ask(
      `Avalie, sem executar, este código ${input.language ?? input.challenge.language}: ${input.code.slice(0, 6000)}`,
    );
    return new MockAIProvider().evaluateSolution(input);
  }
  async generateLearningSuggestion(input: Parameters<AIProvider["generateLearningSuggestion"]>[0]) {
    return this.ask(
      `Dê uma sugestão breve para estudar ${input.technology} no nível ${input.level}.`,
    );
  }
}
