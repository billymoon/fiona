/* global test,expect */

const fiona = require('../core')
fiona.register(['regex', require('./regex')])

test('sanity', () => {
  expect(true + true).toBe(2)
})

test('import', () => {
  expect(typeof fiona).toBe('function')
})

test('fiona.regex', () => {
  expect(fiona(1).regex(/[0-1]{8} (cy|ro)bo(t|rg)s/)).toBe('11010001 robots')
})

test('fiona.regex (with no arguments)', () => {
  expect(fiona(1).regex()).toBe('34A7CFE87F5EFD77')
})
