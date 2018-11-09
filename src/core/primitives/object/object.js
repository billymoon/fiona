const recurseData = require('../../recurse')

const object = (seeded, ...originals) => {
  return originals.reduce((memo, original) => {
    return recurseData(seeded, original, undefined, undefined, memo)
    // TODO: re-instate error checking for object
    // const result = recurseData(seeded, original, undefined, undefined, memo)
    // if (!(typeof result === 'object' && result.constructor === Object)) {
    //   throw Error('arguments of fiona.Object must be an Object or function that returns an Object')
    // }
    // return result
  }, {})
}
module.exports = object
