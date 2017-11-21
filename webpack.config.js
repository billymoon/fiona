const MinifyPlugin = require('babel-minify-webpack-plugin')

module.exports = {
  entry: [
    './src/plugins/index.js',
    './src/index.js'
  ],
  output: {
    filename: 'fiona.js',
    libraryTarget: 'umd',
    library: 'fiona',
    umdNamedDefine: true
  },
  plugins: [
    new MinifyPlugin({}, {})
  ]
}
