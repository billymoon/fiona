/* global test expect */

const fiona = require('../core')
fiona.register(['bool', require('../bool/bool')])
fiona.register(['choose', require('../choose/choose')])
fiona.register(['oneOf', require('../choose/one-of')])
fiona.register(['title', require('../name/name').title])
fiona.register(['firstname', require('../name/name').firstname])
fiona.register(['firstnames', require('../name/name').firstnames])
fiona.register(['surname', require('../name/name').surname])
fiona.register(['gender', require('../name/name').gender])
fiona.register(['fullname', require('../name/name').fullname])
const find = require('./find')(fiona)

test('find with fiona.fn.data', () => {
  expect(find(
    name => name === 'Miss Fiona Moon',
    fiona.fullname(),
    { startseed: 3e4 }
  ).info().initseed).toBe(30382)
})

test('find with fiona.fn.data', () => {
  expect(find(data => {
    return data.age === 61
  }, fiona.object({
    name: fiona.fullname(),
    age: fiona.number({ max: 100 })
  })).info().initseed).toEqual(119)
})

test('find (set startseed)', () => {
  expect(find(data => {
    return data.age === 61
  }, fiona.object({
    name: fiona.fullname,
    age: fiona.number({ max: 100 })
  }), { startseed: 310, tries: 10 }).object({ name: fiona.fullname }).name).toEqual('Dr Max Reid')

  expect(find(data => {
    return data.name === 'Miss Fiona Moon' && data.age === 1
  }, fiona.object({
    name: fiona.fullname,
    age: fiona.number({ max: 100 })
  }), { startseed: 2983930, tries: 10 }).info().initseed).toEqual(2983938)

  expect(find(data => {
    return data.name === 'Miss Aria Moon' && data.age === 5
  }, fiona.object({
    name: fiona.fullname(),
    age: fiona.number({ max: 100 })
  }), { startseed: 3482740, tries: 10 }).info().initseed).toEqual(3482749)

  expect(find(data => {
    return data.name === 'Miss Mia Moon' && data.age === 6
  }, fiona.object({
    name: fiona.fullname(),
    age: fiona.number({ max: 100 })
  }), { startseed: 211500 }).info().initseed).toEqual(211502)
})

test('find', () => {
  expect(() => {
    find(data => {
      return data.age === 61
    }, fiona.object({
      age: fiona.number({ max: 100 })
    }), { tries: 2 })
  }).toThrow('Predicate not satisfied within 2 tries')
})