import test from 'ava'
import fiona from '../fiona.js'

test('fiona.until', t => {
  t.is(fiona.until(data => {
    return data.age === 61
  }, {
    name: ({ seeded }) => seeded.name(),
    age: ({ seeded }) => seeded.number({ max: 100 })
  }).value().name, 'Lord Zac Blair Max Wilson')
})

test('fiona.until (set startseed)', t => {
  t.is(fiona.until(data => {
    return data.age === 61
  }, {
    name: ({ seeded }) => seeded.name(),
    age: ({ seeded }) => seeded.number({ max: 100 })
  }, { startseed: 230 }).value().name, 'Mr Samuel Anderson')

  t.is(fiona.until(data => {
    return data.name === 'Miss Fiona Moon' && data.age === 0
  }, {
    name: ({ seeded }) => seeded.name(),
    age: ({ seeded }) => seeded.number({ max: 100 })
  }, { startseed: 952680 }).info().initseed, 952684)

  t.is(fiona.until(data => {
    return data.name === 'Miss Aria Moon' && data.age === 4
  }, {
    name: ({ seeded }) => seeded.name(),
    age: ({ seeded }) => seeded.number({ max: 100 })
  }, { startseed: 2001630 }).info().initseed, 2001635)

  t.is(fiona.until(data => {
    return data.name === 'Miss Mia Moon' && data.age === 5
  }, {
    name: ({ seeded }) => seeded.name(),
    age: ({ seeded }) => seeded.number({ max: 100 })
  }, { startseed: 932950 }).info().initseed, 932955)
})

test('fiona.until', t => {
  t.throws(() => fiona.until(data => {
    return data.age === 61
  }, {
    name: ({ seeded }) => seeded.name(),
    age: ({ seeded }) => seeded.number({ max: 100 })
  }, { tries: 2 }), 'Predicate not satisfied within 2 tries')
})
