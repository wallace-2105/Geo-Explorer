import type { LessonType, Module, Technology, Trail } from "../types/domain.js";

function module(
  id: string,
  order: number,
  title: string,
  summary: string,
  lessons: Array<[string, LessonType, number]>,
  completed = false,
): Module {
  return {
    id,
    order,
    title,
    summary,
    completed,
    lessons: lessons.map(([title, type, durationMinutes], index) => ({
      id: `${id}-l${index + 1}`,
      title,
      type,
      durationMinutes,
      completed,
    })),
  };
}

function trail(
  id: string,
  technology: Technology,
  level: Trail["level"],
  title: string,
  description: string,
  hours: number,
  tags: string[],
  modules: Module[],
  completed = 0,
): Trail {
  const progress = Math.round((completed / modules.length) * 100);
  return {
    id,
    slug: id,
    title,
    description,
    technology,
    level,
    progress,
    status: completed === modules.length ? "completed" : completed ? "in_progress" : "not_started",
    modulesCount: modules.length,
    estimatedHours: hours,
    tags,
    modules,
    finalProject: {
      title: `Projeto final: ${technology}`,
      description: `Aplique os conceitos de ${technology} em um projeto pronto para portfólio.`,
      deliverables: [
        "Código-fonte documentado",
        "Testes automatizados",
        "README com instruções de execução",
      ],
    },
  };
}

export const seedTrails: Trail[] = [
  trail(
    "ts-fundamentos",
    "TypeScript",
    "Iniciante",
    "TypeScript do zero ao tipo seguro",
    "Domine tipos, generics e tooling para projetos previsíveis.",
    18,
    ["tipos", "generics", "tooling"],
    [
      module(
        "ts-m1",
        1,
        "Fundamentos de tipagem",
        "Tipos primitivos, inferência e anotações.",
        [
          ["Por que tipar?", "reading", 12],
          ["Tipos e inferência", "video", 22],
        ],
        true,
      ),
      module(
        "ts-m2",
        2,
        "Interfaces e unions",
        "Modele domínios expressivos.",
        [
          ["Interface vs type", "video", 18],
          ["Discriminated unions", "exercise", 40],
        ],
        true,
      ),
      module("ts-m3", 3, "Generics na prática", "Crie estruturas reutilizáveis.", [
        ["Constraints", "video", 24],
        ["Result<T, E>", "exercise", 45],
      ]),
      module("ts-m4", 4, "Produção", "tsconfig, build e CI.", [
        ["tsconfig", "reading", 20],
        ["CLI tipada", "project", 120],
      ]),
    ],
    2,
  ),
  trail(
    "node-api",
    "Node.js",
    "Intermediário",
    "APIs profissionais com Node.js",
    "Arquitetura em camadas, validação e testes para APIs REST.",
    32,
    ["rest", "arquitetura", "testes"],
    [
      module(
        "node-m1",
        1,
        "HTTP e runtime",
        "Event loop e ciclo de requisição.",
        [
          ["Event loop", "video", 26],
          ["Streams", "reading", 18],
        ],
        true,
      ),
      module("node-m2", 2, "Arquitetura", "Controllers, services e repositories.", [
        ["Separando responsabilidades", "video", 30],
        ["Refatoração", "exercise", 50],
      ]),
      module("node-m3", 3, "Validação", "Zod e erros de domínio.", [
        ["Contratos", "video", 22],
        ["Erros HTTP", "reading", 16],
      ]),
      module("node-m4", 4, "Testes", "Testes unitários e de integração.", [
        ["Pirâmide", "video", 24],
        ["Casos de uso", "exercise", 60],
      ]),
    ],
    1,
  ),
  trail(
    "react-avancado",
    "React",
    "Avançado",
    "React avançado e performance",
    "Padrões de composição e performance para interfaces complexas.",
    26,
    ["performance", "hooks", "padrões"],
    [
      module(
        "react-m1",
        1,
        "Renderização",
        "Reconciliação e chaves.",
        [
          ["Reconciliação", "video", 28],
          ["Chaves", "reading", 14],
        ],
        true,
      ),
      module(
        "react-m2",
        2,
        "Composição",
        "Context e compound components.",
        [
          ["Compound components", "video", 32],
          ["Tabs acessível", "exercise", 55],
        ],
        true,
      ),
      module(
        "react-m3",
        3,
        "Estado assíncrono",
        "Cache e invalidação.",
        [
          ["Cache", "video", 26],
          ["Fallback", "reading", 16],
        ],
        true,
      ),
      module(
        "react-m4",
        4,
        "Performance",
        "Profiler e code splitting.",
        [
          ["Medindo", "video", 22],
          ["Painel", "project", 130],
        ],
        true,
      ),
    ],
    4,
  ),
  trail(
    "js-moderno",
    "JavaScript",
    "Iniciante",
    "JavaScript moderno na prática",
    "ES2015+, assincronismo, módulos e boas práticas.",
    14,
    ["es6", "async", "dom"],
    [
      module("js-m1", 1, "Sintaxe moderna", "Destructuring e módulos.", [
        ["Destructuring", "video", 18],
        ["Módulos ES", "reading", 14],
      ]),
      module("js-m2", 2, "Assincronismo", "Promises e async/await.", [
        ["Promises", "video", 26],
        ["Fila", "exercise", 40],
      ]),
      module("js-m3", 3, "Boas práticas", "Pureza e organização.", [
        ["Funções puras", "reading", 15],
        ["Feeds", "project", 90],
      ]),
    ],
  ),
  trail(
    "python-dados",
    "Python",
    "Intermediário",
    "Python para dados e automação",
    "Scripts confiáveis e pipelines de dados automatizados.",
    22,
    ["dados", "automação", "pandas"],
    [
      module("py-m1", 1, "Python idiomático", "Estruturas nativas e type hints.", [
        ["Comprehensions", "video", 20],
        ["Type hints", "reading", 16],
      ]),
      module("py-m2", 2, "Dados", "Leitura, limpeza e transformação.", [
        ["DataFrames", "video", 30],
        ["CSV", "exercise", 45],
      ]),
      module("py-m3", 3, "Automação", "Agendamento e integrações.", [
        ["Scripts resilientes", "reading", 18],
        ["Relatórios", "project", 110],
      ]),
    ],
  ),
  trail(
    "java-backend",
    "Java",
    "Avançado",
    "Java backend com foco em domínio",
    "Modelagem orientada a objetos e persistência em serviços Java.",
    30,
    ["oop", "spring", "domínio"],
    [
      module(
        "java-m1",
        1,
        "Domínio rico",
        "Entidades e agregados.",
        [["Agregados", "video", 34]],
        true,
      ),
      module("java-m2", 2, "Casos de uso", "Serviços e transações.", [
        ["Fronteiras", "reading", 20],
        ["Matrícula", "exercise", 55],
      ]),
      module("java-m3", 3, "Persistência", "Mapeamento e repositories.", [
        ["Repositories", "video", 28],
        ["Serviço", "project", 140],
      ]),
    ],
    1,
  ),
];
