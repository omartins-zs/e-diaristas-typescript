import { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import {
  DocumentHeadTags,
  DocumentHeadTagsProps,
  documentGetInitialProps,
} from '@mui/material-nextjs/v16-pagesRouter';

export default function MyDocument(props: DocumentHeadTagsProps) {
  return (
    <Html lang={'pt-BR'}>
      <Head>
        {/* Injeta os estilos do Emotion no HTML gerado no servidor,
            evitando o flash de conteudo sem estilo. */}
        <DocumentHeadTags {...props} />
        <link rel={'preconnect'} href={'https://fonts.googleapis.com'} />
        <link rel={'preconnect'} href={'https://fonts.gstatic.com'} crossOrigin={''} />
        <link
          href={
            'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
          }
          rel={'stylesheet'}
        />
        <link href={'/fonts/tw-icons/css/treinaweb-icons.css'} rel={'stylesheet'} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  return await documentGetInitialProps(ctx);
};
