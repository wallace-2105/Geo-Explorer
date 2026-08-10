import { z } from "zod";
import { certificateInputSchema, challengeInputSchema, idSchema } from "../schemas/http.js";
import type { Services } from "../services/container.js";
/** Transport-neutral MCP handlers. Tests and the stdio server both call these functions. */
export function createMcpTools(services: Services) {
  return {
    list_learning_trails: async (input: unknown) =>
      services.trails.list(
        z
          .object({
            technology: challengeInputSchema.shape.technology.optional(),
            level: challengeInputSchema.shape.level.optional(),
            status: z.enum(["not_started", "in_progress", "completed"]).optional(),
            search: z.string().optional(),
          })
          .parse(input),
      ),
    get_learning_trail: async (input: unknown) => services.trails.get(idSchema.parse(input).id),
    generate_challenge: async (input: unknown) =>
      services.challenges.generate(challengeInputSchema.parse(input)),
    get_challenge: async (input: unknown) => services.challenges.get(idSchema.parse(input).id),
    generate_certificate: async (input: unknown) => {
      const parsed = certificateInputSchema.parse(input);
      const user = await services.users.get(parsed.userId);
      return services.certificates.generate({
        trailId: parsed.trailId,
        userName: parsed.userName ?? user.name,
      });
    },
    get_certificate: async (input: unknown) => services.certificates.get(idSchema.parse(input).id),
    get_learning_progress: async (input: unknown) =>
      services.progress.list(z.object({ userId: z.string().min(1) }).parse(input).userId),
  };
}
