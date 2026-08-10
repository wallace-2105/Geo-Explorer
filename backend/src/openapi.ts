export const openapi = {
  openapi: "3.0.3",
  info: {
    title: "Geo-Explorer API",
    version: "1.0.0",
    description: "API de trilhas, progresso, desafios e certificados.",
  },
  servers: [{ url: "/api" }],
  components: {
    schemas: {
      Error: {
        type: "object",
        properties: {
          error: {
            type: "object",
            properties: { code: { type: "string" }, message: { type: "string" } },
          },
        },
      },
      ChallengeInput: {
        type: "object",
        required: ["technology", "level", "difficulty"],
        properties: {
          technology: { type: "string", example: "TypeScript" },
          level: { type: "string", example: "Intermediário" },
          difficulty: { type: "string", enum: ["easy", "medium", "hard"] },
        },
      },
    },
  },
  paths: {
    "/trails": {
      get: {
        summary: "Lista trilhas",
        parameters: [
          { name: "technology", in: "query", schema: { type: "string" } },
          { name: "level", in: "query", schema: { type: "string" } },
          { name: "status", in: "query", schema: { type: "string" } },
        ],
        responses: { "200": { description: "Trilhas" }, "400": { description: "Filtro inválido" } },
      },
    },
    "/trails/{id}": {
      get: {
        summary: "Busca uma trilha",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Trilha" }, "404": { description: "Não encontrada" } },
      },
    },
    "/trails/{id}/enroll": {
      post: {
        summary: "Inicia uma trilha",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Matrícula criada" } },
      },
    },
    "/challenges/generate": {
      post: {
        summary: "Gera desafio",
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/ChallengeInput" } },
          },
        },
        responses: { "201": { description: "Desafio gerado" } },
      },
    },
    "/challenges/submissions": {
      post: {
        summary: "Avalia solução sem executar código",
        responses: { "201": { description: "Avaliação" } },
      },
    },
    "/certificates": {
      get: { summary: "Lista certificados", responses: { "200": { description: "Certificados" } } },
      post: {
        summary: "Emite certificado de trilha concluída",
        responses: {
          "201": { description: "Certificado" },
          "409": { description: "Trilha não concluída" },
        },
      },
    },
    "/progress/{userId}": {
      get: { summary: "Consulta progresso", responses: { "200": { description: "Progresso" } } },
    },
  },
};
