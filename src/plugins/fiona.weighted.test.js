/* global test,expect */

const fiona = require('../')
require('./fiona.weighted')

test('fiona.fn.weighted (linear)', () => {
  expect(fiona(1).number()).toBe(458333)
  expect(fiona(1).weighted('linear').number()).toBe(458333)
})

test('fiona.fn.weighted (square)', () => {
  expect(fiona(1).number()).toBe(458333)
  expect(fiona(1).weighted('square').number()).toBe(210068)
})

test('fiona.fn.weighted (cube)', () => {
  expect(fiona(1).number()).toBe(458333)
  expect(fiona(1).weighted('cube').number()).toBe(96281)
})

test('fiona.fn.weighted (quad)', () => {
  expect(fiona(1).number()).toBe(458333)
  expect(fiona(1).weighted('quad').number()).toBe(44128)
})

test('fiona.fn.weighted (low)', () => {
  expect(fiona(1).number()).toBe(458333)
  expect(fiona(1).weighted('low').number()).toBe(6314)
})

test('fiona.weighted (function)', () => {
  fiona.weighted('clamp', i => i < 0.5 ? 0.5 : i > 0.7 ? 0.7 : i)
  expect(typeof fiona.weighted.clamp).toBe('function')
  expect(fiona(1).number({ max: 100 })).toBe(46)
  expect(fiona(1).weighted('clamp').number({ max: 100 })).toBe(50)
})

test('fiona.weighted (array)', () => {
  fiona.weighted('altLow', [1, 0, 1, 0])
  expect(typeof fiona.weighted.altLow).toBe('function')
  expect(fiona(1).number()).toBe(458333)
  expect(fiona(1).weighted('altLow').number()).toBe(6314)
})

test('fiona.weighted (throws on invalid input)', () => {
  expect(() => {
    fiona.weighted('invalid', null)
  }).toThrow('invalid argument type supplied to `weighted` method')
})