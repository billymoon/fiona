const packageJson = require('../../package')
const RecurseData = require('./recurse-data')
const Weighting = require('./weighting')
const PrngMethods = require('./prng-methods')
const { type } = require('../utils')

// define main constructor function
function Moon (seedin) {
  /* initialise seed */

  // set initial seed from constructor function initialisation argument, or random integer
  const initseed = seedin !== undefined ? seedin : Math.floor(Math.random() * 1e8)

  /* weighting */

  // define weighting method
  this.weighting = Weighting(this)

  /* initialise PRNG */

  const { state, reseed, random } = PrngMethods(this, initseed)

  this.state = state
  this.random = random
  this.reseed = reseed

  /* data builder */

  // TODO: perhaps build instance data instead of section input, and call functions with that?
  const { recurseData, handleFunction } = RecurseData(fiona, initseed, this)

  // define main data variable
  let data = null

  // define data builder method
  this.data = input => {
    let safety = 50
    while (type(input) === 'Function' && --safety) {
      input = input(handleFunction('() => data', data))
    }

    if (!safety) {
      throw Error('too much recursion in functions returning functions')
    }

    // TODO: handle mixed input types on multiple data calls
    switch (type(input)) {
      case 'Array': data = recurseData((data || []), `data[${(data || []).length}]`, (data || []).concat(input)); break
      case 'Object': data = recurseData(Object.assign({}, data || {}, input), 'data'); break
      case 'String': data = (data || '') + input; break
      // TODO: does it make sense to return stuff we don't recognise, or just throw?
      default: data = input
    }

    return data
  }

  // define data chaining method
  this.chain = input => {
    this.data(input)
    return this
  }

  // define value method to get data off chain
  this.value = () => data

  // define callback method to execute arbitrary expressions in a chain
  this.callback = cb => cb.bind(this)(this)

  /* info */

  // define info method to report initial seed
  this.info = () => ({ initseed })

  /* clone */

  // define clone method to fork current state
  this.clone = () => fiona(initseed).state(this.state())

  // this.string = ([a, ...b], ...c) => a + b.map((str, i) => (typeof c[i] === 'function' ? this.data(c[i]) : c[i]) + str).join('')

  return this
}

// define main function
const fiona = (...args) => new Moon(...args)

// TODO: don't reuquire whole package json just to get version string
fiona.version = packageJson.version

// set up self referencial prototype chain with jQuery like plugin architecture
fiona.fn = Moon.prototype = { constructor: Moon }

fiona.plugin = (name, fn) => {
  fiona.fn[name] = function (...args) { return fn({ seeded: this }, ...args) }
  fiona[name] = (...args) => fiona.call(name, ...args)
  if (name === 'name') {
    console.log(fiona[name])
  }
  // Object.keys(fiona.fn).filter(i=>i!=='constructor').map(i=> )
}

// TODO: should seeded carry weighting of parent? is it possible?
// fiona.call = (cmd, ...args) => (first, ...args) => ((first || {}).seeded || fiona(first, ...args))[cmd](...args)
fiona.call = (cmd, ...args) => first => {
  const { seeded } = first || { seeded: fiona() }
  return seeded[cmd](...args)
}

fiona.random = (...args) => fiona.call('random', ...args)

// utility to create seeded object to call plugin functions with
fiona.fn.seeded = function () {
  return {
    seeded: this
  }
}

// fiona.string = (...args) => fiona.call('string', ...args)

// export the main function
module.exports = fiona
