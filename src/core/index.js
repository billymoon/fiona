import config from './config.js'
import { Register, registered } from './register/index.js'
import Prng from './prng/index.js'
import Moon from './moon/index.js'
import number from './primitives/number/number.js'
import object from './primitives/object/object.js'
import json from './primitives/json/json.js'
import array from './primitives/array/array.js'
import string from './primitives/string/string.js'

const Fiona = seed => new Moon(seed, Prng)

Fiona.version = config.version

// TODO: would it be simpler to pull the Register factory into core index?
const registerFactory = (name, fn) => {
  const fnProxy = (...args) => fn(...args)
  // TODO: handle duplicate extension registrations
  registered.push(fnProxy)
  return (Fiona[name] = fnProxy)
}

const registerMethod = (name, fn) => {
  return (Moon.prototype[name] = fn)
}

// TODO: should it be possible to register extensions local to seeded instance?
// perhaps something like:
//     const personExtension = seeded => ({
//       gender: Fiona.Gender,
//       name: ({ data }) => seeded.fullname({ gender: data.gender })
//     })
//     Fiona().register(['person', personExtension]).object(() => Fiona.Person, { luckyNumber: Fiona.Number({ max: 100 }) })
Fiona.register = Register(registerFactory, registerMethod)

// TODO: register Random on seeded instance, perhaps need to implement seeded.register first
Fiona.Random = () => seeded => seeded.random()

const clone = seeded => Fiona(seeded.info().initseed).state(seeded.state())

Fiona.register(['clone', clone])

Fiona.register(
  ['number', number],
  ['object', object],
  ['json', json],
  ['string', string],
  ['array', array]
)

export default Fiona
