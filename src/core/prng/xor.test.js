/* global test expect describe beforeEach */

const xor = require('./xor')

const fixtures = {
  stateInitial: [
    2784201997697448,
    2134104996050757,
    8286235680936945,
    3089905606158966
  ],
  stateCalledOnce: [
    2134104996050757,
    8286235680936945,
    3089905606158966,
    1326358046
  ],
  stateCalledTwice: [8286235680936945, 3089905606158966, 1326358046, 621986149],
  stateCalledThrice: [3089905606158966, 1326358046, 621986149, 1968173],
  resultCalledOnce: 0.6176335954189457,
  resultCalledTwice: 0.28963487096579504,
  resultCalledThrice: 0.0009165019732511146
}

describe('xor', () => {
  let prng

  beforeEach(() => {
    prng = xor(0)
  })

  test('random', () => {
    const { random } = prng
    expect(random()).toBe(fixtures.resultCalledOnce)
    expect(random()).toBe(fixtures.resultCalledTwice)
    expect(random()).toBe(fixtures.resultCalledThrice)
  })

  test('reseed', () => {
    const { reseed, random } = prng
    expect(random()).toBe(fixtures.resultCalledOnce)
    expect(random()).toBe(fixtures.resultCalledTwice)
    expect(random()).toBe(fixtures.resultCalledThrice)
    reseed(0)
    expect(random()).toBe(fixtures.resultCalledOnce)
    expect(random()).toBe(fixtures.resultCalledTwice)
    expect(random()).toBe(fixtures.resultCalledThrice)
  })

  test('getState', () => {
    const { getState, random } = prng
    expect(getState()).toEqual(fixtures.stateInitial)
    random()
    expect(getState()).toEqual(fixtures.stateCalledOnce)
    random()
    expect(getState()).toEqual(fixtures.stateCalledTwice)
    random()
    expect(getState()).toEqual(fixtures.stateCalledThrice)
  })

  test('setState', () => {
    const { setState, random } = prng

    expect(random()).toBe(fixtures.resultCalledOnce)
    expect(random()).toBe(fixtures.resultCalledTwice)
    expect(random()).toBe(fixtures.resultCalledThrice)

    setState(fixtures.stateInitial)
    expect(random()).toBe(fixtures.resultCalledOnce)
    expect(random()).toBe(fixtures.resultCalledTwice)
    expect(random()).toBe(fixtures.resultCalledThrice)

    setState(fixtures.stateCalledOnce)
    expect(random()).toBe(fixtures.resultCalledTwice)
    expect(random()).toBe(fixtures.resultCalledThrice)

    setState(fixtures.stateCalledTwice)
    expect(random()).toBe(fixtures.resultCalledThrice)

    setState(fixtures.stateCalledOnce)
    expect(random()).toBe(fixtures.resultCalledTwice)
    expect(random()).toBe(fixtures.resultCalledThrice)
  })
})
