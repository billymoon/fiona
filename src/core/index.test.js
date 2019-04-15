/* global test expect describe beforeEach */
const requireEsm = lib => require('esm')(module)(lib).default

// TODO: move tests closer to relevant source code
const index = requireEsm('.')
const Fiona = requireEsm('..')

const fixtures = [0.5129792850990683, 0.4320565277859832, 0.2474033479799532]

describe('sanity', () => {
  test('javascript is javascript', () => {
    expect(true + true).toBe(2)
  })
})

describe('exports Fiona', () => {
  test('index exports Fiona', () => {
    expect(index).toBe(Fiona)
  })
})

describe('core', () => {
  let seeded

  beforeEach(() => {
    seeded = Fiona('moon')
  })

  describe('seeded.info', () => {
    test('reports initseed', () => {
      expect(seeded.info().initseed).toBe('moon')
      const seeded2 = Fiona(1)
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
      expect(Fiona().info().initseed).toBe(12345678)
      Math.random = MathRandom
    })

    test('returns expected floats in order when called as Fiona.Random', () => {
      expect(Fiona.Random()(seeded)).toBe(fixtures[0])
      expect(Fiona.Random()(seeded)).toBe(fixtures[1])
      expect(Fiona.Random()(seeded)).toBe(fixtures[2])
    })
  })

  describe('seeded.reverse', () => {
    test('returns expected floats in order', () => {
      seeded.random()
      seeded.random()
      seeded.random()
      seeded.random()
      expect(seeded.reverse()).toBe(fixtures[2])
      expect(seeded.reverse()).toBe(fixtures[1])
      expect(seeded.reverse()).toBe(fixtures[0])
    })
  })

  describe('seeded.reverse (repeat values)', () => {
    test('repeat previous value by calling reverse', () => {
      const name1 = seeded.fullname()
      seeded.reverse()
      seeded.reverse()
      seeded.reverse()
      seeded.reverse()
      seeded.reverse()
      const name2 = seeded.fullname()
      expect(name1).toBe(name2)
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
      expect(seeded.state()).toEqual([
        9114374722873036,
        1080754632633531,
        7193642159548421,
        7191889941316046
      ])
      seeded.random()
      expect(seeded.state()).toEqual([
        1080754632633531,
        7193642159548421,
        7191889941316046,
        1101614626
      ])
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
})
