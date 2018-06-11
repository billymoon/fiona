/* global test,expect */

const fiona = require('../../')
require('./fiona.arr')

const resultFixture = [
  0.8474856111442137,
  0.1808786500156292,
  0.7357590905091534,
  0.45598167714475735,
  0.9600584911927853,
  0.18672141301758652,
  0.22315111720149922,
  0.2839626680519258,
  0.7499625341733743,
  0.4541439816607833
]

test('fiona.fn.arr (10 items)', () => {
  expect(fiona(1).arr(10, fiona.call('random'))).toEqual(resultFixture)
})

test('fiona.fn.arr (0 items)', () => {
  expect(fiona(1).arr(0, fiona.call('random'))).toEqual([])
})
