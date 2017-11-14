const fiona = require('./core')
const methods = require('./methods')

Object.keys(methods).forEach(key => {
  fiona.fn[key] = methods[key]
})

module.exports = fiona

