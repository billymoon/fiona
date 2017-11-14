const fiona = require('../src/fiona')
const RandExp = require('randexp')

fiona.fn.regex = function (regex) {
  const myRandExp = new RandExp(regex)
  // redefine RandExp's random number generator to use fiona's prng
  myRandExp.randInt = function (a, b) {
    return a + Math.floor(this.random() * (1 + b - a))
  }.bind(this)
  // return the randomly generated string, not the RandExp object
  return myRandExp.gen()
}
