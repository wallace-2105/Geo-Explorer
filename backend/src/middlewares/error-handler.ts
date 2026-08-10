import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/app-error.js";
export const notFound: RequestHandler = (_request, _response, next) =>
  next(new AppError("ROUTE_NOT_FOUND", "Rota não encontrada.", 404));
export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ZodError) {
    response.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Dados de entrada inválidos.",
        details: error.flatten(),
      },
    });
    return;
  }
  if (error instanceof AppError) {
    response.status(error.statusCode).json({ error: { code: error.code, message: error.message } });
    return;
  }
  response
    .status(500)
    .json({ error: { code: "INTERNAL_ERROR", message: "Ocorreu um erro interno." } });
};
