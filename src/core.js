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
  const data = {}

  // TODO: perhaps build intance data instead of section input, and call functions with that?
  const recurseData = (input, position) => {
    const data = input
    const inception = (input, position) => {
      if (type(input) === 'Object') {
        Object.keys(input).forEach(key => {
          const pos = `${position}.${key}`
          const unique = this.clone().seed(pos + initseed)
          input[key] = type(input[key]) === 'Function' ? input[key]({ me: this, pos, data, unique }) : inception(input[key], pos)
        })
        return input
      } else if (type(input) === 'Array') {
        return input.map((item, index) => {
          const pos = `${position}[${index}]`
          const unique = this.clone().seed(pos + initseed)
          return type(item) === 'Function' ? item({ me: this, pos, data, unique }) : inception(item, pos)
        })
      } else {
        return input
      }
    }
    return inception(input, position)
  }

  this.data = function (input) {
    if (input) {
      Object.assign(data, recurseData(input, 'data'))
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
      return initseed
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
  seed = processSeed(initseed) || Math.random()

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
