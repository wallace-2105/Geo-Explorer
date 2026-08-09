import type {
  Challenge,
  ChallengeHistoryItem,
  GenerateChallengeInput,
  Technology,
} from "@/types";

const LANGUAGE_BY_TECH: Record<Technology, string> = {
  JavaScript: "javascript",
  TypeScript: "typescript",
  Python: "python",
  Java: "java",
  "Node.js": "javascript",
  React: "tsx",
};

const STARTER: Record<string, string> = {
  javascript: "function resolver(entrada) {\n  // sua solução aqui\n}\n",
  typescript:
    "export function resolver(entrada: string[]): string[] {\n  // sua solução aqui\n  return [];\n}\n",
  python: "def resolver(entrada):\n    # sua solução aqui\n    pass\n",
  java:
    "public class Solucao {\n    public static void main(String[] args) {\n        // sua solução aqui\n    }\n}\n",
  tsx:
    "export function Componente() {\n  // sua solução aqui\n  return null;\n}\n",
};

/** Mock que simula o desafio que a IA do backend irá gerar. */
export function buildMockChallenge(input: GenerateChallengeInput): Challenge {
  const language = LANGUAGE_BY_TECH[input.technology];
  return {
    id: `chl-${Date.now()}`,
    title: `Agrupar eventos por janela de tempo em ${input.technology}`,
    description:
      "Você recebe uma lista de eventos com timestamp e precisa agrupá-los em janelas de tempo consecutivas. Eventos separados por mais de 5 minutos iniciam uma nova janela. O resultado deve preservar a ordem original dos eventos.",
    technology: input.technology,
    level: input.level,
    difficulty: input.difficulty,
    language,
    requirements: [
      "A função deve receber uma lista de eventos com `id` e `timestamp` (ISO 8601).",
      "Eventos com intervalo maior que 5 minutos devem iniciar uma nova janela.",
      "A ordem original dos eventos deve ser preservada dentro de cada janela.",
      "A solução não deve alterar a lista recebida.",
      "Trate a lista vazia retornando uma lista vazia.",
    ],
    examples: [
      {
        input: '[{"id":"a","timestamp":"2026-01-01T10:00:00Z"},{"id":"b","timestamp":"2026-01-01T10:03:00Z"}]',
        output: '[["a","b"]]',
        explanation: "Os dois eventos estão a 3 minutos de distância, então ficam na mesma janela.",
      },
      {
        input: '[{"id":"a","timestamp":"2026-01-01T10:00:00Z"},{"id":"b","timestamp":"2026-01-01T10:30:00Z"}]',
        output: '[["a"],["b"]]',
        explanation: "O intervalo é maior que 5 minutos, então cada evento abre sua própria janela.",
      },
    ],
    starterCode: STARTER[language] ?? "",
    generatedAt: new Date().toISOString(),
  };
}

export const mockChallengeHistory: ChallengeHistoryItem[] = [
  {
    id: "h1",
    challengeTitle: "Normalizar payload de API",
    technology: "TypeScript",
    difficulty: "medium",
    status: "passed",
    solvedAt: "2026-08-07T14:20:00Z",
  },
  {
    id: "h2",
    challengeTitle: "Fila de requisições com limite",
    technology: "Node.js",
    difficulty: "hard",
    status: "passed",
    solvedAt: "2026-08-05T09:05:00Z",
  },
  {
    id: "h3",
    challengeTitle: "Componente de lista virtualizada",
    technology: "React",
    difficulty: "hard",
    status: "failed",
    solvedAt: "2026-08-02T18:40:00Z",
  },
  {
    id: "h4",
    challengeTitle: "Agrupamento por chave",
    technology: "JavaScript",
    difficulty: "easy",
    status: "passed",
    solvedAt: "2026-07-30T11:10:00Z",
  },
];
