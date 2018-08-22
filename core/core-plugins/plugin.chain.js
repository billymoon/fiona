const { type } = require('../utils')

const chain = ({ seeded }, obj) => {
  seeded.value = {}
  return seeded
}

module.exports = chain