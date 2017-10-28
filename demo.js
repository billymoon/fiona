import fiona from './src/fiona'

import './plugins'

fiona.weighted('clamp', i => i < 0.4 ? 0.4 : i > 0.6 ? 0.6 : i)

const data = fiona('moon').data(({ arr }) => arr(10, ({ seeded }) => {
  return seeded.weighted('clamp').number(100)
})).data()

console.log(data)
