import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/context';
import { SWRConfig } from 'swr';
import { fetcher } from '../lib/helpers/fetcher.helper';
import { Toaster } from 'sonner';

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
      <AuthProvider>
        <SWRConfig
          value={{
            fetcher,
            revalidateOnFocus: false,
            shouldRetryOnError: false,
          }}
        >
          <Toaster richColors closeButton theme="dark" />
          {getlayout(<Component {...pageProps} />)}
        </SWRConfig>
      </AuthProvider>
    </SessionProvider>
  );
}
