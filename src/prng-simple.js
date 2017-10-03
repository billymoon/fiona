const prng = seed => {
  const mix = seed => (seed * 9301 + 49297) % 233280
  const reseed = newseed => (seed = newseed)
  return {
    random: () => (seed = mix(mix(seed))) / 233280,
    reseed: reseed,
    getState: () => seed,
    setState: reseed
  }
}

export default prng
