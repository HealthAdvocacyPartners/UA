import React from 'react'
import ReactDOM from 'react-dom'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'

import { provider as Provider, client } from './apollo'

import Main from './containers/Main'

const render = () => {
  hydrate(
    <AppContainer>
      <Provider client={client}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render()

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/Main', () => {
    render()
  })
}
