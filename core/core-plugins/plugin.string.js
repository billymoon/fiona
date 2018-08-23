const recurseData = require('../recurse-data')

const string = ({ seeded }, [a, ...b], ...c) => {
  const reduced = b.reduce((memo, item, index) => memo.concat(c[index], item), [a])
  return recurseData(seeded, reduced).join('')
}

module.exports = string