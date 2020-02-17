import test from 'ava'
import Fiona from '../index.js'

// TODO: why do we have to run these tests serially
let seeded

test.beforeEach(t => {
  seeded = Fiona('moon')
})

test.serial('should have inert default distribution function', t => {
  t.is(typeof seeded.distribution, 'function')
  t.is(seeded.distribution(1), 1)
  t.is(seeded.distribution(0.12345), 0.12345)
  t.is(seeded.distribution(1e6), 1e6)
  t.is(seeded.distribution('awesome'), 'awesome')
})

test.serial('should set distribution function', t => {
  t.is(seeded.distribution(5), 5)
  seeded.distribution(i => i * i)
  t.is(seeded.distribution(5), 25)
})

test.serial('should reset distribution function', t => {
  t.is(seeded.distribution(5), 5)
  seeded.distribution(i => i * i)
  t.is(seeded.distribution(5), 25)
  seeded.distribution(null)
  t.is(seeded.distribution(5), 5)
})
