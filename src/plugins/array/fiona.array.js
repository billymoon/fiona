const fiona = require('../../')

fiona.plugin('array', ({ seeded }, qty, fn) => seeded.data(({ arr }) => arr(qty, fn)))