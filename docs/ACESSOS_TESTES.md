# 🔐 Acessos e Dados de Teste

> ⚠️ **Importante:** este projeto é um **front-end puro** (Next.js). Ele **não possui banco de dados, autenticação, área logada nem *seeders***.
> Não existem usuários, e-mails ou senhas de teste a serem informados — nenhuma credencial foi inventada para preencher este documento.
> O que existe para testar são os **CEPs de entrada** e as **respostas da API externa** que a aplicação consome.

## 1. Acesso ao Sistema (Usuários de Teste)

| Perfil | E-mail / Usuário | Senha | Permissão / Detalhes |
| --- | --- | --- | --- |
| — | — | — | **A aplicação é pública e não possui login.** Toda a interface fica acessível na raiz (`/`), sem autenticação. |

### 1.1. Dados de entrada para teste (substituem os usuários de seeder)

O único dado que o usuário informa é o **CEP**. A validação exige exatamente **8 dígitos** (`ValidationService.cep`).

| Cenário | Valor de entrada | Resultado esperado na interface |
| --- | --- | --- |
| CEP incompleto | `1234567` (7 dígitos) | Botão **Buscar** permanece desabilitado |
| CEP válido | `07173-000` | Botão **Buscar** habilita e a requisição é disparada |
| CEP válido com máscara | Digitar `07173000` | Campo formata automaticamente para `07173-000` |
| Caracteres inválidos | `ab12cd345` | Letras são ignoradas pela máscara, restando `12345` |
| CEP sem cobertura | Qualquer CEP que a API retorne lista vazia | Mensagem *"Ainda nao temos nenhuma diarista disponivel em sua região"* |
| Falha da API / CEP inexistente | Qualquer CEP com a API fora do ar | Mensagem de erro *"CEP nao encontrado"* |

> 💡 O resultado de um CEP válido **depende dos dados da API externa**, que não faz parte deste repositório.

## 2. URLs Principais

Não há tela de login nem painel administrativo. A aplicação inteira roda na raiz.

| Ambiente | Aplicação (Home) | Login / Painel |
| --- | --- | --- |
| **Docker** (`docker compose up -d`) | `http://localhost:3000` | — (não existe) |
| **Local** (`npm run dev`) | `http://localhost:3000` | — (não existe) |
| **Local produção** (`npm run build && npm start`) | `http://localhost:3000` | — (não existe) |

## 3. Vitrine Pública / Páginas para Clientes

| Item | Link (Exemplo Docker) |
| --- | --- |
| Home — busca de diaristas por CEP | `http://localhost:3000/` |
| Página de erro 404 (gerada pelo Next.js) | `http://localhost:3000/rota-inexistente` |

## 4. Validação do Acesso

Validação da saúde da aplicação no ambiente de desenvolvimento:

| Verificação | Resultado Esperado |
| --- | --- |
| Container (`treina_web_completo-web-1`) | `Up` / rodando na porta 3000 |
| Home (`GET /`) | HTTP `200` |
| Busca com CEP válido | Lista de profissionais ou mensagem de região sem cobertura |
| Busca com a API indisponível | Mensagem *"CEP nao encontrado"* (a aplicação não quebra) |

Comandos de verificação:

```bash
docker compose ps
```

```bash
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:3000/
```

## 5. Carregar Dados de Teste

Como **não há banco de dados**, não existe comando de *migrate/seed*. Os dados vêm da **API externa** configurada em `NEXT_PUBLIC_API_URL` (padrão `http://127.0.0.1:8000`).

Há duas formas de obter dados para teste:

**A) Subir a API real** (projeto separado) e apontar o front para ela:

```bash
docker compose build --build-arg NEXT_PUBLIC_API_URL=http://meu-host:8000
```

**B) Usar os testes automatizados**, que já simulam todas as respostas da API — sem precisar de back-end algum:

```bash
npm run test:e2e
```

```bash
npm test
```

### 5.1. Endpoint consumido

```http
GET {NEXT_PUBLIC_API_URL}/api/diaristas-cidade?cep=07173000
```

Resposta esperada:

```json
{
  "diaristas": [
    {
      "nome_completo": "Maria Silva",
      "foto_usuario": "https://exemplo.com/foto.jpg",
      "reputacao": 4,
      "cidade": "São Paulo"
    }
  ],
  "quantidade_diaristas": 3
}
```

---

### 📝 Observações:

- A comunicação com a API acontece **no navegador do usuário** (client-side). Portanto, a URL configurada precisa ser acessível a partir da máquina que abre a aplicação — e não de dentro do container.
- Os testes E2E (Playwright) interceptam as chamadas via `page.route`, e os testes unitários usam mock do `ApiService`. Por isso **toda a suíte roda sem back-end**.
- A variável `NEXT_PUBLIC_API_URL` é lida em **tempo de build** (prefixo `NEXT_PUBLIC_`), então alterá-la exige rebuild da imagem.
- Use estas instruções **apenas** em ambiente local ou Docker de desenvolvimento.
