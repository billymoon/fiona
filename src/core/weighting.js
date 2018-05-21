const { type } = require('../utils')

// define default weighting method
const defaultWeighting = i => i

module.exports = seeded => {
  // define initial weighting to be default weighting
  let weighting = defaultWeighting

  return newVal => {
    if (type(newVal) === 'Function') {
      weighting = newVal
      return seeded
    } else if (newVal === null) {
      weighting = defaultWeighting
      return seeded
    } else {
      return weighting(newVal)
    }
  }
}
