module.exports =
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 157);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(125);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(126);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var prefix = 's';
var inserted = {};

// Base64 encoding and decoding - The "Unicode Problem"
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

/**
 * Remove style/link elements for specified node IDs
 * if they are no longer referenced by UI components.
 */
function removeCss(ids) {
  ids.forEach(function (id) {
    if (--inserted[id] <= 0) {
      var elem = document.getElementById(prefix + id);
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }
  });
}

/**
 * Example:
 *   // Insert CSS styles object generated by `css-loader` into DOM
 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
 *
 *   // Remove it from the DOM
 *   removeCss();
 */
function insertCss(styles) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$replace = _ref.replace,
      replace = _ref$replace === undefined ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === undefined ? false : _ref$prepend;

  var ids = [];
  for (var i = 0; i < styles.length; i++) {
    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];

    var id = moduleId + '-' + i;

    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;

    var elem = document.getElementById(prefix + id);
    var create = false;

    if (!elem) {
      create = true;

      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = prefix + id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;
    if (sourceMap && typeof btoa === 'function') {
      // skip IE9 and below, see http://caniuse.com/atob-btoa
      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_isomorphic_style_loader_lib_withStyles__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0_isomorphic_style_loader_lib_withStyles___default.a; });



/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = { "server": { "buildPath": "/home/johan/Project/Vagalam/build", "filename": "server_bundle.js", "host": null, "port": 3000 }, "basePath": "", "publicPath": "/assets", "servePublic": true, "client": { "buildPath": "/home/johan/Project/Vagalam/public", "filename": "client_bundle.[hash].js", "serviceWorker": false, "targetBrowsers": [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"] }, "webpack": { "alias": {}, "noParse": "(mapbox-gl)\\.js$" }, "filesPath": "files", "rootElementId": "vitamin-app", "moduleMap": { "__app_modules__routes__": "/home/johan/Project/Vagalam/src/rootRoutes", "__app_modules__server_middlewares__": "/home/johan/Project/Vagalam/src/server/middlewares", "__app_modules__server_ErrorPage__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/src/server/components/ErrorPage", "__app_modules__server_onError__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/config/utils/defaultFunction", "__app_modules__server_layout__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/src/server/components/HTMLLayout", "__app_modules__server_createInitAction__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/config/utils/defaultFunction", "__app_modules__redux_reducers__": "/home/johan/Project/Vagalam/src/rootReducers", "__app_modules__redux_middlewares__": "/home/johan/Project/Vagalam/src/middlewares", "__app_modules__redux_enhancers__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/config/utils/emptyArray", "__app_modules__redux_stateSerializer__": "/home/johan/Project/Vagalam/node_modules/vitaminjs/src/shared/defaultStateSerializer" } };

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__rootSelectors__ = __webpack_require__(26);






const postsSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ramda__["pipe"])(__WEBPACK_IMPORTED_MODULE_2__rootSelectors__["a" /* tripSelector */], trip => trip.posts);
/* harmony export (immutable) */ __webpack_exports__["a"] = postsSelector;

const pathSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ramda__["pipe"])(__WEBPACK_IMPORTED_MODULE_2__rootSelectors__["a" /* tripSelector */], trip => trip.path);
/* harmony export (immutable) */ __webpack_exports__["e"] = pathSelector;

const currentAnimationSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ramda__["pipe"])(__WEBPACK_IMPORTED_MODULE_2__rootSelectors__["a" /* tripSelector */], trip => trip.currentAnimation);
/* harmony export (immutable) */ __webpack_exports__["c"] = currentAnimationSelector;

const userArrivedToLastPointSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ramda__["pipe"])(__WEBPACK_IMPORTED_MODULE_2__rootSelectors__["a" /* tripSelector */], trip => trip.userArrivedToLastPoint);
/* harmony export (immutable) */ __webpack_exports__["d"] = userArrivedToLastPointSelector;

const currentPathSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(pathSelector, ({ app: { trip: { currentMapPointId } } }) => currentMapPointId, (path, currentMapPointId) => {
    const currentMapPointIndex = path.findIndex(({ id }) => id === currentMapPointId);
    return path.slice(0, currentMapPointIndex + 1);
});
/* harmony export (immutable) */ __webpack_exports__["b"] = currentPathSelector;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = goToNextStep;
/* harmony export (immutable) */ __webpack_exports__["b"] = goToPreviousStep;
/* harmony export (immutable) */ __webpack_exports__["d"] = addFetchedSleepLocations;
/* harmony export (immutable) */ __webpack_exports__["e"] = addFetchedPointsOfInterest;
/* harmony export (immutable) */ __webpack_exports__["c"] = notifyAnimationEnd;


function goToNextStep() {
    return {
        type: 'app/trip/GO_TO_NEXT_STEP'
    };
}


function goToPreviousStep() {
    return {
        type: 'app/trip/GO_TO_PREVIOUS_STEP'
    };
}

function addFetchedSleepLocations(sleepLocations) {
    return {
        type: 'app/trip/ADD_FETCHED_SLEEP_LOCATIONS',
        sleepLocations
    };
}

function addFetchedPointsOfInterest(pointsOfInterest) {
    return {
        type: 'app/trip/ADD_FETCHED_POINTS_OF_INTEREST',
        pointsOfInterest
    };
}

function notifyAnimationEnd() {
    return {
        type: 'app/trip/CURRENT_ANIMATION_ENDED'
    };
}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("redux-observable");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("reselect");

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rootSelectors__ = __webpack_require__(26);




const emailSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["pipe"])(__WEBPACK_IMPORTED_MODULE_1__rootSelectors__["b" /* visitorSelector */], visitor => visitor ? visitor.email : null);
/* harmony export (immutable) */ __webpack_exports__["a"] = emailSelector;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(89);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../../css-loader/index.js??ref--1-1!../../../../../postcss-loader/index.js!./style.css", function() {
        content = require("!!../../../../../css-loader/index.js??ref--1-1!../../../../../postcss-loader/index.js!./style.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("rxjs/Observable");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/filter");

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function defaultFunction() {});

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);

/* eslint max-len: "off" */

// Pineapple with love from http://emojione.com/

/* harmony default export */ __webpack_exports__["a"] = (function pineapple() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "svg",
        { viewBox: "0 0 64 64", enableBackground: "new 0 0 64 64" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "g",
            { fill: "#64892f" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m16.935 11.238c4.893 4.894 5.663 8.215 4.092 9.788-1.573 1.572-4.894.802-9.787-4.092-4.895-4.895-7.936-13.632-7.936-13.632s8.736 3.041 13.631 7.936" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m23.71 14.12c2.924 6.273 2.512 9.657.496 10.597-2.02.94-4.872-.919-7.796-7.193-2.927-6.272-2.795-15.522-2.795-15.522s7.169 5.845 10.1 12.12" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m29.632 21.245c-2.881 6.294-5.724 8.173-7.746 7.249-2.02-.925-2.458-4.306.422-10.6 2.88-6.294 10.01-12.191 10.01-12.191s.197 9.248-2.683 15.542" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m26.912 17.956c-.398 6.91-2.365 9.694-4.587 9.565-2.22-.128-3.853-3.12-3.453-10.03.399-6.911 4.899-14.992 4.899-14.992s3.542 8.546 3.141 15.457" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m33.2 23.979c-4.449 5.302-7.689 6.358-9.394 4.93-1.703-1.429-1.226-4.805 3.224-10.11s12.888-9.09 12.888-9.09-2.268 8.968-6.718 14.27" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m14.12 23.708c6.273 2.926 9.656 2.514 10.595.498.941-2.02-.918-4.872-7.19-7.797-6.274-2.926-15.524-2.795-15.524-2.795s5.847 7.169 12.12 10.09" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m21.245 29.631c6.294-2.88 8.174-5.724 7.248-7.746-.924-2.02-4.307-2.457-10.6.423-6.293 2.88-12.189 10.01-12.189 10.01s9.247.196 15.541-2.685" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m17.957 26.912c6.909-.398 9.693-2.366 9.564-4.587-.128-2.219-3.119-3.853-10.03-3.454s-14.991 4.9-14.991 4.9 8.546 3.541 15.457 3.141" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m23.98 33.2c5.302-4.448 6.358-7.689 4.929-9.393-1.429-1.704-4.805-1.225-10.11 3.224-5.303 4.449-9.09 12.888-9.09 12.888s8.969-2.269 14.271-6.719" })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { fill: "#b46137", d: "m55.909 31.2c7.997 7.997 5.762 16.826-1.062 23.649-6.823 6.824-15.653 9.06-23.648 1.063-7.997-7.997-14.739-25.803-7.916-32.627 6.824-6.824 24.63-.082 32.626 7.915" }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "g",
            { fill: "#e7a74f" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m47.05 47.05c-.973.973-2.11 4.344-1.207 5.248.906.904 4.276-.233 5.25-1.207.972-.973 2.11-4.344 1.206-5.248s-4.277.234-5.249 1.207" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m52.873 52.873c-.973.974-1.821 4.635-.916 5.539.904.904 7.359-5.552 6.455-6.455-.904-.905-4.566-.057-5.539.916" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m34.833 34.832c-.974.973-2.11 4.344-1.208 5.248.905.904 4.275-.233 5.249-1.206.973-.974 2.111-4.345 1.207-5.249s-4.276.234-5.248 1.207" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m40.941 40.941c-.973.973-2.111 4.344-1.207 5.248s4.276-.234 5.249-1.207 2.111-4.344 1.207-5.248-4.276.234-5.249 1.207" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m28.975 28.973c-.973.973-2.11 4.345-1.207 5.249s4.275-.233 5.249-1.206c.972-.973 2.11-4.346 1.206-5.25s-4.277.234-5.248 1.207" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m29.13 52c-1.383 1.383-1.01 5.797 3.589 6.958 1.219.308 3.497-7.446 2.593-8.351-1.676-1.675-5.292.502-6.182 1.393" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m36.449 57.65c-3.495 3.496 2.351 5.733 4.706 3.377.891-.889 1.17-3.402.266-4.307-.903-.904-4.081.041-4.972.93" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m38.15 48.996c-.973.973-2.101 5.096-1.196 6s5.218-.031 6.191-1c.973-.973 1.526-4.82.622-5.725-.904-.903-4.645-.244-5.617.729" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m44.34 55.19c-.973.974-1.764 4.691-.859 5.596 1.676 1.678 4.855.346 5.827-.627.973-.973 1.532-4.924.628-5.828-.904-.905-4.622-.114-5.596.859" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m32.21 43.06c-.974.973-2.355 4.841-1.451 5.745.903.904 5.111-.139 6.083-1.111.973-.973 1.772-4.686.868-5.59-.904-.904-4.527-.017-5.5.956" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m20.572 31.27c-.972.973-1.421 3.656-.519 4.561.904.904 3.589.454 4.561-.519.973-.974 2.111-4.345 1.207-5.249s-4.275.234-5.249 1.207" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m20.638 38.05c-.889.89.761 6.509 1.65 5.618.89-.889 2.447-4.68 1.543-5.584s-2.304-.924-3.193-.034" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m24.321 45.34c-1.161 1.16-1.399 6.221 1.848 6.666 1.247.171 4.154-6.388 3.25-7.292-.904-.905-4.208-.265-5.098.626" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m26.24 37.09c-.973.973-1.835 4.73-.931 5.636.903.904 4.772.152 5.746-.821.972-.973 1.614-4.731.71-5.636s-4.551-.153-5.525.821" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m52.01 29.13c1.383-1.383 5.796-1.01 6.957 3.588.309 1.22-7.447 3.498-8.351 2.594-1.675-1.678.502-5.292 1.394-6.182" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m57.65 36.449c3.495-3.496 5.733 2.35 3.378 4.707-.891.889-3.404 1.169-4.307.266-.905-.905.041-4.083.929-4.973" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m48.996 38.15c.973-.973 5.097-2.101 6-1.196s-.032 5.218-1.01 6.192c-.973.973-4.819 1.525-5.724.621-.903-.904-.244-4.644.729-5.617" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m55.19 44.34c.973-.973 4.689-1.764 5.595-.859 1.677 1.677.346 4.855-.627 5.828s-4.923 1.532-5.827.628c-.905-.904-.115-4.623.859-5.597" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m43.06 32.21c.973-.974 4.841-2.356 5.744-1.451.904.904-.138 5.112-1.111 6.085s-4.685 1.771-5.588.866c-.905-.903-.018-4.527.955-5.5" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m31.27 20.572c.973-.973 3.656-1.423 4.561-.519s.454 3.588-.519 4.561c-.974.973-4.344 2.111-5.249 1.207-.905-.904.234-4.277 1.207-5.249" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m38.06 20.637c.888-.889 6.508.761 5.617 1.651-.889.889-4.68 2.447-5.584 1.542s-.924-2.303-.033-3.193" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m45.34 24.32c1.163-1.161 6.223-1.399 6.667 1.848.172 1.246-6.388 4.154-7.291 3.25-.906-.904-.265-4.208.624-5.098" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m37.09 26.24c.973-.973 4.73-1.836 5.635-.932s.153 4.773-.82 5.747c-.973.972-4.732 1.614-5.636.71-.905-.905-.153-4.552.821-5.525" })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "g",
            { fill: "#84b234" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m21.91 18.431c3.731 3.732 4.512 6.07 3.551 7.03-.96.96-3.298.179-7.03-3.552s-6.482-9.96-6.482-9.96 6.228 2.749 9.96 6.481" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m25.719 31.508c3.302-2.652 3.783-4.798 2.672-6.076-1.11-1.278-3.392-1.206-6.695 1.447-3.302 2.652-5.267 8.159-5.267 8.159s5.986-.878 9.29-3.53" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m21.385 24.16c4.657-.046 6.887 1.182 7.234 2.717.351 1.536-1.313 2.8-5.968 2.846-4.657.044-10.892-2.684-10.892-2.684s4.97-2.835 9.626-2.879" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m20.91 20.394c4.774 1.292 6.702 3.03 6.62 4.51-.081 1.479-2.145 2.14-6.919.848-4.773-1.293-10.368-5.526-10.368-5.526s5.893-1.124 10.667.168" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m31.509 25.717c-2.652 3.303-4.799 3.783-6.075 2.673-1.279-1.111-1.206-3.393 1.445-6.696 2.653-3.303 8.159-5.266 8.159-5.266s-.877 5.987-3.529 9.289" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m24.16 21.385c-.046 4.656 1.182 6.885 2.718 7.234 1.535.35 2.801-1.313 2.846-5.969.044-4.657-2.684-10.892-2.684-10.892s-2.835 4.971-2.88 9.627" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "m20.396 20.909c1.291 4.775 3.03 6.703 4.51 6.621 1.479-.083 2.139-2.145.848-6.919-1.295-4.775-5.527-10.37-5.527-10.37s-1.123 5.894.169 10.668" })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { fill: "#8cc63e", d: "m29.788 22.538c-1.119-2.154-3.348-3.82-3.348-3.82s-.758 1.684-1.186 3.634c-2.123-.919-5.643-2.74-5.643-2.74s1.82 3.521 2.741 5.643c-1.951.428-3.634 1.185-3.634 1.185s1.666 2.228 3.819 3.347c-1.649 2.323-2.462 5.478-2.462 5.478s6.226-1.841 9.785-5.402c3.562-3.562 5.403-9.787 5.403-9.787s-3.152.813-5.475 2.462" })
    );
});

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return renderLayout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom_server__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_resolver__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_resolver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_resolver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_modules_server_layout___ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_App__ = __webpack_require__(43);


function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }




// eslint-disable-next-line import/no-extraneous-dependencies





/* eslint-disable react/no-danger */
const renderLayout = (_ref) => {
    let { appHTMLString } = _ref,
        props = _objectWithoutProperties(_ref, ['appHTMLString']);

    return `${__WEBPACK_IMPORTED_MODULE_4__app_modules_server_layout___["a" /* default */].doctype ? `${__WEBPACK_IMPORTED_MODULE_4__app_modules_server_layout___["a" /* default */].doctype}\n` : ''}${__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_dom_server__["renderToStaticMarkup"])(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_4__app_modules_server_layout___["a" /* default */],
        props,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { id: __WEBPACK_IMPORTED_MODULE_5__config___default.a.rootElementId },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { dangerouslySetInnerHTML: { __html: appHTMLString } })
        )
    ))}`;
};

// Return a promise that resolves to the HTML string

/* harmony default export */ __webpack_exports__["a"] = (function render(renderProps, store, mainEntry) {
    const css = [];
    const insertCss = styles => css.push(styles._getCss());
    return __WEBPACK_IMPORTED_MODULE_3_react_resolver__["Resolver"].resolve(() => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__components_App__["a" /* default */], { renderProps, store, mainEntry, insertCss })).then(({ Resolved, data }) => renderLayout({
        appHTMLString: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_dom_server__["renderToString"])(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_helmet___default.a, {
                script: [{ innerHTML: `window.__REACT_RESOLVER_PAYLOAD__ = ${JSON.stringify(data)};` }]
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Resolved, null)
        )),
        style: css.join(''),
        head: __WEBPACK_IMPORTED_MODULE_2_react_helmet___default.a.rewind()
    }));
});

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);



class CSSProvider extends __WEBPACK_IMPORTED_MODULE_1_react__["Component"] {

    getChildContext() {
        return {
            insertCss: this.props.insertCss
        };
    }

    render() {
        return this.props.children;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CSSProvider;

CSSProvider.propTypes = {
    insertCss: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
    children: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.element.isRequired
};
CSSProvider.childContextTypes = {
    insertCss: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired
};

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reselect__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_reselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__selectors__ = __webpack_require__(7);





const currentPostSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_reselect__["createSelector"])(__WEBPACK_IMPORTED_MODULE_2__selectors__["a" /* postsSelector */], __WEBPACK_IMPORTED_MODULE_2__selectors__["b" /* currentPathSelector */], __WEBPACK_IMPORTED_MODULE_2__selectors__["c" /* currentAnimationSelector */], (posts, currentPath, currentAnimation) => {
    if (currentAnimation === 'Map') {
        return null;
    }
    const currentMapPoint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["last"])(currentPath);
    if (!currentMapPoint || !currentMapPoint.postId) {
        return null;
    }
    const currentPost = posts[currentMapPoint.postId];
    if (!currentPost) {
        throw new Error('The post id was not fetched');
    }
    return currentPost;
});
/* harmony export (immutable) */ __webpack_exports__["b"] = currentPostSelector;


const isFullscreenPostDisplayedSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_reselect__["createSelector"])(currentPostSelector, currentPost => currentPost && currentPost.pictures.length);
/* harmony export (immutable) */ __webpack_exports__["a"] = isFullscreenPostDisplayedSelector;


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    mapboxAccessToken: 'pk.eyJ1IjoiZ2FuY2VhYiIsImEiOiJjajQ0OHZjZzgxOGY3MndzOTh6YTFjbmNyIn0.0pHsI5xrBMh9YMftXmLQKw',
    mailchimp: {
        masterListId: 'f92f079c89',
        APIKey: process.env.MAILCHIMP_API_KEY,
        emailFrequencyIds: {
            ALWAYS: 'c771900d17',
            SOMETIMES: '0d75f6d649',
            NEVER: '0141ce329c'
        }
    }
});

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


const tripSelector = state => state.app.trip;
/* harmony export (immutable) */ __webpack_exports__["a"] = tripSelector;


const visitorSelector = state => state.app.visitor;
/* harmony export (immutable) */ __webpack_exports__["b"] = visitorSelector;


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style_css__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }





const FrameLayout = (_ref = {}) => {
    let {
        top,
        bottom,
        children,
        frameBackgroundColor = 'white',
        freeRatio = false
    } = _ref,
        otherProps = _objectWithoutProperties(_ref, ['top', 'bottom', 'children', 'frameBackgroundColor', 'freeRatio']);

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        _extends({ className: __WEBPACK_IMPORTED_MODULE_2__style_css___default.a.layout }, otherProps, { style: { backgroundColor: frameBackgroundColor } }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_2__style_css___default.a.top },
            top
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_2__style_css___default.a.inside, style: freeRatio ? { maxWidth: 'none' } : {} },
            children
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_2__style_css___default.a.bottom },
            bottom
        )
    );
};

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_2__style_css___default.a)(FrameLayout));

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_transition_group__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_transition_group___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_transition_group__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vitaminjs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_css__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__style_css__);








class Modale extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(props) {
        super(props);

        this.handleKeyDown = e => {
            if (e.key === 'Escape') {
                this.handleClose();
            }
        };

        this.handleClose = () => {
            this.props.onClose();
            this.setState({ isOpened: false });
        };

        this.state = {
            isOpened: props.isOpened
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isOpened !== nextProps.isOpened && this.state.isOpened !== nextProps.isOpened) {
            this.setState({
                isOpened: nextProps.isOpened
            });
        }
    }

    render() {
        const { children, fullScreen } = this.props;
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_react_transition_group__["CSSTransitionGroup"],
            {
                transitionEnterTimeout: 800,
                transitionLeaveTimeout: 500,
                transitionName: {
                    enter: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a.enter,
                    enterActive: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a['enter-active'],
                    leave: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a.leave,
                    leaveActive: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a['leave-active']
                }
            },
            this.state.isOpened ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { role: 'presentation', className: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a.overlay, onKeyDown: this.handleKeyDown },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()(__WEBPACK_IMPORTED_MODULE_4__style_css___default.a.modale, { [__WEBPACK_IMPORTED_MODULE_4__style_css___default.a.fullscreen]: fullScreen }) },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        {
                            className: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a['close-button'],
                            'aria-label': 'Fermer',
                            onClick: this.handleClose
                        },
                        'X'
                    ),
                    children
                )
            ) : null
        );
    }
}

Modale.defaultProps = {
    isOpened: true,
    fullScreen: false,
    onClose: () => {}
};
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_4__style_css___default.a)(Modale));

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("freactal");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("prismic.io");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("react-motion");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("rxjs/add/observable/empty");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("rxjs/add/observable/fromPromise");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/mergeMap");

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chalk__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_fetch__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_node_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_node_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_readline__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_readline___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_readline__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_http_graceful_shutdown__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_http_graceful_shutdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_http_graceful_shutdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__appMiddleware__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__config__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__config__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable global-require, no-console */












global.fetch = __WEBPACK_IMPORTED_MODULE_3_node_fetch___default.a;

let currentApp = __WEBPACK_IMPORTED_MODULE_6__appMiddleware__["a" /* default */];
function appServer() {
    const app = new __WEBPACK_IMPORTED_MODULE_0_koa___default.a();
    app.use(currentApp
    // ecapsulate app for hot reload
    );
    return app.callback();
}

const mountedServer = __WEBPACK_IMPORTED_MODULE_1_express___default()();

const { port, host } = __WEBPACK_IMPORTED_MODULE_7__config___default.a.server;
mountedServer.use(__WEBPACK_IMPORTED_MODULE_7__config___default.a.basePath, appServer());

const server = mountedServer.listen(process.env.PORT || port, process.env.HOST || host, () => {
    __WEBPACK_IMPORTED_MODULE_4_readline___default.a.clearLine(process.stdout);
    __WEBPACK_IMPORTED_MODULE_4_readline___default.a.cursorTo(0, process.stdout);
    process.stdout.write(`\x1b[0G${__WEBPACK_IMPORTED_MODULE_2_chalk___default.a.green('\u2713')} Server listening on: ${__WEBPACK_IMPORTED_MODULE_2_chalk___default.a.bold.underline(`http://${host}:${port}${__WEBPACK_IMPORTED_MODULE_7__config___default.a.basePath}`)}\n`);
    if (false) {
        console.log(`${chalk.green('\u2713')} ${chalk.bold('Hot module reload')} activated`);
        process.stdout.write(`\x1b[0G${chalk.blue('\uD83D\uDD50  Building client bundle [in memory]...')}`);
    }
});

__WEBPACK_IMPORTED_MODULE_5_http_graceful_shutdown___default()(server, {
    signals: 'SIGINT SIGTERM SIGQUIT',
    timeout: 15000,
    development: false,
    callback: () => {}
});

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ([]);

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_helmet__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_helmet__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0_react_helmet___default.a; });



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_router__);
/* unused harmony reexport Link */
/* unused harmony reexport IndexLink */
/* unused harmony reexport withRouter */
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0_react_router__, "Route")) __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0_react_router__["Route"]; });
/* unused harmony reexport Redirect */
/* unused harmony reexport IndexRoute */
/* unused harmony reexport IndexRedirect */
/* unused harmony reexport PropTypes */
/* unused harmony reexport browserHistory */


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_compose__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_compose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_compose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_etag__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_etag___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_etag__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_conditional_get__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_conditional_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_koa_conditional_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__middlewares_errorHandler__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_modules_server_middlewares___ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__middlewares_renderer__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__middlewares_store__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__middlewares_router__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__middlewares_initActionDispatcher__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__middlewares_staticAssetsServer__ = __webpack_require__(52);




/*
 * We want to load errorHandler first, because usually, the global uncaught exception
 * catch will be instanciated inside it.
 */

// eslint-disable-next-line import/no-extraneous-dependencies, import/first








/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_koa_compose___default()([
// Enable Hot Reload when vitamin devServer url differs from app url (externalUrl)
false && ((ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    return next();
}), __WEBPACK_IMPORTED_MODULE_2_koa_conditional_get___default()(), __WEBPACK_IMPORTED_MODULE_1_koa_etag___default()(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__middlewares_errorHandler__["a" /* default */])(), ...__WEBPACK_IMPORTED_MODULE_4__app_modules_server_middlewares___["a" /* default */], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__middlewares_staticAssetsServer__["a" /* default */])(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__middlewares_store__["a" /* default */])(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__middlewares_initActionDispatcher__["a" /* default */])(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__middlewares_router__["a" /* default */])(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__middlewares_renderer__["a" /* default */])()].filter(Boolean)));

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_js_string_escape__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_js_string_escape___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_js_string_escape__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_helmet__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_modules_redux_stateSerializer___ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_components_App__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__config__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__config__);





// eslint-disable-next-line import/no-extraneous-dependencies





const propTypes = {
    store: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.shape({
        getState: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func.isRequired,
        dispatch: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func.isRequired
    }).isRequired,
    insertCss: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func.isRequired,
    renderProps: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.any).isRequired,
    mainEntry: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.string.isRequired
};

const App = ({ store, insertCss, renderProps, mainEntry }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_6__shared_components_App__["a" /* default */],
    { store: store, insertCss: insertCss },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_helmet___default.a, {
        script: [{ innerHTML: `window.__INITIAL_STATE__ = "${__WEBPACK_IMPORTED_MODULE_1_js_string_escape___default()(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__app_modules_redux_stateSerializer___["a" /* stringify */])(store.getState()))}"` }, { src: `${__WEBPACK_IMPORTED_MODULE_7__config___default.a.publicPath}/${mainEntry}`, async: true }]
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router__["RouterContext"], renderProps)
);
App.propTypes = propTypes;

/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Pineapple__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style_css__);

/* eslint no-script-url: "off" */




const Error404 = () => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a.pineapple },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            '4'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Pineapple__["a" /* default */], null),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            '4'
        )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h1',
        null,
        'Not Found'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h2',
        null,
        'We can\'t seem to find the page you asked'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'p',
        null,
        'Maybe the resource you were looking for have been moved, or deleted. Maybe it has never existed. Anyway, you can always ',
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: 'javascript:history.back()' },
            'go back'
        ),
        ' where you came from.'
    )
);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__style_css___default.a)(Error404));

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Pineapple__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style_css__);





const Error500 = () => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a.pineapple },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            null,
            '5'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Pineapple__["a" /* default */], null),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Pineapple__["a" /* default */], null)
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h1',
        null,
        ' Woops... '
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h2',
        null,
        ' Looks like something went wrong! '
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'p',
        null,
        'Those error are usually tracked, but if the problem persists feel free to contact us. In the meantime, try refreshing.'
    )
);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_3__style_css___default.a)(Error500));

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_css__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Error404__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Error500__ = __webpack_require__(45);








const propTypes = {
    HTTPStatus: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
    // eslint-disable-next-line react/require-default-props
    error: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
        name: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
        message: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
        stack: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
    })
};

const ErrorPage = ({ HTTPStatus, error }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a.page },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_helmet___default.a, {
        link: [{
            href: 'https://fonts.googleapis.com/css?family=Roboto:400,700',
            rel: 'stylesheet',
            type: 'text/css'
        }, {
            href: 'https://fonts.googleapis.com/css?family=Roboto+Mono',
            rel: 'stylesheet',
            type: 'text/css'
        }],
        meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
        title: `${HTTPStatus} - VitaminJS`
    }),
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a.container },
        HTTPStatus === 404 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__Error404__["a" /* default */], null) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__Error500__["a" /* default */], { HTTPStatus: HTTPStatus, error: error })
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'footer',
        null,
        ' Powered by ',
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: 'https://github.com/Evaneos/vitaminjs' },
            ' VitaminJS'
        ),
        ' '
    )
);

ErrorPage.propTypes = propTypes;

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_3_isomorphic_style_loader_lib_withStyles___default()(__WEBPACK_IMPORTED_MODULE_4__style_css___default.a)(ErrorPage));

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);

/* eslint react/no-danger: 0 */



const HelmetHeadPropTypes = __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    toComponent: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
}).isRequired;

const propTypes = {
    head: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
        title: HelmetHeadPropTypes,
        meta: HelmetHeadPropTypes,
        link: HelmetHeadPropTypes,
        base: HelmetHeadPropTypes,
        script: HelmetHeadPropTypes,
        htmlAttributes: HelmetHeadPropTypes
    }).isRequired,
    style: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
    children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node.isRequired
};

const HTMLLayout = ({ head, style, children }) =>
// eslint-disable-next-line jsx-a11y/html-has-lang
__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'html',
    head.htmlAttributes.toComponent(),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'head',
        null,
        head.title.toComponent(),
        head.meta.toComponent(),
        head.link.toComponent(),
        head.base.toComponent(),
        head.script.toComponent(),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('style', { dangerouslySetInnerHTML: { __html: style } })
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'body',
        null,
        children
    )
);

HTMLLayout.doctype = '<!doctype html>';
HTMLLayout.propTypes = propTypes;
/* harmony default export */ __webpack_exports__["a"] = (HTMLLayout);

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom_server__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chalk__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_modules_server_onError___ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_modules_server_ErrorPage___ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_components_CSSProvider__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__render__ = __webpack_require__(22);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }





/* eslint-disable import/no-extraneous-dependencies */


/* eslint-enable import/no-extraneous-dependencies */




const renderRawError = (status, renderingError) => status;

const renderErrorPage = props => {
    const css = [];


    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__render__["b" /* renderLayout */])({
        appHTMLString: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_dom_server__["renderToString"])(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_6__shared_components_CSSProvider__["a" /* default */],
            { insertCss: styles => css.push(styles._getCss()) },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__app_modules_server_ErrorPage___["a" /* default */], props)
        )),
        style: css.join(''),
        head: __WEBPACK_IMPORTED_MODULE_2_react_helmet___default.a.rewind()
    });
};

const onError = errorContext => {
    /* eslint-disable no-console */
    console.error(__WEBPACK_IMPORTED_MODULE_3_chalk___default.a.red(`Error ${errorContext.HTTPStatus}:`), `${errorContext.request.method} ${errorContext.request.url}`);
    if (errorContext.HTTPStatus === 500) {
        console.error(__WEBPACK_IMPORTED_MODULE_3_chalk___default.a.red.bold(errorContext.error.message));
        console.error(__WEBPACK_IMPORTED_MODULE_3_chalk___default.a.grey(errorContext.error.stack));
    }
    try {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__app_modules_server_onError___["a" /* default */])(errorContext);
    } catch (err) {
        console.error(__WEBPACK_IMPORTED_MODULE_3_chalk___default.a.red('An error occured while calling the onError function'));
        console.error(err);
    }
    /* eslint-enable no-console */
};

const errorToErrorContext = (ctx, error) => _extends({}, error ? { error } : {}, ctx.state.store ? { state: ctx.state.store.getState() } : {}, {
    HTTPStatus: ctx.status,
    request: ctx.request
});

const renderError = (ctx, error) => {
    try {
        const errorContext = errorToErrorContext(ctx, error);
        ctx.body = renderErrorPage(errorContext);
        onError(errorContext);
    } catch (renderingError) {
        ctx.body = renderRawError(ctx.status, renderingError);
        onError(errorToErrorContext(ctx, renderingError));
    }
    ctx.type = 'html';
};

/* harmony default export */ __webpack_exports__["a"] = (function errorHandler() {
    return (() => {
        var _ref = _asyncToGenerator(function* (ctx, next) {
            try {
                yield next();
            } catch (error) {
                ctx.status = 500;
                renderError(ctx, error);
            }

            if (ctx.status === 404) {
                if (ctx.state.store) {
                    renderError(ctx);
                } else {
                    // If there is no store, it means that it is a middleware that put a 404, we don't
                    // print a vitaminjs 404
                    onError(errorToErrorContext(ctx));
                }
            }
        });

        return function () {
            return _ref.apply(this, arguments);
        };
    })();
});

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_modules_server_createInitAction___ = __webpack_require__(20);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// eslint-disable-next-line import/no-extraneous-dependencies


/* harmony default export */ __webpack_exports__["a"] = (function initActionDispatcher() {
    return (() => {
        var _ref = _asyncToGenerator(function* (ctx, next) {
            const { dispatch } = ctx.state.store;
            const action = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__app_modules_server_createInitAction___["a" /* default */])(ctx.request);
            if (action) {
                yield dispatch(action);
            }
            yield next();
        });

        return function () {
            return _ref.apply(this, arguments);
        };
    })();
});

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__render__ = __webpack_require__(22);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* global ASSETS_BY_CHUNK_NAME */


/* harmony default export */ __webpack_exports__["a"] = (function renderer() {
    return (() => {
        var _ref = _asyncToGenerator(function* (ctx) {
            const { renderProps, store } = ctx.state;
            let mainEntry = ({"main":"client_bundle.281fb17b174805f6fdfd.js"} || ctx.res.locals.webpackStats.toJson().assetsByChunkName).main;
            mainEntry = Array.isArray(mainEntry) ? mainEntry[0] : mainEntry;
            ctx.body = yield __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__render__["a" /* default */])(renderProps, store, mainEntry);
        });

        return function () {
            return _ref.apply(this, arguments);
        };
    })();
});

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_modules_routes___ = __webpack_require__(79);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }


// eslint-disable-next-line import/no-extraneous-dependencies


const routesWithStore = typeof __WEBPACK_IMPORTED_MODULE_1__app_modules_routes___["a" /* default */] === 'function' ? store => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__app_modules_routes___["a" /* default */])(store) : () => __WEBPACK_IMPORTED_MODULE_1__app_modules_routes___["a" /* default */];

/* harmony default export */ __webpack_exports__["a"] = (function router() {
    return (() => {
        var _ref = _asyncToGenerator(function* (ctx, next) {
            const url = ctx.req.url;
            const history = ctx.state.history;

            const appRoutes = yield routesWithStore(ctx.state.store);

            yield new Promise(function (resolve, reject) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_router__["match"])({ routes: appRoutes, location: url, history }, function (error, redirectLocation, renderProps) {
                    if (error) {
                        reject(error);
                    } else if (redirectLocation) {
                        ctx.redirect((redirectLocation.basename || '') + redirectLocation.pathname + redirectLocation.search);
                    } else if (renderProps) {
                        ctx.status = 200;
                        ctx.state.renderProps = renderProps;
                    } else {
                        ctx.status = 404;
                        ctx.body = 'Not found';
                    }
                    resolve();
                });
            });

            if (ctx.status === 200) {
                yield next();
            }
        });

        return function () {
            return _ref.apply(this, arguments);
        };
    })();
});

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_url___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_url__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_static__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_static___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_static__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_mount__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_mount___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_koa_mount__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__config__);





// examples
// basePath: / or /app
// publicPath: / or [/app]/public-path or http://localhost:3000[/app]/public-path
// parsedPath: / or [/app]/public-path or [/app]/public-path
// mountPath : / or /public-path

const parsedPath = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_url__["parse"])(__WEBPACK_IMPORTED_MODULE_3__config___default.a.publicPath).pathname || '';
const mountPath = parsedPath.substr(__WEBPACK_IMPORTED_MODULE_3__config___default.a.basePath.replace(/\/+$/, '').length);

const servePublic = __WEBPACK_IMPORTED_MODULE_1_koa_static___default()(__WEBPACK_IMPORTED_MODULE_3__config___default.a.client.buildPath);

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_3__config___default.a.servePublic ? () => mountPath.length ? __WEBPACK_IMPORTED_MODULE_2_koa_mount___default()(mountPath, servePublic) : servePublic : () => null);

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_modules_redux_middlewares___ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_store__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__config__);


/* eslint-disable import/no-extraneous-dependencies */

// used require instead of import, because optional default with import cause warnings
const reducers = __webpack_require__(78);
/* eslint-enable import/no-extraneous-dependencies */

/* eslint-disable import/first */


/* eslint-enable import/first */

/* harmony default export */ __webpack_exports__["a"] = (function store() {
    return (ctx, next) => {
        const history = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_router__["createMemoryHistory"])({
            basename: __WEBPACK_IMPORTED_MODULE_3__config___default.a.basePath,
            entries: [ctx.req.url]
        });
        ctx.state.history = history;
        ctx.state.store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__shared_store__["a" /* create */])(history, reducers.default || reducers, __WEBPACK_IMPORTED_MODULE_1__app_modules_redux_middlewares___["a" /* default */]);
        return next();
    };
});

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__CSSProvider__ = __webpack_require__(23);






const propTypes = {
    store: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
    insertCss: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
    children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node.isRequired
};

const App = ({ store, insertCss, children }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_3__CSSProvider__["a" /* default */],
    { insertCss: insertCss },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_react_redux__["Provider"],
        { store: store },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            null,
            ' ',
            children,
            ' '
        )
    )
);
App.propTypes = propTypes;

/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const stringify = JSON.stringify;
/* harmony export (immutable) */ __webpack_exports__["a"] = stringify;

const parse = JSON.parse;
/* unused harmony export parse */


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const storeEnhancers = [];


/* harmony default export */ __webpack_exports__["a"] = (storeEnhancers);

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createRootReducer */
/* harmony export (immutable) */ __webpack_exports__["a"] = create;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_redux__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_thunk__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_modules_redux_enhancers___ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__devTools__ = __webpack_require__(56);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




/* eslint-disable import/no-extraneous-dependencies */



function createRootReducer(reducers) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])(_extends({}, reducers, { routing: __WEBPACK_IMPORTED_MODULE_1_react_router_redux__["routerReducer"] }));
}

function create(history, reducers, middlewares, initialState) {
    const createStoreWithMiddleware = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"])(...middlewares, __WEBPACK_IMPORTED_MODULE_2_redux_thunk___default.a, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_router_redux__["routerMiddleware"])(history)), ...__WEBPACK_IMPORTED_MODULE_4__devTools__["a" /* default */], ...__WEBPACK_IMPORTED_MODULE_3__app_modules_redux_enhancers___["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"]);

    const rootReducer = createRootReducer(reducers);
    const store = createStoreWithMiddleware(rootReducer, initialState);

    return store;
}

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vitaminjs_react_helmet__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_global_css__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_global_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style_global_css__);






/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_3__style_global_css___default.a)(({ children }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_vitaminjs_react_helmet__["a" /* default */], {
        title: 'Vagalam',
        meta: [{
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        }],
        link: [{
            href: 'https://fonts.googleapis.com/css?family=Crimson+Text|Lato',
            rel: 'stylesheet'
        }],
        script: [{
            innerHTML: `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.0.0";
  analytics.load("MU4inBjkrvhUp3WuzqnO9eeBllyXEliM");
  analytics.page();
  }}();`
        }]
    }),
    children
)));

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_motion__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_motion___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_motion__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_ui_element_Button_Link__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_ui_element_FrameLayout__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__background4_jpg__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__background4_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__background4_jpg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__style_css__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__style_css__);










const SPRING_CONFIG = {
    stiffness: 80,
    damping: 80
};
class Landing extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(props) {
        super(props);

        this.registerCTARef = CTARef => {
            this.CTARef = CTARef;
        };

        this.handleMouseEnter = () => {
            this.setState({ mouseOverCTA: true });
        };

        this.handleMouseOut = () => {
            this.setState({ mouseOverCTA: false });
        };

        this.state = {
            mouseOverCTA: false,
            glowCycle: 0
        };
    }
    componentDidMount() {
        setInterval(() => this.setState({ glowCycle: 1 }), 1000);
        setInterval(() => this.setState({ glowCycle: 0 }), 600);
    }

    render() {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_4__shared_ui_element_FrameLayout__["a" /* default */],
            { freeRatio: true },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'section',
                { className: __WEBPACK_IMPORTED_MODULE_6__style_css___default.a.header, onMouseOut: this.handleMouseOut },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_2_react_motion__["Motion"],
                    {
                        style: {
                            saturate: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_motion__["spring"])(this.state.mouseOverCTA ? 100 : 0, SPRING_CONFIG),
                            glowOffset: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_motion__["spring"])(this.state.mouseOverCTA ? this.state.glowCycle * 50 : 0, SPRING_CONFIG)
                        }
                    },
                    ({ saturate, glowOffset }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', {
                        className: __WEBPACK_IMPORTED_MODULE_6__style_css___default.a.background,
                        style: {
                            backgroundImage: `url(${__WEBPACK_IMPORTED_MODULE_5__background4_jpg___default.a})`,
                            filter: `saturate(${saturate + glowOffset}%)`
                        }
                    })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'header',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'h1',
                        null,
                        ' \\Vagalam\\ '
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'h2',
                        null,
                        ' Le blog int\xE9ractif de mon tour du monde \xE0 v\xE9lo '
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    {
                        className: __WEBPACK_IMPORTED_MODULE_6__style_css___default.a.cta,
                        onMouseEnter: this.handleMouseEnter,
                        onMouseOut: this.handleMouseOut
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        __WEBPACK_IMPORTED_MODULE_3__shared_ui_element_Button_Link__["a" /* default */],
                        { registerRef: this.registerCTARef, href: '/voyage' },
                        'Parcourir le voyage'
                    )
                )
            )
        );
    }
}
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_6__style_css___default.a)(Landing));

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vitaminjs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__selectors__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__selectors__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__style_css__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__style_css__);









const Details = ({
    currentDayNumber,
    // eslint-disable-next-line no-shadow
    goToPreviousStep,
    // eslint-disable-next-line no-shadow
    goToNextStep,
    userArrivedToLastPoint
}) => currentDayNumber ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'span',
    { className: __WEBPACK_IMPORTED_MODULE_7__style_css___default.a.details },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        {
            className: __WEBPACK_IMPORTED_MODULE_7__style_css___default.a.previous,
            onClick: goToPreviousStep,
            disabled: currentDayNumber === 1
        },
        '<'
    ),
    ' ',
    'Jour ',
    currentDayNumber,
    ' ',
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        { className: __WEBPACK_IMPORTED_MODULE_7__style_css___default.a.next, onClick: goToNextStep, disabled: userArrivedToLastPoint },
        '>'
    )
) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'em',
    { className: __WEBPACK_IMPORTED_MODULE_7__style_css___default.a['press-space'] },
    ' Appuyez sur Espace pour commencer '
);

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_ramda__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(state => ({
    currentDayNumber: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__selectors__["a" /* currentDayNumberSelector */])(state),
    userArrivedToLastPoint: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__selectors__["d" /* userArrivedToLastPointSelector */])(state)
}), {
    goToNextStep: __WEBPACK_IMPORTED_MODULE_6__actions__["a" /* goToNextStep */],
    goToPreviousStep: __WEBPACK_IMPORTED_MODULE_6__actions__["b" /* goToPreviousStep */]
}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_7__style_css___default.a))(Details));

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__selectors__ = __webpack_require__(7);





const currentDayNumberSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(__WEBPACK_IMPORTED_MODULE_2__selectors__["b" /* currentPathSelector */], currentPath => {
    const lastSleepLocation = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ramda__["last"])(currentPath.filter(({ type }) => type === 'sleep_location'));
    return lastSleepLocation ? lastSleepLocation.dayNumber : null;
});
/* harmony export (immutable) */ __webpack_exports__["a"] = currentDayNumberSelector;


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__selectors__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_ui_element_Modale__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_Visitor_EmailForm__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_Visitor_selectors__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__style_css__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__style_css__);










const LastPointModale = ({ isOpened, visitorEmail }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_5__shared_ui_element_Modale__["a" /* default */],
    { isOpened: isOpened },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_8__style_css___default.a.modale },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h3',
            null,
            'Le blog s\'arr\xEAte ici...'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            null,
            'Mais pas le voyage ! Ce blog est mis \xE0 jour en continu, n\'h\xE9sites pas \xE0 revenir d\'ici quelques jours pour suivre les nouvelles aventures.'
        ),
        !visitorEmail ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'p',
            null,
            'Tu peux aussi laisser ton email pour \xEAtre pr\xE9venu quand il y a du nouveau.'
        ) : null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__shared_Visitor_EmailForm__["a" /* default */], null)
    )
);

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_ramda__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(state => ({
    isOpened: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__selectors__["d" /* userArrivedToLastPointSelector */])(state),
    visitorEmail: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__shared_Visitor_selectors__["a" /* emailSelector */])(state)
})), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_8__style_css___default.a))(LastPointModale));

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);

/* harmony default export */ __webpack_exports__["a"] = (function tentIcon() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "svg",
        {
            x: "0px",
            y: "0px",
            viewBox: "0 0 100 125",
            enableBackground: "new 0 0 100 100",
            width: "100%",
            xmlSpace: "preserve"
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "g",
            { display: "none" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("rect", {
                x: "-414",
                y: "-8.38",
                display: "inline",
                fill: "#000000",
                stroke: "#000000",
                strokeWidth: "1.0255",
                strokeMiterlimit: "10",
                width: "1370",
                height: "1329.38"
            })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "g",
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "g",
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
                    fill: "none",
                    d: "M24.002,68.321l-9.069,20.691l8.432-0.024l5.79-15.218c0.275-0.723,0.962-1.215,1.746-1.182    c0.773,0.013,1.455,0.51,1.705,1.241l5.169,15.117l7.884-0.023L30.226,54.436L24.002,68.321z"
                }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("polygon", { fill: "none", points: "27.296,88.977 33.901,88.958 30.778,79.826   " }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
                    fill: "none",
                    d: "M50.198,88.814c0.014,0.032,0.02,0.064,0.032,0.096l2.059-0.006l2.261-5.046    c0.426-0.949,1.542-1.374,2.49-0.949c0.95,0.426,1.375,1.541,0.949,2.49l-1.565,3.493l29.265-0.085L71.587,49.559H32.631    L50.198,88.814z M51.279,61.359h15.213c0.677,0,1.279,0.433,1.493,1.076l3.204,9.611c0.16,0.48,0.08,1.008-0.216,1.418    c-0.296,0.411-0.771,0.653-1.277,0.653H54.483c-0.677,0-1.279-0.433-1.493-1.076l-3.204-9.611c-0.16-0.48-0.08-1.008,0.216-1.418    C50.298,61.602,50.773,61.359,51.279,61.359z"
                }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("polygon", {
                    fill: "none",
                    points: "67.513,70.97 65.358,64.506 53.462,64.506 55.617,70.97   "
                }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
                    fill: "none",
                    d: "M33.497,31.091c0.532,0,1.018,0.3,1.257,0.774c0.385,0.765,1.153,1.24,2.005,1.24    c1.239,0,2.247-1.008,2.247-2.247c0-0.845-0.474-1.574-1.166-1.957c-0.391,0.049-0.782,0.082-1.171,0.082    c-0.345,0-0.688-0.026-1.03-0.063c-0.083,0.048-0.165,0.098-0.243,0.157c-0.331,0.254-0.755,0.347-1.162,0.258    c-0.406-0.09-0.751-0.355-0.943-0.724c-0.058-0.112-0.132-0.21-0.195-0.318c-1.859-0.727-3.534-2.004-4.781-3.712    c-0.686-0.189-1.403-0.291-2.138-0.291c-2.722,0-5.235,1.366-6.724,3.653c-0.232,0.357-0.614,0.59-1.037,0.633    c-0.423,0.044-0.845-0.108-1.144-0.411c-0.753-0.762-1.758-1.182-2.828-1.182c-2.194,0-3.978,1.784-3.978,3.978    c0,0.044,0.001,0.087,0.002,0.131H33.497z"
                }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
                    fill: "none",
                    d: "M34.922,25.932c0.125,0.033,0.248,0.069,0.374,0.095c0.471-0.143,0.959-0.231,1.462-0.231    c0.472,0,0.921,0.086,1.355,0.207c0.253-0.057,0.506-0.128,0.756-0.217c1.041-0.371,1.961-0.994,2.702-1.817    c-2.623-0.658-4.864-2.679-5.863-5.484c-0.999-2.804-0.54-5.788,1.076-7.956c-0.344-0.053-0.689-0.079-1.033-0.079    c-0.751,0-1.495,0.126-2.209,0.381c-1.79,0.637-3.207,2.003-3.99,3.845c-0.8,1.882-0.845,4.03-0.126,6.048    c0.189,0.532,0.426,1.031,0.701,1.498C32.032,22.967,33.696,24.247,34.922,25.932z"
                }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M24.024,92.335h1.35h10.305h1.529h13.544h4.13h32.766h4.126l3.061-6.83c0.426-0.95,0-2.064-0.95-2.49    c-0.947-0.424-2.064,0-2.49,0.95l-1.663,3.713L75.149,47.088l3.11-6.944c0.426-0.95,0-2.065-0.949-2.49    c-0.949-0.425-2.064,0-2.49,0.949l-1.802,4.024l-1.849-4.128c-0.425-0.949-1.541-1.374-2.49-0.949    c-0.949,0.426-1.375,1.541-0.949,2.49l2.388,5.329H34.289l1.537-3.429c0.473-1.055,0.002-2.294-1.053-2.767    c-1.055-0.475-2.294-0.002-2.767,1.053l-1.776,3.963l-1.772-3.96c-0.472-1.056-1.71-1.53-2.765-1.058    c-1.056,0.472-1.53,1.71-1.058,2.765l3.213,7.181l-7.663,17.483l-9.657,21.546l-1.922-4.289c-0.425-0.949-1.54-1.374-2.49-0.949    c-0.95,0.426-1.375,1.541-0.949,2.49l3.107,6.936h4.13H24.024z M27.296,88.977l3.482-9.151l3.123,9.132L27.296,88.977z     M37.776,88.947l-5.169-15.117c-0.25-0.731-0.932-1.228-1.705-1.241c-0.784-0.033-1.471,0.46-1.746,1.182l-5.79,15.218    l-8.432,0.024l9.069-20.691l6.224-13.885L45.66,88.924L37.776,88.947z M71.587,49.559l14.102,39.249l-29.265,0.085l1.565-3.493    c0.426-0.949,0-2.064-0.949-2.49c-0.948-0.425-2.064,0-2.49,0.949l-2.261,5.046l-2.059,0.006    c-0.012-0.032-0.018-0.065-0.032-0.096L32.631,49.559H71.587z" }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M49.786,63.43l3.204,9.611c0.214,0.643,0.816,1.076,1.493,1.076h15.213c0.506,0,0.981-0.243,1.277-0.653    c0.296-0.41,0.376-0.938,0.216-1.418l-3.204-9.611c-0.214-0.643-0.816-1.076-1.493-1.076H51.279c-0.506,0-0.981,0.243-1.277,0.653    C49.706,62.422,49.626,62.95,49.786,63.43z M65.358,64.506l2.155,6.464H55.617l-2.155-6.464H65.358z" }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M47.544,21.982c-0.292-0.412-0.785-0.637-1.284-0.588c-2.335,0.231-4.666-1.382-5.535-3.822    c-0.87-2.441-0.082-5.157,1.872-6.461c0.42-0.28,0.658-0.764,0.624-1.267c-0.034-0.504-0.336-0.95-0.79-1.17    c-2.395-1.162-5.048-1.327-7.469-0.464c-2.54,0.905-4.541,2.821-5.636,5.396c-1.056,2.484-1.134,5.293-0.237,7.932    c-0.183-0.009-0.363-0.033-0.547-0.033c-3.162,0-6.115,1.362-8.158,3.707c-1.064-0.661-2.292-1.015-3.575-1.015    c-3.746,0-6.793,3.047-6.793,6.793c0,0.653,0.096,1.305,0.285,1.94c0.177,0.597,0.726,1.006,1.349,1.006h23.435    c0.946,1.26,2.426,2.014,4.039,2.014c2.792,0,5.063-2.271,5.063-5.062c0-1.078-0.344-2.073-0.921-2.895    c1.915-0.969,3.459-2.566,4.407-4.606C47.885,22.931,47.836,22.394,47.544,21.982z M39.123,33.136    c-0.851,0-1.619-0.475-2.005-1.24c-0.239-0.475-0.725-0.774-1.257-0.774H12.833c-0.001-0.044-0.002-0.088-0.002-0.131    c0-2.194,1.784-3.978,3.978-3.978c1.07,0,2.074,0.42,2.829,1.183c0.299,0.303,0.72,0.456,1.143,0.411    c0.424-0.043,0.805-0.276,1.037-0.633c1.488-2.287,4.002-3.653,6.724-3.653c3,0,5.725,1.656,7.113,4.321    c0.192,0.369,0.538,0.634,0.944,0.724c0.406,0.089,0.832-0.004,1.162-0.258c0.397-0.305,0.868-0.466,1.363-0.466    c1.239,0,2.247,1.008,2.247,2.247C41.37,32.128,40.362,33.136,39.123,33.136z M41.233,25.818    c-0.249,0.089-0.501,0.159-0.754,0.217c-0.434-0.122-0.883-0.208-1.356-0.208c-0.505,0-0.993,0.088-1.464,0.232    c-0.125-0.026-0.248-0.062-0.371-0.094c-1.226-1.686-2.891-2.966-4.797-3.711c-0.275-0.466-0.512-0.966-0.701-1.498    c-0.719-2.018-0.675-4.166,0.126-6.048c0.783-1.842,2.2-3.208,3.99-3.845c0.714-0.254,1.459-0.381,2.209-0.381    c0.344,0,0.69,0.027,1.034,0.08c-1.616,2.168-2.075,5.151-1.076,7.956c0.999,2.804,3.241,4.826,5.863,5.484    C43.195,24.823,42.275,25.447,41.233,25.818z" })
            )
        )
    );
});

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_freactal__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_freactal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_freactal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vitaminjs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_css__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__TentIcon__ = __webpack_require__(63);








const Marker = ({
    state: { zoom },
    type
}) => {
    if (zoom < 4 || type === 'point_of_interest') {
        return null;
    }
    const size = zoom > 7 ? 24 : zoom > 6 ? 12 : /* otherwise */4;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
            style: {
                height: `${size}px`,
                width: `${size}px`,
                padding: `${size / 6}px`,
                borderColor: zoom > 6 ? 'black' : 'transparent',
                backgroundColor: 'white'
            },
            className: __WEBPACK_IMPORTED_MODULE_4__style_css___default.a.icon
        },
        type === 'sleep_location' ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__TentIcon__["a" /* default */], null) : null
    );
};

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_ramda__["compose"])(__WEBPACK_IMPORTED_MODULE_1_freactal__["injectState"], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_4__style_css___default.a))(Marker));

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__turf_line_distance__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__turf_line_distance___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__turf_line_distance__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__turf_line_slice_along__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__turf_line_slice_along___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__turf_line_slice_along__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_motion__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_motion___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_motion__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_redux__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ramda__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_freactal__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_freactal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_freactal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__selectors__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__actions__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__MapPointMarker__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__style_css__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__config__ = __webpack_require__(25);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




















let Mapbox = new Proxy({}, {
    get: (target, name) => target[name] || (() => null)
});

const INITIAL_ZOOM = [8];
const STYLE_URL = 'mapbox://styles/ganceab/cj60tjdxq0asi2rppfum27wau';
const withMapZoomControl = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_freactal__["provideState"])({
    initialState: () => ({
        zoom: INITIAL_ZOOM
    }),
    effects: {
        updateMap: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_freactal__["update"])((_, map) => ({ zoom: map.getZoom() }))
    }
});

class Map extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(props) {
        super(props);

        this.handleAnimationEnd = () => {
            this.setState({ mapAnimation: null });
            // Waiting for marker to appear
            setTimeout(this.props.onAnimationEnd, 300);
        };

        this.state = {
            mapAnimation: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.currentPath || !this.props.currentPath) {
            return;
        }
        if (this.props.currentPath.length < nextProps.currentPath.length) {
            this.setState({ mapAnimation: 'FORWARD' });
        }
        if (this.props.currentPath.length > nextProps.currentPath.length) {
            this.setState({ mapAnimation: 'BACKWARD' });
        }
    }


    render() {
        const { effects: { updateMap }, displayedTripLineString, currentPath, style } = this.props;
        const currentMapPoint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_ramda__["last"])(currentPath);
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            Mapbox.Map,
            {
                center: currentMapPoint ? currentMapPoint.coordinates : [2.3738311, 48.8841141],
                containerStyle: _extends({
                    height: '100%',
                    backgroundColor: 'black'
                }, style),
                zoom: INITIAL_ZOOM,
                mapboxApiAccessToken: __WEBPACK_IMPORTED_MODULE_12__config__["a" /* default */].mapboxAccessToken,
                style: STYLE_URL,
                onMove: updateMap,
                onStyleLoad: updateMap,
                movingMethod: 'easeTo'
            },
            displayedTripLineString ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_4_react_motion__["Motion"],
                {
                    defaultStyle: { distance: 0 },
                    style: {
                        distance: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_react_motion__["spring"])(__WEBPACK_IMPORTED_MODULE_2__turf_line_distance___default()(displayedTripLineString), {
                            stiffness: 170,
                            damping: 55,
                            precision: 1
                        })
                    },
                    onRest: this.handleAnimationEnd
                },
                ({ distance }) => distance > 0 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Mapbox.GeoJSONLayer, {
                    data: __WEBPACK_IMPORTED_MODULE_3__turf_line_slice_along___default()(displayedTripLineString, 0, distance),
                    lineLayout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    linePaint: {
                        'line-color': 'white',
                        'line-opacity': 0.8,
                        'line-width': 2
                    }
                }) : null
            ) : null,
            currentPath.slice(0, this.state.mapAnimation === 'FORWARD' ? -1 : currentPath.length).map(mapPoint => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                Mapbox.Marker,
                {
                    key: mapPoint.coordinates.join(),
                    coordinates: mapPoint.coordinates,
                    anchor: 'center'
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__MapPointMarker__["a" /* default */], { type: mapPoint.type })
            ))
        );
    }
}

Map.defaultProps = {
    style: {}
};
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_ramda__["compose"])(withMapZoomControl, __WEBPACK_IMPORTED_MODULE_7_freactal__["injectState"], __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_react_redux__["connect"])(__WEBPACK_IMPORTED_MODULE_8__selectors__["a" /* default */], {
    onAnimationEnd: __WEBPACK_IMPORTED_MODULE_9__actions__["c" /* notifyAnimationEnd */]
}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_11__style_css___default.a))(Map));

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__turf_helpers__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__turf_helpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__turf_helpers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__turf_meta__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__turf_meta___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__turf_meta__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__turf_line_slice__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__turf_line_slice___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__turf_line_slice__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__turf_bezier__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__turf_bezier___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__turf_bezier__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__selectors__ = __webpack_require__(7);












const TRIP_STARTING_POINT = [2.3738311, 48.8841141];

function bezierCoord(resolution, coordinates) {
    return coordinates.length >= 2 ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__turf_meta__["coordAll"])(__WEBPACK_IMPORTED_MODULE_5__turf_bezier___default()(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__turf_helpers__["lineString"])(coordinates), resolution, 0.6)) : coordinates;
}

const SMOOTH_LINE_NUMBER = 25;
const wholeTripLineStringSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(__WEBPACK_IMPORTED_MODULE_6__selectors__["e" /* pathSelector */], path => {
    const coordinates = [TRIP_STARTING_POINT, ...path.map(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ramda__["prop"])('coordinates'))];
    if (coordinates.length < 2) {
        return null;
    }
    const [roughLine, smoothLine] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ramda__["splitAt"])(-SMOOTH_LINE_NUMBER, coordinates);
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__turf_helpers__["lineString"])([...roughLine, ...bezierCoord(20000, smoothLine)]);
});

const displayedTripLineStringSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])(wholeTripLineStringSelector, __WEBPACK_IMPORTED_MODULE_6__selectors__["b" /* currentPathSelector */], (tripLineString, currentPath) => {
    const currentMapPoint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ramda__["last"])(currentPath);
    if (!tripLineString || !currentMapPoint) {
        return null;
    }
    return __WEBPACK_IMPORTED_MODULE_4__turf_line_slice___default()(TRIP_STARTING_POINT, currentMapPoint.coordinates, tripLineString);
});

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createStructuredSelector"])({
    displayedTripLineString: displayedTripLineStringSelector,
    currentPath: __WEBPACK_IMPORTED_MODULE_6__selectors__["b" /* currentPathSelector */]
}));

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style_css__);






class Pictures extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(props) {
        super(props);

        this.resetInterval = () => {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
            this.intervalId = setInterval(this.goToNextPicture, 10000);
        };

        this.goToNextPicture = () => {
            this.setState(({ currentPicture }) => ({
                currentPicture: (currentPicture + 1) % this.props.pictures.length
            }));
        };

        this.handleClickOnPicture = () => {
            this.goToNextPicture();
            this.resetInterval();
        };

        this.state = {
            currentPicture: 0
        };
    }
    componentDidMount() {
        this.resetInterval();
    }

    render() {
        const { pictures } = this.props;
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a.pictures, onClick: this.handleClickOnPicture },
            pictures.map((picture, i) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', {
                className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()(__WEBPACK_IMPORTED_MODULE_3__style_css___default.a.picture, {
                    [__WEBPACK_IMPORTED_MODULE_3__style_css___default.a.show]: this.state.currentPicture === i
                }),
                key: picture,
                style: { backgroundImage: `url(${picture})` }
            }))
        );
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_3__style_css___default.a)(Pictures));

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Pictures__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style_css__);






const Post = ({ title, content, pictures }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'article',
    null,
    pictures.length ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a.pictures },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Pictures__["a" /* default */], { pictures: pictures })
    ) : null,
    content ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
            className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a.content,
            style: { alignSelf: pictures.length ? 'stretch' : 'center' }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h1',
            null,
            title
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', {
            className: __WEBPACK_IMPORTED_MODULE_3__style_css___default.a.body,
            dangerouslySetInnerHTML: {
                __html: content
            }
        })
    ) : null
);

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_3__style_css___default.a)(Post));

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addFetchedPosts;


function addFetchedPosts(posts) {
    return {
        type: 'app/trip/posts/ADD_FETCHED_POSTS',
        posts
    };
}

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_fromPromise__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_mergeMap__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_bufferTime__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_bufferTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_bufferTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_do__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prismic_io__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_prismic_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_prismic_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_prismic_dom__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_prismic_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_prismic_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__actions__ = __webpack_require__(69);













const proxyWithGoogleImageResizer = pictureUrl => `https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?url=${pictureUrl}&container=focus&resize_h=1080&refresh=31536000`;

function fetchPosts(postIds) {
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].fromPromise(__WEBPACK_IMPORTED_MODULE_8_prismic_io___default.a.api('https://vagalam.prismic.io/api').then(api => api.query(__WEBPACK_IMPORTED_MODULE_8_prismic_io___default.a.Predicates.in('document.id', postIds), {}))).map(response => response.results).map(postsApi => postsApi.map(postApi => ({
        id: postApi.id,
        type: postApi.data['post.content'] ? 'Article' : 'Gallery',
        title: postApi.data['post.title'] && __WEBPACK_IMPORTED_MODULE_9_prismic_dom___default.a.RichText.asText(postApi.data['post.title'].value),
        content: postApi.data['post.content'] && __WEBPACK_IMPORTED_MODULE_9_prismic_dom___default.a.RichText.asHtml(postApi.data['post.content'].value),
        pictures: postApi.data['post.pictures'] ? postApi.data['post.pictures'].value.map(value => proxyWithGoogleImageResizer(value.picture.value.main.url)) : []
    })));
}

const fetchPostsEpic = $action => __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].merge($action.ofType('app/trip/ADD_FETCHED_SLEEP_LOCATIONS').map(({ sleepLocations }) => sleepLocations), $action.ofType('app/trip/ADD_FETCHED_POINTS_OF_INTEREST').map(({ pointsOfInterest }) => pointsOfInterest)).mergeMap(resources => __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of(...resources.map(({ postId }) => postId))).filter(Boolean)
// $FlowFixMe: rxJS flow typed API not up to date
.bufferTime(2000, 2000, 10).filter(postIds => postIds.length).mergeMap(fetchPosts).map(__WEBPACK_IMPORTED_MODULE_10__actions__["a" /* addFetchedPosts */]);

/* harmony default export */ __webpack_exports__["a"] = (fetchPostsEpic);

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ramda__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__selectors__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Post__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_ui_element_Modale__ = __webpack_require__(28);







const defaultProps = {
    onClose: () => {}
};

const PostOverlay = ({ currentPost, onClose }) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_5__shared_ui_element_Modale__["a" /* default */],
    {
        isOpened: !!currentPost,
        fullScreen: currentPost && !!currentPost.pictures.length,
        onClose: onClose
    },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__Post__["a" /* default */], currentPost)
);

PostOverlay.defaultProps = defaultProps;

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ramda__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(state => ({
    currentPost: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__selectors__["b" /* currentPostSelector */])(state)
})))(PostOverlay));

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = postsReducer;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function postsReducer(state = {}, action) {
    switch (action.type) {
        case 'app/trip/posts/ADD_FETCHED_POSTS':
            return action.posts.reduce((postsMap, post) => _extends({}, postsMap, {
                [post.id]: post
            }), state);
        default:
            return state;
    }
}

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_merge__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_mergeMap__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_startWith__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_startWith___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_startWith__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_fromPromise__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_empty__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_empty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_empty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_merge__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_redux_observable__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_redux_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_redux_observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_prismic_io__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_prismic_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_prismic_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Posts_epic__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__actions__ = __webpack_require__(10);
















const getPostId = (type, apiResponse) => {
    const post = apiResponse.data[`${type}.post`];
    return post ? post.value.document.id : null;
};
const fetchSleepLocationsAfter = id => __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].fromPromise(__WEBPACK_IMPORTED_MODULE_9_prismic_io___default.a.api('https://vagalam.prismic.io/api').then(api => api.query(__WEBPACK_IMPORTED_MODULE_9_prismic_io___default.a.Predicates.at('document.type', 'sleep_location'), {
    orderings: '[my.sleep_location.date]',
    pageSize: 10,
    after: id
})).then(response => response.results.map(apiSleepLocation => {
    const { longitude, latitude } = apiSleepLocation.data['sleep_location.location'].value;
    const endOfDay = new Date(apiSleepLocation.data['sleep_location.date'].value);
    endOfDay.setHours(23, 59, 59, 999);
    return {
        date: endOfDay.toISOString(),
        dayNumber: apiSleepLocation.data['sleep_location.day_number'].value,
        coordinates: [longitude, latitude],
        id: apiSleepLocation.id,
        postId: getPostId('sleep_location', apiSleepLocation),
        type: 'sleep_location'
    };
})).then(__WEBPACK_IMPORTED_MODULE_11__actions__["d" /* addFetchedSleepLocations */]));

const fetchPointOfInterestsAfter = id => __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].fromPromise(__WEBPACK_IMPORTED_MODULE_9_prismic_io___default.a.api('https://vagalam.prismic.io/api').then(api => api.query(__WEBPACK_IMPORTED_MODULE_9_prismic_io___default.a.Predicates.at('document.type', 'point_of_interest'), {
    orderings: '[my.point_of_interest.datetime]',
    pageSize: 10,
    after: id
})).then(response => response.results.map(apiPointOfInterest => {
    const { longitude, latitude } = apiPointOfInterest.data['point_of_interest.location'].value;
    return {
        date: apiPointOfInterest.data['point_of_interest.datetime'].value,
        coordinates: [longitude, latitude],
        id: apiPointOfInterest.id,
        postId: getPostId('point_of_interest', apiPointOfInterest),
        type: 'point_of_interest'
    };
})).then(__WEBPACK_IMPORTED_MODULE_11__actions__["e" /* addFetchedPointsOfInterest */]));

const goToNextStepEpic = (action$, store) => __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].merge(action$.ofType('app/trip/GO_TO_NEXT_STEP'), action$.ofType('persist/REHYDRATE').filter(action => action.key === 'app::trip')).mergeMap(() => {
    const {
        currentMapPointId,
        fetchingStatus: { sleepLocations, pointsOfInterest }
    } = store.getState().app.trip;
    const request$Array = [];
    if (sleepLocations.nextFetchTrigger === currentMapPointId) {
        request$Array.push(fetchSleepLocationsAfter(sleepLocations.lastFetchedId));
    }
    if (pointsOfInterest.nextFetchTrigger === currentMapPointId) {
        request$Array.push(fetchPointOfInterestsAfter(pointsOfInterest.lastFetchedId));
    }
    return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].merge(...request$Array);
});

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_redux_observable__["combineEpics"])(goToNextStepEpic, __WEBPACK_IMPORTED_MODULE_10__Posts_epic__["a" /* default */]));

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ramda__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Posts_selectors__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__style_css__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Map__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Posts__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_ui_element_FrameLayout__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_FullScreenModale_index__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__LastPointModale_index__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Details__ = __webpack_require__(60);
















// eslint-disable-next-line no-shadow
class Trip extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(props) {
        super(props);

        this.handlePostModaleClose = () => {
            this.setState({ isFullscreenPostDisplayed: false });
        };

        this.handleKeyDown = e => {
            if (e.key === ' ' || e.key === 'ArrowRight') {
                this.props.goToNextStep();
            }
            if (e.key === 'ArrowLeft') {
                this.props.goToPreviousStep();
            }
        };

        this.state = {
            isFullscreenPostDisplayed: props.isFullscreenPostDisplayed
        };
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }
    componentWillReceiveProps({ isFullscreenPostDisplayed }) {
        this.setState({ isFullscreenPostDisplayed });
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_9__shared_ui_element_FrameLayout__["a" /* default */],
            {
                top: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'a',
                    { href: '/', className: __WEBPACK_IMPORTED_MODULE_6__style_css___default.a.brand },
                    'Vagalam'
                ),
                bottom: !this.state.isFullscreenPostDisplayed ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_12__Details__["a" /* default */], null) : null,
                frameBackgroundColor: this.state.isFullscreenPostDisplayed ? 'black' : 'white',
                role: 'presentation'
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__Map__["a" /* default */], null),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__Posts__["a" /* default */], { onClose: this.handlePostModaleClose }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__LastPointModale_index__["a" /* default */], null),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__shared_FullScreenModale_index__["a" /* default */], null)
        );
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ramda__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_react_redux__["connect"])(state => ({
    isFullscreenPostDisplayed: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Posts_selectors__["a" /* isFullscreenPostDisplayedSelector */])(state)
}), { goToNextStep: __WEBPACK_IMPORTED_MODULE_4__actions__["a" /* goToNextStep */], goToPreviousStep: __WEBPACK_IMPORTED_MODULE_4__actions__["b" /* goToPreviousStep */] }), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_6__style_css___default.a))(Trip));

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_pipeReducers__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Posts_reducer__ = __webpack_require__(72);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// $FlowFixMe: ramda flow typed API not up to date (ascend not present)






function pointsOfInterestFetchStatusReducer(state = { nextFetchTrigger: null, lastFetchedId: null }, action) {
    switch (action.type) {
        case 'app/trip/ADD_FETCHED_POINTS_OF_INTEREST':
            const lastPlaceOfInterest = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["last"])(action.pointsOfInterest);
            const penultimatePlaceOfInterest = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["nth"])(-2, action.pointsOfInterest);
            return _extends({}, lastPlaceOfInterest ? { lastFetchedId: lastPlaceOfInterest.id } : {}, {
                nextFetchTrigger: penultimatePlaceOfInterest && penultimatePlaceOfInterest.id
            });
        default:
            return state;
    }
}

function sleepLocationsFetchStatusReducer(state = { nextFetchTrigger: null, lastFetchedId: null }, action) {
    switch (action.type) {
        case 'app/trip/ADD_FETCHED_SLEEP_LOCATIONS':
            const lastSleepLocation = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["last"])(action.sleepLocations);
            const penultimateSleepLocation = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["nth"])(-2, action.sleepLocations);
            return _extends({}, lastSleepLocation ? { lastFetchedId: lastSleepLocation.id } : {}, {
                nextFetchTrigger: penultimateSleepLocation && penultimateSleepLocation.id
            });
        default:
            return state;
    }
}

function pathReducer(state = [], action) {
    let newMapPoints;
    switch (action.type) {
        case 'app/trip/ADD_FETCHED_POINTS_OF_INTEREST':
            newMapPoints = action.pointsOfInterest;
            break;
        case 'app/trip/ADD_FETCHED_SLEEP_LOCATIONS':
            newMapPoints = action.sleepLocations;
            break;
        default:
            return state;
    }
    return state.concat(newMapPoints).sort(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["ascend"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["prop"])('date')));
}

function currentMapPointIdReducer(state, action) {
    switch (action.type) {
        case 'app/trip/GO_TO_NEXT_STEP':
            const nextMapPoint = state.path[state.path.findIndex(({ id }) => id === state.currentMapPointId) + 1];
            if (!nextMapPoint) {
                return state;
            }
            return _extends({}, state, {
                currentMapPointId: nextMapPoint.id
            });
        case 'app/trip/GO_TO_PREVIOUS_STEP':
            const previousMapPoint = state.path[state.path.findIndex(({ id }) => id === state.currentMapPointId) - 1];
            if (!previousMapPoint) {
                return state;
            }
            return _extends({}, state, {
                currentMapPointId: previousMapPoint.id
            });
        default:
            return state;
    }
}

function userArrivedToLastPointReducer(state, action) {
    switch (action.type) {
        case 'app/trip/GO_TO_NEXT_STEP':
            const lastMapPoint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["last"])(state.path);
            return _extends({}, state, {
                userArrivedToLastPoint: !!lastMapPoint && state.currentMapPointId === lastMapPoint.id && !state.fetchingStatus.sleepLocations.nextFetchTrigger && !state.fetchingStatus.pointsOfInterest.nextFetchTrigger
            });
        case 'app/trip/GO_TO_PREVIOUS_STEP':
            return _extends({}, state, {
                userArrivedToLastPoint: false
            });
        default:
            return state;
    }
}

function currentAnimationReducer(state = null, action) {
    switch (action.type) {
        case 'app/trip/GO_TO_NEXT_STEP':
        case 'app/trip/GO_TO_PREVIOUS_STEP':
            return 'Map';
        case 'app/trip/CURRENT_ANIMATION_ENDED':
            return null;
        default:
            return state;
    }
}

let tripReducer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__shared_pipeReducers__["a" /* default */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_redux__["combineReducers"])({
    path: pathReducer,
    fetchingStatus: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_redux__["combineReducers"])({
        sleepLocations: sleepLocationsFetchStatusReducer,
        pointsOfInterest: pointsOfInterestFetchStatusReducer
    }),
    currentMapPointId: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["defaultTo"])(null),
    posts: __WEBPACK_IMPORTED_MODULE_3__Posts_reducer__["a" /* default */],
    currentAnimation: currentAnimationReducer,
    userArrivedToLastPoint: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ramda__["defaultTo"])(false)
}), userArrivedToLastPointReducer, currentMapPointIdReducer);

const immutableTripReducer = tripReducer;
/* harmony default export */ __webpack_exports__["a"] = (immutableTripReducer);

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_observable__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux_observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rootEpic__ = __webpack_require__(77);



const epicMiddleware = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux_observable__["createEpicMiddleware"])(__WEBPACK_IMPORTED_MODULE_1__rootEpic__["a" /* default */]);
/* harmony default export */ __webpack_exports__["a"] = ([epicMiddleware]);

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_observable__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux_observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Trip_epic__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_Visitor_epic__ = __webpack_require__(85);




/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux_observable__["combineEpics"])(__WEBPACK_IMPORTED_MODULE_1__Trip_epic__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__shared_Visitor_epic__["a" /* default */]));

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Trip_reducer__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_Visitor_reducer__ = __webpack_require__(86);




/* harmony default export */ __webpack_exports__["default"] = ({
    app: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
        trip: __WEBPACK_IMPORTED_MODULE_1__Trip_reducer__["a" /* default */],
        visitor: __WEBPACK_IMPORTED_MODULE_2__shared_Visitor_reducer__["a" /* default */]
    })
});

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs_react_router__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Trip__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Landing__ = __webpack_require__(59);







/* harmony default export */ __webpack_exports__["a"] = (function rootRoutes() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1_vitaminjs_react_router__["a" /* Route */],
        { component: __WEBPACK_IMPORTED_MODULE_2__App__["a" /* default */] },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_vitaminjs_react_router__["a" /* Route */], { path: '/', component: __WEBPACK_IMPORTED_MODULE_4__Landing__["a" /* default */] }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_vitaminjs_react_router__["a" /* Route */], { path: '/voyage', component: __WEBPACK_IMPORTED_MODULE_3__Trip__["a" /* default */] })
    );
});

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = suscribeVisitor;
/* harmony export (immutable) */ __webpack_exports__["b"] = changeEmailPreference;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mailchimp_api_v3__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mailchimp_api_v3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mailchimp_api_v3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_crypto__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_js__ = __webpack_require__(25);





const mailchimp = new __WEBPACK_IMPORTED_MODULE_0_mailchimp_api_v3___default.a(__WEBPACK_IMPORTED_MODULE_2__config_js__["a" /* default */].mailchimp.APIKey);

const MASTER_LIST_ID = __WEBPACK_IMPORTED_MODULE_2__config_js__["a" /* default */].mailchimp.masterListId;
const emailFrequency = __WEBPACK_IMPORTED_MODULE_2__config_js__["a" /* default */].mailchimp.emailFrequencyIds;

const md5 = string => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_crypto__["createHash"])('md5').update(string).digest('hex');

function suscribeVisitor(email) {
    return mailchimp.put(`lists/${MASTER_LIST_ID}/members/${md5(email)}`, {
        email_address: email,
        status_if_new: 'subscribed',
        interests: {
            [emailFrequency.SOMETIMES]: true
        }
    });
}

function changeEmailPreference(email, setting) {
    return mailchimp.patch(`lists/${MASTER_LIST_ID}/members/${md5(email)}`, {
        interests: {
            [emailFrequency.SOMETIMES]: false,
            [emailFrequency.ALWAYS]: false,
            [emailFrequency.NEVER]: false,
            [emailFrequency[setting]]: true
        }
    });
}

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dotenv_config__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dotenv_config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_dotenv_config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_router__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__controller__ = __webpack_require__(80);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }





const router = new __WEBPACK_IMPORTED_MODULE_1_koa_router___default.a();
router.post('/on_visitor_suscribe/:email', (() => {
    var _ref = _asyncToGenerator(function* (ctx) {
        yield __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__controller__["a" /* suscribeVisitor */])(ctx.params.email);
        ctx.status = 200;
    });

    return function () {
        return _ref.apply(this, arguments);
    };
})());
router.post('/on_visitor_preference_update/:email/:preference', (() => {
    var _ref2 = _asyncToGenerator(function* (ctx) {
        yield __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__controller__["b" /* changeEmailPreference */])(ctx.params.email, ctx.params.preference);
        ctx.status = 200;
    });

    return function () {
        return _ref2.apply(this, arguments);
    };
})());
/* harmony default export */ __webpack_exports__["a"] = ([router.routes(), router.allowedMethods()]);

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style_css__);





function isFullScreen() {
    const doc = window.document;
    return doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement;
}
function goFullScreen() {
    const doc = window.document;
    const docEl = doc.documentElement;

    const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;

    if (!isFullScreen()) {
        requestFullScreen.call(docEl);
    }
}

class FullScreenPopup extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(props) {
        super(props);

        this.handleKeyDown = e => {
            if (e.key === ' ') {
                this.handleGoFullScreen();
            }
        };

        this.handleGoFullScreen = () => {
            this.setState({ fullScreen: true, alreadyAsked: true });
            goFullScreen();
        };

        this.handleModaleClose = () => {
            this.setState({ alreadyAsked: true });
        };

        this.state = {
            alreadyAsked: false,
            isFullScreen: false
        };
    }

    render() {
        return null;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_2__style_css___default.a)(FullScreenPopup));

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ramda__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__selectors__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__style_css__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__style_css__);










class EmailForm extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(props) {
        super(props);

        this.handleFormSubmit = e => {
            e.preventDefault();
            this.props.onVisitorSubmitEmail(this.state.email);
            this.setState({ emailSubmitted: true });
        };

        this.handleEmailChange = e => {
            this.setState({ email: e.target.value });
        };

        this.handleEmailPreferenceChange = e => {
            this.setState({ emailPreference: e.target.value });
            this.props.onEmailPreferenceChange(e.target.value);
        };

        this.state = {
            email: null,
            emailSubmitted: false,
            emailPreference: 'SOMETIMES'
        };
    }

    render() {
        if (this.props.email) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'p',
                null,
                this.state.emailSubmitted ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'strong',
                    null,
                    ' C\'est not\xE9 ! '
                ) : null,
                'Tu receveras un mail',
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'select',
                    {
                        className: __WEBPACK_IMPORTED_MODULE_6__style_css___default.a.select,
                        value: this.state.emailPreference,
                        onChange: this.handleEmailPreferenceChange,
                        style: { fontFamily: 'inherit', fontSize: 'inherit' }
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'option',
                        { value: 'ALWAYS' },
                        ' d\xE8s qu\'il y a du nouveau '
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'option',
                        { value: 'SOMETIMES' },
                        ' de temps en temps '
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'option',
                        { value: 'NEVER' },
                        'jamais (ou presque)'
                    )
                )
            );
        }

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'form',
            { className: __WEBPACK_IMPORTED_MODULE_6__style_css___default.a.form, onSubmit: this.handleFormSubmit },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'label',
                { htmlFor: 'email', className: __WEBPACK_IMPORTED_MODULE_6__style_css___default.a.label },
                'Email'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: __WEBPACK_IMPORTED_MODULE_6__style_css___default.a['input-container'] },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
                    className: __WEBPACK_IMPORTED_MODULE_6__style_css___default.a.input,
                    id: 'email',
                    type: 'email',
                    onChange: this.handleEmailChange
                }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'submit', value: 'Suivre', className: __WEBPACK_IMPORTED_MODULE_6__style_css___default.a.submit })
            )
        );
    }
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_ramda__["compose"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(state => ({ email: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__selectors__["a" /* emailSelector */])(state) }), {
    onVisitorSubmitEmail: __WEBPACK_IMPORTED_MODULE_4__actions__["a" /* subscribe */],
    onEmailPreferenceChange: __WEBPACK_IMPORTED_MODULE_4__actions__["b" /* updateEmailPreference */]
}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_6__style_css___default.a))(EmailForm));

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = updateEmailPreference;
/* harmony export (immutable) */ __webpack_exports__["a"] = subscribe;


function updateEmailPreference(emailPreference) {
    return {
        type: 'app/visitor/UPDATE_EMAIL_PREFERENCE',
        emailPreference
    };
}


function subscribe(email) {
    return {
        type: 'app/visitor/SUBSCRIBE',
        email
    };
}

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_observable__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux_observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_dom_AjaxObservable__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_dom_AjaxObservable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_dom_AjaxObservable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_dom_ajax__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_dom_ajax___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_dom_ajax__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_empty__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_empty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_empty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__selectors__ = __webpack_require__(15);









const suscribeEpic = $action => $action.ofType('app/visitor/SUBSCRIBE').mergeMap(({ email }) => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_dom_AjaxObservable__["ajaxPost"])(`/on_visitor_suscribe/${encodeURIComponent(email)}`)).filter(() => false);

const updateEmailPreferenceEpic = ($action, store) => $action.ofType('app/visitor/UPDATE_EMAIL_PREFERENCE').mergeMap(({ emailPreference }) => {
    const email = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__selectors__["a" /* emailSelector */])(store.getState());
    if (!email) {
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].empty();
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_dom_AjaxObservable__["ajaxPost"])(`/on_visitor_preference_update/${encodeURIComponent(email)}/${encodeURIComponent(emailPreference)}`);
}).filter(() => false);
/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux_observable__["combineEpics"])(suscribeEpic, updateEmailPreferenceEpic));

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

let visitorReducer = function visitorReducer(state = null, action) {
    switch (action.type) {
        case 'app/visitor/SUBSCRIBE':
            return {
                email: action.email,
                emailPreference: 'SOMETIMES'
            };
        case 'app/visitor/UPDATE_EMAIL_PREFERENCE':
            if (!state) {
                return state;
            }
            return _extends({}, state, {
                emailPreference: action.emailPreference
            });
        default:
            return state;
    }
};


const immutableVisitorReducer = visitorReducer;
/* harmony default export */ __webpack_exports__["a"] = (immutableVisitorReducer);

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = pipeReducers;

function pipeReducers(...reducers) {
    return (state, action) => reducers.reduce((previous, reducer) => reducer(previous, action), state);
}

/** Compose reducers into one */

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vitaminjs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style_css__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }




const LinkButton = (_ref) => {
    let { children, href, registerRef } = _ref,
        props = _objectWithoutProperties(_ref, ['children', 'href', 'registerRef']);

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'a',
        _extends({ href: href }, props, { className: __WEBPACK_IMPORTED_MODULE_2__style_css___default.a.button, ref: registerRef }),
        children
    );
};

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vitaminjs__["a" /* withStyles */])(__WEBPACK_IMPORTED_MODULE_2__style_css___default.a)(LinkButton));

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "html{height:100%;box-sizing:border-box}*,:after,:before{box-sizing:inherit}body{background-color:#f5f5f5;font-family:Roboto,sans-serif;position:relative;min-height:100%;margin:0;padding-bottom:6rem}.ZsDF8r1kL7I0iFFIoS8yv{padding-top:80px;color:#969696}.YJTTzDS5dyZVYWtw1Hpg_{margin:auto;max-width:500px;text-align:center}._2-PprwjMo6eI3dilUQ-qRA{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-pack:distribute;justify-content:space-around}._2-PprwjMo6eI3dilUQ-qRA>*{-webkit-box-flex:1;-ms-flex:1;flex:1}@media (max-width:400px){._2-PprwjMo6eI3dilUQ-qRA{font-size:150px}._2-PprwjMo6eI3dilUQ-qRA svg{width:100px}}@media (min-width:401px){._2-PprwjMo6eI3dilUQ-qRA{font-size:220px}._2-PprwjMo6eI3dilUQ-qRA svg{width:150px}}._2CbNUC9wUkvOPFtnLQVMgB{background-color:#f9f9f9;padding:10px;border-radius:20px;margin:auto;margin-top:30px;max-width:1100px;width:calc(100% - 40px)}.TXmrak_vGIgMUHy4nvDMe{margin-left:15px;color:sienna}code{font-family:Roboto Mono,monospace;font-size:14px}pre{white-space:pre-wrap}a{color:#6495ed}footer{position:absolute;bottom:0;right:0;left:0;text-align:right;padding:1rem}", ""]);

// exports
exports.locals = {
	"page": "ZsDF8r1kL7I0iFFIoS8yv",
	"container": "YJTTzDS5dyZVYWtw1Hpg_",
	"pineapple": "_2-PprwjMo6eI3dilUQ-qRA",
	"stack-container": "_2CbNUC9wUkvOPFtnLQVMgB",
	"error-details": "TXmrak_vGIgMUHy4nvDMe"
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "section.La0PwYJsPlYSDKQD2E4xQ{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;height:100%;position:relative}._2Myi_kAOUdow3GNvEv1eqL{background-size:cover;background-position:50%;position:absolute;top:0;bottom:0;left:0;right:0}header{color:#fff;font-family:Crimson Text,serif;-webkit-box-flex:1;-ms-flex:1;flex:1;z-index:1;margin:32px}h1{margin:0;margin-bottom:8px;font-size:82px}h2{margin:0;font-size:20px}._2Aax1OejpO4F7fnx7mBb4z{text-align:center;-ms-flex-item-align:flex-center;align-self:flex-center;margin:32px;z-index:1}", ""]);

// exports
exports.locals = {
	"header": "La0PwYJsPlYSDKQD2E4xQ",
	"background": "_2Myi_kAOUdow3GNvEv1eqL",
	"cta": "_2Aax1OejpO4F7fnx7mBb4z"
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "._2zN8Jia3o40DJK2XFO2s6L{font-family:Crimson Text,serif;font-size:20px}._1BylTZkPG8gkwgfvwCvLOa{-webkit-animation:tfnob-VVkcfZa_O70hEZF 2s ease-in-out infinite alternate-reverse;animation:tfnob-VVkcfZa_O70hEZF 2s ease-in-out infinite alternate-reverse}._2uUOLh-GHP3W5k3EJVDdI8,._21VdowGEfog2TOWMX5lgTU{background:none;cursor:pointer;border:none;transition:-webkit-transform .5s;transition:transform .5s;transition:transform .5s,-webkit-transform .5s;padding:12px}._2uUOLh-GHP3W5k3EJVDdI8:disabled,._21VdowGEfog2TOWMX5lgTU:disabled{cursor:no-drop}._2uUOLh-GHP3W5k3EJVDdI8:not(:disabled):hover{-webkit-transform:translateX(-3px);-ms-transform:translateX(-3px);transform:translateX(-3px)}._21VdowGEfog2TOWMX5lgTU:not(:disabled):hover{-webkit-transform:translateX(3px);-ms-transform:translateX(3px);transform:translateX(3px)}@-webkit-keyframes tfnob-VVkcfZa_O70hEZF{0%{opacity:0}to{opacity:1}}@keyframes tfnob-VVkcfZa_O70hEZF{0%{opacity:0}to{opacity:1}}", ""]);

// exports
exports.locals = {
	"details": "_2zN8Jia3o40DJK2XFO2s6L",
	"press-space": "_1BylTZkPG8gkwgfvwCvLOa",
	"fade-in": "tfnob-VVkcfZa_O70hEZF",
	"previous": "_2uUOLh-GHP3W5k3EJVDdI8",
	"next": "_21VdowGEfog2TOWMX5lgTU"
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "._2VLn5oaofKo9b6i3M56DU7{background-color:#fff;padding:32px;max-width:600px}h3{margin:0}", ""]);

// exports
exports.locals = {
	"modale": "_2VLn5oaofKo9b6i3M56DU7"
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".PKEQD3fr9gVEDnJDP72jH{-webkit-animation:_1MRDqSUoO544HlcX1vnCrO .3s cubic-bezier(.25,.46,.45,.94) both;animation:_1MRDqSUoO544HlcX1vnCrO .3s cubic-bezier(.25,.46,.45,.94) both;padding:4px;border:1px solid #000;border-radius:100%;background-color:#fff;transition:height .3s,width .3s,padding .3s}@-webkit-keyframes _1MRDqSUoO544HlcX1vnCrO{0%{-webkit-transform:scale(0);transform:scale(0);opacity:1}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}@keyframes _1MRDqSUoO544HlcX1vnCrO{0%{-webkit-transform:scale(0);transform:scale(0);opacity:1}to{-webkit-transform:scale(1);transform:scale(1);opacity:1}}", ""]);

// exports
exports.locals = {
	"icon": "PKEQD3fr9gVEDnJDP72jH",
	"scale-in-center": "_1MRDqSUoO544HlcX1vnCrO"
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".xYL0pYSn6nun3QIfmk8V{height:100vh;-webkit-box-flex:1;-ms-flex:1;flex:1}", ""]);

// exports
exports.locals = {
	"map": "xYL0pYSn6nun3QIfmk8V"
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "._3HFblCVkoiitjxXOneiqqF{position:relative;height:100%}._33lmxoaFCsB5iqFyRuOpKF{background-size:cover;background-position:50%;cursor:pointer;top:0;bottom:0;left:0;right:0;opacity:0;position:absolute;transition:opacity 1s}._33lmxoaFCsB5iqFyRuOpKF._2gnB6XXW9AOXDnzS7UYRmC{opacity:1}", ""]);

// exports
exports.locals = {
	"pictures": "_3HFblCVkoiitjxXOneiqqF",
	"picture": "_33lmxoaFCsB5iqFyRuOpKF",
	"show": "_2gnB6XXW9AOXDnzS7UYRmC"
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "article{display:-webkit-box;display:-ms-flexbox;display:flex;height:100%;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;overflow:hidden;background-color:#fff}h1{font-family:Crimson Text,serif}._4FB4gimJS_cFqc4BZLNs{-webkit-box-flex:1;-ms-flex:1;flex:1}._2Li1pLE7fIkhevf5pZktuW{-ms-flex-negative:0;flex-shrink:0;overflow:auto;padding:16px 32px;max-height:100%;z-index:1;-webkit-box-flex:1;-ms-flex:1;flex:1}._1twJ5kU4GLLimCi5P5Pc5O{white-space:pre-line;line-height:1.5em}p{margin-bottom:1em}", ""]);

// exports
exports.locals = {
	"pictures": "_4FB4gimJS_cFqc4BZLNs",
	"content": "_2Li1pLE7fIkhevf5pZktuW",
	"body": "_1twJ5kU4GLLimCi5P5Pc5O"
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "._1Y6_HaEWwJxWyVSNib203Y{transition:-webkit-transform 1s;transition:transform 1s;transition:transform 1s,-webkit-transform 1s}.oJPGill9ipS0BMaycU-lb{-webkit-transform:scale(3);-ms-transform:scale(3);transform:scale(3)}._2yABU79lL206DWnv6838uL{text-decoration:none;color:#000;font-family:Crimson Text,serif;font-weight:700;font-size:22px;transition:color .5s}._2yABU79lL206DWnv6838uL:after,._2yABU79lL206DWnv6838uL:before{content:\"\\\\\"}._2yABU79lL206DWnv6838uL:after,._2yABU79lL206DWnv6838uL:before{display:inline-block;transition:-webkit-transform .8s;transition:transform .8s;transition:transform .8s,-webkit-transform .8s}._2yABU79lL206DWnv6838uL:hover:after{-webkit-transform:translateX(10px);-ms-transform:translateX(10px);transform:translateX(10px)}._2yABU79lL206DWnv6838uL:hover:before{-webkit-transform:translateX(-10px);-ms-transform:translateX(-10px);transform:translateX(-10px)}", ""]);

// exports
exports.locals = {
	"map": "_1Y6_HaEWwJxWyVSNib203Y",
	"zoom-in": "oJPGill9ipS0BMaycU-lb",
	"brand": "_2yABU79lL206DWnv6838uL"
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".oN5LA9zOXPVe8Fb80k2M{background-color:#fff;padding:32px}._3GOoVHWKiIvzN4q69wOh0i{text-align:center}", ""]);

// exports
exports.locals = {
	"modale": "oN5LA9zOXPVe8Fb80k2M",
	"button-container": "_3GOoVHWKiIvzN4q69wOh0i"
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "._1Zr28wOfIvARw6IrA_eFZt{z-index:2}._1vCxNZe8LPPAj9LMIoGeZJ{border:1px solid #000;height:48px;font-size:large;padding:4px 16px;-webkit-box-flex:1;-ms-flex:1;flex:1}.xv7najAL6WuQ7IFUtOr03{display:-webkit-box;display:-ms-flexbox;display:flex}._2Dq5AwRyJqLkUEgQEi9RaB{display:block;font-weight:700;margin-bottom:4px}._9fNwAEPvTmd3h0_7NgxH_{background:none;border:none;border-bottom:1px dashed #000;padding-bottom:1px}._2_0U2cuqqmYhoCEAQ1Odm1{background-color:#000;color:#fff;padding:4px 8px;text-transform:uppercase;border:none;font-family:inherit}", ""]);

// exports
exports.locals = {
	"form": "_1Zr28wOfIvARw6IrA_eFZt",
	"input": "_1vCxNZe8LPPAj9LMIoGeZJ",
	"input-container": "xv7najAL6WuQ7IFUtOr03",
	"label": "_2Dq5AwRyJqLkUEgQEi9RaB",
	"select": "_9fNwAEPvTmd3h0_7NgxH_",
	"submit": "_2_0U2cuqqmYhoCEAQ1Odm1"
};

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "._1Hi-VEjEiaTcv5IZcJB-M1{position:relative;border-radius:32px;border:2px solid #fff;display:inline-block;text-decoration:none;cursor:pointer;color:#fff;font-size:large;padding:12px 32px;font-weight:700;transition:border-color 1s;background:#000;background-clip:padding-box}._1Hi-VEjEiaTcv5IZcJB-M1:hover{border-color:transparent}._1Hi-VEjEiaTcv5IZcJB-M1:after{position:absolute;top:-2px;bottom:-2px;left:-2px;right:-2px;border-radius:32px;content:\"\";z-index:-1;background:linear-gradient(45deg,red,#ff0 15%,#0f0 30%,#0ff 50%,#00f 65%,#f0f 80%,red);-webkit-animation:j9SqYhscEl0opQYpqtxd8 1s linear infinite;animation:j9SqYhscEl0opQYpqtxd8 1s linear infinite}@-webkit-keyframes j9SqYhscEl0opQYpqtxd8{0%{filter:url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feColorMatrix type=\"hueRotate\" color-interpolation-filters=\"sRGB\" values=\"0\" /></filter></svg>#filter');-webkit-filter:hue-rotate(0deg);filter:hue-rotate(0deg)}to{filter:url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feColorMatrix type=\"hueRotate\" color-interpolation-filters=\"sRGB\" values=\"360\" /></filter></svg>#filter');-webkit-filter:hue-rotate(1turn);filter:hue-rotate(1turn)}}@keyframes j9SqYhscEl0opQYpqtxd8{0%{filter:url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feColorMatrix type=\"hueRotate\" color-interpolation-filters=\"sRGB\" values=\"0\" /></filter></svg>#filter');-webkit-filter:hue-rotate(0deg);filter:hue-rotate(0deg)}to{filter:url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\"><filter id=\"filter\"><feColorMatrix type=\"hueRotate\" color-interpolation-filters=\"sRGB\" values=\"360\" /></filter></svg>#filter');-webkit-filter:hue-rotate(1turn);filter:hue-rotate(1turn)}}", ""]);

// exports
exports.locals = {
	"button": "_1Hi-VEjEiaTcv5IZcJB-M1",
	"hue-rotate": "j9SqYhscEl0opQYpqtxd8"
};

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".k4A_waKbwnvnlsuaKRY7y{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;height:100vh;transition:background-color .5s;padding:0 48px}._4USFlnYYVXWWXKpXpOW7K,.XdUbx34XcgvZfHDbpBhh1{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:48px;-ms-flex-item-align:center;align-self:center}.wwCOC3ZdBBGAL07kyz6VB{-webkit-box-flex:1;-ms-flex:1;flex:1;width:100%;-ms-flex-item-align:center;-ms-grid-row-align:center;align-self:center;max-width:150vh;position:relative}", ""]);

// exports
exports.locals = {
	"layout": "k4A_waKbwnvnlsuaKRY7y",
	"top": "XdUbx34XcgvZfHDbpBhh1",
	"bottom": "_4USFlnYYVXWWXKpXpOW7K",
	"inside": "wwCOC3ZdBBGAL07kyz6VB"
};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "._1F4_XEZkNlv8CTfpPOY0ks{position:absolute;z-index:3;top:0;bottom:0;left:0;right:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}._1ow_EajuP-nT-YAwKWoUz2{position:absolute;top:0;right:0;padding:16px;z-index:2;border:none;display:block;font-size:large;background-color:transparent;cursor:pointer}._1ow_EajuP-nT-YAwKWoUz2:hover{font-weight:700}._1XD0i2uLKvViiabasrGoZ9 ._1ow_EajuP-nT-YAwKWoUz2{right:-44px;color:#fff;top:-2px}._2ddo9HyvSLFHBVAVioufpW{position:relative;max-width:600px;max-height:100%;border:1px solid #000}._1XD0i2uLKvViiabasrGoZ9{max-width:none;-webkit-box-flex:1;-ms-flex:1;flex:1;border:2px solid #fff;width:100%}._1TsM6ua6CxzVtgRJ382_mk{opacity:.01;-webkit-transform:scale(.01);-ms-transform:scale(.01);transform:scale(.01)}.cOvkbqCR8no-ec13LilzJ{transition:opacity .8s,-webkit-transform .8s;transition:opacity .8s,transform .8s;transition:opacity .8s,transform .8s,-webkit-transform .8s}._24Fs2WyOMODazrXYQUJnwT,.cOvkbqCR8no-ec13LilzJ{opacity:1;-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}._3bda8py8V2L3rzzA4P-_DN{opacity:.01;-webkit-transform:scale(.01);-ms-transform:scale(.01);transform:scale(.01);transition:opacity .5s,-webkit-transform .5s;transition:opacity .5s,transform .5s;transition:opacity .5s,transform .5s,-webkit-transform .5s}", ""]);

// exports
exports.locals = {
	"overlay": "_1F4_XEZkNlv8CTfpPOY0ks",
	"close-button": "_1ow_EajuP-nT-YAwKWoUz2",
	"fullscreen": "_1XD0i2uLKvViiabasrGoZ9",
	"modale": "_2ddo9HyvSLFHBVAVioufpW",
	"enter": "_1TsM6ua6CxzVtgRJ382_mk",
	"enter-active": "cOvkbqCR8no-ec13LilzJ",
	"leave": "_24Fs2WyOMODazrXYQUJnwT",
	"leave-active": "_3bda8py8V2L3rzzA4P-_DN"
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,footer,header,nav,section{display:block}h1{font-size:2em;margin:.67em 0}figcaption,figure,main{display:block}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent;-webkit-text-decoration-skip:objects}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit;font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}audio,video{display:inline-block}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:sans-serif;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{display:inline-block;vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details,menu{display:block}summary{display:list-item}canvas{display:inline-block}[hidden],template{display:none}body{box-sizing:border-box;background-color:#fdfaf2}*{font-family:Lato,sans-serif;box-sizing:inherit}", ""]);

// exports


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(103);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../node_modules/css-loader/index.js??ref--0-1!../node_modules/postcss-loader/index.js!./style.global.css", function() {
        content = require("!!../node_modules/css-loader/index.js??ref--0-1!../node_modules/postcss-loader/index.js!./style.global.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(90);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/index.js!./style.css", function() {
        content = require("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/index.js!./style.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(91);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/index.js!./style.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/index.js!./style.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(92);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/index.js!./style.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/index.js!./style.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(93);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/index.js!./style.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/index.js!./style.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(94);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/index.js!./style.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/index.js!./style.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(95);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/index.js!./style.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/index.js!./style.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(96);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/index.js!./style.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/index.js!./style.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(97);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/index.js!./style.css", function() {
        content = require("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/index.js!./style.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(98);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/index.js!./style.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/index.js!./style.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(99);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/index.js!./style.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-1!../../../node_modules/postcss-loader/index.js!./style.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(100);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/index.js!./style.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/index.js!./style.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(101);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/index.js!./style.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/index.js!./style.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(102);
    var insertCss = __webpack_require__(2);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/index.js!./style.css", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--1-1!../../../../node_modules/postcss-loader/index.js!./style.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "files/69b092c386b258d0aa21569f13b95552.jpg";

/***/ }),
/* 119 */
/***/ (function(module, exports) {

module.exports = require("@turf/bezier");

/***/ }),
/* 120 */
/***/ (function(module, exports) {

module.exports = require("@turf/helpers");

/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = require("@turf/line-distance");

/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = require("@turf/line-slice");

/***/ }),
/* 123 */
/***/ (function(module, exports) {

module.exports = require("@turf/line-slice-along");

/***/ }),
/* 124 */
/***/ (function(module, exports) {

module.exports = require("@turf/meta");

/***/ }),
/* 125 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 126 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 127 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 128 */
/***/ (function(module, exports) {

module.exports = require("dotenv/config");

/***/ }),
/* 129 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 130 */
/***/ (function(module, exports) {

module.exports = require("http-graceful-shutdown");

/***/ }),
/* 131 */
/***/ (function(module, exports) {

module.exports = require("js-string-escape");

/***/ }),
/* 132 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 133 */
/***/ (function(module, exports) {

module.exports = require("koa-compose");

/***/ }),
/* 134 */
/***/ (function(module, exports) {

module.exports = require("koa-conditional-get");

/***/ }),
/* 135 */
/***/ (function(module, exports) {

module.exports = require("koa-etag");

/***/ }),
/* 136 */
/***/ (function(module, exports) {

module.exports = require("koa-mount");

/***/ }),
/* 137 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 138 */
/***/ (function(module, exports) {

module.exports = require("koa-static");

/***/ }),
/* 139 */
/***/ (function(module, exports) {

module.exports = require("mailchimp-api-v3");

/***/ }),
/* 140 */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),
/* 141 */
/***/ (function(module, exports) {

module.exports = require("prismic-dom");

/***/ }),
/* 142 */
/***/ (function(module, exports) {

module.exports = require("react-resolver");

/***/ }),
/* 143 */
/***/ (function(module, exports) {

module.exports = require("react-router-redux");

/***/ }),
/* 144 */
/***/ (function(module, exports) {

module.exports = require("react-transition-group");

/***/ }),
/* 145 */
/***/ (function(module, exports) {

module.exports = require("readline");

/***/ }),
/* 146 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 147 */
/***/ (function(module, exports) {

module.exports = require("rxjs/add/observable/dom/ajax");

/***/ }),
/* 148 */
/***/ (function(module, exports) {

module.exports = require("rxjs/add/observable/merge");

/***/ }),
/* 149 */
/***/ (function(module, exports) {

module.exports = require("rxjs/add/observable/of");

/***/ }),
/* 150 */
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/bufferTime");

/***/ }),
/* 151 */
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/do");

/***/ }),
/* 152 */
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/map");

/***/ }),
/* 153 */
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/merge");

/***/ }),
/* 154 */
/***/ (function(module, exports) {

module.exports = require("rxjs/add/operator/startWith");

/***/ }),
/* 155 */
/***/ (function(module, exports) {

module.exports = require("rxjs/observable/dom/AjaxObservable");

/***/ }),
/* 156 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(38);


/***/ })
/******/ ]);