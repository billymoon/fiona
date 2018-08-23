/* global test expect describe */

const fiona = require('./fiona')

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

  test('json method should accept indentation argument', () => {
    const fixture = `{\n  "a": 1,\n  "b": 2\n}`
    const expected = seeded.json({ a: 1, b: 2 }, null, 2)
    expect(expected).toBe(fixture)
  })
})
