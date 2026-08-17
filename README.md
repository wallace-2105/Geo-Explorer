<h1 align="center">
  🧭 Geo Explorer
</h1>

<p align="center">
  Uma plataforma de aprendizado gamificada desenvolvida com tecnologias web modernas, projetada para engajar desenvolvedores através de trilhas de aprendizado, desafios interativos e certificações automatizadas.
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#-tecnologias-utilizadas">Tecnologias</a> •
  <a href="#-arquitetura-e-funcionalidades">Funcionalidades</a> •
  <a href="#-como-executar">Como executar</a> •
  <a href="#-servidor-mcp-model-context-protocol">MCP</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Concluído-success?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Licença-MIT-blue?style=for-the-badge" alt="Licença" />
</p>

---

## 🎯 Sobre o Projeto

O **Geo Explorer** é uma aplicação Fullstack moderna construída para oferecer um ecossistema educacional imersivo e interativo. O sistema permite que desenvolvedores se matriculem em trilhas de tecnologias específicas, resolvam desafios práticos de código com avaliação baseada em Inteligência Artificial, e ganhem certificações dinâmicas ao atingirem seus objetivos.

O foco central da plataforma foi adotar o estado da arte do desenvolvimento web, focando em escalabilidade, arquitetura limpa em Monorepo e garantindo o **End-to-End Type Safety** em todo o ciclo de vida dos dados, desde o banco até o cliente.

---

## 🚀 Tecnologias Utilizadas

### 🖥️ Frontend
<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactQuery&logoColor=white" alt="React Query" />
</p>

- Base sólida com **React 19** e roteamento tipado utilizando **TanStack Router**.
- Controle de cache e requisições assíncronas com **TanStack Query**.
- UI elegante e acessível com **shadcn/ui** (Radix Primitives) e **TailwindCSS**.

### ⚙️ Backend
<p>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma ORM" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
</p>

- API RESTful em **Node.js** com validação rigorosa de schemas utilizando **Zod**.
- Acesso a dados otimizado e fortemente tipado com **Prisma ORM**.
- Autenticação e proteção de rotas com **JWT (JSON Web Tokens)**.

### ☁️ Infraestrutura & DevOps
<p>
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render" />
</p>

- Identity Provider e Banco de Dados (PostgreSQL) mantidos no **Supabase**.
- Deploy de Frontend ultra-rápido via **Vercel**.
- Deploy da API Backend Serverless/Web Service via **Render**.

---

## 🏗️ Arquitetura e Funcionalidades

- **🔐 Autenticação Segura (Supabase Auth):** Criação de contas, login e proteção de sessão de usuário na API através de validação de assinaturas JWT (Stateless).
- **🛤️ Trilhas Gamificadas:** Caminhos de aprendizado onde o usuário avança progressivamente em diferentes módulos tecnológicos.
- **🤖 Validação com Inteligência Artificial:** Integração nativa para que códigos submetidos pelos alunos sejam analisados automaticamente.
- **📊 Atualizações Otimistas (Optimistic Updates):** O painel do aluno mostra o progresso instantaneamente sem depender de recarregamentos na UI.
- **🎓 Emissão Dinâmica de Certificados:** Geração de identificadores únicos atestando as conquistas finais dos alunos.

---

## 💻 Como Executar o Projeto

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu ambiente. Você precisará de uma conta no **Supabase** para configurar o banco de dados.

### 1. Clonando o Repositório
```bash
git clone https://github.com/wallace-2105/Geo-Explorer.git
cd Geo-Explorer
```

### 2. Instalação das Dependências
```bash
npm install
```

### 3. Configuração de Variáveis de Ambiente
Você deverá criar e preencher as chaves de API nos arquivos `.env`.

Na raiz do projeto (`.env`):
```env
VITE_SUPABASE_URL="sua_url_do_supabase"
VITE_SUPABASE_ANON_KEY="sua_chave_anonima_do_supabase"
VITE_API_URL="http://localhost:3000/api"
VITE_USE_MOCKS="false"
```

Dentro da pasta do servidor (`backend/.env`):
```env
DATABASE_URL="sua_url_postresql_do_supabase"
DIRECT_URL="sua_url_postresql_direct_do_supabase"
SUPABASE_JWT_SECRET="seu_jwt_secret"
```

### 4. Sincronização do Banco de Dados
Gere o Client do Prisma e sincronize as tabelas no PostgreSQL:
```bash
npx prisma generate --schema=backend/prisma/schema.prisma
npx prisma db push --schema=backend/prisma/schema.prisma
```

### 5. Iniciando a Aplicação
O sistema foi configurado para rodar as duas pontas da arquitetura de forma independente. Em seu terminal, inicie a API:
```bash
npm run dev:api
```

Em outro terminal, inicie o ambiente de desenvolvimento do Frontend:
```bash
npm run dev
```

A API estará respondendo em `http://localhost:3000` e a interface visual em `http://localhost:5173`.

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
<p align="center">
  Desenvolvido com 🩵 focando sempre na melhor experiência e qualidade técnica.
</p>
