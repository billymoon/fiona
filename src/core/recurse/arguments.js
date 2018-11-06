// new seeded.constructor =~ new Moon =~ fiona
const RecurseArguments = (seeded, position) => new seeded.constructor(`${position}/${seeded.info().initseed}`)

module.exports = RecurseArguments
