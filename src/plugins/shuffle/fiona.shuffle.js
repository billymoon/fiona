const fiona = require('../../')

fiona.plugin('shuffle', ({ seeded }, arr) => seeded.choose(arr.length, arr))
