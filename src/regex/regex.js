// TODO: should regex be part of core?
import RandExp from './randexp.js'

const regex = (seeded, regex = /[A-F0-9]{16}/) => {
  const myRandExp = new RandExp(regex)
  // redefine RandExp's random number generator to use Fiona's prng
  myRandExp.randInt = (a, b) => a + Math.floor(seeded.random() * (1 + b - a))
  // return the randomly generated string, not the RandExp object
  return myRandExp.gen()
}

export default regex
