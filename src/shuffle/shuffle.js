const shuffle = ({ seeded }, arr, { qty } = {}) => seeded.choose(typeof qty !== 'undefined' ? qty : arr.length, arr)

module.exports = shuffle
