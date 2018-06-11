/* global test,expect */

const fiona = require('../../')
require('../number/fiona.number')
require('../bool/fiona.bool')
require('../choose/fiona.choose-oneof')
require('../choose/fiona.choose')
require('../name/fiona.name')
require('./fiona.find')

test('fiona.find with fiona.fn.data', () => {
  expect(fiona.find(
    name => name === 'Miss Fiona Moon',
    seeded => seeded.name(),
    { startseed: 3e4 }
  ).info().initseed).toBe(30382)
})

test('fiona.find with fiona.fn.data', () => {
  expect(fiona.find(data => {
    return data.age === 61
  }, seeded => seeded.data({
    name: ({ seeded }) => seeded.name(),
    age: ({ seeded }) => seeded.number({ max: 100 })
  })).value().name).toEqual('Lord Zac Blair Max Wilson')
})

test('fiona.find (set startseed)', () => {
  expect(fiona.find(data => {
    return data.age === 61
  }, seeded => seeded.data({
    name: ({ seeded }) => seeded.name(),
    age: ({ seeded }) => seeded.number({ max: 100 })
  }), { startseed: 230 }).value().name).toEqual('Mr Samuel Anderson')

  expect(fiona.find(data => {
    return data.name === 'Miss Fiona Moon' && data.age === 0
  }, seeded => seeded.data({
    name: ({ seeded }) => seeded.name(),
    age: ({ seeded }) => seeded.number({ max: 100 })
  }), { startseed: 952680 }).info().initseed).toEqual(952684)

  expect(fiona.find(data => {
    return data.name === 'Miss Aria Moon' && data.age === 4
  }, seeded => seeded.data({
    name: ({ seeded }) => seeded.name(),
    age: ({ seeded }) => seeded.number({ max: 100 })
  }), { startseed: 2001630 }).info().initseed).toEqual(2001635)

  expect(fiona.find(data => {
    return data.name === 'Miss Mia Moon' && data.age === 5
  }, seeded => seeded.data({
    name: ({ seeded }) => seeded.name(),
    age: ({ seeded }) => seeded.number({ max: 100 })
  }), { startseed: 932950 }).info().initseed).toEqual(932955)
})

test('fiona.find', () => {
  expect(() => {
    fiona.find(data => {
      return data.age === 61
    }, seeded => seeded.data({
      name: ({ seeded }) => seeded.name(),
      age: ({ seeded }) => seeded.number({ max: 100 })
    }), { tries: 2 })
  }).toThrow('Predicate not satisfied within 2 tries')
})
