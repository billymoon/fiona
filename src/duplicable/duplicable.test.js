import test from 'ava'
import Fiona from '../core/index.js'
import duplicable from './duplicable'

Fiona.register(['duplicable', duplicable])

test('Fiona.Duplicable', t => {
  t.deepEqual(
    Fiona('moon').array(10, seeded => {
      return seeded.duplicable({ frequency: 0.8, pool: 2 }).number()
    }),
    [
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
    ]
  )

  t.deepEqual(
    Fiona('moon').array(3, seeded => {
      return seeded.duplicable().number()
    }),
    [972611, 628994, 979373]
  )
})
