# Geo-Explorer

Plataforma full-stack para explorar trilhas de aprendizagem, acompanhar progresso, praticar desafios e emitir certificados fictícios. O frontend existente foi preservado; a API Node.js em `backend/` expõe os contratos que ele já consome.

## Funcionalidades (todas validadas)

- Catálogo com seis tecnologias, filtros por tecnologia, nível, status e busca livre.
- Matrícula e progresso por módulo/trilha com persistência em memória.
- Geração e avaliação segura de desafios — não executa código enviado pelo usuário.
- Adaptador de IA com fallback local automático quando nenhuma chave está configurada.
- Certificados fictícios com credencial única (`GEO-XXX-YYYY-ZZZZZZZZ`) para trilhas concluídas.
- REST documentado por Swagger/OpenAPI, CLI interativa e servidor MCP por stdio.

## Arquitetura

`Frontend → REST controllers → Services → Repositories`. As ferramentas MCP e a CLI chamam os mesmos services; não há lógica de negócio duplicada. Consulte [docs/architecture.md](docs/architecture.md) para o detalhamento.

## Tecnologias

React, Vite, TanStack Query/Router, Node.js, TypeScript strict, Express 5, Zod, Helmet, CORS, rate limiting, Swagger/OpenAPI, Vitest e MCP SDK.

## Instalação e execução

```bash
npm install
Copy-Item .env.example .env   # PowerShell
# ou: copy .env.example .env  # cmd
npm run dev:api   # backend em http://localhost:3334/api
npm run dev       # frontend em http://localhost:8080
```

O frontend lê `VITE_USE_MOCKS` e `VITE_API_URL` do arquivo `.env` na raiz. Copie `.env.example` para `.env` antes de iniciar para que o frontend conecte na API real. Reinicie o Vite após qualquer mudança nas variáveis `VITE_*`.

> **Windows — conflito de porta:** o Autodesk AM Service usa a porta `3333` (127.0.0.1:3333) neste ambiente. O backend usa `3334` por padrão para evitar o conflito.

## Scripts

```bash
npm run dev         # frontend (http://localhost:8080)
npm run dev:api     # API REST (http://localhost:3334)
npm run dev:mcp     # MCP Server por stdio
npm run build       # build do frontend
npm run build:api   # compila o backend TypeScript
npm run typecheck   # typecheck frontend + backend
npm run lint        # eslint
npm run test        # 7 testes Vitest (services, REST, MCP)
npm run cli -- trail TypeScript Iniciante
npm run cli -- challenge JavaScript Avançado
npm run cli -- certificate NomeAluno React
```

## API e Swagger

Com a API em execução, a documentação interativa está em [http://localhost:3334/api/docs](http://localhost:3334/api/docs), e o JSON OpenAPI em `/api/openapi.json`.

Principais rotas:

```text
GET  /api/health
GET  /api/trails?technology=TypeScript&level=Iniciante
GET  /api/trails/:id
POST /api/trails/:id/enroll
POST /api/challenges/generate
POST /api/challenges/submissions
GET  /api/challenges/history
GET  /api/challenges/:id
GET  /api/certificates
POST /api/certificates
GET  /api/certificates/:id
GET  /api/progress/:userId
POST /api/progress
GET  /api/me
```

As respostas de sucesso seguem `{ "data": ... }`. Erros seguem `{ "error": { "code", "message" } }`.

Exemplo de desafio:

```bash
curl -X POST http://localhost:3334/api/challenges/generate \
  -H "Content-Type: application/json" \
  -d '{"technology":"TypeScript","level":"Iniciante","difficulty":"easy"}'
```

## IA e segurança

Por padrão, `AI_PROVIDER=mock`, permitindo demonstração sem credenciais. Para um endpoint compatível com Chat Completions, configure `AI_PROVIDER=openai-compatible`, `AI_API_KEY`, `AI_MODEL` e, opcionalmente, `AI_BASE_URL`. Segredos nunca devem ser versionados.

A avaliação de solução é baseada em IA/mock e não executa código arbitrário no processo da API. A troca por sandbox isolado é uma evolução futura deliberada.

## MCP e CLI

O servidor MCP expõe `list_learning_trails`, `get_learning_trail`, `generate_challenge`, `get_challenge`, `generate_certificate`, `get_certificate` e `get_learning_progress`. Execute `npm run dev:mcp` e configure o cliente MCP com o comando `npx tsx backend/src/mcp/index.ts`.

Exemplos de CLI:

```bash
npm run cli -- trail JavaScript Iniciante
npm run cli -- challenge Python Intermediário
npm run cli -- certificate Wallace React
```

## Testes

`npm run test` cobre os services, os principais contratos REST, validação, progresso, fallback de desafios e handlers MCP — 7 testes, todos passando. A persistência em memória foi escolhida intencionalmente; repositories isolam essa decisão, permitindo introduzir banco de dados depois sem alterar services ou transportes.

## Persistência

Os repositories em memória são reiniciados a cada restart do backend. Esse comportamento é intencional para demonstração. Os certificados, desafios e progresso gerados durante uma sessão não sobrevivem ao reinício do processo.
