import test from 'ava'
import Fiona from '../core/index.js'
import date from './date.js'

Fiona.register(['date', date])

test('Fiona.Date', t => {
  t.is(Fiona(1).date(), '1967-07-02')
  t.is(Fiona(1).date({ min: '1980-01-01' }), '1989-03-02')
  t.is(Fiona(1).date({ min: '1980-01-01', max: '1981-03-22' }), '1980-07-23')
})

test('Fiona.Date (long)', t => {
  t.is(Fiona(1).date({ long: true }), '1967-07-02T08:36:23.791Z')
})

test('Fiona.Date (throws when min > max)', t => {
  t.throws(() => Fiona(1).date({ min: '1980-01-01', max: '1979-01-01' }))
})
