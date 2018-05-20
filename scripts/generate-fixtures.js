const fiona = require('../src')
require('../src/plugins')

fiona.plugin('fixture', ({ seeded }, { seed }) => ({
  seed: seed,
  numbers: () => {
    const seeded = fiona(seed)
    return Array(5).fill(null).map(() => seeded.number())
  },
  randoms: () => {
    const seeded = fiona(seed)
    return Array(5).fill(null).map(() => seeded.random())
  }
}))

const data = fiona().chain({
  'fionas number': fiona.call('fixture', { seed: 952684 }),
  'short string': fiona.call('fixture', { seed: 'short string 1' }),
  'long string': fiona.call('fixture', { seed: 'long string 1 lorem ipsum sit amet decorum rex quandum et futurus veni vedi vici' })
}).json(2)

console.log(data)