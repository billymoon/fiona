import test from 'ava'
import fiona from '../fiona.js'

test('fiona.fn.date', t => {
  t.is(fiona(1).date(), '1967-07-02')
  t.is(fiona(1).date({ min: '1980-01-01' }), '1989-03-02')
  t.is(fiona(1).date({ min: '1980-01-01', max: '1981-03-22' }), '1980-07-23')
})

test('fiona.fn.date (long)', t => {
  t.is(fiona(1).date({ long: true }), '1967-07-02T08:36:23.791Z')
})
