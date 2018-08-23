const config = require('./webpack.config.core')

config.entry.unshift('./src/plugins/index.js')
config.output.filename = 'fiona.min.js'

module.exports = config
