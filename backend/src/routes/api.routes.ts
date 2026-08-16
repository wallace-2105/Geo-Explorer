import { Router } from "express";
import { z } from "zod";
import type { Services } from "../services/container.js";
import { createPythonRouter } from "./python.routes.js";
import javascriptRouter from "./javascript.routes.js";
import typescriptRouter from "./typescript.routes.js";
import {
  certificateInputSchema,
  challengeInputSchema,
  idSchema,
  progressInputSchema,
  submissionSchema,
  trailQuerySchema,
} from "../schemas/http.js";
import { requireAuth, type AuthenticatedRequest } from "../middlewares/auth.js";

export function createApiRouter(services: Services) {
  const router = Router();
  router.get("/health", (_request, response) => response.json({ data: { status: "ok" } }));

  // Register JS Router
  router.use("/javascript", javascriptRouter);
  router.use("/typescript", typescriptRouter);
  router.get("/trails", async (request, response) =>
    response.json({ data: await services.trails.list(trailQuerySchema.parse(request.query)) }),
  );
  router.get("/trails/:id", async (request, response) =>
    response.json({ data: await services.trails.get(idSchema.parse(request.params).id) }),
  );
  router.post("/trails/:id/enroll", requireAuth, async (request: AuthenticatedRequest, response) =>
    response.json({ data: await services.trails.enroll(idSchema.parse(request.params).id, request.user!.id) }),
  );
  router.post("/challenges/generate", requireAuth, async (request: AuthenticatedRequest, response) =>
    response
      .status(201)
      .json({ data: await services.challenges.generate({ ...challengeInputSchema.parse(request.body), userId: request.user!.id }) }),
  );
  router.get("/challenges/history", requireAuth, async (request: AuthenticatedRequest, response) =>
    response.json({ data: await services.challenges.history(request.user!.id) }),
  );
  router.get("/challenges/:id", requireAuth, async (request: AuthenticatedRequest, response) =>
    response.json({ data: await services.challenges.get(idSchema.parse(request.params).id, request.user!.id) }),
  );
  router.post("/challenges/submissions", requireAuth, async (request: AuthenticatedRequest, response) =>
    response
      .status(201)
      .json({ data: await services.challenges.submit({ ...submissionSchema.parse(request.body), userId: request.user!.id }) }),
  );
  router.get("/certificates", requireAuth, async (request: AuthenticatedRequest, response) =>
    response.json({ data: await services.certificates.list(request.user!.id) }),
  );
  router.get("/certificates/:id", requireAuth, async (request: AuthenticatedRequest, response) =>
    response.json({ data: await services.certificates.get(idSchema.parse(request.params).id, request.user!.id) }),
  );
  router.post("/certificates", requireAuth, async (request: AuthenticatedRequest, response) => {
    const input = certificateInputSchema.parse(request.body);
    const user = await services.users.get(request.user!.id, request.user);
    response.status(201).json({
      data: await services.certificates.generate({
        trailId: input.trailId,
        userName: input.userName ?? user.name,
        userId: request.user!.id,
      }),
    });
  });
  router.get("/progress", requireAuth, async (request: AuthenticatedRequest, response) =>
    response.json({
      data: await services.progress.list(request.user!.id),
    }),
  );
  router.post("/progress", requireAuth, async (request: AuthenticatedRequest, response) =>
    response.json({
      data: await services.progress.update({ ...progressInputSchema.parse(request.body), userId: request.user!.id }),
    }),
  );
  router.get("/me", requireAuth, async (request: AuthenticatedRequest, response) =>
    response.json({ data: await services.users.get(request.user!.id, request.user) }),
  );
  router.get("/users/:id", requireAuth, async (request: AuthenticatedRequest, response) =>
    response.json({ data: await services.users.get(idSchema.parse(request.params).id) }),
  );
  router.use("/python", createPythonRouter());
  return router;
}
