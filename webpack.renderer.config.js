const CopyPlugin = require('copy-webpack-plugin')
const rules = require('./webpack.rules')

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
})
rules.push({
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: [{ loader: 'babel-loader' }],
})

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  externals: {
    'better-sqlite3': 'commonjs better-sqlite3',
  },
  plugins: [
    new CopyPlugin([
      {
        from: './node_modules/better-sqlite3/',
        to: './out/node_modules/better-sqlite3/', // still under node_modules directory so it could find this module
      },
    ]),
  ],
  resolve: {
    modules: ['node_modules', 'tools'],
    alias: {
      'node-pre-gyp': 'node-pre-gyp-bypass',
    },
  },
}
