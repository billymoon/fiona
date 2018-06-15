const fiona = require('../../')

fiona.plugin('shuffle', ({ seeded }, arr, { qty } = {}) => seeded.choose(typeof qty !== 'undefined' ? qty : arr.length, arr))
