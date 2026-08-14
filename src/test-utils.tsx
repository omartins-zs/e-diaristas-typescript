import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import theme from 'ui/themes/theme';

/**
 * Wrapper de render que injeta o ThemeProvider da aplicação, necessário
 * pois os componentes estilizados (styled) acessam `theme`
 * diretamente via contexto.
 */
function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, {
    wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>,
    ...options,
  });
}

export * from '@testing-library/react';
export { customRender as render };
