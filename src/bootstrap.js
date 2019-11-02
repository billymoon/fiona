import Fiona from './core/index.js'

import bool from './bool/bool.js'
import choose from './choose/choose.js'
import oneOf from './choose/one-of.js'
import date from './date/date.js'
import img from './img/img.js'
import duplicable from './duplicable/duplicable.js'

import { lorem, word, sentence, paragraph } from './lorem/lorem.js'
import {
  gender,
  title,
  firstname,
  firstnames,
  surname,
  fullname,
  namedata
} from './name/name.js'
import Regex from './regex/regex.js'
import shuffle from './shuffle/shuffle.js'

export default RandExp => {
  Fiona.register(
    ['bool', bool],
    ['choose', choose],
    ['oneOf', oneOf],
    ['date', date],
    ['img', img],
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
    ['regex', Regex(RandExp)],
    ['shuffle', shuffle]
  )

  // TODO: move namedata to getter/setter function - somehow encapsulate name plugin
  Fiona.namedata = namedata

  return Fiona
}
