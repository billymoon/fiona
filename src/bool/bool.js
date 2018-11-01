const bool = (seeded, { chance = 0.5 } = {}) => seeded.random() < chance

module.exports = bool
