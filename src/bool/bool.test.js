import test from 'ava'
import Fiona from '../core/index.js'

Fiona.register(['bool', require('./bool')])

test('Fiona.Bool', t => {
  t.is(Fiona(1).bool(), true)
  t.is(Fiona(2).bool(), false)
})

test('Fiona.Bool (chance)', t => {
  t.is(Fiona(1).bool(), true)
  t.is(Fiona(1).bool({ chance: 0.25 }), false)
  t.is(Fiona(2).bool(), false)
  t.is(Fiona(2).bool({ chance: 0.75 }), true)
})
