const bezierEasing = require('bezier-easing')

const fiona = require('../../')
const { type } = require('../../utils')

fiona.weight = (weighting, fn) => {
  if (type(fn) === 'Array') {
    fiona.weight[weighting] = bezierEasing.apply(null, fn)
  } else if (type(fn) === 'Function') {
    fiona.weight[weighting] = fn
  } else {
    throw Error('invalid argument type supplied to `weighted` method')
  }
}

fiona.weight('linear', i => i)
fiona.weight('square', i => i * i)
fiona.weight('cube', i => i * i * i)
fiona.weight('quad', i => i * i * i * i)

fiona.weight('low', [1, 0, 1, 0])
fiona.weight('middle', [0, 1, 1, 0])
fiona.weight('high', [0, 1, 0, 1])
fiona.weight('extremes', [1, 0, 0, 1])
fiona.weight('tinyTop', [0.25, 1, 1, 0.5])

fiona.plugin('weighted', ({ seeded }, weighting) => seeded.weighting(fiona.weight[weighting]))
