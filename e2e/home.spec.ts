import { test, expect, Page } from '@playwright/test';

const API_ROUTE = '**/api/diaristas-cidade**';

async function digitarCep(page: Page, cep: string) {
  const input = page.getByLabel(/digite seu cep/i);
  await input.pressSequentially(cep, { delay: 20 });
}

test.describe('Página inicial - busca de diaristas', () => {
  test('carrega header, título e footer', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByAltText('e-diaristas')).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Conheça os profissionais' })
    ).toBeVisible();
    await expect(page.getByText(/Quem somos nos/)).toBeVisible();
  });

  test('mantém o botão Buscar desabilitado até um CEP válido ser informado', async ({
    page,
  }) => {
    await page.goto('/');
    const botaoBuscar = page.getByRole('button', { name: 'Buscar' });

    await expect(botaoBuscar).toBeDisabled();

    await digitarCep(page, '1234567');
    await expect(botaoBuscar).toBeDisabled();

    await digitarCep(page, '8');
    await expect(botaoBuscar).toBeEnabled();
  });

  test('exibe os profissionais retornados para um CEP válido', async ({ page }) => {
    await page.route(API_ROUTE, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          diaristas: [
            {
              nome_completo: 'Maria Silva',
              cidade: 'São Paulo',
              foto_usuario: '',
              reputacao: 4,
            },
            {
              nome_completo: 'Joana Souza',
              cidade: 'Campinas',
              foto_usuario: '',
              reputacao: 5,
            },
          ],
          quantidade_diaristas: 3,
        }),
      });
    });

    await page.goto('/');
    await digitarCep(page, '12345678');
    await page.getByRole('button', { name: 'Buscar' }).click();

    await expect(page.getByText('Maria Silva')).toBeVisible();
    await expect(page.getByText('Joana Souza')).toBeVisible();
    await expect(page.getByText(/profissionais atendem/)).toBeVisible();
  });

  test('exibe mensagem de nenhuma diarista disponível quando a busca retorna vazia', async ({
    page,
  }) => {
    await page.route(API_ROUTE, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ diaristas: [], quantidade_diaristas: 0 }),
      });
    });

    await page.goto('/');
    await digitarCep(page, '12345678');
    await page.getByRole('button', { name: 'Buscar' }).click();

    await expect(
      page.getByText(/Ainda nao temos nenhuma diarista disponivel/i)
    ).toBeVisible();
  });

  test('exibe mensagem de erro quando a API falha', async ({ page }) => {
    await page.route(API_ROUTE, async (route) => {
      await route.fulfill({ status: 500, body: 'erro interno' });
    });

    await page.goto('/');
    await digitarCep(page, '12345678');
    await page.getByRole('button', { name: 'Buscar' }).click();

    await expect(page.getByText('CEP nao encontrado')).toBeVisible();
  });
});
