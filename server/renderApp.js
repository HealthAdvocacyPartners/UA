import React from 'react'
import ReactDOM from 'react-dom/server'
import { flushChunkNames, clearChunks } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { getDataFromTree } from 'react-apollo'
import { StaticRouter } from 'react-router'
import Helmet from 'react-helmet'

import { Client, Provider } from './apollo'

import Main from '../client/containers/Main'
import Html from '../client/containers/Html'

// Entry point for server 👩🏻‍🍳
const RenderApp = ({ clientStats, serverStats, foo }) => (req, res, next) => {
  const apolloClient = Client(req)

  const component = (
    <Provider client={apolloClient}>
      <StaticRouter location={req.url} context={{}}>
        <Main />
      </StaticRouter>
    </Provider>
  )

  getDataFromTree(component)
    .then(() => {
      const app = ReactDOM.renderToString(component)

      const chunkNames = flushChunkNames()
      const { Js, Styles, scripts, stylesheets } = flushChunks(clientStats, {
        chunkNames
      })
      const helmet = Helmet.renderStatic()
      const initialState = apolloClient.extract()

      console.log('PATH', req.path)
      console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames)
      console.log('SCRIPTS SERVED', scripts)
      console.log('STYLESHEETS SERVED', stylesheets)

      const html = (
        <Html
          app={app}
          state={initialState}
          helmet={helmet}
          Js={Js}
          Styles={Styles}
        />
      )

      res.status(200)
      res.send(`<!doctype html>\n${ReactDOM.renderToString(html)}`)
      res.end()
    })
    .catch(e => {
      console.log('Network error' + e)
      res.redirect('/error')
      res.end()
    })
}

export default RenderApp
