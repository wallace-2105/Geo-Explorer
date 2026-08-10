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
    const challenge = await services.challenges.generate({
      technology: "TypeScript",
      level: "Iniciante",
      difficulty: "easy",
    });
    expect((await services.challenges.get(challenge.id)).id).toBe(challenge.id);
    expect(
      (
        await services.challenges.submit({
          challengeId: challenge.id,
          code: "export function resolver(input: string[]) { return input.map((value) => value.trim()); }",
        })
      ).status,
    ).toBe("passed");
  });

  it("calculates progress from completed modules and permits certificate generation", async () => {
    const services = createServices();
    const trail = await services.trails.get("js-moderno");
    await services.progress.update({
      userId: "usr-1",
      trailId: trail.id,
      moduleId: "js-m1",
      action: "complete_module",
    });
    expect((await services.progress.list("usr-1"))[0]?.percent).toBe(33);
    await services.progress.update({
      userId: "usr-1",
      trailId: trail.id,
      action: "complete_trail",
    });
    const certificate = await services.certificates.generate({
      trailId: trail.id,
      userName: "Lucas Andrade",
    });
    expect((await services.certificates.get(certificate.id)).credentialId).toMatch(/^GEO-/);
  });
});
