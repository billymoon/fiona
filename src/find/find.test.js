/* global test expect describe */

const Fiona = require('../core')
Fiona.register(['bool', require('../bool/bool')])
Fiona.register(['choose', require('../choose/choose')])
Fiona.register(['oneOf', require('../choose/one-of')])
Fiona.register(['title', require('../name/name').title])
Fiona.register(['firstname', require('../name/name').firstname])
Fiona.register(['firstnames', require('../name/name').firstnames])
Fiona.register(['surname', require('../name/name').surname])
Fiona.register(['gender', require('../name/name').gender])
Fiona.register(['fullname', require('../name/name').fullname])
const find = require('./find')(Fiona)

describe('find', () => {
  test('find with Fiona.Data', () => {
    expect(find(
      name => name === 'Miss Fiona Moon',
      seeded => seeded.fullname(),
      { startseed: 30380, tries: 10 }
    ).info().initseed).toBe(30382)
  })

  test('find with Fiona.Data', () => {
    expect(find(data => {
      return data.age === 61
    }, seeded => seeded.object({
      name: Fiona.Fullname,
      age: Fiona.Number({ max: 100 })
    }), { tries: 120 }).info().initseed).toEqual(119)
  })

  test('find without passing options', () => {
    expect(find(data => {
      return data.age === 1
    }, seeded => seeded.object({
      age: Fiona.Number({ max: 100 })
    })).info().initseed).toEqual(162)
  })

  test('find (set startseed)', () => {
    expect(find(data => {
      return data.age === 61
    }, seeded => seeded.object({
      name: Fiona.Fullname,
      age: Fiona.Number({ max: 100 })
    }), { startseed: 307, tries: 10 }).object({ name: Fiona.Fullname }).name).toEqual('Dr Max Reid')

    expect(find(data => {
      return data.name === 'Miss Fiona Moon' && data.age === 1
    }, seeded => seeded.object({
      name: Fiona.Fullname,
      age: Fiona.Number({ max: 100 })
    }), { startseed: 2983930, tries: 10 }).info().initseed).toEqual(2983938)

    expect(find(data => {
      return data.name === 'Miss Aria Moon' && data.age === 5
    }, seeded => seeded.object({
      name: Fiona.Fullname,
      age: Fiona.Number({ max: 100 })
    }), { startseed: 3482740, tries: 10 }).info().initseed).toEqual(3482749)

    expect(find(data => {
      return data.name === 'Miss Mia Moon' && data.age === 6
    }, seeded => seeded.object({
      name: Fiona.Fullname,
      age: Fiona.Number({ max: 100 })
    }), { startseed: 211500, tries: 10 }).info().initseed).toEqual(211502)
  })

  test('find', () => {
    expect(() => {
      find(data => {
        return data.age === 61
      }, seeded => seeded.object({
        age: Fiona.Number({ max: 100 })
      }), { tries: 2 })
    }).toThrow('Predicate not satisfied within 2 tries')
  })
})
