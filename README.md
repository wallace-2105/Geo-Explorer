<div align="center">
  <img alt="Geo Explorer Logo" src="public/favicon.ico" width="100" />
</div>

<h1 align="center">
   Geo Explorer
</h1>

<p align="center">
  Uma plataforma de aprendizado gamificada desenvolvida com tecnologias web modernas, projetada para engajar desenvolvedores através de trilhas de aprendizado, desafios interativos e certificações automatizadas.
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#-arquitetura-e-tecnologias">Tecnologias</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-como-executar">Como executar</a>
</p>

---

## 🎯 Sobre o Projeto

O **Geo Explorer** é uma aplicação completa (Fullstack) construída com o objetivo de oferecer um ecossistema educacional interativo. O sistema permite que usuários se matriculem em trilhas de tecnologia, respondam a desafios práticos avaliados por inteligência artificial, acompanhem seu progresso e emitam certificados ao concluir todas as etapas.

Este projeto demonstra a capacidade de construir arquiteturas modernas e escaláveis em Monorepo, separando responsabilidades entre uma **API RESTful em Node.js** e um **Frontend reativo em React**.

## 🚀 Arquitetura e Tecnologias

A aplicação utiliza o estado da arte em desenvolvimento web moderno, garantindo tipagem estrita de ponta a ponta (End-to-End Type Safety), performance e excelente experiência de desenvolvimento (DX).

### 🖥️ Frontend (Client-side)
Desenvolvido com foco em performance e componentização acessível:
- **[React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)** - Base reativa e tipagem estática robusta.
- **[Vite](https://vitejs.dev/)** - Bundler ultrarrápido.
- **[TanStack Router](https://tanstack.com/router/latest) & [TanStack Query](https://tanstack.com/query/latest)** - Roteamento *type-safe* e gerenciamento de estado/cache de requisições assíncronas.
- **[Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)** - Estilização utilitária e componentes de UI baseados em [Radix Primitives](https://www.radix-ui.com/), garantindo acessibilidade (a11y).
- **[Supabase Auth](https://supabase.com/auth)** - Gerenciamento de sessão de usuários.

### ⚙️ Backend (API Server)
Construído para ser seguro, escalável e de fácil manutenção:
- **[Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)** - Servidor ágil e padronizado.
- **[Prisma ORM](https://www.prisma.io/)** - Mapeamento objeto-relacional moderno e *type-safe*.
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional hospedado via Supabase.
- **[Zod](https://zod.dev/)** - Validação rigorosa de esquemas de entrada (Input Validation).
- **[JWT (JSON Web Tokens)](https://jwt.io/)** - Autenticação Stateless protegendo as rotas privadas.

### ☁️ Infraestrutura e Deploy (CI/CD)
- **[Vercel](https://vercel.com/)** - Hospedagem otimizada do Frontend.
- **[Render](https://render.com/)** - Hospedagem escalável da API Node.js.
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service fornecendo PostgreSQL escalonado (com PgBouncer) e Identity Provider (Auth).

---

## ✨ Funcionalidades

- **🔐 Autenticação Segura:** Fluxo de Login/Registro utilizando integração direta com Supabase Auth e verificação de JWT pelo backend.
- **🛤️ Trilhas Dinâmicas:** Engajamento do usuário através de rotas de aprendizado (ex: JavaScript, TypeScript, Node.js).
- **🤖 Desafios com Avaliação (AI):** Geração dinâmica e avaliação das submissões de código dos usuários.
- **📊 Progresso em Tempo Real:** Atualizações de progresso centralizadas, alimentando o perfil do usuário em tempo real via *Optimistic Updates*.
- **🎓 Emissão de Certificados:** Geração de credenciais únicas e rastreáveis na conclusão de trilhas.

---

## 💻 Como executar (Localmente)

Para rodar este projeto em sua máquina, você precisará ter o [Node.js](https://nodejs.org/) instalado. Você também precisará configurar um projeto no Supabase para o Banco de Dados e Auth.

### 1. Clone o repositório
```bash
git clone https://github.com/wallace-2105/Geo-Explorer.git
cd Geo-Explorer
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as Variáveis de Ambiente
Crie arquivos `.env` na raiz e na pasta `backend/` seguindo as instruções dos arquivos de exemplo, e preencha com as credenciais do seu Supabase:
- `backend/.env` (DATABASE_URL, DIRECT_URL, SUPABASE_JWT_SECRET)
- `.env` (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)

### 4. Configure o Banco de Dados (Prisma)
```bash
# Sincroniza a estrutura do banco de dados e gera o cliente Prisma
npx prisma generate --schema=backend/prisma/schema.prisma
npx prisma db push --schema=backend/prisma/schema.prisma
```

### 5. Inicie a Aplicação
Abra dois terminais para iniciar os ambientes simultaneamente:

**Terminal 1 (Backend - API):**
```bash
npm run dev:api
```

**Terminal 2 (Frontend - Vite):**
```bash
npm run dev
```

O Frontend estará rodando em `http://localhost:5173` e a API em `http://localhost:3000`.

---

<p align="center">
  Desenvolvido com 🩵 e muita dedicação.
</p>
