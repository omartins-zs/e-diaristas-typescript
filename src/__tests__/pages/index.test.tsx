import { render, screen, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';
import Home from 'pages/index';
import { ApiService } from 'data/services/ApiService';

jest.mock('data/services/ApiService', () => ({
  ApiService: { get: jest.fn() },
}));

const mockedGet = ApiService.get as jest.Mock;

beforeEach(() => {
  mockedGet.mockReset();
});

function getBuscarButton() {
  return screen.getByRole('button', { name: /buscar/i });
}

async function digitarCep(valor: string) {
  const input = screen.getByLabelText(/digite seu cep/i) as HTMLInputElement;
  await userEvent.type(input, valor);
  // A mascara aplica o valor de forma assincrona (onAccept do IMask).
  await waitFor(() =>
    expect(input.value.replace(/\D/g, '')).toHaveLength(valor.replace(/\D/g, '').length)
  );
  return input;
}

async function clicarBuscar() {
  const botao = getBuscarButton();
  await waitFor(() => expect(botao).toBeEnabled());
  await userEvent.click(botao);
}

describe('Home (src/pages/index.tsx + useIndex)', () => {
  it('renderiza o título da página e o botão Buscar desabilitado inicialmente', () => {
    render(<Home />);

    expect(screen.getByText('Conheça os profissionais')).toBeInTheDocument();
    expect(getBuscarButton()).toBeDisabled();
  });

  it('mantém o botão desabilitado enquanto o CEP for inválido', async () => {
    render(<Home />);
    await digitarCep('1234567');
    await waitFor(() => expect(getBuscarButton()).toBeDisabled());
  });

  it('habilita o botão quando o CEP tem 8 dígitos', async () => {
    render(<Home />);
    await digitarCep('12345678');
    await waitFor(() => expect(getBuscarButton()).toBeEnabled());
  });

  it('exibe o spinner e desabilita o botão enquanto a busca está em andamento', async () => {
    let resolveGet: (value: unknown) => void = () => undefined;
    mockedGet.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveGet = resolve;
        })
    );

    render(<Home />);
    await digitarCep('12345678');
    const botao = getBuscarButton();
    await userEvent.click(botao);

    expect(await screen.findByRole('progressbar')).toBeInTheDocument();
    expect(botao).toBeDisabled();

    resolveGet({ data: { diaristas: [], quantidade_diaristas: 0 } });
    await waitFor(() =>
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    );
  });

  it('busca pelo CEP sem formatação e exibe os profissionais retornados (plural)', async () => {
    mockedGet.mockResolvedValueOnce({
      data: {
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
      },
    });

    render(<Home />);
    await digitarCep('12345678');
    await clicarBuscar();

    expect(await screen.findByText('Maria Silva')).toBeInTheDocument();
    expect(screen.getByText('Joana Souza')).toBeInTheDocument();
    expect(screen.getByText(/profissionais atendem/)).toBeInTheDocument();
    expect(mockedGet).toHaveBeenCalledWith(
      '/api/diaristas-cidade?cep=12345678'
    );
  });

  it('usa a mensagem no singular quando resta 1 profissional', async () => {
    mockedGet.mockResolvedValueOnce({
      data: {
        diaristas: [
          {
            nome_completo: 'Ana Paula',
            cidade: 'Rio de Janeiro',
            foto_usuario: '',
            reputacao: 4,
          },
        ],
        quantidade_diaristas: 1,
      },
    });

    render(<Home />);
    await digitarCep('12345678');
    await clicarBuscar();

    expect(await screen.findByText(/profissional atende/)).toBeInTheDocument();
  });

  it('não exibe a mensagem de "e mais" quando não há profissionais restantes', async () => {
    mockedGet.mockResolvedValueOnce({
      data: {
        diaristas: [
          {
            nome_completo: 'Carla Dias',
            cidade: 'Niterói',
            foto_usuario: '',
            reputacao: 4,
          },
        ],
        quantidade_diaristas: 0,
      },
    });

    render(<Home />);
    await digitarCep('12345678');
    await clicarBuscar();

    expect(await screen.findByText('Carla Dias')).toBeInTheDocument();
    expect(screen.queryByText(/atende/)).not.toBeInTheDocument();
  });

  it('exibe mensagem de nenhuma diarista disponível quando a lista vem vazia', async () => {
    mockedGet.mockResolvedValueOnce({
      data: { diaristas: [], quantidade_diaristas: 0 },
    });

    render(<Home />);
    await digitarCep('12345678');
    await clicarBuscar();

    expect(
      await screen.findByText(/Ainda nao temos nenhuma diarista disponivel/i)
    ).toBeInTheDocument();
  });

  it('exibe mensagem de erro quando a busca falha', async () => {
    mockedGet.mockRejectedValueOnce(new Error('network error'));

    render(<Home />);
    await digitarCep('12345678');
    await clicarBuscar();

    expect(await screen.findByText('CEP nao encontrado')).toBeInTheDocument();
  });
});
