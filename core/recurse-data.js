const { type } = require('./utils')
const RecurseArguments = require('./recurse-arguments')

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

  if (type(current) === 'Object') {
    return recurseObject(seeded, original, position, current)
  } else if (type(current) === 'Array') {
    return recurseArray(seeded, original, position, current)
  } else if (type(current) === 'Function') {
    return recurseFunction(seeded, original, position, current)
  } else {
    return current
  }
}

module.exports = recurseData
