const { type } = require('../utils')
const recurseData = require('../recurse-data')

const array = ({ seeded }, qty, input, processor = i => i) => {
  const myProcessor = type(processor) === 'String' ? i => i.join(processor) : processor
  const quantity = type(qty) === 'Object' ? seeded.number(qty) : recurseData(seeded.clone(), qty)
  return myProcessor(recurseData(seeded, Array(quantity).fill(input)))
}

module.exports = array
