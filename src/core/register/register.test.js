import test from 'ava'
import Fiona from '..'
import { Register, registered } from './index.js'

let seeded

test.beforeEach(t => {
  seeded = Fiona('moon')
})

test.serial('accepts named function as extension', t => {
  const zeroHundred = seeded => Math.round(seeded.random() * 100)
  Fiona.register(zeroHundred)
  t.is(seeded.zeroHundred(), 51)
})

test.serial('exports register from index.js', t => {
  t.is(typeof Register, 'function')
})

test.serial('exports registered from index.js', t => {
  t.is(typeof registered, 'object')
})

test.serial('accepts multiple named functions as extensions', t => {
  const zeroHundred = seeded => Math.round(seeded.random() * 100)
  const zeroTwoHundred = seeded => Math.round(seeded.random() * 100)
  Fiona.register(zeroHundred, zeroTwoHundred)
  t.is(seeded.zeroHundred(), 51)
  t.is(seeded.zeroTwoHundred(), 43)
})

test.serial('accepts name and function as extension', t => {
  Fiona.register(['zeroHundred', seeded => Math.round(seeded.random() * 100)])
  t.is(seeded.zeroHundred(), 51)
})

test.serial('extension can be called as method on Fiona', t => {
  const zeroHundred = seeded => Math.round(seeded.random() * 100)
  Fiona.register(zeroHundred)
  t.is(Fiona.ZeroHundred()(seeded), 51)
})

test.serial('plugin can is called with no arguments with no brackets', t => {
  const zeroHundred = (seeded, arg) => typeof arg
  Fiona.register(zeroHundred)
  t.deepEqual(seeded.object({ a: Fiona.ZeroHundred }), { a: 'undefined' })
})

test.serial(
  'extension can is called with no arguments with no brackets in string',
  t => {
    const zeroHundred = (seeded, arg) => typeof arg
    Fiona.register(zeroHundred)
    t.deepEqual(seeded.string`number ${Fiona.ZeroHundred}`, `number undefined`)
  }
)

test.serial('extension can is called with passed arguments in string', t => {
  const zeroHundred = (seeded, arg) => typeof arg
  Fiona.register(zeroHundred)
  t.deepEqual(seeded.string`number ${Fiona.ZeroHundred(1)}`, `number number`)
})
