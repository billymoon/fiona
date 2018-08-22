/* global test expect describe */

const fiona = require('..')

// TODO: actually implement chain
describe('plugin.chain', () => {
  let seeded

  beforeEach(() => {
    seeded = fiona('moon')
  })

  test('should return seeded instance', () => {
    expect(seeded.chain()).toBe(seeded)
  })

  test('should set value on seeded instance', () => {
    expect(seeded.value).toBe(undefined)
    seeded.chain()
    expect(typeof seeded.value).toBe('object')
  })
})
