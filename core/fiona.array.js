const recurseData = require('./recurse')

const array = ({ seeded }, qty, input, processor = i => i) => {
  const myProcessor = typeof processor === 'string' ? i => i.join(processor) : processor
  const quantity = typeof qty === 'object' && qty.constructor === Object ? seeded.number(qty) : recurseData(seeded.clone(), qty)
  return myProcessor(recurseData(seeded, Array(quantity).fill(input)))
}

module.exports = array
