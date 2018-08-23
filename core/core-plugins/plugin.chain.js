const { type } = require('../utils')

const chain = ({ seeded }, input) => {
  // TODO: should chain magically add methods to seeded instance - seems bad :(
  // TODO: should chain store the value somewhere more conceiled? perhaps move to core to achieve this?
  seeded.value = seeded.object(Object.assign({}, seeded.value || {}, input))
  // TODO: should chain override json method - seems terrible
  // seeded.json = (indentation = 0) => JSON.stringify(seeded.value, null, indentation)
  return seeded
}

module.exports = chain