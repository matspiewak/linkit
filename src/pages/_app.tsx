import '../styles/globals.css';

import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session} refetchOnWindowFocus={false} refetchInterval={5 * 60}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}
