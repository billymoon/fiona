import fiona from './src/fiona'

import './plugins'

console.log([952684, 2001635, 932955].map(seed => fiona(seed).data({
  age: ({ seeded }) => seeded.number(100),
  name: ({ seeded }) => seeded.name(),
  favouriteColor: ({ seeded }) => seeded.oneOf(['red', 'pink', 'orange', 'green', 'blue'])
})))
