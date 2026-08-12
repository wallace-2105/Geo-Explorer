import { Router } from "express";
import { z } from "zod";
import { AppError } from "../errors/app-error.js";
import { getPythonChallenge, getPythonPhases } from "../data/python-challenges.js";
import { evaluatePythonSolution } from "../ai/python-evaluator.js";
import { difficulties, levels } from "../types/domain.js";

export function createPythonRouter(): Router {
  const router = Router();

  // GET /python/phases?level=Iniciante&difficulty=easy
  router.get("/phases", async (req, res, next) => {
    try {
      const query = z
        .object({
          level: z.enum(levels),
          difficulty: z.enum(difficulties),
        })
        .parse(req.query);

      const phases = getPythonPhases(query.level, query.difficulty);

      if (phases.length === 0) {
        throw new AppError("PHASES_NOT_FOUND", "Nenhuma fase encontrada para esta combinação.", 404);
      }

      // Return phases without solution (don't expose answers)
      const safe = phases.map(({ solution: _s, ...rest }) => rest);

      res.json({ data: safe });
    } catch (err) {
      next(err);
    }
  });

  // GET /python/phases/:id
  router.get("/phases/:id", async (req, res, next) => {
    try {
      const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
      const challenge = getPythonChallenge(id);

      if (!challenge) {
        throw new AppError("CHALLENGE_NOT_FOUND", "Fase não encontrada.", 404);
      }

      const { solution: _s, ...safe } = challenge;
      res.json({ data: safe });
    } catch (err) {
      next(err);
    }
  });

  // POST /python/phases/:id/submit
  router.post("/phases/:id/submit", async (req, res, next) => {
    try {
      const { id } = z.object({ id: z.string().min(1) }).parse(req.params);
      const { code } = z
        .object({ code: z.string().min(1).max(50_000) })
        .parse(req.body);

      const challenge = getPythonChallenge(id);
      if (!challenge) {
        throw new AppError("CHALLENGE_NOT_FOUND", "Fase não encontrada.", 404);
      }

      const evaluation = await evaluatePythonSolution(challenge, code);

      res.json({ data: evaluation });
    } catch (err) {
      next(err);
    }
  });

  return router;
}
