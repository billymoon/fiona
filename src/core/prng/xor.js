// xorshift128 variation of https://en.wikipedia.org/wiki/Xorshift

const baseSeeds = [123456789, 362436069, 521288629, 88675123]

const xor = seed => {
  let [x, y, z, w] = baseSeeds

  // const random = ()=>([x,y, z, w] = [y, z, w, w ^ w >> 19 ^ x ^ x << 11 ^ (x ^ x << 11) >> 8]) && w / 0x7fffffff
  const random = () => {
    const t = x ^ (x << 11)
    ;[x, y, z] = [y, z, w]
    w = w ^ (w >> 19) ^ t ^ (t >> 8)
    return w / 0x7fffffff
  }

  // https://stackoverflow.com/q/31513168/665261
  // const reverse = t => ([w, z, y, x] = [z, y, x, (t = w ^ z ^ z >> 19, t ^= t >> 8, t ^= t >> 16, t ^= t << 11, t ^ t << 22)]) && w / 0x7fffffff
  const reverse = () => {
    let t = w ^ z ^ (z >> 19)
    t = t ^ (t >> 8)
    t = t ^ (t >> 16)
    t = t ^ (t << 11)
    t = t ^ (t << 22)
    ;[w, z, y] = [z, y, x]
    x = t
    return w / 0x7fffffff
  }

  const seeder = () => Math.round(random() * 1e16)

  const setSeeds = seed => {
    ;[x, y, z, w] = baseSeeds.map(i => i + seed)
    ;[x, y, z, w] = [seeder(), seeder(), seeder(), seeder()]
  }

  setSeeds(seed)

  return {
    random: () => random(),
    reverse: () => reverse(),
    reseed: setSeeds,
    getState: () => [x, y, z, w],
    setState: seeds => ([x, y, z, w] = seeds)
  }
}

export default xor
