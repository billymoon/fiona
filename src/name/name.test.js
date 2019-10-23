import test from 'ava'
import Fiona from '../core/index.js'

import bool from '../bool/bool'
import choose from '../choose/choose'
import oneOf from '../choose/one-of'
import { title, firstname, firstnames, surname, gender, fullname } from './name'

Fiona.register(['bool', bool])
Fiona.register(['choose', choose])
Fiona.register(['oneOf', oneOf])
Fiona.register(['title', title])
Fiona.register(['firstname', firstname])
Fiona.register(['firstnames', firstnames])
Fiona.register(['surname', surname])
Fiona.register(['gender', gender])
Fiona.register(['fullname', fullname])

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
