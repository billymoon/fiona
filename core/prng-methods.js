const prng = require('./prng-xor')
const processSeed = require('./process-seed')
const Distribution = require('./distribution')

module.exports = (seeded, initseed) => {
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
      return seeded
    }
  }

  const distribution = Distribution(seeded)

  // define prng reseed method
  const reset = (seed) => {
    prngReseed(processSeed(seed !== undefined ? seed : initseed))
    return seeded
  }

  // define random method based on weighted prng random function
  const random = () => distribution(prngRandom())

  return {
    state,
    reset,
    random,
    distribution
  }
}