const EXTRACT_TEXT_PLUGIN = require('extract-text-webpack-plugin')
const AUTO_PREFIXER = require('autoprefixer')

module.exports = {
  test: /\.s?css$/,
  use: EXTRACT_TEXT_PLUGIN.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            AUTO_PREFIXER({
              browsers: [
                '>1%',
                'last 2 versions',
                'not ie < 10' // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009'
            })
          ],
          sourceMap: true
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  })
}
