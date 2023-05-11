import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/context';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (_page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<P = {}> = AppProps & {
  Component: NextPageWithLayout<P>;
} & P;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getlayout = Component.getLayout ?? ((page: ReactElement) => page);
  return (
    <SessionProvider session={session}>
      <AuthProvider>{getlayout(<Component {...pageProps} />)}</AuthProvider>
    </SessionProvider>
  );
}
