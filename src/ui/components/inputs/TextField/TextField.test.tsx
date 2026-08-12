import { render, screen } from 'test-utils';
import userEvent from '@testing-library/user-event';
import TextField from './TextField';

describe('TextField', () => {
  it('renderiza com o label informado e aceita digitação', async () => {
    render(<TextField id={'nome'} label={'Nome'} />);

    const input = screen.getByLabelText('Nome');
    expect(input).toBeInTheDocument();

    await userEvent.type(input, 'Olá');
    expect(input).toHaveValue('Olá');
  });
});
