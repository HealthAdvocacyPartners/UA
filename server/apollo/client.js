import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

const API_HOST = 'https://api.graph.cool/simple/v1/cjd4wcndo0cqu0132um2gvhix'

export default req => {
  const authLink = setContext((_, { headers }) => {
    const { sdm_user_token: token } = req.cookies
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null
      }
    }
  })

  const httpLink = new HttpLink({
    uri: API_HOST,
    credentials: 'same-origin'
  })
  return new ApolloClient({
    ssrMode: true,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })
}
