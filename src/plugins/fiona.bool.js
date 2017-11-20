const fiona = require('../fiona')

fiona.fn.bool = function ({ chance = 0.5 } = {}) {
  return this.random() < chance
}
