const path = require('path')
const webpack = require('webpack')
const clientPath = path.resolve(__dirname, './client')

module.exports = {
  entry: [ './client/main.js', 'webpack-hot-middleware/client?path=/__webpack_hmr' ],
  output: {
    path: `${clientPath}/dist`,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|server|test)/,
        query: {
          presets: [ 'es2015', 'stage-0', 'react' ]
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
