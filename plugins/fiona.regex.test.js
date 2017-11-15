/* global test,expect */

const fiona = require('../src/fiona')
require('./fiona.regex')

test('sanity', () => {
  expect(true + true).toBe(2)
})

test('import', () => {
  expect(typeof fiona).toBe('function')
})

test('fiona.fn.regex', () => {
  expect(fiona(1).regex(/[0-1]{8} (cy|ro)bo(t|rg)s/)).toBe('11010001 robots')
})
