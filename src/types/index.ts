/**
 * Contratos de dados da aplicação.
 * Estes tipos representam o payload esperado da futura API REST
 * (Node.js + TypeScript). Os mocks em `src/data` seguem exatamente
 * estes contratos.
 */

export type Technology = "JavaScript" | "TypeScript" | "Python" | "Java" | "Node.js" | "React";

export const TECHNOLOGIES: Technology[] = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "Node.js",
  "React",
];

export type Level = "Iniciante" | "Intermediário" | "Avançado";

export const LEVELS: Level[] = ["Iniciante", "Intermediário", "Avançado"];

export type TrailStatus = "not_started" | "in_progress" | "completed";

export const TRAIL_STATUS_LABEL: Record<TrailStatus, string> = {
  not_started: "Não iniciada",
  in_progress: "Em andamento",
  completed: "Concluída",
};

export type Difficulty = "easy" | "medium" | "hard";

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: "Fácil",
  medium: "Média",
  hard: "Difícil",
};

export type LessonType = "video" | "reading" | "exercise" | "project";

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  durationMinutes: number;
  completed: boolean;
}

export interface Module {
  id: string;
  title: string;
  summary: string;
  order: number;
  lessons: Lesson[];
  completed: boolean;
}

export interface FinalProject {
  title: string;
  description: string;
  deliverables: string[];
}

export interface Trail {
  id: string;
  title: string;
  slug: string;
  description: string;
  technology: Technology;
  level: Level;
  /** 0-100 */
  progress: number;
  status: TrailStatus;
  modulesCount: number;
  estimatedHours: number;
  tags: string[];
  modules: Module[];
  finalProject: FinalProject;
}

export interface TrailFilters {
  search?: string;
  technology?: Technology | "all";
  level?: Level | "all";
  status?: TrailStatus | "all";
}

export interface ChallengeExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  technology: Technology;
  level: Level;
  difficulty: Difficulty;
  language: string;
  requirements: string[];
  examples: ChallengeExample[];
  starterCode: string;
  /** Preenchido pelo backend/IA futuramente */
  generatedAt?: string;
}

export interface GenerateChallengeInput {
  technology: Technology;
  level: Level;
  difficulty: Difficulty;
}

export interface ChallengeSubmission {
  challengeId: string;
  code: string;
}

export interface ChallengeSubmissionResult {
  submissionId: string;
  status: "passed" | "failed";
  score: number;
  feedback: string;
  submittedAt: string;
}

export interface Certificate {
  id: string;
  userName: string;
  trailId: string;
  trailName: string;
  technology: Technology;
  level: Level;
  issuedAt: string;
  credentialId: string;
  hoursCompleted: number;
}

export interface UserStats {
  completedTrails: number;
  challengesSolved: number;
  currentProgress: number;
  certificates: number;
  streakDays: number;
  hoursStudied: number;
}

export interface UserProfile {
  id: string;
  name: string;
  headline: string;
  email: string;
  avatarUrl?: string;
  memberSince: string;
  technologies: Technology[];
  stats: UserStats;
}

export interface ChallengeHistoryItem {
  id: string;
  challengeTitle: string;
  technology: Technology;
  difficulty: Difficulty;
  status: "passed" | "failed";
  solvedAt: string;
}

/** Envelope padrão esperado da API REST */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}
