/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/admin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"];

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized.js */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  module.exports["default"] = module.exports, module.exports.__esModule = true;
  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js");

var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");

var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");

var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  }

  return _typeof(obj);
}

module.exports = _typeof;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "./node_modules/@material/dom/dist/mdc.dom.js":
/*!****************************************************!*\
  !*** ./node_modules/@material/dom/dist/mdc.dom.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/material-components/material-components-web/blob/master/LICENSE
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./packages/mdc-dom/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./packages/mdc-dom/events.ts":
/*!************************************!*\
  !*** ./packages/mdc-dom/events.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Determine whether the current browser supports passive event listeners, and
 * if so, use them.
 */
function applyPassive(globalObj) {
    if (globalObj === void 0) {
        globalObj = window;
    }
    return supportsPassiveOption(globalObj) ? { passive: true } : false;
}
exports.applyPassive = applyPassive;
function supportsPassiveOption(globalObj) {
    if (globalObj === void 0) {
        globalObj = window;
    }
    // See
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    var passiveSupported = false;
    try {
        var options = {
            // This function will be called when the browser
            // attempts to access the passive property.
            get passive() {
                passiveSupported = true;
                return false;
            }
        };
        var handler = function handler() {};
        globalObj.document.addEventListener('test', handler, options);
        globalObj.document.removeEventListener('test', handler, options);
    } catch (err) {
        passiveSupported = false;
    }
    return passiveSupported;
}

/***/ }),

/***/ "./packages/mdc-dom/focus-trap.ts":
/*!****************************************!*\
  !*** ./packages/mdc-dom/focus-trap.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var FOCUS_SENTINEL_CLASS = 'mdc-dom-focus-sentinel';
/**
 * Utility to trap focus in a given root element, e.g. for modal components such
 * as dialogs. The root should have at least one focusable child element,
 * for setting initial focus when trapping focus.
 * Also tracks the previously focused element, and restores focus to that
 * element when releasing focus.
 */
var FocusTrap = /** @class */function () {
    function FocusTrap(root, options) {
        if (options === void 0) {
            options = {};
        }
        this.root = root;
        this.options = options;
        // Previously focused element before trapping focus.
        this.elFocusedBeforeTrapFocus = null;
    }
    /**
     * Traps focus in `root`. Also focuses on either `initialFocusEl` if set;
     * otherwises sets initial focus to the first focusable child element.
     */
    FocusTrap.prototype.trapFocus = function () {
        var focusableEls = this.getFocusableElements(this.root);
        if (focusableEls.length === 0) {
            throw new Error('FocusTrap: Element must have at least one focusable child.');
        }
        this.elFocusedBeforeTrapFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        this.wrapTabFocus(this.root, focusableEls);
        if (!this.options.skipInitialFocus) {
            this.focusInitialElement(focusableEls, this.options.initialFocusEl);
        }
    };
    /**
     * Releases focus from `root`. Also restores focus to the previously focused
     * element.
     */
    FocusTrap.prototype.releaseFocus = function () {
        [].slice.call(this.root.querySelectorAll("." + FOCUS_SENTINEL_CLASS)).forEach(function (sentinelEl) {
            sentinelEl.parentElement.removeChild(sentinelEl);
        });
        if (this.elFocusedBeforeTrapFocus) {
            this.elFocusedBeforeTrapFocus.focus();
        }
    };
    /**
     * Wraps tab focus within `el` by adding two hidden sentinel divs which are
     * used to mark the beginning and the end of the tabbable region. When
     * focused, these sentinel elements redirect focus to the first/last
     * children elements of the tabbable region, ensuring that focus is trapped
     * within that region.
     */
    FocusTrap.prototype.wrapTabFocus = function (el, focusableEls) {
        var sentinelStart = this.createSentinel();
        var sentinelEnd = this.createSentinel();
        sentinelStart.addEventListener('focus', function () {
            if (focusableEls.length > 0) {
                focusableEls[focusableEls.length - 1].focus();
            }
        });
        sentinelEnd.addEventListener('focus', function () {
            if (focusableEls.length > 0) {
                focusableEls[0].focus();
            }
        });
        el.insertBefore(sentinelStart, el.children[0]);
        el.appendChild(sentinelEnd);
    };
    /**
     * Focuses on `initialFocusEl` if defined and a child of the root element.
     * Otherwise, focuses on the first focusable child element of the root.
     */
    FocusTrap.prototype.focusInitialElement = function (focusableEls, initialFocusEl) {
        var focusIndex = 0;
        if (initialFocusEl) {
            focusIndex = Math.max(focusableEls.indexOf(initialFocusEl), 0);
        }
        focusableEls[focusIndex].focus();
    };
    FocusTrap.prototype.getFocusableElements = function (root) {
        var focusableEls = [].slice.call(root.querySelectorAll('[autofocus], [tabindex], a, input, textarea, select, button'));
        return focusableEls.filter(function (el) {
            var isDisabledOrHidden = el.getAttribute('aria-disabled') === 'true' || el.getAttribute('disabled') != null || el.getAttribute('hidden') != null || el.getAttribute('aria-hidden') === 'true';
            var isTabbableAndVisible = el.tabIndex >= 0 && el.getBoundingClientRect().width > 0 && !el.classList.contains(FOCUS_SENTINEL_CLASS) && !isDisabledOrHidden;
            var isProgrammaticallyHidden = false;
            if (isTabbableAndVisible) {
                var style = getComputedStyle(el);
                isProgrammaticallyHidden = style.display === 'none' || style.visibility === 'hidden';
            }
            return isTabbableAndVisible && !isProgrammaticallyHidden;
        });
    };
    FocusTrap.prototype.createSentinel = function () {
        var sentinel = document.createElement('div');
        sentinel.setAttribute('tabindex', '0');
        // Don't announce in screen readers.
        sentinel.setAttribute('aria-hidden', 'true');
        sentinel.classList.add(FOCUS_SENTINEL_CLASS);
        return sentinel;
    };
    return FocusTrap;
}();
exports.FocusTrap = FocusTrap;

/***/ }),

/***/ "./packages/mdc-dom/index.ts":
/*!***********************************!*\
  !*** ./packages/mdc-dom/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }result["default"] = mod;
  return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var events = __importStar(__webpack_require__(/*! ./events */ "./packages/mdc-dom/events.ts"));
exports.events = events;
var focusTrap = __importStar(__webpack_require__(/*! ./focus-trap */ "./packages/mdc-dom/focus-trap.ts"));
exports.focusTrap = focusTrap;
var ponyfill = __importStar(__webpack_require__(/*! ./ponyfill */ "./packages/mdc-dom/ponyfill.ts"));
exports.ponyfill = ponyfill;

/***/ }),

/***/ "./packages/mdc-dom/ponyfill.ts":
/*!**************************************!*\
  !*** ./packages/mdc-dom/ponyfill.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview A "ponyfill" is a polyfill that doesn't modify the global prototype chain.
 * This makes ponyfills safer than traditional polyfills, especially for libraries like MDC.
 */
function closest(element, selector) {
    if (element.closest) {
        return element.closest(selector);
    }
    var el = element;
    while (el) {
        if (matches(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}
exports.closest = closest;
function matches(element, selector) {
    var nativeMatches = element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
    return nativeMatches.call(element, selector);
}
exports.matches = matches;
/**
 * Used to compute the estimated scroll width of elements. When an element is
 * hidden due to display: none; being applied to a parent element, the width is
 * returned as 0. However, the element will have a true width once no longer
 * inside a display: none context. This method computes an estimated width when
 * the element is hidden or returns the true width when the element is visble.
 * @param {Element} element the element whose width to estimate
 */
function estimateScrollWidth(element) {
    // Check the offsetParent. If the element inherits display: none from any
    // parent, the offsetParent property will be null (see
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent).
    // This check ensures we only clone the node when necessary.
    var htmlEl = element;
    if (htmlEl.offsetParent !== null) {
        return htmlEl.scrollWidth;
    }
    var clone = htmlEl.cloneNode(true);
    clone.style.setProperty('position', 'absolute');
    clone.style.setProperty('transform', 'translate(-9999px, -9999px)');
    document.documentElement.appendChild(clone);
    var scrollWidth = clone.scrollWidth;
    document.documentElement.removeChild(clone);
    return scrollWidth;
}
exports.estimateScrollWidth = estimateScrollWidth;

/***/ })

/******/ });
});
//# sourceMappingURL=mdc.dom.js.map

/***/ }),

/***/ "./node_modules/@rmwc/base/next/component.js":
/*!***************************************************!*\
  !*** ./node_modules/@rmwc/base/next/component.js ***!
  \***************************************************/
/*! exports provided: Tag, useClassNames, mergeRefs, handleRef, createComponent, createMemoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tag", function() { return Tag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useClassNames", function() { return useClassNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeRefs", function() { return mergeRefs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleRef", function() { return handleRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createComponent", function() { return createComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMemoComponent", function() { return createMemoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _with_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./with-theme */ "./node_modules/@rmwc/base/next/with-theme.js");




var Tag = react__WEBPACK_IMPORTED_MODULE_1___default.a.forwardRef(function Tag(_a, ref) {
    var _b = _a.tag, TagEl = _b === void 0 ? 'div' : _b, theme = _a.theme, element = _a.element, rest = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["tag", "theme", "element"]);
    var finalProps = element ? element.props(rest) : rest;
    var finalRef = element ? mergeRefs(ref, element.setRef) : ref;
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(TagEl, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, finalProps, { ref: finalRef }));
});
var useClassNames = function (props, classNames) {
    return classnames__WEBPACK_IMPORTED_MODULE_2___default.a.apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])([props.className], (!!props.theme ? Object(_with_theme__WEBPACK_IMPORTED_MODULE_3__["parseThemeOptions"])(props.theme) : []), (typeof classNames === 'function' ? classNames(props) : classNames)));
};
var mergeRefs = function () {
    var refs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        refs[_i] = arguments[_i];
    }
    return function (el) {
        var e_1, _a;
        try {
            for (var refs_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(refs), refs_1_1 = refs_1.next(); !refs_1_1.done; refs_1_1 = refs_1.next()) {
                var ref = refs_1_1.value;
                if (typeof ref === 'function') {
                    ref(el);
                }
                else if (ref && 'current' in ref) {
                    // @ts-ignore
                    ref.current = el;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (refs_1_1 && !refs_1_1.done && (_a = refs_1.return)) _a.call(refs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
};
var handleRef = function (ref, value) {
    if (typeof ref === 'function') {
        ref(value);
    }
    else if (ref && 'current' in ref) {
        // @ts-ignore
        ref.current = value;
    }
};
function createComponent(Component) {
    var ForwardComponent = react__WEBPACK_IMPORTED_MODULE_1___default.a.forwardRef(Component);
    // Interestingly enough, we only need this declaration
    // for a generic placeholder for typescript inference,
    // we don't actually have to pay the penalty for using it at runtime :)
    var WrappedComponent = function (props, ref) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null);
    };
    WrappedComponent.displayName = Component.constructor.name || 'RMWCComponent';
    ForwardComponent.displayName = WrappedComponent.displayName;
    return ForwardComponent;
}
function createMemoComponent(Component) {
    var Comp = createComponent(Component);
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.memo(Comp);
}


/***/ }),

/***/ "./node_modules/@rmwc/base/next/foundation-component.js":
/*!**************************************************************!*\
  !*** ./node_modules/@rmwc/base/next/foundation-component.js ***!
  \**************************************************************/
/*! exports provided: FoundationElement, useFoundation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FoundationElement", function() { return FoundationElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useFoundation", function() { return useFoundation; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_events_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/events-map */ "./node_modules/@rmwc/base/next/utils/events-map.js");
/* harmony import */ var _utils_strings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/strings */ "./node_modules/@rmwc/base/next/utils/strings.js");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component */ "./node_modules/@rmwc/base/next/component.js");






var reactPropFromEventName = function (evtName) {
    return _utils_events_map__WEBPACK_IMPORTED_MODULE_3__["eventsMap"][evtName] || evtName;
};
var FoundationElement = /** @class */ (function () {
    function FoundationElement(onChange) {
        this._classes = new Set();
        this._events = {};
        this._style = {};
        this._props = {};
        this._ref = null;
        this._onChange = null;
        this._onChange = onChange;
        this.onChange = this.onChange.bind(this);
        this.addClass = this.addClass.bind(this);
        this.removeClass = this.removeClass.bind(this);
        this.hasClass = this.hasClass.bind(this);
        this.setProp = this.setProp.bind(this);
        this.getProp = this.getProp.bind(this);
        this.removeProp = this.removeProp.bind(this);
        this.setStyle = this.setStyle.bind(this);
        this.addEventListener = this.addEventListener.bind(this);
        this.removeEventListener = this.removeEventListener.bind(this);
        this.setRef = this.setRef.bind(this);
    }
    FoundationElement.prototype.onChange = function () {
        this._onChange && this._onChange();
    };
    FoundationElement.prototype.destroy = function () {
        var _this = this;
        this._onChange = null;
        this._events = {};
        this._style = {};
        this._props = {};
        this._classes = new Set();
        setTimeout(function () {
            _this._ref = null;
        });
    };
    /**************************************************
     * Classes
     **************************************************/
    FoundationElement.prototype.addClass = function (className) {
        if (!this._classes.has(className)) {
            this._classes.add(className);
            this.onChange();
        }
    };
    FoundationElement.prototype.removeClass = function (className) {
        if (this._classes.has(className)) {
            this._classes.delete(className);
            this.onChange();
        }
    };
    FoundationElement.prototype.hasClass = function (className) {
        return this._classes.has(className);
    };
    /**************************************************
     * Props
     **************************************************/
    FoundationElement.prototype.setProp = function (propName, value, silent) {
        if (silent === void 0) { silent = false; }
        if (this._props[propName] !== value) {
            this._props[propName] = value;
            !silent && this.onChange();
        }
    };
    FoundationElement.prototype.getProp = function (propName) {
        return this._props[propName];
    };
    FoundationElement.prototype.removeProp = function (propName) {
        if (this._props[propName] !== undefined) {
            delete this._props[propName];
            this.onChange();
        }
    };
    FoundationElement.prototype.props = function (propsToMerge) {
        var _this = this;
        var _a = propsToMerge.className, className = _a === void 0 ? '' : _a, _b = propsToMerge.style, style = _b === void 0 ? {} : _b;
        // handle merging events
        // the foundation should be able to pass something onClick as well as a user
        // This wraps them in a function that calls both
        var mergedEvents = Object.entries(propsToMerge).reduce(function (acc, _a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), key = _b[0], possibleCallback = _b[1];
            var existingCallback = _this._events[key];
            if (typeof possibleCallback === 'function' &&
                typeof existingCallback === 'function') {
                var wrappedCallback = function (evt) {
                    existingCallback(evt);
                    return possibleCallback(evt);
                };
                acc[key] = wrappedCallback;
            }
            return acc;
        }, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this._events));
        // handle className
        var mergedClasses = classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(this._classes));
        // handle styles
        var mergedStyles = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this._style), style);
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, propsToMerge), this._props), mergedEvents), { style: mergedStyles, className: mergedClasses });
    };
    /**************************************************
     * Styles
     **************************************************/
    FoundationElement.prototype.setStyle = function (propertyName, value) {
        propertyName = propertyName.startsWith('--')
            ? propertyName
            : Object(_utils_strings__WEBPACK_IMPORTED_MODULE_4__["toCamel"])(propertyName);
        if (this._style[propertyName] !== value) {
            this._style[propertyName] = value;
            this.onChange();
        }
    };
    /**************************************************
     * Events
     **************************************************/
    FoundationElement.prototype.addEventListener = function (evtName, callback) {
        var propName = reactPropFromEventName(evtName);
        if (this._events[propName] !== callback) {
            this._events[propName] = callback;
            this.onChange();
        }
    };
    FoundationElement.prototype.removeEventListener = function (evtName, callback) {
        var propName = reactPropFromEventName(evtName);
        if (this._events[propName]) {
            delete this._events[propName];
            this.onChange();
        }
    };
    /**************************************************
     * Refs
     **************************************************/
    FoundationElement.prototype.setRef = function (el) {
        if (el) {
            this._ref = el;
        }
    };
    Object.defineProperty(FoundationElement.prototype, "ref", {
        get: function () {
            return this._ref;
        },
        enumerable: false,
        configurable: true
    });
    return FoundationElement;
}());

var emitFactory = function (props) { return function (evtType, evtData, shouldBubble) {
    if (shouldBubble === void 0) { shouldBubble = false; }
    var evt;
    evt = new CustomEvent(evtType, {
        detail: evtData,
        bubbles: shouldBubble
    });
    // bugfix for events coming from form elements
    // and also fits with reacts form pattern better...
    // This should always otherwise be null since there is no target
    // for Custom Events
    Object.defineProperty(evt, 'target', {
        value: evtData,
        writable: false
    });
    Object.defineProperty(evt, 'currentTarget', {
        value: evtData,
        writable: false
    });
    // Custom handling for React
    var propName = evtType;
    props[propName] && props[propName](evt);
    return evt;
}; };
var useFoundation = function (_a) {
    var foundationFactory = _a.foundation, inputProps = _a.props, elementsInput = _a.elements, api = _a.api;
    var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(0), 2), setIteration = _b[1];
    var props = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(inputProps);
    props.current = inputProps;
    var elements = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
        return Object.keys(elementsInput).reduce(function (acc, key) {
            acc[key] = new FoundationElement(function () {
                setIteration(function (val) { return val + 1; });
            });
            return acc;
        }, {});
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    var foundation = Object(react__WEBPACK_IMPORTED_MODULE_1__["useMemo"])(function () {
        // init foundation
        var f = foundationFactory(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, elements), { getProps: function () { return props.current; }, emit: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return emitFactory(props.current).apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(args));
            } }));
        // handle apiRefs
        api && Object(_component__WEBPACK_IMPORTED_MODULE_5__["handleRef"])(props.current.apiRef, api(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ foundation: f }, elements)));
        return f;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
        var f = foundation;
        f.init();
        api && Object(_component__WEBPACK_IMPORTED_MODULE_5__["handleRef"])(props.current.apiRef, api(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ foundation: f }, elements)));
        Object(_component__WEBPACK_IMPORTED_MODULE_5__["handleRef"])(props.current.foundationRef, f);
        return function () {
            f.destroy();
            Object(_component__WEBPACK_IMPORTED_MODULE_5__["handleRef"])(props.current.apiRef, null);
            Object(_component__WEBPACK_IMPORTED_MODULE_5__["handleRef"])(props.current.foundationRef, null);
            Object.values(elements).map(function (element) { return element.destroy(); });
            // @ts-ignore
            props.current = {};
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [foundation, elements]);
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ foundation: foundation }, elements);
};


/***/ }),

/***/ "./node_modules/@rmwc/base/next/index.js":
/*!***********************************************!*\
  !*** ./node_modules/@rmwc/base/next/index.js ***!
  \***********************************************/
/*! exports provided: classNames, parseThemeOptions, withTheme, debounce, deprecationWarning, handleDeprecations, eventsMap, focusTrapFactory, useId, closest, matches, randomId, toCamel, toDashCase, wrapChild, EventEmitter, ArrayEmitter, getDisplayName, emptyClientRect, DataTableContext, DataTableHeadContext, triggerWindowResize, raf, FoundationElement, useFoundation, Tag, useClassNames, mergeRefs, handleRef, createComponent, createMemoComponent, Portal, PortalChild */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "classNames", function() { return classnames__WEBPACK_IMPORTED_MODULE_0___default.a; });
/* harmony import */ var _with_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./with-theme */ "./node_modules/@rmwc/base/next/with-theme.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseThemeOptions", function() { return _with_theme__WEBPACK_IMPORTED_MODULE_1__["parseThemeOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withTheme", function() { return _with_theme__WEBPACK_IMPORTED_MODULE_1__["withTheme"]; });

/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./node_modules/@rmwc/base/next/utils/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["debounce"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deprecationWarning", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["deprecationWarning"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "handleDeprecations", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["handleDeprecations"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eventsMap", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["eventsMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "focusTrapFactory", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["focusTrapFactory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useId", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["useId"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "closest", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["closest"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "matches", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["matches"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomId", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["randomId"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toCamel", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["toCamel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toDashCase", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["toDashCase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wrapChild", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["wrapChild"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventEmitter", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ArrayEmitter", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["ArrayEmitter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDisplayName", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["getDisplayName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "emptyClientRect", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["emptyClientRect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataTableContext", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["DataTableContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataTableHeadContext", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["DataTableHeadContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "triggerWindowResize", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["triggerWindowResize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "raf", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["raf"]; });

/* harmony import */ var _foundation_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation-component */ "./node_modules/@rmwc/base/next/foundation-component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FoundationElement", function() { return _foundation_component__WEBPACK_IMPORTED_MODULE_3__["FoundationElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useFoundation", function() { return _foundation_component__WEBPACK_IMPORTED_MODULE_3__["useFoundation"]; });

/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component */ "./node_modules/@rmwc/base/next/component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tag", function() { return _component__WEBPACK_IMPORTED_MODULE_4__["Tag"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useClassNames", function() { return _component__WEBPACK_IMPORTED_MODULE_4__["useClassNames"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeRefs", function() { return _component__WEBPACK_IMPORTED_MODULE_4__["mergeRefs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "handleRef", function() { return _component__WEBPACK_IMPORTED_MODULE_4__["handleRef"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createComponent", function() { return _component__WEBPACK_IMPORTED_MODULE_4__["createComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createMemoComponent", function() { return _component__WEBPACK_IMPORTED_MODULE_4__["createMemoComponent"]; });

/* harmony import */ var _portal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./portal */ "./node_modules/@rmwc/base/next/portal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Portal", function() { return _portal__WEBPACK_IMPORTED_MODULE_5__["Portal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PortalChild", function() { return _portal__WEBPACK_IMPORTED_MODULE_5__["PortalChild"]; });









/***/ }),

/***/ "./node_modules/@rmwc/base/next/portal.js":
/*!************************************************!*\
  !*** ./node_modules/@rmwc/base/next/portal.js ***!
  \************************************************/
/*! exports provided: Portal, PortalChild */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Portal", function() { return Portal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PortalChild", function() { return PortalChild; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);



var PORTAL_ID = 'rmwcPortal';
function Portal() {
    var el = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])(document.createElement('div'));
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { ref: el, id: PORTAL_ID });
}
function PortalChild(_a) {
    var children = _a.children, renderTo = _a.renderTo;
    var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(), 2), portalEl = _b[0], setPortalEl = _b[1];
    Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
        var element = undefined;
        if (renderTo === true) {
            element = document.getElementById(PORTAL_ID) || undefined;
            !element &&
                console.warn('No default Portal found. Did you forget to include it in the root of your app? `import { Portal } from "@rmwc/base";`');
        }
        else if (typeof renderTo === 'string') {
            element = document.querySelector(renderTo) || undefined;
            !element &&
                console.warn("The selector you provided for renderToPortal \"" + renderTo + "\" didn't find any elements.");
        }
        else if (renderTo instanceof Element) {
            element = renderTo;
        }
        if (element !== portalEl) {
            setPortalEl(element);
        }
    }, [renderTo, portalEl]);
    if (portalEl) {
        return react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.createPortal(children, portalEl);
    }
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, children);
}


/***/ }),

/***/ "./node_modules/@rmwc/base/next/utils/data-table-context.js":
/*!******************************************************************!*\
  !*** ./node_modules/@rmwc/base/next/utils/data-table-context.js ***!
  \******************************************************************/
/*! exports provided: DataTableContext, DataTableHeadContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataTableContext", function() { return DataTableContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataTableHeadContext", function() { return DataTableHeadContext; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/**
 * This module is exported from base so it doesn't create a dependency on data table to modules that might consume it
 */

/** Are we inside of a data table */
var DataTableContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext(false);
/**
 * Context to allow us to let our rows in the header know to use the right classes.
 * This method is being used to avoid a breaking change from RMWC to MDC tables and also to inform other components of styles needed.
 */
var DataTableHeadContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext(false);


/***/ }),

/***/ "./node_modules/@rmwc/base/next/utils/debounce.js":
/*!********************************************************!*\
  !*** ./node_modules/@rmwc/base/next/utils/debounce.js ***!
  \********************************************************/
/*! exports provided: debounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });
var debounce = function (func, wait) {
    var timeout;
    return function () {
        // @ts-ignore
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            func.apply(context, args);
        };
        timeout !== null && clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};


/***/ }),

/***/ "./node_modules/@rmwc/base/next/utils/deprecation.js":
/*!***********************************************************!*\
  !*** ./node_modules/@rmwc/base/next/utils/deprecation.js ***!
  \***********************************************************/
/*! exports provided: deprecationWarning, handleDeprecations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deprecationWarning", function() { return deprecationWarning; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleDeprecations", function() { return handleDeprecations; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var deprecationWarning = function (message) {
    if (process && process.env && "development" !== 'production') {
        console.warn("RMWC Deprecation Warning: " + message);
    }
};
var handleDeprecations = function (props, deprecate, displayName) {
    props = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, props);
    for (var oldPropName in deprecate) {
        var newProp = deprecate[oldPropName];
        var newPropName = void 0;
        var transformProp = function (value) { return value; };
        if (Array.isArray(newProp)) {
            newPropName = newProp[0];
            transformProp = newProp[1];
        }
        else {
            newPropName = newProp;
        }
        if (props[oldPropName] !== undefined) {
            if (newPropName === '') {
                /* istanbul ignore next */
                deprecationWarning((displayName ||
                    '') + " component prop '" + oldPropName + "' has been removed from and is no longer a valid prop.");
            }
            else {
                props[newPropName] = transformProp(props[oldPropName]);
                var propTransformMessage = '';
                if (props[newPropName] !== props[oldPropName]) {
                    propTransformMessage = " The old value has also been converted from '" + props[oldPropName] + "' to '" + props[newPropName] + "'";
                }
                /* istanbul ignore next */
                deprecationWarning((displayName ||
                    '') + " component prop '" + oldPropName + "' has been replaced with '" + newPropName + "'. " + propTransformMessage);
            }
            delete props[oldPropName];
        }
    }
    return props;
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/@rmwc/base/next/utils/emitter.js":
/*!*******************************************************!*\
  !*** ./node_modules/@rmwc/base/next/utils/emitter.js ***!
  \*******************************************************/
/*! exports provided: EventEmitter, ArrayEmitter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventEmitter", function() { return EventEmitter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayEmitter", function() { return ArrayEmitter; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.events_ = {};
    }
    EventEmitter.prototype.on = function (event, cb) {
        this.events_ = this.events_ || {};
        this.events_[event] = this.events_[event] || [];
        this.events_[event].push(cb);
    };
    EventEmitter.prototype.off = function (event, cb) {
        this.events_ = this.events_ || {};
        if (event in this.events_ === false)
            return;
        this.events_[event].splice(this.events_[event].indexOf(cb), 1);
    };
    EventEmitter.prototype.trigger = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.events_ = this.events_ || {};
        if (event in this.events_ === false)
            return;
        for (var i = 0; i < this.events_[event].length; i++) {
            this.events_[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    };
    return EventEmitter;
}());

var ArrayEmitter = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ArrayEmitter, _super);
    function ArrayEmitter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.array = [];
        return _this;
    }
    ArrayEmitter.prototype.push = function () {
        var _a;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var rVal = (_a = this.array).push.apply(_a, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(items));
        this.trigger('change');
        return rVal;
    };
    ArrayEmitter.prototype.empty = function () {
        this.array.length = 0;
        this.trigger('change');
    };
    ArrayEmitter.prototype.remove = function (item) {
        var index = this.array.indexOf(item);
        if (index > -1) {
            this.array.splice(index, 1);
            this.trigger('change');
            return true;
        }
        return false;
    };
    return ArrayEmitter;
}(EventEmitter));



/***/ }),

/***/ "./node_modules/@rmwc/base/next/utils/empty-client-rect.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@rmwc/base/next/utils/empty-client-rect.js ***!
  \*****************************************************************/
/*! exports provided: emptyClientRect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptyClientRect", function() { return emptyClientRect; });
var emptyClientRect = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0
};


/***/ }),

/***/ "./node_modules/@rmwc/base/next/utils/events-map.js":
/*!**********************************************************!*\
  !*** ./node_modules/@rmwc/base/next/utils/events-map.js ***!
  \**********************************************************/
/*! exports provided: eventsMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventsMap", function() { return eventsMap; });
/* istanbul ignore file */
var eventsMap = {
    blur: 'onBlur',
    cancel: 'onCancel',
    click: 'onClick',
    close: 'onClose',
    contextmenu: 'onContextMenu',
    copy: 'onCopy',
    cut: 'onCut',
    auxclick: 'onAuxClick',
    doubleclick: 'onDoubleClick',
    dragend: 'onDragEnd',
    dragstart: 'onDragStart',
    drop: 'onDrop',
    focus: 'onFocus',
    input: 'onInput',
    invalid: 'onInvalid',
    keydown: 'onKeyDown',
    keypress: 'onKeyPress',
    keyup: 'onKeyUp',
    mousedown: 'onMouseDown',
    mouseup: 'onMouseUp',
    paste: 'onPaste',
    pause: 'onPause',
    play: 'onPlay',
    pointercancel: 'onPointerCancel',
    pointerdown: 'onPointerDown',
    pointerup: 'onPointerUp',
    ratechange: 'onRateChange',
    reset: 'onReset',
    seeked: 'onSeeked',
    submit: 'onSubmit',
    touchcancel: 'onTouchCancel',
    touchend: 'onTouchEnd',
    touchstart: 'onTouchStart',
    volumechange: 'onVolumeChange',
    abort: 'onAbort',
    animationend: 'onAnimationEnd',
    animationiteration: 'onAnimationIteration',
    animationstart: 'onAnimationStart',
    canplay: 'onCanPlay',
    canplaythrough: 'onCanPlayThrough',
    drag: 'onDrag',
    dragenter: 'onDragEnter',
    dragexit: 'onDragExit',
    dragleave: 'onDragLeave',
    dragover: 'onDragOver',
    durationchange: 'onDurationChange',
    emptied: 'onEmptied',
    encrypted: 'onEncrypted',
    ended: 'onEnded',
    error: 'onError',
    gotpointercapture: 'onGotPointerCapture',
    load: 'onLoad',
    loadeddata: 'onLoadedData',
    loadedmetadata: 'onLoadedMetadata',
    loadstart: 'onLoadStart',
    lostpointercapture: 'onLostPointerCapture',
    mousemove: 'onMouseMove',
    mouseout: 'onMouseOut',
    mouseover: 'onMouseOver',
    playing: 'onPlaying',
    pointermove: 'onPointerMove',
    pointerout: 'onPointerOut',
    pointerover: 'onPointerOver',
    progress: 'onProgress',
    scroll: 'onScroll',
    seeking: 'onSeeking',
    stalled: 'onStalled',
    suspend: 'onSuspend',
    timeupdate: 'onTimeUpdate',
    toggle: 'onToggle',
    touchmove: 'onTouchMove',
    transitionend: 'onTransitionEnd',
    waiting: 'onWaiting',
    wheel: 'onWheel',
    mouseenter: 'onMouseEnter',
    mouseleave: 'onMouseLeave',
    pointerenter: 'onPointerEnter',
    pointerleave: 'onPointerLeave',
    change: 'onChange',
    select: 'onSelect',
    beforeinput: 'onBeforeInput',
    compositionend: 'onCompositionEnd',
    compositionstart: 'onCompositionStart',
    compositionupdate: 'onCompositionUpdate'
};


/***/ }),

/***/ "./node_modules/@rmwc/base/next/utils/focus-trap.js":
/*!**********************************************************!*\
  !*** ./node_modules/@rmwc/base/next/utils/focus-trap.js ***!
  \**********************************************************/
/*! exports provided: focusTrapFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "focusTrapFactory", function() { return focusTrapFactory; });
/* harmony import */ var _material_dom_dist_mdc_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @material/dom/dist/mdc.dom.js */ "./node_modules/@material/dom/dist/mdc.dom.js");
/* harmony import */ var _material_dom_dist_mdc_dom_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_material_dom_dist_mdc_dom_js__WEBPACK_IMPORTED_MODULE_0__);
// @ts-ignore MDC botched ES5 importing

var _FocusTrap = _material_dom_dist_mdc_dom_js__WEBPACK_IMPORTED_MODULE_0__["focusTrap"].FocusTrap;
var focusTrapFactory = function (el, focusOptions) { return new _FocusTrap(el, focusOptions); };


/***/ }),

/***/ "./node_modules/@rmwc/base/next/utils/get-display-name.js":
/*!****************************************************************!*\
  !*** ./node_modules/@rmwc/base/next/utils/get-display-name.js ***!
  \****************************************************************/
/*! exports provided: getDisplayName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDisplayName", function() { return getDisplayName; });
var getDisplayName = function (childInput) {
    var _a, _b, _c;
    var child = Array.isArray(childInput) ? childInput[0] : childInput;
    var displayName = ((_a = child === null || child === void 0 ? void 0 : child.type) === null || _a === void 0 ? void 0 : _a.displayName) || ((_b = child === null || child === void 0 ? void 0 : child.constructor) === null || _b === void 0 ? void 0 : _b.displayName) || (child === null || child === void 0 ? void 0 : child.displayName) || (child === null || child === void 0 ? void 0 : child.name) || ((_c = child === null || child === void 0 ? void 0 : child.constructor) === null || _c === void 0 ? void 0 : _c.name) ||
        'Unknown';
    return displayName;
};


/***/ }),

/***/ "./node_modules/@rmwc/base/next/utils/hooks.js":
/*!*****************************************************!*\
  !*** ./node_modules/@rmwc/base/next/utils/hooks.js ***!
  \*****************************************************/
/*! exports provided: useId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useId", function() { return useId; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _random_id__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./random-id */ "./node_modules/@rmwc/base/next/utils/random-id.js");



var useId = function (prefix, props) {
    var idToUse = props.id
        ? props.id
        : props.label
            ? prefix + "-" + props.label
            : Object(_random_id__WEBPACK_IMPORTED_MODULE_2__["randomId"])(prefix);
    var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(idToUse), 1), id = _a[0];
    return id;
};


/***/ }),

/***/ "./node_modules/@rmwc/base/next/utils/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@rmwc/base/next/utils/index.js ***!
  \*****************************************************/
/*! exports provided: debounce, deprecationWarning, handleDeprecations, eventsMap, focusTrapFactory, useId, closest, matches, randomId, toCamel, toDashCase, wrapChild, EventEmitter, ArrayEmitter, getDisplayName, emptyClientRect, DataTableContext, DataTableHeadContext, triggerWindowResize, raf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./debounce */ "./node_modules/@rmwc/base/next/utils/debounce.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return _debounce__WEBPACK_IMPORTED_MODULE_0__["debounce"]; });

/* harmony import */ var _deprecation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deprecation */ "./node_modules/@rmwc/base/next/utils/deprecation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deprecationWarning", function() { return _deprecation__WEBPACK_IMPORTED_MODULE_1__["deprecationWarning"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "handleDeprecations", function() { return _deprecation__WEBPACK_IMPORTED_MODULE_1__["handleDeprecations"]; });

/* harmony import */ var _events_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./events-map */ "./node_modules/@rmwc/base/next/utils/events-map.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eventsMap", function() { return _events_map__WEBPACK_IMPORTED_MODULE_2__["eventsMap"]; });

/* harmony import */ var _focus_trap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./focus-trap */ "./node_modules/@rmwc/base/next/utils/focus-trap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "focusTrapFactory", function() { return _focus_trap__WEBPACK_IMPORTED_MODULE_3__["focusTrapFactory"]; });

/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hooks */ "./node_modules/@rmwc/base/next/utils/hooks.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useId", function() { return _hooks__WEBPACK_IMPORTED_MODULE_4__["useId"]; });

/* harmony import */ var _ponyfills__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ponyfills */ "./node_modules/@rmwc/base/next/utils/ponyfills.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "closest", function() { return _ponyfills__WEBPACK_IMPORTED_MODULE_5__["closest"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "matches", function() { return _ponyfills__WEBPACK_IMPORTED_MODULE_5__["matches"]; });

/* harmony import */ var _random_id__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./random-id */ "./node_modules/@rmwc/base/next/utils/random-id.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomId", function() { return _random_id__WEBPACK_IMPORTED_MODULE_6__["randomId"]; });

/* harmony import */ var _strings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./strings */ "./node_modules/@rmwc/base/next/utils/strings.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toCamel", function() { return _strings__WEBPACK_IMPORTED_MODULE_7__["toCamel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toDashCase", function() { return _strings__WEBPACK_IMPORTED_MODULE_7__["toDashCase"]; });

/* harmony import */ var _wrap_child__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./wrap-child */ "./node_modules/@rmwc/base/next/utils/wrap-child.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wrapChild", function() { return _wrap_child__WEBPACK_IMPORTED_MODULE_8__["wrapChild"]; });

/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./emitter */ "./node_modules/@rmwc/base/next/utils/emitter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventEmitter", function() { return _emitter__WEBPACK_IMPORTED_MODULE_9__["EventEmitter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ArrayEmitter", function() { return _emitter__WEBPACK_IMPORTED_MODULE_9__["ArrayEmitter"]; });

/* harmony import */ var _get_display_name__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./get-display-name */ "./node_modules/@rmwc/base/next/utils/get-display-name.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDisplayName", function() { return _get_display_name__WEBPACK_IMPORTED_MODULE_10__["getDisplayName"]; });

/* harmony import */ var _empty_client_rect__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./empty-client-rect */ "./node_modules/@rmwc/base/next/utils/empty-client-rect.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "emptyClientRect", function() { return _empty_client_rect__WEBPACK_IMPORTED_MODULE_11__["emptyClientRect"]; });

/* harmony import */ var _data_table_context__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./data-table-context */ "./node_modules/@rmwc/base/next/utils/data-table-context.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataTableContext", function() { return _data_table_context__WEBPACK_IMPORTED_MODULE_12__["DataTableContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataTableHeadContext", function() { return _data_table_context__WEBPACK_IMPORTED_MODULE_12__["DataTableHeadContext"]; });

/* harmony import */ var _trigger_window_resize__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./trigger-window-resize */ "./node_modules/@rmwc/base/next/utils/trigger-window-resize.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "triggerWindowResize", function() { return _trigger_window_resize__WEBPACK_IMPORTED_MODULE_13__["triggerWindowResize"]; });

/* harmony import */ var _raf__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./raf */ "./node_modules/@rmwc/base/next/utils/raf.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "raf", function() { return _raf__WEBPACK_IMPORTED_MODULE_14__["raf"]; });


















/***/ }),

/***/ "./node_modules/@rmwc/base/next/utils/ponyfills.js":
/*!*********************************************************!*\
  !*** ./node_modules/@rmwc/base/next/utils/ponyfills.js ***!
  \*********************************************************/
/*! exports provided: closest, matches */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closest", function() { return closest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matches", function() { return matches; });
var closest = function (element, selector) {
    if (element instanceof Element) {
        /* istanbul ignore else  */
        if (element && element.closest) {
            return element.closest(selector);
        }
        else {
            var el = element;
            while (el) {
                if (matches(el, selector)) {
                    return el;
                }
                el = el.parentElement;
            }
        }
    }
    return null;
};
var matches = function (element, selector) {
    /* istanbul ignore next  */
    var nativeMatches = element.matches ||
        element.webkitMatchesSelector ||
        // @ts-ignore
        element.msMatchesSelector;
    return nativeMatches.call(element, selector);
};


/***/ }),

/***/ "./node_modules/@rmwc/base/next/utils/raf.js":
/*!***************************************************!*\
  !*** ./node_modules/@rmwc/base/next/utils/raf.js ***!
  \***************************************************/
/*! exports provided: raf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raf", function() { return raf; });
/**
 * A helper for when we have multiple requestion animation frames
 * Usage:
 *  raf(() => doSomething, 3);
 */
var raf = function (callback, frames, _iteration) {
    if (frames === void 0) { frames = 1; }
    if (_iteration === void 0) { _iteration = 1; }
    window.requestAnimationFrame(function () {
        _iteration >= frames ? callback() : raf(callback, frames, _iteration + 1);
    });
};


/***/ }),

/***/ "./node_modules/@rmwc/base/next/utils/random-id.js":
/*!*********************************************************!*\
  !*** ./node_modules/@rmwc/base/next/utils/random-id.js ***!
  \*********************************************************/
/*! exports provided: randomId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomId", function() { return randomId; });
/**
 * Generates a pseudo random string for DOM ids
 * Will return 'test' in the NODE test-env so things like storyshots doesnt break.
 */
var randomId = function (prefix) {
    var id =  false
        ? undefined
        : (Math.random() + Math.random() + 1).toString(36).substring(2);
    return prefix + "-" + id;
};


/***/ }),

/***/ "./node_modules/@rmwc/base/next/utils/strings.js":
/*!*******************************************************!*\
  !*** ./node_modules/@rmwc/base/next/utils/strings.js ***!
  \*******************************************************/
/*! exports provided: toCamel, toDashCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toCamel", function() { return toCamel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toDashCase", function() { return toDashCase; });
var toCamel = function (str) {
    return str.replace(/(-[a-z])/g, function ($1) { return $1.toUpperCase().replace('-', ''); });
};
var toDashCase = function (str) {
    return str.replace(/([A-Z])/g, function ($1) { return '-' + $1.toLowerCase(); });
};


/***/ }),

/***/ "./node_modules/@rmwc/base/next/utils/trigger-window-resize.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@rmwc/base/next/utils/trigger-window-resize.js ***!
  \*********************************************************************/
/*! exports provided: triggerWindowResize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "triggerWindowResize", function() { return triggerWindowResize; });
var triggerWindowResize = function () {
    window.dispatchEvent(new Event('resize'));
};


/***/ }),

/***/ "./node_modules/@rmwc/base/next/utils/wrap-child.js":
/*!**********************************************************!*\
  !*** ./node_modules/@rmwc/base/next/utils/wrap-child.js ***!
  \**********************************************************/
/*! exports provided: wrapChild */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapChild", function() { return wrapChild; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);



var wrapChild = function (props) {
    var child = react__WEBPACK_IMPORTED_MODULE_1___default.a.Children.only(props.children);
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.cloneElement(child, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, props), child.props), { className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(props.className, child.props.className), style: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, child.props.style), props.style) }));
};


/***/ }),

/***/ "./node_modules/@rmwc/base/next/with-theme.js":
/*!****************************************************!*\
  !*** ./node_modules/@rmwc/base/next/with-theme.js ***!
  \****************************************************/
/*! exports provided: parseThemeOptions, withTheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseThemeOptions", function() { return parseThemeOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withTheme", function() { return withTheme; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_strings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/strings */ "./node_modules/@rmwc/base/next/utils/strings.js");




/**
 * Actually parses the theme options
 */
var parseThemeOptions = function (theme) {
    var themeItems = Array.isArray(theme) ? theme : [theme];
    return themeItems
        .filter(function (v) { return !!v; })
        .map(function (v) { return "mdc-theme--" + Object(_utils_strings__WEBPACK_IMPORTED_MODULE_3__["toDashCase"])(v); });
};
/**
 * HOC that adds themeability to any component
 */
var withTheme = function (Component) {
    var HOC = function (_a) {
        var theme = _a.theme, className = _a.className, rest = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["theme", "className"]);
        if (theme) {
            var classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, parseThemeOptions(theme));
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Component, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ className: classes }, rest));
        }
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Component, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ className: className }, rest));
    };
    HOC.displayName = 'withTheme';
    return HOC;
};


/***/ }),

/***/ "./node_modules/@rmwc/grid/next/index.js":
/*!***********************************************!*\
  !*** ./node_modules/@rmwc/grid/next/index.js ***!
  \***********************************************/
/*! exports provided: Grid, GridCell, GridRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Grid", function() { return Grid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridCell", function() { return GridCell; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridRow", function() { return GridRow; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _rmwc_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @rmwc/base */ "./node_modules/@rmwc/base/next/index.js");



/** A Grid component */
var Grid = Object(_rmwc_base__WEBPACK_IMPORTED_MODULE_2__["createComponent"])(function Grid(props, ref) {
    var _a;
    var children = props.children, fixedColumnWidth = props.fixedColumnWidth, align = props.align, rest = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(props, ["children", "fixedColumnWidth", "align"]);
    var needsInnerGrid = !(Object(_rmwc_base__WEBPACK_IMPORTED_MODULE_2__["getDisplayName"])(children) === 'GridRow');
    var className = Object(_rmwc_base__WEBPACK_IMPORTED_MODULE_2__["useClassNames"])(props, [
        'mdc-layout-grid',
        (_a = {},
            _a["mdc-layout-grid--align-" + (align || '')] = props.align !== undefined,
            _a['mdc-layout-grid--fixed-column-width'] = fixedColumnWidth,
            _a)
    ]);
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_rmwc_base__WEBPACK_IMPORTED_MODULE_2__["Tag"], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, rest, { className: className, ref: ref }), !!needsInnerGrid ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(GridRow, null, children) : children));
});
/** A Grid cell */
var GridCell = Object(_rmwc_base__WEBPACK_IMPORTED_MODULE_2__["createComponent"])(function GridCell(props, ref) {
    var _a;
    var span = props.span, phone = props.phone, tablet = props.tablet, desktop = props.desktop, order = props.order, align = props.align, rest = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(props, ["span", "phone", "tablet", "desktop", "order", "align"]);
    var className = Object(_rmwc_base__WEBPACK_IMPORTED_MODULE_2__["useClassNames"])(props, [
        'mdc-layout-grid__cell',
        (_a = {},
            _a["mdc-layout-grid__cell--order-" + (order || '')] = order !== undefined,
            _a["mdc-layout-grid__cell--align-" + (align || '')] = align !== undefined,
            _a["mdc-layout-grid__cell--span-" + (span || '')] = span !== undefined,
            _a["mdc-layout-grid__cell--span-" + (phone || '') + "-phone"] = phone !== undefined,
            _a["mdc-layout-grid__cell--span-" + (tablet || '') + "-tablet"] = tablet !== undefined,
            _a["mdc-layout-grid__cell--span-" + (desktop || '') + "-desktop"] = props.desktop !== undefined,
            _a)
    ]);
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_rmwc_base__WEBPACK_IMPORTED_MODULE_2__["Tag"], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, rest, { ref: ref, className: className }));
});
/** By default, an inner grid component is included inside of <Grid>. Use GridRow when doing nested Grids. */
var GridRow = Object(_rmwc_base__WEBPACK_IMPORTED_MODULE_2__["createComponent"])(function GridRow(props, ref) {
    var className = Object(_rmwc_base__WEBPACK_IMPORTED_MODULE_2__["useClassNames"])(props, ['mdc-layout-grid__inner']);
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_rmwc_base__WEBPACK_IMPORTED_MODULE_2__["Tag"], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, props, { ref: ref, className: className }));
});
GridRow.displayName = 'GridRow';


/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "./src/admin.js":
/*!**********************!*\
  !*** ./src/admin.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _admin_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./admin/admin-app */ "./src/admin/admin-app.js");


/***/ }),

/***/ "./src/admin/admin-app.js":
/*!********************************!*\
  !*** ./src/admin/admin-app.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_tabs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/tabs */ "./src/admin/components/tabs.js");



var strings = ds_admin_app_vars.strings;

var Admin = function Admin() {
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(_components_tabs__WEBPACK_IMPORTED_MODULE_2__["DsTabPanel"], {
    strings: strings
  });
};

_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(function () {
  Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["render"])(Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__["createElement"])(Admin), document.getElementById('ds-admin-app'));
});

/***/ }),

/***/ "./src/admin/components/buttonsSettings/buttonEditor.js":
/*!**************************************************************!*\
  !*** ./src/admin/components/buttonsSettings/buttonEditor.js ***!
  \**************************************************************/
/*! exports provided: ButtonEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonEditor", function() { return ButtonEditor; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../ */ "./src/admin/components/index.js");
/* harmony import */ var _rmwc_grid__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @rmwc/grid */ "./node_modules/@rmwc/grid/next/index.js");










function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }






var ButtonEditor = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ButtonEditor, _Component);

  var _super = _createSuper(ButtonEditor);

  function ButtonEditor(props) {
    var _this$state;

    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ButtonEditor);

    _this = _super.call(this, props);
    var currentButton;
    props.data.buttons.map(function (buttonObj) {
      if (buttonObj.value == _this.props.data.currentButton) {
        currentButton = buttonObj;
      }
    });
    _this.state = (_this$state = {
      text: typeof currentButton !== 'undefined' && typeof currentButton.text !== 'undefined' ? currentButton.text : '',
      label: typeof currentButton !== 'undefined' && typeof currentButton.label !== 'undefined' ? currentButton.label : '',
      value: typeof currentButton !== 'undefined' && typeof currentButton.value !== 'undefined' ? currentButton.value : '',
      type: typeof currentButton !== 'undefined' && typeof currentButton.type !== 'undefined' ? currentButton.type : '',
      amount: typeof currentButton !== 'undefined' && typeof currentButton.amount !== 'undefined' ? currentButton.amount : '',
      button_id: typeof currentButton !== 'undefined' && typeof currentButton.button_id !== 'undefined' ? currentButton.button_id : '',
      name: typeof currentButton !== 'undefined' && typeof currentButton.name !== 'undefined' ? currentButton.name : '',
      description: typeof currentButton !== 'undefined' && typeof currentButton.description !== 'undefined' ? currentButton.description : ''
    }, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_this$state, "label", typeof currentButton !== 'undefined' && typeof currentButton.label !== 'undefined' ? currentButton.label : ''), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_this$state, "panellabel", typeof currentButton !== 'undefined' && typeof currentButton.panellabel !== 'undefined' ? currentButton.panellabel : ''), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_this$state, "coupon", typeof currentButton !== 'undefined' && typeof currentButton.coupon !== 'undefined' ? currentButton.coupon : ''), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_this$state, "setup_fee", typeof currentButton !== 'undefined' && typeof currentButton.setup_fee !== 'undefined' ? currentButton.setup_fee : false), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_this$state, "zero_decimal", typeof currentButton !== 'undefined' && typeof currentButton.zero_decimal !== 'undefined' ? currentButton.zero_decimal : false), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_this$state, "capture", typeof currentButton !== 'undefined' && typeof currentButton.capture !== 'undefined' ? currentButton.capture : false), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_this$state, "billing", typeof currentButton !== 'undefined' && typeof currentButton.billing !== 'undefined' ? currentButton.billing : false), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_this$state, "shipping", typeof currentButton !== 'undefined' && typeof currentButton.shipping !== 'undefined' ? currentButton.shipping : false), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_this$state, "tc", typeof currentButton !== 'undefined' && typeof currentButton.tc !== 'undefined' ? currentButton.tc : false), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_this$state, "rememberme", typeof currentButton !== 'undefined' && typeof currentButton.rememberme !== 'undefined' ? currentButton.rememberme : false), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_this$state, "display_amount", typeof currentButton !== 'undefined' && typeof currentButton.display_amount !== 'undefined' ? currentButton.display_amount : true), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_this$state, "currency", typeof currentButton !== 'undefined' && typeof currentButton.currency !== 'undefined' ? currentButton.currency : 'USD'), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_this$state, "locale", typeof currentButton !== 'undefined' && typeof currentButton.locale !== 'undefined' ? currentButton.locale : 'auto'), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_this$state, "custom_role", typeof currentButton !== 'undefined' && typeof currentButton.custom_role !== 'undefined' ? currentButton.custom_role : ''), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_this$state, "success_query", typeof currentButton !== 'undefined' && typeof currentButton.success_query !== 'undefined' ? currentButton.success_query : ''), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_this$state, "error_query", typeof currentButton !== 'undefined' && typeof currentButton.error_query !== 'undefined' ? currentButton.error_query : ''), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_this$state, "success_url", typeof currentButton !== 'undefined' && typeof currentButton.success_url !== 'undefined' ? currentButton.success_url : ''), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_this$state, "error_url", typeof currentButton !== 'undefined' && typeof currentButton.error_url !== 'undefined' ? currentButton.error_url : ''), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_this$state, "isDeletionModalOpen", false), _this$state);
    _this.setButtonSettingState = _this.setButtonSettingState.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    _this.setButton = _this.setButton.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    _this.openDeletionModal = _this.openDeletionModal.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    _this.closeDeletionModal = _this.closeDeletionModal.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(ButtonEditor, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(nextProps) {
      if (nextProps.data.currentButton !== this.props.data) {
        this.setCurrentButtonObj();
      }
    }
  }, {
    key: "setCurrentButtonObj",
    value: function setCurrentButtonObj() {
      var _this2 = this;

      this.props.data.buttons.map(function (buttonObj) {
        if (buttonObj.value === _this2.props.data.currentButton) {
          for (var _i = 0, _Object$entries = Object.entries(buttonObj); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_Object$entries[_i], 2),
                key = _Object$entries$_i[0],
                value = _Object$entries$_i[1];

            _this2.setButtonSettingState(key, value);
          }
        }
      });
    }
  }, {
    key: "setButtonSettingState",
    value: function setButtonSettingState(set, value) {
      this.setState(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, set, value));
    }
  }, {
    key: "setButton",
    value: function setButton(button, actions, isDelete) {
      if (typeof button === 'undefined' || button === '') {
        actions.notice({
          state: true,
          status: 'warning',
          message: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_9__["__"])('The button is not set values', 'direct-stripe')
        });
      } else {
        actions.spinner();
        var buttonValues = {
          id: button.value,
          data: JSON.stringify(button)
        };
        Object(___WEBPACK_IMPORTED_MODULE_11__["setButtons"])(buttonValues, actions, isDelete);
      }
    }
  }, {
    key: "openDeletionModal",
    value: function openDeletionModal() {
      this.setState({
        isDeletionModalOpen: true
      });
    }
  }, {
    key: "closeDeletionModal",
    value: function closeDeletionModal() {
      this.setState({
        isDeletionModalOpen: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props,
          state = this.state,
          setButtonSettingState = this.setButtonSettingState,
          setButton = this.setButton,
          openDeletionModal = this.openDeletionModal,
          closeDeletionModal = this.closeDeletionModal,
          isDeletionModalOpen = state.isDeletionModalOpen,
          data = props.data,
          strings = data.strings,
          actions = {
        resetButtons: data.resetButtons,
        spinner: data.spinner,
        notice: data.notice
      };
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_rmwc_grid__WEBPACK_IMPORTED_MODULE_12__["Grid"], {
        align: "center"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_rmwc_grid__WEBPACK_IMPORTED_MODULE_12__["GridRow"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_rmwc_grid__WEBPACK_IMPORTED_MODULE_12__["GridCell"], {
        align: "middle",
        tablet: 12,
        desktop: 6
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_rmwc_grid__WEBPACK_IMPORTED_MODULE_12__["GridRow"], {
        align: "left"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_rmwc_grid__WEBPACK_IMPORTED_MODULE_12__["GridCell"], {
        align: "middle",
        tablet: 12,
        desktop: 4
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["__experimentalText"], {
        variant: "subtitle.small"
      }, strings.buttonSelected, " :")), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_rmwc_grid__WEBPACK_IMPORTED_MODULE_12__["GridCell"], {
        align: "middle",
        tablet: 12,
        desktop: 8
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["__experimentalText"], {
        variant: "subtitle.small"
      }, state.text))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_rmwc_grid__WEBPACK_IMPORTED_MODULE_12__["GridRow"], {
        align: "left"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_rmwc_grid__WEBPACK_IMPORTED_MODULE_12__["GridCell"], {
        align: "middle",
        tablet: 12,
        desktop: 4
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["__experimentalText"], {
        variant: "subtitle.small"
      }, strings.buttonSelectedId, " :")), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_rmwc_grid__WEBPACK_IMPORTED_MODULE_12__["GridCell"], {
        align: "middle",
        tablet: 12,
        desktop: 8
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["__experimentalText"], {
        variant: "subtitle.small"
      }, state.value)))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_rmwc_grid__WEBPACK_IMPORTED_MODULE_12__["GridCell"], {
        align: "middle",
        tablet: 12,
        desktop: 6
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_rmwc_grid__WEBPACK_IMPORTED_MODULE_12__["GridRow"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_rmwc_grid__WEBPACK_IMPORTED_MODULE_12__["GridCell"], {
        align: "middle",
        span: 12
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["Button"], {
        className: "ds-save-button",
        isPrimary: "true",
        onClick: function onClick() {
          return setButton(state, actions, false);
        }
      }, strings.saveButton))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_rmwc_grid__WEBPACK_IMPORTED_MODULE_12__["GridRow"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_rmwc_grid__WEBPACK_IMPORTED_MODULE_12__["GridCell"], {
        align: "middle",
        span: 12
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["Button"], {
        isSecondary: true,
        onClick: openDeletionModal
      }, strings.deleteButton), isDeletionModalOpen && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["Modal"], {
        title: "This is my modal",
        onRequestClose: closeDeletionModal
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["Button"], {
        className: "ds-delete-button",
        isPrimary: "true",
        onClick: function onClick() {
          return setButton(state, actions, true);
        }
      }, strings.deleteButton), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["Button"], {
        isSecondary: true,
        onClick: closeDeletionModal
      }, "My custom close button")))))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["HorizontalRule"], null), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_rmwc_grid__WEBPACK_IMPORTED_MODULE_12__["GridRow"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_rmwc_grid__WEBPACK_IMPORTED_MODULE_12__["GridCell"], {
        align: "middle",
        tablet: 12,
        desktop: 4
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_10__["TextControl"], {
        label: strings.buttonName,
        value: state.name,
        onChange: function onChange(value) {
          return setButtonSettingState('name', value);
        }
      })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_rmwc_grid__WEBPACK_IMPORTED_MODULE_12__["GridCell"], {
        align: "middle",
        tablet: 12,
        desktop: 4
      }, "2"), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["createElement"])(_rmwc_grid__WEBPACK_IMPORTED_MODULE_12__["GridCell"], {
        align: "middle",
        tablet: 12,
        desktop: 4
      }, "3"))));
    }
  }]);

  return ButtonEditor;
}(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__["Component"]);

/***/ }),

/***/ "./src/admin/components/buttonsSettings/buttonsSettings.js":
/*!*****************************************************************!*\
  !*** ./src/admin/components/buttonsSettings/buttonsSettings.js ***!
  \*****************************************************************/
/*! exports provided: ButtonsSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonsSettings", function() { return ButtonsSettings; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ */ "./src/admin/components/buttonsSettings/index.js");



var ButtonsSettings = function ButtonsSettings(props) {
  var data = props.data;
  var currentButton = data.currentButton,
      buttons = data.buttons;
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(___WEBPACK_IMPORTED_MODULE_2__["CreateButton"], {
    data: data
  }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["HorizontalRule"], null), typeof buttons !== 'undefined' && buttons.length > 0 && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(___WEBPACK_IMPORTED_MODULE_2__["SelectButton"], {
    data: data
  }), typeof currentButton !== 'undefined' && currentButton.length > 0 && typeof buttons !== 'undefined' && buttons.length > 0 && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(___WEBPACK_IMPORTED_MODULE_2__["ButtonEditor"], {
    data: data
  }));
};

/***/ }),

/***/ "./src/admin/components/buttonsSettings/createButton.js":
/*!**************************************************************!*\
  !*** ./src/admin/components/buttonsSettings/createButton.js ***!
  \**************************************************************/
/*! exports provided: CreateButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateButton", function() { return CreateButton; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../ */ "./src/admin/components/index.js");








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }





var CreateButton = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(CreateButton, _Component);

  var _super = _createSuper(CreateButton);

  function CreateButton(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, CreateButton);

    _this = _super.call(this, props);
    _this.state = {
      buttonName: ''
    };
    _this.setButton = _this.setButton.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    _this.setButtonName = _this.setButtonName.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(CreateButton, [{
    key: "setButtonName",
    value: function setButtonName(value) {
      this.setState({
        buttonName: value
      });
    }
  }, {
    key: "setButton",
    value: function setButton(buttonName, actions) {
      if (typeof buttonName === 'undefined' || buttonName === '') {
        actions.notice({
          state: true,
          status: 'warning',
          message: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('Define a button name before creating it', 'direct-stripe')
        });
      } else {
        actions.spinner();

        function uniqueNumber() {
          var date = Date.now();

          if (date <= uniqueNumber.previous) {
            date = ++uniqueNumber.previous;
          } else {
            uniqueNumber.previous = date;
          }

          return date;
        }

        uniqueNumber.previous = 0;

        function ID() {
          return uniqueNumber();
        }

        var buttonID = 'ds' + ID();
        var buttonValues = {
          id: buttonID,
          data: JSON.stringify({
            text: buttonName,
            value: buttonID,
            type: 'payment',
            amount: 1000,
            button_id: buttonID,
            name: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('Company Name', 'direct-stripe'),
            description: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('Description', 'direct-stripe'),
            label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('Payment', 'direct-stripe'),
            panellabel: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_8__["__"])('Confirm payment', 'direct-stripe'),
            coupon: '',
            setup_fee: '',
            zero_decimal: false,
            capture: true,
            billing: false,
            shipping: false,
            tc: false,
            rememberme: false,
            display_amount: false,
            currency: 'USD',
            locale: 'auto'
          })
        };
        Object(___WEBPACK_IMPORTED_MODULE_9__["setButtons"])(buttonValues, actions, false);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.data.notice({
        state: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var data = this.props.data,
          buttonName = this.state.buttonName,
          actions = {
        resetButtons: data.resetButtons,
        spinner: data.spinner,
        notice: data.notice
      };
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__["Card"], {
        className: "ds-createButtonCard",
        size: "small",
        isElevated: "true",
        isBorderless: "true"
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__["CardBody"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__["TextControl"], {
        label: data.strings.createButtonsTitle,
        value: buttonName,
        onChange: function onChange(value) {
          return _this2.setButtonName(value);
        }
      })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__["CardBody"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__["Button"], {
        isPrimary: "true",
        onClick: function onClick() {
          return _this2.setButton(buttonName, actions);
        }
      }, data.strings.createButtons))));
    }
  }]);

  return CreateButton;
}(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["Component"]);

/***/ }),

/***/ "./src/admin/components/buttonsSettings/index.js":
/*!*******************************************************!*\
  !*** ./src/admin/components/buttonsSettings/index.js ***!
  \*******************************************************/
/*! exports provided: CreateButton, SelectButton, ButtonEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createButton_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createButton.js */ "./src/admin/components/buttonsSettings/createButton.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CreateButton", function() { return _createButton_js__WEBPACK_IMPORTED_MODULE_0__["CreateButton"]; });

/* harmony import */ var _selectButton_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selectButton.js */ "./src/admin/components/buttonsSettings/selectButton.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectButton", function() { return _selectButton_js__WEBPACK_IMPORTED_MODULE_1__["SelectButton"]; });

/* harmony import */ var _buttonEditor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./buttonEditor.js */ "./src/admin/components/buttonsSettings/buttonEditor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ButtonEditor", function() { return _buttonEditor_js__WEBPACK_IMPORTED_MODULE_2__["ButtonEditor"]; });






/***/ }),

/***/ "./src/admin/components/buttonsSettings/selectButton.js":
/*!**************************************************************!*\
  !*** ./src/admin/components/buttonsSettings/selectButton.js ***!
  \**************************************************************/
/*! exports provided: SelectButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectButton", function() { return SelectButton; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);



var SelectButton = function SelectButton(props) {
  if (typeof props.data.buttons !== 'undefined' && Object.keys(props.data.buttons[0]).length > 0) {
    props.data.buttons.unshift({});
  }

  var selectLabel = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["__experimentalText"], {
    variant: "title"
  }, props.data.strings.selectButton);
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__["SelectControl"], {
    className: "ds-select-current-button",
    label: selectLabel,
    value: props.data.currentButton,
    options: props.data.buttons,
    onChange: function onChange(value) {
      props.data.setButton(value);
    }
  });
};

/***/ }),

/***/ "./src/admin/components/emailsSettings/emailsSettings.js":
/*!***************************************************************!*\
  !*** ./src/admin/components/emailsSettings/emailsSettings.js ***!
  \***************************************************************/
/*! exports provided: EmailsSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailsSettings", function() { return EmailsSettings; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }


var EmailsSettings = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(EmailsSettings, _React$Component);

  var _super = _createSuper(EmailsSettings);

  function EmailsSettings() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, EmailsSettings);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(EmailsSettings, [{
    key: "render",
    value: function render() {
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__["createElement"])("div", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["HorizontalRule"], null));
    }
  }]);

  return EmailsSettings;
}(React.Component);

/***/ }),

/***/ "./src/admin/components/globalSettings/globalSettings.js":
/*!***************************************************************!*\
  !*** ./src/admin/components/globalSettings/globalSettings.js ***!
  \***************************************************************/
/*! exports provided: GlobalSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalSettings", function() { return GlobalSettings; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }


var GlobalSettings = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(GlobalSettings, _React$Component);

  var _super = _createSuper(GlobalSettings);

  function GlobalSettings() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, GlobalSettings);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(GlobalSettings, [{
    key: "render",
    value: function render() {
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__["createElement"])("div", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["HorizontalRule"], null));
    }
  }]);

  return GlobalSettings;
}(React.Component);

/***/ }),

/***/ "./src/admin/components/index.js":
/*!***************************************!*\
  !*** ./src/admin/components/index.js ***!
  \***************************************/
/*! exports provided: GlobalSettings, StylesSettings, EmailsSettings, ButtonsSettings, getButtons, setButtons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _globalSettings_globalSettings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globalSettings/globalSettings.js */ "./src/admin/components/globalSettings/globalSettings.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GlobalSettings", function() { return _globalSettings_globalSettings_js__WEBPACK_IMPORTED_MODULE_0__["GlobalSettings"]; });

/* harmony import */ var _stylesSettings_stylesSettings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stylesSettings/stylesSettings.js */ "./src/admin/components/stylesSettings/stylesSettings.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StylesSettings", function() { return _stylesSettings_stylesSettings_js__WEBPACK_IMPORTED_MODULE_1__["StylesSettings"]; });

/* harmony import */ var _emailsSettings_emailsSettings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emailsSettings/emailsSettings.js */ "./src/admin/components/emailsSettings/emailsSettings.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EmailsSettings", function() { return _emailsSettings_emailsSettings_js__WEBPACK_IMPORTED_MODULE_2__["EmailsSettings"]; });

/* harmony import */ var _buttonsSettings_buttonsSettings_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./buttonsSettings/buttonsSettings.js */ "./src/admin/components/buttonsSettings/buttonsSettings.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ButtonsSettings", function() { return _buttonsSettings_buttonsSettings_js__WEBPACK_IMPORTED_MODULE_3__["ButtonsSettings"]; });

/* harmony import */ var _settings_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./settings-api */ "./src/admin/components/settings-api.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getButtons", function() { return _settings_api__WEBPACK_IMPORTED_MODULE_4__["getButtons"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setButtons", function() { return _settings_api__WEBPACK_IMPORTED_MODULE_4__["setButtons"]; });








/***/ }),

/***/ "./src/admin/components/settings-api.js":
/*!**********************************************!*\
  !*** ./src/admin/components/settings-api.js ***!
  \**********************************************/
/*! exports provided: getSettings, getButtons, setSettings, setButtons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSettings", function() { return getSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getButtons", function() { return getButtons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSettings", function() { return setSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setButtons", function() { return setButtons; });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);




var api = ds_admin_app_vars.api;
_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default.a.use(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default.a.createNonceMiddleware(api.nonce));
var getSettings = function getSettings() {
  _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
    url: api.settings
  }).then(function (settings) {
    return settings;
  });
};
var getButtons = /*#__PURE__*/function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
    var buttons;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
              url: api.buttons
            });

          case 2:
            buttons = _context.sent;
            return _context.abrupt("return", buttons);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getButtons() {
    return _ref.apply(this, arguments);
  };
}();
var setSettings = function setSettings(settings) {
  _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
    url: api.settings,
    method: 'POST',
    data: {
      settings: settings
    }
  }).then(function (res) {
    console.log(res);
  });
};
var setButtons = /*#__PURE__*/function () {
  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2(button, actions, isDelete) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
              url: api.buttons + '?_wpnonce=' + api.nonce,
              method: 'POST',
              data: button,
              delete: isDelete ? 'yes' : false
            }).then(function (res) {
              if (!res) {
                actions.notice({
                  state: true,
                  status: 'error',
                  message: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Something wrong happened, couldn't create the Stripe button", 'direct-stripe')
                });
              } else {
                actions.resetButtons();
                actions.notice({
                  state: true,
                  status: 'success',
                  message: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Button saved with success', 'direct-stripe')
                });
                setTimeout(function () {
                  actions.notice({
                    state: false
                  });
                }, 5000);
              }
            });

          case 2:
            actions.spinner();

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function setButtons(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/admin/components/stylesSettings/stylesSettings.js":
/*!***************************************************************!*\
  !*** ./src/admin/components/stylesSettings/stylesSettings.js ***!
  \***************************************************************/
/*! exports provided: StylesSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StylesSettings", function() { return StylesSettings; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }


var StylesSettings = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(StylesSettings, _React$Component);

  var _super = _createSuper(StylesSettings);

  function StylesSettings() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, StylesSettings);

    return _super.apply(this, arguments);
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(StylesSettings, [{
    key: "render",
    value: function render() {
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__["createElement"])("div", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["HorizontalRule"], null));
    }
  }]);

  return StylesSettings;
}(React.Component);

/***/ }),

/***/ "./src/admin/components/tabs.js":
/*!**************************************!*\
  !*** ./src/admin/components/tabs.js ***!
  \**************************************/
/*! exports provided: DsTabPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DsTabPanel", function() { return DsTabPanel; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ */ "./src/admin/components/index.js");








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




var DsTabPanel = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(DsTabPanel, _Component);

  var _super = _createSuper(DsTabPanel);

  function DsTabPanel(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DsTabPanel);

    _this = _super.call(this, props);
    _this.state = {
      buttons: _this.resetButtons(),
      currentButton: '',
      spinner: false,
      notice: {
        state: false,
        status: '',
        message: '',
        context: ''
      }
    };
    _this.handleSpinner = _this.handleSpinner.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    _this.handleNotice = _this.handleNotice.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    _this.removeNotice = _this.removeNotice.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    _this.resetButtons = _this.resetButtons.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    _this.setCurrentButton = _this.setCurrentButton.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(DsTabPanel, [{
    key: "handleSpinner",
    value: function handleSpinner() {
      this.setState({
        spinner: !this.state.spinner
      });
    }
  }, {
    key: "handleNotice",
    value: function handleNotice(notice) {
      this.setState({
        notice: {
          state: notice.state,
          status: notice.status,
          message: notice.message
        }
      });
    }
  }, {
    key: "removeNotice",
    value: function removeNotice() {
      this.setState({
        notice: {
          state: false,
          status: '',
          message: ''
        }
      });
    }
  }, {
    key: "resetButtons",
    value: function resetButtons() {
      var _this2 = this;

      Object(___WEBPACK_IMPORTED_MODULE_8__["getButtons"])().then(function (buttonsData) {
        if (typeof buttonsData !== 'undefined') {
          Object.values(buttonsData).map(function (data) {
            data.label = data.text;
          });

          _this2.setState({
            buttons: Object.values(buttonsData)
          });
        }
      });
    }
  }, {
    key: "setCurrentButton",
    value: function setCurrentButton(button) {
      this.setState({
        currentButton: button
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var handleSpinner = this.handleSpinner,
          handleNotice = this.handleNotice,
          setCurrentButton = this.setCurrentButton,
          resetButtons = this.resetButtons,
          state = this.state,
          props = this.props,
          currentButton = state.currentButton,
          buttons = state.buttons,
          strings = props.strings,
          passedData = {
        spinner: handleSpinner,
        notice: handleNotice,
        setButton: setCurrentButton,
        resetButtons: resetButtons,
        buttons: buttons,
        currentButton: currentButton,
        strings: strings
      };
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
        className: "ds-spinner ".concat(this.state.spinner ? 'active' : 'hidden')
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__["Spinner"], null)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__["TabPanel"], {
        className: "ds-tab-panel",
        activeClass: "ds-active-tab",
        tabs: [{
          name: 'global',
          title: strings['general'],
          className: 'ds-global-settings',
          content: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])(___WEBPACK_IMPORTED_MODULE_8__["GlobalSettings"], null)
        }, {
          name: 'styles',
          title: strings['styles'],
          className: 'ds-styles-settings',
          content: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])(___WEBPACK_IMPORTED_MODULE_8__["StylesSettings"], null)
        }, {
          name: 'emails',
          title: strings['emails'],
          className: 'ds-emails-settings',
          content: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])(___WEBPACK_IMPORTED_MODULE_8__["EmailsSettings"], null)
        }, {
          name: 'buttons',
          title: strings['buttons'],
          className: 'ds-buttons-settings',
          content: Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])(___WEBPACK_IMPORTED_MODULE_8__["ButtonsSettings"], {
            data: passedData
          })
        }]
      }, function (tab) {
        return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])("div", {
          className: "ds-notice ".concat(_this3.state.notice.state ? 'active' : '')
        }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__["Notice"], {
          status: _this3.state.notice.status,
          onRemove: _this3.removeNotice
        }, _this3.state.notice.message)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__["HorizontalRule"], null), tab.content);
      }));
    }
  }]);

  return DsTabPanel;
}(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__["Component"]);

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*************************************!*\
  !*** external "regeneratorRuntime" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["regeneratorRuntime"]; }());

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["apiFetch"]; }());

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["components"]; }());

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["domReady"]; }());

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["element"]; }());

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["i18n"]; }());

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["React"]; }());

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["ReactDOM"]; }());

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map