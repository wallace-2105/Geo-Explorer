# Arquitetura do Geo-Explorer

## Fluxo principal

```text
Frontend (React + TanStack)
    ↓ HTTP /api  (VITE_API_URL=http://localhost:3334/api)
Express routes (backend/src/routes/api.routes.ts)
    ↓
Services (regras de negócio)
    ↓
Repositories (memória hoje; banco amanhã)
```

O frontend não foi refeito. Seus services já encapsulavam HTTP e recebem os mesmos contratos de resposta definidos pela API: sucesso em `{ data }` e erro em `{ error }`.

## Transportes compartilhados

```text
REST API ─┐
MCP      ├──→ Services ───→ Repositories
CLI      ┘
```

REST, MCP e CLI só validam/transformam entrada e chamam o mesmo caso de uso. Por exemplo, a regra de que certificado exige trilha concluída reside em `CertificateService`, não em uma rota ou ferramenta.

## IA com fallback

```text
ChallengeService
    ↓
AIProvider interface
    ├── MockAIProvider (padrão, sem chave)
    └── OpenAICompatibleProvider (configurado por ambiente)
```

O provider real usa uma chamada HTTP compatível com Chat Completions. A aplicação segue disponível se uma credencial não estiver configurada. A avaliação jamais executa o código do aluno diretamente.

## Estado e evolução

Os repositories em memória são adequados para a demonstração e testes determinísticos. O service recebe interfaces/repositories, portanto uma implementação PostgreSQL, Prisma ou Redis pode substituir a atual sem mudar controllers, MCP ou CLI.

## Portas de desenvolvimento

| Serviço | URL |
|---------|-----|
| Frontend (Vite) | http://localhost:8080 |
| Backend (Express) | http://localhost:3334 |
| Swagger | http://localhost:3334/api/docs |

> A porta 3334 foi escolhida porque o Autodesk AM Service ocupa 127.0.0.1:3333 neste ambiente Windows. O padrão pode ser alterado via variável `PORT` no `.env`.

## Segurança e contratos

- Zod valida query strings, parâmetros e payloads em todos os endpoints.
- Helmet, CORS configurável e rate limiting (100 req/min) protegem a superfície HTTP.
- O middleware centralizado mapeia erros de validação, domínio e desconhecidos para respostas seguras.
- `.env.example` documenta configuração e nenhuma chave é armazenada no repositório.
- `.env` está no `.gitignore` e nunca é versionado.

## Status validado (2026-08-10)

| Check | Resultado |
|-------|-----------|
| `typecheck` (frontend + backend) | ✅ Sem erros |
| `test` (7 testes Vitest) | ✅ Todos passam |
| `lint` | ✅ 0 erros, 6 warnings inofensivos em UI Radix |
| `build` (frontend + nitro) | ✅ Sucesso |
| `build:api` (tsc backend) | ✅ Sucesso |
| CLI (trail, challenge, certificate) | ✅ Todos funcionando |
| REST API (todos endpoints) | ✅ Validados manualmente |
| MCP Server | ✅ Responde ao handshake MCP 2024-11-05 |
| Integração frontend ↔ backend | ✅ VITE_USE_MOCKS=false funcional |
