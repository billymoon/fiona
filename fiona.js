'use strict';

function Moon (initseed) {
  //
  const type = item => Object.prototype.toString.call(item).slice(8, -1);

  //
  const GetSet = (defaultVal, getter, setter) => newVal => {
    if (newVal === undefined) {
      return getter()
    } else {
      if (newVal === null) {
        setter(defaultVal);
      } else {
        setter(newVal);
      }
      return this
    }
  };

  //
  const data = {};

  // TODO: perhaps build intance data instead of section input, and call functions with that?
  const recurseData = (input, position) => {
    const data = input;
    const inception = (input, position) => {
      if (type(input) === 'Object') {
        Object.keys(input).forEach(key => {
          const pos = `${position}.${key}`;
          const unique = this.clone().seed(pos + initseed);
          input[key] = type(input[key]) === 'Function' ? input[key]({ me: this, pos, data, unique }) : inception(input[key], pos);
        });
        return input
      } else if (type(input) === 'Array') {
        return input.map((item, index) => {
          const pos = `${position}[${index}]`;
          const unique = this.clone().seed(pos + initseed);
          return type(item) === 'Function' ? item({ me: this, pos, data, unique }) : inception(item, pos)
        })
      } else {
        return input
      }
    };
    return inception(input, position)
  };

  this.data = function (input) {
    if (input) {
      Object.assign(data, recurseData(input, 'data'));
      return this
    } else {
      return data
    }
  };

  const processSeed = inputSeed => {
    if (typeof inputSeed === 'string') {
      const split = inputSeed.split('').map(item => item.charCodeAt(0));
      seed = split.pop();
      split.forEach(item => {
        seed = prng() + item;
      });
      return seed
    } else {
      return inputSeed
    }
  };

  //
  const defaultPrng = () => {
    const mix = seed => (seed * 9301 + 49297) % 233280;
    const res = (seed = mix(mix(seed))) / 233280;
    return res
  };

  let prng = defaultPrng;

  this.prng = GetSet(defaultPrng, () => prng(), newprng => (prng = newprng));

  //
  let seed;
  seed = processSeed(initseed) || Math.random();

  this.seed = GetSet(initseed, () => seed, newseed => (seed = processSeed(newseed)));

  //
  const defaultWeighting = i => i;

  let weighting = defaultWeighting;

  this.weighting = newVal => {
    if (typeof newVal === 'function') {
      weighting = newVal;
      return this
    } else if (newVal === null) {
      weighting = defaultWeighting;
      return this
    } else {
      return weighting(newVal)
    }
  };

  //
  this.info = () => ({
    seed,
    initseed
  });

  //
  this.callback = function (cb) {
    return cb.bind(this)(data, this)
  };

  //
  this.clone = function (salt) {
    return fiona$1(initseed).seed(seed + (salt || 0)).callback((me, myself) => {
      // TODO: why should I not set the prng in the clone?
      // myself.prng(prng)
      myself.weighting(weighting);
      myself.data(data);
      return myself
    })
  };

  return this
}

Moon.prototype = {
  constructor: Moon
};

const fiona$1 = (...args) => new Moon(...args);

fiona$1.version = '__VERSION__';

fiona$1.fn = Moon.prototype;

const random = function () {
  return this.weighting(this.prng())
};

//

const number = function (max = 1e6, min = 0) {
  return Math.floor((this.random() * (max - min)) + min)
};

//

const oneOf = function (arr) {
  return arr[Math.floor(this.random() * arr.length)]
};

//

const some = function (arr, predicate) {
  const length = arr.length;
  for (let index = 0; index < length; index++) {
    if (predicate(arr[index], index, arr)) return true
  }
  return false
};

const shuffle = function (arrin, limit, random = Math.random) {
  if (limit === 0) { return [] }
  const arr = arrin.slice(0);
  const len = arr.length;
  let rand, temp;
  some(arr, function (value, index) {
    if (index >= limit) { return true }
    rand = index + Math.floor(random() * (len - index));
    temp = arr[index];
    arr[index] = arr[rand];
    arr[rand] = temp;
  });
  return arr.slice(0, limit || len)
};

const choose = function (qty, arr) {
  return shuffle(arr, qty, () => this.random())
};


var methods = Object.freeze({
	random: random,
	number: number,
	oneOf: oneOf,
	choose: choose
});

Object.keys(methods).forEach(key => {
  fiona$1.fn[key] = methods[key];
});

module.exports = fiona$1;
