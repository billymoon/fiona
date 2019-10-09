// define default distribution method as passthrough
const defaultDistribution = i => i

export default seeded => {
  // define initial distribution to be default distribution
  let distribution = defaultDistribution

  // if passed function, set new distribution method
  // if passed null, reset distribution method to default passthrough
  // else call distribution function with passed argument
  return newVal => {
    if (typeof newVal === 'function') {
      distribution = newVal
      return seeded
    } else if (newVal === null) {
      distribution = defaultDistribution
      return seeded
    } else {
      return distribution(newVal)
    }
  }
}
