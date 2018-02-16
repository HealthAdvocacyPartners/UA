const PATH = require('path')
const FS = require('fs')
const WEBPACK = require('webpack')
const NODE_EXTERNALS = require('webpack-node-externals')
const EXTRACT_TEXT_PLUGIN = require('extract-text-webpack-plugin')
const WRITE_FILE_PLUGIN = require('write-file-webpack-plugin') // here so you can see what chunks are built
const AUTO_PREFIXER = require('autoprefixer')

const BABEL = require('./loaders/babel')
const STYLES = require('./loaders/styles')

const DIST = PATH.join(__dirname, '../dist')

const externals = FS.readdirSync('./node_modules')
  .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`
    return externals
  }, {})

module.exports = [
  {
    name: 'client',
    target: 'web',
    entry: [
      'fetch-everywhere',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      'react-hot-loader/patch',
      './client/index.js'
    ],
    output: {
      path: DIST,
      filename: '[name].js',
      chunkFilename: '[name].js',
      publicPath: '/'
    },
    module: {
      loaders: [BABEL, STYLES]
    },
    plugins: [
      new WRITE_FILE_PLUGIN(),
      new EXTRACT_TEXT_PLUGIN('./client/styles/base.css'),
      new WEBPACK.optimize.CommonsChunkPlugin({
        names: ['bootstrap'], // notice there is no "bootstrap" named entry
        filename: '[name].js',
        minChunks: Infinity
      }),
      new WEBPACK.HotModuleReplacementPlugin()
    ],
    devtool: 'source-map'
  },
  {
    name: 'server',
    target: 'node',
    entry: ['fetch-everywhere', './server/renderApp'],
    externals: externals,
    output: {
      path: DIST,
      filename: 'server.js',
      libraryTarget: 'commonjs2'
    },
    module: {
      loaders: [BABEL, STYLES]
    },
    plugins: [
      new EXTRACT_TEXT_PLUGIN('./client/styles/base.css'),
      new WEBPACK.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ],
    devtool: 'source-map'
  }
]
