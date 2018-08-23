/* global test,expect */

const fiona = require('../../')
require('../array/fiona.array')
require('./fiona.string')

const fixtures = [
  '',
  '0.1808786500156292',
  ''
]

const dataSandwich = (seeded, item) => seeded.data(['', item, '']).join('')

test('fiona.fn.string empty', () => {
  expect(fiona(1).string``).toEqual('')
})

test('fiona.fn.string string only', () => {
  expect(fiona(1).string`awesome`).toEqual('awesome')
})

test('fiona.fn.string with variable', () => {
  expect(fiona(1).string`${'awesome'}`).toEqual('awesome')
})

test('fiona.fn.string with variable surrounded by strings', () => {
  expect(fiona(1).string`super${'awesome'}`).toEqual('superawesome')
  expect(fiona(1).string`${'awesome'}ness`).toEqual('awesomeness')
  expect(fiona(1).string`super${'awesome'}ness`).toEqual('superawesomeness')
})

test('fiona.fn.string with variable function', () => {
  expect(fiona(1).string`super${() => 'awesome'}ness`).toEqual('superawesomeness')
  expect(fiona(1).string`super${() => () => 'awesome'}ness`).toEqual('superawesomeness')
  expect(fiona(1).string`super${() => () => () => 'awesome'}ness`).toEqual('superawesomeness')
})

test('fiona.fn.string with variable functions', () => {
  expect(fiona(1).string`${() => 'super'}${() => 'awesome'}${() => 'ness'}`).toEqual('superawesomeness')
})

test('fiona.fn.string with seeded function', () => {
  expect(fiona(1).string`${({ seeded }) => seeded.random()}`).toEqual(fixtures.slice(0, 3).join(''))
  expect(fiona(1).string`${fiona.random()}`).toEqual(fixtures.slice(0, 3).join(''))
  expect(fiona(1).string`${fiona.random}`).toEqual(fixtures.slice(0, 3).join(''))
})

test('fiona.fn.string with seeded function equal to fiona.data call to same function', () => {
  expect(fiona(1).string`${fiona.random}`).toEqual(dataSandwich(fiona(1), fiona.random))
})

test('fiona.fn.string with seeded function equal to fiona.array call to same function', () => {
  expect(fiona(1).string`${fiona.random}`).toEqual(dataSandwich(fiona(1), ({ seeded }) => seeded.random))
  expect(fiona(1).string`${fiona.random}`).toEqual(dataSandwich(fiona(1), ({ seeded }) => seeded.random()))
  expect(fiona(1).string`${fiona.random}`).toEqual(dataSandwich(fiona(1), () => fiona.random()))
  expect(fiona(1).string`${fiona.random}`).toEqual(dataSandwich(fiona(1), () => fiona.random))
  expect(fiona(1).string`${fiona.random}`).toEqual(dataSandwich(fiona(1), fiona.random))
})

test('fiona.fn.string with fiona.array call to be same as how fiona.fn.data handles same call', () => {
  const arraycall = fiona.array(3, fiona.random, out => out.join(' :: '))
  expect(fiona(1).string`${arraycall}`).toEqual(dataSandwich(fiona(1), arraycall))
})
