function Moon (initseed) {
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

  //
  let data = null

  const arr = (qty, callback) => {
    return Array(qty).fill(callback)
  }

  // TODO: perhaps build instance data instead of section input, and call functions with that?
  const recurseData = (input, position) => {
    const data = input
    const inception = (input, position) => {
      if (type(input) === 'Object') {
        Object.keys(input).forEach(key => {
          const pos = `${position}.${key}`
          input[key] = inception(input[key], pos)
        })
        return input
      } else if (type(input) === 'Array') {
        return input.map((item, index) => {
          const m = position.match(/^data\[(\d+)\]$/)
          const pos = m ? `data[${1 * m[1] + index}]` : `${position}[${index}]`
          return inception(item, pos)
        })
      } else if (type(input) === 'Function') {
        // TODO: add divider to seed input, requires update to tests
        const unique = this.clone().seed(position + initseed)
        return inception(input({ me: this, pos: position, data, unique, arr }), position)
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
        // TODO: ensure divider same as in `inception`
        const unique = this.clone().seed('() => data' + initseed)
        input = input({ me: this, pos: '() => data', data, unique, arr })
      }
      // TODO: handle mixed input types on multiple data calls
      if (type(input) === 'Array') {
        data = (data || []).concat(recurseData(input, `data[${(data || []).length}]`))
      } else if (type(input) === 'Object') {
        data = Object.assign({}, data || {}, recurseData(input, 'data'))
      } else {
        // TODO: does it make sense to return stuff we don't recognise, or just throw?
        data = input
      }
      return this
    } else {
      return data
    }
  }

  const processSeed = inputSeed => {
    if (typeof inputSeed === 'string') {
      const split = inputSeed.split('').map(item => item.charCodeAt(0))
      seed = split.pop()
      split.forEach(item => {
        seed = prng() + item
      })
      return seed
    } else {
      return inputSeed
    }
  }

  //
  const defaultPrng = () => {
    const mix = seed => (seed * 9301 + 49297) % 233280
    const res = (seed = mix(mix(seed))) / 233280
    return res
  }

  let prng = defaultPrng

  this.prng = GetSet(defaultPrng, () => prng(), newprng => (prng = newprng))

  //
  let seed
  seed = processSeed(initseed = initseed !== undefined ? initseed : Math.random())

  this.seed = GetSet(initseed, () => seed, newseed => (seed = processSeed(newseed)))

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

  //
  this.info = () => ({
    seed,
    initseed
  })

  //
  this.callback = function (cb) {
    return cb.bind(this)(data, this)
  }

  //
  this.clone = function (salt) {
    return fiona(initseed).seed(seed + (salt || 0)).callback((me, myself) => {
      // TODO: why should I not set the prng in the clone?
      // myself.prng(prng)
      myself.weighting(weighting)
      myself.data(data)
      return myself
    })
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
