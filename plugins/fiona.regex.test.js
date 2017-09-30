import test from 'ava'
import fiona from '../fiona.js'

test('sanity', t => {
  t.true(true + true === 2)
})

test('import', t => {
  t.true(typeof fiona === 'function')
})

test('fiona.fn.regex', t => {
  t.true(fiona(1).regex(/[0-1]{8} (cy|ro)bo(t|rg)s/) === '10111000 roborgs')
})
