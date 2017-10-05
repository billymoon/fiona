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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__methods__ = __webpack_require__(5);



Object.keys(__WEBPACK_IMPORTED_MODULE_1__methods__).forEach(key => {
  __WEBPACK_IMPORTED_MODULE_0__core_js__["a" /* default */].fn[key] = __WEBPACK_IMPORTED_MODULE_1__methods__[key]
})

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__core_js__["a" /* default */]);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prng_xor__ = __webpack_require__(4);


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

  let { random, reseed, getState, setState } = Object(__WEBPACK_IMPORTED_MODULE_0__prng_xor__["a" /* default */])(0)

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
        const seeded = fiona(`${position}/${initseed}`, __WEBPACK_IMPORTED_MODULE_0__prng_xor__["a" /* default */])
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
        const seeded = fiona(`() => data/${initseed}`, __WEBPACK_IMPORTED_MODULE_0__prng_xor__["a" /* default */])
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
const baseSeeds = [123456789, 362436069, 521288629, 88675123]
const xor = seed => {
  let [x, y, z, w] = baseSeeds

  const random = function () {
    var t = x ^ (x << 11)

    x = y
    y = z
    z = w

    w = w ^ (w >> 19) ^ (t ^ (t >> 8))

    return w / 0x7FFFFFFF
  }

  const setSeeds = seed => {
    [x, y, z, w] = baseSeeds.map(i => i + seed)
    const newseeds = [
      Math.round(random() * 1e16),
      Math.round(random() * 1e16),
      Math.round(random() * 1e16),
      Math.round(random() * 1e16)
    ]
    x = newseeds[0]
    y = newseeds[1]
    z = newseeds[2]
    w = newseeds[3]
  }

  setSeeds(seed)

  return {
    random: () => random(),
    reseed: setSeeds,
    getState: () => [x, y, z, w],
    setState: seeds => ([x, y, z, w] = seeds)
  }
}

/* harmony default export */ __webpack_exports__["a"] = (xor);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//

const number = function (max = 1e6, min = 0) {
  return Math.floor((this.random() * (1 + max - min)) + min)
}
/* harmony export (immutable) */ __webpack_exports__["number"] = number;


//
const chooser = (position, arr, weightings) => {
  const weights = arr.reduce((memo, value, index) => {
    memo.push((memo[index - 1] || 0) + (typeof weightings[index] === 'number' ? weightings[index] : 1))
    return memo
  }, [])

  const target = position * weights[weights.length - 1]

  // TODO: Binary Tree akin to: https://github.com/plantain-00/weighted-picker/blob/3cdd2c37856bc39c2304d7a597b237cecc845f7e/src/index.ts#L34
  let index

  weights.every((weight, i) => {
    if (target > weight) {
      return true
    } else {
      index = i
      return false
    }
  })

  return index
}

const oneOf = function (arr, weightings=[]) {
  return arr[chooser(this.random(), arr, weightings)]
}
/* harmony export (immutable) */ __webpack_exports__["oneOf"] = oneOf;


const choose = function (qty, arr, weightings=[]) {
  const myArr = arr.slice(0)
  const myWeightings = weightings.slice(0)
  return Array(qty || 0).fill(null).map((v, i) => {
    const index = chooser(this.random(), myArr, myWeightings)
    const result = myArr[index]
    myArr[index] = myArr[0]
    myArr.shift()
    return result
  })
}
/* harmony export (immutable) */ __webpack_exports__["choose"] = choose;



/***/ })
/******/ ]);
});