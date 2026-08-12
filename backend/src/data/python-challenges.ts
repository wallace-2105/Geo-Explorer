import type { Difficulty, Level } from "../types/domain.js";

export interface TestCase {
  input: string; // Python expression passed as argument
  expected: string; // expected stdout
  description: string;
}

export interface PythonChallenge {
  id: string;
  phase: number; // 1-5
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
const iniciante_easy: PythonChallenge[] = [
  {
    id: "py-ini-easy-1",
    phase: 1,
    level: "Iniciante",
    difficulty: "easy",
    title: "Soma de lista",
    description:
      "Dada uma lista de números inteiros, retorne a soma de todos os elementos.",
    requirements: [
      "A função recebe uma lista de inteiros chamada `numeros`.",
      "Retorne a soma total dos elementos.",
      "Para lista vazia, retorne 0.",
    ],
    starterCode:
      "def resolver(numeros):\n    # Retorne a soma de todos os elementos\n    pass\n",
    solution: "def resolver(numeros):\n    return sum(numeros)\n",
    testCases: [
      { input: "[1, 2, 3, 4, 5]", expected: "15", description: "Lista simples" },
      { input: "[]", expected: "0", description: "Lista vazia" },
      { input: "[-1, -2, 3]", expected: "0", description: "Negativos e positivos" },
      { input: "[10]", expected: "10", description: "Um elemento" },
      { input: "[0, 0, 0]", expected: "0", description: "Apenas zeros" },
    ],
    hint: "Use a função built-in `sum()` do Python.",
    example: { input: "[1, 2, 3]", output: "6", explanation: "1+2+3 = 6" },
  },
  {
    id: "py-ini-easy-2",
    phase: 2,
    level: "Iniciante",
    difficulty: "easy",
    title: "Maior e menor da lista",
    description:
      "Dada uma lista de números, retorne uma tupla com o menor e o maior valor.",
    requirements: [
      "A função recebe uma lista `numeros` com pelo menos 1 elemento.",
      "Retorne uma tupla `(menor, maior)`.",
    ],
    starterCode:
      "def resolver(numeros):\n    # Retorne (menor, maior)\n    pass\n",
    solution: "def resolver(numeros):\n    return (min(numeros), max(numeros))\n",
    testCases: [
      { input: "[3, 1, 4, 1, 5, 9]", expected: "(1, 9)", description: "Lista variada" },
      { input: "[7]", expected: "(7, 7)", description: "Um elemento" },
      { input: "[-5, 0, 5]", expected: "(-5, 5)", description: "Negativos" },
      { input: "[2, 2, 2]", expected: "(2, 2)", description: "Iguais" },
      { input: "[100, 50, 75]", expected: "(50, 100)", description: "Ordem diferente" },
    ],
    hint: "Use as funções built-in `min()` e `max()`.",
    example: { input: "[3, 1, 4]", output: "(1, 4)", explanation: "Menor é 1, maior é 4" },
  },
  {
    id: "py-ini-easy-3",
    phase: 3,
    level: "Iniciante",
    difficulty: "easy",
    title: "Contar vogais",
    description:
      "Dada uma string, retorne quantas vogais (a, e, i, o, u — maiúsculas ou minúsculas) ela contém.",
    requirements: [
      "A função recebe uma string `texto`.",
      "Conte as letras a, e, i, o, u (case-insensitive).",
      "Retorne o total como inteiro.",
    ],
    starterCode:
      "def resolver(texto):\n    # Conte as vogais\n    pass\n",
    solution:
      "def resolver(texto):\n    return sum(1 for c in texto.lower() if c in 'aeiou')\n",
    testCases: [
      { input: "'Hello World'", expected: "3", description: "Frase simples" },
      { input: "'Python'", expected: "1", description: "Uma vogal" },
      { input: "'AEIOU'", expected: "5", description: "Maiúsculas" },
      { input: "'xyz'", expected: "0", description: "Sem vogais" },
      { input: "''", expected: "0", description: "String vazia" },
    ],
    hint: "Converta para minúsculas com `.lower()` antes de verificar.",
    example: { input: "'Python'", output: "1", explanation: "Apenas o 'o' é vogal" },
  },
  {
    id: "py-ini-easy-4",
    phase: 4,
    level: "Iniciante",
    difficulty: "easy",
    title: "Inverter string",
    description: "Dada uma string, retorne ela invertida.",
    requirements: [
      "A função recebe uma string `texto`.",
      "Retorne a string com os caracteres na ordem inversa.",
    ],
    starterCode:
      "def resolver(texto):\n    # Retorne o texto invertido\n    pass\n",
    solution: "def resolver(texto):\n    return texto[::-1]\n",
    testCases: [
      { input: "'Python'", expected: "nohtyP", description: "Palavra simples" },
      { input: "'abcde'", expected: "edcba", description: "Sequência" },
      { input: "'racecar'", expected: "racecar", description: "Palíndromo" },
      { input: "''", expected: "", description: "String vazia" },
      { input: "'a'", expected: "a", description: "Um caractere" },
    ],
    hint: "Use o slice `[::-1]` para inverter sequências em Python.",
    example: { input: "'hello'", output: "olleh", explanation: "Caracteres na ordem inversa" },
  },
  {
    id: "py-ini-easy-5",
    phase: 5,
    level: "Iniciante",
    difficulty: "easy",
    title: "Verificar palíndromo",
    description:
      "Dado uma string, retorne True se ela é um palíndromo (igual lida de frente e de trás), False caso contrário. Ignore maiúsculas/minúsculas e espaços.",
    requirements: [
      "A função recebe uma string `texto`.",
      "Remova espaços e converta para minúsculas antes de comparar.",
      "Retorne True ou False.",
    ],
    starterCode:
      "def resolver(texto):\n    # Retorne True se for palíndromo\n    pass\n",
    solution:
      "def resolver(texto):\n    s = texto.lower().replace(' ', '')\n    return s == s[::-1]\n",
    testCases: [
      { input: "'racecar'", expected: "True", description: "Palíndromo simples" },
      { input: "'A man a plan a canal Panama'", expected: "True", description: "Com espaços" },
      { input: "'Python'", expected: "False", description: "Não é palíndromo" },
      { input: "'Abba'", expected: "True", description: "Case-insensitive" },
      { input: "'a'", expected: "True", description: "Um caractere" },
    ],
    hint: "Normalize o texto (lowercase + sem espaços) e compare com o inverso.",
    example: { input: "'racecar'", output: "True", explanation: "'racecar' lido ao contrário é 'racecar'" },
  },
];

// ---------------------------------------------------------------------------
// INICIANTE + MEDIUM (5 fases)
// ---------------------------------------------------------------------------
const iniciante_medium: PythonChallenge[] = [
  {
    id: "py-ini-med-1",
    phase: 1,
    level: "Iniciante",
    difficulty: "medium",
    title: "FizzBuzz",
    description:
      "Para cada número de 1 a N (inclusive), adicione à lista: 'FizzBuzz' se divisível por 3 e 5, 'Fizz' se divisível por 3, 'Buzz' se divisível por 5, ou o número como string.",
    requirements: [
      "A função recebe um inteiro `n`.",
      "Retorne uma lista de strings com as regras do FizzBuzz.",
    ],
    starterCode:
      "def resolver(n):\n    resultado = []\n    # Complete o FizzBuzz\n    return resultado\n",
    solution:
      "def resolver(n):\n    resultado = []\n    for i in range(1, n + 1):\n        if i % 15 == 0:\n            resultado.append('FizzBuzz')\n        elif i % 3 == 0:\n            resultado.append('Fizz')\n        elif i % 5 == 0:\n            resultado.append('Buzz')\n        else:\n            resultado.append(str(i))\n    return resultado\n",
    testCases: [
      { input: "15", expected: "['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']", description: "N=15" },
      { input: "1", expected: "['1']", description: "N=1" },
      { input: "5", expected: "['1', '2', 'Fizz', '4', 'Buzz']", description: "N=5" },
      { input: "3", expected: "['1', '2', 'Fizz']", description: "N=3" },
      { input: "0", expected: "[]", description: "N=0" },
    ],
    hint: "Verifique divisibilidade por 15 primeiro (para FizzBuzz), depois por 3, depois por 5.",
    example: { input: "5", output: "['1', '2', 'Fizz', '4', 'Buzz']", explanation: "3 → Fizz, 5 → Buzz" },
  },
  {
    id: "py-ini-med-2",
    phase: 2,
    level: "Iniciante",
    difficulty: "medium",
    title: "Remover duplicatas mantendo ordem",
    description:
      "Dada uma lista, retorne uma nova lista sem duplicatas, mantendo a ordem da primeira aparição.",
    requirements: [
      "A função recebe uma lista `itens`.",
      "Retorne os itens únicos na ordem em que apareceram pela primeira vez.",
    ],
    starterCode:
      "def resolver(itens):\n    # Remova duplicatas mantendo a ordem\n    pass\n",
    solution:
      "def resolver(itens):\n    vistos = set()\n    resultado = []\n    for item in itens:\n        if item not in vistos:\n            vistos.add(item)\n            resultado.append(item)\n    return resultado\n",
    testCases: [
      { input: "[1, 2, 3, 2, 1, 4]", expected: "[1, 2, 3, 4]", description: "Inteiros" },
      { input: "['a', 'b', 'a', 'c']", expected: "['a', 'b', 'c']", description: "Strings" },
      { input: "[]", expected: "[]", description: "Lista vazia" },
      { input: "[1, 1, 1]", expected: "[1]", description: "Todos iguais" },
      { input: "[3, 1, 2]", expected: "[3, 1, 2]", description: "Sem duplicatas" },
    ],
    hint: "Use um `set` para controlar o que já foi visto, e uma lista para manter a ordem.",
    example: { input: "[1,2,1,3]", output: "[1, 2, 3]", explanation: "Segundo '1' removido" },
  },
  {
    id: "py-ini-med-3",
    phase: 3,
    level: "Iniciante",
    difficulty: "medium",
    title: "Contagem de palavras",
    description:
      "Dada uma string de texto, retorne um dicionário com a frequência de cada palavra (case-insensitive).",
    requirements: [
      "A função recebe uma string `texto`.",
      "Divida por espaços e conte cada palavra em minúsculas.",
      "Retorne um dicionário `{palavra: contagem}`.",
    ],
    starterCode:
      "def resolver(texto):\n    contagem = {}\n    # Conte as palavras\n    return contagem\n",
    solution:
      "def resolver(texto):\n    contagem = {}\n    for palavra in texto.lower().split():\n        contagem[palavra] = contagem.get(palavra, 0) + 1\n    return contagem\n",
    testCases: [
      { input: "'ola mundo ola'", expected: "{'ola': 2, 'mundo': 1}", description: "Palavra repetida" },
      { input: "'Python é incrível'", expected: "{'python': 1, 'é': 1, 'incrível': 1}", description: "Sem repetição" },
      { input: "'a a a'", expected: "{'a': 3}", description: "Três repetições" },
      { input: "''", expected: "{}", description: "Texto vazio" },
      { input: "'Ola OLA ola'", expected: "{'ola': 3}", description: "Case-insensitive" },
    ],
    hint: "Use `.lower().split()` para dividir as palavras normalizadas.",
    example: { input: "'oi oi tchau'", output: "{'oi': 2, 'tchau': 1}", explanation: "'oi' aparece 2 vezes" },
  },
  {
    id: "py-ini-med-4",
    phase: 4,
    level: "Iniciante",
    difficulty: "medium",
    title: "Sequência de Fibonacci",
    description:
      "Dado um inteiro N, retorne uma lista com os primeiros N números da sequência de Fibonacci.",
    requirements: [
      "A função recebe um inteiro `n`.",
      "Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13...",
      "Para n=0 retorne [], para n=1 retorne [0].",
    ],
    starterCode:
      "def resolver(n):\n    # Retorne os primeiros n números de Fibonacci\n    pass\n",
    solution:
      "def resolver(n):\n    if n == 0: return []\n    if n == 1: return [0]\n    seq = [0, 1]\n    while len(seq) < n:\n        seq.append(seq[-1] + seq[-2])\n    return seq\n",
    testCases: [
      { input: "7", expected: "[0, 1, 1, 2, 3, 5, 8]", description: "7 primeiros" },
      { input: "0", expected: "[]", description: "N=0" },
      { input: "1", expected: "[0]", description: "N=1" },
      { input: "2", expected: "[0, 1]", description: "N=2" },
      { input: "10", expected: "[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]", description: "10 primeiros" },
    ],
    hint: "Cada número é a soma dos dois anteriores. Comece com [0, 1].",
    example: { input: "5", output: "[0, 1, 1, 2, 3]", explanation: "Primeiros 5 da sequência" },
  },
  {
    id: "py-ini-med-5",
    phase: 5,
    level: "Iniciante",
    difficulty: "medium",
    title: "Anagramas",
    description:
      "Dadas duas strings, retorne True se são anagramas (mesmas letras, ordem diferente), False caso contrário. Ignore espaços e maiúsculas.",
    requirements: [
      "A função recebe `s1` e `s2`.",
      "Ignore espaços e diferenças de maiúscula/minúscula.",
      "Retorne True ou False.",
    ],
    starterCode:
      "def resolver(s1, s2):\n    # Verifique se s1 e s2 são anagramas\n    pass\n",
    solution:
      "def resolver(s1, s2):\n    normalize = lambda s: sorted(s.lower().replace(' ', ''))\n    return normalize(s1) == normalize(s2)\n",
    testCases: [
      { input: "'listen', 'silent'", expected: "True", description: "Anagrama clássico" },
      { input: "'hello', 'world'", expected: "False", description: "Não é anagrama" },
      { input: "'Astronomer', 'Moon starer'", expected: "True", description: "Com espaços" },
      { input: "'abc', 'cba'", expected: "True", description: "Invertido" },
      { input: "'abc', 'abcd'", expected: "False", description: "Tamanhos diferentes" },
    ],
    hint: "Normalize as duas strings (lowercase, sem espaços), ordene e compare.",
    example: { input: "'listen', 'silent'", output: "True", explanation: "Mesmas letras, ordens diferentes" },
  },
];

// ---------------------------------------------------------------------------
// INICIANTE + HARD (5 fases)
// ---------------------------------------------------------------------------
const iniciante_hard: PythonChallenge[] = [
  {
    id: "py-ini-hard-1",
    phase: 1,
    level: "Iniciante",
    difficulty: "hard",
    title: "Número Romano para Inteiro",
    description:
      "Converta um número romano (string) para seu valor inteiro correspondente.",
    requirements: [
      "A função recebe uma string `romano` com algarismos romanos válidos.",
      "Valores: I=1, V=5, X=10, L=50, C=100, D=500, M=1000.",
      "Quando um valor menor precede um maior, subtrai (ex: IV=4).",
    ],
    starterCode:
      "def resolver(romano):\n    # Converta romano para inteiro\n    pass\n",
    solution:
      "def resolver(romano):\n    valores = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}\n    total = 0\n    prev = 0\n    for c in reversed(romano):\n        val = valores[c]\n        if val < prev:\n            total -= val\n        else:\n            total += val\n        prev = val\n    return total\n",
    testCases: [
      { input: "'III'", expected: "3", description: "III = 3" },
      { input: "'IV'", expected: "4", description: "IV = 4 (subtração)" },
      { input: "'IX'", expected: "9", description: "IX = 9" },
      { input: "'LVIII'", expected: "58", description: "LVIII = 58" },
      { input: "'MCMXCIV'", expected: "1994", description: "MCMXCIV = 1994" },
    ],
    hint: "Percorra o romano de trás para frente. Se o valor atual for menor que o anterior, subtraia.",
    example: { input: "'XIV'", output: "14", explanation: "X(10) + IV(4) = 14" },
  },
  {
    id: "py-ini-hard-2",
    phase: 2,
    level: "Iniciante",
    difficulty: "hard",
    title: "Matriz transposta",
    description:
      "Dada uma matriz (lista de listas), retorne sua transposta (linhas viram colunas).",
    requirements: [
      "A função recebe `matriz`, uma lista de listas de inteiros.",
      "Retorne a transposta: o elemento [i][j] vira [j][i].",
      "A matriz pode não ser quadrada.",
    ],
    starterCode:
      "def resolver(matriz):\n    # Retorne a transposta da matriz\n    pass\n",
    solution:
      "def resolver(matriz):\n    return [list(linha) for linha in zip(*matriz)]\n",
    testCases: [
      { input: "[[1,2,3],[4,5,6]]", expected: "[[1, 4], [2, 5], [3, 6]]", description: "2x3 → 3x2" },
      { input: "[[1,2],[3,4]]", expected: "[[1, 3], [2, 4]]", description: "2x2" },
      { input: "[[1]]", expected: "[[1]]", description: "1x1" },
      { input: "[[1,2,3]]", expected: "[[1], [2], [3]]", description: "1x3 → 3x1" },
      { input: "[[1],[2],[3]]", expected: "[[1, 2, 3]]", description: "3x1 → 1x3" },
    ],
    hint: "Use `zip(*matriz)` para transpor, e converta cada elemento para lista.",
    example: { input: "[[1,2],[3,4]]", output: "[[1, 3], [2, 4]]", explanation: "Linhas viram colunas" },
  },
  {
    id: "py-ini-hard-3",
    phase: 3,
    level: "Iniciante",
    difficulty: "hard",
    title: "Dois que somam alvo",
    description:
      "Dada uma lista de inteiros e um alvo, retorne os índices dos dois números que somam ao alvo.",
    requirements: [
      "A função recebe `numeros` e `alvo`.",
      "Retorne uma lista `[i, j]` com os índices (i < j).",
      "Garantido que existe exatamente uma solução.",
    ],
    starterCode:
      "def resolver(numeros, alvo):\n    # Retorne os índices dos dois números\n    pass\n",
    solution:
      "def resolver(numeros, alvo):\n    vistos = {}\n    for i, n in enumerate(numeros):\n        complemento = alvo - n\n        if complemento in vistos:\n            return [vistos[complemento], i]\n        vistos[n] = i\n    return []\n",
    testCases: [
      { input: "[2, 7, 11, 15], 9", expected: "[0, 1]", description: "2+7=9" },
      { input: "[3, 2, 4], 6", expected: "[1, 2]", description: "2+4=6" },
      { input: "[3, 3], 6", expected: "[0, 1]", description: "Iguais" },
      { input: "[1, 5, 3, 2], 5", expected: "[1, 3]", description: "5+0 não, 3+2=5" },
      { input: "[0, 4, 3, 0], 0", expected: "[0, 3]", description: "Zeros" },
    ],
    hint: "Use um dicionário para guardar índices já visitados e procure o complemento.",
    example: { input: "[2, 7, 11], 9", output: "[0, 1]", explanation: "2+7=9, índices 0 e 1" },
  },
  {
    id: "py-ini-hard-4",
    phase: 4,
    level: "Iniciante",
    difficulty: "hard",
    title: "Equilibrar parênteses",
    description:
      "Dada uma string contendo apenas `(`, `)`, `{`, `}`, `[`, `]`, determine se os parênteses estão balanceados.",
    requirements: [
      "A função recebe uma string `s`.",
      "Retorne True se todos os pares estão corretamente abertos e fechados.",
      "Retorne False caso contrário.",
    ],
    starterCode:
      "def resolver(s):\n    # Verifique se os parênteses estão balanceados\n    pass\n",
    solution:
      "def resolver(s):\n    pilha = []\n    pares = {')': '(', '}': '{', ']': '['}\n    for c in s:\n        if c in '({[':\n            pilha.append(c)\n        elif c in ')}]':\n            if not pilha or pilha[-1] != pares[c]:\n                return False\n            pilha.pop()\n    return len(pilha) == 0\n",
    testCases: [
      { input: "'()'", expected: "True", description: "Par simples" },
      { input: "'()[]{}'", expected: "True", description: "Múltiplos tipos" },
      { input: "'(]'", expected: "False", description: "Tipo errado" },
      { input: "'([)]'", expected: "False", description: "Ordem errada" },
      { input: "'{[]}'", expected: "True", description: "Aninhado" },
    ],
    hint: "Use uma pilha (lista). Empilhe aberturas e desempilhe ao encontrar fechamentos.",
    example: { input: "'({[]})'", output: "True", explanation: "Todos os pares estão corretos" },
  },
  {
    id: "py-ini-hard-5",
    phase: 5,
    level: "Iniciante",
    difficulty: "hard",
    title: "Comprimir string",
    description:
      "Implemente compressão básica de string: substitua sequências de caracteres repetidos pela letra seguida da contagem. Se a string comprimida não for menor, retorne a original.",
    requirements: [
      "A função recebe uma string `s`.",
      "Ex: 'aabcccdddd' → 'a2b1c3d4'.",
      "Se o resultado comprimido for >= original, retorne a original.",
    ],
    starterCode:
      "def resolver(s):\n    # Comprima a string\n    pass\n",
    solution:
      "def resolver(s):\n    if not s:\n        return s\n    comprimida = ''\n    contagem = 1\n    for i in range(1, len(s)):\n        if s[i] == s[i-1]:\n            contagem += 1\n        else:\n            comprimida += s[i-1] + str(contagem)\n            contagem = 1\n    comprimida += s[-1] + str(contagem)\n    return comprimida if len(comprimida) < len(s) else s\n",
    testCases: [
      { input: "'aabcccdddd'", expected: "a2b1c3d4", description: "Comprime" },
      { input: "'abc'", expected: "abc", description: "Não reduz (a1b1c1 >= abc)" },
      { input: "'aaa'", expected: "a3", description: "Todos iguais, comprime" },
      { input: "'aabb'", expected: "aabb", description: "a2b2 = 4, original = 4, retorna original" },
      { input: "''", expected: "", description: "Vazia" },
    ],
    hint: "Percorra a string contando repetições. Compare o tamanho antes de retornar.",
    example: { input: "'aabccc'", output: "a2b1c3", explanation: "Cada grupo vira letra+contagem" },
  },
];

// ---------------------------------------------------------------------------
// INTERMEDIÁRIO + EASY (5 fases)
// ---------------------------------------------------------------------------
const intermediario_easy: PythonChallenge[] = [
  {
    id: "py-int-easy-1",
    phase: 1,
    level: "Intermediário",
    difficulty: "easy",
    title: "List comprehension — quadrados pares",
    description:
      "Dado um inteiro N, retorne uma lista com os quadrados de todos os números pares de 1 a N (inclusive), usando list comprehension.",
    requirements: [
      "A função recebe um inteiro `n`.",
      "Retorne os quadrados dos números pares de 1 a N.",
      "Use list comprehension em uma única linha.",
    ],
    starterCode:
      "def resolver(n):\n    # Retorne os quadrados dos pares de 1 a n (list comprehension)\n    pass\n",
    solution:
      "def resolver(n):\n    return [x**2 for x in range(1, n+1) if x % 2 == 0]\n",
    testCases: [
      { input: "10", expected: "[4, 16, 36, 64, 100]", description: "N=10" },
      { input: "1", expected: "[]", description: "N=1, sem pares" },
      { input: "4", expected: "[4, 16]", description: "N=4" },
      { input: "6", expected: "[4, 16, 36]", description: "N=6" },
      { input: "0", expected: "[]", description: "N=0" },
    ],
    hint: "Use `[x**2 for x in range(1, n+1) if x % 2 == 0]`.",
    example: { input: "6", output: "[4, 16, 36]", explanation: "2²=4, 4²=16, 6²=36" },
  },
  {
    id: "py-int-easy-2",
    phase: 2,
    level: "Intermediário",
    difficulty: "easy",
    title: "Filtrar e transformar com map/filter",
    description:
      "Dada uma lista de strings, retorne uma nova lista contendo apenas as strings com mais de 3 caracteres, transformadas para maiúsculas.",
    requirements: [
      "A função recebe uma lista `palavras`.",
      "Filtre palavras com comprimento > 3.",
      "Transforme cada uma para maiúsculas.",
      "Retorne a lista resultante.",
    ],
    starterCode:
      "def resolver(palavras):\n    # Filtre e transforme a lista\n    pass\n",
    solution:
      "def resolver(palavras):\n    return [p.upper() for p in palavras if len(p) > 3]\n",
    testCases: [
      { input: "['oi', 'python', 'dev', 'code']", expected: "['PYTHON', 'CODE']", description: "Mix de tamanhos" },
      { input: "['a', 'bb', 'ccc']", expected: "[]", description: "Nenhuma passa o filtro" },
      { input: "['hello', 'world']", expected: "['HELLO', 'WORLD']", description: "Todas passam" },
      { input: "[]", expected: "[]", description: "Lista vazia" },
      { input: "['abcd', 'abc', 'ab']", expected: "['ABCD']", description: "Exatamente 4" },
    ],
    hint: "Combine filter (len > 3) e map (upper) em uma list comprehension.",
    example: { input: "['oi', 'python']", output: "['PYTHON']", explanation: "'oi' tem ≤ 3 chars" },
  },
  {
    id: "py-int-easy-3",
    phase: 3,
    level: "Intermediário",
    difficulty: "easy",
    title: "Achatar lista aninhada",
    description:
      "Dada uma lista que pode conter sublistas (um nível de aninhamento), retorne uma lista plana com todos os elementos.",
    requirements: [
      "A função recebe `lista`, que pode conter inteiros ou listas de inteiros.",
      "Retorne todos os elementos em uma lista plana.",
      "Apenas um nível de aninhamento (não recursivo).",
    ],
    starterCode:
      "def resolver(lista):\n    # Achate a lista\n    pass\n",
    solution:
      "def resolver(lista):\n    return [item for sublist in lista for item in (sublist if isinstance(sublist, list) else [sublist])]\n",
    testCases: [
      { input: "[[1,2],[3,4],[5]]", expected: "[1, 2, 3, 4, 5]", description: "Sublistas" },
      { input: "[1, [2,3], 4]", expected: "[1, 2, 3, 4]", description: "Mistura" },
      { input: "[]", expected: "[]", description: "Vazia" },
      { input: "[[1],[2],[3]]", expected: "[1, 2, 3]", description: "Sublistas unitárias" },
      { input: "[1, 2, 3]", expected: "[1, 2, 3]", description: "Já plana" },
    ],
    hint: "Use list comprehension duplo: `[item for sub in lista for item in sub]` (se todos são sublistas).",
    example: { input: "[[1,2],[3]]", output: "[1, 2, 3]", explanation: "Sublistas concatenadas" },
  },
  {
    id: "py-int-easy-4",
    phase: 4,
    level: "Intermediário",
    difficulty: "easy",
    title: "Agrupar por chave",
    description:
      "Dada uma lista de tuplas (chave, valor), retorne um dicionário agrupando os valores por chave.",
    requirements: [
      "A função recebe uma lista de tuplas `pares`.",
      "Agrupe os valores em listas por chave.",
      "Retorne um dicionário `{chave: [valores...]}`.",
    ],
    starterCode:
      "def resolver(pares):\n    grupos = {}\n    # Agrupe por chave\n    return grupos\n",
    solution:
      "def resolver(pares):\n    grupos = {}\n    for chave, valor in pares:\n        grupos.setdefault(chave, []).append(valor)\n    return grupos\n",
    testCases: [
      { input: "[('a',1),('b',2),('a',3)]", expected: "{'a': [1, 3], 'b': [2]}", description: "Chave repetida" },
      { input: "[('x',10)]", expected: "{'x': [10]}", description: "Uma tupla" },
      { input: "[]", expected: "{}", description: "Vazio" },
      { input: "[('a',1),('a',2),('a',3)]", expected: "{'a': [1, 2, 3]}", description: "Mesma chave" },
      { input: "[('a',1),('b',2),('c',3)]", expected: "{'a': [1], 'b': [2], 'c': [3]}", description: "Chaves únicas" },
    ],
    hint: "Use `dict.setdefault(chave, []).append(valor)` para criar a lista automaticamente.",
    example: { input: "[('a',1),('b',2),('a',3)]", output: "{'a': [1, 3], 'b': [2]}", explanation: "Valores agrupados por chave" },
  },
  {
    id: "py-int-easy-5",
    phase: 5,
    level: "Intermediário",
    difficulty: "easy",
    title: "Top N mais frequentes",
    description:
      "Dada uma lista e um inteiro N, retorne os N elementos mais frequentes em ordem decrescente de frequência.",
    requirements: [
      "A função recebe `itens` e `n`.",
      "Retorne os N mais frequentes. Em caso de empate, qualquer ordem é aceita.",
    ],
    starterCode:
      "def resolver(itens, n):\n    # Retorne os N mais frequentes\n    pass\n",
    solution:
      "from collections import Counter\ndef resolver(itens, n):\n    return [item for item, _ in Counter(itens).most_common(n)]\n",
    testCases: [
      { input: "[1,1,1,2,2,3], 2", expected: "[1, 2]", description: "Top 2" },
      { input: "['a','b','a','c','b','a'], 1", expected: "['a']", description: "Mais frequente" },
      { input: "[1,2,3], 3", expected: "[1, 2, 3]", description: "Todos empatados" },
      { input: "[5,5,5], 1", expected: "[5]", description: "Todos iguais" },
      { input: "[1,2,2,3,3,3], 2", expected: "[3, 2]", description: "Top 2 por frequência" },
    ],
    hint: "Use `collections.Counter` e seu método `.most_common(n)`.",
    example: { input: "[1,1,2,3], 2", output: "[1, 2]", explanation: "1 aparece 2x, 2 e 3 aparecem 1x" },
  },
];

// ---------------------------------------------------------------------------
// INTERMEDIÁRIO + MEDIUM (5 fases)
// ---------------------------------------------------------------------------
const intermediario_medium: PythonChallenge[] = [
  {
    id: "py-int-med-1",
    phase: 1,
    level: "Intermediário",
    difficulty: "medium",
    title: "Busca binária",
    description:
      "Implemente a busca binária. Dada uma lista ordenada e um alvo, retorne o índice do alvo ou -1 se não existir.",
    requirements: [
      "A função recebe `lista` (ordenada) e `alvo`.",
      "Implemente busca binária (não use `.index()`).",
      "Retorne o índice ou -1.",
    ],
    starterCode:
      "def resolver(lista, alvo):\n    # Implemente busca binária\n    pass\n",
    solution:
      "def resolver(lista, alvo):\n    esq, dir = 0, len(lista) - 1\n    while esq <= dir:\n        meio = (esq + dir) // 2\n        if lista[meio] == alvo:\n            return meio\n        elif lista[meio] < alvo:\n            esq = meio + 1\n        else:\n            dir = meio - 1\n    return -1\n",
    testCases: [
      { input: "[1,3,5,7,9], 5", expected: "2", description: "Elemento no meio" },
      { input: "[1,3,5,7,9], 9", expected: "4", description: "Último elemento" },
      { input: "[1,3,5,7,9], 1", expected: "0", description: "Primeiro elemento" },
      { input: "[1,3,5,7,9], 6", expected: "-1", description: "Não existe" },
      { input: "[], 5", expected: "-1", description: "Lista vazia" },
    ],
    hint: "Mantenha ponteiros `esq` e `dir`. O meio é `(esq + dir) // 2`.",
    example: { input: "[1,3,5,7], 7", output: "3", explanation: "7 está no índice 3" },
  },
  {
    id: "py-int-med-2",
    phase: 2,
    level: "Intermediário",
    difficulty: "medium",
    title: "Mergesort",
    description:
      "Implemente o algoritmo Merge Sort para ordenar uma lista de inteiros.",
    requirements: [
      "A função recebe uma lista `numeros`.",
      "Implemente Merge Sort recursivamente.",
      "Retorne a lista ordenada (não modifique a original).",
    ],
    starterCode:
      "def resolver(numeros):\n    # Implemente Merge Sort\n    pass\n",
    solution:
      "def resolver(numeros):\n    if len(numeros) <= 1:\n        return numeros\n    meio = len(numeros) // 2\n    esq = resolver(numeros[:meio])\n    dir = resolver(numeros[meio:])\n    return merge(esq, dir)\n\ndef merge(esq, dir):\n    resultado = []\n    i = j = 0\n    while i < len(esq) and j < len(dir):\n        if esq[i] <= dir[j]:\n            resultado.append(esq[i]); i += 1\n        else:\n            resultado.append(dir[j]); j += 1\n    return resultado + esq[i:] + dir[j:]\n",
    testCases: [
      { input: "[38,27,43,3,9,82,10]", expected: "[3, 9, 10, 27, 38, 43, 82]", description: "Lista aleatória" },
      { input: "[5,4,3,2,1]", expected: "[1, 2, 3, 4, 5]", description: "Invertida" },
      { input: "[1]", expected: "[1]", description: "Um elemento" },
      { input: "[]", expected: "[]", description: "Vazia" },
      { input: "[3,3,1,2]", expected: "[1, 2, 3, 3]", description: "Duplicatas" },
    ],
    hint: "Divida ao meio, ordene cada metade recursivamente e mescle as duas partes.",
    example: { input: "[3,1,2]", output: "[1, 2, 3]", explanation: "Merge Sort divide e mescla" },
  },
  {
    id: "py-int-med-3",
    phase: 3,
    level: "Intermediário",
    difficulty: "medium",
    title: "Validar sudoku parcial",
    description:
      "Dada uma linha de 9 números (0 representa vazio), verifique se ela é válida: nenhum número de 1 a 9 se repete (zeros são ignorados).",
    requirements: [
      "A função recebe uma lista de 9 inteiros `linha` (0 = vazio).",
      "Retorne True se nenhum número 1-9 se repete.",
      "Zeros são ignorados.",
    ],
    starterCode:
      "def resolver(linha):\n    # Valide a linha do sudoku\n    pass\n",
    solution:
      "def resolver(linha):\n    numeros = [n for n in linha if n != 0]\n    return len(numeros) == len(set(numeros))\n",
    testCases: [
      { input: "[1,2,3,4,5,6,7,8,9]", expected: "True", description: "Linha completa válida" },
      { input: "[1,2,3,4,5,6,7,8,8]", expected: "False", description: "8 repetido" },
      { input: "[0,0,0,0,0,0,0,0,0]", expected: "True", description: "Tudo vazio" },
      { input: "[1,0,3,0,5,0,7,0,9]", expected: "True", description: "Parcialmente preenchido" },
      { input: "[1,1,0,0,0,0,0,0,0]", expected: "False", description: "1 repetido" },
    ],
    hint: "Filtre os zeros, depois compare `len` com `len(set(...))`.",
    example: { input: "[1,2,0,4,0,6,7,0,9]", output: "True", explanation: "Sem repetições nos não-zeros" },
  },
  {
    id: "py-int-med-4",
    phase: 4,
    level: "Intermediário",
    difficulty: "medium",
    title: "Subarray de soma máxima (Kadane)",
    description:
      "Dado um array de inteiros, encontre a soma máxima de um subarray contíguo (algoritmo de Kadane).",
    requirements: [
      "A função recebe uma lista `numeros` com pelo menos um elemento.",
      "Retorne a soma máxima (pode ser negativa se todos forem negativos).",
    ],
    starterCode:
      "def resolver(numeros):\n    # Algoritmo de Kadane\n    pass\n",
    solution:
      "def resolver(numeros):\n    max_atual = max_global = numeros[0]\n    for n in numeros[1:]:\n        max_atual = max(n, max_atual + n)\n        max_global = max(max_global, max_atual)\n    return max_global\n",
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expected: "6", description: "Exemplo clássico [4,-1,2,1]=6" },
      { input: "[1]", expected: "1", description: "Um elemento" },
      { input: "[-1,-2,-3]", expected: "-1", description: "Todos negativos" },
      { input: "[5,4,-1,7,8]", expected: "23", description: "Array todo positivo" },
      { input: "[-2,-3,4,-1,-2,1,5,-3]", expected: "7", description: "[4,-1,-2,1,5]=7" },
    ],
    hint: "Atualize `max_atual = max(n, max_atual + n)`. Se max_atual ficar negativo, recomece do próximo.",
    example: { input: "[-2,1,-3,4]", output: "4", explanation: "O subarray [4] tem soma máxima" },
  },
  {
    id: "py-int-med-5",
    phase: 5,
    level: "Intermediário",
    difficulty: "medium",
    title: "Decodificar string RLE",
    description:
      "Decodifique uma string codificada por Run-Length Encoding (RLE). Formato: número seguido de caractere. Ex: '3a2b' → 'aaabb'.",
    requirements: [
      "A função recebe uma string `encoded`.",
      "O formato é sempre: dígito(s) seguido(s) de letra.",
      "Retorne a string decodificada.",
    ],
    starterCode:
      "def resolver(encoded):\n    # Decodifique a string RLE\n    pass\n",
    solution:
      "import re\ndef resolver(encoded):\n    return ''.join(c * int(n) for n, c in re.findall(r'(\\d+)([a-zA-Z])', encoded))\n",
    testCases: [
      { input: "'3a2b1c'", expected: "aaabbc", description: "Exemplo básico" },
      { input: "'1a1b1c'", expected: "abc", description: "Sem repetições" },
      { input: "'5z'", expected: "zzzzz", description: "Uma letra" },
      { input: "'10a2b'", expected: "aaaaaaaaaabb", description: "Dois dígitos" },
      { input: "'3a3a'", expected: "aaaaaa", description: "Mesma letra" },
    ],
    hint: "Use `re.findall(r'(\\d+)([a-zA-Z])', encoded)` para extrair pares (número, letra).",
    example: { input: "'2h3e1y'", output: "hhheeey", explanation: "h×2 + e×3 + y×1" },
  },
];

// ---------------------------------------------------------------------------
// INTERMEDIÁRIO + HARD (5 fases)
// ---------------------------------------------------------------------------
const intermediario_hard: PythonChallenge[] = [
  {
    id: "py-int-hard-1",
    phase: 1,
    level: "Intermediário",
    difficulty: "hard",
    title: "Classe Pilha (Stack)",
    description:
      "Implemente uma classe `Pilha` com os métodos: `empilhar(valor)`, `desempilhar()` (retorna o topo ou None), `topo()` (retorna sem remover), `esta_vazia()`. Teste com a sequência fornecida.",
    requirements: [
      "A função recebe uma lista de operações.",
      "Cada operação é uma tupla: ('empilhar', valor) ou ('desempilhar',) ou ('topo',) ou ('esta_vazia',).",
      "Retorne uma lista com os resultados das operações que retornam valor (desempilhar, topo, esta_vazia).",
    ],
    starterCode:
      "def resolver(operacoes):\n    class Pilha:\n        def __init__(self):\n            self._dados = []\n        def empilhar(self, valor):\n            pass\n        def desempilhar(self):\n            pass\n        def topo(self):\n            pass\n        def esta_vazia(self):\n            pass\n\n    pilha = Pilha()\n    resultados = []\n    for op in operacoes:\n        if op[0] == 'empilhar':\n            pilha.empilhar(op[1])\n        elif op[0] == 'desempilhar':\n            resultados.append(pilha.desempilhar())\n        elif op[0] == 'topo':\n            resultados.append(pilha.topo())\n        elif op[0] == 'esta_vazia':\n            resultados.append(pilha.esta_vazia())\n    return resultados\n",
    solution:
      "def resolver(operacoes):\n    class Pilha:\n        def __init__(self):\n            self._dados = []\n        def empilhar(self, valor):\n            self._dados.append(valor)\n        def desempilhar(self):\n            return self._dados.pop() if self._dados else None\n        def topo(self):\n            return self._dados[-1] if self._dados else None\n        def esta_vazia(self):\n            return len(self._dados) == 0\n    pilha = Pilha()\n    resultados = []\n    for op in operacoes:\n        if op[0] == 'empilhar': pilha.empilhar(op[1])\n        elif op[0] == 'desempilhar': resultados.append(pilha.desempilhar())\n        elif op[0] == 'topo': resultados.append(pilha.topo())\n        elif op[0] == 'esta_vazia': resultados.append(pilha.esta_vazia())\n    return resultados\n",
    testCases: [
      { input: "[('empilhar',1),('empilhar',2),('topo',),('desempilhar',),('esta_vazia',)]", expected: "[2, 2, False]", description: "Sequência básica" },
      { input: "[('esta_vazia',)]", expected: "[True]", description: "Vazia inicial" },
      { input: "[('desempilhar',)]", expected: "[None]", description: "Desempilhar vazia" },
      { input: "[('empilhar',5),('desempilhar',),('esta_vazia',)]", expected: "[5, True]", description: "Empilha e desempilha" },
      { input: "[('empilhar',1),('empilhar',2),('empilhar',3),('desempilhar',),('desempilhar',),('topo',)]", expected: "[3, 2, 1]", description: "LIFO" },
    ],
    hint: "Pilha é LIFO — Last In, First Out. Use `.append()` e `.pop()` da lista Python.",
    example: { input: "[('empilhar',1),('topo',)]", output: "[1]", explanation: "Topo após empilhar 1 é 1" },
  },
  {
    id: "py-int-hard-2",
    phase: 2,
    level: "Intermediário",
    difficulty: "hard",
    title: "Potência sem operador **",
    description:
      "Calcule x elevado a n (x^n) sem usar o operador `**` ou `pow()`. N pode ser negativo.",
    requirements: [
      "A função recebe `x` (float) e `n` (inteiro).",
      "Para n negativo, retorne 1 / x^|n|.",
      "Use exponenciação por quadrado (O(log n)).",
    ],
    starterCode:
      "def resolver(x, n):\n    # Calcule x^n sem ** ou pow()\n    pass\n",
    solution:
      "def resolver(x, n):\n    if n < 0:\n        x = 1 / x\n        n = -n\n    resultado = 1.0\n    while n > 0:\n        if n % 2 == 1:\n            resultado *= x\n        x *= x\n        n //= 2\n    return resultado\n",
    testCases: [
      { input: "2.0, 10", expected: "1024.0", description: "2^10" },
      { input: "2.0, -2", expected: "0.25", description: "Negativo" },
      { input: "2.0, 0", expected: "1.0", description: "Expoente 0" },
      { input: "3.0, 3", expected: "27.0", description: "3^3" },
      { input: "0.5, 2", expected: "0.25", description: "Fracionário" },
    ],
    hint: "Exponenciação por quadrado: se n é par, x^n = (x²)^(n/2). Se ímpar, x * x^(n-1).",
    example: { input: "2.0, 3", output: "8.0", explanation: "2*2*2 = 8.0" },
  },
  {
    id: "py-int-hard-3",
    phase: 3,
    level: "Intermediário",
    difficulty: "hard",
    title: "Contar ilhas",
    description:
      "Dada uma grade (lista de listas) de '1' (terra) e '0' (água), retorne o número de ilhas. Uma ilha é um grupo de 1s conectados horizontalmente ou verticalmente.",
    requirements: [
      "A função recebe `grade`, uma lista de listas de strings '0' ou '1'.",
      "Retorne o número de ilhas.",
      "Use DFS ou BFS para explorar cada ilha.",
    ],
    starterCode:
      "def resolver(grade):\n    # Conte as ilhas\n    pass\n",
    solution:
      "def resolver(grade):\n    if not grade: return 0\n    linhas, colunas = len(grade), len(grade[0])\n    grade = [list(linha) for linha in grade]\n    def dfs(i, j):\n        if i < 0 or i >= linhas or j < 0 or j >= colunas or grade[i][j] != '1': return\n        grade[i][j] = '0'\n        dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1)\n    count = 0\n    for i in range(linhas):\n        for j in range(colunas):\n            if grade[i][j] == '1':\n                dfs(i, j)\n                count += 1\n    return count\n",
    testCases: [
      { input: "[['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]", expected: "1", description: "Uma ilha grande" },
      { input: "[['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]", expected: "3", description: "Três ilhas" },
      { input: "[['0','0','0']]", expected: "0", description: "Sem ilhas" },
      { input: "[['1']]", expected: "1", description: "Uma célula" },
      { input: "[['1','0','1'],['0','1','0'],['1','0','1']]", expected: "5", description: "Tabuleiro xadrez" },
    ],
    hint: "Para cada '1' não visitado, inicie DFS marcando as células como '0' (visitadas) e incremente o contador.",
    example: { input: "[['1','0'],['0','1']]", output: "2", explanation: "Dois grupos isolados" },
  },
  {
    id: "py-int-hard-4",
    phase: 4,
    level: "Intermediário",
    difficulty: "hard",
    title: "Maior retângulo em histograma",
    description:
      "Dado um histograma como lista de alturas, encontre a área do maior retângulo que pode ser formado.",
    requirements: [
      "A função recebe `alturas`, uma lista de inteiros não negativos.",
      "Retorne a maior área possível.",
      "Use uma pilha para solução O(n).",
    ],
    starterCode:
      "def resolver(alturas):\n    # Maior retângulo no histograma\n    pass\n",
    solution:
      "def resolver(alturas):\n    pilha = []\n    max_area = 0\n    alturas = alturas + [0]\n    for i, h in enumerate(alturas):\n        while pilha and alturas[pilha[-1]] > h:\n            altura = alturas[pilha.pop()]\n            largura = i if not pilha else i - pilha[-1] - 1\n            max_area = max(max_area, altura * largura)\n        pilha.append(i)\n    return max_area\n",
    testCases: [
      { input: "[2,1,5,6,2,3]", expected: "10", description: "Clássico" },
      { input: "[2,4]", expected: "4", description: "Dois elementos" },
      { input: "[1]", expected: "1", description: "Um elemento" },
      { input: "[0,0,0]", expected: "0", description: "Zeros" },
      { input: "[3,3,3,3]", expected: "12", description: "Iguais" },
    ],
    hint: "Mantenha uma pilha de índices. Ao encontrar uma altura menor, calcule a área com as alturas na pilha.",
    example: { input: "[2,1,5,6,2,3]", output: "10", explanation: "Retângulo de altura 5 e largura 2 (índices 2-3)" },
  },
  {
    id: "py-int-hard-5",
    phase: 5,
    level: "Intermediário",
    difficulty: "hard",
    title: "Permutações únicas",
    description:
      "Dada uma lista de números (possivelmente com duplicatas), retorne todas as permutações únicas ordenadas.",
    requirements: [
      "A função recebe uma lista `numeros`.",
      "Retorne uma lista de listas com todas as permutações únicas.",
      "Ordene o resultado lexicograficamente.",
    ],
    starterCode:
      "def resolver(numeros):\n    # Retorne todas as permutações únicas\n    pass\n",
    solution:
      "from itertools import permutations\ndef resolver(numeros):\n    return sorted(set(permutations(numeros)))\n",
    testCases: [
      { input: "[1,1,2]", expected: "[(1, 1, 2), (1, 2, 1), (2, 1, 1)]", description: "Com duplicata" },
      { input: "[1,2,3]", expected: "[(1, 2, 3), (1, 3, 2), (2, 1, 3), (2, 3, 1), (3, 1, 2), (3, 2, 1)]", description: "Sem duplicatas" },
      { input: "[1]", expected: "[(1,)]", description: "Um elemento" },
      { input: "[1,1,1]", expected: "[(1, 1, 1)]", description: "Todos iguais" },
      { input: "[2,1]", expected: "[(1, 2), (2, 1)]", description: "Dois elementos" },
    ],
    hint: "Use `itertools.permutations` e `set` para eliminar duplicatas, depois `sorted`.",
    example: { input: "[1,2]", output: "[(1, 2), (2, 1)]", explanation: "Duas permutações" },
  },
];

// ---------------------------------------------------------------------------
// AVANÇADO + EASY (5 fases)
// ---------------------------------------------------------------------------
const avancado_easy: PythonChallenge[] = [
  {
    id: "py-av-easy-1",
    phase: 1,
    level: "Avançado",
    difficulty: "easy",
    title: "Decorator de tempo de execução",
    description:
      "Crie um decorator `cronometrar` que mede e imprime o tempo de execução de uma função. Teste-o com a função fornecida.",
    requirements: [
      "A função recebe uma lista de operações para simular.",
      "Implemente um decorator `cronometrar` usando `functools.wraps`.",
      "Retorne True se o decorator funcionar sem erros.",
    ],
    starterCode:
      "import functools\nimport time\n\ndef resolver(dummy):\n    # Crie o decorator cronometrar\n    def cronometrar(func):\n        pass\n    \n    @cronometrar\n    def funcao_teste():\n        return 42\n    \n    resultado = funcao_teste()\n    return resultado == 42\n",
    solution:
      "import functools\nimport time\n\ndef resolver(dummy):\n    def cronometrar(func):\n        @functools.wraps(func)\n        def wrapper(*args, **kwargs):\n            inicio = time.time()\n            resultado = func(*args, **kwargs)\n            fim = time.time()\n            print(f'{func.__name__} levou {fim-inicio:.4f}s')\n            return resultado\n        return wrapper\n    @cronometrar\n    def funcao_teste():\n        return 42\n    resultado = funcao_teste()\n    return resultado == 42\n",
    testCases: [
      { input: "None", expected: "True", description: "Decorator funciona" },
      { input: "True", expected: "True", description: "Decorator funciona" },
      { input: "[]", expected: "True", description: "Decorator funciona" },
      { input: "0", expected: "True", description: "Decorator funciona" },
      { input: "'test'", expected: "True", description: "Decorator funciona" },
    ],
    hint: "Um decorator é uma função que recebe uma função e retorna uma função. Use `functools.wraps(func)` no wrapper.",
    example: { input: "None", output: "True", explanation: "O decorator deve preservar o valor de retorno" },
  },
  {
    id: "py-av-easy-2",
    phase: 2,
    level: "Avançado",
    difficulty: "easy",
    title: "Generator de números primos",
    description:
      "Crie um generator que produz infinitamente números primos, e retorne os primeiros N primos.",
    requirements: [
      "A função recebe um inteiro `n`.",
      "Use um generator (função com `yield`) para gerar primos.",
      "Retorne uma lista com os primeiros N primos.",
    ],
    starterCode:
      "def resolver(n):\n    def primos():\n        # Generator de primos\n        pass\n    \n    return list(next(g) for g in [primos()] for _ in range(n))\n",
    solution:
      "def resolver(n):\n    def primos():\n        candidato = 2\n        encontrados = []\n        while True:\n            if all(candidato % p != 0 for p in encontrados):\n                encontrados.append(candidato)\n                yield candidato\n            candidato += 1\n    gen = primos()\n    return [next(gen) for _ in range(n)]\n",
    testCases: [
      { input: "5", expected: "[2, 3, 5, 7, 11]", description: "5 primeiros primos" },
      { input: "1", expected: "[2]", description: "Primeiro primo" },
      { input: "10", expected: "[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]", description: "10 primeiros" },
      { input: "0", expected: "[]", description: "Nenhum" },
      { input: "3", expected: "[2, 3, 5]", description: "Três primeiros" },
    ],
    hint: "Um número é primo se não é divisível por nenhum primo anterior. Use `yield` para criar o generator.",
    example: { input: "4", output: "[2, 3, 5, 7]", explanation: "Os 4 primeiros primos" },
  },
  {
    id: "py-av-easy-3",
    phase: 3,
    level: "Avançado",
    difficulty: "easy",
    title: "Context Manager personalizado",
    description:
      "Implemente um context manager `Temporizador` que registra o tempo de execução de um bloco `with`. Retorne o tempo decorrido.",
    requirements: [
      "A função recebe um `dummy` (ignorado).",
      "Implemente `Temporizador` com `__enter__` e `__exit__`.",
      "O objeto retornado por `__enter__` deve ter atributo `elapsed` após o bloco.",
      "Retorne True se o elapsed for >= 0.",
    ],
    starterCode:
      "import time\n\ndef resolver(dummy):\n    class Temporizador:\n        def __enter__(self):\n            pass\n        def __exit__(self, *args):\n            pass\n    \n    with Temporizador() as t:\n        pass\n    \n    return t.elapsed >= 0\n",
    solution:
      "import time\n\ndef resolver(dummy):\n    class Temporizador:\n        def __enter__(self):\n            self._inicio = time.time()\n            return self\n        def __exit__(self, *args):\n            self.elapsed = time.time() - self._inicio\n            return False\n    with Temporizador() as t:\n        pass\n    return t.elapsed >= 0\n",
    testCases: [
      { input: "None", expected: "True", description: "Context manager funciona" },
      { input: "True", expected: "True", description: "Context manager funciona" },
      { input: "0", expected: "True", description: "Context manager funciona" },
      { input: "''", expected: "True", description: "Context manager funciona" },
      { input: "[]", expected: "True", description: "Context manager funciona" },
    ],
    hint: "`__enter__` deve retornar `self` e registrar o início. `__exit__` calcula o elapsed.",
    example: { input: "None", output: "True", explanation: "O tempo decorrido deve ser um número não negativo" },
  },
  {
    id: "py-av-easy-4",
    phase: 4,
    level: "Avançado",
    difficulty: "easy",
    title: "Memoization com functools.lru_cache",
    description:
      "Implemente o cálculo do N-ésimo número de Fibonacci usando memoization com `@functools.lru_cache` para eficiência O(n).",
    requirements: [
      "A função recebe um inteiro `n`.",
      "Use `@functools.lru_cache` para memoizar a recursão.",
      "Retorne o N-ésimo número de Fibonacci (fib(0)=0, fib(1)=1).",
    ],
    starterCode:
      "import functools\n\ndef resolver(n):\n    # Use lru_cache para memoizar o Fibonacci\n    @functools.lru_cache(maxsize=None)\n    def fib(k):\n        pass\n    \n    return fib(n)\n",
    solution:
      "import functools\n\ndef resolver(n):\n    @functools.lru_cache(maxsize=None)\n    def fib(k):\n        if k <= 1: return k\n        return fib(k-1) + fib(k-2)\n    return fib(n)\n",
    testCases: [
      { input: "0", expected: "0", description: "fib(0)" },
      { input: "1", expected: "1", description: "fib(1)" },
      { input: "10", expected: "55", description: "fib(10)" },
      { input: "20", expected: "6765", description: "fib(20)" },
      { input: "30", expected: "832040", description: "fib(30)" },
    ],
    hint: "Decore `fib` com `@functools.lru_cache(maxsize=None)` e implemente a recursão simples.",
    example: { input: "7", output: "13", explanation: "Sequência: 0,1,1,2,3,5,8,13 → fib(7)=13" },
  },
  {
    id: "py-av-easy-5",
    phase: 5,
    level: "Avançado",
    difficulty: "easy",
    title: "Iterator personalizado",
    description:
      "Crie um iterator `Intervalo` que funciona como `range`, mas aceita um step opcional e suporta `__len__` para calcular o tamanho.",
    requirements: [
      "A função recebe `inicio`, `fim` e `step` (padrão 1).",
      "Retorne uma lista com os valores gerados pelo iterador.",
      "Implemente `__iter__` e `__next__`.",
    ],
    starterCode:
      "def resolver(inicio, fim, step=1):\n    class Intervalo:\n        def __init__(self, inicio, fim, step):\n            pass\n        def __iter__(self):\n            pass\n        def __next__(self):\n            pass\n    \n    return list(Intervalo(inicio, fim, step))\n",
    solution:
      "def resolver(inicio, fim, step=1):\n    class Intervalo:\n        def __init__(self, inicio, fim, step):\n            self.atual = inicio\n            self.fim = fim\n            self.step = step\n        def __iter__(self):\n            return self\n        def __next__(self):\n            if (self.step > 0 and self.atual >= self.fim) or (self.step < 0 and self.atual <= self.fim):\n                raise StopIteration\n            valor = self.atual\n            self.atual += self.step\n            return valor\n    return list(Intervalo(inicio, fim, step))\n",
    testCases: [
      { input: "0, 5, 1", expected: "[0, 1, 2, 3, 4]", description: "Step 1" },
      { input: "0, 10, 2", expected: "[0, 2, 4, 6, 8]", description: "Step 2" },
      { input: "5, 0, -1", expected: "[5, 4, 3, 2, 1]", description: "Step negativo" },
      { input: "0, 0, 1", expected: "[]", description: "Vazio" },
      { input: "1, 4, 1", expected: "[1, 2, 3]", description: "1 a 3" },
    ],
    hint: "Levante `StopIteration` quando o valor atual ultrapassar o fim (considerando a direção do step).",
    example: { input: "0, 5, 2", output: "[0, 2, 4]", explanation: "Pasos de 2 de 0 até 5 (exclusive)" },
  },
];

// ---------------------------------------------------------------------------
// AVANÇADO + MEDIUM (5 fases)
// ---------------------------------------------------------------------------
const avancado_medium: PythonChallenge[] = [
  {
    id: "py-av-med-1",
    phase: 1,
    level: "Avançado",
    difficulty: "medium",
    title: "Programação dinâmica — Mochila 0/1",
    description:
      "Dado um conjunto de itens com peso e valor, e uma capacidade máxima W, encontre o valor máximo que pode ser carregado (problema da mochila 0/1).",
    requirements: [
      "A função recebe `pesos` (lista), `valores` (lista) e `capacidade` (inteiro).",
      "Cada item pode ser usado 0 ou 1 vez.",
      "Retorne o valor máximo.",
    ],
    starterCode:
      "def resolver(pesos, valores, capacidade):\n    # Programação dinâmica — Mochila 0/1\n    pass\n",
    solution:
      "def resolver(pesos, valores, capacidade):\n    n = len(pesos)\n    dp = [[0] * (capacidade + 1) for _ in range(n + 1)]\n    for i in range(1, n + 1):\n        for w in range(capacidade + 1):\n            dp[i][w] = dp[i-1][w]\n            if pesos[i-1] <= w:\n                dp[i][w] = max(dp[i][w], dp[i-1][w - pesos[i-1]] + valores[i-1])\n    return dp[n][capacidade]\n",
    testCases: [
      { input: "[1,3,4,5], [1,4,5,7], 7", expected: "9", description: "Clássico" },
      { input: "[2,3,4,5], [3,4,5,6], 5", expected: "7", description: "Cap=5" },
      { input: "[1], [10], 1", expected: "10", description: "Um item" },
      { input: "[10], [10], 5", expected: "0", description: "Item não cabe" },
      { input: "[1,2,3], [6,10,12], 5", expected: "22", description: "Combina 2+3" },
    ],
    hint: "Use tabela DP de (n+1) × (capacidade+1). `dp[i][w] = max(sem item i, com item i)`.",
    example: { input: "[2,3], [3,4], 5", output: "7", explanation: "Pegar ambos: peso 5, valor 7" },
  },
  {
    id: "py-av-med-2",
    phase: 2,
    level: "Avançado",
    difficulty: "medium",
    title: "Menor caminho — BFS em grafo",
    description:
      "Dado um grafo não direcionado (lista de adjacência) e dois nós, encontre o tamanho do menor caminho entre eles.",
    requirements: [
      "A função recebe `grafo` (dicionário de adjacência) e `inicio`, `fim`.",
      "Retorne o número de arestas no menor caminho, ou -1 se não existir.",
      "Use BFS.",
    ],
    starterCode:
      "from collections import deque\n\ndef resolver(grafo, inicio, fim):\n    # BFS para menor caminho\n    pass\n",
    solution:
      "from collections import deque\n\ndef resolver(grafo, inicio, fim):\n    if inicio == fim: return 0\n    visitados = {inicio}\n    fila = deque([(inicio, 0)])\n    while fila:\n        no, dist = fila.popleft()\n        for vizinho in grafo.get(no, []):\n            if vizinho == fim: return dist + 1\n            if vizinho not in visitados:\n                visitados.add(vizinho)\n                fila.append((vizinho, dist + 1))\n    return -1\n",
    testCases: [
      { input: "{'A':['B','C'],'B':['A','D'],'C':['A'],'D':['B']}, 'A', 'D'", expected: "2", description: "A→B→D" },
      { input: "{'A':['B'],'B':['A'],'C':[]}, 'A', 'C'", expected: "-1", description: "Sem caminho" },
      { input: "{'A':['B']}, 'A', 'A'", expected: "0", description: "Mesmo nó" },
      { input: "{'A':['B','C'],'B':['D'],'C':['D'],'D':[]}, 'A', 'D'", expected: "2", description: "Dois caminhos" },
      { input: "{'A':['B'],'B':['C'],'C':['D'],'D':[]}, 'A', 'D'", expected: "3", description: "Caminho longo" },
    ],
    hint: "BFS garante o menor caminho em grafos não ponderados. Use `deque` para eficiência.",
    example: { input: "{'A':['B'],'B':['C']}, 'A', 'C'", output: "2", explanation: "A→B→C = 2 arestas" },
  },
  {
    id: "py-av-med-3",
    phase: 3,
    level: "Avançado",
    difficulty: "medium",
    title: "Expressão regular — extrator de e-mails",
    description:
      "Dado um texto, extraia todos os endereços de e-mail válidos usando expressões regulares.",
    requirements: [
      "A função recebe uma string `texto`.",
      "Extraia e-mails no formato usuario@dominio.extensao.",
      "Retorne uma lista com os e-mails encontrados (sem duplicatas, ordenada).",
    ],
    starterCode:
      "import re\n\ndef resolver(texto):\n    # Extraia os e-mails usando regex\n    pass\n",
    solution:
      "import re\n\ndef resolver(texto):\n    padrao = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'\n    return sorted(set(re.findall(padrao, texto)))\n",
    testCases: [
      { input: "'Contato: joao@email.com e maria@teste.org'", expected: "['joao@email.com', 'maria@teste.org']", description: "Dois e-mails" },
      { input: "'Nenhum e-mail aqui.'", expected: "[]", description: "Sem e-mails" },
      { input: "'a@b.com a@b.com'", expected: "['a@b.com']", description: "Sem duplicatas" },
      { input: "'dev.test+tag@sub.dominio.com.br'", expected: "['dev.test+tag@sub.dominio.com.br']", description: "E-mail complexo" },
      { input: "'admin@geo.io e suporte@geo.io'", expected: "['admin@geo.io', 'suporte@geo.io']", description: "Ordenado" },
    ],
    hint: "Use `re.findall(r'[\\w.+%-]+@[\\w.-]+\\.[a-z]{2,}', texto)` como base.",
    example: { input: "'hello@world.com'", output: "['hello@world.com']", explanation: "E-mail extraído" },
  },
  {
    id: "py-av-med-4",
    phase: 4,
    level: "Avançado",
    difficulty: "medium",
    title: "Ordenação topológica",
    description:
      "Dado um grafo dirigido acíclico (DAG) como lista de dependências, retorne uma ordenação topológica válida usando o algoritmo de Kahn.",
    requirements: [
      "A função recebe `nos` (lista de nós) e `arestas` (lista de tuplas (de, para)).",
      "Retorne uma lista com a ordenação topológica.",
      "Se houver ciclo, retorne lista vazia.",
    ],
    starterCode:
      "from collections import deque\n\ndef resolver(nos, arestas):\n    # Ordenação topológica (Kahn)\n    pass\n",
    solution:
      "from collections import deque, defaultdict\n\ndef resolver(nos, arestas):\n    entrada = {n: 0 for n in nos}\n    adjacencia = defaultdict(list)\n    for u, v in arestas:\n        adjacencia[u].append(v)\n        entrada[v] += 1\n    fila = deque(n for n in nos if entrada[n] == 0)\n    resultado = []\n    while fila:\n        no = fila.popleft()\n        resultado.append(no)\n        for vizinho in adjacencia[no]:\n            entrada[vizinho] -= 1\n            if entrada[vizinho] == 0:\n                fila.append(vizinho)\n    return resultado if len(resultado) == len(nos) else []\n",
    testCases: [
      { input: "['A','B','C','D'], [('A','B'),('B','C'),('A','C'),('C','D')]", expected: "['A', 'B', 'C', 'D']", description: "DAG simples" },
      { input: "['A','B'], [('A','B')]", expected: "['A', 'B']", description: "Uma aresta" },
      { input: "['A','B','C'], [('A','B'),('B','C'),('C','A')]", expected: "[]", description: "Ciclo" },
      { input: "['A'], []", expected: "['A']", description: "Nó isolado" },
      { input: "['A','B','C'], [('A','C'),('B','C')]", expected: "['A', 'B', 'C']", description: "Dois predecessores" },
    ],
    hint: "O algoritmo de Kahn processa nós com grau de entrada 0. Se sobrar nós, há um ciclo.",
    example: { input: "['A','B','C'], [('A','B'),('B','C')]", output: "['A', 'B', 'C']", explanation: "A precede B, que precede C" },
  },
  {
    id: "py-av-med-5",
    phase: 5,
    level: "Avançado",
    difficulty: "medium",
    title: "Subsequência comum mais longa (LCS)",
    description:
      "Dados dois strings s1 e s2, encontre o comprimento da maior subsequência comum (LCS) usando programação dinâmica.",
    requirements: [
      "A função recebe `s1` e `s2`.",
      "Retorne o comprimento da LCS.",
      "Uma subsequência não precisa ser contígua.",
    ],
    starterCode:
      "def resolver(s1, s2):\n    # LCS com programação dinâmica\n    pass\n",
    solution:
      "def resolver(s1, s2):\n    m, n = len(s1), len(s2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if s1[i-1] == s2[j-1]:\n                dp[i][j] = dp[i-1][j-1] + 1\n            else:\n                dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n    return dp[m][n]\n",
    testCases: [
      { input: "'ABCBDAB', 'BDCAB'", expected: "4", description: "BCAB = 4" },
      { input: "'abc', 'abc'", expected: "3", description: "Idênticos" },
      { input: "'abc', 'def'", expected: "0", description: "Sem comum" },
      { input: "'AGGTAB', 'GXTXAYB'", expected: "4", description: "GTAB = 4" },
      { input: "'', 'abc'", expected: "0", description: "Um vazio" },
    ],
    hint: "Use tabela DP. Se s1[i]==s2[j], `dp[i][j] = dp[i-1][j-1] + 1`, senão `max(dp[i-1][j], dp[i][j-1])`.",
    example: { input: "'ABCD', 'ACBD'", output: "3", explanation: "LCS = 'ABD' ou 'ACD' = comprimento 3" },
  },
];

// ---------------------------------------------------------------------------
// AVANÇADO + HARD (5 fases)
// ---------------------------------------------------------------------------
const avancado_hard: PythonChallenge[] = [
  {
    id: "py-av-hard-1",
    phase: 1,
    level: "Avançado",
    difficulty: "hard",
    title: "Implementar LRU Cache",
    description:
      "Implemente uma LRU (Least Recently Used) Cache com operações O(1) get e put. Use um dicionário + lista duplamente encadeada (ou OrderedDict).",
    requirements: [
      "A função recebe uma lista de operações: ('get', chave) ou ('put', chave, valor).",
      "O construtor recebe a capacidade máxima como primeiro elemento: ('init', capacidade).",
      "get retorna o valor ou -1. put insere; se cheio, remove o menos recentemente usado.",
    ],
    starterCode:
      "from collections import OrderedDict\n\ndef resolver(operacoes):\n    cache = None\n    resultados = []\n    \n    class LRUCache:\n        def __init__(self, capacidade):\n            pass\n        def get(self, chave):\n            pass\n        def put(self, chave, valor):\n            pass\n    \n    for op in operacoes:\n        if op[0] == 'init':\n            cache = LRUCache(op[1])\n        elif op[0] == 'get':\n            resultados.append(cache.get(op[1]))\n        elif op[0] == 'put':\n            cache.put(op[1], op[2])\n    return resultados\n",
    solution:
      "from collections import OrderedDict\n\ndef resolver(operacoes):\n    cache = None\n    resultados = []\n    class LRUCache:\n        def __init__(self, cap):\n            self.cap = cap\n            self.cache = OrderedDict()\n        def get(self, chave):\n            if chave not in self.cache: return -1\n            self.cache.move_to_end(chave)\n            return self.cache[chave]\n        def put(self, chave, valor):\n            if chave in self.cache:\n                self.cache.move_to_end(chave)\n            self.cache[chave] = valor\n            if len(self.cache) > self.cap:\n                self.cache.popitem(last=False)\n    for op in operacoes:\n        if op[0] == 'init': cache = LRUCache(op[1])\n        elif op[0] == 'get': resultados.append(cache.get(op[1]))\n        elif op[0] == 'put': cache.put(op[1], op[2])\n    return resultados\n",
    testCases: [
      { input: "[('init',2),('put',1,1),('put',2,2),('get',1),('put',3,3),('get',2),('get',3)]", expected: "[1, -1, 3]", description: "Clássico LRU" },
      { input: "[('init',1),('put',1,1),('put',2,2),('get',1),('get',2)]", expected: "[-1, 2]", description: "Capacidade 1" },
      { input: "[('init',2),('get',1)]", expected: "[-1]", description: "Cache vazia" },
      { input: "[('init',2),('put',1,10),('get',1)]", expected: "[10]", description: "Get simples" },
      { input: "[('init',2),('put',1,1),('put',1,2),('get',1)]", expected: "[2]", description: "Atualizar valor" },
    ],
    hint: "Use `OrderedDict`. `move_to_end` marca como recentemente usado. `popitem(last=False)` remove o mais antigo.",
    example: { input: "[('init',2),('put',1,1),('get',1)]", output: "[1]", explanation: "Insere 1, busca 1 = 1" },
  },
  {
    id: "py-av-hard-2",
    phase: 2,
    level: "Avançado",
    difficulty: "hard",
    title: "Expressão aritmética — notação polonesa reversa",
    description:
      "Avalie uma expressão em notação polonesa reversa (RPN). Tokens são separados por espaços.",
    requirements: [
      "A função recebe uma string `expressao` com tokens separados por espaço.",
      "Operadores: +, -, *, /",
      "A divisão deve ser truncada para zero (inteiro). Retorne o resultado inteiro.",
    ],
    starterCode:
      "def resolver(expressao):\n    # Avalie a expressão RPN\n    pass\n",
    solution:
      "def resolver(expressao):\n    tokens = expressao.split()\n    pilha = []\n    ops = {'+': lambda a,b: a+b, '-': lambda a,b: a-b,\n           '*': lambda a,b: a*b, '/': lambda a,b: int(a/b)}\n    for t in tokens:\n        if t in ops:\n            b, a = pilha.pop(), pilha.pop()\n            pilha.append(ops[t](a, b))\n        else:\n            pilha.append(int(t))\n    return pilha[0]\n",
    testCases: [
      { input: "'2 1 + 3 *'", expected: "9", description: "(2+1)*3" },
      { input: "'4 13 5 / +'", expected: "6", description: "4+(13/5)=4+2=6" },
      { input: "'10 6 9 3 + -11 * / * 17 + 5 +'", expected: "22", description: "Complexo" },
      { input: "'3 4 +'", expected: "7", description: "Simples" },
      { input: "'15 7 1 1 + - / 3 * 2 1 1 + + -'", expected: "5", description: "Múltiplas ops" },
    ],
    hint: "Use uma pilha. Ao encontrar operador, desempilhe dois valores, opere e empilhe o resultado.",
    example: { input: "'2 3 +'", output: "5", explanation: "2+3=5 em notação polonesa reversa" },
  },
  {
    id: "py-av-hard-3",
    phase: 3,
    level: "Avançado",
    difficulty: "hard",
    title: "Distância de edição (Levenshtein)",
    description:
      "Calcule a distância de edição mínima entre duas strings (inserção, deleção, substituição = 1 operação cada).",
    requirements: [
      "A função recebe `s1` e `s2`.",
      "Retorne o número mínimo de operações para transformar s1 em s2.",
      "Use programação dinâmica.",
    ],
    starterCode:
      "def resolver(s1, s2):\n    # Distância de Levenshtein\n    pass\n",
    solution:
      "def resolver(s1, s2):\n    m, n = len(s1), len(s2)\n    dp = list(range(n + 1))\n    for i in range(1, m + 1):\n        prev = dp[0]\n        dp[0] = i\n        for j in range(1, n + 1):\n            temp = dp[j]\n            if s1[i-1] == s2[j-1]:\n                dp[j] = prev\n            else:\n                dp[j] = 1 + min(prev, dp[j], dp[j-1])\n            prev = temp\n    return dp[n]\n",
    testCases: [
      { input: "'kitten', 'sitting'", expected: "3", description: "Clássico" },
      { input: "'abc', 'abc'", expected: "0", description: "Idênticos" },
      { input: "'', 'abc'", expected: "3", description: "String vazia" },
      { input: "'abc', ''", expected: "3", description: "Para vazia" },
      { input: "'horse', 'ros'", expected: "3", description: "horse→ros" },
    ],
    hint: "dp[j] representa a distância entre s1[:i] e s2[:j]. Otimize usando apenas uma linha da matriz.",
    example: { input: "'cat', 'cut'", output: "1", explanation: "'a'→'u' = 1 substituição" },
  },
  {
    id: "py-av-hard-4",
    phase: 4,
    level: "Avançado",
    difficulty: "hard",
    title: "Parsing de JSON simplificado",
    description:
      "Implemente um parser que converta uma string JSON simples (apenas objetos, arrays, strings e números) em estrutura Python.",
    requirements: [
      "A função recebe uma string `json_str`.",
      "Suporte: objetos `{}`, arrays `[]`, strings `\"\"`, inteiros, booleanos e null.",
      "Retorne a estrutura Python equivalente.",
    ],
    starterCode:
      "import json\n\ndef resolver(json_str):\n    # Parse o JSON — pode usar json.loads para este desafio\n    # Mas valide que entende a estrutura retornada\n    pass\n",
    solution:
      "import json\n\ndef resolver(json_str):\n    return json.loads(json_str)\n",
    testCases: [
      { input: "'{\"nome\": \"Alice\", \"idade\": 30}'", expected: "{'nome': 'Alice', 'idade': 30}", description: "Objeto simples" },
      { input: "'[1, 2, 3]'", expected: "[1, 2, 3]", description: "Array" },
      { input: "'{\"ativo\": true, \"saldo\": null}'", expected: "{'ativo': True, 'saldo': None}", description: "Bool e null" },
      { input: "'{\"itens\": [1, 2, 3]}'", expected: "{'itens': [1, 2, 3]}", description: "Aninhado" },
      { input: "'42'", expected: "42", description: "Número simples" },
    ],
    hint: "Use `json.loads()` do módulo padrão do Python para fazer o parse.",
    example: { input: "'{\"x\": 1}'", output: "{'x': 1}", explanation: "JSON objeto → dict Python" },
  },
  {
    id: "py-av-hard-5",
    phase: 5,
    level: "Avançado",
    difficulty: "hard",
    title: "Algoritmo de Dijkstra",
    description:
      "Dado um grafo ponderado dirigido e um nó inicial, encontre a distância mínima de origem a todos os outros nós usando Dijkstra.",
    requirements: [
      "A função recebe `grafo` (dict de dict com pesos), `inicio`.",
      "Ex: `{'A': {'B': 1, 'C': 4}, 'B': {'C': 2}}`.",
      "Retorne um dicionário com a menor distância do início a cada nó.",
      "Nós inacessíveis recebem distância `float('inf')`.",
    ],
    starterCode:
      "import heapq\n\ndef resolver(grafo, inicio):\n    # Algoritmo de Dijkstra\n    pass\n",
    solution:
      "import heapq\n\ndef resolver(grafo, inicio):\n    dist = {no: float('inf') for no in grafo}\n    dist[inicio] = 0\n    heap = [(0, inicio)]\n    while heap:\n        d, no = heapq.heappop(heap)\n        if d > dist[no]: continue\n        for vizinho, peso in grafo.get(no, {}).items():\n            nova_dist = d + peso\n            if nova_dist < dist[vizinho]:\n                dist[vizinho] = nova_dist\n                heapq.heappush(heap, (nova_dist, vizinho))\n    return dist\n",
    testCases: [
      { input: "{'A':{'B':1,'C':4},'B':{'C':2,'D':5},'C':{'D':1},'D':{}}, 'A'", expected: "{'A': 0, 'B': 1, 'C': 3, 'D': 4}", description: "Grafo com 4 nós" },
      { input: "{'A':{'B':1},'B':{}}, 'A'", expected: "{'A': 0, 'B': 1}", description: "Simples" },
      { input: "{'A':{},'B':{}}, 'A'", expected: "{'A': 0, 'B': inf}", description: "Nó inacessível" },
      { input: "{'A':{'B':10,'C':3},'C':{'B':4},'B':{}}, 'A'", expected: "{'A': 0, 'B': 7, 'C': 3}", description: "Caminho indireto melhor" },
      { input: "{'A':{'A':0}}, 'A'", expected: "{'A': 0}", description: "Auto-loop" },
    ],
    hint: "Use `heapq` como fila de prioridade. Processe nós em ordem crescente de distância.",
    example: { input: "{'A':{'B':1},'B':{'C':2},'C':{}}, 'A'", output: "{'A': 0, 'B': 1, 'C': 3}", explanation: "A→B=1, A→B→C=3" },
  },
];

// ---------------------------------------------------------------------------
// Export & helpers
// ---------------------------------------------------------------------------
export const ALL_PYTHON_CHALLENGES: PythonChallenge[] = [
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

export function getPythonPhases(level: Level, difficulty: Difficulty): PythonChallenge[] {
  return ALL_PYTHON_CHALLENGES.filter(
    (c) => c.level === level && c.difficulty === difficulty,
  ).sort((a, b) => a.phase - b.phase);
}

export function getPythonChallenge(id: string): PythonChallenge | undefined {
  return ALL_PYTHON_CHALLENGES.find((c) => c.id === id);
}
