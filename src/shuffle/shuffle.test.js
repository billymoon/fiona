/* global test expect */

const Fiona = require('../core')
Fiona.register(['choose', require('../choose/choose')])
Fiona.register(['shuffle', require('./shuffle')])

test('Fiona.Shuffle', () => {
  expect(Fiona(1).shuffle([1, 2, 3, 4, 5])).toEqual([3, 4, 2, 1, 5])
  expect(Fiona(1).shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toEqual([5, 7, 8, 4, 9, 6, 3, 2, 10, 1])
})

test('Fiona.Shuffle (leave src array unmodified)', () => {
  const src = [1, 2, 3, 4, 5]
  const original = JSON.stringify(src)
  Fiona(1).shuffle(src)
  const afterwards = JSON.stringify(src)
  expect(original).toBe(afterwards)
})

test('Fiona.Shuffle with qty', () => {
  expect(Fiona(1).shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], { qty: 3 })).toEqual([5, 7, 8])
  expect(Fiona(1).shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], { qty: 0 })).toEqual([])
})
