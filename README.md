<div align="center">
   🚀 Geo-Explorer
  
  **Plataforma Full-Stack de Trilhas de Aprendizagem e Desafios para Desenvolvedores**
  
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
  ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
  ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
</div>

---

O **Geo-Explorer** é um ecossistema completo (Frontend, Backend, CLI e MCP) desenhado para proporcionar uma experiência imersiva de estudos. Com ele, os usuários podem explorar trilhas de conhecimento, acompanhar o progresso em tempo real, gerar desafios com Inteligência Artificial e emitir certificados exclusivos.

Tudo isso envelopado em um design moderno (*dark tech*) com micro-animações, feedback instantâneo e uma arquitetura escalável pronta para o mercado.

---

## ✨ Principais Funcionalidades

### 🎓 **Trilhas de Aprendizagem**
- Catálogo completo cobrindo 6 tecnologias principais (JavaScript, TypeScript, Python, Java, Node.js e React).
- Sistema de filtros instantâneos por nível (Iniciante, Intermediário, Avançado), tecnologia e status.
- Busca livre integrada.
- Matrícula e acompanhamento de progresso granular (módulo a módulo).

### 🧠 **Geração e Correção de Desafios via IA**
- Motor adaptativo que gera desafios de código com base no nível e tecnologia escolhidos.
- Sistema de submissão de soluções com feedback de pontuação (`score`) e status de aprovação.
- Correção estática (via IA ou mock fallback) para garantir total **segurança** (nenhum código arbitrário do usuário é executado no servidor).
- Suporte a fallback offline: caso não haja chave de API (OpenAI) configurada, um *MockAIProvider* assume para não quebrar a experiência.

### 🏆 **Sistema de Certificados**
- Emissão automática de certificados quando 100% de uma trilha é concluída.
- Geração de Credencial Única (ex: `GEO-XXX-YYYY-ZZZZZZZZ`) para validação.
- Listagem e visualização do histórico de certificados do usuário.

### 🛠️ **Integração Omnichannel (REST, CLI e MCP)**
A lógica de negócio central (Services) é consumida por 3 frentes distintas:
1. **Frontend Moderno (Web):** Interface rica em React.
2. **CLI (Linha de Comando):** Ferramenta para interagir com as trilhas direto do terminal.
3. **MCP Server (Model Context Protocol):** Integração para Agentes de IA interagirem nativamente com a plataforma.

---

## 💻 Tecnologias Utilizadas

O projeto adota o estado da arte do ecossistema JavaScript/TypeScript:

### **Frontend**
- **React 18** + **Vite**
- **TanStack Router** (Roteamento Type-Safe)
- **TanStack Query** (Gerenciamento de estado do servidor e caching)
- **Tailwind CSS** + **Radix UI** + **Lucide Icons** (Design System e Acessibilidade)

### **Backend**
- **Node.js** + **Express 5** (API RESTful)
- **TypeScript Strict Mode** (100% tipado de ponta a ponta)
- **Zod** (Validação implacável de payloads e queries)
- **CORS** + **Helmet** + **Express Rate Limit** (Segurança extrema)
- **Swagger / OpenAPI** (Documentação viva)

### **Ferramentas e Arquitetura**
- **Vitest** (Testes unitários e de integração hiper-rápidos)
- **Model Context Protocol (MCP) SDK**
- **Arquitetura em Camadas:** `Controllers → Services → Repositories` (Baixo acoplamento)
- Banco de dados **Em Memória** (Ideal para demonstração rápida, pronto para plugar um Prisma/PostgreSQL no futuro trocando apenas os Repositories).

---

## ⚙️ Instalação e Configuração

### 1. Clonando e Instalando Dependências
```bash
git clone https://github.com/wallace-2105/Geo-Explorer.git
cd Geo-Explorer
npm install
```

### 2. Configurando as Variáveis de Ambiente
O Frontend e o Backend precisam do arquivo `.env` configurado.
```bash
# Se estiver no Windows (PowerShell):
Copy-Item .env.example .env

# Se estiver no Linux / Mac / CMD:
cp .env.example .env
```
*(Certifique-se de que `VITE_USE_MOCKS=false` no `.env` para usar a API real).*

### 3. Rodando o Projeto (Dois Terminais)

Você precisará de dois terminais abertos para rodar o ecossistema completo.

**Terminal 1 (Inicia a API Backend na porta 3334):**
```bash
npm run dev:api
```

**Terminal 2 (Inicia o Frontend Web na porta 8080):**
```bash
npm run dev
```

> ⚠️ **Nota para usuários de Windows:** O backend utiliza a porta `3334` nativamente porque o serviço *Autodesk AM* costuma conflitar com a porta 3333. A comunicação entre as portas já está coberta pelo CORS.

---

## 📖 Documentação da API (Swagger)

Com o backend rodando, acesse a interface interativa do **Swagger** em:
👉 **[http://localhost:3334/api/docs](http://localhost:3334/api/docs)**

Todos os contratos de entrada e saída, além de testes *Try-it-out*, estão disponíveis lá. O JSON da especificação fica em `/api/openapi.json`.

---

## ⌨️ Usando a CLI (Command Line Interface)

O projeto inclui uma CLI interativa incrível. Experimente os comandos abaixo:

```bash
# Buscar trilhas disponíveis de uma tecnologia:
npm run cli -- trail TypeScript Iniciante

# Gerar um desafio de código:
npm run cli -- challenge JavaScript Avançado

# Emitir ou buscar um certificado:
npm run cli -- certificate NomeDoAluno React
```

---

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
