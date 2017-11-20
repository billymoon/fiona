/* global test,expect */

const fiona = require('../fiona')
require('./fiona.bool')
require('./fiona.name')
require('./fiona.until')

test('fiona.until', () => {
  expect(fiona.until(data => {
    return data.age === 61
  }, {
    name: ({ seeded }) => seeded.name(),
    age: ({ seeded }) => seeded.number({ max: 100 })
  }).value().name).toEqual('Lord Zac Blair Max Wilson')
})

test('fiona.until (set startseed)', () => {
  expect(fiona.until(data => {
    return data.age === 61
  }, {
    name: ({ seeded }) => seeded.name(),
    age: ({ seeded }) => seeded.number({ max: 100 })
  }, { startseed: 230 }).value().name).toEqual('Mr Samuel Anderson')

  expect(fiona.until(data => {
    return data.name === 'Miss Fiona Moon' && data.age === 0
  }, {
    name: ({ seeded }) => seeded.name(),
    age: ({ seeded }) => seeded.number({ max: 100 })
  }, { startseed: 952680 }).info().initseed).toEqual(952684)

  expect(fiona.until(data => {
    return data.name === 'Miss Aria Moon' && data.age === 4
  }, {
    name: ({ seeded }) => seeded.name(),
    age: ({ seeded }) => seeded.number({ max: 100 })
  }, { startseed: 2001630 }).info().initseed).toEqual(2001635)

  expect(fiona.until(data => {
    return data.name === 'Miss Mia Moon' && data.age === 5
  }, {
    name: ({ seeded }) => seeded.name(),
    age: ({ seeded }) => seeded.number({ max: 100 })
  }, { startseed: 932950 }).info().initseed).toEqual(932955)
})

test('fiona.until', () => {
  expect(() => {
    fiona.until(data => {
      return data.age === 61
    }, {
      name: ({ seeded }) => seeded.name(),
      age: ({ seeded }) => seeded.number({ max: 100 })
    }, { tries: 2 })
  }).toThrow('Predicate not satisfied within 2 tries')
})
