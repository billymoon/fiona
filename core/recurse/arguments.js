const RecurseArguments = function (seeded, position) {
  // TODO: is it useful to return parent here..?
  // this.parent = seeded
  this.position = position
  // new seeded.constructor =~ new Moon =~ fiona
  this.seeded = new seeded.constructor(`${position}/${seeded.info().initseed}`)
  return this
}

module.exports = RecurseArguments
