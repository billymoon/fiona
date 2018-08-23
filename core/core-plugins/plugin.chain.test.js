/* global test expect describe */

const fiona = require('..')

describe('plugin.chain', () => {
  let seeded

  beforeEach(() => {
    seeded = fiona('moon')
  })

  test('should return seeded instance', () => {
    expect(seeded.chain({})).toBe(seeded)
  })

  test('should set value on seeded instance', () => {
    expect(seeded.value).toBe(undefined)
    seeded.chain({})
    expect(typeof seeded.value).toBe('object')
  })

  test('should set value on seeded instance to be like passed object', () => {
    seeded.chain({ a: 1 })
    const fixture = `{"a":1}`
    const expected = JSON.stringify(seeded.value)
    expect(expected).toBe(fixture)
  })

  test('should set value on seeded instance to be recursed object', () => {
    seeded.chain({ a: fiona.number })
    const fixture = `{"a":790474}`
    const expected = JSON.stringify(seeded.value)
    expect(expected).toBe(fixture)
  })

  test('should chain values', () => {
    seeded.chain({ a: 'will be overwritten' })
    seeded.chain({ a: fiona.number })
    seeded.chain({ b: fiona.number })
    const fixture = `{"a":790474,"b":566216}`
    const expected = JSON.stringify(seeded.value)
    expect(expected).toBe(fixture)
  })

  // test('should add json method which returns json of seeded.value', () => {
  //   expect(seeded.json).toBe(undefined)
  //   seeded.chain({ a: 1 }).chain({ b: 2 })
  //   const fixture = `{"a":1,"b":2}`
  //   const expected = seeded.json()
  //   expect(expected).toBe(fixture)
  // })

  // test('json method should accept indentation argument', () => {
  //   const fixture = `{\n  "a": 1,\n  "b": 2\n}`
  //   const expected = seeded.chain({ a: 1 }).chain({ b: 2 }).json(2)
  //   expect(expected).toBe(fixture)
  // })
})
