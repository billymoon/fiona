const chooser = require('./chooser')

const choose = (seeded, qty, arr, { weights = [] } = {}) => {
  const myArr = arr.slice(0)
  const myWeightings = weights.slice(0)
  return Array(qty || 0).fill(null).map((v, i) => {
    const index = chooser(seeded.random(), myArr, myWeightings)
    const result = myArr[index]
    myArr[index] = myArr[0]
    myArr.shift()
    return result
  })
}

module.exports = choose
