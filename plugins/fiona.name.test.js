/* global test,expect */

const fiona = require('../src/fiona')
require('./fiona.bool')
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

test('fiona.fn.lastname', () => {
  expect(fiona(1).lastname()).toBe('Scott')
  expect(fiona(2).lastname()).toBe('Reid')
})

test('fiona.fn.gender', () => {
  expect(fiona(1).gender()).toBe('male')
  expect(fiona(2).gender()).toBe('female')
})

test('fiona.fn.name', () => {
  expect(fiona(1).name()).toBe('Sir Kyle Moon')
})
