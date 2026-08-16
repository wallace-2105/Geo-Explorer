import { describe, expect, it } from "vitest";
import { createServices } from "../src/services/container.js";

describe("Geo-Explorer services", () => {
  it("lists and filters trails", async () => {
    const services = createServices();
    expect((await services.trails.list({})).length).toBeGreaterThanOrEqual(6);
    expect((await services.trails.list({ technology: "Python" }))[0]?.technology).toBe("Python");
  });

  it("generates, retrieves, and evaluates a challenge using the fallback", async () => {
    const services = createServices();
    await services.users.get("test-user", { email: "test@test.com" });
    const challenge = await services.challenges.generate({
      technology: "TypeScript",
      level: "Iniciante",
      difficulty: "easy",
      userId: "test-user",
    });
    expect((await services.challenges.get(challenge.id, "test-user")).id).toBe(challenge.id);
    expect(
      (
        await services.challenges.submit({
          challengeId: challenge.id,
          code: "export function resolver(input: string[]) { return input.map((value) => value.trim()); }",
          userId: "test-user",
        })
      ).status,
    ).toBe("passed");
  });

  it("calculates progress from completed modules and permits certificate generation", async () => {
    const services = createServices();
    await services.users.get("test-user", { email: "test@test.com" });
    const trail = await services.trails.get("js-moderno");
    await services.progress.update({
      userId: "test-user",
      trailId: trail.id,
      moduleId: "js-m1",
      action: "complete_module",
    });
    expect((await services.progress.list("test-user"))[0]?.percent).toBe(33);
    await services.progress.update({
      userId: "test-user",
      trailId: trail.id,
      action: "complete_trail",
    });
    const certificate = await services.certificates.generate({
      trailId: trail.id,
      userName: "Dev",
      userId: "test-user",
    });
    expect((await services.certificates.get(certificate.id, "test-user")).credentialId).toMatch(/^GEO-/);
  });
});
