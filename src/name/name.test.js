import test from 'ava'
import Fiona from '../core/index.js'

Fiona.register(['bool', require('../bool/bool')])
Fiona.register(['choose', require('../choose/choose')])
Fiona.register(['oneOf', require('../choose/one-of')])
Fiona.register(['title', require('./name').title])
Fiona.register(['firstname', require('./name').firstname])
Fiona.register(['firstnames', require('./name').firstnames])
Fiona.register(['surname', require('./name').surname])
Fiona.register(['gender', require('./name').gender])
Fiona.register(['fullname', require('./name').fullname])

test('sanity', t => {
  t.is(true + true === 2, true)
})

test('import', t => {
  t.is(typeof Fiona === 'function', true)
})

test('Fiona.Title', t => {
  t.is(Fiona(1).title(), 'Sir')
  t.is(Fiona(1).title({}), 'Sir')
  t.is(Fiona(2).title(), 'Miss')
  t.is(Fiona(2).title({}), 'Miss')
  t.is(Fiona(4).title({ gender: 'f' }), 'Ms')
  t.is(Fiona(4).title({ gender: 'm' }), 'Sir')
  t.is(Fiona(4).title({ gender: 'Male' }), 'Sir')
})

test('Fiona.Firstname', t => {
  t.is(Fiona(1).firstname(), 'Hamish')
  t.is(Fiona(1).firstname({}), 'Hamish')
  t.is(Fiona(2).firstname(), 'Ava')
  t.is(Fiona(2).firstname({}), 'Ava')
  t.is(Fiona(2).firstname({ gender: 'f' }), 'Leah')
  t.is(Fiona(2).firstname({ gender: 'm' }), 'Angus')
  t.is(Fiona(2).firstname({ gender: 'Male' }), 'Angus')
})

test('Fiona.Firstnames', t => {
  t.is(Fiona(1).firstnames(), 'Hamish')
})

test('Fiona.Surname', t => {
  t.is(Fiona(1).surname(), 'Scott')
  t.is(Fiona(2).surname(), 'Reid')
})

test('Fiona.Gender', t => {
  t.is(Fiona(1).gender(), 'male')
  t.is(Fiona(2).gender(), 'female')
})

test('Fiona.Fullname', t => {
  t.is(Fiona(1).fullname(), 'Sir Kyle Moon')
})
