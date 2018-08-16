const fiona = require('../../')

const string = ({ seeded }, [a, ...b], ...c) => {
  const reduced = b.reduce((memo, item, index) => memo.concat(c[index], item), [a])
  return seeded.data(reduced).join('')
}

fiona.plugin('string', string)
