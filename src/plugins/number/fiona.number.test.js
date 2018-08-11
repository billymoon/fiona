/* global test,expect */

const fiona = require('../../')
require('./fiona.number')

test('fiona.fn.number', () => {
  expect(fiona(1).number()).toBe(458333)
  expect(fiona(1).number({ min: 500000 })).toBe(729166)
  expect(fiona(1).number({ min: 500000, precision: 3 })).toBe(729166.751)
  expect(fiona(1).number({ min: 500000, precision: -3 })).toBe(729000)
  expect(fiona(1).number({ min: 500000, precision: null })).toBe(729166)
  expect(fiona(1).number({ max: 100 })).toBe(46)
  expect(fiona(1).number({ min: 90, max: 100 })).toBe(95)
})
