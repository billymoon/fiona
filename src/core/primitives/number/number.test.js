/* global test expect describe */

const Fiona = require('../..')

const fixtures = [
  512979,
  432056,
  247403
]

describe('number', () => {
  let seeded

  beforeEach(() => {
    seeded = Fiona('moon')
  })

  test('plugin can be called as method on Fiona', () => {
    expect(seeded.number()).toBe(fixtures[0])
    expect(seeded.number()).toBe(fixtures[1])
    expect(seeded.number()).toBe(fixtures[2])
  })

  test('plugin can be called as method on Fiona', () => {
    expect(Fiona.Number()(seeded)).toBe(fixtures[0])
    expect(Fiona.Number()(seeded)).toBe(fixtures[1])
    expect(Fiona.Number()(seeded)).toBe(fixtures[2])
  })

  test('plugin to give expected outputs with arguments set', () => {
    expect(Fiona('moon').number()).toBe(fixtures[0])
    expect(Fiona('moon').number({ min: 500000 })).toBe(756490)
    expect(Fiona('moon').number({ min: 500000, precision: 3 })).toBe(756490.155)
    expect(Fiona('moon').number({ min: 500000, precision: -3 })).toBe(756000)
    expect(Fiona('moon').number({ min: 500000, precision: null })).toBe(756490)
    expect(Fiona('moon').number({ max: 100 })).toBe(51)
    expect(Fiona('moon').number({ min: 90, max: 100 })).toBe(95)
  })
})
