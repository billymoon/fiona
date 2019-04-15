import types from './types.js'

const sets = {}

const INTS = () => [{ type: types.RANGE, from: 48, to: 57 }]

const WORDS = () => {
  return [
    { type: types.CHAR, value: 95 },
    { type: types.RANGE, from: 97, to: 122 },
    { type: types.RANGE, from: 65, to: 90 }
  ].concat(INTS())
}

const WHITESPACE = () => {
  return [
    { type: types.CHAR, value: 9 },
    { type: types.CHAR, value: 10 },
    { type: types.CHAR, value: 11 },
    { type: types.CHAR, value: 12 },
    { type: types.CHAR, value: 13 },
    { type: types.CHAR, value: 32 },
    { type: types.CHAR, value: 160 },
    { type: types.CHAR, value: 5760 },
    { type: types.RANGE, from: 8192, to: 8202 },
    { type: types.CHAR, value: 8232 },
    { type: types.CHAR, value: 8233 },
    { type: types.CHAR, value: 8239 },
    { type: types.CHAR, value: 8287 },
    { type: types.CHAR, value: 12288 },
    { type: types.CHAR, value: 65279 }
  ]
}

const NOTANYCHAR = () => {
  return [
    { type: types.CHAR, value: 10 },
    { type: types.CHAR, value: 13 },
    { type: types.CHAR, value: 8232 },
    { type: types.CHAR, value: 8233 }
  ]
}

// Predefined class objects.
sets.words = () => ({ type: types.SET, set: WORDS(), not: false })
sets.notWords = () => ({ type: types.SET, set: WORDS(), not: true })
sets.ints = () => ({ type: types.SET, set: INTS(), not: false })
sets.notInts = () => ({ type: types.SET, set: INTS(), not: true })
sets.whitespace = () => ({ type: types.SET, set: WHITESPACE(), not: false })
sets.notWhitespace = () => ({ type: types.SET, set: WHITESPACE(), not: true })
sets.anyChar = () => ({ type: types.SET, set: NOTANYCHAR(), not: true })

export default sets
