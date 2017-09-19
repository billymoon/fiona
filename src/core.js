function Moon (initseed) {
  const GetSet = (defaultVal, getter, setter) => newVal => {
    if (newVal === undefined) {
      return getter();
    } else {
      if (newVal === null) {
        setter(defaultVal);
      } else {
        setter(newVal);
      }
      return this;
    }
  };

  //
  const data = {};

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

  //
  const defaultPrng = () => {
    const mix = seed => (seed * 9301 + 49297) % 233280;
    return (seed = mix(mix(seed))) / 233280;
  };

  let prng = defaultPrng;

  this.prng = GetSet(defaultPrng, () => prng(), newprng => (prng = newprng));

  //
  let seed = initseed || Math.random();

  this.seed = GetSet(initseed, () => seed, newseed => (seed = newseed));

  //
  const defaultWeighting = i => i;

  let weighting = defaultWeighting;

  this.weighting = newVal => {
    if (typeof newVal === 'function') {
      weighting = newVal;
      return this;
    } else if (newVal === null) {
      weighting = defaultWeighting;
      return this;
    } else {
      return weighting(newVal);
    }
  };
  // GetSet(defaultWeighting, () => weighting(), newWeighting => typeof newWeighting === 'function' ? (weighting = newWeighting) : weighting());

  //
  this.info = () => ({
    seed,
    initseed
  });

  //
  this.callback = function (cb) {
    return cb.bind(this)(data, this);
  };

  //
  this.clone = function (salt) {
    return fiona(initseed).seed(seed + (salt || 0)).callback((me, myself) => {
      myself.data(data);
      return myself;
    });
  };

  return this;
}

Moon.prototype = {
  constructor: Moon
};

const fiona = (...args) => new Moon(...args);

fiona.version = '__VERSION__';

fiona.fn = Moon.prototype;

export default fiona;
