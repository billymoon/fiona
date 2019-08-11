import test from 'ava'
import Fiona from '../..'

const fixtures = [512979, 432056, 247403]

let seeded

test.beforeEach(() => {
  seeded = Fiona('moon')
})

test.serial('plugin can be called as method on fiona', t => {
  t.is(seeded.number(), fixtures[0])
  t.is(seeded.number(), fixtures[1])
  t.is(seeded.number(), fixtures[2])
})

test.serial('plugin can be called as method on Fiona', t => {
  t.is(Fiona.Number()(seeded), fixtures[0])
  t.is(Fiona.Number()(seeded), fixtures[1])
  t.is(Fiona.Number()(seeded), fixtures[2])
})

test.serial('plugin to give expected outputs with arguments set', t => {
  t.is(Fiona('moon').number(), fixtures[0])
  t.is(Fiona('moon').number({ min: 500000 }), 756490)
  t.is(Fiona('moon').number({ min: 500000, precision: 3 }), 756490.155)
  t.is(Fiona('moon').number({ min: 500000, precision: -3 }), 756000)
  t.is(Fiona('moon').number({ min: 500000, precision: null }), 756490)
  t.is(Fiona('moon').number({ max: 100 }), 51)
  t.is(Fiona('moon').number({ min: 90, max: 100 }), 95)
})
