import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import MyDocument from 'pages/_document';

// O _document só roda no pipeline de renderização do servidor do Next,
// então os componentes de estrutura são substituídos por equivalentes simples.
jest.mock('next/document', () => ({
  Html: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
    <html {...props}>{children}</html>
  ),
  // eslint-disable-next-line @next/next/no-head-element -- dublê do <Head> do next/document
  Head: ({ children }: React.PropsWithChildren) => <head>{children}</head>,
  Main: () => <div id={'__next'} />,
  NextScript: () => <script data-testid={'next-script'} />,
}));

jest.mock('@mui/material-nextjs/v16-pagesRouter', () => ({
  DocumentHeadTags: () => <meta name={'emotion-styles'} />,
  documentGetInitialProps: jest.fn().mockResolvedValue({ html: '<div></div>', styles: [] }),
}));

describe('MyDocument', () => {
  it('define o idioma da página como pt-BR', () => {
    const markup = renderToStaticMarkup(<MyDocument />);
    expect(markup).toContain('lang="pt-BR"');
  });

  it('carrega a fonte Poppins e os ícones da TreinaWeb no head', () => {
    const markup = renderToStaticMarkup(<MyDocument />);

    expect(markup).toContain('fonts.googleapis.com');
    expect(markup).toContain('family=Poppins');
    expect(markup).toContain('/fonts/tw-icons/css/treinaweb-icons.css');
  });

  it('injeta as tags de estilo do Emotion geradas no servidor', () => {
    const markup = renderToStaticMarkup(<MyDocument />);
    expect(markup).toContain('emotion-styles');
  });

  it('delega o getInitialProps para a integração do Material UI', async () => {
    const { documentGetInitialProps } = jest.requireMock(
      '@mui/material-nextjs/v16-pagesRouter'
    );
    const ctx = {} as never;

    const props = await MyDocument.getInitialProps(ctx);

    expect(documentGetInitialProps).toHaveBeenCalledWith(ctx);
    expect(props).toEqual({ html: '<div></div>', styles: [] });
  });
});
