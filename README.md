# Geo-Explorer

Plataforma full-stack para explorar trilhas de aprendizagem, acompanhar progresso, praticar desafios e emitir certificados fictícios. O frontend existente foi preservado; a API Node.js em `backend/` expõe os contratos que ele já consome.

## Funcionalidades

- Catálogo com seis tecnologias, filtros por tecnologia, nível, status e busca.
- Matrícula e progresso consistente por módulo/trilha.
- Geração e avaliação segura de desafios — não executa código enviado pelo usuário.
- Adaptador de IA com fallback local automático quando nenhuma chave está configurada.
- Certificados fictícios com credencial única para trilhas concluídas.
- REST documentado por Swagger, CLI e servidor MCP por stdio.

## Arquitetura

`Frontend → REST controllers → Services → Repositories`. As ferramentas MCP e a CLI chamam os mesmos services; não há lógica de negócio duplicada. Consulte [docs/architecture.md](docs/architecture.md) para o detalhamento.

## Tecnologias

React, Vite, TanStack Query/Router, Node.js, TypeScript strict, Express, Zod, Helmet, CORS, rate limiting, Swagger/OpenAPI, Vitest e MCP SDK.

## Instalação e execução

```bash
npm install
copy .env.example .env
npm run dev:api
npm run dev
```

No PowerShell, use `Copy-Item .env.example .env`. O frontend usará a API se `VITE_USE_MOCKS=false` e `VITE_API_URL=http://localhost:3333/api`; reinicie o Vite após mudar variáveis. Sem `.env`, o backend usa porta 3333 e IA mock, enquanto o frontend mantém os mocks por padrão.

## Scripts

```bash
npm run dev        # frontend
npm run dev:api    # API REST em http://localhost:3333
npm run dev:mcp    # MCP por stdio
npm run build      # build do frontend
npm run build:api  # compila o backend
npm run typecheck
npm run lint
npm run test
npm run cli -- trail TypeScript Iniciante
```

## API e Swagger

Com a API em execução, a documentação interativa está em [http://localhost:3333/api/docs](http://localhost:3333/api/docs), e o JSON OpenAPI em `/api/openapi.json`.

Principais rotas:

```text
GET  /api/trails?technology=TypeScript&level=Iniciante
GET  /api/trails/:id
POST /api/trails/:id/enroll
POST /api/challenges/generate
POST /api/challenges/submissions
GET  /api/certificates
POST /api/certificates
GET  /api/progress/:userId
POST /api/progress
GET  /api/me
```

As respostas de sucesso seguem `{ "data": ... }`. Erros seguem `{ "error": { "code", "message" } }`.

Exemplo de desafio:

```bash
curl -X POST http://localhost:3333/api/challenges/generate \
  -H "Content-Type: application/json" \
  -d '{"technology":"TypeScript","level":"Iniciante","difficulty":"easy"}'
```

## IA e segurança

Por padrão, `AI_PROVIDER=mock`, permitindo demonstração sem credenciais. Para um endpoint compatível com Chat Completions, configure `AI_PROVIDER=openai-compatible`, `AI_API_KEY`, `AI_MODEL` e, opcionalmente, `AI_BASE_URL`. Segredos nunca devem ser versionados.

A avaliação de solução é baseada em IA/mock e não executa código arbitrário no processo da API. A troca por sandbox isolado é uma evolução futura deliberada.

## MCP e CLI

O servidor MCP expõe `list_learning_trails`, `get_learning_trail`, `generate_challenge`, `get_challenge`, `generate_certificate`, `get_certificate` e `get_learning_progress`. Execute `npm run dev:mcp` e configure o cliente com o comando `npx tsx backend/src/mcp/index.ts`.

Exemplos de CLI:

```bash
npm run cli -- trail JavaScript Iniciante
npm run cli -- challenge Python Intermediário
npm run cli -- certificate Wallace React
```

## Testes

`npm run test` cobre os services, os principais contratos REST, validação, progresso, fallback de desafios e handlers MCP. A persistência em memória foi escolhida para o desafio; repositories isolam essa decisão, permitindo introduzir banco de dados depois sem alterar services ou transportes.
