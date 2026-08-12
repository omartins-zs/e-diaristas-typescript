# e-diaristas

Front-end da plataforma **e-diaristas**, onde o usuário informa seu CEP e visualiza os profissionais de limpeza que atendem a sua região.

Projeto construído com **Next.js + TypeScript + Material-UI**, dockerizado e coberto por testes unitários, de componente e end-to-end.

## Stack

- [Next.js](https://nextjs.org/) 11 + [React](https://react.dev/) 17
- [TypeScript](https://www.typescriptlang.org/)
- [Material-UI](https://mui.com/) (v5 alpha) com Emotion
- [Axios](https://axios-http.com/) para consumo da API
- [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/) (unitários e de componente)
- [Playwright](https://playwright.dev/) (end-to-end)
- [Docker](https://www.docker.com/) + Docker Compose

## Rodando com Docker (recomendado)

Único pré-requisito: Docker instalado.

```bash
docker compose up -d --build
```

A aplicação fica disponível em http://localhost:3000.

Para parar:

```bash
docker compose down
```

## Rodando localmente

Requer Node.js 18+.

```bash
npm install
npm run dev
```

## Configuração da API

O front consome uma API REST no endpoint `/api/diaristas-cidade?cep=`. A URL base é definida pela variável `NEXT_PUBLIC_API_URL` (padrão: `http://127.0.0.1:8000`).

Como a chamada é feita pelo navegador, o endereço precisa ser acessível a partir da máquina do usuário. Para apontar para outro host, ajuste o build arg no `docker-compose.yml`:

```yaml
build:
  args:
    NEXT_PUBLIC_API_URL: http://meu-host:8000
```

## Testes

```bash
npm test              # testes unitários e de componente
npm run test:coverage # com relatório de cobertura
npm run test:e2e      # testes end-to-end (sobe o servidor automaticamente)
npm run test:e2e:ui   # end-to-end em modo interativo
```

A suíte cobre serviços, hooks, todos os componentes de UI e o fluxo completo de busca — incluindo CEP inválido, estado de carregamento, resultados, lista vazia e erro da API. O limite mínimo de cobertura configurado é de 90%.

Os testes end-to-end mockam as respostas da API via `page.route`, então não é necessário ter o backend rodando.

## Estrutura

```
src/
├── data/
│   ├── @types/       # interfaces compartilhadas
│   ├── hooks/pages/  # lógica das páginas
│   └── services/     # API e validações
├── pages/            # rotas do Next.js
├── ui/
│   ├── components/   # componentes por categoria (inputs, surfaces, ...)
│   ├── styles/       # estilos globais e por página
│   └── themes/       # tema do Material-UI
└── __tests__/        # testes das páginas
e2e/                  # testes end-to-end (Playwright)
```

## Créditos

Projeto desenvolvido a partir do curso de Next.js da [TreinaWeb](https://www.treinaweb.com.br/).
