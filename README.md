## 🤖 Servidor MCP (Model Context Protocol)
O Geo-Explorer pode servir como provedor de contexto e ferramentas para Agentes de IA. 
O servidor MCP expõe as *tools*: `list_learning_trails`, `get_learning_trail`, `generate_challenge`, `get_challenge`, `generate_certificate`, `get_certificate` e `get_learning_progress`.
Para rodar via STDIO (como esperado por clientes MCP):
```bash
npm run dev:mcp
```
*(Para configurar em clientes como Cursor ou Claude Desktop, aponte o comando para `npx tsx backend/src/mcp/index.ts`)*.
---
## ✅ Testes e Qualidade
O projeto é coberto por testes rápidos utilizando o **Vitest**, garantindo que as regras de negócio, a resposta da API e o MCP funcionem perfeitamente.
```bash
npm run test        # Roda a suíte de testes (7 testes core)
npm run typecheck   # Valida a tipagem estática do Front e Back
npm run lint        # Análise de estilo de código
```
---
<div align="center">
  <i>Feito com capricho para o ecossistema moderno de desenvolvimento.</i>
</div>
