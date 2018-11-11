/* global test,expect */

const Fiona = require('../core')
Fiona.register(['bool', require('../bool/bool')])
Fiona.register(['choose', require('../choose/choose')])
Fiona.register(['oneOf', require('../choose/one-of')])
Fiona.register(['title', require('./name').title])
Fiona.register(['firstname', require('./name').firstname])
Fiona.register(['firstnames', require('./name').firstnames])
Fiona.register(['surname', require('./name').surname])
Fiona.register(['gender', require('./name').gender])
Fiona.register(['fullname', require('./name').fullname])

test('sanity', () => {
  expect(true + true === 2).toBe(true)
})

test('import', () => {
  expect(typeof Fiona === 'function').toBe(true)
})

test('Fiona.Title', () => {
  expect(Fiona(1).title()).toBe('Sir')
  expect(Fiona(1).title({})).toBe('Sir')
  expect(Fiona(2).title()).toBe('Miss')
  expect(Fiona(2).title({})).toBe('Miss')
  expect(Fiona(4).title({ gender: 'f' })).toBe('Ms')
  expect(Fiona(4).title({ gender: 'm' })).toBe('Sir')
  expect(Fiona(4).title({ gender: 'Male' })).toBe('Sir')
})

test('Fiona.Firstname', () => {
  expect(Fiona(1).firstname()).toBe('Hamish')
  expect(Fiona(1).firstname({})).toBe('Hamish')
  expect(Fiona(2).firstname()).toBe('Ava')
  expect(Fiona(2).firstname({})).toBe('Ava')
  expect(Fiona(2).firstname({ gender: 'f' })).toBe('Leah')
  expect(Fiona(2).firstname({ gender: 'm' })).toBe('Angus')
  expect(Fiona(2).firstname({ gender: 'Male' })).toBe('Angus')
})

test('Fiona.Firstnames', () => {
  expect(Fiona(1).firstnames()).toBe('Hamish')
})

test('Fiona.Surname', () => {
  expect(Fiona(1).surname()).toBe('Scott')
  expect(Fiona(2).surname()).toBe('Reid')
})

test('Fiona.Gender', () => {
  expect(Fiona(1).gender()).toBe('male')
  expect(Fiona(2).gender()).toBe('female')
})

test('Fiona.Fullname', () => {
  expect(Fiona(1).fullname()).toBe('Sir Kyle Moon')
})
