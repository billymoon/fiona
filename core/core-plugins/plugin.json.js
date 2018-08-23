const json = ({ seeded }, input, ...args) => {
  return JSON.stringify(seeded.object(input), ...args)
}

module.exports = json