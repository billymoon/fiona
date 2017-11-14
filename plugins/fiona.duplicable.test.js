const fiona = require('../src/fiona')
require('./fiona.duplicable')
const t = require('../ava-to-jest-hack')


test('fiona.fn.duplicable', () => {
  t.deepEqual(fiona('moon').data(({ arr }) => arr(10, ({ seeded }) => {
    return seeded.duplicable({ frequency: 0.8, pool: 2 }).number()
  })), [
    373260,
    153925,
    373260,
    271890,
    153925,
    153925,
    153925,
    153925,
    373260,
    153925
  ])

  t.deepEqual(fiona('moon').data(({ arr }) => arr(3, ({ seeded }) => {
    return seeded.duplicable().number()
  })), [
    292980,
    916259,
    316107
  ])
})
