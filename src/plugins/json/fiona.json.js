const fiona = require('../../')

fiona.plugin('toJSON', ({ seeded }) => seeded.value())
fiona.plugin('json', ({ seeded }, indent) => JSON.stringify(seeded, null, indent))
