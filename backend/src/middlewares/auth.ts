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

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("UNAUTHORIZED", "Token de autenticação ausente ou inválido", 401));
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(new AppError("UNAUTHORIZED", "Formato de token inválido", 401));
  }

  try {
    // Verifica a assinatura do JWT usando o secret do Supabase
    const decoded = jwt.verify(token, env.SUPABASE_JWT_SECRET!) as any;
    
    // O id do usuário no Supabase fica na prop 'sub'
    req.user = {
      id: decoded.sub,
      email: decoded.email,
      user_metadata: decoded.user_metadata,
    };
    
    next();
  } catch (err) {
    return next(new AppError("UNAUTHORIZED", "Token de autenticação inválido ou expirado", 401));
  }
}
