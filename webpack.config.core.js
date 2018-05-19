module.exports = {
  mode: 'production',
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    filename: 'fiona.core.js',
    libraryTarget: 'umd',
    library: 'fiona',
    globalObject: 'this',
    umdNamedDefine: true
  },
  plugins: []
}
