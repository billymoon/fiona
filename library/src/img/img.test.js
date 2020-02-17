import test from 'ava'
import Fiona from '../core/index.js'
import img from './img'

Fiona.register(['img', img])

test('Fiona.Img', t => {
  const imgDataURI = Fiona(1).img()
  const fixtureStart = 'data:image/svg+xml;utf8,%0A%20'
  const fixtureEnd = 'svg%3E%0A%20%20'
  t.is(imgDataURI.slice(fixtureEnd.length * -1), fixtureEnd)
  t.is(imgDataURI.slice(0, fixtureStart.length), fixtureStart)
})

test('Fiona.Img (height and width)', t => {
  const imgDataURI = Fiona(1).img({ width: 100, height: 100 })
  const fixtureStart = 'data:image/svg+xml;utf8,%0A%20'
  const fixtureEnd = 'svg%3E%0A%20%20'
  t.is(imgDataURI.slice(fixtureEnd.length * -1), fixtureEnd)
  t.is(imgDataURI.slice(0, fixtureStart.length), fixtureStart)
})
