import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/env.js";
import { errorHandler, notFound } from "./middlewares/error-handler.js";
import { openapi } from "./openapi.js";
import { createApiRouter } from "./routes/api.routes.js";
import { createServices, type Services } from "./services/container.js";
export function createApp(services: Services = createServices()) {
  const app = express();
  app.disable("x-powered-by");
  app.use(helmet());
  const allowedOrigins = env.CORS_ORIGIN.split(",").map((o) => o.trim().replace(/\/$/, ""));
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes("*")) {
          return callback(null, true);
        }
        const hasMatch = allowedOrigins.some(
          (allowed) => allowed.toLowerCase() === origin.toLowerCase()
        );
        if (hasMatch) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "64kb" }));
  app.use(
    "/api",
    rateLimit({ windowMs: 60_000, limit: 100, standardHeaders: "draft-8", legacyHeaders: false }),
  );
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openapi));
  app.get("/api/openapi.json", (_request, response) => response.json(openapi));
  app.use("/api", createApiRouter(services));
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
