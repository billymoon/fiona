import test from 'ava'
import fiona from '../fiona.js'

test('sanity', t => {
  t.is(true + true, 2)
})

test('import', t => {
  t.is(typeof fiona, 'function')
})

test('fiona.fn.regex', t => {
  t.is(fiona(1).regex(/[0-1]{8} (cy|ro)bo(t|rg)s/), '11100010 cybots')
})
