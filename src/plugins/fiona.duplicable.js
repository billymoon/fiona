const fiona = require('../fiona')

// 10% of the time, reseed with one of 10 seeds
// frequency and pool can be overriden
fiona.fn.duplicable = function ({ frequency = 0.1, pool = 10 } = {}) {
  if (this.random() <= frequency) {
    this.reseed((Math.floor(this.random() * pool + 1) / pool + 1) * 1e16)
  }
  return this
}
