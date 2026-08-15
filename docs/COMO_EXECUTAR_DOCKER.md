# Como Executar com Docker — e-diaristas

Guia para executar o sistema utilizando Docker Desktop.

---

## Stack e containers

| Serviço | Container | Função | Porta |
| --- | --- | --- | --- |
| web | `e-diaristas-typescript-web-1` | Aplicação Next.js (`next start`) | 8080 |

> O `docker-compose.yml` declara `name: e-diaristas-typescript`, então o prefixo dos containers é fixo e **não** depende do nome da pasta onde o repositório está clonado.

> Este projeto é um front-end sem estado. Não há containers de banco de dados, servidor web adicional, cache, filas ou administração — o `next start` já serve a aplicação diretamente.

A imagem usa **build multi-stage** (Node 22 Alpine): as dependências de desenvolvimento ficam apenas na etapa de build, e a imagem final carrega somente o necessário para rodar.

---

## 1) Preparar ambiente

```bash
cp .env.example .env
```

Deixe o bloco `DOCKER` ativo e o bloco `LOCAL` comentado:

```env
# LOCAL
# APP_PORT=3000
# NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

# DOCKER
APP_PORT=8080
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

> `APP_PORT` define a porta publicada no seu computador. Internamente o container sempre escuta na porta `3000`.
>
> `NEXT_PUBLIC_API_URL` é o endereço da API acessado **pelo navegador do usuário** — e não de dentro do container. Por isso ele aponta para um endereço da máquina host, não para um nome de serviço do Compose.

---

## 2) Subir containers

```bash
docker compose up -d --build
```

```bash
docker compose ps
```

---

## 3) Alterar a URL da API

Variáveis com prefixo `NEXT_PUBLIC_` são embutidas em tempo de build. Após alterar o `.env`, refaça a imagem:

```bash
docker compose up -d --build
```

---

## 4) Acessos

| Recurso | URL |
| --- | --- |
| Aplicação | http://localhost:8080 |
| Página 404 | http://localhost:8080/rota-inexistente |

### Credenciais de teste

A aplicação é pública e não possui login. Os CEPs e cenários de teste estão em [ACESSOS_TESTES.md](ACESSOS_TESTES.md).

---

## 5) Logs e diagnóstico

```bash
docker compose logs -f
```

```bash
docker compose logs -f web
```

Verificar se a aplicação responde:

```bash
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:8080/
```

---

## 6) Parar ou reconstruir

```bash
docker compose down
```

```bash
docker compose up -d --build
```

Para remover também a imagem gerada:

```bash
docker compose down --rmi local
```

> Este projeto não usa volumes de dados — parar os containers não apaga nada.

---

## 7) Problemas comuns

### Porta 8080 já está em uso

Altere `APP_PORT` no `.env` e suba novamente:

```bash
docker compose up -d
```

### A busca sempre retorna "CEP nao encontrado"

O navegador não alcança o endereço em `NEXT_PUBLIC_API_URL`. Confirme se a API está no ar e refaça o build após corrigir o `.env`.

---

## Próximo passo

Para desenvolvimento com hot reload, consulte [COMO_EXECUTAR_LOCAL.md](COMO_EXECUTAR_LOCAL.md).
