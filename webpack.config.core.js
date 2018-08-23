const path = require('path')
const fs = require('fs')
const packageJson = require('./package')

// extract the version from package json to include in build
fs.writeFileSync('package-extract.json', JSON.stringify({ version: packageJson.version }, null, 2))

module.exports = {
  mode: 'production',
  entry: [
    './core/index.js'
  ],
  output: {
    path: __dirname,
    filename: 'fiona.core.js',
    libraryTarget: 'umd',
    library: 'fiona',
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
