const config = require('./webpack.config.core')

config.entry = ['./webpack-entry.js']
config.output.filename = 'fiona.min.js'

module.exports = config
