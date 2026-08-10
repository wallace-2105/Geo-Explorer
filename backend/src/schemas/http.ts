import { z } from "zod";
import { difficulties, levels, technologies } from "../types/domain.js";
export const idSchema = z.object({ id: z.string().trim().min(1).max(100) });
export const trailQuerySchema = z.object({
  search: z.string().trim().max(100).optional(),
  technology: z.enum(technologies).optional(),
  level: z.enum(levels).optional(),
  status: z.enum(["not_started", "in_progress", "completed"]).optional(),
});
export const challengeInputSchema = z.object({
  technology: z.enum(technologies),
  level: z.enum(levels),
  difficulty: z.enum(difficulties),
});
export const submissionSchema = z.object({
  challengeId: z.string().trim().min(1).max(100),
  code: z.string().min(1).max(50_000),
  language: z.string().trim().max(40).optional(),
});
export const progressInputSchema = z.object({
  userId: z.string().trim().min(1).max(100),
  trailId: z.string().trim().min(1).max(100),
  moduleId: z.string().trim().min(1).max(100).optional(),
  action: z.enum(["start", "complete_module", "complete_trail"]).default("start"),
});
export const certificateInputSchema = z.object({
  userId: z.string().trim().min(1).max(100).default("usr-1"),
  trailId: z.string().trim().min(1).max(100),
  userName: z.string().trim().min(1).max(100).optional(),
});
