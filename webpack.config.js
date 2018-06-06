const config = require('./webpack.config.core')

config.entry.unshift('./src/plugins/index.js')
config.output.filename = 'fiona.js'

module.exports = config
