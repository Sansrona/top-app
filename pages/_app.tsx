import { AppProps } from 'next/dist/next-server/lib/router/router';
import '../styles/globals.css';
import Head from 'next/head';
import ym, {YMInitializer} from 'react-yandex-metrika';


function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  router.events.on('routeChangeComplete',(url: string)=>{
     ym('hit', url);
  });
  
  return (
  <>
    <Head>
      <title>Топ - лучший топ</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com"  />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath }/>
      <meta property="og:locale" content="ru_RU"/>
    </Head>
    <YMInitializer accounts={[]} options={{webvisor:true, defer: true}} version='2' />
    <Component {...pageProps} />
  </>);
}

export default MyApp;
