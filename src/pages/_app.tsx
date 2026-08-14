import '@styles/globals.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AppCacheProvider } from '@mui/material-nextjs/v16-pagesRouter';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import theme from 'ui/themes/theme';
import Header from 'ui/components/surfaces/Header/Header';
import Footer from 'ui/components/surfaces/Footer/Footer';
import { AppContainer } from 'ui/styles/pages/_app.style';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <AppCacheProvider {...props}>
      <Head>
        <title>e-diaristas</title>
        <meta name={'viewport'} content={'width=device-width, initial-scale=1'} />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContainer>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </AppContainer>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
