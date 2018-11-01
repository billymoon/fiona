const recurseData = require('../../recurse')
const object = ({ seeded }, ...originals) => {
  return originals.reduce((value, next) => {
      const original = typeof next === 'function' ? next({ seeded }, value) : next
      if (!(typeof original === 'object' && original.constructor === Object)) {
      throw Error('arguments of fiona.object must be an Object or function that returns an Object')
    }

    // TODO: change the order of recursion so that results of functions defined earlier can be passed as value to functions defined later
    return { ...value, ...recurseData(seeded, { ...original}, undefined, undefined, { ...original, ...value }) }
  }, {})
}

module.exports = object
