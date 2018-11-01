/* global test expect describe */

const fiona = require('../..')

const fixtures = [
  512979,
  432056,
  247403
]

describe('number', () => {
  let seeded

  beforeEach(() => {
    seeded = fiona('moon')
  })

  test('plugin can be called as method on fiona', () => {
    expect(seeded.number()).toBe(fixtures[0])
    expect(seeded.number()).toBe(fixtures[1])
    expect(seeded.number()).toBe(fixtures[2])
  })

  test('plugin can be called as method on fiona', () => {
    expect(fiona.number()(seeded)).toBe(fixtures[0])
    expect(fiona.number()(seeded)).toBe(fixtures[1])
    expect(fiona.number()(seeded)).toBe(fixtures[2])
  })

  test('plugin to give expected outputs with arguments set', () => {
    expect(fiona('moon').number()).toBe(fixtures[0])
    expect(fiona('moon').number({ min: 500000 })).toBe(756490)
    expect(fiona('moon').number({ min: 500000, precision: 3 })).toBe(756490.155)
    expect(fiona('moon').number({ min: 500000, precision: -3 })).toBe(756000)
    expect(fiona('moon').number({ min: 500000, precision: null })).toBe(756490)
    expect(fiona('moon').number({ max: 100 })).toBe(51)
    expect(fiona('moon').number({ min: 90, max: 100 })).toBe(95)
  })
})
