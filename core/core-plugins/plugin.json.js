const json = ({ seeded }, input, ...args) => {
  // TODO: should json method use seeded.value if no input is specified?
  return JSON.stringify(seeded.object(input), ...args)
}

module.exports = json