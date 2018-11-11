// TODO: document Fiona.String
const recurseData = require('../../recurse')

// TODO: can injected values be same as result of Fiona.Array?
const string = (seeded, [a, ...b], ...c) => {
  const reduced = b.reduce((memo, item, index) => memo.concat(c[index], item), [
    a
  ])
  return recurseData(seeded, reduced).join('')
}

module.exports = string
