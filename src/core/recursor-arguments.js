const RecursorArguments = function (seeded, position, data, fiona, initseed, prng, arr) {
  this.me = seeded
  this.pos = position
  this.data = data
  this.seeded = fiona(`${position}/${initseed}`, prng)
  this.arr = arr
}

module.exports = RecursorArguments
