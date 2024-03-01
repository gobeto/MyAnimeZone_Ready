// import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app'
import '@/styles/globals.css'

import '../styles/globals.css';
import { I18nextProvider } from 'react-i18next';
import i18n from "../i18n"; // path to your i18n config



export default function App({ 
  Component, 
  pageProps: {
    session,
    ...pageProps
  }
}: AppProps) {
  return (
    <I18nextProvider i18n={i18n}>

    <Component {...pageProps} />
    </I18nextProvider>

  )
}
