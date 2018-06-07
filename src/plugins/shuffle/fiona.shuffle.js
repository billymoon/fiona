const fiona = require('../../')

// inspired by: https://bost.ocks.org/mike/shuffle/
fiona.plugin('shuffle', ({ seeded }, originalArray, { limit = Infinity } = {}) => {
  const arr = Object.assign([], originalArray)
  let m = arr.length, t, i

  while (m && arr.length - m < limit) {
    i = Math.floor(seeded.random() * m--)
    t = arr[m]
    arr[m] = arr[i]
    arr[i] = t
  }

  return arr
})
