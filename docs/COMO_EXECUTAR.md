# Como Executar — e-diaristas

Escolha **um** guia conforme seu ambiente:

| Guia | Quando usar | Requisitos no PC |
| --- | --- | --- |
| **[COMO_EXECUTAR_DOCKER.md](COMO_EXECUTAR_DOCKER.md)** | Executar em qualquer máquina com containers | Docker Desktop |
| **[COMO_EXECUTAR_LOCAL.md](COMO_EXECUTAR_LOCAL.md)** | Desenvolver com hot reload | Node.js e npm |
| [ACESSOS_TESTES.md](ACESSOS_TESTES.md) | URLs e fluxos de teste | — |

> Este projeto é um **front-end Next.js**. Não possui banco de dados, autenticação nem área administrativa. Os dados vêm de uma **API REST externa**, mantida em outro repositório.

---

## Início rápido

### Local

Ative o bloco `LOCAL` no `.env` e execute:

```bash
cp .env.example .env
```

```bash
npm install
```

```bash
npm run dev
```

Aplicação:

http://localhost:3000

### Docker

Ative o bloco `DOCKER` no `.env` e execute:

```bash
cp .env.example .env
```

```bash
docker compose up -d --build
```

Aplicação:

http://localhost:8080

---

## Logins demo

O sistema é público e **não possui autenticação**. Não há usuários, e-mails ou senhas.

Os dados de entrada para teste (CEPs e cenários esperados) estão em [ACESSOS_TESTES.md](ACESSOS_TESTES.md).

---

## URLs principais

| Área | Local | Docker |
| --- | --- | --- |
| Página inicial (busca por CEP) | http://localhost:3000 | http://localhost:8080 |
| Página 404 | http://localhost:3000/rota-inexistente | http://localhost:8080/rota-inexistente |

---

## Testes

```bash
npm test
```

```bash
npm run test:e2e
```

Ambas as suítes simulam as respostas da API — **não é necessário ter o back-end rodando**.

---

## Outros documentos

- [COMO_EXECUTAR_LOCAL.md](COMO_EXECUTAR_LOCAL.md) — Execução local com hot reload
- [COMO_EXECUTAR_DOCKER.md](COMO_EXECUTAR_DOCKER.md) — Execução com containers
- [ACESSOS_TESTES.md](ACESSOS_TESTES.md) — URLs e dados de teste
