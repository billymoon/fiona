const Prng = require('../prng')

// define main constructor function
function Moon (seedin) {
  const seeded = this

  // set initial seed from constructor function initialisation argument, or random integer
  const initseed = seedin !== undefined ? seedin : Math.floor(Math.random() * 1e8)

  // initialise PRNG
  const { state, reset, random, distribution } = Prng(seeded, initseed)
  Object.assign(seeded, { state, reset, random, distribution })

  seeded.info = () => ({ initseed })

  let chainValue = {}

  const chainPlugin = (seeded, ...inputs) => {
    chainValue = seeded.object(chainValue, ...inputs)
    return seeded
  }

  // TODO: perhaps deprecate the chain method since object/json now take functions as arguments and multiple arguments and return current value inline
  seeded.chain = function (...args) {
    const seeded = this
    return chainPlugin(seeded, ...args)
  }

  const valuePlugin = () => {
    return Object.assign({}, chainValue)
  }

  seeded.value = function (...args) {
    const seeded = this
    return valuePlugin(seeded, ...args)
  }

  return seeded
}

// set up self referencial prototype chain with jQuery like plugin architecture
Moon.prototype = { constructor: Moon }

module.exports = Moon
