const MinifyPlugin = require('babel-minify-webpack-plugin')

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    filename: 'fiona.core.js',
    libraryTarget: 'umd',
    library: 'fiona',
    umdNamedDefine: true
  },
  plugins: [
    new MinifyPlugin({}, {})
  ]
}
