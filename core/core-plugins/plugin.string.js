const string = ({ seeded }, [a, ...b], ...c) => {
  const reduced = b.reduce((memo, item, index) => memo.concat(c[index], item), [a])
  return seeded.object({ string: reduced }).string.join('')
}

module.exports = string