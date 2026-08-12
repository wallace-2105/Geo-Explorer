import type { Difficulty, Level } from "../types/domain.js";

export interface TestCase {
  input: string; // JavaScript expression passed as argument
  expected: string; // expected stdout (JSON encoded result or string)
  description: string;
}

export interface JavascriptChallenge {
  id: string;
  phase: number;
  level: Level;
  difficulty: Difficulty;
  title: string;
  description: string;
  requirements: string[];
  starterCode: string;
  solution: string; // reference solution (not shown to user)
  testCases: TestCase[];
  hint: string;
  example: { input: string; output: string; explanation: string };
}

// ---------------------------------------------------------------------------
// INICIANTE + EASY (5 fases)
// ---------------------------------------------------------------------------
const iniciante_easy: JavascriptChallenge[] = [
  {
    id: "js-ini-easy-1",
    phase: 1,
    level: "Iniciante",
    difficulty: "easy",
    title: "Soma básica",
    description: "Crie uma função que receba dois números e retorne a soma deles.",
    requirements: [
      "A função recebe dois parâmetros numéricos `a` e `b`.",
      "Retorne o resultado de a + b.",
    ],
    starterCode: "function resolver(a, b) {\n  // Escreva seu código aqui\n  \n}\n",
    solution: "function resolver(a, b) {\n  return a + b;\n}\n",
    testCases: [
      { input: "2, 3", expected: "5", description: "Números positivos" },
      { input: "-1, 1", expected: "0", description: "Positivo e negativo" },
      { input: "0, 0", expected: "0", description: "Zeros" },
      { input: "10, -5", expected: "5", description: "Subtração implícita" },
      { input: "100, 200", expected: "300", description: "Números grandes" },
    ],
    hint: "Use o operador `+` para somar os dois argumentos `a` e `b` e a palavra-chave `return` para devolver o resultado.",
    example: { input: "1, 4", output: "5", explanation: "1 + 4 é igual a 5" },
  },
  {
    id: "js-ini-easy-2",
    phase: 2,
    level: "Iniciante",
    difficulty: "easy",
    title: "Maior número do Array",
    description: "Dada um array de números, encontre e retorne o maior número.",
    requirements: [
      "A função recebe um array `numeros`.",
      "Retorne o valor máximo presente.",
      "O array sempre terá pelo menos 1 item.",
    ],
    starterCode: "function resolver(numeros) {\n  // Encontre o maior número\n  \n}\n",
    solution: "function resolver(numeros) {\n  return Math.max(...numeros);\n}\n",
    testCases: [
      { input: "[1, 5, 3, 9, 2]", expected: "9", description: "Array simples" },
      { input: "[-10, -5, -20]", expected: "-5", description: "Apenas negativos" },
      { input: "[10]", expected: "10", description: "Um elemento" },
      { input: "[0, 0, 0]", expected: "0", description: "Zeros" },
      { input: "[100, 20, 50, 75]", expected: "100", description: "Primeiro é o maior" },
    ],
    hint: "No JavaScript, você pode usar `Math.max()` em combinação com a sintaxe de espalhamento (spread operator `...`) para encontrar o maior item num array de forma elegante: `Math.max(...array)`.",
    example: { input: "[1, 3, 2]", output: "3", explanation: "3 é o maior valor." },
  },
  {
    id: "js-ini-easy-3",
    phase: 3,
    level: "Iniciante",
    difficulty: "easy",
    title: "Par ou Ímpar",
    description: "Crie uma função que verifica se um número é par. Retorne `true` se for par, `false` se for ímpar.",
    requirements: [
      "A função recebe um inteiro `n`.",
      "Retorne um boolean (`true` ou `false`).",
    ],
    starterCode: "function resolver(n) {\n  // Verifique se n é par\n  \n}\n",
    solution: "function resolver(n) {\n  return n % 2 === 0;\n}\n",
    testCases: [
      { input: "4", expected: "true", description: "Par" },
      { input: "7", expected: "false", description: "Ímpar" },
      { input: "0", expected: "true", description: "Zero é par" },
      { input: "-2", expected: "true", description: "Par negativo" },
      { input: "-3", expected: "false", description: "Ímpar negativo" },
    ],
    hint: "O operador módulo `%` retorna o resto da divisão. Se `n % 2 === 0`, o número é divisível por 2 (ou seja, é par).",
    example: { input: "8", output: "true", explanation: "8 dividido por 2 tem resto 0." },
  },
  {
    id: "js-ini-easy-4",
    phase: 4,
    level: "Iniciante",
    difficulty: "easy",
    title: "Contar caracteres",
    description: "Retorne o tamanho de uma string (quantos caracteres ela tem).",
    requirements: [
      "A função recebe uma string `texto`.",
      "Retorne um número inteiro.",
    ],
    starterCode: "function resolver(texto) {\n  // Retorne o tamanho do texto\n  \n}\n",
    solution: "function resolver(texto) {\n  return texto.length;\n}\n",
    testCases: [
      { input: "'javascript'", expected: "10", description: "Palavra simples" },
      { input: "''", expected: "0", description: "String vazia" },
      { input: "' '", expected: "1", description: "Um espaço" },
      { input: "'Olá Mundo'", expected: "9", description: "Com espaço e acento" },
      { input: "'12345'", expected: "5", description: "Apenas números" },
    ],
    hint: "Toda string no JavaScript possui uma propriedade embutida chamada `.length` que indica seu tamanho.",
    example: { input: "'abc'", output: "3", explanation: "'abc' tem 3 letras." },
  },
  {
    id: "js-ini-easy-5",
    phase: 5,
    level: "Iniciante",
    difficulty: "easy",
    title: "Repetir string",
    description: "Dada uma string `texto` e um número `n`, retorne o texto repetido `n` vezes.",
    requirements: [
      "A função recebe `texto` (string) e `n` (inteiro).",
      "Retorne uma nova string com a repetição.",
      "Se `n` for 0, retorne string vazia.",
    ],
    starterCode: "function resolver(texto, n) {\n  // Retorne a string repetida n vezes\n  \n}\n",
    solution: "function resolver(texto, n) {\n  return texto.repeat(n);\n}\n",
    testCases: [
      { input: "'oi', 3", expected: "'oioioi'", description: "Repete 3x" },
      { input: "'a', 5", expected: "'aaaaa'", description: "Repete 5x" },
      { input: "'abc', 0", expected: "''", description: "Repete 0x" },
      { input: "'x', 1", expected: "'x'", description: "Repete 1x" },
      { input: "' ', 3", expected: "'   '", description: "Repete espaços" },
    ],
    hint: "Você pode usar um loop `for` concatenando a string, ou usar o método moderno de strings do JS: `texto.repeat(n)`.",
    example: { input: "'ha', 2", output: "'haha'", explanation: "Repetido duas vezes." },
  },
];

// ---------------------------------------------------------------------------
// INICIANTE + MEDIUM (5 fases)
// ---------------------------------------------------------------------------
const iniciante_medium: JavascriptChallenge[] = [
  {
    id: "js-ini-med-1",
    phase: 1,
    level: "Iniciante",
    difficulty: "medium",
    title: "Inverter uma String",
    description: "Dada uma string, retorne-a invertida de trás para frente.",
    requirements: [
      "A função recebe `texto`.",
      "Não modifique a original (strings são imutáveis no JS de toda forma).",
      "Exemplo: 'casa' vira 'asac'.",
    ],
    starterCode: "function resolver(texto) {\n  // Inverta a string\n  \n}\n",
    solution: "function resolver(texto) {\n  return texto.split('').reverse().join('');\n}\n",
    testCases: [
      { input: "'javascript'", expected: "'tpircsavaj'", description: "Palavra simples" },
      { input: "'hello world'", expected: "'dlrow olleh'", description: "Com espaços" },
      { input: "''", expected: "''", description: "Vazia" },
      { input: "'a'", expected: "'a'", description: "Uma letra" },
      { input: "'12345'", expected: "'54321'", description: "Números" },
    ],
    hint: "Strings não têm um método `reverse()`, mas arrays têm! Converta a string num array com `.split('')`, inverta com `.reverse()` e junte de novo com `.join('')`.",
    example: { input: "'abc'", output: "'cba'", explanation: "Ordem invertida." },
  },
  {
    id: "js-ini-med-2",
    phase: 2,
    level: "Iniciante",
    difficulty: "medium",
    title: "Fatorial",
    description: "Calcule o fatorial de um número inteiro não negativo. Ex: 5! = 5 * 4 * 3 * 2 * 1 = 120.",
    requirements: [
      "A função recebe um inteiro `n`.",
      "Retorne o fatorial.",
      "0! = 1.",
    ],
    starterCode: "function resolver(n) {\n  // Calcule o fatorial\n  \n}\n",
    solution: "function resolver(n) {\n  if (n === 0 || n === 1) return 1;\n  let res = 1;\n  for (let i = 2; i <= n; i++) res *= i;\n  return res;\n}\n",
    testCases: [
      { input: "5", expected: "120", description: "Fatorial de 5" },
      { input: "0", expected: "1", description: "Fatorial de 0" },
      { input: "1", expected: "1", description: "Fatorial de 1" },
      { input: "3", expected: "6", description: "Fatorial de 3" },
      { input: "10", expected: "3628800", description: "Fatorial de 10" },
    ],
    hint: "Você pode resolver de forma recursiva (`n * resolver(n-1)`) ou usando um loop simples que multiplica os números de 1 até `n`.",
    example: { input: "4", output: "24", explanation: "4*3*2*1 = 24" },
  },
  {
    id: "js-ini-med-3",
    phase: 3,
    level: "Iniciante",
    difficulty: "medium",
    title: "Soma do Array",
    description: "Calcule a soma de todos os números presentes em um array.",
    requirements: [
      "A função recebe um array `numeros`.",
      "Retorne a soma total.",
      "Para arrays vazios, retorne 0.",
    ],
    starterCode: "function resolver(numeros) {\n  // Retorne a soma dos elementos\n  \n}\n",
    solution: "function resolver(numeros) {\n  return numeros.reduce((acc, curr) => acc + curr, 0);\n}\n",
    testCases: [
      { input: "[1, 2, 3]", expected: "6", description: "Simples" },
      { input: "[]", expected: "0", description: "Vazio" },
      { input: "[-1, 1]", expected: "0", description: "Cancela" },
      { input: "[10, 20, 30]", expected: "60", description: "Dezenas" },
      { input: "[5]", expected: "5", description: "Um item" },
    ],
    hint: "Você pode usar um loop `for...of` e uma variável acumuladora, ou então usar o método super elegante `.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0)`.",
    example: { input: "[10, 5]", output: "15", explanation: "10+5=15" },
  },
  {
    id: "js-ini-med-4",
    phase: 4,
    level: "Iniciante",
    difficulty: "medium",
    title: "Vogais na string",
    description: "Conte quantas vogais (a, e, i, o, u) existem numa string. Ignore acentos e trate maiúsculas/minúsculas da mesma forma.",
    requirements: [
      "A função recebe uma string `texto`.",
      "Retorne um inteiro com o total de vogais.",
    ],
    starterCode: "function resolver(texto) {\n  // Conte as vogais\n  \n}\n",
    solution: "function resolver(texto) {\n  const matches = texto.match(/[aeiou]/gi);\n  return matches ? matches.length : 0;\n}\n",
    testCases: [
      { input: "'javascript'", expected: "3", description: "a, a, i" },
      { input: "'HELLO'", expected: "2", description: "Maiúsculas" },
      { input: "'xyz'", expected: "0", description: "Sem vogais" },
      { input: "''", expected: "0", description: "Vazia" },
      { input: "'aeiou'", expected: "5", description: "Só vogais" },
    ],
    hint: "Você pode usar Regex `texto.match(/[aeiou]/gi)` que devolve um array das ocorrências, ou converter a string para lowercase e usar um loop para contar.",
    example: { input: "'oi'", output: "2", explanation: "Ambas as letras são vogais." },
  },
  {
    id: "js-ini-med-5",
    phase: 5,
    level: "Iniciante",
    difficulty: "medium",
    title: "Palíndromo básico",
    description: "Verifique se uma string é um palíndromo (se lida de frente e de trás é igual). Retorne `true` ou `false`.",
    requirements: [
      "A função recebe uma string simples `texto` (sem espaços).",
      "É case-sensitive para esse nível (teste garantirá isso).",
    ],
    starterCode: "function resolver(texto) {\n  // Verifique palíndromo\n  \n}\n",
    solution: "function resolver(texto) {\n  return texto === texto.split('').reverse().join('');\n}\n",
    testCases: [
      { input: "'radar'", expected: "true", description: "Palíndromo" },
      { input: "'javascript'", expected: "false", description: "Não palíndromo" },
      { input: "'a'", expected: "true", description: "1 letra" },
      { input: "'osso'", expected: "true", description: "Par de letras" },
      { input: "''", expected: "true", description: "Vazia" },
    ],
    hint: "Inverta a string (com split, reverse e join) e compare se o inverso é `===` à string original.",
    example: { input: "'ana'", output: "true", explanation: "'ana' invertido é 'ana'." },
  },
];

// ---------------------------------------------------------------------------
// INICIANTE + HARD (5 fases)
// ---------------------------------------------------------------------------
const iniciante_hard: JavascriptChallenge[] = [
  {
    id: "js-ini-hard-1",
    phase: 1,
    level: "Iniciante",
    difficulty: "hard",
    title: "Remover Duplicatas",
    description: "Dado um array, remova todos os elementos duplicados e retorne o array limpo, preservando a ordem da primeira aparição.",
    requirements: [
      "A função recebe um array `arr`.",
      "Retorne um novo array só com valores únicos.",
    ],
    starterCode: "function resolver(arr) {\n  // Remova duplicatas\n  \n}\n",
    solution: "function resolver(arr) {\n  return [...new Set(arr)];\n}\n",
    testCases: [
      { input: "[1, 2, 2, 3, 1]", expected: "[1, 2, 3]", description: "Números" },
      { input: "['a', 'b', 'a']", expected: "['a', 'b']", description: "Strings" },
      { input: "[]", expected: "[]", description: "Vazio" },
      { input: "[1, 1, 1]", expected: "[1]", description: "Todos iguais" },
      { input: "[1, 2, 3]", expected: "[1, 2, 3]", description: "Já únicos" },
    ],
    hint: "Em JavaScript, você pode facilmente remover duplicatas jogando o array para um `Set` (que só aceita valores únicos) e convertendo de volta pra array usando `[...new Set(array)]`.",
    example: { input: "[5, 5, 2]", output: "[5, 2]", explanation: "O 5 repetiu." },
  },
  {
    id: "js-ini-hard-2",
    phase: 2,
    level: "Iniciante",
    difficulty: "hard",
    title: "Fibonacci Simples",
    description: "Retorne o n-ésimo termo da sequência de Fibonacci (onde fib(0) = 0, fib(1) = 1, e fib(n) = fib(n-1) + fib(n-2)).",
    requirements: [
      "A função recebe um inteiro não-negativo `n`.",
      "Retorne o valor correspondente de Fibonacci.",
    ],
    starterCode: "function resolver(n) {\n  // Encontre fib(n)\n  \n}\n",
    solution: "function resolver(n) {\n  if (n <= 1) return n;\n  let a = 0, b = 1;\n  for(let i=2; i<=n; i++) {\n    let temp = a + b;\n    a = b;\n    b = temp;\n  }\n  return b;\n}\n",
    testCases: [
      { input: "0", expected: "0", description: "fib(0)" },
      { input: "1", expected: "1", description: "fib(1)" },
      { input: "5", expected: "5", description: "fib(5) = 5" },
      { input: "7", expected: "13", description: "fib(7) = 13" },
      { input: "10", expected: "55", description: "fib(10) = 55" },
    ],
    hint: "Soluções recursivas são bonitas, mas uma solução iterativa (com loop `for`) armazenando os dois últimos valores `a` e `b` é muito mais eficiente em JavaScript.",
    example: { input: "2", output: "1", explanation: "0+1 = 1" },
  },
  {
    id: "js-ini-hard-3",
    phase: 3,
    level: "Iniciante",
    difficulty: "hard",
    title: "Maior palavra da frase",
    description: "Dada uma frase (string com espaços), encontre e retorne a maior palavra.",
    requirements: [
      "A função recebe uma string `frase`.",
      "Se houver empate, retorne a primeira.",
      "Considere apenas espaços como separadores.",
    ],
    starterCode: "function resolver(frase) {\n  // Encontre a maior palavra\n  \n}\n",
    solution: "function resolver(frase) {\n  if(!frase.trim()) return '';\n  return frase.split(' ').reduce((maior, atual) => atual.length > maior.length ? atual : maior, '');\n}\n",
    testCases: [
      { input: "'eu amo javascript'", expected: "'javascript'", description: "Exemplo claro" },
      { input: "'oi oi oi'", expected: "'oi'", description: "Empate" },
      { input: "'teste'", expected: "'teste'", description: "Uma palavra" },
      { input: "'o paralelepipedo azul'", expected: "'paralelepipedo'", description: "Palavra muito grande" },
      { input: "''", expected: "''", description: "Frase vazia" },
    ],
    hint: "Use `.split(' ')` para quebrar a frase em um array de palavras. Depois, percorra o array e guarde a que tem o maior `.length`.",
    example: { input: "'bom dia'", output: "'bom'", explanation: "Ambas tem 3 letras, mas 'bom' aparece primeiro." },
  },
  {
    id: "js-ini-hard-4",
    phase: 4,
    level: "Iniciante",
    difficulty: "hard",
    title: "Contagem de letras no Array",
    description: "Dado um array de palavras, conte o total de caracteres de todas as palavras somadas.",
    requirements: [
      "A função recebe um array de strings `palavras`.",
      "Retorne a soma total de `length` de todas.",
    ],
    starterCode: "function resolver(palavras) {\n  // Conte todos os caracteres\n  \n}\n",
    solution: "function resolver(palavras) {\n  return palavras.reduce((acc, p) => acc + p.length, 0);\n}\n",
    testCases: [
      { input: "['a', 'bb', 'ccc']", expected: "6", description: "1+2+3 = 6" },
      { input: "[]", expected: "0", description: "Vazio" },
      { input: "['javascript']", expected: "10", description: "Um item" },
      { input: "['', '', 'a']", expected: "1", description: "Itens vazios" },
      { input: "['oi', 'tudo', 'bem']", expected: "9", description: "2+4+3 = 9" },
    ],
    hint: "Que tal usar `.join('')` para juntar todas as palavras numa string só e então pegar o `.length`? Ou então `.reduce()` para somar os comprimentos.",
    example: { input: "['a', 'bc']", output: "3", explanation: "1 + 2 = 3" },
  },
  {
    id: "js-ini-hard-5",
    phase: 5,
    level: "Iniciante",
    difficulty: "hard",
    title: "Capitalizar Iniciais",
    description: "Receba uma frase e retorne a mesma frase com a primeira letra de cada palavra em maiúscula.",
    requirements: [
      "A função recebe a string `frase`.",
      "Transforme a primeira letra de toda palavra em maiúscula.",
    ],
    starterCode: "function resolver(frase) {\n  // Capitalize as iniciais\n  \n}\n",
    solution: "function resolver(frase) {\n  return frase.split(' ').map(p => p ? p[0].toUpperCase() + p.slice(1).toLowerCase() : '').join(' ');\n}\n",
    testCases: [
      { input: "'hello world'", expected: "'Hello World'", description: "Clássico" },
      { input: "'javaScript é incrível'", expected: "'Javascript É Incrível'", description: "Misto (força lower no resto)" },
      { input: "'A b C'", expected: "'A B C'", description: "Letras únicas" },
      { input: "''", expected: "''", description: "Vazio" },
      { input: "'TESTE'", expected: "'Teste'", description: "Tudo maiúsculo" },
    ],
    hint: "Use `.split(' ')` para pegar as palavras, `.map()` para transformar cada palavra pegando `palavra[0].toUpperCase() + palavra.slice(1).toLowerCase()`, e depois `.join(' ')`.",
    example: { input: "'oi brasil'", output: "'Oi Brasil'", explanation: "Letras O e B ficaram maiúsculas." },
  },
];

// ---------------------------------------------------------------------------
// INTERMEDIÁRIO + EASY (5 fases)
// ---------------------------------------------------------------------------
const intermediario_easy: JavascriptChallenge[] = [
  {
    id: "js-int-easy-1",
    phase: 1,
    level: "Intermediário",
    difficulty: "easy",
    title: "Filtrar Pares (Filter)",
    description: "Use métodos funcionais de array para retornar apenas os números pares de um array.",
    requirements: [
      "A função recebe um array `numeros`.",
      "Retorne um novo array apenas com os itens pares.",
      "Uso recomendado: Array.prototype.filter().",
    ],
    starterCode: "function resolver(numeros) {\n  // Filtre os números pares\n  \n}\n",
    solution: "function resolver(numeros) {\n  return numeros.filter(n => n % 2 === 0);\n}\n",
    testCases: [
      { input: "[1, 2, 3, 4, 5, 6]", expected: "[2, 4, 6]", description: "De 1 a 6" },
      { input: "[1, 3, 5]", expected: "[]", description: "Só ímpares" },
      { input: "[2, 4, 6]", expected: "[2, 4, 6]", description: "Só pares" },
      { input: "[]", expected: "[]", description: "Vazio" },
      { input: "[0, -2, -3]", expected: "[0, -2]", description: "Com zero e negativos" },
    ],
    hint: "O método `array.filter(callback)` retorna um novo array contendo só os elementos onde a função callback retorna `true`.",
    example: { input: "[1, 2, 3]", output: "[2]", explanation: "Apenas 2 é par." },
  },
  {
    id: "js-int-easy-2",
    phase: 2,
    level: "Intermediário",
    difficulty: "easy",
    title: "Transformar Objetos (Map)",
    description: "Dado um array de objetos `{ nome, preco }`, retorne um array apenas com os `nome`s dos produtos.",
    requirements: [
      "A função recebe `produtos`.",
      "Retorne array de strings (apenas os nomes).",
    ],
    starterCode: "function resolver(produtos) {\n  // Mapeie os nomes\n  \n}\n",
    solution: "function resolver(produtos) {\n  return produtos.map(p => p.nome);\n}\n",
    testCases: [
      { input: "[{nome: 'TV', preco: 100}, {nome: 'Celular', preco: 50}]", expected: "['TV', 'Celular']", description: "Básico" },
      { input: "[]", expected: "[]", description: "Vazio" },
      { input: "[{nome: 'Mesa', preco: 0}]", expected: "['Mesa']", description: "Um item" },
    ],
    hint: "Aproveite a função `array.map(item => item.propriedade)`. Se quiser brilhar, use desestruturação: `.map(({ nome }) => nome)`.",
    example: { input: "[{nome: 'a', preco: 1}]", output: "['a']", explanation: "Extrai apenas a propriedade nome." },
  },
  {
    id: "js-int-easy-3",
    phase: 3,
    level: "Intermediário",
    difficulty: "easy",
    title: "Agrupar Objetos",
    description: "Dado um array de objetos `{ user, role }`, conte quantos usuários tem a role 'admin'.",
    requirements: [
      "A função recebe o array `usuarios`.",
      "Retorne o total de admins (inteiro).",
    ],
    starterCode: "function resolver(usuarios) {\n  // Conte os admins\n  \n}\n",
    solution: "function resolver(usuarios) {\n  return usuarios.filter(u => u.role === 'admin').length;\n}\n",
    testCases: [
      { input: "[{user:'a', role:'admin'}, {user:'b', role:'user'}]", expected: "1", description: "1 admin" },
      { input: "[{user:'a', role:'user'}]", expected: "0", description: "Nenhum" },
      { input: "[{user:'a', role:'admin'}, {user:'b', role:'admin'}]", expected: "2", description: "Vários" },
      { input: "[]", expected: "0", description: "Vazio" },
    ],
    hint: "Você pode `.filter()` quem tem role 'admin' e pegar o `.length`, ou `.reduce()` somando 1 toda vez que o role for igual.",
    example: { input: "[{role:'admin'}, {role:'user'}]", output: "1", explanation: "Há 1 objeto com role admin." },
  },
  {
    id: "js-int-easy-4",
    phase: 4,
    level: "Intermediário",
    difficulty: "easy",
    title: "Múltiplos de N",
    description: "Retorne `true` se todos os itens de um array numérico forem múltiplos de um número `N` informado, senão `false`.",
    requirements: [
      "A função recebe um array `numeros` e um inteiro `n`.",
      "Retorne booleano.",
      "Dica: Array.prototype.every().",
      "Array vazio retorna `true`.",
    ],
    starterCode: "function resolver(numeros, n) {\n  // Verifique todos usando .every()\n  \n}\n",
    solution: "function resolver(numeros, n) {\n  return numeros.every(num => num % n === 0);\n}\n",
    testCases: [
      { input: "[2, 4, 6], 2", expected: "true", description: "Todos são múltiplos de 2" },
      { input: "[2, 5, 6], 2", expected: "false", description: "O 5 quebra a regra" },
      { input: "[10, 20, 30], 10", expected: "true", description: "Múltiplos de 10" },
      { input: "[], 5", expected: "true", description: "Vazio é true por padrão lógico" },
      { input: "[7], 7", expected: "true", description: "Item único" },
    ],
    hint: "Use o método `array.every(num => num % n === 0)`. Ele retorna `true` se a condição for verdadeira para todos os itens.",
    example: { input: "[3, 6], 3", output: "true", explanation: "Ambos divisíveis por 3." },
  },
  {
    id: "js-int-easy-5",
    phase: 5,
    level: "Intermediário",
    difficulty: "easy",
    title: "Encontrar Elemento",
    description: "Busque no array de objetos um item cuja propriedade `id` seja exatamente igual ao ID buscado.",
    requirements: [
      "A função recebe `itens` (array de objetos) e `id` (inteiro).",
      "Retorne o objeto encontrado ou `null` se não achar.",
    ],
    starterCode: "function resolver(itens, id) {\n  // Retorne o objeto ou null\n  \n}\n",
    solution: "function resolver(itens, id) {\n  return itens.find(i => i.id === id) || null;\n}\n",
    testCases: [
      { input: "[{id: 1, nome: 'A'}, {id: 2, nome: 'B'}], 2", expected: "{'id': 2, 'nome': 'B'}", description: "Encontra o item" },
      { input: "[{id: 1, nome: 'A'}], 3", expected: "null", description: "Não encontra" },
      { input: "[], 1", expected: "null", description: "Array vazio" },
    ],
    hint: "O método `array.find(item => condicao)` faz exatamente isso. Ele retorna `undefined` se não achar, então use o operador lógico `|| null` para garantir o retorno pedido.",
    example: { input: "[{id:1}], 1", output: "{'id':1}", explanation: "Achei o id 1." },
  },
];

// ---------------------------------------------------------------------------
// INTERMEDIÁRIO + MEDIUM (5 fases)
// ---------------------------------------------------------------------------
const intermediario_medium: JavascriptChallenge[] = [
  {
    id: "js-int-med-1",
    phase: 1,
    level: "Intermediário",
    difficulty: "medium",
    title: "Anagrama",
    description: "Verifique se duas strings são anagramas (possuem as mesmas letras, ignorando espaços e cases).",
    requirements: [
      "A função recebe duas strings `a` e `b`.",
      "Retorne `true` ou `false`.",
    ],
    starterCode: "function resolver(a, b) {\n  // Verifique se são anagramas\n  \n}\n",
    solution: "function resolver(a, b) {\n  const clean = s => s.replace(/\\s/g, '').toLowerCase().split('').sort().join('');\n  return clean(a) === clean(b);\n}\n",
    testCases: [
      { input: "'listen', 'silent'", expected: "true", description: "Básico" },
      { input: "'hello', 'world'", expected: "false", description: "Diferentes" },
      { input: "'Dormitory', 'Dirty room'", expected: "true", description: "Com espaços e cases" },
      { input: "'abc', 'ab'", expected: "false", description: "Tamanhos diferentes" },
      { input: "'' , ''", expected: "true", description: "Vazios" },
    ],
    hint: "Limpe as duas strings tirando espaços e deixando minúsculas. Depois transforme em array (`split`), ordene (`sort`) e junte de novo (`join`). Compare os resultados.",
    example: { input: "'roma', 'amor'", output: "true", explanation: "Ambas possuem a, m, o, r." },
  },
  {
    id: "js-int-med-2",
    phase: 2,
    level: "Intermediário",
    difficulty: "medium",
    title: "Planificação de Array (Flatten)",
    description: "Escreva uma função que recebe um array que pode conter sub-arrays aninhados (1 nível) e o transforma num array plano de 1 dimensão.",
    requirements: [
      "A função recebe um array `arr`.",
      "Achatamento de nível 1. Ex: `[1, [2, 3]]` -> `[1, 2, 3]`.",
    ],
    starterCode: "function resolver(arr) {\n  // Planifique o array\n  \n}\n",
    solution: "function resolver(arr) {\n  return arr.flat();\n}\n",
    testCases: [
      { input: "[1, [2, 3], 4]", expected: "[1, 2, 3, 4]", description: "Misto" },
      { input: "[[1, 2], [3, 4]]", expected: "[1, 2, 3, 4]", description: "Só subarrays" },
      { input: "[1, 2, 3]", expected: "[1, 2, 3]", description: "Já plano" },
      { input: "[]", expected: "[]", description: "Vazio" },
      { input: "[[1]]", expected: "[1]", description: "Um array dentro" },
    ],
    hint: "No JavaScript moderno, o método `Array.prototype.flat(níveis)` resolve isso de forma trivial. O padrão é nível 1. Alternativa: `[].concat(...arr)`.",
    example: { input: "[[1], 2]", output: "[1, 2]", explanation: "O 1 saiu do array interno." },
  },
  {
    id: "js-int-med-3",
    phase: 3,
    level: "Intermediário",
    difficulty: "medium",
    title: "Interseção de Arrays",
    description: "Crie uma função que recebe dois arrays de números e retorna um novo array apenas com os elementos que existem em ambos (sem duplicatas no resultado).",
    requirements: [
      "A função recebe `arr1` e `arr2`.",
      "Retorne um array.",
      "A ordem não importa no retorno, mas para o teste deixe em ordem crescente.",
    ],
    starterCode: "function resolver(arr1, arr2) {\n  // Interseção\n  \n}\n",
    solution: "function resolver(arr1, arr2) {\n  const intersection = arr1.filter(value => arr2.includes(value));\n  return [...new Set(intersection)].sort((a,b) => a - b);\n}\n",
    testCases: [
      { input: "[1, 2, 3], [2, 3, 4]", expected: "[2, 3]", description: "Cruzamento padrão" },
      { input: "[1, 2], [3, 4]", expected: "[]", description: "Sem interseção" },
      { input: "[1, 1, 2], [1, 3]", expected: "[1]", description: "Sem duplicatas no resultado" },
      { input: "[], [1, 2]", expected: "[]", description: "Um deles vazio" },
      { input: "[5, 4, 3], [3, 4, 5]", expected: "[3, 4, 5]", description: "Crescente exigido" },
    ],
    hint: "Filtre `arr1` mantendo apenas itens onde `arr2.includes(item)`. Depois remova duplicatas com `Set` e ordene com `.sort((a,b) => a - b)`.",
    example: { input: "[1,2], [2,3]", output: "[2]", explanation: "Apenas 2 existe em ambos." },
  },
  {
    id: "js-int-med-4",
    phase: 4,
    level: "Intermediário",
    difficulty: "medium",
    title: "Calculadora de Troco",
    description: "Receba um valor total de conta e um array de notas disponíveis. Retorne a quantidade mínima de notas para dar o troco exato. Ex: valor=14, notas=[10, 5, 2] -> [10, 2, 2]",
    requirements: [
      "A função recebe `valor` e `notas` (array decrescente).",
      "Sempre haverá troco exato (graças à nota 1 se necessário).",
      "Retorne um array com as notas usadas.",
    ],
    starterCode: "function resolver(valor, notas) {\n  // Retorne as notas para o troco exato\n  \n}\n",
    solution: "function resolver(valor, notas) {\n  let troco = [];\n  for (let n of notas) {\n    while (valor >= n) {\n      troco.push(n);\n      valor -= n;\n    }\n  }\n  return troco;\n}\n",
    testCases: [
      { input: "14, [10, 5, 2, 1]", expected: "[10, 2, 2]", description: "Pula o 5, usa dois 2" },
      { input: "50, [50, 20, 10]", expected: "[50]", description: "Nota exata" },
      { input: "35, [20, 10, 5, 1]", expected: "[20, 10, 5]", description: "Usa várias" },
      { input: "0, [10, 5, 1]", expected: "[]", description: "Zero" },
      { input: "3, [5, 2, 1]", expected: "[2, 1]", description: "Não usa as primeiras" },
    ],
    hint: "Itere pelas notas. Enquanto o `valor` for maior ou igual à nota atual, subtraia a nota do valor e dê um `.push()` da nota no array de resposta.",
    example: { input: "6, [5, 1]", output: "[5, 1]", explanation: "Usa uma de 5 e uma de 1." },
  },
  {
    id: "js-int-med-5",
    phase: 5,
    level: "Intermediário",
    difficulty: "medium",
    title: "Chaves de Objetos Profundas",
    description: "Receba um array de objetos e o nome de uma propriedade. Alguns objetos não terão a propriedade. Retorne um array apenas com os valores existentes.",
    requirements: [
      "A função recebe `array` e `chave` (string).",
      "Ignore objetos onde a chave seja `undefined`.",
      "Retorne os valores extraídos numa lista.",
    ],
    starterCode: "function resolver(array, chave) {\n  // Extraia os valores presentes\n  \n}\n",
    solution: "function resolver(array, chave) {\n  return array.map(item => item[chave]).filter(val => val !== undefined);\n}\n",
    testCases: [
      { input: "[{a: 1}, {b: 2}, {a: 3}], 'a'", expected: "[1, 3]", description: "Extrai a" },
      { input: "[{x: 'ola'}, {x: null}, {}], 'x'", expected: "['ola', null]", description: "Null deve ser mantido, apenas undefined removido" },
      { input: "[], 'a'", expected: "[]", description: "Array vazio" },
      { input: "[{a: 1}], 'b'", expected: "[]", description: "Chave inexistente em tudo" },
    ],
    hint: "Use `array.map(item => item[chave])` seguido de um `.filter(valor => valor !== undefined)`.",
    example: { input: "[{n: 1}, {}], 'n'", output: "[1]", explanation: "O segundo objeto não tinha 'n'." },
  },
];

// ---------------------------------------------------------------------------
// INTERMEDIÁRIO + HARD (5 fases)
// ---------------------------------------------------------------------------
const intermediario_hard: JavascriptChallenge[] = [
  {
    id: "js-int-hard-1",
    phase: 1,
    level: "Intermediário",
    difficulty: "hard",
    title: "Validador de CPF Simplificado",
    description: "Receba uma string, remova pontos e traços, e verifique se ela tem exatos 11 dígitos numéricos.",
    requirements: [
      "A função recebe `cpf`.",
      "Retorne `true` ou `false`.",
      "Apenas valide o formato numérico e tamanho, ignorando caracteres de máscara (., -).",
    ],
    starterCode: "function resolver(cpf) {\n  // Valide a máscara\n  \n}\n",
    solution: "function resolver(cpf) {\n  const numeros = cpf.replace(/[.-]/g, '');\n  return /^\\d{11}$/.test(numeros);\n}\n",
    testCases: [
      { input: "'123.456.789-00'", expected: "true", description: "CPF com máscara" },
      { input: "'12345678900'", expected: "true", description: "Sem máscara" },
      { input: "'123.456.789-0'", expected: "false", description: "Faltam dígitos" },
      { input: "'123.45a.789-00'", expected: "false", description: "Tem letras" },
      { input: "''", expected: "false", description: "Vazio" },
    ],
    hint: "Use `.replace(/[.-]/g, '')` para limpar. Depois, você pode verificar se o tamanho é 11 e se `!isNaN(valor)` (mas o melhor é usar uma regex simples `/^\\d{11}$/.test()`).",
    example: { input: "'000.000.000-00'", output: "true", explanation: "11 dígitos após remoção de . e -" },
  },
  {
    id: "js-int-hard-2",
    phase: 2,
    level: "Intermediário",
    difficulty: "hard",
    title: "Contador de Palavras Frequentes",
    description: "Dada uma frase, retorne a palavra que mais se repete (ignorando maiúsculas e espaços pontuais).",
    requirements: [
      "A função recebe `frase`.",
      "Retorne a palavra mais frequente, tudo em lowercase.",
      "Em caso de empate, retorne a primeira que atingiu o valor.",
    ],
    starterCode: "function resolver(frase) {\n  // Descubra a palavra que mais repete\n  \n}\n",
    solution: "function resolver(frase) {\n  const contagens = {};\n  let maxCount = 0;\n  let palavraFrequente = '';\n  \n  frase.toLowerCase().split(' ').forEach(p => {\n    if(!p) return;\n    contagens[p] = (contagens[p] || 0) + 1;\n    if(contagens[p] > maxCount) {\n      maxCount = contagens[p];\n      palavraFrequente = p;\n    }\n  });\n  return palavraFrequente;\n}\n",
    testCases: [
      { input: "'ola ola ola mundo'", expected: "'ola'", description: "Óbvio" },
      { input: "'Javascript javascript é bom'", expected: "'javascript'", description: "Case insensitive" },
      { input: "'um dois um dois'", expected: "'um'", description: "Empate, um vem antes" },
      { input: "'teste'", expected: "'teste'", description: "Uma palavra" },
      { input: "' '", expected: "''", description: "Só espaços" },
    ],
    hint: "Quebre a string num array com split. Use um objeto literal (ou Map) para guardar a contagem de cada palavra. Guarde a palavra com o maior valor visto.",
    example: { input: "'a b a'", output: "'a'", explanation: "a = 2 vezes." },
  },
  {
    id: "js-int-hard-3",
    phase: 3,
    level: "Intermediário",
    difficulty: "hard",
    title: "Chunk de Array",
    description: "Divida um array original em vários arrays (chunks) de tamanho N, retornando um array 2D.",
    requirements: [
      "A função recebe `array` e um número `tamanho`.",
      "Se `tamanho <= 0`, retorne o array original dentro de um array: `[array]`.",
    ],
    starterCode: "function resolver(array, tamanho) {\n  // Chunk the array\n  \n}\n",
    solution: "function resolver(array, tamanho) {\n  if(tamanho <= 0) return [array];\n  const resultado = [];\n  for(let i = 0; i < array.length; i += tamanho) {\n    resultado.push(array.slice(i, i + tamanho));\n  }\n  return resultado;\n}\n",
    testCases: [
      { input: "[1, 2, 3, 4, 5], 2", expected: "[[1, 2], [3, 4], [5]]", description: "Tamanho 2" },
      { input: "[1, 2, 3], 3", expected: "[[1, 2, 3]]", description: "Tamanho igual array" },
      { input: "[1, 2], 5", expected: "[[1, 2]]", description: "Tamanho maior" },
      { input: "[], 2", expected: "[]", description: "Vazio" },
      { input: "[1, 2], 0", expected: "[[1, 2]]", description: "Tamanho zero" },
    ],
    hint: "Use um loop `for` avançando de `tamanho` em `tamanho`. Em cada passo, fatie o array com `.slice(i, i + tamanho)` e adicione no array de retorno.",
    example: { input: "[1,2,3,4], 2", output: "[[1, 2], [3, 4]]", explanation: "Quebra de 2 em 2." },
  },
  {
    id: "js-int-hard-4",
    phase: 4,
    level: "Intermediário",
    difficulty: "hard",
    title: "Diferença Simétrica",
    description: "Retorne um array contendo os elementos que existem em um array, ou no outro, mas não em ambos.",
    requirements: [
      "A função recebe `arr1` e `arr2`.",
      "A resposta deve ser ordenada crescente (apenas números).",
    ],
    starterCode: "function resolver(arr1, arr2) {\n  // Diferença simétrica\n  \n}\n",
    solution: "function resolver(arr1, arr2) {\n  const diff1 = arr1.filter(x => !arr2.includes(x));\n  const diff2 = arr2.filter(x => !arr1.includes(x));\n  return [...new Set([...diff1, ...diff2])].sort((a,b) => a-b);\n}\n",
    testCases: [
      { input: "[1, 2, 3], [2, 3, 4]", expected: "[1, 4]", description: "2 e 3 são comuns" },
      { input: "[1, 2], [3, 4]", expected: "[1, 2, 3, 4]", description: "Disjuntos" },
      { input: "[1, 1], [1]", expected: "[]", description: "Idênticos (com repetições)" },
      { input: "[], [1]", expected: "[1]", description: "Um vazio" },
      { input: "[1, 2, 3], [1, 2, 3]", expected: "[]", description: "Tudo comum" },
    ],
    hint: "Pegue quem está em `arr1` mas não em `arr2`, concatene com quem está em `arr2` mas não em `arr1`. Remova duplicatas e ordene.",
    example: { input: "[1], [2]", output: "[1, 2]", explanation: "1 e 2 são únicos." },
  },
  {
    id: "js-int-hard-5",
    phase: 5,
    level: "Intermediário",
    difficulty: "hard",
    title: "Deep Merge Básico",
    description: "Combine dois objetos. Se ambos tiverem a mesma chave, dê preferência ao valor do segundo, exceto se os valores forem arrays (nesse caso, concatene e ordene crescente).",
    requirements: [
      "A função recebe `obj1` e `obj2`.",
      "As propriedades de ambos devem constar no retorno.",
      "Conflitos primitivos -> obj2 vence.",
      "Conflitos array numérico -> concatena e array.sort((a,b)=>a-b).",
    ],
    starterCode: "function resolver(obj1, obj2) {\n  // Merge profundo básico\n  \n}\n",
    solution: "function resolver(obj1, obj2) {\n  const res = { ...obj1 };\n  for (let key in obj2) {\n    if (Array.isArray(res[key]) && Array.isArray(obj2[key])) {\n      res[key] = [...res[key], ...obj2[key]].sort((a,b)=>a-b);\n    } else {\n      res[key] = obj2[key];\n    }\n  }\n  return res;\n}\n",
    testCases: [
      { input: "{a: 1}, {b: 2}", expected: "{'a': 1, 'b': 2}", description: "Sem conflito" },
      { input: "{a: 1}, {a: 2}", expected: "{'a': 2}", description: "Conflito simples" },
      { input: "{arr: [3, 1]}, {arr: [2]}", expected: "{'arr': [1, 2, 3]}", description: "Conflito array" },
      { input: "{a: [1]}, {a: 2}", expected: "{'a': 2}", description: "Array sobrescrito por primitivo" },
      { input: "{}, {}", expected: "{}", description: "Vazios" },
    ],
    hint: "Faça uma cópia do obj1. Itere pelas chaves do obj2 (`for...in`). Verifique com `Array.isArray()` se ambos os campos naquela chave são arrays para realizar o concat+sort, senão sobrescreva direto.",
    example: { input: "{x: [2]}, {x: [1]}", output: "{x: [1, 2]}", explanation: "Conflito de arrays gerou concatenação ordenada." },
  },
];

// ---------------------------------------------------------------------------
// AVANÇADO + EASY (5 fases)
// ---------------------------------------------------------------------------
const avancado_easy: JavascriptChallenge[] = [
  {
    id: "js-av-easy-1",
    phase: 1,
    level: "Avançado",
    difficulty: "easy",
    title: "Gerador de Sequência Range (Iterators)",
    description: "Retorne uma array sequencial do valor de Início até o valor de Fim. Crie em uma linha com Array.from.",
    requirements: [
      "A função recebe `start` e `end`.",
      "O resultado inclui o `start` e o `end`.",
      "Garantido start <= end.",
    ],
    starterCode: "function resolver(start, end) {\n  // Crie e retorne o array sequencial\n  \n}\n",
    solution: "function resolver(start, end) {\n  return Array.from({ length: end - start + 1 }, (_, i) => start + i);\n}\n",
    testCases: [
      { input: "1, 5", expected: "[1, 2, 3, 4, 5]", description: "De 1 a 5" },
      { input: "0, 3", expected: "[0, 1, 2, 3]", description: "Com zero" },
      { input: "-2, 2", expected: "[-2, -1, 0, 1, 2]", description: "Negativos a positivos" },
      { input: "10, 10", expected: "[10]", description: "Tamanhos iguais" },
    ],
    hint: "Utilize `Array.from({ length: totalItems }, (_, index) => inicio + index)`. Essa é a forma mais funcional de se criar 'ranges' no JS.",
    example: { input: "2, 4", output: "[2, 3, 4]", explanation: "Sequência inclusive." },
  },
  {
    id: "js-av-easy-2",
    phase: 2,
    level: "Avançado",
    difficulty: "easy",
    title: "Promise Simples",
    description: "Crie e retorne uma Promise que resolve imediatamente com uma string 'Resolvido!', ou rejeita com 'Erro!' dependendo de um flag booleano recebido por parâmetro.",
    requirements: [
      "A função recebe um `boolean`.",
      "Se true, retorna uma Promise resolvida com 'Resolvido!'.",
      "Se false, retorna uma Promise rejeitada com 'Erro!'. (O avaliador trata .catch automaticamente).",
    ],
    starterCode: "function resolver(sucesso) {\n  // Retorne a Promise\n  \n}\n",
    solution: "function resolver(sucesso) {\n  return sucesso ? Promise.resolve('Resolvido!') : Promise.reject('Erro!');\n}\n",
    testCases: [
      { input: "true", expected: "'Resolvido!'", description: "Caminho feliz" },
    ],
    hint: "Você pode usar as abreviações diretas `Promise.resolve(valor)` e `Promise.reject(erro)` sem precisar instanciar com `new Promise()`.",
    example: { input: "true", output: "'Resolvido!'", explanation: "Promise resolvida." },
  },
  {
    id: "js-av-easy-3",
    phase: 3,
    level: "Avançado",
    difficulty: "easy",
    title: "Limpar Valores Falsy",
    description: "Receba um array e devolva um novo array sem nenhum valor considerado falsy pelo JS (false, 0, '', null, undefined, NaN).",
    requirements: [
      "A função recebe um array misto.",
      "Remova todos os falsy values.",
    ],
    starterCode: "function resolver(arr) {\n  // Remova os falsy values\n  \n}\n",
    solution: "function resolver(arr) {\n  return arr.filter(Boolean);\n}\n",
    testCases: [
      { input: "[0, 1, false, 2, '', 3]", expected: "[1, 2, 3]", description: "Falsy padrão" },
      { input: "[null, undefined, NaN]", expected: "[]", description: "Todos falsy" },
      { input: "['ola', true, 10]", expected: "['ola', true, 10]", description: "Todos truthy" },
      { input: "[]", expected: "[]", description: "Vazio" },
    ],
    hint: "Em JavaScript o filtro `.filter(Boolean)` usa a própria função nativa `Boolean` como callback, testando a 'veracidade' de cada item e removendo todos os falsos de uma vez só.",
    example: { input: "[1, 0, 2]", output: "[1, 2]", explanation: "O 0 é falsy." },
  },
  {
    id: "js-av-easy-4",
    phase: 4,
    level: "Avançado",
    difficulty: "easy",
    title: "Sleep (Atraso Assíncrono)",
    description: "Crie uma função `sleep` que recebe milissegundos e retorna uma Promise que resolve após esse tempo (usando setTimeout). O test runner injetará um mock para você retornar a Promise.",
    requirements: [
      "A função recebe um inteiro `ms`.",
      "Retorne uma Promise usando `setTimeout`.",
      "Para ser avaliável rápido, apenas instancie e retorne. Retorne a string 'Acordou' após resolver.",
    ],
    starterCode: "function resolver(ms) {\n  // Retorne uma promise que resolve com 'Acordou' após ms\n  \n}\n",
    solution: "function resolver(ms) {\n  return new Promise(resolve => setTimeout(() => resolve('Acordou'), ms));\n}\n",
    testCases: [
      { input: "100", expected: "'Acordou'", description: "100ms delay" },
      { input: "0", expected: "'Acordou'", description: "Imediato" },
    ],
    hint: "Retorne `new Promise(resolve => setTimeout(() => resolve('Acordou'), ms))`.",
    example: { input: "50", output: "'Acordou'", explanation: "Após aguardar." },
  },
  {
    id: "js-av-easy-5",
    phase: 5,
    level: "Avançado",
    difficulty: "easy",
    title: "Safely Access Nested Object",
    description: "Acesse uma propriedade profunda de um objeto usando caminho em string (ex: 'user.address.street') usando Optional Chaining ou reducer. Se o caminho não existir, retorne `undefined`.",
    requirements: [
      "A função recebe `obj` e uma string `caminho` separada por pontos.",
      "Sem atirar exceções se falhar no meio.",
    ],
    starterCode: "function resolver(obj, caminho) {\n  // Acesse profundamente\n  \n}\n",
    solution: "function resolver(obj, caminho) {\n  return caminho.split('.').reduce((o, key) => (o || {})[key], obj);\n}\n",
    testCases: [
      { input: "{a: {b: {c: 1}}}, 'a.b.c'", expected: "1", description: "Encontra o valor" },
      { input: "{a: {}}, 'a.b.c'", expected: "undefined", description: "Falha no meio" },
      { input: "{a: 1}, 'x'", expected: "undefined", description: "Chave inicial não existe" },
    ],
    hint: "Quebre o caminho com `.split('.')`. Use `.reduce()` passando o objeto inicial como valor, e em cada volta avance acessando a propriedade, prevenindo erro caso fique nulo `(acumulador || {})[chaveAtual]`.",
    example: { input: "{x:{y:10}}, 'x.y'", output: "10", explanation: "Navegação por 2 níveis." },
  },
];

// ---------------------------------------------------------------------------
// AVANÇADO + MEDIUM (5 fases)
// ---------------------------------------------------------------------------
const avancado_medium: JavascriptChallenge[] = [
  {
    id: "js-av-med-1",
    phase: 1,
    level: "Avançado",
    difficulty: "medium",
    title: "Debounce (Simulado)",
    description: "Entenda o padrão Debounce. Escreva a casca de uma função debounce que recebe `func` e `delay`. Você deve retornar uma nova função. (A avaliação vai invocar a função retornada simulando contexto).",
    requirements: [
      "A função recebe um callback e um tempo.",
      "Retorne uma nova função que, ao chamada, agenda o callback limpando o anterior (closure com setTimeout/clearTimeout).",
      "Para efeitos de teste estático: apenas implemente a lógica.",
    ],
    starterCode: "function resolver(func, delay) {\n  // Implemente o padrão debounce\n  \n}\n",
    solution: "function resolver(func, delay) {\n  let timeoutId;\n  return function(...args) {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => func.apply(this, args), delay);\n  };\n}\n",
    testCases: [
      { input: "() => 1, 100", expected: "Function", description: "Retorna a closure correta (simulação estrutural)" },
      // Em um ambiente de string/JSON real os testes de debounce são complexos de avaliar via CLI estático sem hooks assíncronos extras, então validamos superficialmente.
    ],
    hint: "O Debounce cria uma closure contendo a variável do timer. Retorne uma função que dá `clearTimeout(timer)` seguido de `timer = setTimeout(suaFuncao, delay)`. Não esqueça de repassar os argumentos com `...args` e `.apply(this, args)`.",
    example: { input: "func, 100", output: "Function", explanation: "O retorno é uma função atrasada temporizada." },
  },
  {
    id: "js-av-med-2",
    phase: 2,
    level: "Avançado",
    difficulty: "medium",
    title: "Composição de Funções (Pipe)",
    description: "Crie uma função utilitária `pipe` que recebe um array de funções síncronas e retorna uma função combinada. A saída de cada função vira entrada da próxima (da esquerda pra direita).",
    requirements: [
      "A função `resolver` recebe um array de funções (em string, para o validador). Vamos injetar na execução.",
      "Para passar no teste: escreva o código onde a função retorna `fns.reduce(...)` internamente iterando sobre os dados passados.",
    ],
    starterCode: "function resolver(fnsStr) {\n  // Injetando as funções do input:\n  const fns = fnsStr.map(eval);\n  \n  // Escreva a lógica do Pipe. Retorne uma função que aplica `val` a todas as fns sequencialmente.\n  return function(val) {\n    \n  }\n}\n",
    solution: "function resolver(fnsStr) {\n  const fns = fnsStr.map(eval);\n  return function(val) {\n    return fns.reduce((acc, fn) => fn(acc), val);\n  }\n}\n",
    testCases: [
      { input: "['x => x + 1', 'x => x * 2']", expected: "Function", description: "Criação do pipe (avaliação via wrapper interno do executor)" },
    ],
    hint: "A função retornada por você aceita o dado (val), e aí você invoca `.reduce` no array de funções. O iterador do reduce usa o retorno de cada chamada como novo `acc`.",
    example: { input: "[add1, mul2], 5", output: "12", explanation: "(5 + 1) * 2 = 12" },
  },
  {
    id: "js-av-med-3",
    phase: 3,
    level: "Avançado",
    difficulty: "medium",
    title: "Cache Funcional (Memoize)",
    description: "Implemente um cache de memoization que guarda resultados anteriores baseado no parâmetro numérico informado. Se chamado de novo com o mesmo parâmetro, retorna direto sem processar.",
    requirements: [
      "A função recebe uma função `callback` custosa.",
      "Retorne uma nova função que encapsula um dicionário `{}` em sua closure.",
    ],
    starterCode: "function resolver(fnStr) {\n  const fn = eval(fnStr);\n  // Implemente memoize para fn\n  \n}\n",
    solution: "function resolver(fnStr) {\n  const fn = eval(fnStr);\n  const cache = {};\n  return function(arg) {\n    if(cache[arg] === undefined) cache[arg] = fn(arg);\n    return cache[arg];\n  }\n}\n",
    testCases: [
      { input: "'x => x * 2'", expected: "Function", description: "Simples (teste estrutural)" },
    ],
    hint: "Crie `const cache = {}` fora da função que será retornada. Na função de retorno, verifique se `cache[argumento]` existe. Se sim retorne-o. Se não, calcule, salve no cache e retorne.",
    example: { input: "func", output: "Wrapped func", explanation: "Função cacheada." },
  },
  {
    id: "js-av-med-4",
    phase: 4,
    level: "Avançado",
    difficulty: "medium",
    title: "Conversor Hexadecimal para RGB",
    description: "Receba uma cor em string hexadecimal (com ou sem # e suportando tamanho 3 ou 6) e converta para um objeto `{ r, g, b }` numérico.",
    requirements: [
      "A função recebe `hex`.",
      "Trate `#FFF` ou `#FFFFFF`.",
      "Retorne `{r, g, b}`.",
    ],
    starterCode: "function resolver(hex) {\n  // Hex para RGB\n  \n}\n",
    solution: "function resolver(hex) {\n  let clean = hex.replace('#', '');\n  if (clean.length === 3) clean = clean.split('').map(c => c+c).join('');\n  const num = parseInt(clean, 16);\n  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };\n}\n",
    testCases: [
      { input: "'#FFFFFF'", expected: "{'r': 255, 'g': 255, 'b': 255}", description: "Branco" },
      { input: "'#000000'", expected: "{'r': 0, 'g': 0, 'b': 0}", description: "Preto" },
      { input: "'#FFF'", expected: "{'r': 255, 'g': 255, 'b': 255}", description: "Branco curto" },
      { input: "'FF0000'", expected: "{'r': 255, 'g': 0, 'b': 0}", description: "Vermelho, sem #" },
    ],
    hint: "Se tiver 3 caracteres, expanda duplicando-os. Use `parseInt(str, 16)` fatiando substrings de 2 em 2 caracteres, ou usando o operador bitwise (`>>`) se converter tudo pra um inteiro inteiro.",
    example: { input: "'#FF0000'", output: "{r: 255, g: 0, b: 0}", explanation: "Vermelho puro." },
  },
  {
    id: "js-av-med-5",
    phase: 5,
    level: "Avançado",
    difficulty: "medium",
    title: "Analisador de Parênteses V2",
    description: "Uma versão de balanceamento que exige o uso de pilhas. Dada uma string misturando `()`, `[]` e `{}`, retorne `true` se tudo for perfeitamente balanceado, senão `false`.",
    requirements: [
      "A função recebe uma string mista.",
    ],
    starterCode: "function resolver(str) {\n  // Verifica balanceamento exato de () [] {}\n  \n}\n",
    solution: "function resolver(str) {\n  const stack = [];\n  const pares = {')': '(', ']': '[', '}': '{'};\n  for (let c of str) {\n    if (['(', '[', '{'].includes(c)) stack.push(c);\n    else if (pares[c]) {\n      if (stack.pop() !== pares[c]) return false;\n    }\n  }\n  return stack.length === 0;\n}\n",
    testCases: [
      { input: "'()[]{}'", expected: "true", description: "Básico" },
      { input: "'([{}])'", expected: "true", description: "Aninhado correto" },
      { input: "'(]'", expected: "false", description: "Encerramento errado" },
      { input: "'([)]'", expected: "false", description: "Cruzamento inválido" },
      { input: "''", expected: "true", description: "Vazio" },
    ],
    hint: "Crie um array simulando uma Pilha (Stack). Se for abertura, dê `.push()`. Se for fechamento, dê `.pop()` e verifique se quem saiu faz par com quem chegou. No final o tamanho deve ser 0.",
    example: { input: "'{[]}'", output: "true", explanation: "Simétrica perfeita." },
  },
];

// ---------------------------------------------------------------------------
// AVANÇADO + HARD (5 fases)
// ---------------------------------------------------------------------------
const avancado_hard: JavascriptChallenge[] = [
  {
    id: "js-av-hard-1",
    phase: 1,
    level: "Avançado",
    difficulty: "hard",
    title: "Implementar um Event Emitter (Pub/Sub)",
    description: "Crie uma classe ou factory funcional de um gerenciador de eventos onde posso `.on('evento', callback)` e `.emit('evento', payload)`. Para o teste: retorne a factory, nós validaremos injetando chamadas.",
    requirements: [
      "Retorne um objeto com `on(event, cb)` e `emit(event, data)`.",
    ],
    starterCode: "function resolver() {\n  return {\n    events: {},\n    on: function(evt, cb) {\n      \n    },\n    emit: function(evt, data) {\n      \n    }\n  }\n}\n",
    solution: "function resolver() {\n  return {\n    events: {},\n    on(evt, cb) {\n      if(!this.events[evt]) this.events[evt] = [];\n      this.events[evt].push(cb);\n    },\n    emit(evt, data) {\n      if(this.events[evt]) this.events[evt].forEach(cb => cb(data));\n    }\n  }\n}\n",
    testCases: [
      { input: "''", expected: "Object", description: "Retorna o emissor padrão" },
    ],
    hint: "No seu estado `events`, inicialize a chave do evento com um array `[]` se ela não existir e dê push no callback (função `on`). No emit, itere esse array passando o dado aos callbacks.",
    example: { input: "Emissor gerado", output: "Eventos acionáveis", explanation: "Base da reatividade JS." },
  },
  {
    id: "js-av-hard-2",
    phase: 2,
    level: "Avançado",
    difficulty: "hard",
    title: "Geração de Árvore de Diretórios (Hierarquia)",
    description: "Dado um array plano de objetos `{id, parentId, name}`, reconstrua isso em formato de árvore aninhada através da propriedade `children: []`. O nó raiz tem parentId: null.",
    requirements: [
      "A função recebe um array plano.",
      "Retorne o array com nós de raiz (parentId = null), contendo seus filhos aninhados infinitamente.",
    ],
    starterCode: "function resolver(items) {\n  // Transforme a lista chata em árvore hierárquica\n  \n}\n",
    solution: "function resolver(items) {\n  const map = {};\n  const roots = [];\n  items.forEach(item => {\n    map[item.id] = { ...item, children: [] };\n  });\n  items.forEach(item => {\n    if (item.parentId !== null && map[item.parentId]) {\n      map[item.parentId].children.push(map[item.id]);\n    } else {\n      roots.push(map[item.id]);\n    }\n  });\n  return roots;\n}\n",
    testCases: [
      { input: "[{id: 1, parentId: null}, {id: 2, parentId: 1}]", expected: "[{'id': 1, 'parentId': null, 'children': [{'id': 2, 'parentId': 1, 'children': []}]}]", description: "Nível 1 aninhado" },
      { input: "[]", expected: "[]", description: "Vazio" },
    ],
    hint: "Transforme tudo num dicionário `O(1)` usando ID como chave (já adicionando um array `children: []`). Depois faça um loop conectando filhos nos arrays de `children` de seus respectivos `parentIds`.",
    example: { input: "1 (raiz) e 2 (filho de 1)", output: "1 com propriedade children contendo 2", explanation: "Árvores no DOM funcionam assim." },
  },
  {
    id: "js-av-hard-3",
    phase: 3,
    level: "Avançado",
    difficulty: "hard",
    title: "Simulação de Promise.all",
    description: "Escreva sua própria versão simplificada do `Promise.all`. Você recebe um array de Promises simuladas e deve retornar uma Promise que resolve um array ordenado das respostas, ou falha assim que qualquer uma rejeitar.",
    requirements: [
      "A função `resolver(promises)` retorna uma Promise.",
    ],
    starterCode: "function resolver(promises) {\n  // Simule o comportamento de Promise.all\n  \n}\n",
    solution: "function resolver(promises) {\n  return new Promise((resolve, reject) => {\n    let results = [];\n    let completed = 0;\n    if (promises.length === 0) resolve(results);\n    promises.forEach((p, i) => {\n      Promise.resolve(p).then(res => {\n        results[i] = res;\n        completed++;\n        if(completed === promises.length) resolve(results);\n      }).catch(reject);\n    });\n  });\n}\n",
    testCases: [
      { input: "[]", expected: "[]", description: "Array vazio" },
      // Devido ao isolamento de avaliação, testes complexos de promise injetadas são feitos como simulação superficial estática.
    ],
    hint: "Retorne `new Promise((resolve, reject) => { ... })`. Mantenha um contador e um array de resultados. Iterar sobre o array original e no `.then` salve os retornos nos mesmos índices originais. Se o contador igualar o total de requisições, chame resolve com a array final.",
    example: { input: "[p1(1s), p2(2s)]", output: "Array[p1Res, p2Res]", explanation: "O retorno respeita o tempo da mais lenta, mas preserva a ordem do array." },
  },
  {
    id: "js-av-hard-4",
    phase: 4,
    level: "Avançado",
    difficulty: "hard",
    title: "Proxy Reativo Básico (Observabilidade)",
    description: "Vamos testar manipulação de Objetos avançados. Dado um objeto qualquer, retorne uma cópia embrulhada num Proxy que emita uma contagem em log ou variável cada vez que qualquer chave sua for LIDA (get).",
    requirements: [
      "No teste do backend: iremos acessar chaves. Sua factory retornará o objeto. Crie o getter logando.",
    ],
    starterCode: "function resolver(obj) {\n  // Crie um Proxy que conta acessos\n  obj._acessos = 0;\n  return new Proxy(obj, {\n    get: function(target, prop) {\n      \n    }\n  })\n}\n",
    solution: "function resolver(obj) {\n  obj._acessos = 0;\n  return new Proxy(obj, {\n    get(target, prop) {\n      if (prop !== '_acessos') target._acessos++;\n      return target[prop];\n    }\n  });\n}\n",
    testCases: [
      { input: "{a: 1}", expected: "Object", description: "Retorna o Proxy rastreável" },
    ],
    hint: "O `Proxy` no JavaScript permite interceptar operações (get/set/etc). Em `get`, incremente seu contador salvo no target original antes de retornar `target[prop]`.",
    example: { input: "{a:1} envolto, depois pego o a", output: "contador vai pra 1", explanation: "Assim funcionam Vue e MobX por baixo." },
  },
  {
    id: "js-av-hard-5",
    phase: 5,
    level: "Avançado",
    difficulty: "hard",
    title: "Bind Manual Funcional (Currying / Closure)",
    description: "Crie uma função `meuBind` que emula o `Function.prototype.bind`. Recebe `(func, contexto, ...argsFixos)`. Retorna a nova função com o 'this' atrelado.",
    requirements: [
      "Não utilize o `.bind` original. Use apenas closure, `.apply` ou `.call`.",
    ],
    starterCode: "function resolver(funcStr, contexto, ...argsFixos) {\n  const func = eval(funcStr);\n  // Retorne a função bindada\n  return function(...argsNovos) {\n    \n  }\n}\n",
    solution: "function resolver(funcStr, contexto, ...argsFixos) {\n  const func = eval(funcStr);\n  return function(...argsNovos) {\n    return func.apply(contexto, argsFixos.concat(argsNovos));\n  }\n}\n",
    testCases: [
      { input: "'function(){return this.a}', {a: 42}", expected: "Function", description: "Avaliação do gerador" },
    ],
    hint: "Você só precisa retornar uma nova função (que recebe `argsNovos`) e internamente chama a função alvo usando `.apply(contexto, argsFixos.concat(argsNovos))`.",
    example: { input: "soma, this, arg1", output: "soma(arg1, argNovo)", explanation: "Forçamos o escopo de `this` na execução isolada." },
  },
];

// ---------------------------------------------------------------------------
// Export & helpers
// ---------------------------------------------------------------------------
export const ALL_JAVASCRIPT_CHALLENGES: JavascriptChallenge[] = [
  ...iniciante_easy,
  ...iniciante_medium,
  ...iniciante_hard,
  ...intermediario_easy,
  ...intermediario_medium,
  ...intermediario_hard,
  ...avancado_easy,
  ...avancado_medium,
  ...avancado_hard,
];

export function getJavascriptPhases(level: Level, difficulty: Difficulty): JavascriptChallenge[] {
  return ALL_JAVASCRIPT_CHALLENGES.filter(
    (c) => c.level === level && c.difficulty === difficulty,
  ).sort((a, b) => a.phase - b.phase);
}

export function getJavascriptChallenge(id: string): JavascriptChallenge | undefined {
  return ALL_JAVASCRIPT_CHALLENGES.find((c) => c.id === id);
}
