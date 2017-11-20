const fiona = require('../fiona')

fiona.fn.date = function ({ min = '1940', max = '2000', long = false } = {}) {
  const early = new Date(min) * 1
  const late = new Date(max) * 1
  if (early > late) {
    throw Error(`min date must be lower than max date`)
  }
  const diff = late - early
  const date = new Date(this.number({ max: diff }) + early).toISOString()
  return long ? date : date.slice(0, 10)
}
