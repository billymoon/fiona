const packageJson = require('../package')
const Register = require('./register')
const Moon = require('./moon') 
const number = require('./fiona.number')
const object = require('./fiona.object')
const json = require('./fiona.json')
const array = require('./fiona.array')
const string = require('./fiona.string')

const fiona = (...args) => new Moon(...args)

fiona.version = packageJson.version

fiona.register = Register(
  (name, fn) => fiona[name] = fn,
  (name, fn) => Moon.prototype[name] = fn
)

fiona.random = () => ({ seeded: { random } }) => random()

// TODO: does it make any sense to have chain method on fiona instance?
// fiona.chain = (...args) => instance => instance.seeded.chain(instance, ...args)
fiona.value = (...args) => instance => instance.seeded.value(instance, ...args)

const clone = ({ seeded }) => fiona(seeded.info().initseed).state(seeded.state())

fiona.register(['clone', clone])

fiona.register(
  ['number', number],
  ['object', object],
  ['json', json],
  ['string', string],
  ['array', array]
)

module.exports = fiona
