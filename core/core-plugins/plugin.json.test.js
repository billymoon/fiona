/* global test expect describe */

const fiona = require('..')

describe('plugin.chain', () => {
  let seeded

  beforeEach(() => {
    seeded = fiona('moon')
  })

  test('should add json method which returns json of seeded.value', () => {
    const fixture = `{"a":1,"b":2}`
    const expected = seeded.json({ a: 1, b: 2 })
    expect(expected).toBe(fixture)
  })
})
