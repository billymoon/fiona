/* global test expect describe */

const fiona = require('..')

describe('plugin.string', () => {
  let seeded

  beforeEach(() => {
    seeded = fiona('moon')
  })

  test('plugin can be called as method on fiona', () => {
    expect(seeded.string`a`).toBe('a')
  })

  test('plugin can be called as method on fiona', () => {
    expect(seeded.string`a ${'b'} c`).toBe('a b c')
  })

  test('plugin can be called as method on fiona', () => {
    expect(seeded.string`a ${({ seeded }) => seeded.random()} c`).toBe('a 0.8966942317302777 c')
  })

  test('plugin can be called as method on fiona', () => {
    expect(seeded.string`a ${({ pos }) => pos} c ${({ pos }) => pos} d`).toBe('a root.string[1] c root.string[3] d')
  })
})
