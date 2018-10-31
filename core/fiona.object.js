const recurseData = require('./recurse')
const object = ({ seeded }, ...originals) => {
  return originals.reduce((value, next) => {
      const original = typeof next === 'function' ? next({ seeded, value }) : next
      if (!(typeof original === 'object' && original.constructor === Object)) {
      throw Error('arguments of fiona.object must be an Object or function that returns an Object')
    }

    return { ...value, ...recurseData(seeded, Object.assign({}, original)) }
  }, {})
}

module.exports = object
