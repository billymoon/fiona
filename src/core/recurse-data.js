const prng = require('./prng-xor')
const { type } = require('../utils')
const RecursorArguments = require('./recursor-arguments')

module.exports = (fiona, initseed, seeded) => {
  const recurseData = (originalInput, position, currentInput, currentindex) => {
    if (currentInput === undefined && (position === 'data' || position === 'data[0]')) {
      currentInput = originalInput
    }
    //  else if (currentInput === undefined && position === '() => data') {
    //   currentInput = recurseFunction(originalInput, originalInput, position, currentindex)
    // }

    if (type(currentInput) === 'Object') {
      return recurseObject(currentInput, originalInput, position)
    } else if (type(currentInput) === 'Array') {
      return recurseArray(currentInput, originalInput, position)
    } else if (type(currentInput) === 'Function') {
      return recurseFunction(currentInput, originalInput, position, currentindex)
    } else {
      return currentInput
    }
  }

  const arr = (qty, callback) => {
    // TODO: document passing options object to arr
    if (type(qty) === 'Object') {
      return Array(seeded.number(qty)).fill(callback)
    } else {
      return Array(seeded.clone().data(qty)).fill(callback)
    }
  }

  const recurseObject = (currentInput, originalInput, position) => {
    Object.keys(currentInput).forEach(key => {
      const pos = `${position}.${key}`
      currentInput[key] = recurseData(originalInput, pos, currentInput[key], null)
    })
    return currentInput
  }

  const recurseArray = (currentInput, originalInput, position) => {
    return currentInput.map((item, index) => {
      const m = position.match(/^data\[(\d+)\]$/)
      const pos = m ? `data[${1 * m[1] + index}]` : `${position}[${index}]`
      if (item !== undefined) {
        return recurseData(originalInput, pos, item, index)
      } else {
        return undefined
      }
    })
  }

  const handleFunction = (position, data) => {
    return new RecursorArguments(seeded, position, data, fiona, initseed, prng, arr)
  }

  const recurseFunction = (currentInput, originalInput, position, currentindex) => {
    return recurseData(originalInput, position, currentInput(handleFunction(position, originalInput), currentindex), currentindex)
  }

  return { handleFunction, recurseData }
}
