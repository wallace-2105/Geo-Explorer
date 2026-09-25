import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Carrega .env do diretório de execução atual, da pasta backend e da raiz
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3334),
  CORS_ORIGIN: z.string().default("*"),
  AI_PROVIDER: z.enum(["mock", "openai-compatible"]).default("mock"),
  AI_API_KEY: z.string().optional(),
  AI_MODEL: z.string().default("gpt-4.1-mini"),
  AI_BASE_URL: z.string().url().optional(),
  SUPABASE_JWT_SECRET: z.string().default("dev-jwt-secret-fallback"),
});
export const env = envSchema.parse(process.env);
