const PrngMethods = require('./prng-methods')

const MoonFactory = fiona => {
  // define main constructor function
  function Moon (seedin) {
    const seeded = this

    // set initial seed from constructor function initialisation argument, or random integer
    const initseed = seedin !== undefined ? seedin : Math.floor(Math.random() * 1e8)

    // initialise PRNG
    const { state, reset, random, distribution } = PrngMethods(seeded, initseed)
    Object.assign(seeded, { state, reset, random, distribution })

    seeded.info = () => ({ initseed })

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

    const valuePlugin = () => {
      return Object.assign({}, chainValue)
    }

    seeded.value = function (...args) {
      const seeded = this
      return valuePlugin({ seeded }, ...args)
    }

    return seeded
  }

  // set up self referencial prototype chain with jQuery like plugin architecture
  Moon.prototype = { constructor: Moon }

  return Moon
}

module.exports = MoonFactory
