(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("fiona", [], factory);
	else if(typeof exports === 'object')
		exports["fiona"] = factory();
	else
		root["fiona"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).default


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__methods__ = __webpack_require__(6);



Object.keys(__WEBPACK_IMPORTED_MODULE_1__methods__).forEach(key => {
  __WEBPACK_IMPORTED_MODULE_0__core_js__["a" /* default */].fn[key] = __WEBPACK_IMPORTED_MODULE_1__methods__[key]
})

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__core_js__["a" /* default */]);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prng_twister__ = __webpack_require__(4);


//
const type = item => Object.prototype.toString.call(item).slice(8, -1)

function Moon (seedin) {
  const initseed = seedin !== undefined ? seedin : Math.floor(Math.random() * 1e8)

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

  const { random, reseed, getState, setState } = Object(__WEBPACK_IMPORTED_MODULE_0__prng_twister__["a" /* default */])(0)

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
        const seeded = fiona(`${position}/${initseed}`)
        return inception(input({ me: this, pos: position, data, seeded, arr }), position)
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
        const seeded = fiona(`() => data/${initseed}`)
        input = input({ me: this, pos: '() => data', data, seeded, arr })
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

/* harmony default export */ __webpack_exports__["a"] = (fiona);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mersenne_twister__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mersenne_twister___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mersenne_twister__);


/* harmony default export */ __webpack_exports__["a"] = (seed => {
  const twister = new __WEBPACK_IMPORTED_MODULE_0_mersenne_twister___default.a(seed !== undefined ? seed : 0)
  return {
    random: () => twister.random(),
    reseed: seed => twister.init_seed(seed),
    getState: () => ({
      // N: twister.N,
      // M: twister.M,
      // MATRIX_A: twister.MATRIX_A,
      // UPPER_MASK: twister.UPPER_MASK,
      // LOWER_MASK: twister.LOWER_MASK,
      mt: twister.mt.slice(0),
      mti: twister.mti
    }),
    setState: newstate => {
      // twister.N = newstate.N
      // twister.M = newstate.M
      // twister.MATRIX_A = newstate.MATRIX_A
      // twister.UPPER_MASK = newstate.UPPER_MASK
      // twister.LOWER_MASK = newstate.LOWER_MASK
      twister.mt = newstate.mt
      twister.mti = newstate.mti
    }
  }
});


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
  https://github.com/banksean wrapped Makoto Matsumoto and Takuji Nishimura's code in a namespace
  so it's better encapsulated. Now you can have multiple random number generators
  and they won't stomp all over eachother's state.

  If you want to use this as a substitute for Math.random(), use the random()
  method like so:

  var m = new MersenneTwister();
  var randomNumber = m.random();

  You can also call the other genrand_{foo}() methods on the instance.

  If you want to use a specific seed in order to get a repeatable random
  sequence, pass an integer into the constructor:

  var m = new MersenneTwister(123);

  and that will always produce the same random sequence.

  Sean McCullough (banksean@gmail.com)
*/

/*
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.

   Before using, initialize the state by using init_seed(seed)
   or init_by_array(init_key, key_length).

   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:

     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.

     3. The names of its contributors may not be used to endorse or promote
        products derived from this software without specific prior written
        permission.

   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/

var MersenneTwister = function(seed) {
	if (seed == undefined) {
		seed = new Date().getTime();
	}

	/* Period parameters */
	this.N = 624;
	this.M = 397;
	this.MATRIX_A = 0x9908b0df;   /* constant vector a */
	this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
	this.LOWER_MASK = 0x7fffffff; /* least significant r bits */

	this.mt = new Array(this.N); /* the array for the state vector */
	this.mti=this.N+1; /* mti==N+1 means mt[N] is not initialized */

	if (seed.constructor == Array) {
		this.init_by_array(seed, seed.length);
	}
	else {
		this.init_seed(seed);
	}
}

/* initializes mt[N] with a seed */
/* origin name init_genrand */
MersenneTwister.prototype.init_seed = function(s) {
	this.mt[0] = s >>> 0;
	for (this.mti=1; this.mti<this.N; this.mti++) {
		var s = this.mt[this.mti-1] ^ (this.mt[this.mti-1] >>> 30);
		this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253)
		+ this.mti;
		/* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
		/* In the previous versions, MSBs of the seed affect   */
		/* only MSBs of the array mt[].                        */
		/* 2002/01/09 modified by Makoto Matsumoto             */
		this.mt[this.mti] >>>= 0;
		/* for >32 bit machines */
	}
}

/* initialize by an array with array-length */
/* init_key is the array for initializing keys */
/* key_length is its length */
/* slight change for C++, 2004/2/26 */
MersenneTwister.prototype.init_by_array = function(init_key, key_length) {
	var i, j, k;
	this.init_seed(19650218);
	i=1; j=0;
	k = (this.N>key_length ? this.N : key_length);
	for (; k; k--) {
		var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30)
		this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525)))
		+ init_key[j] + j; /* non linear */
		this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
		i++; j++;
		if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
		if (j>=key_length) j=0;
	}
	for (k=this.N-1; k; k--) {
		var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30);
		this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941))
		- i; /* non linear */
		this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
		i++;
		if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
	}

	this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
}

/* generates a random number on [0,0xffffffff]-interval */
/* origin name genrand_int32 */
MersenneTwister.prototype.random_int = function() {
	var y;
	var mag01 = new Array(0x0, this.MATRIX_A);
	/* mag01[x] = x * MATRIX_A  for x=0,1 */

	if (this.mti >= this.N) { /* generate N words at one time */
		var kk;

		if (this.mti == this.N+1)  /* if init_seed() has not been called, */
			this.init_seed(5489);  /* a default initial seed is used */

		for (kk=0;kk<this.N-this.M;kk++) {
			y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
			this.mt[kk] = this.mt[kk+this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
		}
		for (;kk<this.N-1;kk++) {
			y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
			this.mt[kk] = this.mt[kk+(this.M-this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
		}
		y = (this.mt[this.N-1]&this.UPPER_MASK)|(this.mt[0]&this.LOWER_MASK);
		this.mt[this.N-1] = this.mt[this.M-1] ^ (y >>> 1) ^ mag01[y & 0x1];

		this.mti = 0;
	}

	y = this.mt[this.mti++];

	/* Tempering */
	y ^= (y >>> 11);
	y ^= (y << 7) & 0x9d2c5680;
	y ^= (y << 15) & 0xefc60000;
	y ^= (y >>> 18);

	return y >>> 0;
}

/* generates a random number on [0,0x7fffffff]-interval */
/* origin name genrand_int31 */
MersenneTwister.prototype.random_int31 = function() {
	return (this.random_int()>>>1);
}

/* generates a random number on [0,1]-real-interval */
/* origin name genrand_real1 */
MersenneTwister.prototype.random_incl = function() {
	return this.random_int()*(1.0/4294967295.0);
	/* divided by 2^32-1 */
}

/* generates a random number on [0,1)-real-interval */
MersenneTwister.prototype.random = function() {
	return this.random_int()*(1.0/4294967296.0);
	/* divided by 2^32 */
}

/* generates a random number on (0,1)-real-interval */
/* origin name genrand_real3 */
MersenneTwister.prototype.random_excl = function() {
	return (this.random_int() + 0.5)*(1.0/4294967296.0);
	/* divided by 2^32 */
}

/* generates a random number on [0,1) with 53-bit resolution*/
/* origin name genrand_res53 */
MersenneTwister.prototype.random_long = function() {
	var a=this.random_int()>>>5, b=this.random_int()>>>6;
	return(a*67108864.0+b)*(1.0/9007199254740992.0);
}

/* These real versions are due to Isaku Wada, 2002/01/09 added */

module.exports = MersenneTwister;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//

const number = function (max = 1e6, min = 0) {
  return Math.floor((this.random() * (1 + max - min)) + min)
}
/* harmony export (immutable) */ __webpack_exports__["number"] = number;


//

const oneOf = function (arr) {
  return arr[Math.floor(this.random() * arr.length)]
}
/* harmony export (immutable) */ __webpack_exports__["oneOf"] = oneOf;


//

const some = function (arr, predicate) {
  const length = arr.length
  for (let index = 0; index < length; index++) {
    if (predicate(arr[index], index, arr)) return true
  }
  return false
}

const shuffle = function (arrin, limit, random = Math.random) {
  if (limit === 0) { return [] }
  const arr = arrin.slice(0)
  const len = arr.length
  let rand, temp
  some(arr, function (value, index) {
    if (index >= limit) { return true }
    rand = index + Math.floor(random() * (len - index))
    temp = arr[index]
    arr[index] = arr[rand]
    arr[rand] = temp
  })
  return arr.slice(0, limit || len)
}

const choose = function (qty, arr) {
  return shuffle(arr, qty, () => this.random())
}
/* harmony export (immutable) */ __webpack_exports__["choose"] = choose;



/***/ })
/******/ ]);
});