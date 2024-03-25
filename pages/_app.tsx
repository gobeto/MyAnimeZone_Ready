// import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app'
import '@/styles/globals.css'

import '../styles/globals.css';
import { I18nextProvider } from 'react-i18next';
import i18n from "../i18n"; // path to your i18n config


import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

//check if available session exist and if it doesnt it redirect to /auth
export async function getServerSideProps(context: NextPageContext) {
  try {
    const session = await getSession(context);

    console.log('Session:', session);
    console.log('Context:', context);

    if (!session) {
      console.log('No session found, redirecting to /auth');
      return {
        redirect: {
          destination: "/auth",
          permanent: false,
        },
      };
    }
    return {
      props: {},
    };
  } catch (error) {
    console.error('Error getting session:', error);
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }
}

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
