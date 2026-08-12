import { render, screen } from 'test-utils';
import SafeEnvironment from './SafeEnvironment';

describe('SafeEnvironment', () => {
  it('exibe o texto "Ambiente Seguro" com o ícone de cadeado', () => {
    const { container } = render(<SafeEnvironment />);

    expect(screen.getByText(/Ambiente Seguro/)).toBeInTheDocument();
    expect(container.querySelector('i.twf-lock')).toBeInTheDocument();
  });
});
