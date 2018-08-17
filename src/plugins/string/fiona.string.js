const fiona = require('../../')

const string = ({ seeded }, [a, ...b], ...c) => {
  const reduced = b.reduce((memo, item, index) => memo.concat(c[index], item), [a])
  // console.log(1, a, b, c)
  // console.log(2, reduced)
  // console.log(2.1, reduced instanceof Array)
  // console.log(3, seeded.data(reduced))
  // console.log(3.1, typeof seeded.data(reduced))
  // console.log(4, typeof seeded.data(reduced))
  return seeded.data(reduced).join('')
}

fiona.plugin('string', string)
