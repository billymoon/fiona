/* global test expect */

const fiona = require('../core')
fiona.register(['date', require('./date')])

test('fiona.Date', () => {
  expect(fiona(1).date()).toBe('1967-07-02')
  expect(fiona(1).date({ min: '1980-01-01' })).toBe('1989-03-02')
  expect(fiona(1).date({ min: '1980-01-01', max: '1981-03-22' })).toBe('1980-07-23')
})

test('fiona.Date (long)', () => {
  expect(fiona(1).date({ long: true })).toBe('1967-07-02T08:36:23.791Z')
})

test('fiona.Date (throws when min > max)', () => {
  expect(() => fiona(1).date({ min: '1980-01-01', max: '1979-01-01' })).toThrow()
})
