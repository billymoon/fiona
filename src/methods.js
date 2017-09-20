export const random = function () {
  return this.weighting(this.prng())
}

//

export const number = function (max = 1e6, min = 0) {
  return Math.floor(this.random() * max - min)
}

//

export const oneOf = function (arr) {
  return arr[Math.floor(this.random() * arr.length)]
}

//

const some = function (arr, predicate) {
  const length = arr.length
  for (let index = 0; index < length; index++) {
    if (predicate(arr[index], index, arr)) return true
  }
  return false
}

const shuffle = function (arrin, limit, random = Math.random) {
  if (limit === 0) { return [] }
  const arr = arrin.slice(0)
  const len = arr.length
  let rand, temp
  some(arr, function (value, index) {
    if (index >= limit) { return true }
    rand = index + Math.floor(random() * (len - index))
    temp = arr[index]
    arr[index] = arr[rand]
    arr[rand] = temp
  })
  return arr.slice(0, limit || len)
}

export const choose = function (qty, arr) {
  return shuffle(arr, qty, () => this.random())
}
