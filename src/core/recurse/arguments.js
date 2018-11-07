const Prng = require('../prng')

// new seeded.constructor =~ new Moon =~ fiona
const RecurseArguments = (seeded, position) => new seeded.constructor(`${position}/${seeded.info().initseed}`, Prng)

module.exports = RecurseArguments
