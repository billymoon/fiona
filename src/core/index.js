const packageJson = require('../../package')
const Register = require('./register')
const Moon = require('./moon')
const number = require('./primitives/number/number')
const object = require('./primitives/object/object')
const json = require('./primitives/json/json')
const array = require('./primitives/array/array')
const string = require('./primitives/string/string')

const fiona = (...args) => new Moon(...args)

fiona.version = packageJson.version

fiona.register = Register(
  (name, fn) => (fiona[name] = fn),
  (name, fn) => (Moon.prototype[name] = fn)
)

fiona.random = () => (seeded) => seeded.random()

// TODO: does it make any sense to have chain method on fiona instance?
fiona.value = (...args) => seeded => seeded.value(seeded, ...args)

const clone = (seeded) => fiona(seeded.info().initseed).state(seeded.state())

fiona.register(['clone', clone])

fiona.register(
  ['number', number],
  ['object', object],
  ['json', json],
  ['string', string],
  ['array', array]
)

module.exports = fiona
