const type = item => Object.prototype.toString.call(item).slice(8, -1)

const processSeed = inputSeed => {
  if (type(inputSeed) === 'String') {
    // https://github.com/chancejs/chancejs/blob/b1b61100383bc9bfd27907c239e2f1437010e44e/chance.js#L40
    let seed = 0
    for (let i = 0; i < inputSeed.length; i++) {
      let hash = 0
      for (let j = 0; j < inputSeed.length; j++) {
        hash = inputSeed.charCodeAt(j) + (hash << 6) + (hash << 16) - hash
      }
      seed += hash
    }
    return seed
  } else {
    return inputSeed
  }
}

module.exports = {
  type,
  processSeed
}
