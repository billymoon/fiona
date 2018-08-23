/* global test expect describe */

// TODO: move tests closer to relevant source code
const index = require('.')
const fiona = require('./fiona')

const fixtures = [
  0.5129792850990683,
  0.4320565277859832,
  0.2474033479799532
]

describe('sanity', () => {
  test('javascript is javascript', () => {
    expect(true + true).toBe(2)
  })
})

describe('exports fiona', () => {
  test('index exports fiona', () => {
    expect(index).toBe(fiona)
  })
})

describe('core', () => {
  let seeded

  beforeEach(() => {
    seeded = fiona('moon')
  })

  describe('seeded.info', () => {
    test('reports initseed', () => {
      expect(seeded.info().initseed).toBe('moon')
      const seeded2 = fiona(1)
      expect(seeded2.info().initseed).toBe(1)
    })
  })

  describe('seeded.random', () => {
    test('returns expected floats in order', () => {
      expect(seeded.random()).toBe(fixtures[0])
      expect(seeded.random()).toBe(fixtures[1])
      expect(seeded.random()).toBe(fixtures[2])
    })

    test('returns expected floats in order', () => {
      const MathRandom = Math.random
      Math.random = () => 0.12345678
      expect(fiona().info().initseed).toBe(12345678)
      Math.random = MathRandom
    })

    test('returns expected floats in order when called as fiona.random', () => {
      expect(fiona.random()({ seeded })).toBe(fixtures[0])
      expect(fiona.random()({ seeded })).toBe(fixtures[1])
      expect(fiona.random()({ seeded })).toBe(fixtures[2])
    })
  })

  describe('seeded.reset', () => {
    test('to return state to original', () => {
      expect(seeded.random()).toBe(fixtures[0])
      expect(seeded.random()).toBe(fixtures[1])
      expect(seeded.random()).toBe(fixtures[2])
      seeded.reset()
      expect(seeded.random()).toBe(fixtures[0])
      expect(seeded.random()).toBe(fixtures[1])
      expect(seeded.random()).toBe(fixtures[2])
    })

    test('reset state to passed argument', () => {
      expect(seeded.random()).toBe(fixtures[0])
      expect(seeded.random()).toBe(fixtures[1])
      expect(seeded.random()).toBe(fixtures[2])
      seeded.reset(12345)
      expect(seeded.random()).toBe(0.9051722604339814)
      expect(seeded.random()).toBe(0.40475850524602386)
      expect(seeded.random()).toBe(0.934793325110708)
      seeded.reset(12345)
      expect(seeded.random()).toBe(0.9051722604339814)
      expect(seeded.random()).toBe(0.40475850524602386)
      expect(seeded.random()).toBe(0.934793325110708)
      seeded.reset()
      expect(seeded.random()).toBe(fixtures[0])
      expect(seeded.random()).toBe(fixtures[1])
      expect(seeded.random()).toBe(fixtures[2])
      seeded.reset('moon')
      expect(seeded.random()).toBe(fixtures[0])
      expect(seeded.random()).toBe(fixtures[1])
      expect(seeded.random()).toBe(fixtures[2])
    })
  })

  describe('seeded.clone', () => {
    test('should repeat results of cloned instance', () => {
      expect(seeded.random()).toBe(fixtures[0])
      const dolly = seeded.clone()
      expect(seeded.random()).toBe(fixtures[1])
      expect(seeded.random()).toBe(fixtures[2])
      expect(dolly.random()).toBe(fixtures[1])
      expect(dolly.random()).toBe(fixtures[2])
    })
  })

  describe('seeded.distribution', () => {
    test('should have inert default distribution function', () => {
      expect(typeof seeded.distribution).toBe('function')
      expect(seeded.distribution(1)).toBe(1)
      expect(seeded.distribution(0.12345)).toBe(0.12345)
      expect(seeded.distribution(1e6)).toBe(1e6)
      expect(seeded.distribution('awesome')).toBe('awesome')
    })

    test('should set distribution function', () => {
      expect(seeded.distribution(5)).toBe(5)
      seeded.distribution(i => i * i)
      expect(seeded.distribution(5)).toBe(25)
    })

    test('should reset distribution function', () => {
      expect(seeded.distribution(5)).toBe(5)
      seeded.distribution(i => i * i)
      expect(seeded.distribution(5)).toBe(25)
      seeded.distribution(null)
      expect(seeded.distribution(5)).toBe(5)
    })
  })

  describe('seeded.state', () => {
    test('seeded.state should return expected state', () => {
      expect(seeded.state()).toEqual([9114374722873036,1080754632633531,7193642159548421,7191889941316046])
      seeded.random()
      expect(seeded.state()).toEqual([1080754632633531,7193642159548421,7191889941316046,1101614626])
    })

    test('seeded.state should reset state to passed argument', () => {
      expect(seeded.random()).toBe(fixtures[0])
      const state = seeded.state()
      expect(seeded.random()).toBe(fixtures[1])
      expect(seeded.random()).toBe(fixtures[2])
      seeded.state(state)
      expect(seeded.random()).toBe(fixtures[1])
      expect(seeded.random()).toBe(fixtures[2])
    })

    test('seeded.state should reset state initial when passed null', () => {
      expect(seeded.random()).toBe(fixtures[0])
      expect(seeded.random()).toBe(fixtures[1])
      expect(seeded.random()).toBe(fixtures[2])
      seeded.state(null)
      expect(seeded.random()).toBe(fixtures[0])
      expect(seeded.random()).toBe(fixtures[1])
      expect(seeded.random()).toBe(fixtures[2])
    })
  })

  describe('fiona.plugin', () => {
    test('accepts named function as plugin', () => {
      const zeroHundred = ({ seeded }) => Math.round(seeded.random() * 100)
      fiona.register(zeroHundred)
      expect(seeded.zeroHundred()).toBe(51)
    })

    test('accepts multiple named functions as plugins', () => {
      const zeroHundred = ({ seeded }) => Math.round(seeded.random() * 100)
      const zeroTwoHundred = ({ seeded }) => Math.round(seeded.random() * 100)
      fiona.register(zeroHundred, zeroTwoHundred)
      expect(seeded.zeroHundred()).toBe(51)
      expect(seeded.zeroTwoHundred()).toBe(43)
    })

    test('accepts name and function as plugin', () => {
      fiona.register(['zeroHundred', ({ seeded }) => Math.round(seeded.random() * 100)])
      expect(seeded.zeroHundred()).toBe(51)
    })

    test('plugin can be called as method on fiona', () => {
      const zeroHundred = ({ seeded }) => Math.round(seeded.random() * 100)
      fiona.register(zeroHundred)
      expect(fiona.zeroHundred()({ seeded })).toBe(51)
    })

    test('plugin can is called with no arguments with no brackets', () => {
      const zeroHundred = ({ seeded }, arg) => typeof arg
      fiona.register(zeroHundred)
      expect(seeded.object({ a: fiona.zeroHundred })).toEqual({ a: 'undefined' })
    })

    test('plugin can is called with no arguments with no brackets in string', () => {
      const zeroHundred = ({ seeded }, arg) => typeof arg
      fiona.register(zeroHundred)
      expect(seeded.string`number ${fiona.zeroHundred}`).toEqual(`number undefined`)
    })

    test('plugin can is called with passed arguments in string', () => {
      const zeroHundred = ({ seeded }, arg) => typeof arg
      fiona.register(zeroHundred)
      expect(seeded.string`number ${fiona.zeroHundred(1)}`).toEqual(`number number`)
    })
  })
})
