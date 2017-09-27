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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__methods__ = __webpack_require__(4);



Object.keys(__WEBPACK_IMPORTED_MODULE_1__methods__).forEach(key => {
  __WEBPACK_IMPORTED_MODULE_0__core_js__["a" /* default */].fn[key] = __WEBPACK_IMPORTED_MODULE_1__methods__[key]
})

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__core_js__["a" /* default */]);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
  seed = processSeed(initseed = initseed || Math.random())

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

/* harmony default export */ __webpack_exports__["a"] = (fiona);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const random = function () {
  return this.weighting(this.prng())
}
/* harmony export (immutable) */ __webpack_exports__["random"] = random;


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