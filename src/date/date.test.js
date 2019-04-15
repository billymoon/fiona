/* global test expect */
const requireEsm = lib => require('esm')(module)(lib).default

const Fiona = requireEsm('../core')
Fiona.register(['date', requireEsm('./date')])

test('Fiona.Date', () => {
  expect(Fiona(1).date()).toBe('1967-07-02')
  expect(Fiona(1).date({ min: '1980-01-01' })).toBe('1989-03-02')
  expect(Fiona(1).date({ min: '1980-01-01', max: '1981-03-22' })).toBe(
    '1980-07-23'
  )
})

test('Fiona.Date (long)', () => {
  expect(Fiona(1).date({ long: true })).toBe('1967-07-02T08:36:23.791Z')
})

test('Fiona.Date (throws when min > max)', () => {
  expect(() =>
    Fiona(1).date({ min: '1980-01-01', max: '1979-01-01' })
  ).toThrow()
})
