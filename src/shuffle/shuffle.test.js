/* global test expect */

const fiona = require('../core')
fiona.register(['choose', require('../choose/choose')])
fiona.register(['shuffle', require('./shuffle')])

test('fiona.Shuffle', () => {
  expect(fiona(1).shuffle([1, 2, 3, 4, 5])).toEqual([3, 4, 2, 1, 5])
  expect(fiona(1).shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual([5, 7, 8, 4, 9, 6, 3, 2, 10, 1])
})

test('fiona.Shuffle (leave src array unmodified)', () => {
  const src = [1, 2, 3, 4, 5]
  const original = JSON.stringify(src)
  fiona(1).shuffle(src)
  const afterwards = JSON.stringify(src)
  expect(original).toBe(afterwards)
})

test('fiona.Shuffle with qty', () => {
  expect(fiona(1).shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], { qty: 3 })).toEqual([5, 7, 8])
  expect(fiona(1).shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], { qty: 0 })).toEqual([])
})
