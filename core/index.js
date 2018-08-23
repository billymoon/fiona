const packageJson = require('../package')
const PrngMethods = require('./prng-methods')
const Register = require('./register')
const corePlugins = require('./core-plugins')
const MoonFactory = require('./moon-factory')

const fiona = (...args) => new Moon(...args)

const Moon = MoonFactory(fiona)

fiona.version = packageJson.version

fiona.register = Register(fiona, Moon)

fiona.random = () => ({ seeded: { random } }) => random()

// TODO: does it make any sense to have chain method on fiona instance?
// fiona.chain = (...args) => instance => instance.seeded.chain(instance, ...args)
fiona.value = (...args) => instance => instance.seeded.value(instance, ...args)

fiona.register(
  ['number', corePlugins.number],
  ['object', corePlugins.object],
  ['json', corePlugins.json],
  ['string', corePlugins.string],
  ['array', corePlugins.array]
)

module.exports = fiona
