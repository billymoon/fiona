/* global test,expect */

const fiona = require('../../')
require('./fiona.shuffle')

test('fiona.fn.shuffle', () => {
  expect(fiona(1).shuffle([1, 2, 3, 4, 5])).toEqual([4, 1, 2, 5, 3])
  expect(fiona(1).shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual([3, 4, 8, 2, 7, 10, 1, 9, 6, 5])
})

test('fiona.fn.shuffle (leave src array unmodified)', () => {
  const src = [1, 2, 3, 4, 5]
  const original = JSON.stringify(src)
  fiona(1).shuffle(src)
  const afterwards = JSON.stringify(src)
  expect(original).toBe(afterwards)
})

// TODO: test and document limit of shuffle