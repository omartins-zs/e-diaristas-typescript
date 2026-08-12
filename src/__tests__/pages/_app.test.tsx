import { render, screen } from '@testing-library/react';
import MyApp from 'pages/_app';

function DummyPage() {
  return <div>Conteúdo da página</div>;
}

describe('MyApp', () => {
  it('renderiza o Header, a página atual e o Footer dentro do tema', () => {
    render(<MyApp Component={DummyPage} pageProps={{}} />);

    expect(screen.getByAltText('e-diaristas')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo da página')).toBeInTheDocument();
    expect(screen.getByText(/Quem somos nos/)).toBeInTheDocument();
  });

  it('repassa pageProps para o Component', () => {
    function PageComProps({ mensagem }: { mensagem: string }) {
      return <div>{mensagem}</div>;
    }

    render(<MyApp Component={PageComProps} pageProps={{ mensagem: 'Olá mundo' }} />);

    expect(screen.getByText('Olá mundo')).toBeInTheDocument();
  });
});
