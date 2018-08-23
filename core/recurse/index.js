const RecurseArguments = require('./arguments')

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
  const recurseArguments = new RecurseArguments(seeded, position)
  return recurseData(seeded, original, position, current(recurseArguments))
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
