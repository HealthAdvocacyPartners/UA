import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { Me } from '../../queries'

import Presenter from './Presenter'

export default compose(withRouter, graphql(Me))(Presenter)
