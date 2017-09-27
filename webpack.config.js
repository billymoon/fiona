module.exports = {
  entry: [
    './plugins/index.js',
    './src/export.js'
  ],
  output: {
    filename: 'fiona.js',
    libraryTarget: 'umd',
    library: 'fiona',
    umdNamedDefine: true
  }
}
