import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { Session } from 'next-auth';

type Props = {
  session:Session | null;
}

export default function App({ Component, pageProps }: AppProps,{session}:Props) {
  return <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>
}
