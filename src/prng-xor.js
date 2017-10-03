const baseSeeds = [123456789, 362436069, 521288629, 88675123]
const xor = seed => {
  let [x, y, z, w] = baseSeeds

  const random = function () {
    var t = x ^ (x << 11)

    x = y
    y = z
    z = w

    w = w ^ (w >> 19) ^ (t ^ (t >> 8))

    return w / 0x7FFFFFFF
  }

  const setSeeds = seed => {
    [x, y, z, w] = baseSeeds.map(i => i + seed)
    const newseeds = [
      Math.round(random() * 1e16),
      Math.round(random() * 1e16),
      Math.round(random() * 1e16),
      Math.round(random() * 1e16)
    ]
    x = newseeds[0]
    y = newseeds[1]
    z = newseeds[2]
    w = newseeds[3]
  }

  setSeeds(seed)

  return {
    random: () => random(),
    reseed: setSeeds,
    getState: () => [x, y, z, w],
    setState: seeds => ([x, y, z, w] = seeds)
  }
}

export default xor
