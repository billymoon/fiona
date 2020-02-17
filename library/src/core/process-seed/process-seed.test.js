import test from 'ava'
import processSeed from './index.js'

test('process-seed passes number back', t => {
  t.is(processSeed(1), 1)
  t.is(processSeed(1e6), 1e6)
  t.is(processSeed(1e32), 1e32)
})

test('process-seed converts string to integer', t => {
  t.is(processSeed('1'), 49)
  t.is(processSeed('2'), 50)
  t.is(processSeed('abc'), 2423384358)
  t.is(processSeed('abcdefghijklmnopqrstuvwxyz'), -261981256238)
  t.is(processSeed('moon'), -16743999484)
})
