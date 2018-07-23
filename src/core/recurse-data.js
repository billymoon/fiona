const prng = require('./prng-xor')
const { type } = require('../utils')

module.exports = (fiona, initseed, seeded) => {
  const recurseData = (originalInput, position, currentInput, currentindex) => {
    // TODO: check if this logic is correct and better detection of root object
    if (currentInput === undefined && (position === 'data' || position === 'data[0]')) {
      currentInput = originalInput
    }

    const handler = {
      Object: recurseObject,
      Array: recurseArray,
      Function: recurseFunction
    }[type(currentInput)]

    return handler ? handler(currentInput, originalInput, position, currentindex) : currentInput
  }

  const arr = (qty, callback) => {
    // TODO: document passing options object to arr
    if (type(qty) === 'Object') {
      // if (qty.max === undefined) {
      //   qty.max = 10
      // }
      return Array(seeded.number(qty)).fill(callback)
    } else {
      // return Array(recurseData(qty)).fill(callback)
      return Array(seeded.clone().data(qty)).fill(callback)
      // console.log(seeded.clone().data(qty), qty)
      // return Array(qty).fill(callback)
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

  const handleFunction = (position, data) => ({
    me: seeded,
    pos: position,
    data,
    seeded: fiona(`${position}/${initseed}`, prng),
    // TODO: better handling of current index in callbacks of `arr`
    arr
  })

  const recurseFunction = (currentInput, originalInput, position, currentindex) => {
    return recurseData(originalInput, position, currentInput(handleFunction(position, originalInput), currentindex), currentindex)
  }

  return { handleFunction, recurseData }
}
