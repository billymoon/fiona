const packageJson = require('../package')
const PrngMethods = require('./prng-methods')
const RecurseArguments = require('./recurse-arguments')
const { type } = require('./utils')
const corePlugins = require('./core-plugins')

// define main constructor function
function Moon (seedin) {
  const seeded = this

  /* initialise seed */
  // set initial seed from constructor function initialisation argument, or random integer
  const initseed = seedin !== undefined ? seedin : Math.floor(Math.random() * 1e8)

  /* initialise PRNG */
  const { state, reset, random, distribution } = PrngMethods(seeded, initseed)
  Object.assign(seeded, { state, reset, random, distribution })

  // define info method to report initial seed
  seeded.info = () => ({ initseed })

  /* clone */
  // define clone method to fork current state
  seeded.clone = () => fiona(initseed).state(seeded.state())

  let chainValue = {}

  const chainPlugin = ({ seeded }, input) => {
    chainValue = seeded.object(Object.assign({}, chainValue, input))
    return seeded
  }

  seeded.chain = function (...args) {
    const seeded = this
    return chainPlugin({ seeded }, ...args)
  }

  // TODO: does it make any sense to have chain method on fiona instance?
  // fiona.chain = (...args) => instance => chainPlugin(instance, ...args)

  const valuePlugin = () => {
    return Object.assign({}, chainValue)
  }

  seeded.value = function (...args) {
    const seeded = this
    return valuePlugin({ seeded }, ...args)
  }

  fiona.value = (...args) => instance => valuePlugin(instance, ...args)

  return seeded
}

// define main function
const fiona = (...args) => new Moon(...args)

fiona.version = packageJson.version

// set up self referencial prototype chain with jQuery like plugin architecture
Moon.prototype = { constructor: Moon }

fiona.register = (...plugins) => {
  plugins.forEach(plugin => {
    let fn
    if (type(plugin) === 'Function') {
      name = plugin.name
      fn = plugin
    } else {
      name = plugin[0]
      fn = plugin[1]
    }

    Moon.prototype[name] = function (...args) {
      const seeded = this
      return fn({ seeded }, ...args)
    }

    fiona[name] = (...args) => ({ seeded }) => {
      // TODO: it's pretty hacky to duck type the passed argument here
      if (args[0] instanceof RecurseArguments) {
        return fn({ seeded })
      } else {
        return fn({ seeded }, ...args)
      }
    }
  })
}

fiona.random = () => ({ seeded: { random } }) => random()

fiona.register(
  ['number', corePlugins.number],
  ['object', corePlugins.object],
  ['json', corePlugins.json],
  ['string', corePlugins.string],
  ['array', corePlugins.array]
)

// export the main function
module.exports = fiona
