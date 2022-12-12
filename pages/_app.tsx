import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import 'bootstrap/dist/css/bootstrap.css'
import 'react-slideshow-image/dist/styles.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
  uri:'http://localhost:5000'
})
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
    )
}
