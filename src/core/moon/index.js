// TODO: should Moon be renamed to something more intuitive like FionaConstructor?
// define main constructor function
function Moon(seedin, Prng) {
  const seeded = this

  // set initial seed from constructor function initialisation argument, or random integer
  const initseed =
    seedin !== undefined ? seedin : Math.floor(Math.random() * 1e8)

  // initialise PRNG
  const { state, reset, random, distribution } = Prng(seeded, initseed)
  Object.assign(seeded, { state, reset, random, distribution })

  seeded.info = () => ({ initseed })

  return seeded
}

// set up self referencial prototype chain á la jQuery
Moon.prototype = { constructor: Moon }

module.exports = Moon
