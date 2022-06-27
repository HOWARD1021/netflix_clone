import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { AuthProviders } from '../hooks/useAuth'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      {/* <AuthProviders> */}
        <Component {...pageProps} />
      {/* </AuthProviders> */}
    </RecoilRoot>
  )
}

export default MyApp
