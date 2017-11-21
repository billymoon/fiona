const { type } = require('./utils')

// define default weighting method
const defaultWeighting = i => i

module.exports = self => {
  // define initial weighting to be default weighting
  let weighting = defaultWeighting

  return newVal => {
    if (type(newVal) === 'Function') {
      weighting = newVal
      return self
    } else if (newVal === null) {
      weighting = defaultWeighting
      return self
    } else {
      return weighting(newVal)
    }
  }
}
