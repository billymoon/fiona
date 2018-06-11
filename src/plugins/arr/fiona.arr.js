const fiona = require('../../')

fiona.plugin('arr', ({ seeded }, qty, fn) => seeded.data(({ arr }) => arr(qty, fn)))