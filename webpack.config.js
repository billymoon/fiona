const config = require('./webpack.config.core')

config.entry = ['./kitchen/index.js']
config.output.filename = 'fiona.min.js'

module.exports = config
