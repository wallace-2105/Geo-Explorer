import type { Module, Trail } from "@/types";

function mod(
  id: string,
  order: number,
  title: string,
  summary: string,
  lessons: [string, Module["lessons"][number]["type"], number][],
  completed = false,
): Module {
  return {
    id,
    order,
    title,
    summary,
    completed,
    lessons: lessons.map(([t, type, durationMinutes], i) => ({
      id: `${id}-l${i + 1}`,
      title: t,
      type,
      durationMinutes,
      completed,
    })),
  };
}

export const mockTrails: Trail[] = [
  {
    id: "ts-fundamentos",
    slug: "typescript-fundamentos",
    title: "TypeScript do zero ao tipo seguro",
    description:
      "Domine o sistema de tipos do TypeScript e escreva código previsível, refatorável e seguro em projetos reais.",
    technology: "TypeScript",
    level: "Iniciante",
    progress: 72,
    status: "in_progress",
    modulesCount: 4,
    estimatedHours: 18,
    tags: ["tipos", "generics", "tooling"],
    modules: [
      mod(
        "ts-m1",
        1,
        "Fundamentos de tipagem",
        "Tipos primitivos, inferência e anotações.",
        [
          ["Por que tipar?", "reading", 12],
          ["Tipos primitivos e inferência", "video", 22],
          ["Exercício: tipando funções", "exercise", 30],
        ],
        true,
      ),
      mod(
        "ts-m2",
        2,
        "Interfaces, tipos e unions",
        "Modelagem de domínio com type aliases e discriminated unions.",
        [
          ["Interface vs type", "video", 18],
          ["Discriminated unions", "video", 25],
          ["Exercício: modelando um domínio", "exercise", 40],
        ],
        true,
      ),
      mod("ts-m3", 3, "Generics na prática", "Funções e estruturas reutilizáveis com generics.", [
        ["Introdução a generics", "video", 24],
        ["Constraints e defaults", "reading", 15],
        ["Exercício: um Result<T, E>", "exercise", 45],
      ]),
      mod(
        "ts-m4",
        4,
        "TypeScript em produção",
        "Configuração de tsconfig, build e integração contínua.",
        [
          ["tsconfig sem mistério", "reading", 20],
          ["Projeto final", "project", 120],
        ],
      ),
    ],
    finalProject: {
      title: "CLI de tarefas totalmente tipada",
      description:
        "Construa uma CLI de gerenciamento de tarefas com persistência em arquivo, tipos exaustivos e testes.",
      deliverables: [
        "Repositório com tsconfig estrito",
        "Camada de domínio sem any",
        "Cobertura mínima de testes nos casos de uso",
      ],
    },
  },
  {
    id: "node-api",
    slug: "node-api-profissional",
    title: "APIs profissionais com Node.js",
    description:
      "Arquitetura em camadas, validação, autenticação e observabilidade para APIs REST prontas para produção.",
    technology: "Node.js",
    level: "Intermediário",
    progress: 35,
    status: "in_progress",
    modulesCount: 5,
    estimatedHours: 32,
    tags: ["rest", "arquitetura", "testes"],
    modules: [
      mod(
        "nd-m1",
        1,
        "HTTP e o runtime",
        "Event loop, streams e o ciclo de uma requisição.",
        [
          ["Event loop na prática", "video", 26],
          ["Streams e backpressure", "reading", 18],
        ],
        true,
      ),
      mod("nd-m2", 2, "Arquitetura em camadas", "Controllers, use cases e repositórios.", [
        ["Separando responsabilidades", "video", 30],
        ["Injeção de dependências", "reading", 20],
        ["Exercício: refatorando um controller", "exercise", 50],
      ]),
      mod("nd-m3", 3, "Validação e erros", "Zod, mapeamento de erros e contratos.", [
        ["Validação de entrada", "video", 22],
        ["Erros de domínio vs HTTP", "reading", 16],
      ]),
      mod("nd-m4", 4, "Testes automatizados", "Unitários, integração e contrato.", [
        ["Pirâmide de testes", "video", 24],
        ["Testando casos de uso", "exercise", 60],
      ]),
      mod("nd-m5", 5, "Deploy e observabilidade", "Logs, métricas e healthchecks.", [
        ["Logs estruturados", "reading", 18],
        ["Projeto final", "project", 150],
      ]),
    ],
    finalProject: {
      title: "API de trilhas de aprendizagem",
      description:
        "Implemente a API REST que alimenta este próprio produto: trilhas, desafios e certificados.",
      deliverables: ["Endpoints documentados", "Testes de integração", "Pipeline de CI"],
    },
  },
  {
    id: "react-avancado",
    slug: "react-avancado",
    title: "React avançado e performance",
    description:
      "Renderização, memoização, estados derivados e padrões de composição para interfaces complexas.",
    technology: "React",
    level: "Avançado",
    progress: 100,
    status: "completed",
    modulesCount: 4,
    estimatedHours: 26,
    tags: ["performance", "padrões", "hooks"],
    modules: [
      mod(
        "rc-m1",
        1,
        "Modelo de renderização",
        "Como o React decide re-renderizar.",
        [
          ["Reconciliação", "video", 28],
          ["Chaves e listas", "reading", 14],
        ],
        true,
      ),
      mod(
        "rc-m2",
        2,
        "Padrões de composição",
        "Slots, compound components e context.",
        [
          ["Compound components", "video", 32],
          ["Exercício: um Tabs acessível", "exercise", 55],
        ],
        true,
      ),
      mod(
        "rc-m3",
        3,
        "Estado assíncrono",
        "Cache, invalidação e estados de erro.",
        [
          ["Cache de servidor", "video", 26],
          ["Retry e fallback", "reading", 16],
        ],
        true,
      ),
      mod(
        "rc-m4",
        4,
        "Performance real",
        "Profiler, listas virtuais e code splitting.",
        [
          ["Medindo antes de otimizar", "video", 22],
          ["Projeto final", "project", 130],
        ],
        true,
      ),
    ],
    finalProject: {
      title: "Painel analítico com 10k linhas",
      description: "Construa um painel com filtros, ordenação e virtualização mantendo 60fps.",
      deliverables: ["Lista virtualizada", "Relatório de profiling", "Acessibilidade validada"],
    },
  },
  {
    id: "js-moderno",
    slug: "javascript-moderno",
    title: "JavaScript moderno na prática",
    description:
      "ES2015+ até os recursos mais recentes: assincronismo, iteradores, módulos e boas práticas.",
    technology: "JavaScript",
    level: "Iniciante",
    progress: 0,
    status: "not_started",
    modulesCount: 3,
    estimatedHours: 14,
    tags: ["es6", "async", "dom"],
    modules: [
      mod("js-m1", 1, "Sintaxe moderna", "Destructuring, spread e módulos.", [
        ["Destructuring", "video", 18],
        ["Módulos ES", "reading", 14],
      ]),
      mod("js-m2", 2, "Assincronismo", "Promises, async/await e concorrência.", [
        ["Promises a fundo", "video", 26],
        ["Exercício: fila de requisições", "exercise", 40],
      ]),
      mod("js-m3", 3, "Boas práticas", "Imutabilidade, pureza e organização.", [
        ["Funções puras", "reading", 15],
        ["Projeto final", "project", 90],
      ]),
    ],
    finalProject: {
      title: "Agregador de feeds",
      description: "Consuma múltiplas APIs em paralelo e trate falhas parciais.",
      deliverables: ["Controle de concorrência", "Tratamento de erro por fonte"],
    },
  },
  {
    id: "python-dados",
    slug: "python-para-dados",
    title: "Python para dados e automação",
    description:
      "Scripts confiáveis, manipulação de dados e automações que rodam sozinhas todo dia.",
    technology: "Python",
    level: "Intermediário",
    progress: 0,
    status: "not_started",
    modulesCount: 4,
    estimatedHours: 22,
    tags: ["dados", "automação", "pandas"],
    modules: [
      mod("py-m1", 1, "Python idiomático", "Tipagem gradual e estruturas nativas.", [
        ["Comprehensions", "video", 20],
        ["Type hints", "reading", 16],
      ]),
      mod("py-m2", 2, "Manipulação de dados", "Leitura, limpeza e transformação.", [
        ["DataFrames", "video", 30],
        ["Exercício: limpando um CSV", "exercise", 45],
      ]),
      mod("py-m3", 3, "Automação", "Agendamento, CLI e integrações.", [
        ["Scripts resilientes", "reading", 18],
      ]),
      mod("py-m4", 4, "Entrega", "Empacotamento e execução em servidor.", [
        ["Projeto final", "project", 110],
      ]),
    ],
    finalProject: {
      title: "Pipeline de relatórios diários",
      description: "Extraia, transforme e publique um relatório automatizado.",
      deliverables: ["Pipeline agendado", "Log de execução", "Tratamento de falhas"],
    },
  },
  {
    id: "java-backend",
    slug: "java-backend",
    title: "Java backend com foco em domínio",
    description:
      "Modelagem orientada a objetos, camadas de aplicação e persistência em serviços Java.",
    technology: "Java",
    level: "Avançado",
    progress: 12,
    status: "in_progress",
    modulesCount: 4,
    estimatedHours: 30,
    tags: ["oop", "spring", "domínio"],
    modules: [
      mod(
        "jv-m1",
        1,
        "Domínio rico",
        "Entidades, value objects e agregados.",
        [["Modelando agregados", "video", 34]],
        true,
      ),
      mod("jv-m2", 2, "Casos de uso", "Serviços de aplicação e transações.", [
        ["Fronteiras transacionais", "reading", 20],
        ["Exercício: caso de uso de matrícula", "exercise", 55],
      ]),
      mod("jv-m3", 3, "Persistência", "Mapeamento e repositórios.", [
        ["Repositórios", "video", 28],
      ]),
      mod("jv-m4", 4, "Entrega", "Testes e empacotamento.", [["Projeto final", "project", 140]]),
    ],
    finalProject: {
      title: "Serviço de matrículas",
      description: "Implemente um serviço com regras de negócio explícitas e testes.",
      deliverables: ["Domínio isolado", "Testes de regra", "API documentada"],
    },
  },
];
