const RecurseArguments = require('./arguments')

const recurseObject = (seeded, original, position, current, value) => {
  Object.keys(current).forEach(key => {
    const nextPosition = `${position}.${key}`
    current[key] = recurseData(seeded, original, nextPosition, current[key], value)
  })
  return current
}

const recurseArray = (seeded, original, position, current, value) => {
  return current.map((item, index) => {
    const nextPosition = `${position}[${index}]`
    return item === undefined ? undefined : recurseData(seeded, original, nextPosition, item, index)
  })
}

const recurseFunction = (seeded, original, position, current, value) => {
  const recurseArguments = new RecurseArguments(seeded, position)
  return recurseData(seeded, original, position, current(recurseArguments, value), value)
}

const recurseData = (seeded, original, position = 'root', current, value) => {
  if (current === undefined && position === 'root') {
    current = original
  }

  if (typeof current === 'object' && current.constructor === Object) {
    return recurseObject(seeded, original, position, current, value)
  } else if (typeof current === 'object' && current.constructor === Array) {
    return recurseArray(seeded, original, position, current, value)
  } else if (typeof current === 'function') {
    return recurseFunction(seeded, original, position, current, value)
  } else if (typeof current === 'object' && current.constructor === RegExp) {
    return seeded.regex ? seeded.regex(current) : current
  } else {
    return current
  }
}

module.exports = recurseData
