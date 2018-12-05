const path = require('path')
const fs = require('fs')
const packageJson = require('./package')

// extract the version from package json to include in build
fs.writeFileSync(path.join(__dirname, 'package-extract.json'), JSON.stringify({ version: packageJson.version }, null, 2))

module.exports = {
  mode: 'production',
  entry: [
    './core/index.js'
  ],
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
}
