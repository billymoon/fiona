// 10% of the time, reseed with one of 10 seeds
// frequency and pool can be overriden
// TODO: does changing seed change the duplicated values..? I think it should!
const duplicable = (seeded, { frequency = 0.1, pool = 10 } = {}) => {
  if (seeded.random() <= frequency) {
    seeded.reset((Math.floor(seeded.random() * pool + 1) / pool + 1) * 1e16)
  }
  return seeded
}

export default duplicable
