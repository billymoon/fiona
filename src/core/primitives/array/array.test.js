/* global test expect describe */

const Fiona = require('../..')

const fixtures = [923436, 991546, 100070, 247407, 240368]

describe('array', () => {
  let seeded

  beforeEach(() => {
    seeded = Fiona('moon')
  })

  test('returns array', () => {
    expect(seeded.array(5, 1)).toEqual([1, 1, 1, 1, 1])
  })

  test('recurses array', () => {
    expect(seeded.array(5, seeded => seeded.number())).toEqual(fixtures)
  })

  test('recurses array with bar Fiona.Plugin syntax', () => {
    expect(seeded.array(5, Fiona.Number)).toEqual(fixtures)
  })

  test('accepts max/min arguments', () => {
    expect(seeded.array({ min: 2, max: 4 }, Fiona.Number)).toEqual(
      fixtures.slice(0, 3)
    )
  })

  test('uses passed processor', () => {
    expect(seeded.array(5, Fiona.Number, i => i.map(j => j / 100))).toEqual(
      fixtures.map(j => j / 100)
    )
  })

  test('joins array if passed string as processor', () => {
    expect(seeded.array(5, Fiona.Number, ':')).toEqual(fixtures.join(':'))
  })
})
