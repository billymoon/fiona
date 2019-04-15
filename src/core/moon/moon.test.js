/* global test expect describe beforeEach */
const requireEsm = lib => require('esm')(module)(lib).default

const Moon = requireEsm('./index.js')

describe('Moon constructor', () => {
  const stateMock = {}
  const resetMock = {}
  const randomMock = {}
  const distributionMock = {}

  let PrngMock
  let moon

  beforeEach(() => {
    PrngMock = () => ({
      state: stateMock,
      reset: resetMock,
      random: randomMock,
      distribution: distributionMock
    })

    moon = new Moon(0, PrngMock)
  })

  test('attaches member functions from passed Prng', () => {
    expect(moon.distribution).toBe(distributionMock)
    expect(moon.random).toBe(randomMock)
    expect(moon.reset).toBe(resetMock)
    expect(moon.state).toBe(stateMock)
  })

  test('info returns original initseed', () => {
    expect(moon.info().initseed).toBe(0)
  })

  test('returns instance of Moon', () => {
    expect(moon instanceof Moon).toBe(true)
  })

  test('sets up self referential prototype constructor', () => {
    expect(Moon.prototype.constructor).toBe(Moon)
    expect(moon.constructor).toBe(Moon)
  })

  test('info returns generated initseed when none passed as argument', () => {
    const initseed = new Moon(undefined, PrngMock).info().initseed
    expect(initseed > 0).toBe(true)
    expect(initseed < 1e8).toBe(true)
    expect(initseed % 1).toBe(0)
  })
})
