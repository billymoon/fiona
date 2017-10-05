import test from 'ava'
import fiona from '../fiona.js'

test('fiona.fn.duplicable', t => {
  t.deepEqual(fiona('moon').data(({ arr }) => arr(10, ({ seeded }) => {
    return seeded.duplicable(0.9, 2).number()
  })).data(), [
    66365,
    347174,
    66365,
    347174,
    347174,
    66365,
    608274,
    347174,
    66365,
    66365
  ])
})
