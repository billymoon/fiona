/* global test,expect */

const fiona = require('../core')
fiona.register(['bool', require('../bool/bool')])
fiona.register(['choose', require('../choose/choose')])
fiona.register(['oneOf', require('../choose/one-of')])
fiona.register(['title', require('./name').title])
fiona.register(['firstname', require('./name').firstname])
fiona.register(['firstnames', require('./name').firstnames])
fiona.register(['surname', require('./name').surname])
fiona.register(['gender', require('./name').gender])
fiona.register(['fullname', require('./name').fullname])

test('sanity', () => {
  expect(true + true === 2).toBe(true)
})

test('import', () => {
  expect(typeof fiona === 'function').toBe(true)
})

test('fiona.Title', () => {
  expect(fiona(1).title()).toBe('Sir')
  expect(fiona(1).title({})).toBe('Sir')
  expect(fiona(2).title()).toBe('Miss')
  expect(fiona(2).title({})).toBe('Miss')
  expect(fiona(4).title({ gender: 'f' })).toBe('Ms')
  expect(fiona(4).title({ gender: 'm' })).toBe('Sir')
  expect(fiona(4).title({ gender: 'Male' })).toBe('Sir')
})

test('fiona.Firstname', () => {
  expect(fiona(1).firstname()).toBe('Hamish')
  expect(fiona(1).firstname({})).toBe('Hamish')
  expect(fiona(2).firstname()).toBe('Ava')
  expect(fiona(2).firstname({})).toBe('Ava')
  expect(fiona(2).firstname({ gender: 'f' })).toBe('Leah')
  expect(fiona(2).firstname({ gender: 'm' })).toBe('Angus')
  expect(fiona(2).firstname({ gender: 'Male' })).toBe('Angus')
})

test('fiona.Firstnames', () => {
  expect(fiona(1).firstnames()).toBe('Hamish')
})

test('fiona.Surname', () => {
  expect(fiona(1).surname()).toBe('Scott')
  expect(fiona(2).surname()).toBe('Reid')
})

test('fiona.Gender', () => {
  expect(fiona(1).gender()).toBe('male')
  expect(fiona(2).gender()).toBe('female')
})

test('fiona.Fullname', () => {
  expect(fiona(1).fullname()).toBe('Sir Kyle Moon')
})
