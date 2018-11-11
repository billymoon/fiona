/* global test expect describe */

const Fiona = require('../..')

describe('string', () => {
  let seeded

  beforeEach(() => {
    seeded = Fiona('moon')
  })

  test('plugin can be called as method on Fiona', () => {
    expect(seeded.string`a`).toBe('a')
  })

  test('plugin can be called as method on Fiona', () => {
    expect(seeded.string`a ${'b'} c`).toBe('a b c')
  })

  test('plugin can be called as method on Fiona', () => {
    expect(seeded.string`a ${seeded => seeded.random()} c`).toBe(
      'a 0.9915455756669611 c'
    )
  })

  test('plugin can be called as method on Fiona', () => {
    expect(seeded.string`a ${() => `b`} c ${() => `d`} e`).toBe('a b c d e')
  })
})
