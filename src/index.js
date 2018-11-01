const fiona = require('../core')
const bool = require('./bool/bool')
const choose = require('./choose/choose')
const oneOf = require('./choose/one-of')
const date = require('./date/date')
const duplicable = require('./duplicable/duplicable')
const { lorem, word, sentence, para } = require('./lorem/lorem')
const { gender, title, firstname, firstnames, surname, fullname, namedata } = require('./name/name')
const regex = require('./regex/regex')
const shuffle = require('./shuffle/shuffle')

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
  ['gender', gender],
  ['title', title],
  ['firstname', firstname],
  ['firstnames', firstnames],
  ['surname', surname],
  ['fullname', fullname],
  ['regex', regex],
  ['shuffle', shuffle]
)

fiona.namedata = namedata

module.exports = fiona
