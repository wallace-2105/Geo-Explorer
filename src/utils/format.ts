import type { Difficulty, Level, Technology, TrailStatus } from "@/types";

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function greeting(now = new Date()): string {
  const h = now.getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

export function firstName(name: string): string {
  return name.split(" ")[0] ?? name;
}

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}min` : `${h}h`;
}

export const technologyAccent: Record<Technology, string> = {
  JavaScript: "text-tech-js",
  TypeScript: "text-tech-ts",
  Python: "text-tech-py",
  Java: "text-tech-java",
  "Node.js": "text-tech-node",
  React: "text-tech-react",
};

export const levelTone: Record<Level, "beginner" | "intermediate" | "advanced"> = {
  Iniciante: "beginner",
  Intermediário: "intermediate",
  Avançado: "advanced",
};

export const difficultyTone: Record<Difficulty, "beginner" | "intermediate" | "advanced"> = {
  easy: "beginner",
  medium: "intermediate",
  hard: "advanced",
};

export const statusTone: Record<TrailStatus, "muted" | "progress" | "done"> = {
  not_started: "muted",
  in_progress: "progress",
  completed: "done",
};
