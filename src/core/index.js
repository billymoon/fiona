const packageJson = require('../../package')
const { Register, registered } = require('./register')
const Prng = require('./prng')
const Moon = require('./moon')
const number = require('./primitives/number/number')
const object = require('./primitives/object/object')
const json = require('./primitives/json/json')
const array = require('./primitives/array/array')
const string = require('./primitives/string/string')

const fiona = seed => new Moon(seed, Prng)

fiona.version = packageJson.version

// TODO: would it be simpler to pull the Register factory into core index?
const registerFactory = (name, fn) => {
  const fnProxy = (...args) => fn(...args)
  // TODO: handle duplicate extension registrations
  registered.push(fnProxy)
  return (fiona[name] = fnProxy)
}

const registerMethod = (name, fn) => {
  return (Moon.prototype[name] = fn)
}

// TODO: should it be possible to register extensions local to seeded instance?
// perhaps something like:
//     const personExtension = seeded => ({
//       gender: fiona.Gender,
//       name: ({ data }) => seeded.fullname({ gender: data.gender })
//     })
//     fiona().register(['person', personExtension]).object(() => fiona.Person, { luckyNumber: fiona.Number({ max: 100 }) })
fiona.register = Register(registerFactory, registerMethod)

fiona.Random = () => seeded => seeded.random()

const clone = seeded => fiona(seeded.info().initseed).state(seeded.state())

fiona.register(['clone', clone])

fiona.register(
  ['number', number],
  ['object', object],
  ['json', json],
  ['string', string],
  ['array', array]
)

module.exports = fiona
