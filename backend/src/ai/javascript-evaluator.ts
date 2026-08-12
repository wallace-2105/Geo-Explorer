import { exec } from "node:child_process";
import { promisify } from "node:util";
import { writeFile, unlink } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { randomUUID } from "node:crypto";
import type { JavascriptChallenge, TestCase } from "../data/javascript-challenges.js";

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

export interface JavascriptEvaluationResult {
  passedTests: number;
  totalTests: number;
  score: number; // 0-100
  status: "passed" | "failed";
  results: TestResult[];
  feedback: string;
}

/** Detects the Node executable available on the system */
async function getNodeExe(): Promise<string | null> {
  try {
    await execAsync(`node -v`, { timeout: 3000 });
    return "node";
  } catch {
    return null;
  }
}

/** Writes a temp JS file, runs it, then deletes it */
async function runJavascriptTest(
  userCode: string,
  testCase: TestCase,
  nodeExe: string,
): Promise<{ output: string; error: string }> {
  // We handle both synchronous and asynchronous challenges (Promises)
  const harness = `
${userCode}

async function runTest() {
  try {
    let args_raw = [${testCase.input}];
    // Se for string pura, number ou objeto único que não seja list, mantemos no args_raw.
    // Mas o JS interpreta [1, 2] como dois argumentos. Se o input fosse "1, 2", args_raw vira [1, 2].
    
    let result = resolver(...args_raw);
    if (result instanceof Promise) {
      result = await result;
    }
    
    // Tratamentos para exibir exatamente o formato esperado pelas respostas
    if (typeof result === 'function') {
        console.log("Function");
        // Tratamento especial para testes estruturais de avançado
    } else if (typeof result === 'object' && result !== null) {
      if (Array.isArray(result)) {
        console.log("[" + result.map(v => typeof v === 'string' ? "'" + v + "'" : (v===null ? "null" : v)).join(", ") + "]");
      } else {
        // Objeto dicionário
        let str = "{";
        let keys = Object.keys(result);
        for(let i=0; i<keys.length; i++) {
           let v = result[keys[i]];
           str += "'" + keys[i] + "': " + (typeof v === 'string' ? "'" + v + "'" : v);
           if(i < keys.length - 1) str += ", ";
        }
        str += "}";
        console.log(str);
      }
    } else if (typeof result === 'string') {
        console.log("'" + result + "'");
    } else {
        console.log(String(result));
    }
  } catch (e) {
    console.error(String(e));
    process.exit(1);
  }
}

runTest();
`;

  const tmpFile = join(tmpdir(), `geo_js_${randomUUID()}.js`);

  try {
    await writeFile(tmpFile, harness, "utf-8");

    const { stdout, stderr } = await execAsync(`${nodeExe} "${tmpFile}"`, {
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

/** Normalise JS output for comparison */
function normalise(s: string): string {
  return s
    .replace(/\s+/g, " ")
    .replace(/\( /g, "(")
    .replace(/ \)/g, ")")
    .replace(/\[ /g, "[")
    .replace(/ \]/g, "]")
    .replace(/\{ /g, "{")
    .replace(/ \}/g, "}")
    .replace(/"/g, "'") // Uniformize quotes if any
    .trim();
}

export async function evaluateJavascriptSolution(
  challenge: JavascriptChallenge,
  userCode: string,
): Promise<JavascriptEvaluationResult> {
  const nodeExe = await getNodeExe();

  if (!nodeExe) {
    return buildFallbackResult(challenge.testCases, userCode);
  }

  const results: TestResult[] = [];

  for (const tc of challenge.testCases) {
    const { output, error } = await runJavascriptTest(userCode, tc, nodeExe);

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

function buildResult(results: TestResult[]): JavascriptEvaluationResult {
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

/** Fallback heuristic when Node is not available on the server */
function buildFallbackResult(
  testCases: TestCase[],
  code: string,
): JavascriptEvaluationResult {
  const hasLogic = code.trim().length > 50 && !code.includes("  // Escreva seu código");
  const score = hasLogic ? 80 : 20;
  const status = hasLogic ? "passed" : "failed";
  const results: TestResult[] = testCases.map((tc) => ({
    passed: hasLogic,
    description: tc.description,
    input: tc.input,
    expected: tc.expected,
    received:
      "(Node.js não disponível no servidor — avaliação heurística)",
  }));

  return {
    passedTests: hasLogic ? testCases.length : 0,
    totalTests: testCases.length,
    score,
    status,
    results,
    feedback: hasLogic
      ? "Node.js não está disponível no servidor. Avaliação heurística: sua solução parece ter lógica implementada."
      : "Node.js não está disponível. Sua solução parece incompleta (apenas código base sem implementação).",
  };
}
