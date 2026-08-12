import { exec } from "node:child_process";
import { promisify } from "node:util";
import { writeFile, unlink } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { randomUUID } from "node:crypto";
import type { PythonChallenge, TestCase } from "../data/python-challenges.js";

const execAsync = promisify(exec);
const TIMEOUT_MS = 5000;

export interface TestResult {
  passed: boolean;
  description: string;
  input: string;
  expected: string;
  received: string;
  error?: string;
}

export interface PythonEvaluationResult {
  passedTests: number;
  totalTests: number;
  score: number; // 0-100
  status: "passed" | "failed";
  results: TestResult[];
  feedback: string;
}

/** Detects the Python executable available on the system */
async function getPythonExe(): Promise<string | null> {
  for (const exe of ["python", "python3"]) {
    try {
      await execAsync(`${exe} --version`, { timeout: 3000 });
      return exe;
    } catch {
      // try next
    }
  }
  return null;
}

/** Writes a temp Python file, runs it, then deletes it */
async function runPythonTest(
  userCode: string,
  testCase: TestCase,
  pythonExe: string,
): Promise<{ output: string; error: string }> {
  const harness = `import sys

${userCode}

try:
    args_raw = ${testCase.input}
    if isinstance(args_raw, tuple):
        result = resolver(*args_raw)
    else:
        result = resolver(args_raw)
    print(repr(result))
except Exception as e:
    print(str(e), file=sys.stderr)
    sys.exit(1)
`;

  const tmpFile = join(tmpdir(), `geo_py_${randomUUID()}.py`);

  try {
    await writeFile(tmpFile, harness, "utf-8");

    const { stdout, stderr } = await execAsync(`${pythonExe} "${tmpFile}"`, {
      timeout: TIMEOUT_MS,
      windowsHide: true,
    });

    return { output: stdout.trim(), error: stderr.trim() };
  } catch (err: unknown) {
    const error = err as NodeJS.ErrnoException & {
      stdout?: string;
      stderr?: string;
      killed?: boolean;
    };
    if (error.killed) {
      return {
        output: "",
        error: "Timeout: o código demorou mais de 5 segundos.",
      };
    }
    return {
      output: error.stdout?.trim() ?? "",
      error: error.stderr?.trim() ?? String(err),
    };
  } finally {
    await unlink(tmpFile).catch(() => {
      // ignore cleanup errors
    });
  }
}

/** Normalise Python repr for comparison */
function normalise(s: string): string {
  return s
    .replace(/\s+/g, " ")
    .replace(/\( /g, "(")
    .replace(/ \)/g, ")")
    .replace(/\[ /g, "[")
    .replace(/ \]/g, "]")
    .replace(/\{ /g, "{")
    .replace(/ \}/g, "}")
    .trim();
}

export async function evaluatePythonSolution(
  challenge: PythonChallenge,
  userCode: string,
): Promise<PythonEvaluationResult> {
  const pythonExe = await getPythonExe();

  if (!pythonExe) {
    return buildFallbackResult(challenge.testCases, userCode);
  }

  const results: TestResult[] = [];

  for (const tc of challenge.testCases) {
    const { output, error } = await runPythonTest(userCode, tc, pythonExe);

    if (error) {
      results.push({
        passed: false,
        description: tc.description,
        input: tc.input,
        expected: tc.expected,
        received: "",
        error: error.substring(0, 300),
      });
      continue;
    }

    const passed = normalise(output) === normalise(tc.expected);
    results.push({
      passed,
      description: tc.description,
      input: tc.input,
      expected: tc.expected,
      received: output,
    });
  }

  return buildResult(results);
}

function buildResult(results: TestResult[]): PythonEvaluationResult {
  const passedTests = results.filter((r) => r.passed).length;
  const totalTests = results.length;
  const score = Math.round((passedTests / totalTests) * 100);
  const status = score >= 70 ? "passed" : "failed";

  let feedback: string;
  if (score === 100) {
    feedback = `Parabéns! Todos os ${totalTests} casos de teste passaram. Solução perfeita!`;
  } else if (score >= 70) {
    feedback = `Aprovado! ${passedTests} de ${totalTests} testes passaram (${score}%). Verifique os casos que falharam para refinar.`;
  } else if (score > 0) {
    feedback = `${passedTests} de ${totalTests} testes passaram (${score}%). Analise os casos falhos e revise sua lógica.`;
  } else {
    feedback = `Nenhum teste passou. Revise os requisitos e tente novamente.`;
  }

  return { passedTests, totalTests, score, status, results, feedback };
}

/** Fallback heuristic when Python is not available on the server */
function buildFallbackResult(
  testCases: TestCase[],
  code: string,
): PythonEvaluationResult {
  const hasLogic = code.trim().length > 60 && !code.includes("    pass");
  const score = hasLogic ? 80 : 20;
  const status = hasLogic ? "passed" : "failed";
  const results: TestResult[] = testCases.map((tc) => ({
    passed: hasLogic,
    description: tc.description,
    input: tc.input,
    expected: tc.expected,
    received:
      "(Python não disponível no servidor — avaliação heurística)",
  }));

  return {
    passedTests: hasLogic ? testCases.length : 0,
    totalTests: testCases.length,
    score,
    status,
    results,
    feedback: hasLogic
      ? "Python não está disponível no servidor. Avaliação heurística: sua solução parece ter lógica implementada."
      : "Python não está disponível. Sua solução parece incompleta (apenas código base sem implementação).",
  };
}
