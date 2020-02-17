// TODO: add a Mersenne Twister for comparison, and benchmark
import xor from './xor.js'
import processSeed from '../process-seed/index.js'
import Distribution from '../distribution/index.js'

// TODO: add specific tests for prng wrapper
export default (seeded, initseed) => {
  // initialise prng functions
  const { reseed, getState, setState, random: prngRandom, reverse } = xor(0)

  // seed prng with initial seed
  reseed(processSeed(initseed))

  // capture initial prng state
  const initialState = getState()

  // TODO: should be normalized to serialised string for portability?
  // define prng state getter/setter method
  const state = newVal => {
    // if called with no arguments, return state
    // else if called with null, reset state and return seeded instance
    // else if called with value, set state to value and return seeded instance
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

  // define prng reset method
  const reset = seed => {
    reseed(processSeed(seed !== undefined ? seed : initseed))
    return seeded
  }

  // define random method based on distribution weighted prng random function
  const random = () => distribution(prngRandom())

  return {
    state,
    reset,
    random,
    reverse,
    distribution
  }
}
