/* global test,expect */
const requireEsm = lib => require('esm')(module)(lib).default

const Fiona = requireEsm('../core')
Fiona.register(['bool', requireEsm('../bool/bool')])
Fiona.register(['choose', requireEsm('../choose/choose')])
Fiona.register(['oneOf', requireEsm('../choose/one-of')])
Fiona.register(['title', require('esm')(module)('./name').title])
Fiona.register(['firstname', require('esm')(module)('./name').firstname])
Fiona.register(['firstnames', require('esm')(module)('./name').firstnames])
Fiona.register(['surname', require('esm')(module)('./name').surname])
Fiona.register(['gender', require('esm')(module)('./name').gender])
Fiona.register(['fullname', require('esm')(module)('./name').fullname])

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
