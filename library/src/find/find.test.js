import test from 'ava'
import Fiona from '../core/index.js'

import bool from '../bool/bool.js'
import choose from '../choose/choose.js'
import oneOf from '../choose/one-of.js'
import {
  title,
  firstname,
  firstnames,
  surname,
  gender,
  fullname
} from '../name/name.js'
import Find from './find.js'

Fiona.register(['bool', bool])
Fiona.register(['choose', choose])
Fiona.register(['oneOf', oneOf])
Fiona.register(['title', title])
Fiona.register(['firstname', firstname])
Fiona.register(['firstnames', firstnames])
Fiona.register(['surname', surname])
Fiona.register(['gender', gender])
Fiona.register(['fullname', fullname])

const find = Find(Fiona)

test('find Fiona Moon', t => {
  t.is(
    find(name => name === 'Miss Fiona Moon', seeded => seeded.fullname(), {
      startseed: 30380,
      tries: 10
    }).info().initseed,
    30382
  )
})

test('find with Fiona.Data', t => {
  t.is(
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
    ).info().initseed,
    119
  )
})

test('find without passing options', t => {
  t.is(
    find(
      data => {
        return data.age === 1
      },
      seeded =>
        seeded.object({
          age: Fiona.Number({ max: 100 })
        })
    ).info().initseed,
    162
  )
})

test('find (set startseed)', t => {
  t.is(
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
    ).object({ name: Fiona.Fullname }).name,
    'Dr Max Reid'
  )

  t.is(
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
    ).info().initseed,
    2983938
  )

  t.is(
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
    ).info().initseed,
    3482749
  )

  t.is(
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
    ).info().initseed,
    211502
  )
})

test('find', t => {
  const err = t.throws(() => {
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
  })
  t.is(err.message, 'Predicate not satisfied within 2 tries')
})
