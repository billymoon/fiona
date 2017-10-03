import MersenneTwister from 'mersenne-twister'

export default seed => {
  const twister = new MersenneTwister(seed !== undefined ? seed : 0)
  return {
    random: () => twister.random(),
    reseed: seed => twister.init_seed(seed),
    getState: () => ({
      // N: twister.N,
      // M: twister.M,
      // MATRIX_A: twister.MATRIX_A,
      // UPPER_MASK: twister.UPPER_MASK,
      // LOWER_MASK: twister.LOWER_MASK,
      mt: twister.mt.slice(0),
      mti: twister.mti
    }),
    setState: newstate => {
      // twister.N = newstate.N
      // twister.M = newstate.M
      // twister.MATRIX_A = newstate.MATRIX_A
      // twister.UPPER_MASK = newstate.UPPER_MASK
      // twister.LOWER_MASK = newstate.LOWER_MASK
      twister.mt = newstate.mt
      twister.mti = newstate.mti
    }
  }
}
