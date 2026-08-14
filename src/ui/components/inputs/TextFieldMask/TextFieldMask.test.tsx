import React from 'react';
import { render, screen, waitFor } from 'test-utils';
import userEvent from '@testing-library/user-event';
import TextFieldMask from './TextFieldMask';

function ControlledMask() {
  const [value, setValue] = React.useState('');
  return (
    <TextFieldMask
      id={'cep'}
      mask={'99999-999'}
      label={'Digite seu CEP'}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
}

describe('TextFieldMask', () => {
  it('aplica a máscara conforme o usuário digita', async () => {
    render(<ControlledMask />);

    const input = screen.getByLabelText(/digite seu cep/i);
    await userEvent.type(input, '12345678');

    await waitFor(() => expect(input).toHaveValue('12345-678'));
  });

  it('mantém apenas os dígitos informados enquanto o CEP está incompleto', async () => {
    render(<ControlledMask />);

    const input = screen.getByLabelText(/digite seu cep/i);
    await userEvent.type(input, '123');

    await waitFor(() => expect(input).toHaveValue('123'));
  });

  it('ignora caracteres não numéricos', async () => {
    render(<ControlledMask />);

    const input = screen.getByLabelText(/digite seu cep/i);
    await userEvent.type(input, 'ab12cd345');

    await waitFor(() => expect(input).toHaveValue('12345'));
  });
});
