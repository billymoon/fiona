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

  test('reverse', () => {
    const { random, reverse } = prng
    expect(random()).toBe(fixtures.resultCalledOnce)
    expect(random()).toBe(fixtures.resultCalledTwice)
    expect(random()).toBe(fixtures.resultCalledThrice)
    expect(reverse()).toBe(fixtures.resultCalledTwice)
    expect(reverse()).toBe(fixtures.resultCalledOnce)
    expect(random()).toBe(fixtures.resultCalledTwice)
    expect(reverse()).toBe(fixtures.resultCalledOnce)
    expect(random()).toBe(fixtures.resultCalledTwice)
    expect(random()).toBe(fixtures.resultCalledThrice)
  })

  test('reverse in loop', () => {
    // TODO: generate long random chain then reverse back through it
    for (let seed = 1e3; seed--; ) {
      const { random, reverse } = xor(seed)
      const [once, twice, thrice] = [random(), random(), random()]
      expect(reverse()).toBe(twice)
      expect(reverse()).toBe(once)
    }
  })

  test('reverse from state', () => {
    // TODO: understand why state is different (but similar) stepping back
    // but produces same result and state stepping forward
    const { getState, setState, random, reverse } = prng
    setState(fixtures.stateCalledThrice)
    expect(reverse()).toBe(fixtures.resultCalledTwice)
    const stateAfterStepBack = getState()
    expect(random()).toBe(fixtures.resultCalledThrice)
    expect(getState()).toEqual(fixtures.stateCalledThrice)
    setState(fixtures.stateCalledTwice)
    expect(random()).toBe(fixtures.resultCalledThrice)
    setState(stateAfterStepBack)
    expect(random()).toBe(fixtures.resultCalledThrice)
    expect(stateAfterStepBack.slice(1)).toEqual(
      fixtures.stateCalledTwice.slice(1)
    )
    expect(stateAfterStepBack.slice(0, 1)).not.toEqual(
      fixtures.stateCalledTwice.slice(0, 1)
    )
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
