import gql from 'graphql-tag'

const me = gql`
  query me {
    me {
      id
      name
    }
  }
`

export default me
