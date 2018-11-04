/* global test expect describe */

const fiona = require('../..')

// TODO: test passing multiple arguments and executing functions to resolve objects
describe('object', () => {
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
    const expected = JSON.stringify(seeded.object({ a: seeded => seeded.random() }))
    const fixture = `{"a":0.7904736091338441}`
    expect(expected).toBe(fixture)
  })

  test('should handle functions with recursion', () => {
    const expected = JSON.stringify(seeded.object({ a: () => seeded => seeded.random() }))
    const fixture = `{"a":0.7904736091338441}`
    expect(expected).toBe(fixture)
  })

  test('should handle deeply nested object with function property', () => {
    const expected = JSON.stringify(seeded.object({ a: { b: seeded => seeded.random() } }))
    const fixture = `{"a":{"b":0.530906858169896}}`
    expect(expected).toBe(fixture)
  })

  // TODO: can we provide position another way..?
  // test('should call function with current position', () => {
  //   const expected = JSON.stringify(seeded.object({ a: ({ position }) => position }))
  //   const fixture = `{"a":"root.a"}`
  //   expect(expected).toBe(fixture)
  // })

  // test('should call function with current position with recursion', () => {
  //   const expected = JSON.stringify(seeded.object({ a: ({ position }) => position }))
  //   const fixture = `{"a":"root.a"}`
  //   expect(expected).toBe(fixture)
  // })

  // test('should call function with current position on deeply nested object', () => {
  //   const expected = JSON.stringify(seeded.object({ a: { b: ({ position }) => position } }))
  //   const fixture = `{"a":{"b":"root.a.b"}}`
  //   expect(expected).toBe(fixture)
  // })

  test('should throw when non object passed', () => {
    [[], /a/, () => {}, 1, true, false, ''].forEach(item => {
      expect(() => {
        seeded.object(item)
      }).toThrow('arguments of fiona.Object must be an Object or function that returns an Object')
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
        () => () => fiona.Random,
        {
          b: () => [
            'b0',
            'b1',
            'b2',
            () => 'b3',
            () => fiona.Random
          ]
        },
        [
          6,
          7,
          () => fiona.Random
        ]
      ]
    }))
    const fixture = `{"a":[0,1,null,3,0.8738715024077667,{"b":["b0","b1","b2","b3",0.82669865890718]},[6,7,0.24771976435916487]]}`
    expect(expected).toBe(fixture)
  })

  test('should execute plugins defined as fiona.MyPlugin()', () => {
    const expected = JSON.stringify(seeded.object({ a: fiona.Random() }))
    const fixture = `{"a":0.7904736091338441}`
    expect(expected).toBe(fixture)
  })

  test('should execute plugins defined as fiona.MyPlugin', () => {
    const expected = JSON.stringify(seeded.object({ a: fiona.Random }))
    const fixture = `{"a":0.7904736091338441}`
    expect(expected).toBe(fixture)
  })

  test('should execute plugins defined as fiona.MyPlugin', () => {
    const expected = JSON.stringify(seeded.object({ a: fiona.Number }))
    const fixture = `{"a":790474}`
    expect(expected).toBe(fixture)
  })

  test('should execute plugins defined as fiona.MyPlugin({ argument: 1 })', () => {
    const expected = JSON.stringify(seeded.object({ a: fiona.Number({ precision: -3 }) }))
    const fixture = `{"a":790000}`
    expect(expected).toBe(fixture)
  })

  // test('should call functions with parent seeded instance', () => {
  //   const expected = JSON.stringify(seeded.object({ a: ({ parent, seeded }) => [parent.info().initseed, seeded.info().initseed, seeded.object({ b: ({ parent, seeded })  => [parent.info().initseed, seeded.info().initseed] })] }))
  //   const fixture = `{"a":790000}`
  //   expect(expected).toBe(fixture)
  // })
})
