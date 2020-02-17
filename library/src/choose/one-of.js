import chooser from './chooser.js'

const oneOf = (seeded, arr, { weights = [] } = {}) => {
  return arr[chooser(seeded.random(), arr, weights)]
}

export default oneOf
