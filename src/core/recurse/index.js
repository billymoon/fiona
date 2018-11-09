const RecurseArguments = require('./arguments')
const { Register, registered } = require('../register')

// TODO: can the recursor be simplified, or at least variables names made more clear?
const recurseObject = (seeded, original, position, current) => {
  Object.keys(current).forEach(key => {
    const nextPosition = `${position}.${key}`
    current[key] = recurseData(seeded, original, nextPosition, current[key])
  })
  return current
}

const recurseArray = (seeded, original, position, current) => {
  return current.map((item, index) => {
    const nextPosition = `${position}[${index}]`
    return item === undefined ? undefined : recurseData(seeded, original, nextPosition, item, index)
  })
}

const recurseFunction = (seeded, original, position, current) => {
  const recurseSeeded = RecurseArguments(seeded, position)
  // TODO: if we are adding data property, why not also position property?
  // TODO: perhaps data (property on seeded instance during recursion) should be called root, and be a getter/setter and cleaned up after recursion?
  recurseSeeded.data = original
  const argOrNo = registered.indexOf(current) !== -1 ? undefined : recurseSeeded
  return recurseData(seeded, original, position, current(argOrNo))
}

const recurseData = (seeded, original, position = 'root', current) => {
  if (current === undefined && position === 'root') {
    current = original
  }

  if (typeof current === 'object' && current.constructor === Object) {
    return recurseObject(seeded, original, position, current)
  } else if (typeof current === 'object' && current.constructor === Array) {
    return recurseArray(seeded, original, position, current)
  } else if (typeof current === 'function') {
    return recurseFunction(seeded, original, position, current)
  } else if (typeof current === 'object' && current.constructor === RegExp) {
    return seeded.regex ? seeded.regex(current) : current
  } else {
    return current
  }
}

module.exports = recurseData
