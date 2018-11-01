const json = ({ seeded }, ...input) => {
  return JSON.stringify(seeded.object(seeded.value(), ...input))
}

module.exports = json