import { Router } from "express";
import { z } from "zod";
import type { Services } from "../services/container.js";
import {
  certificateInputSchema,
  challengeInputSchema,
  idSchema,
  progressInputSchema,
  submissionSchema,
  trailQuerySchema,
} from "../schemas/http.js";
export function createApiRouter(services: Services) {
  const router = Router();
  router.get("/health", (_request, response) => response.json({ data: { status: "ok" } }));
  router.get("/trails", async (request, response) =>
    response.json({ data: await services.trails.list(trailQuerySchema.parse(request.query)) }),
  );
  router.get("/trails/:id", async (request, response) =>
    response.json({ data: await services.trails.get(idSchema.parse(request.params).id) }),
  );
  router.post("/trails/:id/enroll", async (request, response) =>
    response.json({ data: await services.trails.enroll(idSchema.parse(request.params).id) }),
  );
  router.post("/challenges/generate", async (request, response) =>
    response
      .status(201)
      .json({ data: await services.challenges.generate(challengeInputSchema.parse(request.body)) }),
  );
  router.get("/challenges/history", async (_request, response) =>
    response.json({ data: await services.challenges.history() }),
  );
  router.get("/challenges/:id", async (request, response) =>
    response.json({ data: await services.challenges.get(idSchema.parse(request.params).id) }),
  );
  router.post("/challenges/submissions", async (request, response) =>
    response
      .status(201)
      .json({ data: await services.challenges.submit(submissionSchema.parse(request.body)) }),
  );
  router.get("/certificates", async (_request, response) =>
    response.json({ data: await services.certificates.list() }),
  );
  router.get("/certificates/:id", async (request, response) =>
    response.json({ data: await services.certificates.get(idSchema.parse(request.params).id) }),
  );
  router.post("/certificates", async (request, response) => {
    const input = certificateInputSchema.parse(request.body);
    const user = await services.users.get(input.userId);
    response.status(201).json({
      data: await services.certificates.generate({
        trailId: input.trailId,
        userName: input.userName ?? user.name,
      }),
    });
  });
  router.get("/progress/:userId", async (request, response) =>
    response.json({
      data: await services.progress.list(
        z.object({ userId: z.string().min(1) }).parse(request.params).userId,
      ),
    }),
  );
  router.post("/progress", async (request, response) =>
    response.json({
      data: await services.progress.update(progressInputSchema.parse(request.body)),
    }),
  );
  router.get("/me", async (_request, response) =>
    response.json({ data: await services.users.get() }),
  );
  router.get("/users/:id", async (request, response) =>
    response.json({ data: await services.users.get(idSchema.parse(request.params).id) }),
  );
  return router;
}
