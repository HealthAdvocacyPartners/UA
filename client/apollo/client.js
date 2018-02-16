import cookie from 'cookie'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

const API_HOST = 'https://api.graph.cool/simple/v1/cjd4wcndo0cqu0132um2gvhix'

const httpLink = new HttpLink({
  uri: API_HOST,
  credentials: 'same-origin'
})

const authLink = setContext((_, { headers }) => {
  const token = cookie.parse(document.cookie).sdm_user_token || null
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  connectToDevTools: true,
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
})

export default client
