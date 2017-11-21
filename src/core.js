const prng = require('./prng-xor')
const RecurseData = require('./recurse-data')

function Moon (seedin) {
  const initseed = seedin !== undefined ? seedin : Math.floor(Math.random() * 1e8)

  //
  const type = item => Object.prototype.toString.call(item).slice(8, -1)

  const processSeed = inputSeed => {
    if (type(inputSeed) === 'String') {
      // https://github.com/chancejs/chancejs/blob/b1b61100383bc9bfd27907c239e2f1437010e44e/chance.js#L40
      let seed = 0
      for (let i = 0; i < inputSeed.length; i++) {
        let hash = 0
        for (let j = 0; j < inputSeed.length; j++) {
          hash = inputSeed.charCodeAt(j) + (hash << 6) + (hash << 16) - hash
        }
        seed += hash
      }
      return seed
    } else {
      return inputSeed
    }
  }

  //
  this.clone = function () {
    return fiona(initseed).state(this.state())
  }

  //
  const defaultWeighting = i => i

  let weighting = defaultWeighting

  this.weighting = newVal => {
    if (type(newVal) === 'Function') {
      weighting = newVal
      return this
    } else if (newVal === null) {
      weighting = defaultWeighting
      return this
    } else {
      return weighting(newVal)
    }
  }

  // 
  let { reseed, getState, setState, random } = prng(0)

  reseed(processSeed(initseed))

  this.reseed = function (seed) {
    reseed(processSeed(seed === null ? initseed : seed))
    return this
  }

  const initialState = getState()

  this.state = newVal => {
    if (newVal === undefined) {
      return getState()
    } else {
      if (newVal === null) {
        setState(initialState)
      } else {
        setState(newVal)
      }
      return this
    }
  }

  this.random = () => this.weighting(random())

  //
  let data = null

  // TODO: perhaps build instance data instead of section input, and call functions with that?
  const { recurseData, handleFunction } = RecurseData(type, fiona, initseed, prng, this)

  this.data = function (input) {
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

  this.chain = function (input) {
    this.data(input)
    return this
  }

  this.value = function () {
    return data
  }

  //
  this.info = () => ({
    initseed
  })

  //
  this.callback = function (cb) {
    return cb.bind(this)(data, this)
  }

  return this
}

Moon.prototype = {
  constructor: Moon
}

const fiona = (...args) => new Moon(...args)

fiona.version = '__VERSION__'

fiona.fn = Moon.prototype

module.exports = fiona
