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
      'a 0.9234358602778222 c'
    )
  })

  test('plugin produces same variables as array', () => {
    const output = seeded.string`${seeded => seeded.random()}:${seeded =>
      seeded.random()}:${seeded => seeded.random()}:${seeded =>
      seeded.random()}`
    const fixture = seeded
      .object([
        seeded => seeded.random(),
        seeded => seeded.random(),
        seeded => seeded.random(),
        seeded => seeded.random()
      ])
      .join(':')
    expect(output).toBe(fixture)
  })

  test('plugin can be called as method on Fiona', () => {
    expect(seeded.string`a ${() => `b`} c ${() => `d`} e`).toBe('a b c d e')
  })
})
