import test from 'ava'
import fiona from '../fiona.js'

test('fiona.fn.duplicable', t => {
  t.deepEqual(fiona('moon').data(({ arr }) => arr(10, ({ seeded }) => {
    return seeded.duplicable({ frequency: 0.9, pool: 2 }).number()
  })), [
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
