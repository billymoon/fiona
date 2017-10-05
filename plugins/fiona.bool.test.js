import test from 'ava'
import fiona from '../fiona.js'

test('fiona.fn.bool', t => {
  t.is(fiona(1).bool(), true)
  t.is(fiona(2).bool(), false)
})

test('fiona.fn.bool (likelihood)', t => {
  t.is(fiona(1).bool(), true)
  t.is(fiona(1).bool(0.25), false)
  t.is(fiona(2).bool(), false)
  t.is(fiona(2).bool(0.75), true)
})
