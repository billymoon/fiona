/* global test expect describe */

const fiona = require('..')

describe('plugin.object', () => {
  let seeded

  beforeEach(() => {
    seeded = fiona('moon')
  })

  test('should return object', () => {
    expect(typeof seeded.object({})).toBe('object')
  })

  test('should return nested object', () => {
    const expected = JSON.stringify(seeded.object({ a: { b: 1 }}))
    const fixture = `{"a":{"b":1}}`
    expect(expected).toBe(fixture)
  })

  test('should return handled function', () => {
    const expected = JSON.stringify(seeded.object({ a: () => 1}))
    const fixture = `{"a":1}`
    expect(expected).toBe(fixture)
  })

  test('should return handled function with seeded value', () => {
    const expected = JSON.stringify(seeded.object({ a: ({ seeded }) => seeded.random() }))
    const fixture = `{"a":0.7904736091338441}`
    expect(expected).toBe(fixture)
  })

  test('should handle functions with recursion', () => {
    const expected = JSON.stringify(seeded.object({ a: () => ({ seeded }) => seeded.random() }))
    const fixture = `{"a":0.7904736091338441}`
    expect(expected).toBe(fixture)
  })

  test('should handle deeply nested object with function property', () => {
    const expected = JSON.stringify(seeded.object({ a: { b: ({ seeded }) => seeded.random() } }))
    const fixture = `{"a":{"b":0.530906858169896}}`
    expect(expected).toBe(fixture)
  })

  test('should call function with current position', () => {
    const expected = JSON.stringify(seeded.object({ a: ({ pos }) => pos }))
    const fixture = `{"a":"root.a"}`
    expect(expected).toBe(fixture)
  })

  test('should call function with current position with recursion', () => {
    const expected = JSON.stringify(seeded.object({ a: ({ pos }) => pos }))
    const fixture = `{"a":"root.a"}`
    expect(expected).toBe(fixture)
  })

  test('should call function with current position on deeply nested object', () => {
    const expected = JSON.stringify(seeded.object({ a: { b: ({ pos }) => pos } }))
    const fixture = `{"a":{"b":"root.a.b"}}`
    expect(expected).toBe(fixture)
  })

  test('should throw when non object passed', () => {
    [[], /a/, () => {}, 1, true, false, ''].forEach(item => {
      expect(() => {
        seeded.object(item)
      }).toThrow('first argument of fiona.object must be an Object')
    })
  })

  test('should handle array', () => {
    const expected = JSON.stringify(seeded.object({ a: [1, 2, 3] }))
    const fixture = `{"a":[1,2,3]}`
    expect(expected).toBe(fixture)
  })

  test('should handle array with undefined values', () => {
    const expected = JSON.stringify(seeded.object({ a: [1, undefined, 3] }))
    const fixture = `{"a":[1,null,3]}`
    expect(expected).toBe(fixture)
  })

  test('should handle complex nested objects with arrays and functions', () => {
    const expected = JSON.stringify(seeded.object({
      a: () => [
        0,
        1,
        undefined,
        3,
        () => ({ pos }) => pos,
        {
          b: () => [
            'b0',
            'b1',
            'b2',
            () => 'b3',
            ({ pos }) => pos
          ]
        },
        [
          6,
          7,
          ({ pos }) => pos
        ]
      ]
    }))
    const fixture = `{"a":[0,1,null,3,"root.a[4]",{"b":["b0","b1","b2","b3","root.a[5].b[4]"]},[6,7,"root.a[6][2]"]]}`
    expect(expected).toBe(fixture)
  })

  test('should execute plugins defined as fiona.myPlugin()', () => {
    const expected = JSON.stringify(seeded.object({ a: fiona.random() }))
    const fixture = `{"a":0.7904736091338441}`
    expect(expected).toBe(fixture)
  })

  test('should execute plugins defined as fiona.myPlugin', () => {
    const expected = JSON.stringify(seeded.object({ a: fiona.random }))
    const fixture = `{"a":0.7904736091338441}`
    expect(expected).toBe(fixture)
  })

  test('should execute plugins defined as fiona.myPlugin', () => {
    const expected = JSON.stringify(seeded.object({ a: fiona.number }))
    const fixture = `{"a":790474}`
    expect(expected).toBe(fixture)
  })

  test('should execute plugins defined as fiona.myPlugin({ argument: 1 })', () => {
    const expected = JSON.stringify(seeded.object({ a: fiona.number({ precision: -3 }) }))
    const fixture = `{"a":790000}`
    expect(expected).toBe(fixture)
  })
})
