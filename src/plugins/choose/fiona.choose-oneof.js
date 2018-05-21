const fiona = require('../../')
const chooser = require('./chooser')

fiona.plugin('oneOf', ({ seeded }, arr, { weights = [] } = {}) => {
  return arr[chooser(seeded.random(), arr, weights)]
})
