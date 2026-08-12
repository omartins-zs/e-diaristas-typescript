import { render, screen } from 'test-utils';
import Footer from './Footer';

describe('Footer', () => {
  it('exibe o texto institucional', () => {
    render(<Footer />);
    expect(screen.getByText(/Quem somos nos/)).toBeInTheDocument();
    expect(screen.getByText(/E-diaristas te ajuda/)).toBeInTheDocument();
  });

  it('exibe os links para as lojas de aplicativos, seguros e em nova aba', () => {
    render(<Footer />);

    const appStoreImg = screen.getByAltText('App Store');
    const playStoreImg = screen.getByAltText('Play Store');

    const appStoreLink = appStoreImg.closest('a');
    const playStoreLink = playStoreImg.closest('a');

    expect(appStoreLink).toHaveAttribute('target', '_blank');
    expect(appStoreLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(playStoreLink).toHaveAttribute('target', '_blank');
    expect(playStoreLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
