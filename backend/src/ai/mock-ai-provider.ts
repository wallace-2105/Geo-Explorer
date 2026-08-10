import type { AIProvider, SolutionEvaluation } from "./ai-provider.js";
import type { Challenge, Technology } from "../types/domain.js";
const languageByTechnology: Record<Technology, string> = {
  JavaScript: "javascript",
  TypeScript: "typescript",
  Python: "python",
  Java: "java",
  "Node.js": "javascript",
  React: "tsx",
};
const starter: Record<string, string> = {
  javascript: "function resolver(entrada) {\n  // sua solução aqui\n}\n",
  typescript: "export function resolver(entrada: string[]): string[] {\n  return [];\n}\n",
  python: "def resolver(entrada):\n    pass\n",
  java: "public class Solucao {\n  public static void main(String[] args) {}\n}\n",
  tsx: "export function Componente() {\n  return null;\n}\n",
};
export class MockAIProvider implements AIProvider {
  async generateChallenge(
    input: Parameters<AIProvider["generateChallenge"]>[0],
  ): Promise<Omit<Challenge, "id" | "generatedAt">> {
    const language = languageByTechnology[input.technology];
    return {
      title: `Agrupar eventos por janela de tempo em ${input.technology}`,
      description:
        "Agrupe eventos ordenados por timestamp. Um intervalo superior a cinco minutos inicia uma nova janela, sem alterar a lista original.",
      technology: input.technology,
      level: input.level,
      difficulty: input.difficulty,
      language,
      requirements: [
        "Receba eventos com id e timestamp ISO 8601.",
        "Preserve a ordem de cada evento.",
        "Abra uma nova janela acima de cinco minutos.",
        "Retorne uma lista vazia para entrada vazia.",
      ],
      examples: [
        {
          input:
            '[{"id":"a","timestamp":"2026-01-01T10:00:00Z"},{"id":"b","timestamp":"2026-01-01T10:03:00Z"}]',
          output: '[["a","b"]]',
          explanation: "Os eventos estão a três minutos de distância.",
        },
      ],
      starterCode: starter[language] ?? "",
    };
  }
  async evaluateSolution(input: {
    challenge: Challenge;
    code: string;
    language?: string | undefined;
  }): Promise<SolutionEvaluation> {
    const substantive = input.code.trim().length > 40;
    return substantive
      ? {
          score: 92,
          feedback:
            "A solução apresenta uma implementação substancial. Esta avaliação é heurística e não executa código no servidor.",
          strengths: [
            "Estrutura de solução presente",
            "Código enviado tem tamanho suficiente para revisão",
          ],
          improvements: ["Inclua testes de borda", "Documente decisões de complexidade"],
        }
      : {
          score: 41,
          feedback:
            "A solução parece incompleta. Esta avaliação é heurística e não executa código no servidor.",
          strengths: [],
          improvements: ["Implemente a lógica principal", "Revise todos os requisitos"],
        };
  }
  async generateLearningSuggestion(input: {
    technology: Technology;
    level: Parameters<AIProvider["generateLearningSuggestion"]>[0]["level"];
  }): Promise<string> {
    return `Pratique ${input.technology} com um exercício ${input.level.toLowerCase()} e revise os requisitos antes de enviar.`;
  }
}
