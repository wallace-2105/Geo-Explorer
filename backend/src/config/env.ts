import "dotenv/config";
import { z } from "zod";
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3333),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  AI_PROVIDER: z.enum(["mock", "openai-compatible"]).default("mock"),
  AI_API_KEY: z.string().optional(),
  AI_MODEL: z.string().default("gpt-4.1-mini"),
  AI_BASE_URL: z.string().url().optional(),
});
export const env = envSchema.parse(process.env);
