export const technologies = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "Node.js",
  "React",
] as const;
export type Technology = (typeof technologies)[number];
export const levels = ["Iniciante", "Intermediário", "Avançado"] as const;
export type Level = (typeof levels)[number];
export const difficulties = ["easy", "medium", "hard"] as const;
export type Difficulty = (typeof difficulties)[number];
export type TrailStatus = "not_started" | "in_progress" | "completed";
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
export interface Trail {
  id: string;
  title: string;
  slug: string;
  description: string;
  technology: Technology;
  level: Level;
  progress: number;
  status: TrailStatus;
  modulesCount: number;
  estimatedHours: number;
  tags: string[];
  modules: Module[];
  finalProject: { title: string; description: string; deliverables: string[] };
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
  examples: Array<{ input: string; output: string; explanation?: string }>;
  starterCode: string;
  generatedAt: string;
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
export interface Progress {
  userId: string;
  trailId: string;
  completedModuleIds: string[];
  status: TrailStatus;
  percent: number;
  updatedAt: string;
}
export interface UserProfile {
  id: string;
  name: string;
  headline: string;
  email: string;
  memberSince: string;
  technologies: Technology[];
  stats: {
    completedTrails: number;
    challengesSolved: number;
    currentProgress: number;
    certificates: number;
    streakDays: number;
    hoursStudied: number;
  };
}
