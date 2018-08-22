const packageJson = require('../package')
// const RecurseData = require('./recurse-data')
const PrngMethods = require('./prng-methods')
const { type } = require('./utils')
// const RecursorArguments = require('./recursor-arguments')

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

  return seeded
}

// define main function
const fiona = (...args) => new Moon(...args)

// TODO: don't reuquire whole package json just to get version string
fiona.version = packageJson.version

// set up self referencial prototype chain with jQuery like plugin architecture
Moon.prototype = { constructor: Moon }

// TODO: change function signature to take list of named functions, or [name, function] plugin definitions
fiona.register = (name, fn) => {
  if (type(name) === 'Function') {
    fn = name
    name = fn.name
  }

  Moon.prototype[name] = function (...args) {
    const seeded = this
    return fn({ seeded }, ...args)
  }

  fiona[name] = (...args) => ({ seeded }) => fn({ seeded }, ...args)
}

fiona.random = () => ({ seeded: { random } }) => random()

// export the main function
module.exports = fiona
