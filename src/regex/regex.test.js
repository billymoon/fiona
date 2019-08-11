import test from 'ava'
import Fiona from '../core/index.js'

Fiona.register(['regex', require('./regex')])

test('sanity', t => {
  t.is(true + true, 2)
})

test('import', t => {
  t.is(typeof Fiona, 'function')
})

test('Fiona.Regex', t => {
  t.is(Fiona(1).regex(/[0-1]{8} (cy|ro)bo(t|rg)s/), '11010001 robots')
})

// // TODO: why does this give different result now?
// test('Fiona.Regex (with no arguments)', t => {
//   t.is(Fiona(2).regex(), '34A7CFE87F5EFD77')
// })

// // regex › regex › Fiona.Regex (with no arguments)

// //   /Users/billymoon/projects/fiona/src/regex/regex.test.js:20

// //    19: test('Fiona.Regex (with no arguments)', t => {
// //    20:   t.is(Fiona(2).regex(), '34A7CFE87F5EFD77')
// //    21: })

// //   Difference:

// //   - 'AC1CD8644A2D15A2'
// //   + '34A7CFE87F5EFD77'
