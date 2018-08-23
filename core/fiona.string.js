const recurseData = require('./recurse')

const string = ({ seeded }, [a, ...b], ...c) => {
  const reduced = b.reduce((memo, item, index) => memo.concat(c[index], item), [a])
  return recurseData(seeded, reduced).join('')
}

module.exports = string