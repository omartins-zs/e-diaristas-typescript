<h1 align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="45" height="45" alt="Next.js" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="45" height="45" alt="TypeScript" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="45" height="45" alt="React" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" width="45" height="45" alt="Material-UI" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" width="45" height="45" alt="Jest" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="45" height="45" alt="Docker" />
  <br />
  e-diaristas
</h1>

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.3-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Material UI](https://img.shields.io/badge/Material%20UI-v9-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![Vulnerabilities](https://img.shields.io/badge/vulnerabilities-0-brightgreen?style=for-the-badge)](#-testes)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen?style=for-the-badge)](#-testes)

</div>

---

## 📝 Descrição

Front-end da plataforma **e-diaristas**, onde o usuário informa seu CEP e visualiza os profissionais de limpeza que atendem à sua região.

Projeto desenvolvido durante o **Workshop Multi Stack da [TreinaWeb](https://www.treinaweb.com.br/)** — que aborda a construção da mesma aplicação em diferentes stacks — e posteriormente **dockerizado e coberto por testes automatizados** (unitários, de componente e end-to-end).

<cite>Aplicação web que conecta clientes a diaristas disponíveis na sua localidade, a partir da busca por CEP.</cite>

---

## 🚦 Status do Projeto

<h4 align="center">
  ✅ e-diaristas &nbsp;•&nbsp; 🚀 Concluído &nbsp;•&nbsp; ⚙️ Aberto a melhorias
</h4>

---

## 🏗️ Arquitetura do Projeto

> **Tipo:** 🧩 Serviço desacoplado (front-end de uma arquitetura multi-serviço)

Este repositório contém **apenas o front-end**. A aplicação consome uma **API REST externa** (padrão: `http://127.0.0.1:8000`), mantida em um projeto separado — reflexo da proposta *multi stack* do workshop, em que o mesmo back-end pode ser implementado em linguagens diferentes.

```
┌─────────────────────────┐         HTTP          ┌──────────────────────┐
│   e-diaristas (Next.js) │ ────────────────────▶ │   API REST externa   │
│   este repositório      │  /api/diaristas-cidade │  (projeto separado)  │
└─────────────────────────┘                        └──────────────────────┘
```

A comunicação é feita **pelo navegador do usuário** (client-side), portanto a URL da API precisa ser acessível a partir da máquina de quem acessa a aplicação.

---

## 🔥 Pré-requisitos

Escolha **uma** das opções:

### 🐳 Via Docker (recomendado)

- **Docker** 20+
- **Docker Compose** v2+

### 💻 Local

- **Node.js** 20.9+ (exigido pelo Next.js 16)
- **npm** 10+

---

## 🚀 Tecnologias Utilizadas

| Categoria | Tecnologia |
|-----------|-----------|
| 🧠 **Linguagem** | TypeScript 5.9 |
| ⚛️ **Framework** | Next.js 16.3 (Pages Router + Turbopack) + React 19.2 |
| 🎨 **UI** | Material UI v9 + Emotion (com SSR via `@mui/material-nextjs`) |
| 🌐 **HTTP** | Axios 1.19 |
| 🎭 **Máscaras** | react-imask |
| 🧪 **Testes unitários** | Jest 30 + Testing Library |
| 🎬 **Testes E2E** | Playwright |
| 🔍 **Lint** | ESLint 9 (flat config) + eslint-config-next |
| 🐳 **Infra** | Docker + Docker Compose (multi-stage build, Node 22) |
| 📐 **Padrões** | Componentização por categoria, custom hooks, camada de services |

> 🔒 **`npm audit`: 0 vulnerabilidades.**

---

## 🔨 Funcionalidades

- 🔍 **Busca de profissionais por CEP**
- 🎭 **Máscara automática** no campo de CEP (`99999-999`)
- ✅ **Validação em tempo real** — o botão de busca só habilita com um CEP válido (8 dígitos)
- ⏳ **Feedback de carregamento** com spinner durante a requisição
- 👥 **Listagem de diaristas** com avatar, nome, avaliação e cidade
- 🔢 **Contador de profissionais restantes**, com texto no singular/plural
- 🈳 **Mensagem dedicada** quando não há diaristas na região
- ⚠️ **Tratamento de erro** quando o CEP não é encontrado ou a API falha
- 📱 **Layout responsivo** com breakpoints do Material-UI
- 🎨 **Tema customizado** (paleta, tipografia Poppins e variantes de componentes)
- 🔐 **Selo de ambiente seguro** e rodapé institucional com links para as lojas

---

## 🎯 Sobre o Projeto

Sistema desenvolvido demonstrando boas práticas de desenvolvimento, arquitetura limpa e organização de código, com foco em escalabilidade e manutenção.

Além do escopo original do workshop, o projeto foi evoluído com:

- 🐳 **Containerização completa**, permitindo executar em qualquer máquina com um único comando
- 🧪 **Suíte de testes automatizados** com 100% de cobertura
- ⚙️ **Configuração por variável de ambiente** para a URL da API
- 🐛 **Correções de bugs** encontrados durante a escrita dos testes (máscara de CEP incorreta, label sem associação ao input, seletor CSS inválido e tipagens que quebravam o build)
- ⬆️ **Modernização completa da stack**, saindo de Next.js 11 / React 17 / Material-UI v5 alpha para **Next.js 16 / React 19 / Material UI v9**, zerando as 35 vulnerabilidades reportadas pelo `npm audit`
- 🖼️ **SSR de estilos com Emotion** e migração das fontes para o `_document`, eliminando o flash de conteúdo sem estilo

---

## 📸 Preview do Projeto

🚧 Preview não disponível no projeto.

---

## 🌐 API Consumida

A aplicação consome um único endpoint da API externa:

```http
GET /api/diaristas-cidade?cep=07173000
```

**Resposta esperada:**

```json
{
  "diaristas": [
    {
      "nome_completo": "Maria Silva",
      "foto_usuario": "https://...",
      "reputacao": 4,
      "cidade": "São Paulo"
    }
  ],
  "quantidade_diaristas": 3
}
```

🚧 O projeto não possui documentação automatizada (Swagger) ou collections do Postman disponíveis — por ser apenas o front-end, a documentação pertence ao repositório da API.

---

## 💻 Comandos

### 🐳 Executando com Docker

```bash
docker compose up -d --build
```

A aplicação ficará disponível em **http://localhost:3000**.

Para parar:

```bash
docker compose down
```

### 💻 Executando localmente

```bash
npm install
npm run dev
```

### 🏗️ Build de produção

```bash
npm run build
npm start
```

> ⚠️ Estes são comandos básicos. Verifique no projeto arquivos como:
> README.md, COMO_EXECUTAR.md ou docs/ para instruções completas.

---

## 🧪 Testes

```bash
npm test              # testes unitários e de componente
npm run test:coverage # com relatório de cobertura
npm run test:e2e      # testes end-to-end (sobe o servidor automaticamente)
npm run test:e2e:ui   # end-to-end em modo interativo
npm run lint          # ESLint
```

| Tipo | Quantidade | Cobertura |
|------|-----------|-----------|
| 🧩 Unitários e de componente (Jest) | 41 testes | **100%** (mínimo exigido: 90%) |
| 🎬 End-to-end (Playwright) | 5 cenários | Fluxo completo da home |

A suíte cobre services, hooks, todos os componentes de UI e o fluxo completo de busca — incluindo CEP inválido, estado de carregamento, resultados, lista vazia e erro da API.

> 💡 Os testes E2E mockam as respostas da API via `page.route`, portanto **não é necessário ter o back-end rodando**.

---

## ⚙️ Configuração da API

A URL base da API é definida pela variável `NEXT_PUBLIC_API_URL` (padrão: `http://127.0.0.1:8000`).

Para apontar para outro host, ajuste o build arg no `docker-compose.yml`:

```yaml
build:
  args:
    NEXT_PUBLIC_API_URL: http://meu-host:8000
```

---

## 🧱 Estrutura do Projeto

```
├── e2e/                      # 🎬 testes end-to-end (Playwright)
├── public/                   # 🖼️ imagens, fontes e ícones
├── src/
│   ├── __tests__/pages/      # 🧪 testes das páginas
│   ├── data/
│   │   ├── @types/           # 📐 interfaces compartilhadas
│   │   ├── hooks/pages/      # 🪝 lógica das páginas (custom hooks)
│   │   └── services/         # 🌐 API e validações
│   ├── pages/                # 🗺️ rotas do Next.js (_app e _document)
│   ├── ui/
│   │   ├── components/       # 🧩 componentes por categoria
│   │   │   ├── data-display/
│   │   │   ├── feedback/
│   │   │   ├── inputs/
│   │   │   └── surfaces/
│   │   ├── styles/           # 💅 estilos globais e por página
│   │   └── themes/           # 🎨 tema do Material UI
│   └── test-utils.tsx        # 🛠️ render helper com ThemeProvider
├── Dockerfile                # 🐳 build multi-stage
├── docker-compose.yml        # 🐳 orquestração
├── eslint.config.mjs         # 🔍 ESLint (flat config)
├── jest.config.js            # 🧪 configuração do Jest
└── playwright.config.ts      # 🎬 configuração do Playwright
```

---

## 📝 Melhorias Futuras

- [x] ~~Atualizar Next.js 11 → 16 e Material-UI v5 alpha → Material UI v9~~
- [x] ~~Resolver as vulnerabilidades reportadas pelo `npm audit`~~
- [x] ~~Mover as fontes e o CSS do `_app` para o `_document`~~
- [ ] Adicionar pipeline de CI executando testes e build a cada push
- [ ] Implementar as telas seguintes do fluxo de contratação
- [ ] Adicionar preview (GIF/screenshots) ao repositório
- [ ] Avaliar a migração do Pages Router para o App Router

---

## 🖋️ Dicas

- 🐳 O `Dockerfile` usa **multi-stage build**: a imagem final instala apenas dependências de produção, ficando bem mais enxuta.
- 🧪 Os testes das páginas ficam em `src/__tests__/` e **não** dentro de `src/pages/` — o Next.js trataria qualquer arquivo dessa pasta como uma rota.
- 🎯 O limite mínimo de cobertura está definido em `jest.config.js` (`coverageThreshold`): a suíte falha se cair abaixo de 90%.
- 🔍 Para depurar os testes E2E visualmente, use `npm run test:e2e:ui`.
- ⚡ O Next.js 16 usa **Turbopack por padrão** no `dev` e no `build` — o build de produção leva ~3s.
- 🎨 O `_document.tsx` injeta os estilos do Emotion gerados no servidor via `@mui/material-nextjs`, evitando o flash de conteúdo sem estilo.

---

## 🎓 Créditos

Projeto desenvolvido a partir do **Workshop Multi Stack e-diaristas** da [TreinaWeb](https://www.treinaweb.com.br/), com melhorias e automações adicionais implementadas posteriormente.

---

<div align="center">

Feito com ❤️ por **Gabriel Martins** 🚀

</div>
