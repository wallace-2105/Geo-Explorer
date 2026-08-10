import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { createMcpTools } from "./tools.js";
import { createServices } from "../services/container.js";
function jsonContent(value: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }],
    structuredContent: value as Record<string, unknown>,
  };
}
export async function startMcpServer() {
  const server = new McpServer({ name: "geo-explorer", version: "1.0.0" });
  const tools = createMcpTools(createServices());
  server.registerTool(
    "list_learning_trails",
    {
      description: "Lista trilhas de aprendizagem com filtros opcionais.",
      inputSchema: {
        technology: z.string().optional(),
        level: z.string().optional(),
        status: z.string().optional(),
        search: z.string().optional(),
      },
    },
    async (input) => jsonContent(await tools.list_learning_trails(input)),
  );
  server.registerTool(
    "get_learning_trail",
    { description: "Busca uma trilha pelo ID ou slug.", inputSchema: { id: z.string() } },
    async (input) => jsonContent(await tools.get_learning_trail(input)),
  );
  server.registerTool(
    "generate_challenge",
    {
      description: "Gera um desafio personalizado; usa IA configurada ou fallback local.",
      inputSchema: {
        technology: z.string(),
        level: z.string(),
        difficulty: z.enum(["easy", "medium", "hard"]),
      },
    },
    async (input) => jsonContent(await tools.generate_challenge(input)),
  );
  server.registerTool(
    "get_challenge",
    { description: "Busca desafio previamente gerado.", inputSchema: { id: z.string() } },
    async (input) => jsonContent(await tools.get_challenge(input)),
  );
  server.registerTool(
    "generate_certificate",
    {
      description: "Emite certificado para trilha concluída.",
      inputSchema: {
        trailId: z.string(),
        userId: z.string().optional(),
        userName: z.string().optional(),
      },
    },
    async (input) => jsonContent(await tools.generate_certificate(input)),
  );
  server.registerTool(
    "get_certificate",
    { description: "Busca certificado por ID.", inputSchema: { id: z.string() } },
    async (input) => jsonContent(await tools.get_certificate(input)),
  );
  server.registerTool(
    "get_learning_progress",
    { description: "Lista o progresso de um usuário.", inputSchema: { userId: z.string() } },
    async (input) => jsonContent(await tools.get_learning_progress(input)),
  );
  await server.connect(new StdioServerTransport());
}
