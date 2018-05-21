const fiona = require('../../')

fiona.plugin('bool', ({ seeded }, { chance = 0.5 } = {}) => seeded.random() < chance)
