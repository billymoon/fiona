const json = (seeded, ...input) => {
  // TODO: is it crazy to dock type the last two arguments of Fiona.Json and pass to JSON.stringify?
  return JSON.stringify(seeded.object(...input))
}

export default json
