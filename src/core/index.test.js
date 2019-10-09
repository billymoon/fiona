// TODO: move tests closer to relevant source code
import test from 'ava'
import Fiona from '..'
import index from './index.js'

const fixtures = [0.5129792850990683, 0.4320565277859832, 0.2474033479799532]

let seeded

test.beforeEach(t => {
  seeded = Fiona('moon')
})

test.serial('javascript is javascript', t => {
  t.is(true + true, 2)
})

test.serial('index exports Fiona', t => {
  t.is(index, Fiona)
})

test.serial('reports initseed', t => {
  t.is(seeded.info().initseed, 'moon')
  const seeded2 = Fiona(1)
  t.is(seeded2.info().initseed, 1)
})

test.serial('returns expected floats in order', t => {
  t.is(seeded.random(), fixtures[0])
  t.is(seeded.random(), fixtures[1])
  t.is(seeded.random(), fixtures[2])
})

test.serial('returns expected initseed from info method', t => {
  const MathRandom = Math.random
  Math.random = () => 0.12345678
  t.is(Fiona().info().initseed, 12345678)
  Math.random = MathRandom
})

test.serial(
  'returns expected floats in order when called as Fiona.Random',
  t => {
    t.is(Fiona.Random()(seeded), fixtures[0])
    t.is(Fiona.Random()(seeded), fixtures[1])
    t.is(Fiona.Random()(seeded), fixtures[2])
  }
)

test.serial('returns expected floats in reverse order', t => {
  seeded.random()
  seeded.random()
  seeded.random()
  seeded.random()
  t.is(seeded.reverse(), fixtures[2])
  t.is(seeded.reverse(), fixtures[1])
  t.is(seeded.reverse(), fixtures[0])
})

test.serial('repeat previous value by calling reverse', t => {
  const name1 = seeded.fullname()
  seeded.reverse()
  seeded.reverse()
  seeded.reverse()
  seeded.reverse()
  seeded.reverse()
  const name2 = seeded.fullname()
  t.is(name1, name2)
})

test.serial('to return state to original', t => {
  t.is(seeded.random(), fixtures[0])
  t.is(seeded.random(), fixtures[1])
  t.is(seeded.random(), fixtures[2])
  seeded.reset()
  t.is(seeded.random(), fixtures[0])
  t.is(seeded.random(), fixtures[1])
  t.is(seeded.random(), fixtures[2])
})

test.serial('reset state to passed argument', t => {
  t.is(seeded.random(), fixtures[0])
  t.is(seeded.random(), fixtures[1])
  t.is(seeded.random(), fixtures[2])
  seeded.reset(12345)
  t.is(seeded.random(), 0.9051722604339814)
  t.is(seeded.random(), 0.40475850524602386)
  t.is(seeded.random(), 0.934793325110708)
  seeded.reset(12345)
  t.is(seeded.random(), 0.9051722604339814)
  t.is(seeded.random(), 0.40475850524602386)
  t.is(seeded.random(), 0.934793325110708)
  seeded.reset()
  t.is(seeded.random(), fixtures[0])
  t.is(seeded.random(), fixtures[1])
  t.is(seeded.random(), fixtures[2])
  seeded.reset('moon')
  t.is(seeded.random(), fixtures[0])
  t.is(seeded.random(), fixtures[1])
  t.is(seeded.random(), fixtures[2])
})

test.serial('should repeat results of cloned instance', t => {
  t.is(seeded.random(), fixtures[0])
  const dolly = seeded.clone()
  t.is(seeded.random(), fixtures[1])
  t.is(seeded.random(), fixtures[2])
  t.is(dolly.random(), fixtures[1])
  t.is(dolly.random(), fixtures[2])
})

test.serial('should have inert default distribution function', t => {
  t.is(typeof seeded.distribution, 'function')
  t.is(seeded.distribution(1), 1)
  t.is(seeded.distribution(0.12345), 0.12345)
  t.is(seeded.distribution(1e6), 1e6)
  t.is(seeded.distribution('awesome'), 'awesome')
})

test.serial('should set distribution function', t => {
  t.is(seeded.distribution(5), 5)
  seeded.distribution(i => i * i)
  t.is(seeded.distribution(5), 25)
})

test.serial('should reset distribution function', t => {
  t.is(seeded.distribution(5), 5)
  seeded.distribution(i => i * i)
  t.is(seeded.distribution(5), 25)
  seeded.distribution(null)
  t.is(seeded.distribution(5), 5)
})

test.serial('seeded.state should return expected state', t => {
  t.deepEqual(seeded.state(), [
    9114374722873036,
    1080754632633531,
    7193642159548421,
    7191889941316046
  ])
  seeded.random()
  t.deepEqual(seeded.state(), [
    1080754632633531,
    7193642159548421,
    7191889941316046,
    1101614626
  ])
})

test.serial('seeded.state should reset state to passed argument', t => {
  t.is(seeded.random(), fixtures[0])
  const state = seeded.state()
  t.is(seeded.random(), fixtures[1])
  t.is(seeded.random(), fixtures[2])
  seeded.state(state)
  t.is(seeded.random(), fixtures[1])
  t.is(seeded.random(), fixtures[2])
})

test.serial('seeded.state should reset state initial when passed null', t => {
  t.is(seeded.random(), fixtures[0])
  t.is(seeded.random(), fixtures[1])
  t.is(seeded.random(), fixtures[2])
  seeded.state(null)
  t.is(seeded.random(), fixtures[0])
  t.is(seeded.random(), fixtures[1])
  t.is(seeded.random(), fixtures[2])
})
