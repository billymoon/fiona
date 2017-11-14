const fiona = require('../src/fiona')
require('./fiona.bool')

const t = require('../ava-to-jest-hack')

test('fiona.fn.bool', () => {
  t.is(fiona(1).bool(), true)
  t.is(fiona(2).bool(), false)
})

test('fiona.fn.bool (chance)', () => {
  t.is(fiona(1).bool(), true)
  t.is(fiona(1).bool({ chance: 0.25 }), false)
  t.is(fiona(2).bool(), false)
  t.is(fiona(2).bool({ chance: 0.75 }), true)
})

