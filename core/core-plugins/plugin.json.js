const json = ({ seeded }, input, ...args) => {
  return JSON.stringify(input === undefined ? seeded.value() : seeded.object(input), ...args)
}

module.exports = json