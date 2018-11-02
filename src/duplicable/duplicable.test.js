/* global test expect */

const fiona = require('../core')
fiona.register(['duplicable', require('./duplicable')])

test('fiona.duplicable', () => {
  expect(fiona('moon').array(10, seeded => {
    return seeded.duplicable({ frequency: 0.8, pool: 2 }).number()
  })).toEqual([972611, 628994, 153925, 153925, 373260, 373260, 373260, 373260, 373260, 153925])

  expect(fiona('moon').array(3, seeded => {
    return seeded.duplicable().number()
  })).toEqual([972611, 628994, 979373])
})
