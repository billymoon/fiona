/* global test,expect */
const requireEsm = lib => require('esm')(module)(lib).default

const Fiona = requireEsm('../core')
Fiona.register(['regex', requireEsm('./regex')])

test('sanity', () => {
  expect(true + true).toBe(2)
})

test('import', () => {
  expect(typeof Fiona).toBe('function')
})

test('Fiona.Regex', () => {
  expect(Fiona(1).regex(/[0-1]{8} (cy|ro)bo(t|rg)s/)).toBe('11010001 robots')
})

test('Fiona.Regex (with no arguments)', () => {
  expect(Fiona(1).regex()).toBe('34A7CFE87F5EFD77')
})
