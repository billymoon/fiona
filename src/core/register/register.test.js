/* global test expect describe beforeEach */

const Fiona = require('..')

describe('Fiona.register', () => {
  let seeded

  beforeEach(() => {
    seeded = Fiona('moon')
  })

  test('accepts named function as extension', () => {
    const zeroHundred = seeded => Math.round(seeded.random() * 100)
    Fiona.register(zeroHundred)
    expect(seeded.zeroHundred()).toBe(51)
  })

  test('accepts multiple named functions as extensions', () => {
    const zeroHundred = seeded => Math.round(seeded.random() * 100)
    const zeroTwoHundred = seeded => Math.round(seeded.random() * 100)
    Fiona.register(zeroHundred, zeroTwoHundred)
    expect(seeded.zeroHundred()).toBe(51)
    expect(seeded.zeroTwoHundred()).toBe(43)
  })

  test('accepts name and function as extension', () => {
    Fiona.register(['zeroHundred', seeded => Math.round(seeded.random() * 100)])
    expect(seeded.zeroHundred()).toBe(51)
  })

  test('extension can be called as method on Fiona', () => {
    const zeroHundred = seeded => Math.round(seeded.random() * 100)
    Fiona.register(zeroHundred)
    expect(Fiona.ZeroHundred()(seeded)).toBe(51)
  })

  test('plugin can is called with no arguments with no brackets', () => {
    const zeroHundred = (seeded, arg) => typeof arg
    Fiona.register(zeroHundred)
    expect(seeded.object({ a: Fiona.ZeroHundred })).toEqual({ a: 'undefined' })
  })

  test('extension can is called with no arguments with no brackets in string', () => {
    const zeroHundred = (seeded, arg) => typeof arg
    Fiona.register(zeroHundred)
    expect(seeded.string`number ${Fiona.ZeroHundred}`).toEqual(
      `number undefined`
    )
  })

  test('extension can is called with passed arguments in string', () => {
    const zeroHundred = (seeded, arg) => typeof arg
    Fiona.register(zeroHundred)
    expect(seeded.string`number ${Fiona.ZeroHundred(1)}`).toEqual(
      `number number`
    )
  })
})
