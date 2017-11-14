const fiona = require('../src/fiona')
require('./fiona.date')
const t = require('../ava-to-jest-hack')

test('fiona.fn.date', () => {
  t.is(fiona(1).date(), '1967-07-02')
  t.is(fiona(1).date({ min: '1980-01-01' }), '1989-03-02')
  t.is(fiona(1).date({ min: '1980-01-01', max: '1981-03-22' }), '1980-07-23')
})

test('fiona.fn.date (long)', () => {
  t.is(fiona(1).date({ long: true }), '1967-07-02T08:36:23.791Z')
})

test('fiona.fn.date (throws when min > max)', () => {
  expect(() => fiona(1).date({ min: '1980-01-01', max: '1979-01-01' })).toThrow()
})

