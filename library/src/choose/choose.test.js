import test from 'ava'
import Fiona from '../core/index.js'
import choose from './choose.js'

Fiona.register(['choose', choose])

test('Fiona.Choose', t => {
  const baby = Fiona(1)
  const oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  t.deepEqual(baby.choose(3, oneToTen), [5, 7, 8])
  t.deepEqual(baby.choose(3, oneToTen), [1, 9, 4])
  t.deepEqual(baby.choose(3, oneToTen), [4, 1, 10])
  t.deepEqual(baby.choose(11, oneToTen), [
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
  t.deepEqual(baby.choose(3, oneToTen, { weights: [10, 5, 1] }), [2, 3, 4])
  baby.reset()
  t.deepEqual(baby.choose(3, oneToTen, { weights: [10, 5, ''] }), [2, 3, 4])
  baby.reset()
  t.deepEqual(baby.choose(3, oneToTen, { weights: [10] }), [1, 3, 4])
  baby.reset()
  t.deepEqual(baby.choose(3, oneToTen, { weights: [10, 1] }), [1, 3, 4])
  baby.reset().distribution(i => i * i * i)
  t.deepEqual(baby.choose(3, oneToTen), [1, 3, 5])
  t.deepEqual(baby.choose(3, oneToTen), [1, 7, 3])
  t.deepEqual(baby.choose(3, oneToTen), [1, 2, 8])
  t.deepEqual(baby.choose(11, oneToTen), [
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
  t.deepEqual(baby.choose(null, oneToTen), [])
  t.deepEqual(baby.choose(0, oneToTen), [])
})
