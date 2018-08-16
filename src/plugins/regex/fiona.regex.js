const RandExp = require('randexp')

const fiona = require('../../')

fiona.plugin('regex', ({ seeded }, regex = /[A-F0-9]{16}/) => {
  const myRandExp = new RandExp(regex)
  // redefine RandExp's random number generator to use fiona's prng
  myRandExp.randInt = (a, b) => a + Math.floor(seeded.random() * (1 + b - a))
  // return the randomly generated string, not the RandExp object
  return myRandExp.gen()
})
