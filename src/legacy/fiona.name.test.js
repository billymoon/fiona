/* global test,expect */

const fiona = require('../../')
require('../bool/fiona.bool')
require('../number/fiona.number')
require('../choose/fiona.choose-oneof')
require('../choose/fiona.choose')
require('./fiona.name')

test('sanity', () => {
  expect(true + true === 2).toBe(true)
})

test('import', () => {
  expect(typeof fiona === 'function').toBe(true)
})

test('fiona.fn.title', () => {
  expect(fiona(1).title()).toBe('Sir')
  expect(fiona(1).title({})).toBe('Sir')
  expect(fiona(2).title()).toBe('Miss')
  expect(fiona(2).title({})).toBe('Miss')
  expect(fiona(4).title({ gender: 'f' })).toBe('Ms')
  expect(fiona(4).title({ gender: 'm' })).toBe('Sir')
  expect(fiona(4).title({ gender: 'Male' })).toBe('Sir')
})

test('fiona.fn.firstname', () => {
  expect(fiona(1).firstname()).toBe('Hamish')
  expect(fiona(1).firstname({})).toBe('Hamish')
  expect(fiona(2).firstname()).toBe('Ava')
  expect(fiona(2).firstname({})).toBe('Ava')
  expect(fiona(2).firstname({ gender: 'f' })).toBe('Leah')
  expect(fiona(2).firstname({ gender: 'm' })).toBe('Angus')
  expect(fiona(2).firstname({ gender: 'Male' })).toBe('Angus')
})

test('fiona.fn.firstnames', () => {
  expect(fiona(1).firstnames()).toBe('Hamish')
})

test('fiona.fn.surname', () => {
  expect(fiona(1).surname()).toBe('Scott')
  expect(fiona(2).surname()).toBe('Reid')
})

test('fiona.fn.gender', () => {
  expect(fiona(1).gender()).toBe('male')
  expect(fiona(2).gender()).toBe('female')
})

test('fiona.fn.fullname', () => {
  expect(fiona(1).fullname()).toBe('Sir Kyle Moon')
})
