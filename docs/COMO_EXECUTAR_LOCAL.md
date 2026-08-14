# Como Executar Localmente — e-diaristas

Guia para rodar **sem Docker**, direto com Node.js.

> **Não quer instalar Node.js?** Use [COMO_EXECUTAR_DOCKER.md](COMO_EXECUTAR_DOCKER.md) — basta Docker Desktop, em qualquer Windows, Mac ou Linux.

---

## Requisitos

Não é necessário instalar o Next.js globalmente — o framework entra no projeto com `npm install`.

| Ferramenta | Obrigatório? | Versão mínima |
| --- | --- | --- |
| **Node.js** | Sim | 20.9+ (exigido pelo Next.js 16) |
| **npm** | Sim | 10+ |

Este projeto **não utiliza** banco de dados, PHP, filas, cache externo ou servidor web adicional.

### Ambiente de referência (máquina de desenvolvimento)

Stack usada na elaboração deste projeto — **não é requisito fixo**, só referência do que já foi testado:

| Ferramenta | Versão |
| --- | --- |
| **Node.js** | **22.14.0** |
| **npm** | **11.4.2** |
| Next.js (no projeto) | 16.3.0 |
| React (no projeto) | 19.2.8 |
| TypeScript (no projeto) | 5.9.3 |

Para conferir no seu computador:

```bash
node -v
```

```bash
npm -v
```

---

## 1) Preparar ambiente

### 1.1 Acessar o projeto

```bash
cd c:/Projetos/e-diaristas-typescript
```

### 1.2 Copiar variáveis de ambiente

```bash
cp .env.example .env
```

No PowerShell:

```powershell
Copy-Item .env.example .env
```

### 1.3 Ativar o ambiente local

Deixe o bloco `LOCAL` ativo e o bloco `DOCKER` comentado no `.env`:

```env
# LOCAL
APP_PORT=3000
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

# DOCKER
# APP_PORT=8080
# NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

> `NEXT_PUBLIC_API_URL` aponta para a API externa que lista as diaristas. A chamada acontece **no navegador**, então o endereço precisa ser acessível a partir da sua máquina.

---

## 2) Instalar dependências

```bash
npm install
```

---

## 3) Rodar aplicação

```bash
npm run dev
```

Aplicação:

http://localhost:3000

---

## 4) Build de produção

```bash
npm run build
```

```bash
npm start
```

---

## 5) Banco de dados e filas

Este projeto **não possui banco de dados, migrations, seeders, filas ou workers**. Todo o estado vem da API externa em tempo de execução.

---

## 6) Acessos

| Recurso | URL |
| --- | --- |
| Página inicial (busca por CEP) | http://localhost:3000 |
| Página 404 | http://localhost:3000/rota-inexistente |

### Credenciais de teste

A aplicação é pública e não possui login. Os CEPs e cenários de teste estão em [ACESSOS_TESTES.md](ACESSOS_TESTES.md).

---

## 7) Comandos úteis

```bash
npm test
```

```bash
npm run test:coverage
```

```bash
npm run test:e2e
```

```bash
npm run lint
```

---

## 8) Problemas comuns

### A busca sempre retorna "CEP nao encontrado"

A API externa não está acessível. Confira o valor de `NEXT_PUBLIC_API_URL` no `.env` e se a API está no ar.

### Alterações do `.env` não foram aplicadas

Variáveis com prefixo `NEXT_PUBLIC_` são lidas em tempo de build. Reinicie o servidor:

```bash
npm run dev
```

Para build de produção, refaça o build:

```bash
npm run build
```

### Porta 3000 já está em uso

Altere `APP_PORT` no `.env` ou rode em outra porta:

```bash
npx next dev -p 3001
```

### Erros após atualizar dependências

```bash
rm -rf .next node_modules
```

```bash
npm install
```

---

## Próximo passo

Para ambiente containerizado, consulte [COMO_EXECUTAR_DOCKER.md](COMO_EXECUTAR_DOCKER.md).
