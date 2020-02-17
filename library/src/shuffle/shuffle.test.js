import test from 'ava'
import Fiona from '../core/index.js'
import choose from '../choose/choose.js'
import shuffle from './shuffle.js'

Fiona.register(['choose', choose])
Fiona.register(['shuffle', shuffle])

test('Fiona.Shuffle', t => {
  t.deepEqual(Fiona(1).shuffle([1, 2, 3, 4, 5]), [3, 4, 2, 1, 5])
  t.deepEqual(Fiona(1).shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), [
    5,
    7,
    8,
    4,
    9,
    6,
    3,
    2,
    10,
    1
  ])
})

test('Fiona.Shuffle (leave src array unmodified)', t => {
  const src = [1, 2, 3, 4, 5]
  const original = JSON.stringify(src)
  Fiona(1).shuffle(src)
  const afterwards = JSON.stringify(src)
  t.is(original, afterwards)
})

test('Fiona.Shuffle with qty', t => {
  t.deepEqual(Fiona(1).shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], { qty: 3 }), [
    5,
    7,
    8
  ])
  t.deepEqual(Fiona(1).shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], { qty: 0 }), [])
})
