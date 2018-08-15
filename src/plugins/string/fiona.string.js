const fiona = require('../../')

fiona.plugin('string', ({ seeded }, [a, ...b], ...c) => a + b.map((str, i) => (typeof c[i] === 'function' ? seeded.data(c[i]) : c[i]) + str).join(''))
