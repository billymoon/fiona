/* global test expect describe */
const requireEsm = lib => require('esm')(module)(lib).default

const Fiona = requireEsm('../core')
Fiona.register(['bool', requireEsm('../bool/bool')])
Fiona.register(['choose', requireEsm('../choose/choose')])
Fiona.register(['oneOf', requireEsm('../choose/one-of')])
Fiona.register(['title', require('esm')(module)('../name/name').title])
Fiona.register(['firstname', require('esm')(module)('../name/name').firstname])
Fiona.register([
  'firstnames',
  require('esm')(module)('../name/name').firstnames
])
Fiona.register(['surname', require('esm')(module)('../name/name').surname])
Fiona.register(['gender', require('esm')(module)('../name/name').gender])
Fiona.register(['fullname', require('esm')(module)('../name/name').fullname])
const find = requireEsm('./find')(Fiona)

describe('find', () => {
  test('find with Fiona.Data', () => {
    expect(
      find(name => name === 'Miss Fiona Moon', seeded => seeded.fullname(), {
        startseed: 30380,
        tries: 10
      }).info().initseed
    ).toBe(30382)
  })

  test('find with Fiona.Data', () => {
    expect(
      find(
        data => {
          return data.age === 61
        },
        seeded =>
          seeded.object({
            name: Fiona.Fullname,
            age: Fiona.Number({ max: 100 })
          }),
        { tries: 120 }
      ).info().initseed
    ).toEqual(119)
  })

  test('find without passing options', () => {
    expect(
      find(
        data => {
          return data.age === 1
        },
        seeded =>
          seeded.object({
            age: Fiona.Number({ max: 100 })
          })
      ).info().initseed
    ).toEqual(162)
  })

  test('find (set startseed)', () => {
    expect(
      find(
        data => {
          return data.age === 61
        },
        seeded =>
          seeded.object({
            name: Fiona.Fullname,
            age: Fiona.Number({ max: 100 })
          }),
        { startseed: 307, tries: 10 }
      ).object({ name: Fiona.Fullname }).name
    ).toEqual('Dr Max Reid')

    expect(
      find(
        data => {
          return data.name === 'Miss Fiona Moon' && data.age === 1
        },
        seeded =>
          seeded.object({
            name: Fiona.Fullname,
            age: Fiona.Number({ max: 100 })
          }),
        { startseed: 2983930, tries: 10 }
      ).info().initseed
    ).toEqual(2983938)

    expect(
      find(
        data => {
          return data.name === 'Miss Aria Moon' && data.age === 5
        },
        seeded =>
          seeded.object({
            name: Fiona.Fullname,
            age: Fiona.Number({ max: 100 })
          }),
        { startseed: 3482740, tries: 10 }
      ).info().initseed
    ).toEqual(3482749)

    expect(
      find(
        data => {
          return data.name === 'Miss Mia Moon' && data.age === 6
        },
        seeded =>
          seeded.object({
            name: Fiona.Fullname,
            age: Fiona.Number({ max: 100 })
          }),
        { startseed: 211500, tries: 10 }
      ).info().initseed
    ).toEqual(211502)
  })

  test('find', () => {
    expect(() => {
      find(
        data => {
          return data.age === 61
        },
        seeded =>
          seeded.object({
            age: Fiona.Number({ max: 100 })
          }),
        { tries: 2 }
      )
    }).toThrow('Predicate not satisfied within 2 tries')
  })
})
