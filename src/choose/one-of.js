const chooser = require('./chooser')

const oneOf = (seeded, arr, { weights = [] } = {}) => {
  return arr[chooser(seeded.random(), arr, weights)]
}

module.exports = oneOf
