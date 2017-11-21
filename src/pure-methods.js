//

const number = function ({ max = 1e6, min = 0 } = {}) {
  return Math.floor((this.random() * (1 + max - min)) + min)
}

//
const chooser = (position, arr, weights) => {
  const calculatedWeights = arr.reduce((memo, value, index) => {
    memo.push((memo[index - 1] || 0) + (typeof weights[index] === 'number' ? weights[index] : 1))
    return memo
  }, [])

  const target = position * calculatedWeights[calculatedWeights.length - 1]

  // TODO: Binary Tree akin to: https://github.com/plantain-00/weighted-picker/blob/3cdd2c37856bc39c2304d7a597b237cecc845f7e/src/index.ts#L34
  let index

  calculatedWeights.every((weight, i) => {
    if (target > weight) {
      return true
    } else {
      index = i
      return false
    }
  })

  return index
}

const oneOf = function (arr, { weights = [] } = {}) {
  return arr[chooser(this.random(), arr, weights)]
}

const choose = function (qty, arr, { weights = [] } = {}) {
  const myArr = arr.slice(0)
  const myWeightings = weights.slice(0)
  return Array(qty || 0).fill(null).map((v, i) => {
    const index = chooser(this.random(), myArr, myWeightings)
    const result = myArr[index]
    myArr[index] = myArr[0]
    myArr.shift()
    return result
  })
}

module.exports = { number, oneOf, choose }
