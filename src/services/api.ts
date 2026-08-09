/**
 * Camada HTTP base.
 *
 * Todas as chamadas de rede passam por aqui. Enquanto o backend
 * (Node.js + TypeScript) não existe, `USE_MOCKS` mantém a aplicação
 * funcional com os dados de `src/data`. Basta definir
 * `VITE_API_URL` e `VITE_USE_MOCKS=false` para consumir a API real.
 */

export const API_BASE_URL: string =
  (import.meta.env["VITE_API_URL"] as string | undefined) ?? "/api";

export const USE_MOCKS: boolean =
  (import.meta.env["VITE_USE_MOCKS"] as string | undefined) !== "false";

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
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(headers ?? {}),
      },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
  } catch {
    throw new ApiError("Não foi possível conectar ao servidor.", 0);
  }

  if (!response.ok) {
    throw new ApiError(
      `A requisição falhou (${response.status}).`,
      response.status,
    );
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
