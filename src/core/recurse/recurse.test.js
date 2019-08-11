// TODO: move tests closer to relevant source code
import test from 'ava'
import recurseData from '.'
import Fiona from '..'

const mockFactory = fn => {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args)
    fn(...args)
  }
  mockFn.mock = { calls: [] }
  return mockFn
}

test('javascript is javascript', t => {
  t.is(true + true, 2)
})

test('Fiona.Number', t => {
  t.is(Fiona(1).number(), 458333)
})

test('Fiona.Random', t => {
  t.is(Fiona(1).random(), 0.4583325853842928)
})

test('Fiona.Array', t => {
  t.deepEqual(Fiona(1).array(3, Fiona.Number), [349277, 89810, 57572])
})

test('Fiona.String', t => {
  t.is(
    Fiona(1).string`${Fiona.Number} ${Fiona.Number} ${Fiona.Number}`,
    `349277 89810 57572`
  )
})

test('Fiona.Object', t => {
  t.deepEqual(
    Fiona(1).object({
      a: Fiona.Number,
      b: Fiona.Number,
      c: Fiona.Number
    }),
    { a: 611259, b: 649633, c: 378387 }
  )
})

test('original passed in object is left unchanged', t => {
  const seeded = Fiona()
  const b = { c: 3 }
  const data = { a: () => 1, b }
  const output = recurseData(seeded, data)
  t.deepEqual(output, { a: 1, b: { c: 3 } })
  t.is(typeof data.a, 'function')
  t.is(data.b, b)
})

test('functions should be evaluated and root set to top level evaluated function', t => {
  const seeded = Fiona()
  const a = { b: ({ data }) => t.is(data, a) }
  recurseData(seeded, () => () => a)
  const c = [({ data }) => t.is(data, c)]
  recurseData(seeded, () => () => c)
})

test('anonymous functions', t => {
  const seeded = Fiona()
  const output = recurseData(seeded, {
    a: () => 10,
    b: seeded => seeded.data.a * 2,
    c: () => seeded => seeded.data.b * 2 + 10,
    d: () => () => ({ e: { f: () => () => 8 } }),
    g: ({ data }) => data.d.e.f * 3
  })
  t.deepEqual(output, { a: 10, b: 20, c: 50, d: { e: { f: 8 } }, g: 24 })
  t.is(seeded.data, undefined)
})

test('Fiona.Fn', t => {
  const fionaConstructor = Fiona().constructor
  const fionaNumber = mockFactory(Fiona.Number)
  const fionaNumberInstance = mockFactory(Fiona.Number({ max: 10 }))
  const factory = mockFactory(() => Fiona.Number)

  Fiona(1).object(
    {
      a: fionaNumber,
      b: fionaNumberInstance,
      c: fionaNumber,
      d: fionaNumber,
      e: factory,
      f: t => {
        return t => {
          return 123
        }
      },
      g: t => {
        return 345
      }
    },
    {
      g: fionaNumber
    }
  )

  t.is(fionaNumber.mock.calls.length, 4)
  t.is(fionaNumberInstance.mock.calls[0][0].constructor, fionaConstructor)
  t.is(fionaNumberInstance.mock.calls[0][1], undefined)

  t.is(factory.mock.calls[0][0].constructor, fionaConstructor)
  t.is(factory.mock.calls[0][1], undefined)

  t.is(fionaNumber.mock.calls[0][0].constructor, fionaConstructor)
  t.is(fionaNumber.mock.calls[0][1], undefined)

  t.is(fionaNumber.mock.calls[1][0].constructor, fionaConstructor)
  t.is(fionaNumber.mock.calls[1][1], undefined)

  t.is(fionaNumber.mock.calls[3][0].constructor, fionaConstructor)
  t.is(fionaNumber.mock.calls[3][1], undefined)
})
