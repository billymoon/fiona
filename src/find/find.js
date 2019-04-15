// TODO: document find
const find = Fiona => (predicate, cb, { startseed = 0, tries = 1e6 } = {}) => {
  let seed = startseed
  let seeded
  let value
  do {
    seeded = Fiona(seed)
    value = cb(seeded)
  } while (seed++ < tries + startseed && !predicate(value))
  if (seed > tries + startseed) {
    throw Error(`Predicate not satisfied within ${tries} tries`)
  }
  return seeded.reset()
}

export default find
