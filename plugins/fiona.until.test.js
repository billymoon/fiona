import test from 'ava'
import fiona from '../fiona.js'

test('fiona.until', t => {
  t.is(fiona.until(data => {
    return data.age === 61
  }, {
    name: ({ seeded }) => seeded.name(),
    age: ({ seeded }) => seeded.number(100)
  }).data().name, 'Lord Zac Blair Max Wilson')
})

test('fiona.until (set startseed)', t => {
  t.is(fiona.until(data => {
    return data.age === 61
  }, {
    name: ({ seeded }) => seeded.name(),
    age: ({ seeded }) => seeded.number(100)
  }, 230).data().name, 'Mr Samuel Anderson')

  t.is(fiona.until(data => {
    return data.name === 'Miss Fiona Moon' && data.age === 0
  }, {
    name: ({ seeded }) => seeded.name(),
    age: ({ seeded }) => seeded.number(100)
  }, 952680).info().initseed, 952684)

  t.is(fiona.until(data => {
    return data.name === 'Miss Aria Moon' && data.age === 4
  }, {
    name: ({ seeded }) => seeded.name(),
    age: ({ seeded }) => seeded.number(100)
  }, 2001630).info().initseed, 2001635)

  t.is(fiona.until(data => {
    return data.name === 'Miss Mia Moon' && data.age === 5
  }, {
    name: ({ seeded }) => seeded.name(),
    age: ({ seeded }) => seeded.number(100)
  }, 932950).info().initseed, 932955)
})

test('fiona.until', t => {
  t.throws(() => fiona.until(data => {
    return data.age === 61
  }, {
    name: ({ seeded }) => seeded.name(),
    age: ({ seeded }) => seeded.number(100)
  }, 0, 2), 'Predicate not satisfied within 2 tries')
})
