import test from 'ava'
import fiona from './fiona.js'

test('sanity', t => {
  t.true(true + true === 2)
})

test('import', t => {
  t.true(typeof fiona === 'function')
})

test('fiona.fn.title', t => {
  t.true(fiona(1).title() === 'Dame')
  t.true(fiona(1).title({}) === 'Dame')
  t.true(fiona(2).title() === 'Mr')
  t.true(fiona(2).title({}) === 'Mr')
  t.true(fiona(4).title({ gender: 'f' }) === 'Miss')
  t.true(fiona(4).title({ gender: 'm' }) === 'Mr')
  t.true(fiona(4).title({ gender: 'Male' }) === 'Mr')
})

test('fiona.fn.firstname', t => {
  t.true(fiona(1).firstname() === 'Hanna')
  t.true(fiona(1).firstname({}) === 'Hanna')
  t.true(fiona(2).firstname() === 'Daniel')
  t.true(fiona(2).firstname({}) === 'Daniel')
  t.true(fiona(2).firstname({ gender: 'f' }) === 'Zara')
  t.true(fiona(2).firstname({ gender: 'm' }) === 'Liam')
  t.true(fiona(2).firstname({ gender: 'Male' }) === 'Liam')
})

test('fiona.fn.surname', t => {
  t.true(fiona(1).surname() === 'Reid')
  t.true(fiona(2).surname() === 'Anderson')
})

test('fiona.fn.gender', t => {
  t.true(fiona(1).gender() === 'female')
  t.true(fiona(2).gender() === 'male')
})
