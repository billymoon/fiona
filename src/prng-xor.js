// xorshift128 variation of https://en.wikipedia.org/wiki/Xorshift

const baseSeeds = [123456789, 362436069, 521288629, 88675123]

const xor = seed => {
  let [x, y, z, w] = baseSeeds

  const random = () => {
    const t = x ^ (x << 11);
    [x, y, z] = [y, z, w]
    w = w ^ (w >> 19) ^ (t ^ (t >> 8))
    return w / 0x7FFFFFFF
  }

  const seeder = () => Math.round(random() * 1e16)

  const setSeeds = seed => {
    [x, y, z, w] = baseSeeds.map(i => i + seed);
    [x, y, z, w] = [seeder(), seeder(), seeder(), seeder()]
  }

  setSeeds(seed)

  return {
    random: () => random(),
    reseed: setSeeds,
    getState: () => [x, y, z, w],
    setState: seeds => ([x, y, z, w] = seeds)
  }
}

module.exports = xor
