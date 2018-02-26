/* global test,expect */
const fiona = require('../')

test('fiona.fn.length more after requiring plugins', () => {
  const initialLength = Object.keys(fiona.fn).length
  require('./index.js')
  expect(Object.keys(fiona.fn).length > initialLength).toBe(true)
})
