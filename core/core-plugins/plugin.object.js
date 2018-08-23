const recurseData = require('../recurse-data')
const { type } = require('../utils')

const object = ({ seeded }, original) => {
  if (type(original) !== 'Object') {
    throw Error('first argument of fiona.object must be an Object')
  }

  return recurseData(seeded, original)
}

module.exports = object
