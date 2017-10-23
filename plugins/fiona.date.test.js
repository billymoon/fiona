import test from 'ava'
import fiona from '../fiona.js'

test('fiona.fn.date', t => {
  t.is(fiona(1).date(), '1967-07-02')
  t.is(fiona(1).date('1980-01-01'), '1989-03-02')
  t.is(fiona(1).date('1980-01-01', '1981-03-22'), '1980-07-23')
})

test('fiona.fn.date (full)', t => {
  t.is(fiona(1).date(null, null, true), '1967-07-02T08:36:23.791Z')
})
