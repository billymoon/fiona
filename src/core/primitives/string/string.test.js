import test from 'ava'
import Fiona from '../..'

let seeded

test.beforeEach(() => {
  seeded = Fiona('moon')
})

test.serial('template literal', t => {
  t.is(seeded.string`a`, 'a')
})

test.serial('template literal with expression', t => {
  t.is(seeded.string`a ${'b'} c`, 'a b c')
})

test.serial('template literal with function expression', t => {
  t.is(
    seeded.string`a ${seeded => seeded.random()} c`,
    'a 0.9234358602778222 c'
  )
})

test.serial('plugin produces same variables as array', t => {
  const output = seeded.string`${seeded => seeded.random()}:${seeded =>
    seeded.random()}:${seeded => seeded.random()}:${seeded => seeded.random()}`
  const fixture = seeded
    .object([
      seeded => seeded.random(),
      seeded => seeded.random(),
      seeded => seeded.random(),
      seeded => seeded.random()
    ])
    .join(':')
  t.is(output, fixture)
})

test.serial('plugin can be called as method on Fiona', t => {
  t.is(seeded.string`a ${() => `b`} c ${() => `d`} e`, 'a b c d e')
})
