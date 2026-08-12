import { Router } from "express";
import { getTypescriptPhases, getTypescriptChallenge } from "../data/typescript-challenges.js";
import { evaluateTypescriptSolution } from "../ai/typescript-evaluator.js";

const router = Router();

// GET /api/typescript/phases?level=Iniciante&difficulty=easy
router.get("/phases", (req, res) => {
  const level = req.query["level"] as any;
  const difficulty = req.query["difficulty"] as any;

  if (!level || !difficulty) {
    res.status(400).json({ error: "Parâmetros level e difficulty são obrigatórios." });
    return;
  }

  const phases = getTypescriptPhases(level, difficulty);
  
  // Remove a solução da resposta enviada ao cliente
  const safePhases = phases.map((p) => {
    const { solution, ...safePhase } = p;
    return safePhase;
  });

  res.json(safePhases);
});

// GET /api/typescript/phases/:id
router.get("/phases/:id", (req, res) => {
  const challenge = getTypescriptChallenge(req.params["id"]);
  
  if (!challenge) {
    res.status(404).json({ error: "Desafio não encontrado." });
    return;
  }

  const { solution, ...safeChallenge } = challenge;
  res.json(safeChallenge);
});

// POST /api/typescript/phases/:id/submit
router.post("/phases/:id/submit", async (req, res) => {
  try {
    const challenge = getTypescriptChallenge(req.params["id"]);
    if (!challenge) {
      res.status(404).json({ error: "Desafio não encontrado." });
      return;
    }

    const { code } = req.body;
    if (!code || typeof code !== "string") {
      res.status(400).json({ error: "O código submetido é obrigatório." });
      return;
    }

    const result = await evaluateTypescriptSolution(challenge, code);
    res.json(result);
  } catch (error) {
    console.error("Erro ao avaliar solução Typescript:", error);
    res.status(500).json({ error: "Erro interno ao avaliar solução." });
  }
});

export default router;
