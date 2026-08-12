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

[![Next.js](https://img.shields.io/badge/Next.js-11.0-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-17.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Material-UI](https://img.shields.io/badge/Material--UI-v5-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
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

- **Node.js** 18+
- **npm** 8+

> 💡 O Next.js 11 utiliza um hashing incompatível com o OpenSSL 3 do Node ≥ 17. A flag `--openssl-legacy-provider` **já está configurada** nos scripts do projeto, então versões novas do Node funcionam sem ajustes manuais.

---

## 🚀 Tecnologias Utilizadas

| Categoria | Tecnologia |
|-----------|-----------|
| 🧠 **Linguagem** | TypeScript 4.3 |
| ⚛️ **Framework** | Next.js 11 + React 17 |
| 🎨 **UI** | Material-UI v5 (alpha) + Emotion |
| 🌐 **HTTP** | Axios |
| 🎭 **Máscaras** | react-input-mask |
| 🧪 **Testes unitários** | Jest + Testing Library |
| 🎬 **Testes E2E** | Playwright |
| 🐳 **Infra** | Docker + Docker Compose (multi-stage build) |
| 📐 **Padrões** | Componentização por categoria, custom hooks, camada de services |

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
- 🐛 **Correções de bugs** encontrados durante a escrita dos testes (máscara de CEP incorreta, label sem associação ao input e tipagem que quebrava o build de produção)

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
```

| Tipo | Quantidade | Cobertura |
|------|-----------|-----------|
| 🧩 Unitários e de componente (Jest) | 36 testes | **100%** (mínimo exigido: 90%) |
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
│   ├── pages/                # 🗺️ rotas do Next.js
│   ├── ui/
│   │   ├── components/       # 🧩 componentes por categoria
│   │   │   ├── data-display/
│   │   │   ├── feedback/
│   │   │   ├── inputs/
│   │   │   └── surfaces/
│   │   ├── styles/           # 💅 estilos globais e por página
│   │   └── themes/           # 🎨 tema do Material-UI
│   └── test-utils.tsx        # 🛠️ render helper com ThemeProvider
├── Dockerfile                # 🐳 build multi-stage
├── docker-compose.yml        # 🐳 orquestração
├── jest.config.js            # 🧪 configuração do Jest
└── playwright.config.ts      # 🎬 configuração do Playwright
```

---

## 📝 Melhorias Futuras

- [ ] Atualizar Next.js 11 → 14+ e Material-UI v5 alpha → estável
- [ ] Resolver as vulnerabilidades reportadas pelo `npm audit` (herdadas das dependências antigas)
- [ ] Adicionar pipeline de CI executando testes e build a cada push
- [ ] Implementar as telas seguintes do fluxo de contratação
- [ ] Adicionar preview (GIF/screenshots) ao repositório
- [ ] Mover as fontes e o CSS do `_app` para o `_document` (avisos do ESLint do Next)

---

## 🖋️ Dicas

- 🐳 O `Dockerfile` usa **multi-stage build**: a imagem final instala apenas dependências de produção, ficando bem mais enxuta.
- 🧪 Os testes das páginas ficam em `src/__tests__/` e **não** dentro de `src/pages/` — o Next.js trataria qualquer arquivo dessa pasta como uma rota.
- 🎯 O limite mínimo de cobertura está definido em `jest.config.js` (`coverageThreshold`): a suíte falha se cair abaixo de 90%.
- 🔍 Para depurar os testes E2E visualmente, use `npm run test:e2e:ui`.

---

## 🎓 Créditos

Projeto desenvolvido a partir do **Workshop Multi Stack e-diaristas** da [TreinaWeb](https://www.treinaweb.com.br/), com melhorias e automações adicionais implementadas posteriormente.

---

<div align="center">

Feito com ❤️ por **Gabriel Martins** 🚀

</div>
