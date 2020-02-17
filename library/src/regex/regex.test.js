import test from 'ava'
import Fiona from '../core/index.js'
import Regex from './regex'
import RandExp from 'randexp'

Fiona.register(['regex', Regex(RandExp)])

test('sanity', t => {
  t.is(true + true, 2)
})

test('import', t => {
  t.is(typeof Fiona, 'function')
})

test('Fiona.Regex', t => {
  t.is(Fiona(1).regex(/[0-1]{8} (cy|ro)bo(t|rg)s/), '11010001 robots')
})

test('Fiona.Regex (with no arguments)', t => {
  t.is(Fiona(1).regex(), '34A7CFE87F5EFD77')
})
