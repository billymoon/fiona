const fiona = require('../../')

fiona.plugin('array', ({ seeded }, qty, fn, postProcess=i=>i ) => postProcess(seeded.data(({ arr }) => arr(qty, fn))))