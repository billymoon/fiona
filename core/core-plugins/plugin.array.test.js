/* global test expect describe */

const fiona = require('..')

const fixtures = [
  923436,
  991546,
  100070,
  247407,
  240368
]

describe('plugin.array', () => {
  let seeded

  beforeEach(() => {
    seeded = fiona('moon')
  })

  test('returns array', () => {
    expect(seeded.array(5, 1)).toEqual([1, 1, 1, 1, 1])
  })

  test('recurses array', () => {
    expect(seeded.array(5, ({ seeded }) => seeded.number())).toEqual(fixtures)
  })

  test('recurses array with bar fiona.plugin syntax', () => {
    expect(seeded.array(5, fiona.number)).toEqual(fixtures)
  })

  test('accepts max/min arguments', () => {
    expect(seeded.array({ min: 2, max: 4 }, fiona.number)).toEqual(fixtures.slice(0, 3))
  })

  test('uses passed processor', () => {
    expect(seeded.array(5, fiona.number, i => i.map(j => j / 100) )).toEqual(fixtures.map(j => j / 100))
  })

  test('joins array if passed string as processor', () => {
    expect(seeded.array(5, fiona.number, ':')).toEqual(fixtures.join(':'))
  })
})