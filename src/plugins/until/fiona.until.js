const fiona = require('../../')

fiona.until = (predicate, data, { startseed = 0, tries = 1e6 } = {}) => {
  let seed = startseed
  let seeded
  do {
    seeded = fiona(seed).chain(Object.assign({}, data))
  } while (seed++ < tries + startseed && !predicate(seeded.value()))
  if (seed > tries + startseed) {
    throw Error(`Predicate not satisfied within ${tries} tries`)
  }
  return seeded
}
