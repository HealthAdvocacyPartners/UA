const colors = require('colors')
const Express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000
const SERVER = Express()
const COMPILER = webpack(require('../webpack/webpack.config.js'))

SERVER.use(cookieParser())

SERVER.use(
  webpackHotMiddleware(
    COMPILER.compilers.find(compiler => compiler.name === 'client'),
    { path: '/__webpack_hmr' }
  )
)

SERVER.use(
  webpackDevMiddleware(COMPILER, {
    serverSideRender: true,
    publicPath: '../dist/client.js'
  })
)

SERVER.use(webpackHotServerMiddleware(COMPILER))

SERVER.listen(PORT, () => {
  console.log(colors.green(`SERVER STARTED ON ${PORT}`))
})
