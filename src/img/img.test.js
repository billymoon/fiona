/* global test expect */

const Fiona = require('../core')
Fiona.register(['img', require('./img')])

test('Fiona.Img', () => {
  const imgDataURI = Fiona(1).img()
  const fixtureStart = 'data:image/svg+xml;utf8,%0A%20'
  const fixtureEnd = 'svg%3E%0A%20%20'
  expect(imgDataURI.slice(fixtureEnd.length * -1)).toBe(fixtureEnd)
  expect(imgDataURI.slice(0, fixtureStart.length)).toBe(fixtureStart)
})

test('Fiona.Img', () => {
  const imgDataURI = Fiona(1).img({ width: 100, height: 100 })
  const fixtureStart = 'data:image/svg+xml;utf8,%0A%20'
  const fixtureEnd = 'svg%3E%0A%20%20'
  expect(imgDataURI.slice(fixtureEnd.length * -1)).toBe(fixtureEnd)
  expect(imgDataURI.slice(0, fixtureStart.length)).toBe(fixtureStart)
})
