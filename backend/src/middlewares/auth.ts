import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError } from "../errors/app-error.js";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email?: string;
    user_metadata?: {
      first_name?: string;
      last_name?: string;
      cpf?: string;
    };
  };
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (env.NODE_ENV === "test" && (!authHeader || authHeader === "Bearer test-token")) {
    req.user = {
      id: "test-user",
      email: "test@example.com",
    };
    return next();
  }

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("UNAUTHORIZED", "Token de autenticação ausente ou inválido", 401));
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(new AppError("UNAUTHORIZED", "Formato de token inválido", 401));
  }

  try {
    let decoded: any;
    try {
      decoded = jwt.verify(token, env.SUPABASE_JWT_SECRET);
    } catch (verifyErr) {
      if (env.NODE_ENV !== "production") {
        decoded = jwt.decode(token);
        if (!decoded || typeof decoded !== "object") {
          throw verifyErr;
        }
      } else {
        throw verifyErr;
      }
    }

    req.user = {
      id: decoded.sub || decoded.id || "dev-user",
      email: decoded.email,
      user_metadata: decoded.user_metadata,
    };

    next();
  } catch (err) {
    return next(new AppError("UNAUTHORIZED", "Token de autenticação inválido ou expirado", 401));
  }
}
