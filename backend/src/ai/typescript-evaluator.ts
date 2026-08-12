import { exec } from "node:child_process";
import { promisify } from "node:util";
import { writeFile, unlink } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { randomUUID } from "node:crypto";
import type { TypescriptChallenge, TestCase } from "../data/typescript-challenges.js";

const execAsync = promisify(exec);
const TIMEOUT_MS = 8000; // tsc takes a bit longer

export interface TestResult {
  passed: boolean;
  description: string;
  input: string;
  expected: string;
  received: string;
  error?: string;
}

export interface TypescriptEvaluationResult {
  passedTests: number;
  totalTests: number;
  score: number;
  status: "passed" | "failed";
  results: TestResult[];
  feedback: string;
}

/** Detects if npx tsc is available */
async function getTscCommand(): Promise<string | null> {
  try {
    await execAsync(`npx tsc --version`, { timeout: 5000 });
    return "npx tsc";
  } catch {
    return null;
  }
}

async function runTypescriptTest(
  userCode: string,
  testCase: TestCase,
  tscCmd: string,
): Promise<{ output: string; error: string }> {
  // Typescript tests: We append the test execution at the end of the user's TS code.
  // We use ts-ignore or disable some lints if necessary, but ideally the user code itself should be strict.
  
  const harness = `
${userCode}

async function runTest() {
  try {
    let args_raw = [${testCase.input}];
    // Type casting to bypass TS complaining about args array expansion if types are very complex
    let result = (module.exports as any)[Object.keys(module.exports)[0]](...args_raw);
    
    if (result instanceof Promise) {
      result = await result;
    }
    
    if (typeof result === 'function') {
        console.log("Function");
    } else if (typeof result === 'object' && result !== null) {
      if (Array.isArray(result)) {
        console.log("[" + result.map(v => typeof v === 'string' ? "'" + v + "'" : (v===null ? "null" : v)).join(", ") + "]");
      } else {
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

  const uuid = randomUUID();
  const tsFile = join(tmpdir(), `geo_ts_${uuid}.ts`);
  const jsFile = join(tmpdir(), `geo_ts_${uuid}.js`); // tsc emits .js with the same name

  try {
    await writeFile(tsFile, harness, "utf-8");

    // 1. Compile TS -> JS (This checks for types!)
    // We run tsc in the same folder to compile it
    try {
      await execAsync(`${tscCmd} --target es2022 --module commonjs "${tsFile}"`, {
        timeout: TIMEOUT_MS,
        windowsHide: true,
      });
    } catch (compileErr: any) {
      // Compilation failed, meaning there is a Type Error.
      return { output: "", error: "Compilation Error: " + compileErr.stdout?.trim() };
    }

    // 2. Run the compiled JS
    const { stdout, stderr } = await execAsync(`node "${jsFile}"`, {
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
        error: "Timeout: o código demorou mais de 8 segundos.",
      };
    }
    return {
      output: error.stdout?.trim() ?? "",
      error: error.stderr?.trim() ?? String(err),
    };
  } finally {
    // cleanup
    await unlink(tsFile).catch(() => {});
    await unlink(jsFile).catch(() => {});
  }
}

function normalise(s: string): string {
  return s
    .replace(/\s+/g, " ")
    .replace(/\( /g, "(")
    .replace(/ \)/g, ")")
    .replace(/\[ /g, "[")
    .replace(/ \]/g, "]")
    .replace(/\{ /g, "{")
    .replace(/ \}/g, "}")
    .replace(/"/g, "'") 
    .trim();
}

export async function evaluateTypescriptSolution(
  challenge: TypescriptChallenge,
  userCode: string,
): Promise<TypescriptEvaluationResult> {
  const tscCmd = await getTscCommand();

  if (!tscCmd) {
    return buildFallbackResult(challenge.testCases, userCode);
  }

  const results: TestResult[] = [];
  
  // We can do a single compile step for performance, but evaluating one by one guarantees isolated env.
  // Since tsc is slow, let's try to just run it one by one for now (or fail early on compile).
  
  for (let i = 0; i < challenge.testCases.length; i++) {
    const tc = challenge.testCases[i]!;
    const { output, error } = await runTypescriptTest(userCode, tc, tscCmd);

    // If it's a compilation error, it applies to all tests, so we can fail everything.
    if (error && error.includes("Compilation Error")) {
        // Return 1 failed test that signifies compile error
        results.push({
            passed: false,
            description: "Verificação de Tipos (Typechecking)",
            input: tc.input,
            expected: tc.expected,
            received: "",
            error: error.substring(0, 500)
        });
        // We can short circuit because compile error means no code will run
        break; 
    }
    
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

  return buildResult(results, challenge.testCases.length);
}

function buildResult(results: TestResult[], expectedTotal: number): TypescriptEvaluationResult {
  const passedTests = results.filter((r) => r.passed).length;
  // If it broke on compile, results.length will be 1, but totalTests is expectedTotal
  const totalTests = expectedTotal;
  const score = Math.round((passedTests / totalTests) * 100);
  const status = score >= 70 ? "passed" : "failed";

  let feedback: string;
  if (results.length === 1 && !results[0]!.passed && results[0]!.error?.includes("Compilation Error")) {
      feedback = "Erro de compilação! Seu código não passou na checagem estrita de tipos do TypeScript.";
  } else if (score === 100) {
    feedback = `Parabéns! Todos os ${totalTests} casos de teste passaram. Solução tipada perfeitamente!`;
  } else if (score >= 70) {
    feedback = `Aprovado! ${passedTests} de ${totalTests} testes passaram (${score}%).`;
  } else if (score > 0) {
    feedback = `${passedTests} de ${totalTests} testes passaram (${score}%). Tente novamente.`;
  } else {
    feedback = `Nenhum teste passou. Revise sua tipagem e lógica.`;
  }

  return { passedTests, totalTests, score, status, results, feedback };
}

function buildFallbackResult(
  testCases: TestCase[],
  code: string,
): TypescriptEvaluationResult {
  const hasLogic = code.trim().length > 50 && !code.includes("  // Escreva seu código");
  const score = hasLogic ? 80 : 20;
  const status = hasLogic ? "passed" : "failed";
  const results: TestResult[] = testCases.map((tc) => ({
    passed: hasLogic,
    description: tc.description,
    input: tc.input,
    expected: tc.expected,
    received:
      "(TS não disponível no servidor — avaliação heurística)",
  }));

  return {
    passedTests: hasLogic ? testCases.length : 0,
    totalTests: testCases.length,
    score,
    status,
    results,
    feedback: hasLogic
      ? "Avaliação heurística: Typescript indisponível no server, mas solução parece válida."
      : "Typescript indisponível. Sua solução parece incompleta.",
  };
}
