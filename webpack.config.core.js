module.exports = {
  entry: [
    './src/export.js'
  ],
  output: {
    filename: 'fiona.core.js',
    libraryTarget: 'umd',
    library: 'fiona',
    umdNamedDefine: true
  }
}
