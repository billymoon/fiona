import test from 'ava'
import fiona from '../fiona.js'

test('sanity', t => {
  t.true(true + true === 2)
})

test('import', t => {
  t.true(typeof fiona === 'function')
})

test('fiona.fn.title', t => {
  t.is(fiona(1).title(), 'Lord')
  t.is(fiona(1).title({}), 'Lord')
  t.is(fiona(2).title(), 'Mr')
  t.is(fiona(2).title({}), 'Mr')
  t.is(fiona(4).title({ gender: 'f' }), 'Dame')
  t.is(fiona(4).title({ gender: 'm' }), 'Lord')
  t.is(fiona(4).title({ gender: 'Male' }), 'Lord')
})

test('fiona.fn.firstname', t => {
  t.is(fiona(1).firstname(), 'Zachary')
  t.is(fiona(1).firstname({}), 'Zachary')
  t.is(fiona(2).firstname(), 'Aaron')
  t.is(fiona(2).firstname({}), 'Aaron')
  t.is(fiona(2).firstname({ gender: 'f' }), 'Daisy')
  t.is(fiona(2).firstname({ gender: 'm' }), 'Ryan')
  t.is(fiona(2).firstname({ gender: 'Male' }), 'Ryan')
})

test('fiona.fn.firstnames', t => {
  t.is(fiona(1).firstnames(), 'Owen Kayden Oliver')
})

test('fiona.fn.surname', t => {
  t.is(fiona(1).surname(), 'Anderson')
  t.is(fiona(2).surname(), 'Scott')
})

test('fiona.fn.gender', t => {
  t.is(fiona(1).gender(), 'male')
  t.is(fiona(2).gender(), 'male')
})

test('fiona.fn.name', t => {
  t.is(fiona(1).name(), 'Lord Kayden James Alfie Stewart')
})
