const fiona = require('../src/fiona')
require('./fiona.regex')
const t = require('../ava-to-jest-hack')

test('sanity', () => {
  t.is(true + true, 2)
})

test('import', () => {
  t.is(typeof fiona, 'function')
})

test('fiona.fn.regex', () => {
  t.is(fiona(1).regex(/[0-1]{8} (cy|ro)bo(t|rg)s/), '11010001 robots')
})
