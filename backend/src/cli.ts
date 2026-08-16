#!/usr/bin/env node
import { env } from "./config/env.js";
import { createServices } from "./services/container.js";

const CLI_USER_ID = "00000000-0000-0000-0000-000000000000";

async function run() {
  const [command, technology, level] = process.argv.slice(2);
  const services = createServices();

  if (command === "trail") {
    const trails = await services.trails.list({
      technology: technology as never,
      level: level as never,
    });
    process.stdout.write(`${JSON.stringify(trails, null, 2)}\n`);
    return;
  }
  if (command === "challenge") {
    process.stdout.write(
      `${JSON.stringify(await services.challenges.generate({ technology: technology as never, level: level as never, difficulty: "medium", userId: CLI_USER_ID }), null, 2)}\n`,
    );
    return;
  }
  if (command === "certificate") {
    const userName = technology;
    const tech = level;
    const trails = await services.trails.list({ technology: tech as never });
    const finished = trails.find((trail) => trail.status === "completed");
    if (!finished || !userName)
      throw new Error("Informe nome e uma tecnologia com trilha concluída.");
    process.stdout.write(
      `${JSON.stringify(await services.certificates.generate({ trailId: finished.id, userName, userId: CLI_USER_ID }), null, 2)}\n`,
    );
    return;
  }
  process.stderr.write(
    "Uso: geo-explorer trail <tecnologia> <nível> | challenge <tecnologia> <nível> | certificate <nome> <tecnologia>\n",
  );
  process.exitCode = 1;
}
void run();
