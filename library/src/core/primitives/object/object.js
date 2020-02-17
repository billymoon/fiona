import recurseData from '../../recurse/index.js'

const object = (seeded, ...originals) => {
  return originals.reduce((memo, original) => {
    return recurseData(seeded, original)
    // return recurseData(seeded, original, undefined, undefined, memo)
    // TODO: re-instate error checking for object
    // const result = recurseData(seeded, original, undefined, undefined, memo)
    // if (!(typeof result === 'object' && result.constructor === Object)) {
    //   throw Error('arguments of Fiona.Object must be an Object or function that returns an Object')
    // }
    // return result
  }, {})
}
export default object
