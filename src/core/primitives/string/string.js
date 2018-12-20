// TODO: document Fiona.String
const recurseData = require('../../recurse')

// TODO: can injected values be same as result of Fiona.Array?
const string = (seeded, [first, ...rest], ...variables) => {
  const variable = recurseData(seeded, variables)
  return rest.reduce(
    (memo, item, index) => `${memo}${variable[index]}${item}`,
    first
  )
}

module.exports = string
