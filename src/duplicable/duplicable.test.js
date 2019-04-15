/* global test expect */
const requireEsm = lib => require('esm')(module)(lib).default

const Fiona = requireEsm('../core')
Fiona.register(['duplicable', requireEsm('./duplicable')])

test('Fiona.Duplicable', () => {
  expect(
    Fiona('moon').array(10, seeded => {
      return seeded.duplicable({ frequency: 0.8, pool: 2 }).number()
    })
  ).toEqual([
    972611,
    628994,
    153925,
    153925,
    373260,
    373260,
    373260,
    373260,
    373260,
    153925
  ])

  expect(
    Fiona('moon').array(3, seeded => {
      return seeded.duplicable().number()
    })
  ).toEqual([972611, 628994, 979373])
})
