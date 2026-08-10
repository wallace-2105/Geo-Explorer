import { describe, expect, it } from "vitest";
import { createMcpTools } from "../src/mcp/tools.js";
import { createServices } from "../src/services/container.js";
describe("MCP tools", () => {
  it("calls the same services as REST and validates inputs", async () => {
    const tools = createMcpTools(createServices());
    expect((await tools.list_learning_trails({ technology: "Java" }))[0]?.technology).toBe("Java");
    const challenge = await tools.generate_challenge({
      technology: "Python",
      level: "Intermediário",
      difficulty: "medium",
    });
    expect((await tools.get_challenge({ id: challenge.id })).id).toBe(challenge.id);
    await expect(tools.get_learning_trail({ id: "missing" })).rejects.toMatchObject({
      code: "TRAIL_NOT_FOUND",
    });
  });
});
