import { render, screen } from 'test-utils';
import Header from './Header';

describe('Header', () => {
  it('exibe a logo da e-diaristas', () => {
    render(<Header />);
    const logo = screen.getByAltText('e-diaristas');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/img/logos/logo.svg');
  });
});
