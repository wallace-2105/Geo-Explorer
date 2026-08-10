# Arquitetura do Geo-Explorer

## Fluxo principal

```text
Frontend (React)
    ↓ HTTP /api
Express routes/controllers
    ↓
Services (regras de negócio)
    ↓
Repositories (memória hoje; banco amanhã)
```

O frontend não foi refeito. Seus services já encapsulavam HTTP e receberam os mesmos contratos de resposta definidos pela API: sucesso em `{ data }` e erro em `{ error }`.

## Transportes compartilhados

```text
REST API ─┐
MCP      ├──→ Services ───→ Repositories
CLI      ┘
```

REST, MCP e CLI só validam/transformam entrada e chamam o mesmo caso de uso. Assim, por exemplo, a regra de que certificado exige trilha concluída reside em `CertificateService`, não em uma rota ou ferramenta.

## IA com fallback

```text
ChallengeService
    ↓
AIProvider interface
    ├── MockAIProvider (padrão, sem chave)
    └── OpenAICompatibleProvider (configurado por ambiente)
```

O provider real usa uma chamada HTTP compatível com Chat Completions. A resposta de IA é deliberadamente protegida por um fallback estrutural de desafio; a aplicação segue disponível se uma credencial não estiver configurada. A avaliação jamais executa o código do aluno diretamente.

## Estado e evolução

Os repositories em memória são adequados para a demonstração e testes determinísticos. O service recebe interfaces/repositories, portanto uma implementação PostgreSQL, Prisma ou Redis pode substituir a atual sem mudar controllers, MCP ou CLI.

## Segurança e contratos

- Zod valida query strings, parâmetros e payloads.
- Helmet, CORS configurável e rate limiting protegem a superfície HTTP.
- O middleware centralizado mapeia erros de validação, domínio e desconhecidos para respostas seguras.
- `.env.example` documenta configuração e nenhuma chave é armazenada no repositório.
