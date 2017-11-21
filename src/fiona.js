const fiona = require('./core')
const methods = require('./pure-methods')

Object.keys(methods).forEach(key => {
  fiona.fn[key] = methods[key]
})

module.exports = fiona
