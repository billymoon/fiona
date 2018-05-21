/* global test,expect */

const fiona = require('../../')
require('../number/fiona.number')
require('./fiona.json')

test('fiona.fn.json', () => {
  expect(fiona(1).chain(1).json()).toBe('1')
  expect(fiona(1).chain('1').json()).toBe('"1"')
  expect(fiona(1).chain({ num: ({ seeded }) => seeded.number(), str: 'value' }).json()).toBe('{"num":507868,"str":"value"}')
  expect(fiona(1).chain([1, null, "str", {key: 'val'}]).json()).toBe('[1,null,"str",{"key":"val"}]')
})

test('JSON.stringify(seeded)', () => {
  expect(JSON.stringify(fiona(1).chain([1, null, "str", {key: 'val'}]))).toBe('[1,null,"str",{"key":"val"}]')
})
