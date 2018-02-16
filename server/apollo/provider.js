import React from 'react'
import { ApolloProvider } from 'react-apollo'

const provider = ({ children, client }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)

export default provider
