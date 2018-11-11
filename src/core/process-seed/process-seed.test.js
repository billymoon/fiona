/* global test expect describe beforeEach */

const processSeed = require('./')

describe('process-seed', () => {
  test('process-seed passes number back', () => {
    expect(processSeed(1)).toBe(1)
    expect(processSeed(1e6)).toBe(1e6)
    expect(processSeed(1e32)).toBe(1e32)
  })

  test('process-seed converts string to integer', () => {
    expect(processSeed('1')).toBe(49)
    expect(processSeed('2')).toBe(50)
    expect(processSeed('abc')).toBe(2423384358)
    expect(processSeed('abcdefghijklmnopqrstuvwxyz')).toBe(-261981256238)
    expect(processSeed('moon')).toBe(-16743999484)
  })
})
