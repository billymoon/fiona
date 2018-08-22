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
  plugins: []
}
