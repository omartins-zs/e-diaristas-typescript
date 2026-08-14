import { render, screen } from '@testing-library/react';
import type { AppProps } from 'next/app';
import MyApp from 'pages/_app';

function DummyPage() {
  return <div>Conteúdo da página</div>;
}

// O _app espera as props completas do Next (incluindo router); nos testes
// apenas Component e pageProps sao relevantes.
function renderApp(Component: AppProps['Component'], pageProps: object) {
  return render(<MyApp {...({ Component, pageProps } as unknown as AppProps)} />);
}

describe('MyApp', () => {
  it('renderiza o Header, a página atual e o Footer dentro do tema', () => {
    renderApp(DummyPage, {});

    expect(screen.getByAltText('e-diaristas')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo da página')).toBeInTheDocument();
    expect(screen.getByText(/Quem somos nos/)).toBeInTheDocument();
  });

  it('repassa pageProps para o Component', () => {
    function PageComProps({ mensagem }: { mensagem: string }) {
      return <div>{mensagem}</div>;
    }

    renderApp(PageComProps as AppProps['Component'], { mensagem: 'Olá mundo' });

    expect(screen.getByText('Olá mundo')).toBeInTheDocument();
  });
});
