const prng = require('./prng-xor')
const { processSeed } = require('./utils')

module.exports = (self, initseed) => {
// initialise prng functions
  const { reseed: prngReseed, getState, setState, random: prngRandom } = prng(0)

  // seed prng with initial seed
  prngReseed(processSeed(initseed))

  // capture initial prng state
  const initialState = getState()

  // define prng state getter/setter method
  const state = newVal => {
    if (newVal === undefined) {
      return getState()
    } else {
      if (newVal === null) {
        setState(initialState)
      } else {
        setState(newVal)
      }
      return self
    }
  }

  // define prng reseed method
  const reseed = function (seed) {
    prngReseed(processSeed(seed === null ? initseed : seed))
    return self
  }

  // define random method based on weighted prng random function
  const random = () => self.weighting(prngRandom())

  return {
    state,
    reseed,
    random
  }
}