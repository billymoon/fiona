const config = require('./webpack.config.core')

config.entry = ['./src/index.js']
config.output.filename = 'fiona.min.js'

module.exports = config
