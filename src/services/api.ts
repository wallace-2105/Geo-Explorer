/**
 * Camada HTTP base.
 *
 * Todas as chamadas de rede passam por aqui.
 * - Se `VITE_API_URL` estiver definida, usa a API real automaticamente.
 * - Defina `VITE_USE_MOCKS=true` explicitamente para forçar mocks localmente.
 */

import { supabase } from "../lib/supabase";

let baseUrl = (import.meta.env["VITE_API_URL"] as string | undefined) ?? "/api";
if (baseUrl.endsWith("/")) baseUrl = baseUrl.slice(0, -1);
if (baseUrl.startsWith("http") && !baseUrl.endsWith("/api")) {
  baseUrl += "/api";
}
export const API_BASE_URL: string = baseUrl;

// USE_MOCKS só ativa se explicitamente setado como "true".
// Se VITE_API_URL estiver definida, sempre usa API real (ignorando VITE_USE_MOCKS).
const hasApiUrl = !!(import.meta.env["VITE_API_URL"] as string | undefined);
export const USE_MOCKS: boolean = hasApiUrl
  ? false
  : (import.meta.env["VITE_USE_MOCKS"] as string | undefined) === "true";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

export async function apiRequest<T>(
  path: string,
  { body, headers, ...init }: RequestOptions = {},
): Promise<T> {
  let response: Response;

  try {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(headers ?? {}),
      },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
  } catch {
    throw new ApiError("Não foi possível conectar ao servidor.", 0);
  }

  if (!response.ok) {
    throw new ApiError(`A requisição falhou (${response.status}).`, response.status);
  }

  const payload = (await response.json()) as { data?: T } | T;
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

/** Simula latência de rede enquanto usamos mocks. */
export function delay<T>(value: T, ms = 450): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}
