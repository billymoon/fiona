import test from 'ava'
import Moon from './index.js'

const stateMock = {}
const resetMock = {}
const randomMock = {}
const distributionMock = {}

let PrngMock
let moon

test.beforeEach(() => {
  PrngMock = () => ({
    state: stateMock,
    reset: resetMock,
    random: randomMock,
    distribution: distributionMock
  })

  moon = new Moon(0, PrngMock)
})

test('attaches member functions from passed Prng', t => {
  t.is(moon.distribution, distributionMock)
  t.is(moon.random, randomMock)
  t.is(moon.reset, resetMock)
  t.is(moon.state, stateMock)
})

test('info returns original initseed', t => {
  t.is(moon.info().initseed, 0)
})

test('returns instance of Moon', t => {
  t.is(moon instanceof Moon, true)
})

test('sets up self referential prototype constructor', t => {
  t.is(Moon.prototype.constructor, Moon)
  t.is(moon.constructor, Moon)
})

test('info returns generated initseed when none passed as argument', t => {
  const initseed = new Moon(undefined, PrngMock).info().initseed
  t.is(initseed > 0, true)
  t.is(initseed < 1e8, true)
  t.is(initseed % 1, 0)
})
