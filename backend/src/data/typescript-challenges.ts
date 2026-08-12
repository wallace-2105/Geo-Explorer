type Level = "Iniciante" | "Intermediário" | "Avançado";
type Difficulty = "easy" | "medium" | "hard";

export interface TestCase {
  input: string;
  expected: string;
  description: string;
}

export interface TypescriptChallenge {
  id: string;
  phase: number;
  level: Level;
  difficulty: Difficulty;
  title: string;
  description: string;
  requirements: string[];
  starterCode: string;
  solution: string;
  testCases: TestCase[];
  hint: string;
  example: {
    input: string;
    output: string;
    explanation: string;
  };
}

// ==========================================
// Iniciante (Beginner)
// Foco: Sintaxe base, tipos primitivos, arrays tipados, interfaces, enums e union types.
// ==========================================

const tsInicianteEasy: TypescriptChallenge[] = [
  {
    id: "ts-ini-easy-1",
    phase: 1,
    level: "Iniciante",
    difficulty: "easy",
    title: "Tipos Primitivos",
    description: "Crie uma função `formatarUsuario` que recebe o nome (string), a idade (number) e se está ativo (boolean), e retorna uma string formatada.",
    requirements: [
      "Os parâmetros da função devem ser tipados explicitamente.",
      "Retornar a string no formato: 'Nome, Idade anos - [Ativo/Inativo]'",
    ],
    starterCode: `function formatarUsuario(nome, idade, ativo) {
  // Escreva seu código
}
module.exports = { formatarUsuario };`,
    solution: `function formatarUsuario(nome: string, idade: number, ativo: boolean): string {
  return \`\${nome}, \${idade} anos - \${ativo ? 'Ativo' : 'Inativo'}\`;
}
module.exports = { formatarUsuario };`,
    testCases: [
      { input: "'João', 25, true", expected: "João, 25 anos - Ativo", description: "Usuário ativo" },
      { input: "'Maria', 30, false", expected: "Maria, 30 anos - Inativo", description: "Usuário inativo" },
      { input: "'Ana', 18, true", expected: "Ana, 18 anos - Ativo", description: "Outro ativo" },
      { input: "'Pedro', 12, false", expected: "Pedro, 12 anos - Inativo", description: "Outro inativo" },
      { input: "'', 0, false", expected: ", 0 anos - Inativo", description: "Valores vazios" },
    ],
    hint: "Use `nome: string, idade: number, ativo: boolean`. O retorno pode ser especificado com `: string`.",
    example: { input: "'João', 25, true", output: "João, 25 anos - Ativo", explanation: "O booleano true vira 'Ativo'" },
  },
  {
    id: "ts-ini-easy-2",
    phase: 2,
    level: "Iniciante",
    difficulty: "easy",
    title: "Arrays Tipados",
    description: "Crie uma função `somarArray` que recebe um array exclusivamente numérico e retorna a soma de seus elementos.",
    requirements: [
      "O parâmetro deve ser tipado como array de números (number[]).",
      "Retornar um número (number).",
    ],
    starterCode: `function somarArray(numeros) {
  // Escreva seu código
}
module.exports = { somarArray };`,
    solution: `function somarArray(numeros: number[]): number {
  return numeros.reduce((acc, curr) => acc + curr, 0);
}
module.exports = { somarArray };`,
    testCases: [
      { input: "[1, 2, 3]", expected: "6", description: "Números simples" },
      { input: "[10, -5, 5]", expected: "10", description: "Com negativos" },
      { input: "[]", expected: "0", description: "Array vazio" },
      { input: "[100]", expected: "100", description: "Um elemento" },
      { input: "[1.5, 2.5]", expected: "4", description: "Decimais" },
    ],
    hint: "No TypeScript, declarar um array de números pode ser feito como `numeros: number[]` ou `numeros: Array<number>`.",
    example: { input: "[1, 2, 3]", output: "6", explanation: "1 + 2 + 3 = 6" },
  },
  {
    id: "ts-ini-easy-3",
    phase: 3,
    level: "Iniciante",
    difficulty: "easy",
    title: "Tuplas (Tuples)",
    description: "O TypeScript possui Tuplas, arrays com tamanho e tipos fixos. Retorne uma tupla contendo uma string e um número a partir de dois parâmetros.",
    requirements: [
      "A função deve receber (nome: string, pontuacao: number).",
      "O retorno deve ser explicitamente tipado como uma Tupla `[string, number]`.",
    ],
    starterCode: `function criarTupla(nome, pontuacao) {
  // Escreva seu código
}
module.exports = { criarTupla };`,
    solution: `function criarTupla(nome: string, pontuacao: number): [string, number] {
  return [nome, pontuacao];
}
module.exports = { criarTupla };`,
    testCases: [
      { input: "'A', 10", expected: "['A', 10]", description: "Tupla básica" },
      { input: "'B', 0", expected: "['B', 0]", description: "Tupla com zero" },
      { input: "'', -1", expected: "['', -1]", description: "Strings vazias e negativos" },
      { input: "'Player', 999", expected: "['Player', 999]", description: "Player e pontuação" },
      { input: "'Z', 3.14", expected: "['Z', 3.14]", description: "Tupla decimal" },
    ],
    hint: "O tipo de retorno pode ser escrito como `: [string, number]`.",
    example: { input: "'A', 10", output: "['A', 10]", explanation: "Retorna o array exato correspondente a tupla" },
  },
  {
    id: "ts-ini-easy-4",
    phase: 4,
    level: "Iniciante",
    difficulty: "easy",
    title: "Union Types",
    description: "Uma função pode aceitar múltiplos tipos. Crie `processarID` que aceita número ou string. Se for número, retorna `ID Numérico: X`. Se for string, `ID String: X`.",
    requirements: [
      "Use Union Type (`string | number`) no parâmetro.",
      "Use um type guard (`typeof`) para separar a lógica.",
    ],
    starterCode: `function processarID(id) {
  // Escreva seu código
}
module.exports = { processarID };`,
    solution: `function processarID(id: string | number): string {
  if (typeof id === 'number') {
    return \`ID Numérico: \${id}\`;
  }
  return \`ID String: \${id}\`;
}
module.exports = { processarID };`,
    testCases: [
      { input: "123", expected: "ID Numérico: 123", description: "Número" },
      { input: "'123'", expected: "ID String: 123", description: "String" },
      { input: "0", expected: "ID Numérico: 0", description: "Zero" },
      { input: "'abc'", expected: "ID String: abc", description: "Texto puro" },
      { input: "'-1'", expected: "ID String: -1", description: "String negativa" },
    ],
    hint: "Use `id: string | number`. Dentro da função, `typeof id === 'number'` permite que o TypeScript saiba o tipo seguro naquele bloco.",
    example: { input: "123", output: "ID Numérico: 123", explanation: "O typeof identificou um número" },
  },
  {
    id: "ts-ini-easy-5",
    phase: 5,
    level: "Iniciante",
    difficulty: "easy",
    title: "Enums Simples",
    description: "Declare um `enum Status` com os valores `Pendente`, `Aprovado` e `Rejeitado`. A função recebe o enum e retorna uma mensagem descritiva.",
    requirements: [
      "O enum `Status` deve ter valores string ou utilizar a indexação padrão (0, 1, 2).",
      "O avaliador vai passar números se for padrão (0, 1, 2).",
    ],
    starterCode: `// Crie o enum Status
function getStatusMsg(s) {
  // Retorne "Aguardando", "Sucesso" ou "Erro" dependendo do Enum. (0, 1 ou 2)
}
module.exports = { getStatusMsg };`,
    solution: `enum Status { Pendente = 0, Aprovado = 1, Rejeitado = 2 }
function getStatusMsg(s: Status): string {
  if (s === Status.Pendente) return "Aguardando";
  if (s === Status.Aprovado) return "Sucesso";
  return "Erro";
}
module.exports = { getStatusMsg, Status };`,
    testCases: [
      { input: "0", expected: "Aguardando", description: "Status Pendente" },
      { input: "1", expected: "Sucesso", description: "Status Aprovado" },
      { input: "2", expected: "Erro", description: "Status Rejeitado" },
      { input: "1", expected: "Sucesso", description: "Teste redundante aprovado" },
      { input: "0", expected: "Aguardando", description: "Teste redundante pendente" },
    ],
    hint: "Enums por padrão recebem 0, 1, 2. `enum Status { Pendente, Aprovado, Rejeitado }`",
    example: { input: "0", output: "Aguardando", explanation: "0 corresponde ao primeiro valor do enum" },
  },
];

const tsInicianteMedium: TypescriptChallenge[] = [
  {
    id: "ts-ini-medium-1",
    phase: 1,
    level: "Iniciante",
    difficulty: "medium",
    title: "Interfaces Básicas",
    description: "Crie uma interface `Pessoa` com `nome` (string) e `idade` (number). A função recebe uma Pessoa e retorna `'Maior'` se idade >= 18 ou `'Menor'`.",
    requirements: [
      "Defina explicitamente a `interface Pessoa`.",
      "A função deve exigir que o objeto recebido cumpra essa interface.",
    ],
    starterCode: `interface Pessoa {
  // defina as propriedades
}
function checarMaioridade(p) {
  // retorne "Maior" ou "Menor"
}
module.exports = { checarMaioridade };`,
    solution: `interface Pessoa { nome: string; idade: number; }
function checarMaioridade(p: Pessoa): string {
  return p.idade >= 18 ? "Maior" : "Menor";
}
module.exports = { checarMaioridade };`,
    testCases: [
      { input: "{nome: 'A', idade: 20}", expected: "Maior", description: "Acima de 18" },
      { input: "{nome: 'B', idade: 17}", expected: "Menor", description: "Abaixo de 18" },
      { input: "{nome: 'C', idade: 18}", expected: "Maior", description: "Exatamente 18" },
      { input: "{nome: 'D', idade: 0}", expected: "Menor", description: "0 anos" },
      { input: "{nome: 'E', idade: 99}", expected: "Maior", description: "Idoso" },
    ],
    hint: "A interface ajuda o TS a saber que o parâmetro `p` sempre terá `.idade`.",
    example: { input: "{nome: 'A', idade: 20}", output: "Maior", explanation: "20 >= 18" },
  },
  {
    id: "ts-ini-medium-2",
    phase: 2,
    level: "Iniciante",
    difficulty: "medium",
    title: "Propriedades Opcionais",
    description: "Em TypeScript, o `?` torna uma propriedade opcional na Interface. Adicione `sobrenome?` na `Pessoa`. Retorne o nome completo, caso haja sobrenome.",
    requirements: [
      "O parâmetro terá `nome` obrigatório e `sobrenome` opcional.",
      "Se não houver sobrenome, retorne apenas o nome.",
    ],
    starterCode: `function nomeCompleto(p) {
  // Escreva seu código
}
module.exports = { nomeCompleto };`,
    solution: `interface PessoaOp { nome: string; sobrenome?: string; }
function nomeCompleto(p: PessoaOp): string {
  return p.sobrenome ? \`\${p.nome} \${p.sobrenome}\` : p.nome;
}
module.exports = { nomeCompleto };`,
    testCases: [
      { input: "{nome: 'Ana'}", expected: "Ana", description: "Sem sobrenome" },
      { input: "{nome: 'Ana', sobrenome: 'Silva'}", expected: "Ana Silva", description: "Com sobrenome" },
      { input: "{nome: 'Pedro'}", expected: "Pedro", description: "Sem sobrenome (2)" },
      { input: "{nome: 'Lara', sobrenome: 'Croft'}", expected: "Lara Croft", description: "Com sobrenome (2)" },
      { input: "{nome: 'X', sobrenome: ''}", expected: "X", description: "Sobrenome string vazia resolve pra falsy" },
    ],
    hint: "Use `sobrenome?: string`. Na lógica, verifique se existe com `p.sobrenome` ou `p.sobrenome !== undefined`.",
    example: { input: "{nome: 'Ana'}", output: "Ana", explanation: "Não havia sobrenome fornecido" },
  },
  {
    id: "ts-ini-medium-3",
    phase: 3,
    level: "Iniciante",
    difficulty: "medium",
    title: "Literal Types",
    description: "O TS permite definir strings exatas como tipos. A função deve aceitar APENAS as strings 'left', 'right', 'up' ou 'down'. Retorne a string em MAIÚSCULAS.",
    requirements: [
      "Use Literal Types + Union: `type Direcao = 'left' | 'right' | 'up' | 'down'`",
    ],
    starterCode: `function mover(direcao) {
  // retorne a string em maiúsculas
}
module.exports = { mover };`,
    solution: `type Direcao = 'left' | 'right' | 'up' | 'down';
function mover(direcao: Direcao): string {
  return direcao.toUpperCase();
}
module.exports = { mover };`,
    testCases: [
      { input: "'left'", expected: "LEFT", description: "left" },
      { input: "'right'", expected: "RIGHT", description: "right" },
      { input: "'up'", expected: "UP", description: "up" },
      { input: "'down'", expected: "DOWN", description: "down" },
      { input: "'left'", expected: "LEFT", description: "left (2)" },
    ],
    hint: "Criar um type com `type Direcao = 'left' | 'right' | 'up' | 'down'` obriga que a função aceite apenas esses valores absolutos em tempo de compilação.",
    example: { input: "'left'", output: "LEFT", explanation: "LEFT maiúsculo" },
  },
  {
    id: "ts-ini-medium-4",
    phase: 4,
    level: "Iniciante",
    difficulty: "medium",
    title: "Any vs Unknown",
    description: "O tipo `unknown` é mais seguro que o `any`. A função aceita um parâmetro `unknown`. Verifique seu tipo: se for string retorne o tamanho, se for array retorne o length, se for numero retorne ele próprio, caso contrário retorne -1.",
    requirements: [
      "O parâmetro deve ser tipado como `unknown`.",
      "Use `typeof` e `Array.isArray` para fazer as validações de tipo.",
    ],
    starterCode: `function analisar(valor) {
  // Escreva seu código
}
module.exports = { analisar };`,
    solution: `function analisar(valor: unknown): number {
  if (typeof valor === 'string') return valor.length;
  if (Array.isArray(valor)) return valor.length;
  if (typeof valor === 'number') return valor;
  return -1;
}
module.exports = { analisar };`,
    testCases: [
      { input: "'Hello'", expected: "5", description: "String" },
      { input: "[1, 2, 3]", expected: "3", description: "Array" },
      { input: "42", expected: "42", description: "Number" },
      { input: "true", expected: "-1", description: "Boolean" },
      { input: "{a: 1}", expected: "-1", description: "Object" },
    ],
    hint: "`unknown` exige que você faça verificações de tipo (`type guards`) antes de usá-lo, diferente do `any` que permite qualquer operação.",
    example: { input: "'Hello'", output: "5", explanation: "O tamanho da string é 5" },
  },
  {
    id: "ts-ini-medium-5",
    phase: 5,
    level: "Iniciante",
    difficulty: "medium",
    title: "Type Aliases (Intersection)",
    description: "Combine dois types com Intersecção (`&`). Tenha um tipo `A = { a: number }` e `B = { b: string }`. A função recebe um parâmetro `A & B` e retorna a concatenação `a-b`.",
    requirements: [
      "Defina o intersection type e tipifique o parâmetro com ele.",
    ],
    starterCode: `function combinar(obj) {
  // Escreva seu código
}
module.exports = { combinar };`,
    solution: `type A = { a: number };
type B = { b: string };
type AB = A & B;
function combinar(obj: AB): string {
  return \`\${obj.a}-\${obj.b}\`;
}
module.exports = { combinar };`,
    testCases: [
      { input: "{a: 1, b: 'x'}", expected: "1-x", description: "Simples" },
      { input: "{a: 99, b: 'teste'}", expected: "99-teste", description: "Vários" },
      { input: "{a: 0, b: ''}", expected: "0-", description: "Vazios" },
      { input: "{a: -1, b: 'neg'}", expected: "-1-neg", description: "Negativo" },
      { input: "{a: 2, b: 'b'}", expected: "2-b", description: "Valido" },
    ],
    hint: "Use `type AB = A & B`. Isso diz ao TS que o objeto precisa ter TUDO de A e TUDO de B ao mesmo tempo.",
    example: { input: "{a: 1, b: 'x'}", output: "1-x", explanation: "Retorna a concatenação formatada" },
  },
];

const tsInicianteHard: TypescriptChallenge[] = [
  {
    id: "ts-ini-hard-1",
    phase: 1,
    level: "Iniciante",
    difficulty: "hard",
    title: "Optional Chaining e Nullish Coalescing",
    description: "Use os operadores `?.` e `??` para acessar propriedades profundas sem quebrar o código. O objeto recebido pode não ter o sub-objeto `endereco`, ou `cidade`.",
    requirements: [
      "A função aceita `p: { endereco?: { cidade?: string } }`.",
      "Retorne a cidade, ou 'Desconhecido' caso seja undefined/null, utilizando `?.` e `??`.",
    ],
    starterCode: `function getCidade(p) {
  // Escreva seu código
}
module.exports = { getCidade };`,
    solution: `function getCidade(p: { endereco?: { cidade?: string } }): string {
  return p?.endereco?.cidade ?? "Desconhecido";
}
module.exports = { getCidade };`,
    testCases: [
      { input: "{ endereco: { cidade: 'SP' } }", expected: "SP", description: "Comples" },
      { input: "{ endereco: {} }", expected: "Desconhecido", description: "Sem cidade" },
      { input: "{}", expected: "Desconhecido", description: "Sem endereco" },
      { input: "{ endereco: { cidade: 'RJ' } }", expected: "RJ", description: "Outra cidade" },
      { input: "null", expected: "Desconhecido", description: "Objeto nulo" },
    ],
    hint: "A sintaxe `p?.endereco?.cidade ?? 'Desconhecido'` protege de erros de acesso a nulos.",
    example: { input: "{}", output: "Desconhecido", explanation: "Acesso profundo falha com elegância" },
  },
  {
    id: "ts-ini-hard-2",
    phase: 2,
    level: "Iniciante",
    difficulty: "hard",
    title: "Type Assertion (Casting)",
    description: "Às vezes o TS pensa que algo é genérico (como unknown), mas você tem certeza do tipo. Receba um tipo genérico `valor: unknown`, e faça a asserção explícita (`as number`) para multiplicá-lo por 2.",
    requirements: [
      "Ignore a tipagem estrita com `as number` e faça `valor * 2`.",
      "(Na vida real cuidado com Assertions sem garantias).",
    ],
    starterCode: `function multiplicarForcado(valor) {
  // Escreva seu código
}
module.exports = { multiplicarForcado };`,
    solution: `function multiplicarForcado(valor: unknown): number {
  return (valor as number) * 2;
}
module.exports = { multiplicarForcado };`,
    testCases: [
      { input: "10", expected: "20", description: "Dez" },
      { input: "0", expected: "0", description: "Zero" },
      { input: "-5", expected: "-10", description: "Negativo" },
      { input: "100", expected: "200", description: "Cem" },
      { input: "2.5", expected: "5", description: "Decimal" },
    ],
    hint: "Use `(valor as number)` para forçar o TypeScript a não acusar erro durante a compilação matemática em um unknown.",
    example: { input: "10", output: "20", explanation: "Forçado pra número, 10 * 2 = 20" },
  },
  {
    id: "ts-ini-hard-3",
    phase: 3,
    level: "Iniciante",
    difficulty: "hard",
    title: "ReadOnly Properties",
    description: "O TypeScript protege dados mutáveis com a palavra `readonly`. Se você tentar reatribuir, ele falhará ao compilar. O desafio aqui é compilar: crie uma interface Config e apague o que tenta ser modificado.",
    requirements: [
      "Corrija o código base para passar pelo compilador (ts). Não permita modificação em `id`.",
    ],
    starterCode: `interface Config {
  readonly id: number;
  nome: string;
}
function atualizarConfig(c: Config) {
  // c.id = 999; // Causa erro se descomentar
  c.nome = "Atualizado";
  return c.id + "-" + c.nome;
}
module.exports = { atualizarConfig };`,
    solution: `interface Config {
  readonly id: number;
  nome: string;
}
function atualizarConfig(c: Config): string {
  c.nome = "Atualizado";
  return c.id + "-" + c.nome;
}
module.exports = { atualizarConfig };`,
    testCases: [
      { input: "{id: 1, nome: 'A'}", expected: "1-Atualizado", description: "Normal" },
      { input: "{id: 42, nome: 'B'}", expected: "42-Atualizado", description: "Outro" },
      { input: "{id: 0, nome: ''}", expected: "0-Atualizado", description: "Zero" },
      { input: "{id: -1, nome: 'X'}", expected: "-1-Atualizado", description: "Neg" },
      { input: "{id: 99, nome: 'Z'}", expected: "99-Atualizado", description: "Z" },
    ],
    hint: "Mantenha o `readonly` na interface e não altere `c.id` dentro do corpo da função, se não o compilador irá recusar a execução.",
    example: { input: "{id: 1, nome: 'A'}", output: "1-Atualizado", explanation: "O campo nome muda, mas o ID é fixo." },
  },
  {
    id: "ts-ini-hard-4",
    phase: 4,
    level: "Iniciante",
    difficulty: "hard",
    title: "Strict Null Checks",
    description: "Quando 'strictNullChecks' está ativo, uma variável string não pode ser nula a menos que explicitamente informada (`string | null`). A função busca usuário e, se vier null, devolve string vazia.",
    requirements: [
      "Tipifique o retorno de uma busca fictícia que pode falhar: aceite `string | null` e devolva a string garantida (fazendo checagem).",
    ],
    starterCode: `function garantaString(valor) {
  // Escreva seu código
}
module.exports = { garantaString };`,
    solution: `function garantaString(valor: string | null): string {
  if (valor === null) return "";
  return valor;
}
module.exports = { garantaString };`,
    testCases: [
      { input: "'ok'", expected: "ok", description: "Tem string" },
      { input: "null", expected: "", description: "Vem nulo" },
      { input: "'teste'", expected: "teste", description: "Teste longo" },
      { input: "''", expected: "", description: "String vazia (não nula)" },
      { input: "null", expected: "", description: "Vem nulo (2)" },
    ],
    hint: "Se for null, retorne `\"\"`. Isso limpa o tipo nulo e permite devolver sempre string pro ambiente estrito.",
    example: { input: "null", output: "", explanation: "Substitui null por vazio" },
  },
  {
    id: "ts-ini-hard-5",
    phase: 5,
    level: "Iniciante",
    difficulty: "hard",
    title: "Never Type",
    description: "O tipo `never` sinaliza que algo nunca vai acontecer (como um loop infinito, ou sempre estourar um Erro). A função lança um erro sempre. Tipifique o retorno dela corretamente como `never`.",
    requirements: [
      "Tipifique o retorno da função que joga throw para `: never`.",
    ],
    starterCode: `function estourarErro(msg) {
  throw new Error(msg);
}
// Não mexa em wrapper, apenas na função estourarErro e seu retorno.
function wrapper(msg) {
  try { estourarErro(msg); } catch(e) { return e.message; }
}
module.exports = { estourarErro, wrapper };`,
    solution: `function estourarErro(msg: string): never {
  throw new Error(msg);
}
function wrapper(msg: string): string {
  try { estourarErro(msg); } catch(e: any) { return e.message; }
  return "";
}
module.exports = { estourarErro, wrapper };`,
    testCases: [
      { input: "'Falha 1'", expected: "Falha 1", description: "Erro simples" },
      { input: "'Bug crítico'", expected: "Bug crítico", description: "Bug critico" },
      { input: "''", expected: "", description: "String vazia erro" },
      { input: "'404'", expected: "404", description: "Status code erro" },
      { input: "'X'", expected: "X", description: "Letra" },
    ],
    hint: "No TypeScript, funções que nunca terminam a execução normalmente (devido a Exceptions ou while true) retornam `never`.",
    example: { input: "'Falha 1'", output: "Falha 1", explanation: "Cai no catch do wrapper lendo a mensagem" },
  },
];

// ==========================================
// Intermediário (Intermediate)
// Foco: Generics, Type Guards avançados, Utility Types.
// ==========================================

const tsIntermediarioEasy: TypescriptChallenge[] = [
  {
    id: "ts-int-easy-1",
    phase: 1,
    level: "Intermediário",
    difficulty: "easy",
    title: "Generics Básicos",
    description: "Crie uma função genérica `identidade<T>(arg: T): T` que recebe um argumento e devolve ele mesmo. Essa é a base dos genéricos.",
    requirements: [
      "Use `<T>` para declarar a tipagem genérica da função.",
    ],
    starterCode: `function identidade(arg) {
  // Escreva seu código
}
module.exports = { identidade };`,
    solution: `function identidade<T>(arg: T): T {
  return arg;
}
module.exports = { identidade };`,
    testCases: [
      { input: "'teste'", expected: "teste", description: "String" },
      { input: "42", expected: "42", description: "Number" },
      { input: "true", expected: "true", description: "Boolean" },
      { input: "[1,2,3]", expected: "[1, 2, 3]", description: "Array" },
      { input: "{x:1}", expected: "{'x': 1}", description: "Object" },
    ],
    hint: "`function identidade<T>(arg: T): T` garante que o que entrar vai sair com a mesmíssima tipagem.",
    example: { input: "'teste'", output: "teste", explanation: "O T se ajusta pra ser string" },
  },
  {
    id: "ts-int-easy-2",
    phase: 2,
    level: "Intermediário",
    difficulty: "easy",
    title: "Generic Array (Reverse)",
    description: "A função recebe um array genérico de qualquer tipo e devolve invertido (usando .reverse()). A tipagem deve forçar a receber array genérico.",
    requirements: [
      "Use `<T>` e defina o parâmetro como `T[]` ou `Array<T>`.",
    ],
    starterCode: `function reverterArray(arr) {
  // Escreva seu código
}
module.exports = { reverterArray };`,
    solution: `function reverterArray<T>(arr: T[]): T[] {
  return arr.reverse();
}
module.exports = { reverterArray };`,
    testCases: [
      { input: "[1, 2, 3]", expected: "[3, 2, 1]", description: "Números" },
      { input: "['a', 'b', 'c']", expected: "['c', 'b', 'a']", description: "Strings" },
      { input: "[]", expected: "[]", description: "Vazio" },
      { input: "[true, false]", expected: "[false, true]", description: "Booleans" },
      { input: "[1]", expected: "[1]", description: "Um item" },
    ],
    hint: "Os parâmetros e retornos serão `T[]`.",
    example: { input: "[1, 2, 3]", output: "[3, 2, 1]", explanation: "Reversão mantendo a tipagem array intacta." },
  },
  {
    id: "ts-int-easy-3",
    phase: 3,
    level: "Intermediário",
    difficulty: "easy",
    title: "Utility: Partial<T>",
    description: "O `Partial<T>` é um utilitário nativo que pega uma interface e torna tudo opcional. Receba dois objetos (original e update) onde o update é Partial e junte os dois.",
    requirements: [
      "Use tipagem genérica `<T>` e o utilitário nativo `Partial<T>` para o 2º parâmetro.",
    ],
    starterCode: `function atualizarObjeto(obj, update) {
  // Escreva seu código
}
module.exports = { atualizarObjeto };`,
    solution: `function atualizarObjeto<T extends object>(obj: T, update: Partial<T>): T {
  return { ...obj, ...update };
}
module.exports = { atualizarObjeto };`,
    testCases: [
      { input: "{id: 1, n: 'A'}, {n: 'B'}", expected: "{'id': 1, 'n': 'B'}", description: "Trocou nome" },
      { input: "{id: 1, n: 'A'}, {}", expected: "{'id': 1, 'n': 'A'}", description: "Vazio não afeta" },
      { input: "{a: 10, b: 20}, {b: 99}", expected: "{'a': 10, 'b': 99}", description: "Atribui b" },
      { input: "{x: 1}, {x: 2}", expected: "{'x': 2}", description: "Substitui completo" },
      { input: "{a: 1}, {a: undefined}", expected: "{'a': undefined}", description: "Apaga (se Partial permitir)" },
    ],
    hint: "Use `function <T extends object>(obj: T, update: Partial<T>): T` e espalhe (`...`) os valores.",
    example: { input: "{id: 1, n: 'A'}, {n: 'B'}", output: "{'id': 1, 'n': 'B'}", explanation: "O update era Partial<T>, e o resultado é completo." },
  },
  {
    id: "ts-int-easy-4",
    phase: 4,
    level: "Intermediário",
    difficulty: "easy",
    title: "Generics e Extends (Constraints)",
    description: "Crie a função genérica `logLength<T extends { length: number }>(arg: T)`. Isso força o argumento genérico a ter obrigatóriamente a propriedade `length`.",
    requirements: [
      "Restrinja o generic com a cláusula `extends`.",
      "Retorne o valor da propriedade length.",
    ],
    starterCode: `function logLength(arg) {
  // Escreva seu código
}
module.exports = { logLength };`,
    solution: `function logLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}
module.exports = { logLength };`,
    testCases: [
      { input: "'abcdef'", expected: "6", description: "String tem length" },
      { input: "[1, 2, 3, 4]", expected: "4", description: "Array tem length" },
      { input: "[]", expected: "0", description: "Array vazio" },
      { input: "{ length: 10, outros: 'val' }", expected: "10", description: "Objeto que atende ao extends" },
      { input: "{ length: 0 }", expected: "0", description: "Objeto curto" },
    ],
    hint: "Quando colocamos `<T extends X>`, dizemos que `T` pode ser qualquer coisa, DESDE QUE obedeça a estrutura de `X` (neste caso, ter um length: number).",
    example: { input: "'abcdef'", output: "6", explanation: "String atende T extends { length: number }" },
  },
  {
    id: "ts-int-easy-5",
    phase: 5,
    level: "Intermediário",
    difficulty: "easy",
    title: "Utility: Readonly<T>",
    description: "Receba um objeto, mas garanta que a tipagem do parâmetro é `Readonly<T>`. Tente não alterar nada e apenas retorne o JSON stringified do objeto.",
    requirements: [
      "Use `Readonly<T>` no parâmetro. Para facilitar, retorne um objeto idêntico no runtime.",
    ],
    starterCode: `function exibir(obj) {
  // Escreva seu código
}
module.exports = { exibir };`,
    solution: `function exibir<T>(obj: Readonly<T>): string {
  return JSON.stringify(obj).replace(/"/g, "'");
}
module.exports = { exibir };`,
    testCases: [
      { input: "{x: 1}", expected: "{'x':1}", description: "Um prop" },
      { input: "{a: 'oi'}", expected: "{'a':'oi'}", description: "String" },
      { input: "{}", expected: "{}", description: "Vazio" },
      { input: "{x: 1, y: 2}", expected: "{'x':1,'y':2}", description: "Dois props" },
      { input: "{ativo: true}", expected: "{'ativo':true}", description: "Bool" },
    ],
    hint: "`Readonly<T>` transforma todas as props de `T` em imutáveis em tempo de compilação. Mas em runtime ainda é só um JS Object.",
    example: { input: "{x: 1}", output: "{'x':1}", explanation: "A compilação só checa se a tipagem exigia imutabilidade." },
  },
];

const tsIntermediarioMedium: TypescriptChallenge[] = [
  {
    id: "ts-int-medium-1",
    phase: 1,
    level: "Intermediário",
    difficulty: "medium",
    title: "User-Defined Type Guards",
    description: "Crie uma função `isString` que retorna um _Type Predicate_ (`value is string`). Use essa função de Type Guard dentro de um filter para extrair apenas strings de um array genérico.",
    requirements: [
      "Defina `isString(val: any): val is string`.",
      "Crie `filtrarStrings` que usa a `isString` no filter.",
    ],
    starterCode: `function isString(val) {
  return typeof val === 'string';
}
function filtrarStrings(arr) {
  // Escreva seu código
}
module.exports = { filtrarStrings, isString };`,
    solution: `function isString(val: any): val is string {
  return typeof val === 'string';
}
function filtrarStrings(arr: any[]): string[] {
  return arr.filter(isString);
}
module.exports = { filtrarStrings, isString };`,
    testCases: [
      { input: "[1, 'a', 2, 'b']", expected: "['a', 'b']", description: "Mistos" },
      { input: "['x', 'y']", expected: "['x', 'y']", description: "Só strings" },
      { input: "[1, 2, 3]", expected: "[]", description: "Sem strings" },
      { input: "[]", expected: "[]", description: "Vazio" },
      { input: "['', null, 'oi']", expected: "['', 'oi']", description: "Com falsy nulos" },
    ],
    hint: "Retornar `val is string` faz o compilador TypeScript entender que ao passar no if/filter, o valor magicamente virou string na memória.",
    example: { input: "[1, 'a', 2, 'b']", output: "['a', 'b']", explanation: "O TS inferiu string[] corretamente" },
  },
  {
    id: "ts-int-medium-2",
    phase: 2,
    level: "Intermediário",
    difficulty: "medium",
    title: "Utility: Omit<T, K>",
    description: "Omit permite pegar uma interface e remover uma chave específica. Crie uma função que aceita um objeto sem a propriedade 'senha' usando Omit.",
    requirements: [
      "Defina o payload usando `Omit<User, 'senha'>`.",
    ],
    starterCode: `interface User { id: number; nome: string; senha?: string; }
function mostrarPublico(u) {
  // Escreva seu código
}
module.exports = { mostrarPublico };`,
    solution: `interface User { id: number; nome: string; senha?: string; }
function mostrarPublico(u: Omit<User, 'senha'>): string {
  return u.id + "-" + u.nome;
}
module.exports = { mostrarPublico };`,
    testCases: [
      { input: "{id: 1, nome: 'João'}", expected: "1-João", description: "Usuário público correto" },
      { input: "{id: 99, nome: 'Ana'}", expected: "99-Ana", description: "Usuário Ana" },
      { input: "{id: 0, nome: ''}", expected: "0-", description: "Vazios" },
      { input: "{id: 2, nome: 'B'}", expected: "2-B", description: "B" },
      { input: "{id: -5, nome: 'Negativo'}", expected: "-5-Negativo", description: "Neg" },
    ],
    hint: "`Omit<User, 'senha'>` diz pro TS que o tipo resultante é como User, mas sem a chave senha. É vital em retornos de APIs REST.",
    example: { input: "{id: 1, nome: 'João'}", output: "1-João", explanation: "O compilador garantia que o objeto não tinha a prop senha vazada" },
  },
  {
    id: "ts-int-medium-3",
    phase: 3,
    level: "Intermediário",
    difficulty: "medium",
    title: "Utility: Pick<T, K>",
    description: "Inverso do Omit. Pick permite pegar SÓ algumas chaves. Crie uma função que exija APENAS {id, nome} de um tipo que tinha muito mais coisas usando `Pick<Model, 'id' | 'nome'>`.",
    requirements: [
      "Use Pick explícito e retorne a string contendo esses dois dados.",
    ],
    starterCode: `interface ComplexModel { id: number; nome: string; dataNas: Date; rg: string; }
function preview(m) {
  // Escreva seu código
}
module.exports = { preview };`,
    solution: `interface ComplexModel { id: number; nome: string; dataNas?: any; rg?: string; }
function preview(m: Pick<ComplexModel, 'id' | 'nome'>): string {
  return m.id + ":" + m.nome;
}
module.exports = { preview };`,
    testCases: [
      { input: "{id: 10, nome: 'X'}", expected: "10:X", description: "Pego o pick perfeitamente" },
      { input: "{id: 20, nome: 'Y'}", expected: "20:Y", description: "Outro" },
      { input: "{id: 0, nome: 'Z'}", expected: "0:Z", description: "Zero" },
      { input: "{id: -1, nome: 'Neg'}", expected: "-1:Neg", description: "Negativo" },
      { input: "{id: 99, nome: ''}", expected: "99:", description: "Vazio" },
    ],
    hint: "Com `Pick<T, 'id' | 'nome'>` você enxuga o objeto. Ideal pra criar tipos de payload de formulários.",
    example: { input: "{id: 10, nome: 'X'}", output: "10:X", explanation: "Obtém com segurança os tipos" },
  },
  {
    id: "ts-int-medium-4",
    phase: 4,
    level: "Intermediário",
    difficulty: "medium",
    title: "Overloads de Função",
    description: "O TS permite definir Overloads (múltiplas assinaturas pra mesma função). Crie `dobrar`: se recebe string, devolve string duplicada (str+str), se numero, numero*2.",
    requirements: [
      "Escreva duas assinaturas superiores e a implementação unificada (union types) embaixo.",
    ],
    starterCode: `// escreva as assinaturas e a implementação
function dobrar(val: any): any {
  // Escreva seu código
}
module.exports = { dobrar };`,
    solution: `function dobrar(val: string): string;
function dobrar(val: number): number;
function dobrar(val: any): any {
  if (typeof val === 'string') return val + val;
  return val * 2;
}
module.exports = { dobrar };`,
    testCases: [
      { input: "10", expected: "20", description: "Multiplicar número" },
      { input: "'A'", expected: "'AA'", description: "Duplicar string" },
      { input: "0", expected: "0", description: "Zero" },
      { input: "''", expected: "''", description: "String Vazia" },
      { input: "-5", expected: "-10", description: "Num negativo" },
    ],
    hint: "A estrutura é:\n`function dobrar(val: string): string;`\n`function dobrar(val: number): number;`\n`function dobrar(val: any): any { ... }`.",
    example: { input: "10", output: "20", explanation: "Assinatura do overload guiou para number" },
  },
  {
    id: "ts-int-medium-5",
    phase: 5,
    level: "Intermediário",
    difficulty: "medium",
    title: "Record<K, V>",
    description: "O Record cria um tipo de objeto como se fosse um Dicionário ou Mapa. Crie uma função que aceita `Record<string, number>` e devolva a soma de todos os seus VALUES numéricos.",
    requirements: [
      "Use tipagem `Record<string, number>` e extraia os valores (ex: Object.values()).",
    ],
    starterCode: `function somarRecord(obj) {
  // Escreva seu código
}
module.exports = { somarRecord };`,
    solution: `function somarRecord(obj: Record<string, number>): number {
  return Object.values(obj).reduce((acc, curr) => acc + curr, 0);
}
module.exports = { somarRecord };`,
    testCases: [
      { input: "{a: 10, b: 20}", expected: "30", description: "Soma de 2 chaves" },
      { input: "{c: 5, d: -5}", expected: "0", description: "Soma com negativo" },
      { input: "{}", expected: "0", description: "Vazio" },
      { input: "{z: 100}", expected: "100", description: "Uma chave" },
      { input: "{a: 1, b: 2, c: 3}", expected: "6", description: "Três chaves" },
    ],
    hint: "`Record<string, number>` é incrivelmente útil pra substituir `{[key: string]: number}`.",
    example: { input: "{a: 10, b: 20}", output: "30", explanation: "Soma dos values 10 e 20" },
  },
];

const tsIntermediarioHard: TypescriptChallenge[] = [
  {
    id: "ts-int-hard-1",
    phase: 1,
    level: "Intermediário",
    difficulty: "hard",
    title: "Keyof typeof",
    description: "Extraia as chaves de um objeto constante. Dado o enum-like objeto `const Cores = { BRANCO: '#fff', PRETO: '#000' }`, escreva uma função que aceite APENAS as CHAVES desse objeto.",
    requirements: [
      "Tipifique com `keyof typeof Cores`.",
      "Retorne o valor correspondente dentro do objeto.",
    ],
    starterCode: `const Cores = { BRANCO: '#fff', PRETO: '#000' };
function pegarCor(chave) {
  // Escreva seu código
}
module.exports = { pegarCor, Cores };`,
    solution: `const Cores = { BRANCO: '#fff', PRETO: '#000' };
function pegarCor(chave: keyof typeof Cores): string {
  return Cores[chave];
}
module.exports = { pegarCor, Cores };`,
    testCases: [
      { input: "'BRANCO'", expected: "'#fff'", description: "Chave branco" },
      { input: "'PRETO'", expected: "'#000'", description: "Chave preto" },
      { input: "'BRANCO'", expected: "'#fff'", description: "Repetição 1" },
      { input: "'PRETO'", expected: "'#000'", description: "Repetição 2" },
      { input: "'BRANCO'", expected: "'#fff'", description: "Repetição 3" },
    ],
    hint: "`typeof Cores` vira o tipo do objeto literal, e `keyof` extrai as chaves `'BRANCO' | 'PRETO'`. Perfeito para intellisense e restrições sem criar um novo Enum.",
    example: { input: "'BRANCO'", output: "'#fff'", explanation: "Resgata o hex pelo keyof strict" },
  },
  {
    id: "ts-int-hard-2",
    phase: 2,
    level: "Intermediário",
    difficulty: "hard",
    title: "NonNullable<T>",
    description: "A função tem um array contendo números misturados com nulos/undefined. Filtre e retorne um array usando o helper Type Guard nativo que resolve o tipo de `(number | null)[]` para `number[]`. Use `val is NonNullable<T>` para resolver os tipos na hora do filter (opcional, pode ser manual, desde que retorne `number[]`).",
    requirements: [
      "A função deve retornar `number[]` explicitamente.",
    ],
    starterCode: `function removerNulos(arr) {
  // Escreva seu código
}
module.exports = { removerNulos };`,
    solution: `function removerNulos(arr: (number | null | undefined)[]): number[] {
  return arr.filter((val): val is number => val != null);
}
module.exports = { removerNulos };`,
    testCases: [
      { input: "[1, null, 2, undefined, 3]", expected: "[1, 2, 3]", description: "Misto" },
      { input: "[null, undefined]", expected: "[]", description: "Tudo sujo" },
      { input: "[42, 0, -1]", expected: "[42, 0, -1]", description: "Limpo (note que 0 fica)" },
      { input: "[]", expected: "[]", description: "Vazio" },
      { input: "[100, null]", expected: "[100]", description: "Um numero e nulo" },
    ],
    hint: "Se você faz um `arr.filter(val => val != null)`, o TS não é inteligente o suficiente para inferir `number[]`. Você precisa forçar com Type Predicate `(val): val is number => val != null`.",
    example: { input: "[1, null, 2]", output: "[1, 2]", explanation: "O Array fica limpo em tipagem e execução" },
  },
  {
    id: "ts-int-hard-3",
    phase: 3,
    level: "Intermediário",
    difficulty: "hard",
    title: "Parameters<T> e ReturnType<T>",
    description: "O TS consegue olhar pra uma Função X e descobrir quais os argumentos dela, e o que ela retorna. Crie uma func que recebe uma função genérica e os mesmos parâmetros dela, executa e retorna o resultado.",
    requirements: [
      "A assinatura será `<T extends (...args: any) => any>(func: T, ...args: Parameters<T>): ReturnType<T>`.",
    ],
    starterCode: `function delegar(func, ...args) {
  // Escreva seu código
}
module.exports = { delegar };`,
    solution: `function delegar<T extends (...args: any) => any>(func: T, ...args: Parameters<T>): ReturnType<T> {
  return func(...args);
}
module.exports = { delegar };`,
    testCases: [
      { input: "((a,b)=>a+b), 10, 20", expected: "30", description: "Soma delegada" },
      { input: "(a=>a*2), 5", expected: "10", description: "Multiplicar" },
      { input: "(()=>'Oi')", expected: "'Oi'", description: "Sem argumentos" },
      { input: "((...arr)=>arr.length), 1, 2, 3", expected: "3", description: "Rest parameters" },
      { input: "((s)=>s.toUpperCase()), 'ts'", expected: "'TS'", description: "Upper delegada" },
    ],
    hint: "Esse padrão é incrivelmente comum para criar HOCs (Higher Order Components) em React, wrappers ou Decorators.",
    example: { input: "((a,b)=>a+b), 10, 20", output: "30", explanation: "O helper extraiu os tipos e garantiu integridade." },
  },
  {
    id: "ts-int-hard-4",
    phase: 4,
    level: "Intermediário",
    difficulty: "hard",
    title: "Classe Genérica (Data Wrapper)",
    description: "O TS permite classes genéricas! Crie uma `class Box<T>` que tem um construtor que aceita valor do tipo `T`, e um método `getValue(): T`. Retorne uma instância nova com um valor numérico usando ela.",
    requirements: [
      "Defina e use a `class Box<T>`.",
    ],
    starterCode: `class Box {
  // Escreva seu código
}
function criarBox(val) {
  return new Box(val).getValue();
}
module.exports = { Box, criarBox };`,
    solution: `class Box<T> {
  constructor(private value: T) {}
  getValue(): T {
    return this.value;
  }
}
function criarBox<T>(val: T): T {
  return new Box(val).getValue();
}
module.exports = { Box, criarBox };`,
    testCases: [
      { input: "100", expected: "100", description: "Número" },
      { input: "'A'", expected: "'A'", description: "String" },
      { input: "true", expected: "true", description: "Booleano" },
      { input: "{x: 1}", expected: "{'x': 1}", description: "Objeto" },
      { input: "[1]", expected: "[1]", description: "Array" },
    ],
    hint: "Use o Atalho do TS `constructor(private value: T) {}` que já declara e atribui a propriedade na Classe no mesmo momento.",
    example: { input: "100", output: "100", explanation: "Wrapper tipado seguro." },
  },
  {
    id: "ts-int-hard-5",
    phase: 5,
    level: "Intermediário",
    difficulty: "hard",
    title: "Indexed Access Types",
    description: "Você pode extrair o tipo direto de uma interface acessando como array! Dado `type Pessoa = { obj: { dados: string[] } }`, escreva uma função genérica ou tipada que receba apenas o array `dados` lendo-o como `Pessoa['obj']['dados']`.",
    requirements: [
      "Tipifique o parametro usando Indexed Access Type.",
    ],
    starterCode: `type Pessoa = { obj: { dados: string[] } };
function lerDados(d) {
  // Escreva seu código (retorne o length do array)
}
module.exports = { lerDados };`,
    solution: `type Pessoa = { obj: { dados: string[] } };
function lerDados(d: Pessoa['obj']['dados']): number {
  return d.length;
}
module.exports = { lerDados };`,
    testCases: [
      { input: "['a', 'b']", expected: "2", description: "Dois itens" },
      { input: "[]", expected: "0", description: "Vazio" },
      { input: "['a', 'b', 'c']", expected: "3", description: "Tres itens" },
      { input: "['x']", expected: "1", description: "Um item" },
      { input: "['', '']", expected: "2", description: "Duas strings vazias" },
    ],
    hint: "Isso é perfeito quando você recebe um tipo complexo grande de uma biblioteca, não há tipo praquele subset exportado, mas você quer acessar um pedacinho dele pro seu estado.",
    example: { input: "['a', 'b']", output: "2", explanation: "Lê a raiz Pessoa['obj']['dados'] -> virou string[]" },
  },
];

// ==========================================
// Avançado (Advanced) - "Type Gymnastics"
// Foco: Operadores Ternários na tipagem, infer, mapped types
// ==========================================

const tsAvancadoEasy: TypescriptChallenge[] = [
  {
    id: "ts-adv-easy-1",
    phase: 1,
    level: "Avançado",
    difficulty: "easy",
    title: "Conditional Types: IsString",
    description: "Tipos Condicionais (Ternários dentro do TypeScript). Defina um Tipo Utilitário `IsString<T>` que retorna o tipo `'yes'` se T for estritamente uma string, e `'no'` se não for.",
    requirements: [
      "Use a sintaxe `T extends string ? 'yes' : 'no'`.",
      "A função usa o tipo para formatar um retorno genérico.",
    ],
    starterCode: `type IsString<T> = any; // Arrume isso

function check(val) {
  // Escreva seu código para retornar "yes" ou "no"
}
module.exports = { check };`,
    solution: `type IsString<T> = T extends string ? 'yes' : 'no';

function check<T>(val: T): IsString<T> {
  // Cast necessário para a união ser contornada na execução real.
  return (typeof val === 'string' ? 'yes' : 'no') as unknown as IsString<T>;
}
module.exports = { check };`,
    testCases: [
      { input: "'Hello'", expected: "'yes'", description: "Literal string" },
      { input: "123", expected: "'no'", description: "Number" },
      { input: "true", expected: "'no'", description: "Boolean" },
      { input: "[]", expected: "'no'", description: "Array" },
      { input: "''", expected: "'yes'", description: "Empty string" },
    ],
    hint: "A tipagem será `T extends string ? 'yes' : 'no'`. E na lógica JavaScript (runtime) o Typescript exige que os retornos usem Cast (`as any`) por que ele não consegue mapear a condicional no bloco.",
    example: { input: "'Hello'", output: "'yes'", explanation: "Passou no extends string condicional" },
  },
  {
    id: "ts-adv-easy-2",
    phase: 2,
    level: "Avançado",
    difficulty: "easy",
    title: "Mapped Types 1: Somente Leitura Custom",
    description: "Ao invés de usar `Readonly<T>`, crie sua própria versão Mapped Type: `MyReadonly<T>`. Itere com `[K in keyof T]` e adicione o modificador `readonly`.",
    requirements: [
      "Você recriará a implementação interna da utilidade nativa.",
    ],
    starterCode: `type MyReadonly<T> = any; // arrume

function bloquear(obj) {
  // retorne o próprio obj (com a tipagem aplicada)
}
module.exports = { bloquear };`,
    solution: `type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

function bloquear<T>(obj: T): MyReadonly<T> {
  return obj;
}
module.exports = { bloquear };`,
    testCases: [
      { input: "{a: 1}", expected: "{'a': 1}", description: "Teste de compilação" },
      { input: "{x: 'o'}", expected: "{'x': 'o'}", description: "Teste str" },
      { input: "{}", expected: "{}", description: "Vazio" },
      { input: "{a:1, b:2}", expected: "{'a': 1, 'b': 2}", description: "Varios" },
      { input: "{z: true}", expected: "{'z': true}", description: "Bool" },
    ],
    hint: "Itere pelas propriedades usando `readonly [K in keyof T]: T[K]`.",
    example: { input: "{a: 1}", output: "{'a': 1}", explanation: "A tipagem impede alterações pós retorno." },
  },
  {
    id: "ts-adv-easy-3",
    phase: 3,
    level: "Avançado",
    difficulty: "easy",
    title: "Infer (Adivinhar Tipos Internos)",
    description: "Use o poderoso `infer` para extrair o tipo interno de uma Promise. Crie um tipo `UnwrapPromise<T>` que pega um `Promise<string>` e descobre que ele era uma `string`.",
    requirements: [
      "Use `T extends Promise<infer U> ? U : T`.",
    ],
    starterCode: `type UnwrapPromise<T> = any; // Mude

async function teste() { return 1; }
module.exports = { teste };`,
    solution: `type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
async function teste(): Promise<UnwrapPromise<Promise<number>>> { return 1; }
module.exports = { teste };`,
    testCases: [
      { input: "", expected: "Function", description: "O teste apenas fará verificação estática. Se compilar, ok." },
      { input: "", expected: "Function", description: "Passo 2" },
      { input: "", expected: "Function", description: "Passo 3" },
      { input: "", expected: "Function", description: "Passo 4" },
      { input: "", expected: "Function", description: "Passo 5" },
    ],
    hint: "O `infer` cria uma variável local dentro da declaração do tipo, adivinhando o que quer que esteja encapsulado.",
    example: { input: "", output: "", explanation: "Isso é pura Gymnastics, só testa compilação." },
  },
  {
    id: "ts-adv-easy-4",
    phase: 4,
    level: "Avançado",
    difficulty: "easy",
    title: "Tuple to Union",
    description: "Transforme uma Tupla em um Union Type (muito famoso na comunidade TS). Tipo `['a', 'b', 'c']` deve virar `'a' | 'b' | 'c'`.",
    requirements: [
      "O tipo mestre é `type TupleToUnion<T extends any[]> = T[number]`.",
    ],
    starterCode: `type TupleToUnion<T extends any[]> = any;
function testeTuplaToUnion(val) {
  // Escreva seu código
}
module.exports = { testeTuplaToUnion };`,
    solution: `type TupleToUnion<T extends any[]> = T[number];
function testeTuplaToUnion(val: TupleToUnion<[1, 2, 3]>): number {
  return val;
}
module.exports = { testeTuplaToUnion };`,
    testCases: [
      { input: "1", expected: "1", description: "Deve compilar com 1" },
      { input: "2", expected: "2", description: "Deve compilar com 2" },
      { input: "3", expected: "3", description: "Deve compilar com 3" },
      { input: "1", expected: "1", description: "Re-teste" },
      { input: "2", expected: "2", description: "Re-teste" },
    ],
    hint: "Acessar `T[number]` em um array no TS devolve uma união de todos os tipos presentes nele. Mágica do TS!",
    example: { input: "1", output: "1", explanation: "TupleToUnion permite apenas 1, 2 ou 3." },
  },
  {
    id: "ts-adv-easy-5",
    phase: 5,
    level: "Avançado",
    difficulty: "easy",
    title: "Omit by Type",
    description: "Crie um mapped type com Key Remapping via `as`. Remova do objeto todas as propriedades que sejam do tipo booleano. Ficarão só números e strings.",
    requirements: [
      "Use `<K in keyof T as T[K] extends boolean ? never : K> : T[K]`.",
    ],
    starterCode: `type OmitBoolean<T> = any;
function expurgarBools(obj) {
  // Implementação JS que tira bools
}
module.exports = { expurgarBools };`,
    solution: `type OmitBoolean<T> = {
  [K in keyof T as T[K] extends boolean ? never : K]: T[K];
};
function expurgarBools(obj: any): any {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => typeof v !== 'boolean'));
}
module.exports = { expurgarBools };`,
    testCases: [
      { input: "{a: 1, b: true, c: 'str'}", expected: "{'a': 1, 'c': 'str'}", description: "Misto" },
      { input: "{a: false, b: true}", expected: "{}", description: "Tudo bool" },
      { input: "{a: 1, b: 2}", expected: "{'a': 1, 'b': 2}", description: "Sem bools" },
      { input: "{}", expected: "{}", description: "Vazio" },
      { input: "{x: 'x', y: true}", expected: "{'x': 'x'}", description: "Limpa true" },
    ],
    hint: "Mapear chaves para `never` (`as ... ? never : K`) faz o Typescript varrer a propriedade para debaixo do tapete.",
    example: { input: "{a: 1, b: true}", output: "{'a': 1}", explanation: "A prop b, que é bool, não compilaria mais, e é removida da execução runtime tbm." },
  },
];

const tsAvancadoMedium: TypescriptChallenge[] = [
  {
    id: "ts-adv-medium-1",
    phase: 1,
    level: "Avançado",
    difficulty: "medium",
    title: "Template Literal Types",
    description: "Template Literals não existem só no JS. O TS permite tipos com template literals. Crie o tipo que concatene dois unions: `type Getter<T> = \`get\${Capitalize<string & keyof T>}\``.",
    requirements: [
      "Use as ferramentas `Capitalize` e `` ` `` de string literal nos tipos.",
    ],
    starterCode: `type User = { name: string; age: number; };
type Getters = any; // Faça virar 'getName' | 'getAge'

function gerarNomeDaFunc(str) {
  // Retorna \`get\${str}\` Capitalizado em runtime.
}
module.exports = { gerarNomeDaFunc };`,
    solution: `type User = { name: string; age: number; };
type Getters = \`get\${Capitalize<string & keyof User>}\`;

function gerarNomeDaFunc(str: string): string {
  return "get" + str.charAt(0).toUpperCase() + str.slice(1);
}
module.exports = { gerarNomeDaFunc };`,
    testCases: [
      { input: "'name'", expected: "'getName'", description: "name -> getName" },
      { input: "'age'", expected: "'getAge'", description: "age -> getAge" },
      { input: "'id'", expected: "'getId'", description: "id -> getId" },
      { input: "'valor'", expected: "'getValor'", description: "valor -> getValor" },
      { input: "'x'", expected: "'getX'", description: "x -> getX" },
    ],
    hint: "No TS: `type X = \`get\${Capitalize<keyof T & string>}\``. Ele cria as uniões mágicamente sozinho. (Runtime vc faz o upper() manual).",
    example: { input: "'name'", output: "'getName'", explanation: "Literal combinou certinho" },
  },
  {
    id: "ts-adv-medium-2",
    phase: 2,
    level: "Avançado",
    difficulty: "medium",
    title: "Deep Readonly (Recursivo)",
    description: "Um Mapped type clássico. Recrie um `DeepReadonly<T>` que aplica imutabilidade recursivamente em todos os objetos filhos.",
    requirements: [
      "Se `T[K]` estender Objeto/Função, aplique `DeepReadonly<T[K]>`, senão, `T[K]`.",
    ],
    starterCode: `type DeepReadonly<T> = any;

function checkDeep() { return true; }
module.exports = { checkDeep };`,
    solution: `type DeepReadonly<T> = {
  readonly [K in keyof T]: keyof T[K] extends never ? T[K] : DeepReadonly<T[K]>;
};
function checkDeep() { return true; }
module.exports = { checkDeep };`,
    testCases: [
      { input: "", expected: "true", description: "Estático 1" },
      { input: "", expected: "true", description: "Estático 2" },
      { input: "", expected: "true", description: "Estático 3" },
      { input: "", expected: "true", description: "Estático 4" },
      { input: "", expected: "true", description: "Estático 5" },
    ],
    hint: "Use recursão na tipagem: `T[K] extends object ? DeepReadonly<T[K]> : T[K]`. Se passar pelo typechecker, o desafio passa.",
    example: { input: "", output: "true", explanation: "Isso é verificado na compilação!" },
  },
  {
    id: "ts-adv-medium-3",
    phase: 3,
    level: "Avançado",
    difficulty: "medium",
    title: "First of Array (Infer Arrays)",
    description: "Mais usos brilhantes de infer! Extraia apenas o PRIMEIRO tipo de um array. Tipo `['a', 'b', 'c']` extrai APENAS `'a'`.",
    requirements: [
      "Use array destructuring na tipagem: `T extends [infer F, ...any[]] ? F : never`.",
    ],
    starterCode: `type First<T extends any[]> = any;

function getFirst(arr) {
  return arr[0];
}
module.exports = { getFirst };`,
    solution: `type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never;
function getFirst<T extends any[]>(arr: T): First<T> {
  return arr[0] as First<T>;
}
module.exports = { getFirst };`,
    testCases: [
      { input: "[10, 20, 30]", expected: "10", description: "Vem 10" },
      { input: "['a', 'b']", expected: "'a'", description: "Vem a" },
      { input: "[true, false]", expected: "true", description: "Boolean" },
      { input: "['xyz']", expected: "'xyz'", description: "Unico" },
      { input: "[null, 2]", expected: "null", description: "Nulo" },
    ],
    hint: "Sabe a desestruturação no JS `const [F, ...rest] = arr`? No TypeScript, fazemos igual para extrair tipos! `[infer F, ...infer Rest]`.",
    example: { input: "[10, 20, 30]", output: "10", explanation: "Estrai e garante tipagem do 10" },
  },
  {
    id: "ts-adv-medium-4",
    phase: 4,
    level: "Avançado",
    difficulty: "medium",
    title: "Exclude nativo (Omit para Unions)",
    description: "Enquanto Omit exclui chaves de Objeto, Exclude tira tipos de uma União. Crie `Exclude<T, U>`, e aplique tirando o 'a' de `'a' | 'b' | 'c'`.",
    requirements: [
      "O TS utilitário é `T extends U ? never : T`.",
    ],
    starterCode: `type MyExclude<T, U> = any;

function limparExclude(val) {
  // Retorna val diretamente
}
module.exports = { limparExclude };`,
    solution: `type MyExclude<T, U> = T extends U ? never : T;

function limparExclude(val: MyExclude<'a'|'b'|'c', 'a'>): string {
  return val;
}
module.exports = { limparExclude };`,
    testCases: [
      { input: "'b'", expected: "'b'", description: "Compila ok - b" },
      { input: "'c'", expected: "'c'", description: "Compila ok - c" },
      { input: "'b'", expected: "'b'", description: "Teste redundante b" },
      { input: "'c'", expected: "'c'", description: "Teste redundante c" },
      { input: "'b'", expected: "'b'", description: "Ultimo b" },
    ],
    hint: "Mapeamento em Typescript distribui. Então `'a' | 'b' extends 'a'` roda pros dois isolados. O `'a'` vira never e some, sobrando só `'b'`.",
    example: { input: "'b'", output: "'b'", explanation: "Exclude perfeito." },
  },
  {
    id: "ts-adv-medium-5",
    phase: 5,
    level: "Avançado",
    difficulty: "medium",
    title: "Awaited nativo (Promise Unwrap Recursivo)",
    description: "E se a promise tiver outra promise dentro? `Promise<Promise<string>>`. O tipo nativo `Awaited<T>` cuida de desembrulhar quantas vezes precisar até o tipo core.",
    requirements: [
      "Use `Awaited<T>` para resolver um parametro e retorne um mock do tipo primitivo.",
    ],
    starterCode: `function resolverMock(val) {
  // Escreva seu código
}
module.exports = { resolverMock };`,
    solution: `function resolverMock<T>(val: T): Awaited<T> {
  // Apenas simulações
  return val as any;
}
module.exports = { resolverMock };`,
    testCases: [
      { input: "123", expected: "123", description: "Estático mock" },
      { input: "1", expected: "1", description: "mock" },
      { input: "2", expected: "2", description: "mock" },
      { input: "3", expected: "3", description: "mock" },
      { input: "4", expected: "4", description: "mock" },
    ],
    hint: "Use `Awaited<T>`.",
    example: { input: "123", output: "123", explanation: "Checagem de tipagem" },
  },
];

const tsAvancadoHard: TypescriptChallenge[] = [
  {
    id: "ts-adv-hard-1",
    phase: 1,
    level: "Avançado",
    difficulty: "hard",
    title: "Concat de Array Genérico",
    description: "Faça uma tipagem avançada que concatena duas Tuplas em uma nova. Ex: `Concat<[1, 2], [3, 4]>` vira `[1, 2, 3, 4]`. E na runtime também.",
    requirements: [
      "A tipagem será `[...T, ...U]`. Espalhamento na tipagem existe!",
    ],
    starterCode: `type Concat<T extends any[], U extends any[]> = any;

function concatenar(a, b) {
  // Escreva seu código
}
module.exports = { concatenar };`,
    solution: `type Concat<T extends any[], U extends any[]> = [...T, ...U];

function concatenar<T extends any[], U extends any[]>(a: T, b: U): Concat<T, U> {
  return [...a, ...b] as Concat<T, U>;
}
module.exports = { concatenar };`,
    testCases: [
      { input: "[1, 2], [3, 4]", expected: "[1, 2, 3, 4]", description: "Juntar arrays" },
      { input: "[], []", expected: "[]", description: "Vazios" },
      { input: "['a'], ['b']", expected: "['a', 'b']", description: "Strings" },
      { input: "[1], []", expected: "[1]", description: "Um vazio" },
      { input: "[true], [false]", expected: "[true, false]", description: "Bools" },
    ],
    hint: "No TS é perfeitamente válido escrever: `type MeuTipo = [...T, ...U]`.",
    example: { input: "[1, 2], [3, 4]", output: "[1, 2, 3, 4]", explanation: "Unificado em tipagem e memoria." },
  },
  {
    id: "ts-adv-hard-2",
    phase: 2,
    level: "Avançado",
    difficulty: "hard",
    title: "String to Union (Mestre dos infer)",
    description: "Nível Master. Dobre o infer, pegue a primeira letra e o Resto. Recursividade no nível dos Tipos. Extraia os caracteres de `'abc'` para `'a' | 'b' | 'c'`.",
    requirements: [
      "Tipagem `type StringToUnion<T extends string> = T extends \`\${infer F}\${infer R}\` ? F | StringToUnion<R> : never;`",
      "O JS vai simplesmente splitar a string e retornar em Array (ou Set). Devolva as letras em array unico para fins de mock.",
    ],
    starterCode: `type StringToUnion<T extends string> = any;

function letras(str) {
  // Separe a string em array unico (splited chars)
}
module.exports = { letras };`,
    solution: `type StringToUnion<T extends string> = T extends \`\${infer F}\${infer R}\` ? F | StringToUnion<R> : never;

function letras(str: string): string[] {
  return Array.from(new Set(str.split('')));
}
module.exports = { letras };`,
    testCases: [
      { input: "'abc'", expected: "['a', 'b', 'c']", description: "Tres letras" },
      { input: "'aaa'", expected: "['a']", description: "Unico" },
      { input: "''", expected: "[]", description: "Vazia" },
      { input: "'z'", expected: "['z']", description: "Um char" },
      { input: "'hello'", expected: "['h', 'e', 'l', 'o']", description: "Com repetição hello" },
    ],
    hint: "Recursividade de Tipos `T extends \`\${infer L}\${infer R}\`` faz o TS quebrar String em pedaços e agir como loop.",
    example: { input: "'abc'", output: "['a', 'b', 'c']", explanation: "Separação em char" },
  },
  {
    id: "ts-adv-hard-3",
    phase: 3,
    level: "Avançado",
    difficulty: "hard",
    title: "AnyOf (Checar Truthy em Tipagem)",
    description: "Crie um utilitário que recebe um Array e se QUALQUER elemento for truthy (não nulo/vazio), resulta true. Esse desafio fará uma checagem em runtime simples `arr.some(...)`.",
    requirements: [
      "Use array.some(Boolean) em JS para retornar true ou false.",
    ],
    starterCode: `function checkAnyOf(arr) {
  // Escreva seu código
}
module.exports = { checkAnyOf };`,
    solution: `function checkAnyOf(arr: any[]): boolean {
  return arr.some(Boolean);
}
module.exports = { checkAnyOf };`,
    testCases: [
      { input: "[0, '', false]", expected: "false", description: "Tudo falsy" },
      { input: "[1, '', false]", expected: "true", description: "Um truthy (1)" },
      { input: "['ola', null]", expected: "true", description: "String truthy" },
      { input: "[]", expected: "false", description: "Vazio (nenhum truthy)" },
      { input: "[true]", expected: "true", description: "Verdade absoluto" },
    ],
    hint: "`arr.some(Boolean)` resolve iterando itens que passam nas conversões lógicas para verdadeiro.",
    example: { input: "[0, '', false]", output: "false", explanation: "Todos reprovam nas conversões boleanas" },
  },
  {
    id: "ts-adv-hard-4",
    phase: 4,
    level: "Avançado",
    difficulty: "hard",
    title: "Required By Keys",
    description: "Tornando Mapped Types complexos. Um objeto tem tudo opcional. O seu tipo `RequiredByKeys<T, K>` força apenas chaves específicas de K a ficarem requeridas (`-?`), e mantém o resto como estava. Mestre do TS!",
    requirements: [
      "Combine Intersection, Mapped Types, `-?` (remover opcionalidade) e Omit/Pick.",
    ],
    starterCode: `type RequiredByKeys<T, K extends keyof T = keyof T> = any; // Arrumar

function req(obj) { return obj; }
module.exports = { req };`,
    solution: `type RequiredByKeys<T, K extends keyof T = keyof T> = Omit<T, K> & {
  [P in K]-?: T[P];
};
function req(obj: any) { return obj; }
module.exports = { req };`,
    testCases: [
      { input: "1", expected: "1", description: "Ok" },
      { input: "2", expected: "2", description: "Ok" },
      { input: "3", expected: "3", description: "Ok" },
      { input: "4", expected: "4", description: "Ok" },
      { input: "5", expected: "5", description: "Ok" },
    ],
    hint: "`[P in K]-?: T[P]` com o `-?` diz pro Typescript arrancar as interrogações e deixar a propriedade estritamente necessária.",
    example: { input: "1", output: "1", explanation: "O compilador validará o Pick complexo" },
  },
  {
    id: "ts-adv-hard-5",
    phase: 5,
    level: "Avançado",
    difficulty: "hard",
    title: "Currying com Tipos (Fn Mágica)",
    description: "Você fez os 44 desafios, agora o mestre final! Crie a tipagem (e mock runtime) para `Currying`. Uma função que recebe múltiplos argumentos tipo `(a, b, c)` e a quebra devolvendo funções `(a) => (b) => (c)` em cadeia fortemente tipada.",
    requirements: [
      "Escreva a tipagem dinâmica para CurriedFunction e uma func que retorna a soma cascateada das variáveis.",
    ],
    starterCode: `function curryMock(a) {
  // devolva funcs para a, b, c qdo o TS bater os 3 parametros! (só para 3 níveis)
}
module.exports = { curryMock };`,
    solution: `function curryMock(a: number) {
  return function(b: number) {
    return function(c: number) {
      return a + b + c;
    }
  }
}
module.exports = { curryMock };`,
    testCases: [
      { input: "1)(2)(3", expected: "6", description: "1+2+3" },
      { input: "10)(10)(10", expected: "30", description: "10x3" },
      { input: "0)(0)(0", expected: "0", description: "Zeros" },
      { input: "5)(-5)(0", expected: "0", description: "Negativo" },
      { input: "100)(200)(300", expected: "600", description: "Grande" },
    ],
    hint: "Currying consiste em devolver uma função dentro da outra sucessivamente, encapsulando os tipos.",
    example: { input: "1)(2)(3", output: "6", explanation: "Resolve as closures" },
  },
];

export const allTypescriptChallenges: TypescriptChallenge[] = [
  ...tsInicianteEasy,
  ...tsInicianteMedium,
  ...tsInicianteHard,
  ...tsIntermediarioEasy,
  ...tsIntermediarioMedium,
  ...tsIntermediarioHard,
  ...tsAvancadoEasy,
  ...tsAvancadoMedium,
  ...tsAvancadoHard,
];

export function getTypescriptPhases(level: Level, difficulty: Difficulty): TypescriptChallenge[] {
  return allTypescriptChallenges.filter((c) => c.level === level && c.difficulty === difficulty);
}

export function getTypescriptChallenge(id: string): TypescriptChallenge | undefined {
  return allTypescriptChallenges.find((c) => c.id === id);
}
