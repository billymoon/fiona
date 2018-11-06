/* global test expect describe beforeEach */

// TODO: move tests closer to relevant source code
const recurseData = require('.')
const fiona = require('..')

// const fixtures = [
//   0.5129792850990683,
//   0.4320565277859832,
//   0.2474033479799532
// ]

describe('sanity', () => {
  test('javascript is javascript', () => {
    expect(true + true).toBe(2)
  })
})

// const recurseData = (seeded, original, position = 'root', data, value) => {

describe('basics', () => {
  test('fiona.Number', () => {
    expect(fiona(1).number()).toBe(458333)
  })

  test('fiona.Random', () => {
    expect(fiona(1).random()).toBe(0.4583325853842928)
  })

  test('fiona.Array', () => {
    expect(fiona(1).array(3, fiona.Number)).toEqual([349277,89810,57572])
  })

  test('fiona.String', () => {
    expect(fiona(1).string`${fiona.Number} ${fiona.Number} ${fiona.Number}`).toEqual(`89810 461785 913511`)
  })

  test('fiona.Object', () => {
    expect(fiona(1).object({
      a: fiona.Number,
      b: fiona.Number,
      c: fiona.Number
    })).toEqual({ a: 611259, b: 649633, c: 378387 })
  })

  test('fiona.fn', () => {
    const seeded = fiona()
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

  test('fiona.fn', () => {
    const fionaConstructor = fiona().constructor
    const fionaNumber = jest.fn(fiona.Number);
    const fionaNumberInstance = jest.fn(fiona.Number({ max: 10 }));
    const factory = jest.fn(() => fiona.Number);
    // [0, 1].forEach(item => mockCallback(item));
     
    // console.log(mockCallback.mock.calls[0])
    fiona(1).object({
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
      g: () => { return 345}
    }, {
      g: fionaNumber
    })
    // expect(fiona(1).object({
    //   a: fionaNumber,
    //   b: fionaNumber,
    //   c: fionaNumber
    // }, {
    //   d: fionaNumber
    // })).toEqual({ a: 611259, b: 649633, c: 378387, d: 318653 })

    expect(fionaNumber.mock.calls.length).toBe(4);
    // console.log(fionaNumber.mock.calls[0][0])
    // console.log(fiona().constructor)
    // console.log(fiona().constructor)
    expect(fionaNumberInstance.mock.calls[0][0].constructor).toBe(fionaConstructor);
    expect(fionaNumberInstance.mock.calls[0][1]).toBe(undefined);

    expect(factory.mock.calls[0][0].constructor).toBe(fionaConstructor);
    expect(factory.mock.calls[0][1]).toBe(undefined);

    expect(fionaNumber.mock.calls[0][0].constructor).toBe(fionaConstructor);
    expect(fionaNumber.mock.calls[0][1]).toBe(undefined);

    expect(fionaNumber.mock.calls[1][0].constructor).toBe(fionaConstructor);
    expect(fionaNumber.mock.calls[1][1]).toBe(undefined);

    expect(fionaNumber.mock.calls[3][0].constructor).toBe(fionaConstructor);
    expect(fionaNumber.mock.calls[3][1]).toBe(undefined);
  })

  test('fiona.Object fn', () => {
    expect(fiona(1).object(() => ({
      a: fiona.Number,
      b: fiona.Number,
      c: fiona.Number
    }))).toEqual({ a: 611259, b: 649633, c: 378387 })

    expect(fiona(1).object(() => () => ({
      a: fiona.Number,
      b: fiona.Number,
      c: fiona.Number
    }))).toEqual({ a: 611259, b: 649633, c: 378387 })

    expect(fiona(1).object(() => () => () => ({
      a: fiona.Number,
      b: fiona.Number,
      c: fiona.Number
    }))).toEqual({ a: 611259, b: 649633, c: 378387 })
  })
})
