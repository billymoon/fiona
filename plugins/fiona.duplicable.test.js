import test from 'ava'
import fiona from '../fiona.js'

test('fiona.fn.duplicable', t => {
  t.deepEqual(fiona('moon').data(({ arr }) => arr(10, ({ seeded }) => {
    return seeded.duplicable(0.9, 2).number()
  })).data(), [
    373260,
    153925,
    373260,
    373260,
    153925,
    153925,
    153925,
    153925,
    373260,
    153925
  ])
})
