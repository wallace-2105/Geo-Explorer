import { createApp } from "./app.js";
import { env } from "./config/env.js";
createApp().listen(env.PORT, () => {
  process.stdout.write(`Geo-Explorer API listening on http://localhost:${env.PORT}/api\n`);
});
