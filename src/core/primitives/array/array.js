import recurseData from '../../recurse/index.js'

const array = (seeded, qty, input, processor = i => i) => {
  // TODO: I think the processor pattern is used a couple of times, can it be generalised?
  const myProcessor =
    typeof processor === 'string' ? i => i.join(processor) : processor
  const quantity =
    typeof qty === 'object' && qty.constructor === Object
      ? seeded.number(qty)
      : recurseData(seeded.clone(), qty)
  return myProcessor(recurseData(seeded, Array(quantity).fill(input)))
}

export default array
