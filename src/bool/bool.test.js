/* global test,expect */

const fiona = require('../core')
fiona.register(['bool', require('./bool')])

test('fiona.bool', () => {
  expect(fiona(1).bool()).toBe(true)
  expect(fiona(2).bool()).toBe(false)
})

test('fiona.bool (chance)', () => {
  expect(fiona(1).bool()).toBe(true)
  expect(fiona(1).bool({ chance: 0.25 })).toBe(false)
  expect(fiona(2).bool()).toBe(false)
  expect(fiona(2).bool({ chance: 0.75 })).toBe(true)
})