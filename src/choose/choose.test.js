/* global test expect */
const requireEsm = lib => require('esm')(module)(lib).default

const Fiona = requireEsm('../core')
Fiona.register(['choose', requireEsm('./choose')])

test('Fiona.Choose', () => {
  const baby = Fiona(1)
  const oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  expect(baby.choose(3, oneToTen)).toEqual([5, 7, 8])
  expect(baby.choose(3, oneToTen)).toEqual([1, 9, 4])
  expect(baby.choose(3, oneToTen)).toEqual([4, 1, 10])
  expect(baby.choose(11, oneToTen)).toEqual([
    9,
    5,
    8,
    6,
    7,
    2,
    10,
    4,
    1,
    3,
    undefined
  ])
  baby.reset()
  expect(baby.choose(3, oneToTen, { weights: [10, 5, 1] })).toEqual([2, 3, 4])
  baby.reset()
  expect(baby.choose(3, oneToTen, { weights: [10, 5, ''] })).toEqual([2, 3, 4])
  baby.reset()
  expect(baby.choose(3, oneToTen, { weights: [10] })).toEqual([1, 3, 4])
  baby.reset()
  expect(baby.choose(3, oneToTen, { weights: [10, 1] })).toEqual([1, 3, 4])
  baby.reset().distribution(i => i * i * i)
  expect(baby.choose(3, oneToTen)).toEqual([1, 3, 5])
  expect(baby.choose(3, oneToTen)).toEqual([1, 7, 3])
  expect(baby.choose(3, oneToTen)).toEqual([1, 2, 8])
  expect(baby.choose(11, oneToTen)).toEqual([
    7,
    2,
    5,
    4,
    3,
    6,
    9,
    1,
    8,
    10,
    undefined
  ])
  expect(baby.choose(null, oneToTen)).toEqual([])
  expect(baby.choose(0, oneToTen)).toEqual([])
})
