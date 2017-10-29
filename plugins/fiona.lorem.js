import fiona from '../src/fiona'

fiona.fn.lorem = function ({ qty = 15 } = {}) {
  let out = this.random() < 0.2 ? 'lorem ipsum ' : ''
  let words = []
  while (words.length < qty) {
    words = words.concat('dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' '))
  }
  let min = Math.ceil(qty - qty / 3)
  let max = Math.ceil(qty + qty / 3) - 2
  return out + this.choose(this.number(max, min), words).join(' ')
}

fiona.fn.sentence = function () {
  let para = this.lorem({ qty: 25 })
  return para[0].toUpperCase() + para.slice(1) + '.'
}

fiona.fn.para = function () {
  return Array(this.number(10, 1)).fill(0).map(i => this.sentence()).join('  ')
}
