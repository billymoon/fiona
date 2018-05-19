const config = require('./webpack.config.core')

config.entry.unshift('./src/plugins/index.js')

module.exports = config
