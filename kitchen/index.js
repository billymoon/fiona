const fiona = require('../core')
const bool = require('./bool/bool')
const choose = require('./choose/choose')
const oneOf = require('./choose/one-of')
const date = require('./date/date')
const duplicable = require('./duplicable/duplicable')
const { lorem, word, sentence, para } = require('./lorem/lorem')
const regex = require('./regex/regex')

fiona.register(
  ['bool', bool],
  ['choose', choose],
  ['oneOf', oneOf],
  ['date', date],
  ['duplicable', duplicable],
  ['lorem', lorem],
  ['word', word],
  ['sentence', sentence],
  ['para', para],
  ['regex', regex]
)

module.exports = fiona
