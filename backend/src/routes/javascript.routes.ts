import { Router } from "express";
import { getJavascriptPhases, getJavascriptChallenge } from "../data/javascript-challenges.js";
import { evaluateJavascriptSolution } from "../ai/javascript-evaluator.js";

const router = Router();

// GET /api/javascript/phases?level=Iniciante&difficulty=easy
router.get("/phases", (req, res) => {
  const level = req.query["level"] as any;
  const difficulty = req.query["difficulty"] as any;

  if (!level || !difficulty) {
    res.status(400).json({ error: "Parâmetros level e difficulty são obrigatórios." });
    return;
  }

  const phases = getJavascriptPhases(level, difficulty);
  
  // Remove a solução da resposta enviada ao cliente
  const safePhases = phases.map((p) => {
    const { solution, ...safePhase } = p;
    return safePhase;
  });

  res.json(safePhases);
});

// GET /api/javascript/phases/:id
router.get("/phases/:id", (req, res) => {
  const challenge = getJavascriptChallenge(req.params["id"]);
  
  if (!challenge) {
    res.status(404).json({ error: "Desafio não encontrado." });
    return;
  }

  const { solution, ...safeChallenge } = challenge;
  res.json(safeChallenge);
});

// POST /api/javascript/phases/:id/submit
router.post("/phases/:id/submit", async (req, res) => {
  try {
    const challenge = getJavascriptChallenge(req.params["id"]);
    if (!challenge) {
      res.status(404).json({ error: "Desafio não encontrado." });
      return;
    }

    const { code } = req.body;
    if (!code || typeof code !== "string") {
      res.status(400).json({ error: "O código submetido é obrigatório." });
      return;
    }

    const result = await evaluateJavascriptSolution(challenge, code);
    res.json(result);
  } catch (error) {
    console.error("Erro ao avaliar solução Javascript:", error);
    res.status(500).json({ error: "Erro interno ao avaliar solução." });
  }
});

export default router;
