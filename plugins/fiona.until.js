import fiona from '../src/fiona'

fiona.until = function (fn, thing, startseed = 0, tries = 1e6) {
  let seed = startseed
  let seeded
  do {
    seeded = fiona(seed).data(Object.assign({}, thing))
  } while (seed++ < tries + startseed && !fn(seeded.data()))
  if (seed > tries + startseed) {
    throw Error(`Predicate not satisfied within ${tries} tries`)
  }
  return seeded
}
