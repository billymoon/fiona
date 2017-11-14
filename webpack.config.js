const MinifyPlugin = require('babel-minify-webpack-plugin')

module.exports = {
  entry: [
    './plugins/index.js',
    './src/fiona.js'
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
