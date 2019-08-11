import test from 'ava'
import Fiona from '../..'

const fixtures = [923436, 991546, 100070, 247407, 240368]

let seeded

test.beforeEach(() => {
  seeded = Fiona('moon')
})

test.serial('returns array', t => {
  t.deepEqual(seeded.array(5, 1), [1, 1, 1, 1, 1])
})

test.serial('recurses array', t => {
  t.deepEqual(seeded.array(5, seeded => seeded.number()), fixtures)
})

test.serial('recurses array with bar Fiona.Plugin syntax', t => {
  t.deepEqual(seeded.array(5, Fiona.Number), fixtures)
})

test.serial('accepts max/min arguments', t => {
  t.deepEqual(
    seeded.array({ min: 2, max: 4 }, Fiona.Number),
    fixtures.slice(0, 3)
  )
})

test.serial('uses passed processor', t => {
  t.deepEqual(
    seeded.array(5, Fiona.Number, i => i.map(j => j / 100)),
    fixtures.map(j => j / 100)
  )
})

test.serial('joins array if passed string as processor', t => {
  t.is(seeded.array(5, Fiona.Number, ':'), fixtures.join(':'))
})
