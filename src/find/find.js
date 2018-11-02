const find = fiona => (predicate, cb, { startseed = 0, tries = 1e6 } = {}) => {
  let seed = startseed
  let seeded
  let value
  do {
    seeded = fiona(seed)
    value = cb(seeded)
  } while (seed++ < tries + startseed && !predicate(value))
  if (seed > tries + startseed) {
    throw Error(`Predicate not satisfied within ${tries} tries`)
  }
  return seeded.reset()
}

module.exports = find
