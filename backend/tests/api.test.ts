import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { createServices } from "../src/services/container.js";

describe("REST API", () => {
  it("uses the frontend envelope and validates trail filters", async () => {
    const app = createApp(createServices());
    const result = await request(app)
      .get("/api/trails")
      .query({ technology: "TypeScript" })
      .expect(200);
    expect(result.body.data[0].technology).toBe("TypeScript");
    await request(app)
      .get("/api/trails")
      .query({ technology: "Rust" })
      .expect(400)
      .expect((response) => expect(response.body.error.code).toBe("VALIDATION_ERROR"));
  });

  it("returns domain errors consistently", async () => {
    const app = createApp(createServices());
    await request(app)
      .get("/api/trails/does-not-exist")
      .expect(404)
      .expect((response) => expect(response.body.error.code).toBe("TRAIL_NOT_FOUND"));
  });

  it("generates a challenge and accepts a submission", async () => {
    const app = createApp(createServices());
    const generated = await request(app)
      .post("/api/challenges/generate")
      .send({ technology: "React", level: "Avançado", difficulty: "hard" })
      .expect(201);
    await request(app)
      .post("/api/challenges/submissions")
      .send({
        challengeId: generated.body.data.id,
        code: "export function Component() { return <div>solution with enough detail for a review</div>; }",
      })
      .expect(201);
  });
});
