const json = (seeded, ...input) => {
  // TODO: is it crazy to dock type the last two arguments of fiona.Json and pass to JSON.stringify?
  return JSON.stringify(seeded.object(...input))
}

module.exports = json