const fiona = require('../src/fiona')
require('./fiona.weighted')
const t = require('../ava-to-jest-hack')

test('fiona.fn.weighted (linear)', () => {
  t.is(fiona(1).number(), 458333)
  t.is(fiona(1).weighted('linear').number(), 458333)
})

test('fiona.fn.weighted (square)', () => {
  t.is(fiona(1).number(), 458333)
  t.is(fiona(1).weighted('square').number(), 210068)
})

test('fiona.fn.weighted (cube)', () => {
  t.is(fiona(1).number(), 458333)
  t.is(fiona(1).weighted('cube').number(), 96281)
})

test('fiona.fn.weighted (quad)', () => {
  t.is(fiona(1).number(), 458333)
  t.is(fiona(1).weighted('quad').number(), 44128)
})

test('fiona.fn.weighted (low)', () => {
  t.is(fiona(1).number(), 458333)
  t.is(fiona(1).weighted('low').number(), 6314)
})

test('fiona.weighted (function)', () => {
  fiona.weighted('clamp', i => i < 0.5 ? 0.5 : i > 0.7 ? 0.7 : i)
  t.is(typeof fiona.weighted.clamp, 'function')
  t.is(fiona(1).number({ max: 100 }), 46)
  t.is(fiona(1).weighted('clamp').number({ max: 100 }), 50)
})

test('fiona.weighted (array)', () => {
  fiona.weighted('altLow', [1, 0, 1, 0])
  t.is(typeof fiona.weighted.altLow, 'function')
  t.is(fiona(1).number(), 458333)
  t.is(fiona(1).weighted('altLow').number(), 6314)
})

test('fiona.weighted (throws on invalid input)', () => {
  t.throws(() => fiona.weighted('invalid', null), 'invalid argument type supplied to `weighted` method')
})

