const Fiona = require('./core')
const bool = require('./bool/bool')
const choose = require('./choose/choose')
const oneOf = require('./choose/one-of')
const date = require('./date/date')
const duplicable = require('./duplicable/duplicable')
const { lorem, word, sentence, paragraph } = require('./lorem/lorem')
const { gender, title, firstname, firstnames, surname, fullname, namedata } = require('./name/name')
const regex = require('./regex/regex')
const shuffle = require('./shuffle/shuffle')

Fiona.register(
  ['bool', bool],
  ['choose', choose],
  ['oneOf', oneOf],
  ['date', date],
  ['duplicable', duplicable],
  ['lorem', lorem],
  ['word', word],
  ['sentence', sentence],
  ['paragraph', paragraph],
  ['gender', gender],
  ['title', title],
  ['firstname', firstname],
  ['firstnames', firstnames],
  ['surname', surname],
  ['fullname', fullname],
  ['regex', regex],
  ['shuffle', shuffle]
)

// TODO: move namedata to getter/setter function - somehow encapsulate name plugin
Fiona.namedata = namedata

module.exports = Fiona
