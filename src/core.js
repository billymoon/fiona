function Moon (initseed) {
  const data = {};

  let seed = initseed || Math.random()

  const GetSet = (val, defaultVal) => newVal => {
    if (newVal === undefined) {
      return val
    } else {
      if (newVal === null) {
        val = defaultVal
      } else {
        val = newVal
      }
      return this
    }
  }
  const RunSet = (fn, defaultFn) => newFn => {
    if (newFn === undefined) {
      return fn()
    } else {
      if (newFn === null) {
        fn = defaultFn
      } else {
        fn = newFn
      }
      return this
    }
  }

  const default_prng = () => {
    const mix = seed => (seed * 9301 + 49297) % 233280
    return (seed = mix(mix(seed))) / 233280;
  }

  let prng = default_prng

  this.prng = RunSet(prng, default_prng)
  this.seed = GetSet(seed, initseed)
  /*
  this.prng = prngin => {
    if (prngin === undefined) {
      return prng()
    } else {
      if (prngin === null) {
        prng = default_prng
      } else {
        prng = prngin
      }
      return this
    }
  }
  */

  //this.default_weighting = i => i;

  // TODO: merge reset into this
  // this.seed = seedin => seedin === undefined ? seed : seedin === null ? this.reset() : this.reset(seedin)

  this.info = () => ({
    seed,
    initseed
  })

  this.data = function (input) {
    if (input) {
      Object.keys(input).forEach(key => {
        const value = input[key];
        data[key] = typeof value === 'function' ? value.bind(this)(data, this) : value;
      });
      return this;
    } else {
      return data;
    }
  };

  this.reset = function (newseed) {
    seed = newseed !== undefined ? newseed : initseed;
    return this;
  };

  this.callback = function (cb) {
    return cb.bind(this)(data, this);
  };

  this.clone = function (salt) {
    return fiona(initseed).reset(seed + (salt || 0)).callback((me, myself) => {
      myself.data(data);
      return myself;
    });
  };

  return this;
}

Moon.prototype = {
  constructor: Moon
};

const fiona = (...args) => new Moon(...args)

fiona.version = '__VERSION__';

fiona.fn = Moon.prototype

export default fiona
