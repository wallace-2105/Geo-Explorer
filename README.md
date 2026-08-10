

Projeto: Geo-Explorer

Quero construir uma aplicação web chamada Geo-Explorer, uma plataforma de exploração de trilhas de aprendizagem para desenvolvedores.

Este projeto será utilizado como projeto de portfólio e posteriormente terá um backend completo desenvolvido em Node.js + TypeScript, com testes automatizados, arquitetura organizada, MCP e integração com IA.





linguagem

dificuldade

área para código

botão para enviar solução

IMPORTANTE:

A lógica real de geração e avaliação será implementada posteriormente pelo backend.

Por enquanto, deixe a interface preparada para receber esses dados através de uma API.

5. Certificados

Criar:

/certificados

Mostrar certificados conquistados.

Criar também uma visualização de certificado.

O certificado deve parecer profissional e conter:

nome do usuário

nome da trilha

tecnologia

nível

data

identificador do certificado

O certificado é fictício e faz parte do projeto.

6. Perfil

Criar:

/perfil

Mostrar:

nome

avatar

progresso

trilhas concluídas

desafios realizados

certificados

tecnologias estudadas

Arquitetura frontend

Organize o projeto pensando em integração futura com uma API.

Sugestão:

src/

components/
pages/
layouts/
services/
hooks/
types/
utils/
data/
assets/

Criar uma camada de serviços para API.

Por exemplo:

services/api.ts

services/trails.ts

services/challenges.ts

services/certificates.ts

Não espalhar chamadas HTTP diretamente pelos componentes.

Contratos de API

Mesmo que o backend ainda não exista, crie tipos/interfaces TypeScript que representem os dados esperados.

Exemplo conceitual:

Trail

id

title

technology

level

description

modules

progress

Challenge

id

title

technology

level

difficulty

description

requirements

examples

Certificate

id

userName

trailName

technology

level

issuedAt

Esses contratos deverão facilitar posteriormente a integração com o backend Node.js.

Preparação para IA

O sistema futuramente terá integração com IA.

Não implemente a IA agora.

Porém, a interface deve estar preparada para receber respostas do backend.

Criar estados para:

carregando geração do desafio

desafio gerado

erro na geração

geração novamente

resposta da IA

Preparação para MCP

O frontend não deve implementar MCP diretamente.

O MCP será responsabilidade do backend.

Porém, organize a aplicação de forma que o frontend consuma recursos através de uma API.

Arquitetura futura:

Frontend
↓
REST API
↓
Node.js + TypeScript
↓
Services
↓
MCP / IA / Dados

Dados mockados

Para permitir que a interface seja visualizada antes do backend existir, utilize dados mockados apenas como fallback/desenvolvimento.

IMPORTANTE:

Separe claramente os mocks da camada real de API.

Não misture dados fictícios diretamente nos componentes.

UX

Criar:

loading skeleton

empty states

error states

toast notifications

confirmação de ações

navegação intuitiva

responsividade mobile/tablet/desktop

Qualidade

Priorize:

componentes reutilizáveis

TypeScript

código limpo

baixo acoplamento

acessibilidade

responsividade

separação de responsabilidades

Evite:

componentes gigantes

lógica duplicada

dados espalhados

chamadas de API dentro da UI

soluções difíceis de manter

Resultado esperado

Ao final, quero uma aplicação frontend profissional e funcional visualmente, com:

Dashboard

Trilhas

Detalhes da trilha

Desafios

Certificados

Perfil

navegação

responsividade

mocks separados

contratos TypeScript

camada de serviços preparada para API

O mais importante:

NÃO tente implementar todo o backend agora.

A próxima etapa será entregar esse projeto para outro agente desenvolver o backend em Node.js + TypeScript, testes, arquitetura, MCP e integração com IA.

Portanto, deixe o frontend com uma arquitetura clara e preparada para essa integração.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2e64ccc7-f7db-4a28-b03e-efbb39d97262).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
