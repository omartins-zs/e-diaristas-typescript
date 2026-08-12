import { render, screen } from 'test-utils';
import UserInformation from './UserInformation';

describe('UserInformation', () => {
  it('renderiza nome, descrição e a foto do profissional', () => {
    const { container } = render(
      <UserInformation
        name={'Maria Silva'}
        picture={'/img/maria.png'}
        rating={4}
        description={'São Paulo'}
      />
    );

    expect(screen.getByText('Maria Silva')).toBeInTheDocument();
    expect(screen.getByText('São Paulo')).toBeInTheDocument();

    const avatarImg = container.querySelector('img');
    expect(avatarImg).toHaveAttribute('src', '/img/maria.png');
  });

  it('exibe a avaliação (rating) recebida', () => {
    const { container } = render(
      <UserInformation
        name={'João Souza'}
        picture={''}
        rating={5}
        description={'Rio de Janeiro'}
      />
    );

    expect(container.querySelector('[class*="MuiRating"]')).toBeInTheDocument();
  });
});
