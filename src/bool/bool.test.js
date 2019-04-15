/* global test,expect */
const requireEsm = lib => require('esm')(module)(lib).default

const Fiona = requireEsm('../core')
Fiona.register(['bool', requireEsm('./bool')])

test('Fiona.Bool', () => {
  expect(Fiona(1).bool()).toBe(true)
  expect(Fiona(2).bool()).toBe(false)
})

test('Fiona.Bool (chance)', () => {
  expect(Fiona(1).bool()).toBe(true)
  expect(Fiona(1).bool({ chance: 0.25 })).toBe(false)
  expect(Fiona(2).bool()).toBe(false)
  expect(Fiona(2).bool({ chance: 0.75 })).toBe(true)
})
