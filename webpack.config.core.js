const path = require('path')
const fs = require('fs')
const packageJson = require('./package')

// extract the version from package json to include in build
fs.writeFileSync(
  path.join(__dirname, 'src', 'core', 'config.js'),
`// auto generated file
export default { version: '${packageJson.version}' }
`)

module.exports = {
  mode: 'production',
  entry: ['./webpack-entry.core.js'],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'fiona.core.min.js',
    libraryTarget: 'umd',
    library: 'Fiona',
    globalObject: 'this',
    umdNamedDefine: true
  },
  plugins: [],
  resolve: {
    alias: {
      '../package': path.resolve(__dirname, 'package-extract.json')
    }
  }
  ,
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}
