const recurseData = require('./recurse')

const object = ({ seeded }, original) => {
  if (!(typeof original === 'object' && original.constructor === Object)) {
    throw Error('first argument of fiona.object must be an Object')
  }

  return recurseData(seeded, original)
}

module.exports = object
