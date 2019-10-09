import test from 'ava'
import xor from './xor.js'

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

test('sanity', t => {
  t.is(true + true, 2)
})

test('random', t => {
  const prng = xor(0)
  const { random } = prng
  t.is(random(), fixtures.resultCalledOnce)
  t.is(random(), fixtures.resultCalledTwice)
  t.is(random(), fixtures.resultCalledThrice)
})

test('reverse', t => {
  const prng = xor(0)
  const { random, reverse } = prng
  t.is(random(), fixtures.resultCalledOnce)
  t.is(random(), fixtures.resultCalledTwice)
  t.is(random(), fixtures.resultCalledThrice)
  t.is(reverse(), fixtures.resultCalledTwice)
  t.is(reverse(), fixtures.resultCalledOnce)
  t.is(random(), fixtures.resultCalledTwice)
  t.is(reverse(), fixtures.resultCalledOnce)
  t.is(random(), fixtures.resultCalledTwice)
  t.is(random(), fixtures.resultCalledThrice)
})

test('reverseInLoop', t => {
  // TODO: generate long random chain then reverse back through it
  for (let seed = 1e3; seed--; ) {
    const { random, reverse } = xor(seed)
    const [once, twice, thrice] = [random(), random(), random()]
    t.is(reverse(), twice)
    t.is(reverse(), once)
  }
})

test('reverseFromState', t => {
  const prng = xor(0)
  // TODO: understand why state is different (but similar) stepping back
  // but produces same result and state stepping forward
  const { getState, setState, random, reverse } = prng
  setState(fixtures.stateCalledThrice)
  t.is(reverse(), fixtures.resultCalledTwice)
  const stateAfterStepBack = getState()
  t.is(random(), fixtures.resultCalledThrice)
  t.deepEqual(getState(), fixtures.stateCalledThrice)
  setState(fixtures.stateCalledTwice)
  t.is(random(), fixtures.resultCalledThrice)
  setState(stateAfterStepBack)
  t.is(random(), fixtures.resultCalledThrice)
  t.deepEqual(stateAfterStepBack.slice(1), fixtures.stateCalledTwice.slice(1))
  t.notDeepEqual(
    stateAfterStepBack.slice(0, 1),
    fixtures.stateCalledTwice.slice(0, 1)
  )
})

test('reseed', t => {
  const prng = xor(0)
  const { reseed, random } = prng
  t.is(random(), fixtures.resultCalledOnce)
  t.is(random(), fixtures.resultCalledTwice)
  t.is(random(), fixtures.resultCalledThrice)
  reseed(0)
  t.is(random(), fixtures.resultCalledOnce)
  t.is(random(), fixtures.resultCalledTwice)
  t.is(random(), fixtures.resultCalledThrice)
})

test('getState', t => {
  const prng = xor(0)
  const { getState, random } = prng
  t.deepEqual(getState(), fixtures.stateInitial)
  random()
  t.deepEqual(getState(), fixtures.stateCalledOnce)
  random()
  t.deepEqual(getState(), fixtures.stateCalledTwice)
  random()
  t.deepEqual(getState(), fixtures.stateCalledThrice)
})

test('setState', t => {
  const prng = xor(0)
  const { setState, random } = prng

  t.is(random(), fixtures.resultCalledOnce)
  t.is(random(), fixtures.resultCalledTwice)
  t.is(random(), fixtures.resultCalledThrice)

  setState(fixtures.stateInitial)
  t.is(random(), fixtures.resultCalledOnce)
  t.is(random(), fixtures.resultCalledTwice)
  t.is(random(), fixtures.resultCalledThrice)

  setState(fixtures.stateCalledOnce)
  t.is(random(), fixtures.resultCalledTwice)
  t.is(random(), fixtures.resultCalledThrice)

  setState(fixtures.stateCalledTwice)
  t.is(random(), fixtures.resultCalledThrice)

  setState(fixtures.stateCalledOnce)
  t.is(random(), fixtures.resultCalledTwice)
  t.is(random(), fixtures.resultCalledThrice)
})
