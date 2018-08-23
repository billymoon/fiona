const { type } = require('./utils')

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
  // TODO: re-introduce recursor arguments class to identify auto calling functions
  return recurseData(seeded, original, position, current({
    // TODO: is it useful to return parent here..?
    // parent: seeded,
    position,
    // new seeded.constructor =~ new Moon =~ fiona
    seeded: new seeded.constructor(`${position}/${seeded.info().initseed}`)
  }))
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
