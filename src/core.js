import prng from './prng-xor'

function Moon (seedin) {
  const initseed = seedin !== undefined ? seedin : Math.floor(Math.random() * 1e8)

  //
  const type = item => Object.prototype.toString.call(item).slice(8, -1)

  //
  const GetSet = (defaultVal, getter, setter) => newVal => {
    if (newVal === undefined) {
      return getter()
    } else {
      if (newVal === null) {
        setter(defaultVal)
      } else {
        setter(newVal)
      }
      return this
    }
  }

  const processSeed = inputSeed => {
    if (typeof inputSeed === 'string') {
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
    if (typeof newVal === 'function') {
      weighting = newVal
      return this
    } else if (newVal === null) {
      weighting = defaultWeighting
      return this
    } else {
      return weighting(newVal)
    }
  }

  let { random, reseed, getState, setState } = prng(0)

  this.random = () => this.weighting(random())

  reseed(processSeed(initseed))

  this.state = GetSet(getState(), getState, setState)

  this.reseed = function (seed) {
    reseed(processSeed(seed === null ? initseed : seed))
    return this
  }

  //
  let data = null

  const arr = (qty, callback) => {
    return Array(qty).fill(callback)
  }

  // TODO: perhaps build instance data instead of section input, and call functions with that?
  const recurseData = (input, position, currentindex) => {
    const data = input
    const inception = (input, position, currentindex) => {
      if (type(input) === 'Object') {
        Object.keys(input).forEach(key => {
          const pos = `${position}.${key}`
          input[key] = inception(input[key], pos, null)
        })
        return input
      } else if (type(input) === 'Array') {
        return input.map((item, index) => {
          const m = position.match(/^data\[(\d+)\]$/)
          const pos = m ? `data[${1 * m[1] + index}]` : `${position}[${index}]`
          return inception(item, pos, index)
        })
      } else if (type(input) === 'Function') {
        const seeded = fiona(`${position}/${initseed}`, prng)
        // TODO: better handling of current index in callbacks of `arr`
        return inception(input({ me: this, pos: position, data, seeded, arr }, currentindex), position, currentindex)
      } else {
        return input
      }
    }
    return inception(input, position)
  }

  this.data = function (input) {
    if (input) {
      if (type(input) === 'Function') {
        // TODO: merge this with repeated code in `inception`
        const seeded = fiona(`() => data/${initseed}`, prng)
        input = input({ me: this, pos: '() => data', data, seeded, arr })
      }
      // TODO: handle mixed input types on multiple data calls
      if (type(input) === 'Array') {
        data = (data || []).concat(recurseData(input, `data[${(data || []).length}]`, 0))
      } else if (type(input) === 'Object') {
        data = Object.assign({}, data || {}, recurseData(input, 'data', null))
      } else {
        // TODO: does it make sense to return stuff we don't recognise, or just throw?
        data = input
      }
      return this
    } else {
      return data
    }
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

export default fiona
