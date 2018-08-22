const { type } = require('../utils')

const object = ({ seeded }, obj) => {

  if (type(obj) !== 'Object') {
    throw Error('first argument of fiona.object must be an Object')
  }

  const recurseObject = (originalInput, position, currentInput) => {
    Object.keys(currentInput).forEach(key => {
      const nextPosition = `${position}.${key}`
      currentInput[key] = recurseData(originalInput, nextPosition, currentInput[key])
    })
    return currentInput
  }

  const recurseArray = (originalInput, position, currentInput) => {
    return currentInput.map((item, index) => {
      const nextPosition = `${position}[${index}]`
      return item === undefined ? undefined : recurseData(originalInput, nextPosition, item, index)
    })
  }

  const recurseFunction = (originalInput, position, currentInput, currentindex) => {
    return recurseData(originalInput, position, currentInput(({
      // me: seeded,
      pos: position,
      // data: originalInput,
      // new seeded.constructor =~ new Moon =~ fiona
      seeded: new seeded.constructor(`${position}/${seeded.info().initseed}`)
    }), currentindex), currentindex)
  }

  const recurseData = (originalInput, position = 'root', currentInput, currentindex) => {
    if (currentInput === undefined && position === 'root') {
      currentInput = originalInput
    }

    if (type(currentInput) === 'Object') {
      return recurseObject(originalInput, position, currentInput)
    } else if (type(currentInput) === 'Array') {
      return recurseArray(originalInput, position, currentInput)
    } else if (type(currentInput) === 'Function') {
      return recurseFunction(originalInput, position, currentInput, currentindex)
    } else {
      return currentInput
    }
  }

  return recurseData(obj)
}

module.exports = object
