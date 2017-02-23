const path = require('path')
const webpack = require('webpack')

const clientPath = path.resolve(__dirname, './client')

module.exports = {
  entry: './client/main.js',
  output: { path: clientPath, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|server|test)/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
