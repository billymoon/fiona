const bezierEasing = require('bezier-easing')

const fiona = require('../../')
const { type } = require('../../utils')

fiona.weighted = (weighting, fn) => {
  if (type(fn) === 'Array') {
    fiona.weighted[weighting] = bezierEasing.apply(null, fn)
  } else if (type(fn) === 'Function') {
    fiona.weighted[weighting] = fn
  } else {
    throw Error('invalid argument type supplied to `weighted` method')
  }
}

fiona.weighted('linear', i => i)
fiona.weighted('square', i => i * i)
fiona.weighted('cube', i => i * i * i)
fiona.weighted('quad', i => i * i * i * i)

fiona.weighted('low', [1, 0, 1, 0])
fiona.weighted('middle', [0, 1, 1, 0])
fiona.weighted('high', [0, 1, 0, 1])
fiona.weighted('extremes', [1, 0, 0, 1])
fiona.weighted('tinyTop', [0.25, 1, 1, 0.5])

fiona.plugin('weighted', ({ seeded }, weighting) => seeded.weighting(fiona.weighted[weighting]))

// TODO: get rid of fiona.weighted - replace with fiona.easy
fiona.easy = arr => bezierEasing(...arr)
