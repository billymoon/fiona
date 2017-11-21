module.exports = (type, fiona, initseed, prng, self) => {
  const recurseData = (originalInput, position, currentInput, currentindex) => {
    if (type(currentInput) === 'Undefined') {
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
    return Array(qty).fill(callback)
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
      return recurseData(originalInput, pos, item, index)
    })
  }

  const handleFunction = (position, data) => ({
    me: self,
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
