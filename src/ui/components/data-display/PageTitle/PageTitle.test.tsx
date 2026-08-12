import { render, screen } from 'test-utils';
import PageTitle from './PageTitle';

describe('PageTitle', () => {
  it('renderiza o título informado', () => {
    render(<PageTitle title={'Conheça os profissionais'} />);
    expect(
      screen.getByText('Conheça os profissionais')
    ).toBeInTheDocument();
  });

  it('renderiza o subtítulo quando informado como string', () => {
    render(<PageTitle title={'Título'} subtitle={'Um subtítulo'} />);
    expect(screen.getByText('Um subtítulo')).toBeInTheDocument();
  });

  it('renderiza o subtítulo quando informado como elemento JSX', () => {
    render(<PageTitle title={'Título'} subtitle={<span>Subtítulo JSX</span>} />);
    expect(screen.getByText('Subtítulo JSX')).toBeInTheDocument();
  });

  it('não quebra quando nenhum subtítulo é informado', () => {
    render(<PageTitle title={'Só título'} />);
    expect(screen.getByText('Só título')).toBeInTheDocument();
  });
});
