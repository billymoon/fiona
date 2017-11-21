const prng = require('./prng-xor')
const RecurseData = require('./recurse-data')
const Weighting = require('./weighting')
const PrngMethods = require('./prng-methods')
const { type } = require('./utils')

// define main constructor function
function Moon (seedin) {
  /*** initialise seed ***/

  // set initial seed from constructor function initialisation argument, or random integer
  const initseed = seedin !== undefined ? seedin : Math.floor(Math.random() * 1e8)

  /*** weighting ***/

  // define weighting method
  this.weighting = Weighting(this)

  /*** initialise PRNG ***/

  const { state, reseed, random } = PrngMethods(this, initseed)

  this.state = state
  this.random = random
  this.reseed = reseed

  /*** data builder ***/

  // TODO: perhaps build instance data instead of section input, and call functions with that?
  const { recurseData, handleFunction } = RecurseData(fiona, initseed, this)

  /*** data builder ***/

  // TODO: perhaps build instance data instead of section input, and call functions with that?

  // define main data variable
  let data = null

  // define data builder method
  this.data = input => {
    if (type(input) === 'Function') {
      input = input(handleFunction('() => data', data))
    }

    // TODO: handle mixed input types on multiple data calls
    switch (type(input)) {
      case 'Array': data = recurseData((data || []).concat(input), `data[${(data || []).length}]`); break;
      case 'Object': data = recurseData(Object.assign({}, data || {}, input), 'data'); break;
      // TODO: does it make sense to return stuff we don't recognise, or just throw?
      default: data = input;
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
  this.callback = cb => cb.bind(this)(data, this)

  /*** info ***/

  // define info method to report initial seed
  this.info = () => ({ initseed })

  /*** clone ***/

  // define clone method to fork current state
  this.clone = () => fiona(initseed).state(this.state())

  return this
}

// define main function
const fiona = (...args) => new Moon(...args)

// TODO: add some babel replace function to update version string
// define library version
fiona.version = '__VERSION__'

// set up self referencial prototype chain with jQuery like plugin architecture
fiona.fn = Moon.prototype = { constructor: Moon }

// export the main function
module.exports = fiona
