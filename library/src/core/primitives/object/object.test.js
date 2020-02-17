import test from 'ava'
import Fiona from '../..'

// TODO: test passing multiple arguments and executing functions to resolve objects
let seeded

test.beforeEach(() => {
  seeded = Fiona('moon')
})

test.serial('should return object', t => {
  t.is(typeof seeded.object({}), 'object')
})

test.serial('should return nested object', t => {
  const expected = JSON.stringify(seeded.object({ a: { b: 1 } }))
  const fixture = `{"a":{"b":1}}`
  t.is(expected, fixture)
})

test.serial('should return handled function', t => {
  const expected = JSON.stringify(seeded.object({ a: () => 1 }))
  const fixture = `{"a":1}`
  t.is(expected, fixture)
})

test.serial('should return handled function with seeded value', t => {
  const expected = JSON.stringify(
    seeded.object({ a: seeded => seeded.random() })
  )
  const fixture = `{"a":0.7904736091338441}`
  t.is(expected, fixture)
})

test.serial('should handle functions with recursion', t => {
  const expected = JSON.stringify(
    seeded.object({ a: () => seeded => seeded.random() })
  )
  const fixture = `{"a":0.7904736091338441}`
  t.is(expected, fixture)
})

test.serial('should handle deeply nested object with function property', t => {
  const expected = JSON.stringify(
    seeded.object({ a: { b: seeded => seeded.random() } })
  )
  const fixture = `{"a":{"b":0.530906858169896}}`
  t.is(expected, fixture)
})

// TODO: can we provide position another way..?
// test.serial('should call function with current position', t => {
//   const expected = JSON.stringify(seeded.object({ a: ({ position }) => position }))
//   const fixture = `{"a":"root.a"}`
//   t.is(expected, fixture)
// })

// test.serial('should call function with current position with recursion', t => {
//   const expected = JSON.stringify(seeded.object({ a: ({ position }) => position }))
//   const fixture = `{"a":"root.a"}`
//   t.is(expected, fixture)
// })

// test.serial('should call function with current position on deeply nested object', t => {
//   const expected = JSON.stringify(seeded.object({ a: { b: ({ position }) => position } }))
//   const fixture = `{"a":{"b":"root.a.b"}}`
//   t.is(expected, fixture)
// })

// test.serial('should throw when non object passed', t => {
//   [[], /a/, t => {}, 1, true, false, ''].forEach(item => {
//     t.is(() => {
//       seeded.object(item)
//     }).toThrow('arguments of Fiona.Object must be an Object or function that returns an Object')
//   })
// })

test.serial('should handle array', t => {
  const expected = JSON.stringify(seeded.object({ a: [1, 2, 3] }))
  const fixture = `{"a":[1,2,3]}`
  t.is(expected, fixture)
})

test.serial('should handle array with undefined values', t => {
  const expected = JSON.stringify(seeded.object({ a: [1, undefined, 3] }))
  const fixture = `{"a":[1,null,3]}`
  t.is(expected, fixture)
})

test.serial(
  'should handle complex nested objects with arrays and functions',
  t => {
    const expected = JSON.stringify(
      seeded.object({
        a: () => [
          0,
          1,
          undefined,
          3,
          () => () => Fiona.Random,
          {
            b: () => ['b0', 'b1', 'b2', () => 'b3', () => Fiona.Random]
          },
          [6, 7, () => Fiona.Random]
        ]
      })
    )
    const fixture = `{"a":[0,1,null,3,0.8738715024077667,{"b":["b0","b1","b2","b3",0.82669865890718]},[6,7,0.24771976435916487]]}`
    t.is(expected, fixture)
  }
)

test.serial('should execute plugins defined as Fiona.MyPlugin()', t => {
  const expected = JSON.stringify(seeded.object({ a: Fiona.Random() }))
  const fixture = `{"a":0.7904736091338441}`
  t.is(expected, fixture)
})

test.serial('should execute plugins defined as Fiona.MyPlugin (Random)', t => {
  const expected = JSON.stringify(seeded.object({ a: Fiona.Random }))
  const fixture = `{"a":0.7904736091338441}`
  t.is(expected, fixture)
})

test.serial('should execute plugins defined as Fiona.MyPlugin (Number)', t => {
  const expected = JSON.stringify(seeded.object({ a: Fiona.Number }))
  const fixture = `{"a":790474}`
  t.is(expected, fixture)
})

test.serial(
  'should execute plugins defined as Fiona.MyPlugin({ argument: 1 })',
  t => {
    const expected = JSON.stringify(
      seeded.object({ a: Fiona.Number({ precision: -3 }) })
    )
    const fixture = `{"a":790000}`
    t.is(expected, fixture)
  }
)

// test.serial('should call functions with parent seeded instance', t => {
//   const expected = JSON.stringify(seeded.object({ a: ({ parent, seeded }) => [parent.info().initseed, seeded.info().initseed, seeded.object({ b: ({ parent, seeded })  => [parent.info().initseed, seeded.info().initseed] })] }))
//   const fixture = `{"a":790000}`
//   t.is(expected, fixture)
// })
