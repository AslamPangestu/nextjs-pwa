(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["static/development/pages/index.js"],{

/***/ "./node_modules/localized-strings/lib/LocalizedStrings.js":
/*!****************************************************************!*\
  !*** ./node_modules/localized-strings/lib/LocalizedStrings.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/localized-strings/lib/utils.js");

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Simple module to localize the React interface using the same syntax
 * used in the ReactNativeLocalization module
 * (https://github.com/stefalda/ReactNativeLocalization)
 *
 * Originally developed by Stefano Falda (stefano.falda@gmail.com)
 *
 * It uses a call to the Navigator/Browser object to get the current interface language,
 * then display the correct language strings or the default language (the first
 * one if a match is not found).
 *
 * How to use:
 * Check the instructions at:
 * https://github.com/stefalda/localized-strings
 */

var placeholderReplaceRegex = /(\{[\d|\w]+\})/;
var placeholderReferenceRegex = /(\$ref\{[\w|.]+\})/;

var LocalizedStrings = function () {
  /**
   * Constructor used to provide the strings objects in various language and the optional callback to get
   * the interface language
   * @param {*} props - the strings object
   * @param {Function} options.customLanguageInterface - the optional method to use to get the InterfaceLanguage
   * @param {Boolean} options.pseudo - convert all strings to pseudo, helpful when implementing
   * @param {Boolean} options.pseudoMultipleLanguages - add 40% to pseudo, helps with translations in the future
   * @param {Boolean} options.logsEnabled - Enable/Disable console.log outputs (default=true)
   */
  function LocalizedStrings(props, options) {
    _classCallCheck(this, LocalizedStrings);

    // Compatibility fix with previous version
    if (typeof options === "function") {
      /* eslint-disable no-param-reassign */
      options = { customLanguageInterface: options };
      /* eslint-enable */
    }
    this._opts = _extends({}, {
      customLanguageInterface: utils.getInterfaceLanguage,
      pseudo: false,
      pseudoMultipleLanguages: false,
      logsEnabled: true
    }, options);
    this._interfaceLanguage = this._opts.customLanguageInterface();
    this._language = this._interfaceLanguage;
    this.setContent(props);
  }

  /**
   * Set the strings objects based on the parameter passed in the constructor
   * @param {*} props
   */


  _createClass(LocalizedStrings, [{
    key: "setContent",
    value: function setContent(props) {
      var _this = this;

      var _Object$keys = Object.keys(props),
          _Object$keys2 = _slicedToArray(_Object$keys, 1),
          defaultLang = _Object$keys2[0];

      this._defaultLanguage = defaultLang;
      this._defaultLanguageFirstLevelKeys = [];
      // Store locally the passed strings
      this._props = props;
      utils.validateTranslationKeys(Object.keys(props[this._defaultLanguage]));
      // Store first level keys (for identifying missing translations)
      Object.keys(this._props[this._defaultLanguage]).forEach(function (key) {
        if (typeof _this._props[_this._defaultLanguage][key] === "string") {
          _this._defaultLanguageFirstLevelKeys.push(key);
        }
      });
      // Set language to its default value (the interface)
      this.setLanguage(this._interfaceLanguage);
      // Developermode with pseudo
      if (this._opts.pseudo) {
        this._pseudoAllValues(this._props);
      }
    }

    /**
     * Replace all strings to pseudo value
     * @param {Object} obj - Loopable object
     */

  }, {
    key: "_pseudoAllValues",
    value: function _pseudoAllValues(obj) {
      var _this2 = this;

      Object.keys(obj).forEach(function (property) {
        if (_typeof(obj[property]) === "object") {
          _this2._pseudoAllValues(obj[property]);
        } else if (typeof obj[property] === "string") {
          if (obj[property].indexOf("[") === 0 && obj[property].lastIndexOf("]") === obj[property].length - 1) {
            // already psuedo fixed
            return;
          }
          // @TODO must be a way to get regex to find all replaceble strings except our replacement variables
          var strArr = obj[property].split(" ");
          for (var i = 0; i < strArr.length; i += 1) {
            if (strArr[i].match(placeholderReplaceRegex)) {
              // we want to keep this string, includes specials
            } else if (strArr[i].match(placeholderReferenceRegex)) {
              // we want to keep this string, includes specials
            } else {
              var len = strArr[i].length;
              if (_this2._opts.pseudoMultipleLanguages) {
                len = parseInt(len * 1.4, 10); // add length with 40%
              }
              strArr[i] = utils.randomPseudo(len);
            }
          }
          obj[property] = "[" + strArr.join(" ") + "]"; // eslint-disable-line no-param-reassign
        }
      });
    }

    /**
     * Can be used from ouside the class to force a particular language
     * indipendently from the interface one
     * @param {*} language
     */

  }, {
    key: "setLanguage",
    value: function setLanguage(language) {
      var _this3 = this;

      // Check if exists a translation for the current language or if the default
      // should be used
      var bestLanguage = utils.getBestMatchingLanguage(language, this._props);
      var defaultLanguage = Object.keys(this._props)[0];
      this._language = bestLanguage;
      // Associate the language object to the this object
      if (this._props[bestLanguage]) {
        // delete default propery values to identify missing translations
        for (var i = 0; i < this._defaultLanguageFirstLevelKeys.length; i += 1) {
          delete this[this._defaultLanguageFirstLevelKeys[i]];
        }
        var localizedStrings = _extends({}, this._props[this._language]);
        Object.keys(localizedStrings).forEach(function (key) {
          _this3[key] = localizedStrings[key];
        });
        // Now add any string missing from the translation but existing in the default language
        if (defaultLanguage !== this._language) {
          localizedStrings = this._props[defaultLanguage];
          this._fallbackValues(localizedStrings, this);
        }
      }
    }

    /**
     * Load fallback values for missing translations
     * @param {*} defaultStrings
     * @param {*} strings
     */

  }, {
    key: "_fallbackValues",
    value: function _fallbackValues(defaultStrings, strings) {
      var _this4 = this;

      Object.keys(defaultStrings).forEach(function (key) {
        if (Object.prototype.hasOwnProperty.call(defaultStrings, key) && !strings[key] && strings[key] !== "") {
          strings[key] = defaultStrings[key]; // eslint-disable-line no-param-reassign
          if (_this4._opts.logsEnabled) {
            console.log("\uD83D\uDEA7 \uD83D\uDC77 key '" + key + "' not found in localizedStrings for language " + _this4._language + " \uD83D\uDEA7");
          }
        } else if (typeof strings[key] !== "string") {
          // It's an object
          _this4._fallbackValues(defaultStrings[key], strings[key]);
        }
      });
    }

    /**
     * The current language displayed (could differ from the interface language
     * if it has been forced manually and a matching translation has been found)
     */

  }, {
    key: "getLanguage",
    value: function getLanguage() {
      return this._language;
    }

    /**
     * The current interface language (could differ from the language displayed)
     */

  }, {
    key: "getInterfaceLanguage",
    value: function getInterfaceLanguage() {
      return this._interfaceLanguage;
    }

    /**
     * Return an array containing the available languages passed as props in the constructor
     */

  }, {
    key: "getAvailableLanguages",
    value: function getAvailableLanguages() {
      var _this5 = this;

      if (!this._availableLanguages) {
        this._availableLanguages = [];
        Object.keys(this._props).forEach(function (key) {
          _this5._availableLanguages.push(key);
        });
      }
      return this._availableLanguages;
    }

    // Format the passed string replacing the numbered or tokenized placeholders
    // eg. 1: I'd like some {0} and {1}, or just {0}
    // eg. 2: I'd like some {bread} and {butter}, or just {bread}
    // eg. 3: I'd like some $ref{bread} and $ref{butter}, or just $ref{bread}
    // Use example:
    // eg. 1: strings.formatString(strings.question, strings.bread, strings.butter)
    // eg. 2: strings.formatString(strings.question, { bread: strings.bread, butter: strings.butter })
    // eg. 3: strings.formatString(strings.question)

  }, {
    key: "formatString",
    value: function formatString(str) {
      var _this6 = this;

      for (var _len = arguments.length, valuesForPlaceholders = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        valuesForPlaceholders[_key - 1] = arguments[_key];
      }

      var input = str || "";
      if (typeof input === "string") {
        input = this.getString(str, null, true) || input;
      }
      var ref = input.split(placeholderReferenceRegex).filter(function (textPart) {
        return !!textPart;
      }).map(function (textPart) {
        if (textPart.match(placeholderReferenceRegex)) {
          var matchedKey = textPart.slice(5, -1);
          var referenceValue = _this6.getString(matchedKey);
          if (referenceValue) return referenceValue;
          if (_this6._opts.logsEnabled) {
            console.log("No Localization ref found for '" + textPart + "' in string '" + str + "'");
          }
          // lets print it another way so next replacer doesn't find it
          return "$ref(id:" + matchedKey + ")";
        }
        return textPart;
      }).join("");
      return ref.split(placeholderReplaceRegex).filter(function (textPart) {
        return !!textPart;
      }).map(function (textPart) {
        if (textPart.match(placeholderReplaceRegex)) {
          var matchedKey = textPart.slice(1, -1);
          var valueForPlaceholder = valuesForPlaceholders[matchedKey];
          // If no value found, check if working with an object instead
          if (valueForPlaceholder === undefined) {
            var valueFromObjectPlaceholder = valuesForPlaceholders[0][matchedKey];
            if (valueFromObjectPlaceholder !== undefined) {
              valueForPlaceholder = valueFromObjectPlaceholder;
            } else {
              // If value still isn't found, then it must have been undefined/null
              return valueForPlaceholder;
            }
          }

          return valueForPlaceholder;
        }
        return textPart;
      }).join("");
    }

    // Return a string with the passed key in a different language or defalt if not set
    // We allow deep . notation for finding strings

  }, {
    key: "getString",
    value: function getString(key, language) {
      var omitWarning = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      try {
        var current = this._props[language || this._language];
        var paths = key.split(".");
        for (var i = 0; i < paths.length; i += 1) {
          if (current[paths[i]] === undefined) {
            throw Error(paths[i]);
          }
          current = current[paths[i]];
        }
        return current;
      } catch (ex) {
        if (!omitWarning && this._opts.logsEnabled) {
          console.log("No localization found for key '" + key + "' and language '" + language + "', failed on " + ex.message);
        }
      }
      return null;
    }

    /**
     * The current props (locale object)
     */

  }, {
    key: "getContent",
    value: function getContent() {
      return this._props;
    }
  }]);

  return LocalizedStrings;
}();

exports.default = LocalizedStrings;

/***/ }),

/***/ "./node_modules/localized-strings/lib/utils.js":
/*!*****************************************************!*\
  !*** ./node_modules/localized-strings/lib/utils.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInterfaceLanguage = getInterfaceLanguage;
exports.getBestMatchingLanguage = getBestMatchingLanguage;
exports.validateTranslationKeys = validateTranslationKeys;
exports.randomPseudo = randomPseudo;
/**
 * Return the current interface language
 * If the navigator object is defined it returns the current navigator language
 * otherwise it falls back to 'en-US'
 * Works in browsers
 */
function getInterfaceLanguage() {
  var defaultLang = 'en-US';
  if (typeof navigator === 'undefined') {
    return defaultLang;
  }
  var nav = navigator; // eslint-disable-line no-undef
  if (nav) {
    if (nav.language) {
      return nav.language;
    }
    if (!!nav.languages && !!nav.languages[0]) {
      return nav.languages[0];
    }
    if (nav.userLanguage) {
      return nav.userLanguage;
    }
    if (nav.browserLanguage) {
      return nav.browserLanguage;
    }
  }
  return defaultLang;
}

/**
 * Get the best match based on the language passed and the available languages
 * @param {*} language
 * @param {*} props
 */
function getBestMatchingLanguage(language, props) {
  // If an object with the passed language key exists return it
  if (props[language]) return language;

  // if the string is composed try to find a match with only the first language identifiers (en-US --> en)
  var idx = language.indexOf('-');
  var auxLang = idx >= 0 ? language.substring(0, idx) : language;
  return props[auxLang] ? auxLang : Object.keys(props)[0];
}

/**
 * Check that the keys used in the provided strings object don't collide with existing property
 * already defined in the LocalizedStrings object
 * @param {*} translationKeys
 */
function validateTranslationKeys(translationKeys) {
  var reservedNames = ['_interfaceLanguage', '_language', '_defaultLanguage', '_defaultLanguageFirstLevelKeys', '_props'];
  translationKeys.forEach(function (key) {
    if (reservedNames.indexOf(key) !== -1) {
      throw new Error(key + ' cannot be used as a key. It is a reserved word.');
    }
  });
}

/**
 * Get a random pseudo string back after specified a length
 * @param {Number} len - How many characters to get back
 */
function randomPseudo(len) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < len; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }return text;
}

/***/ }),

/***/ "./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F&absolutePagePath=%2Fhome%2Fmvryan%2FDocuments%2FPWA%2Fnext-pwa%2Fpages%2Findex.js!./":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F&absolutePagePath=%2Fhome%2Fmvryan%2FDocuments%2FPWA%2Fnext-pwa%2Fpages%2Findex.js ***!
  \*****************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P=window.__NEXT_P||[]).push(["/", function() {
      var mod = __webpack_require__(/*! ./pages/index.js */ "./pages/index.js")
      if(true) {
        module.hot.accept(/*! ./pages/index.js */ "./pages/index.js", function() {
          if(!next.router.components["/"]) return
          var updatedPage = __webpack_require__(/*! ./pages/index.js */ "./pages/index.js")
          next.router.update("/", updatedPage)
        })
      }
      return mod
    }]);
  

/***/ }),

/***/ "./node_modules/react-localization/lib/LocalizedStrings.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react-localization/lib/LocalizedStrings.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Simple module to localize the React interface using the same syntax
 * used in the ReactNativeLocalization module
 * (https://github.com/stefalda/ReactNativeLocalization)
 *
 * Originally developed by Stefano Falda (stefano.falda@gmail.com)
 *
 * It uses a call to the Navigator/Browser object to get the current interface language,
 * then display the correct language strings or the default language (the first
 * one if a match is not found).
 *
 * This library has been refactored to use the newly created localized-strings package so to
 * unify the code and make it easier to mantain
 *
 * How to use:
 * Check the instructions at:
 * https://github.com/stefalda/react-localization
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _localizedStrings = __webpack_require__(/*! localized-strings */ "./node_modules/localized-strings/lib/LocalizedStrings.js");

var _localizedStrings2 = _interopRequireDefault(_localizedStrings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var placeholderRegex = /(\{[\d|\w]+\})/;

/**
 * Format the passed string replacing the numbered or tokenized placeholders
 * eg. 1: I'd like some {0} and {1}, or just {0}
 * eg. 2: I'd like some {bread} and {butter}, or just {bread}
 * Use example:
 * eg. 1: strings.formatString(strings.question, strings.bread, strings.butter)
 * eg. 2: strings.formatString(strings.question, { bread: strings.bread, butter: strings.butter }
 *
 * THIS METHOD OVERRIDE the one of the parent class by adding support for JSX code
*/
_localizedStrings2.default.prototype.formatString = function (str) {
  for (var _len = arguments.length, valuesForPlaceholders = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    valuesForPlaceholders[_key - 1] = arguments[_key];
  }

  var hasObject = false;
  var res = (str || '').split(placeholderRegex).filter(function (textPart) {
    return !!textPart;
  }).map(function (textPart, index) {
    if (textPart.match(placeholderRegex)) {
      var matchedKey = textPart.slice(1, -1);
      var valueForPlaceholder = valuesForPlaceholders[matchedKey];

      // If no value found, check if working with an object instead
      if (valueForPlaceholder == undefined) {
        var valueFromObjectPlaceholder = valuesForPlaceholders[0][matchedKey];
        if (valueFromObjectPlaceholder !== undefined) {
          valueForPlaceholder = valueFromObjectPlaceholder;
        } else {
          // If value still isn't found, then it must have been undefined/null
          return valueForPlaceholder;
        }
      }

      if (_react2.default.isValidElement(valueForPlaceholder)) {
        hasObject = true;
        return _react2.default.Children.toArray(valueForPlaceholder).map(function (component) {
          return _extends({}, component, { key: index.toString() });
        });
      }

      return valueForPlaceholder;
    }
    return textPart;
  });
  // If the results contains a object return an array otherwise return a string
  if (hasObject) return res;
  return res.join('');
};

exports.default = _localizedStrings2.default;

/***/ }),

/***/ "./node_modules/react/index.js":
/*!*******************************************************************************************!*\
  !*** delegated ./node_modules/react/index.js from dll-reference dll_ef0ff7c60362f24a921f ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference dll_ef0ff7c60362f24a921f */ "dll-reference dll_ef0ff7c60362f24a921f"))("./node_modules/react/index.js");

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_strings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/strings */ "./utils/strings.js");
var _jsxFileName = "/home/mvryan/Documents/PWA/next-pwa/pages/index.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


function HomePage() {
  return __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }, "Welcome to Next.js!", _utils_strings__WEBPACK_IMPORTED_MODULE_1__["default"].title);
}

/* harmony default export */ __webpack_exports__["default"] = (HomePage);

/***/ }),

/***/ "./utils/strings.js":
/*!**************************!*\
  !*** ./utils/strings.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_localization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-localization */ "./node_modules/react-localization/lib/LocalizedStrings.js");
/* harmony import */ var react_localization__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_localization__WEBPACK_IMPORTED_MODULE_0__);

var Strings = new react_localization__WEBPACK_IMPORTED_MODULE_0___default.a({
  en: {
    title: "Hello EN"
  },
  "en-US": {
    title: "Hello US"
  }
});
/* harmony default export */ __webpack_exports__["default"] = (Strings);

/***/ }),

/***/ 1:
/*!*********************************************************************************************************************************!*\
  !*** multi next-client-pages-loader?page=%2F&absolutePagePath=%2Fhome%2Fmvryan%2FDocuments%2FPWA%2Fnext-pwa%2Fpages%2Findex.js ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! next-client-pages-loader?page=%2F&absolutePagePath=%2Fhome%2Fmvryan%2FDocuments%2FPWA%2Fnext-pwa%2Fpages%2Findex.js! */"./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F&absolutePagePath=%2Fhome%2Fmvryan%2FDocuments%2FPWA%2Fnext-pwa%2Fpages%2Findex.js!./");


/***/ }),

/***/ "dll-reference dll_ef0ff7c60362f24a921f":
/*!*******************************************!*\
  !*** external "dll_ef0ff7c60362f24a921f" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = dll_ef0ff7c60362f24a921f;

/***/ })

},[[1,"static/runtime/webpack.js"]]]);
//# sourceMappingURL=index.js.map