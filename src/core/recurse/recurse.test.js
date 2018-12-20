/* global test expect describe beforeEach */

// TODO: move tests closer to relevant source code
const recurseData = require('.')
const Fiona = require('..')

describe('sanity', () => {
  test('javascript is javascript', () => {
    expect(true + true).toBe(2)
  })
})

describe('basics', () => {
  test('Fiona.Number', () => {
    expect(Fiona(1).number()).toBe(458333)
  })

  test('Fiona.Random', () => {
    expect(Fiona(1).random()).toBe(0.4583325853842928)
  })

  test('Fiona.Array', () => {
    expect(Fiona(1).array(3, Fiona.Number)).toEqual([349277, 89810, 57572])
  })

  test('Fiona.String', () => {
    expect(
      Fiona(1).string`${Fiona.Number} ${Fiona.Number} ${Fiona.Number}`
    ).toEqual(`349277 89810 57572`)
  })

  test('Fiona.Object', () => {
    expect(
      Fiona(1).object({
        a: Fiona.Number,
        b: Fiona.Number,
        c: Fiona.Number
      })
    ).toEqual({ a: 611259, b: 649633, c: 378387 })
  })

  test('original passed in object is left unchanged', () => {
    const seeded = Fiona()
    const b = { c: 3 }
    const data = { a: () => 1, b }
    const output = recurseData(seeded, data)
    expect(output).toEqual({ a: 1, b: { c: 3 } })
    expect(typeof data.a).toBe('function')
    expect(data.b).toBe(b)
  })

  test('functions should be evaluated and root set to top level evaluated function', () => {
    const seeded = Fiona()
    const a = { b: ({ data }) => expect(data).toBe(a) }
    recurseData(seeded, () => () => a)
    const c = [({ data }) => expect(data).toBe(c)]
    recurseData(seeded, () => () => c)
  })

  test('anonymous functions', () => {
    const seeded = Fiona()
    const output = recurseData(seeded, {
      a: () => 10,
      b: seeded => seeded.data.a * 2,
      c: () => seeded => seeded.data.b * 2 + 10,
      d: () => () => ({ e: { f: () => () => 8 } }),
      g: ({ data }) => data.d.e.f * 3
    })
    expect(output).toEqual({ a: 10, b: 20, c: 50, d: { e: { f: 8 } }, g: 24 })
    expect(seeded.data).toBe(undefined)
  })

  test('Fiona.Fn', () => {
    const fionaConstructor = Fiona().constructor
    const fionaNumber = jest.fn(Fiona.Number)
    const fionaNumberInstance = jest.fn(Fiona.Number({ max: 10 }))
    const factory = jest.fn(() => Fiona.Number)

    Fiona(1).object(
      {
        a: fionaNumber,
        b: fionaNumberInstance,
        c: fionaNumber,
        d: fionaNumber,
        e: factory,
        f: () => {
          return () => {
            return 123
          }
        },
        g: () => {
          return 345
        }
      },
      {
        g: fionaNumber
      }
    )

    expect(fionaNumber.mock.calls.length).toBe(4)
    expect(fionaNumberInstance.mock.calls[0][0].constructor).toBe(
      fionaConstructor
    )
    expect(fionaNumberInstance.mock.calls[0][1]).toBe(undefined)

    expect(factory.mock.calls[0][0].constructor).toBe(fionaConstructor)
    expect(factory.mock.calls[0][1]).toBe(undefined)

    expect(fionaNumber.mock.calls[0][0].constructor).toBe(fionaConstructor)
    expect(fionaNumber.mock.calls[0][1]).toBe(undefined)

    expect(fionaNumber.mock.calls[1][0].constructor).toBe(fionaConstructor)
    expect(fionaNumber.mock.calls[1][1]).toBe(undefined)

    expect(fionaNumber.mock.calls[3][0].constructor).toBe(fionaConstructor)
    expect(fionaNumber.mock.calls[3][1]).toBe(undefined)
  })
})
