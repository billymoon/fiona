/* global test,expect */

const fiona = require('../')
require('./fiona.duplicable')

test('fiona.fn.duplicable', () => {
  expect(fiona('moon').data(({ arr }) => arr(10, ({ seeded }) => {
    return seeded.duplicable({ frequency: 0.8, pool: 2 }).number()
  }))).toEqual([
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

  expect(fiona('moon').data(({ arr }) => arr(3, ({ seeded }) => {
    return seeded.duplicable().number()
  }))).toEqual([
    292980,
    916259,
    316107
  ])
})
