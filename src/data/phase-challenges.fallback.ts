import type { Difficulty, Level, Technology } from "@/types";

export interface FallbackPhaseChallenge {
  id: string;
  phase: number;
  level: Level;
  difficulty: Difficulty;
  title: string;
  description: string;
  requirements: string[];
  starterCode: string;
  testCases: Array<{ input: string; expected: string; description: string }>;
  hint: string;
  example: { input: string; output: string; explanation: string };
}

export const FALLBACK_PHASES: Record<string, FallbackPhaseChallenge[]> = {
  // TypeScript
  TypeScript: [
    {
      id: "ts-fallback-1",
      phase: 1,
      level: "Intermediário",
      difficulty: "medium",
      title: "Tipagem de Interfaces e Readonly",
      description: "Crie uma interface `Usuario` com id (number, readonly), nome (string) e email (string opcional). Implemente uma função `formatarUsuario` que retorna o formato 'id: nome'.",
      requirements: [
        "Defina a interface `Usuario` com campos apropriados.",
        "A função `formatarUsuario` deve receber um `Usuario` e retornar a string formatada.",
      ],
      starterCode: `interface Usuario {\n  // defina os campos\n}\n\nexport function formatarUsuario(u: Usuario): string {\n  // sua solução aqui\n  return "";\n}\n`,
      testCases: [
        { input: "{ id: 1, nome: 'Ana' }", expected: "1: Ana", description: "Formata usuário comum" },
        { input: "{ id: 42, nome: 'Carlos', email: 'c@geo.dev' }", expected: "42: Carlos", description: "Formata usuário com e-mail" },
      ],
      hint: "Use `readonly id: number` dentro da interface e interpolação de strings `${u.id}: ${u.nome}`.",
      example: { input: "{ id: 1, nome: 'Ana' }", output: "1: Ana", explanation: "Concatena id e nome com ':'" },
    },
    {
      id: "ts-fallback-2",
      phase: 2,
      level: "Intermediário",
      difficulty: "medium",
      title: "Generics Básicos",
      description: "Crie uma função genérica `primeiroElemento<T>(lista: T[]): T | undefined` que retorna o primeiro item de uma lista ou `undefined` se vazia.",
      requirements: [
        "Use o operador de tipo genérico `<T>`.",
        "Retorne `undefined` para listas vazias de forma segura.",
      ],
      starterCode: `export function primeiroElemento<T>(lista: T[]): T | undefined {\n  // sua solução aqui\n  return undefined;\n}\n`,
      testCases: [
        { input: "[10, 20, 30]", expected: "10", description: "Primeiro elemento numérico" },
        { input: "['ts', 'js']", expected: "'ts'", description: "Primeiro elemento string" },
        { input: "[]", expected: "undefined", description: "Lista vazia" },
      ],
      hint: "Basta acessar `lista[0]`. O TypeScript infere o retorno como `T | undefined`.",
      example: { input: "[1, 2, 3]", output: "1", explanation: "Retorna o item no índice 0" },
    },
    {
      id: "ts-fallback-3",
      phase: 3,
      level: "Intermediário",
      difficulty: "medium",
      title: "Utility Types: Pick e Omit",
      description: "Crie uma função `obterResumo` que recebe um objeto com muitas propriedades mas tipa o argumento estritamente com `Pick` para aceitar apenas `{ id: number; titulo: string }`.",
      requirements: [
        "Use `Pick` para enxugar as propriedades necessárias.",
        "Retorne a string no formato '[id] titulo'.",
      ],
      starterCode: `type ArtigoCompleto = { id: number; titulo: string; conteudo: string; autor: string };\n\nexport function obterResumo(artigo: Pick<ArtigoCompleto, 'id' | 'titulo'>): string {\n  // sua solução aqui\n  return "";\n}\n`,
      testCases: [
        { input: "{ id: 1, titulo: 'Guia TS' }", expected: "'[1] Guia TS'", description: "Artigo formatado" },
      ],
      hint: "Use template string `[${artigo.id}] ${artigo.titulo}`.",
      example: { input: "{ id: 1, titulo: 'Guia TS' }", output: "[1] Guia TS", explanation: "Combina id e título" },
    },
    {
      id: "ts-fallback-4",
      phase: 4,
      level: "Intermediário",
      difficulty: "medium",
      title: "Narrowing com Type Guards",
      description: "Implemente a função `processarValor(val: string | number): number` que dobra o valor se for número ou retorna o tamanho do texto (length) se for string.",
      requirements: [
        "Use `typeof val === 'number'` para fazer o type narrowing.",
        "Retorne o dobro para números e o tamanho (length) para strings.",
      ],
      starterCode: `export function processarValor(val: string | number): number {\n  // sua solução aqui\n  return 0;\n}\n`,
      testCases: [
        { input: "15", expected: "30", description: "Dobra número" },
        { input: "'GeoExplorer'", expected: "11", description: "Tamanho da string" },
      ],
      hint: "Com `if (typeof val === 'number') return val * 2;`, no `else` o TypeScript sabe que `val` é string.",
      example: { input: "5", output: "10", explanation: "5 * 2 = 10" },
    },
    {
      id: "ts-fallback-5",
      phase: 5,
      level: "Intermediário",
      difficulty: "medium",
      title: "Record e Mapeamento de Tipos",
      description: "Implemente `calcularTotal(precos: Record<string, number>): number` que recebe um mapa de produtos e seus preços e retorna a soma de todos os valores.",
      requirements: [
        "O parâmetro deve ser tipado como `Record<string, number>`.",
        "Retorne zero para registros vazios.",
      ],
      starterCode: `export function calcularTotal(precos: Record<string, number>): number {\n  // sua solução aqui\n  return 0;\n}\n`,
      testCases: [
        { input: "{ lapis: 2, caderno: 15, borracha: 3 }", expected: "20", description: "Soma de valores" },
        { input: "{}", expected: "0", description: "Registro vazio" },
      ],
      hint: "Use `Object.values(precos).reduce((acc, curr) => acc + curr, 0)`.",
      example: { input: "{ a: 10, b: 20 }", output: "30", explanation: "10 + 20 = 30" },
    },
  ],

  // JavaScript
  JavaScript: [
    {
      id: "js-fallback-1",
      phase: 1,
      level: "Intermediário",
      difficulty: "medium",
      title: "Desestruturação e Parâmetros Rest",
      description: "Crie uma função `somarExcetoPrimeiro(primeiro, ...resto)` que ignora o primeiro parâmetro e retorna a soma de todos os outros valores recebidos.",
      requirements: [
        "Utilize o operador rest `...resto`.",
        "Retorne a soma de todos os elementos em `resto`.",
      ],
      starterCode: `function somarExcetoPrimeiro(primeiro, ...resto) {\n  // sua solução aqui\n  return 0;\n}\nmodule.exports = { somarExcetoPrimeiro };\n`,
      testCases: [
        { input: "10, 1, 2, 3", expected: "6", description: "Ignora 10 e soma 1+2+3" },
        { input: "99", expected: "0", description: "Apenas um parâmetro" },
      ],
      hint: "O `resto` é um array com todos os argumentos após `primeiro`.",
      example: { input: "10, 5, 5", output: "10", explanation: "5 + 5 = 10" },
    },
    {
      id: "js-fallback-2",
      phase: 2,
      level: "Intermediário",
      difficulty: "medium",
      title: "Métodos de Array: Filter e Map",
      description: "Dada uma lista de números, crie `filtrarDobrarPares(numeros)` que filtra apenas os pares e retorna cada um multiplicado por 2.",
      requirements: [
        "Apenas números pares (`n % 2 === 0`) devem ser considerados.",
        "Cada número par deve ser multiplicado por 2.",
      ],
      starterCode: `function filtrarDobrarPares(numeros) {\n  // sua solução aqui\n  return [];\n}\nmodule.exports = { filtrarDobrarPares };\n`,
      testCases: [
        { input: "[1, 2, 3, 4, 5, 6]", expected: "[4, 8, 12]", description: "Dobro dos pares" },
      ],
      hint: "Encadeie `.filter(n => n % 2 === 0).map(n => n * 2)`.",
      example: { input: "[2, 3]", output: "[4]", explanation: "2 é par -> 4" },
    },
    {
      id: "js-fallback-3",
      phase: 3,
      level: "Intermediário",
      difficulty: "medium",
      title: "Manipulação de Objetos e Redução",
      description: "Crie uma função `agruparPorTipo(itens)` que recebe um array de objetos `{ nome, tipo }` e retorna um objeto onde cada chave é um tipo com a lista de nomes correspondentes.",
      requirements: [
        "Retorne um objeto com arrays agrupados por tipo.",
      ],
      starterCode: `function agruparPorTipo(itens) {\n  // sua solução aqui\n  return {};\n}\nmodule.exports = { agruparPorTipo };\n`,
      testCases: [
        { input: "[{ nome: 'Maçã', tipo: 'fruta' }, { nome: 'Alface', tipo: 'verdura' }, { nome: 'Banana', tipo: 'fruta' }]", expected: "{ fruta: ['Maçã', 'Banana'], verdura: ['Alface'] }", description: "Agrupa por tipo" },
      ],
      hint: "Use `.reduce((acc, item) => { acc[item.tipo] = acc[item.tipo] || []; acc[item.tipo].push(item.nome); return acc; }, {})`.",
      example: { input: "[{ nome: 'A', tipo: 'X' }]", output: "{ X: ['A'] }", explanation: "Agrupa na chave X" },
    },
    {
      id: "js-fallback-4",
      phase: 4,
      level: "Intermediário",
      difficulty: "medium",
      title: "Funções Assíncronas e Promises",
      description: "Crie uma função `executarEmParalelo(funcoes)` que recebe um array de funções assíncronas e retorna uma Promise com todos os resultados usando `Promise.all`.",
      requirements: [
        "Execute todas as funções fornecidas e aguarde o resultado.",
      ],
      starterCode: `async function executarEmParalelo(funcoes) {\n  // sua solução aqui\n  return [];\n}\nmodule.exports = { executarEmParalelo };\n`,
      testCases: [
        { input: "[() => Promise.resolve(1), () => Promise.resolve(2)]", expected: "[1, 2]", description: "Resolve promessas" },
      ],
      hint: "Execute `funcoes.map(fn => fn())` e passe para `Promise.all()`.",
      example: { input: "[() => 1]", output: "[1]", explanation: "Resolve todas as funções" },
    },
    {
      id: "js-fallback-5",
      phase: 5,
      level: "Intermediário",
      difficulty: "medium",
      title: "Closures e Fábrica de Funções",
      description: "Crie uma função `criarContador(valorInicial = 0)` que retorna um objeto com métodos `incrementar()`, `decrementar()` e `valor()`.",
      requirements: [
        "Mantenha o estado privado encapsulado na closure.",
      ],
      starterCode: `function criarContador(valorInicial = 0) {\n  // sua solução aqui\n}\nmodule.exports = { criarContador };\n`,
      testCases: [
        { input: "5", expected: "{ valor: 5 }", description: "Contador inicializado em 5" },
      ],
      hint: "Defina uma variável local `let count = valorInicial` e retorne as funções que a modificam.",
      example: { input: "0", output: "0", explanation: "Inicia em zero" },
    },
  ],

  // Python
  Python: [
    {
      id: "py-fallback-1",
      phase: 1,
      level: "Intermediário",
      difficulty: "medium",
      title: "List Comprehensions com Condição",
      description: "Implemente `filtrar_quadrados(numeros)` que recebe uma lista de inteiros e devolve o quadrado apenas dos números positivos.",
      requirements: [
        "Utilize list comprehension com cláusula `if n > 0`.",
        "Calcule `n ** 2` para cada número positivo.",
      ],
      starterCode: `def filtrar_quadrados(numeros):\n    # sua solução aqui\n    return []\n`,
      testCases: [
        { input: "[-2, -1, 0, 1, 2, 3]", expected: "[1, 4, 9]", description: "Quadrados de positivos" },
      ],
      hint: "Sintaxe: `[n ** 2 for n in numeros if n > 0]`.",
      example: { input: "[2, -3]", output: "[4]", explanation: "2 ** 2 = 4" },
    },
    {
      id: "py-fallback-2",
      phase: 2,
      level: "Intermediário",
      difficulty: "medium",
      title: "Dicionários e Chaves Padrão",
      description: "Implemente `contar_frequencia(palavras)` que retorna um dicionário com a quantidade de ocorrências de cada palavra na lista.",
      requirements: [
        "Retorne um dict `{ palavra: contagem }`.",
      ],
      starterCode: `def contar_frequencia(palavras):\n    # sua solução aqui\n    return {}\n`,
      testCases: [
        { input: "['a', 'b', 'a', 'c', 'b', 'a']", expected: "{'a': 3, 'b': 2, 'c': 1}", description: "Contagem de frequências" },
      ],
      hint: "Você pode iterar ou usar `from collections import Counter`.",
      example: { input: "['x', 'x']", output: "{'x': 2}", explanation: "Aparece 2 vezes" },
    },
    {
      id: "py-fallback-3",
      phase: 3,
      level: "Intermediário",
      difficulty: "medium",
      title: "Geradores e Yield",
      description: "Crie uma função geradora `gerar_fibonacci(n)` que gera os primeiros `n` termos da sequência de Fibonacci usando `yield`.",
      requirements: [
        "Utilize `yield` para produzir os valores um a um.",
      ],
      starterCode: `def gerar_fibonacci(n):\n    # sua solução aqui\n    pass\n`,
      testCases: [
        { input: "5", expected: "[0, 1, 1, 2, 3]", description: "Primeiros 5 termos" },
      ],
      hint: "Inicie `a, b = 0, 1` e a cada iteração execute `yield a; a, b = b, a + b`.",
      example: { input: "3", output: "[0, 1, 1]", explanation: "0, 1, 1" },
    },
    {
      id: "py-fallback-4",
      phase: 4,
      level: "Intermediário",
      difficulty: "medium",
      title: "Manipulação de Strings e Regex",
      description: "Implemente `limpar_telefone(telefone)` que remove quaisquer caracteres não numéricos e retorna apenas os dígitos.",
      requirements: [
        "Retorne apenas os caracteres de '0' a '9'.",
      ],
      starterCode: `def limpar_telefone(telefone):\n    # sua solução aqui\n    return ""\n`,
      testCases: [
        { input: "'(11) 98765-4321'", expected: "'11987654321'", description: "Extrai apenas dígitos" },
      ],
      hint: "Use `''.join([c for c in telefone if c.isdigit()])`.",
      example: { input: "'12-34'", output: "'1234'", explanation: "Remove hífen" },
    },
    {
      id: "py-fallback-5",
      phase: 5,
      level: "Intermediário",
      difficulty: "medium",
      title: "Decoradores em Python",
      description: "Crie um decorador `repetir_duas_vezes` que faz a função decorada ser executada duas vezes quando chamada e retorna o resultado da última chamada.",
      requirements: [
        "Defina uma função interna `wrapper(*args, **kwargs)`.",
      ],
      starterCode: `def repetir_duas_vezes(func):\n    def wrapper(*args, **kwargs):\n        # sua solução aqui\n        pass\n    return wrapper\n`,
      testCases: [
        { input: "func", expected: "True", description: "Executa duas vezes" },
      ],
      hint: "No wrapper, chame `func(*args, **kwargs)` e depois retorne `func(*args, **kwargs)`.",
      example: { input: "fn", output: "ok", explanation: "Chama 2 vezes" },
    },
  ],
};

export function getFallbackPhases(
  technology: Technology,
  level: Level,
  difficulty: Difficulty,
): FallbackPhaseChallenge[] {
  const list = FALLBACK_PHASES[technology] || FALLBACK_PHASES["TypeScript"] || [];
  return list.map((item, index) => ({
    ...item,
    phase: index + 1,
    level,
    difficulty,
  }));
}
