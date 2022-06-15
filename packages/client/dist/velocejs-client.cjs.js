'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var UrlPattern = require('url-pattern');
var require$$1$2 = require('tty');
var require$$1$3 = require('util');
var require$$0$1 = require('os');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var UrlPattern__default = /*#__PURE__*/_interopDefaultLegacy(UrlPattern);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1$2);
var require$$1__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$1$3);
var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);

const DEFAULT_REQUEST_METHOD = 'get';
const WEBSOCKET_METHOD = 'ws';
// The same from bodyparser
const DYNAMIC_ROUTE_PATTERN = '/:';
// just to give a name to the different validation methods
// was import from '@jsonql/validators'
const RETURN_AS_OBJ$1 = 'object';

// @TODO create a separate module and import on demand?
/**  construct the url for different type of methods */ function prepareUrl(entry, args) {
    const route = entry.route;
    // handle dynamic route
    if (route.indexOf(DYNAMIC_ROUTE_PATTERN) > -1) {
        const lib = new UrlPattern__default["default"](route);
        const names = getNamesFromDynamicUrl(route);
        const params = getParamsForDynamicRoute(args, names);
        return lib.stringify(params);
    }
    // ugly but works ...
    if (entry.type === DEFAULT_REQUEST_METHOD && hasArgs(args)) {
        return createQueryUrl(route, args);
    }
    return route;
}
/** extract the name from the dynamic url for reconstruct the url, from bodyparser */ function getNamesFromDynamicUrl(url) {
    const parts = url.split(DYNAMIC_ROUTE_PATTERN);
    parts.shift();
    return parts.map((part)=>part.replace('(', '').replace(')', ''));
}
/** just check if the arguments has key but not account for the value is array */ function hasArgs(args) {
    return !!Object.keys(args).length;
}
/** extra the array argument to pass to the UrlPattern lib to construct dynamic url */ function getParamsForDynamicRoute(args, names) {
    let params = [] // it has to be primitive type for url pattern
    ;
    // good thing is in the previous call they already been prepared
    for(const key in args){
        const value = args[key];
        if (Array.isArray(value)) {
            params = params.concat(value);
        } else {
            params.push(value);
        }
    }
    return params.map((param, i)=>({
            [names[i]]: param
        })).reduce((a, b)=>Object.assign(a, b), {});
}
/** wrap this in one function and we could replace the internal later */ function createQueryUrl(route, args) {
    const url = route + '?';
    const params = [];
    for(const key in args){
        params.push(`${key}=${args[key]}`);
    }
    return url + params.join('&');
}

function getAugmentedNamespace(n) {
  var f = n.default;
	if (typeof f == "function") {
		var a = function () {
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var object$1 = {};

var common$2 = {};

var lodash$2 = {};

/******************************************************************************
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
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
    };
    return __assign.apply(this, arguments);
};

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

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
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

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

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
}
var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}

var tslib_es6 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  __extends: __extends,
  get __assign () { return __assign; },
  __rest: __rest,
  __decorate: __decorate,
  __param: __param,
  __metadata: __metadata,
  __awaiter: __awaiter,
  __generator: __generator,
  __createBinding: __createBinding,
  __exportStar: __exportStar,
  __values: __values,
  __read: __read,
  __spread: __spread,
  __spreadArrays: __spreadArrays,
  __spreadArray: __spreadArray,
  __await: __await,
  __asyncGenerator: __asyncGenerator,
  __asyncDelegator: __asyncDelegator,
  __asyncValues: __asyncValues,
  __makeTemplateObject: __makeTemplateObject,
  __importStar: __importStar,
  __importDefault: __importDefault,
  __classPrivateFieldGet: __classPrivateFieldGet,
  __classPrivateFieldSet: __classPrivateFieldSet,
  __classPrivateFieldIn: __classPrivateFieldIn
});

var require$$0 = /*@__PURE__*/getAugmentedNamespace(tslib_es6);

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol$1 = root.Symbol;

/** Used for built-in method references. */
var objectProto$g = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$d = objectProto$g.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$g.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$d.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$f = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$f.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var numberTag$2 = '[object Number]';

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
 * classified as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a number, else `false`.
 * @example
 *
 * _.isNumber(3);
 * // => true
 *
 * _.isNumber(Number.MIN_VALUE);
 * // => true
 *
 * _.isNumber(Infinity);
 * // => true
 *
 * _.isNumber('3');
 * // => false
 */
function isNumber(value) {
  return typeof value == 'number' ||
    (isObjectLike(value) && baseGetTag(value) == numberTag$2);
}

/**
 * Checks if `value` is `NaN`.
 *
 * **Note:** This method is based on
 * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
 * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
 * `undefined` and other non-number values.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 * @example
 *
 * _.isNaN(NaN);
 * // => true
 *
 * _.isNaN(new Number(NaN));
 * // => true
 *
 * isNaN(undefined);
 * // => true
 *
 * _.isNaN(undefined);
 * // => false
 */
function isNaN(value) {
  // An `NaN` primitive is the only value that is not equal to itself.
  // Perform the `toStringTag` check first to avoid errors with some
  // ActiveX objects in IE.
  return isNumber(value) && value != +value;
}

var _isNaN = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': isNaN
});

var require$$1$1 = /*@__PURE__*/getAugmentedNamespace(_isNaN);

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray$1 = isArray;

/** `Object#toString` result references. */
var stringTag$2 = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray$1(value) && isObjectLike(value) && baseGetTag(value) == stringTag$2);
}

var isString$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': isString
});

var require$$2 = /*@__PURE__*/getAugmentedNamespace(isString$1);

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/** `Object#toString` result references. */
var objectTag$3 = '[object Object]';

/** Used for built-in method references. */
var funcProto$2 = Function.prototype,
    objectProto$e = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$2 = funcProto$2.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$c = objectProto$e.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString$2.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag$3) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$c.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString$2.call(Ctor) == objectCtorString;
}

var isPlainObject$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': isPlainObject
});

var require$$3 = /*@__PURE__*/getAugmentedNamespace(isPlainObject$1);

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag$1 = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$1(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/** Used for built-in method references. */
var funcProto$1 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto$d = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$b = objectProto$d.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty$b).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/* Built-in method references that are verified to be native. */
var Map$1 = getNative(root, 'Map');

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$c = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$a = objectProto$c.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? undefined : result;
  }
  return hasOwnProperty$a.call(data, key) ? data[key] : undefined;
}

/** Used for built-in method references. */
var objectProto$b = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty$9.call(data, key);
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map$1 || ListCache),
    'string': new Hash
  };
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$1 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/** Detect free variable `exports`. */
var freeExports$2 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$2 = freeExports$2 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

/** Built-in value references. */
var Buffer$1 = moduleExports$2 ? root.Buffer : undefined,
    allocUnsafe = Buffer$1 ? Buffer$1.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

/** Used for built-in method references. */
var objectProto$a = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$a;

  return value === proto;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$2;
}

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$9.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$9.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$8.call(value, 'callee') &&
    !propertyIsEnumerable$1.call(value, 'callee');
};

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike$1(value) {
  return value != null && isLength(value.length) && !isFunction$1(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike$1(value);
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

/** Detect free variable `exports`. */
var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

/** Built-in value references. */
var Buffer = moduleExports$1 ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag = '[object Function]',
    mapTag$2 = '[object Map]',
    numberTag$1 = '[object Number]',
    objectTag$2 = '[object Object]',
    regexpTag$1 = '[object RegExp]',
    setTag$2 = '[object Set]',
    stringTag$1 = '[object String]',
    weakMapTag$1 = '[object WeakMap]';

var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$2 = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] =
typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] =
typedArrayTags[dataViewTag$2] = typedArrayTags[dateTag$1] =
typedArrayTags[errorTag$1] = typedArrayTags[funcTag] =
typedArrayTags[mapTag$2] = typedArrayTags[numberTag$1] =
typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$1] =
typedArrayTags[setTag$2] = typedArrayTags[stringTag$1] =
typedArrayTags[weakMapTag$1] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object, key) {
  if (key === 'constructor' && typeof object[key] === 'function') {
    return;
  }

  if (key == '__proto__') {
    return;
  }

  return object[key];
}

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$7.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray$1(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$6.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$5.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike$1(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key),
      srcValue = safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray$1(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray$1(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || isFunction$1(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    stack || (stack = new Stack);
    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$3 = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax$3(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax$3(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

var setToString$1 = setToString;

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString$1(overRest(func, start, identity), func + '');
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike$1(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

var merge$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': merge
});

var require$$4 = /*@__PURE__*/getAugmentedNamespace(merge$1);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

/** Used to store function metadata. */
var metaMap = WeakMap && new WeakMap;

/**
 * The base implementation of `setData` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var baseSetData = !metaMap ? identity : function(func, data) {
  metaMap.set(func, data);
  return func;
};

/**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new wrapped function.
 */
function createCtor(Ctor) {
  return function() {
    // Use a `switch` statement to work with class constructors. See
    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
    // for more details.
    var args = arguments;
    switch (args.length) {
      case 0: return new Ctor;
      case 1: return new Ctor(args[0]);
      case 2: return new Ctor(args[0], args[1]);
      case 3: return new Ctor(args[0], args[1], args[2]);
      case 4: return new Ctor(args[0], args[1], args[2], args[3]);
      case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
      case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
      case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }
    var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, args);

    // Mimic the constructor's `return` behavior.
    // See https://es5.github.io/#x13.2.2 for more details.
    return isObject(result) ? result : thisBinding;
  };
}

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG$6 = 1;

/**
 * Creates a function that wraps `func` to invoke it with the optional `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createBind(func, bitmask, thisArg) {
  var isBind = bitmask & WRAP_BIND_FLAG$6,
      Ctor = createCtor(func);

  function wrapper() {
    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, arguments);
  }
  return wrapper;
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$2 = Math.max;

/**
 * Creates an array that is the composition of partially applied arguments,
 * placeholders, and provided arguments into a single array of arguments.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to prepend to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgs(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersLength = holders.length,
      leftIndex = -1,
      leftLength = partials.length,
      rangeLength = nativeMax$2(argsLength - holdersLength, 0),
      result = Array(leftLength + rangeLength),
      isUncurried = !isCurried;

  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex];
  }
  while (++argsIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[holders[argsIndex]] = args[argsIndex];
    }
  }
  while (rangeLength--) {
    result[leftIndex++] = args[argsIndex++];
  }
  return result;
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$1 = Math.max;

/**
 * This function is like `composeArgs` except that the arguments composition
 * is tailored for `_.partialRight`.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to append to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgsRight(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersIndex = -1,
      holdersLength = holders.length,
      rightIndex = -1,
      rightLength = partials.length,
      rangeLength = nativeMax$1(argsLength - holdersLength, 0),
      result = Array(rangeLength + rightLength),
      isUncurried = !isCurried;

  while (++argsIndex < rangeLength) {
    result[argsIndex] = args[argsIndex];
  }
  var offset = argsIndex;
  while (++rightIndex < rightLength) {
    result[offset + rightIndex] = partials[rightIndex];
  }
  while (++holdersIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[offset + holders[holdersIndex]] = args[argsIndex++];
    }
  }
  return result;
}

/**
 * Gets the number of `placeholder` occurrences in `array`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} placeholder The placeholder to search for.
 * @returns {number} Returns the placeholder count.
 */
function countHolders(array, placeholder) {
  var length = array.length,
      result = 0;

  while (length--) {
    if (array[length] === placeholder) {
      ++result;
    }
  }
  return result;
}

/**
 * The function whose prototype chain sequence wrappers inherit from.
 *
 * @private
 */
function baseLodash() {
  // No operation performed.
}

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295;

/**
 * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
 *
 * @private
 * @constructor
 * @param {*} value The value to wrap.
 */
function LazyWrapper(value) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__dir__ = 1;
  this.__filtered__ = false;
  this.__iteratees__ = [];
  this.__takeCount__ = MAX_ARRAY_LENGTH;
  this.__views__ = [];
}

// Ensure `LazyWrapper` is an instance of `baseLodash`.
LazyWrapper.prototype = baseCreate(baseLodash.prototype);
LazyWrapper.prototype.constructor = LazyWrapper;

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

/**
 * Gets metadata for `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {*} Returns the metadata for `func`.
 */
var getData = !metaMap ? noop : function(func) {
  return metaMap.get(func);
};

/** Used to lookup unminified function names. */
var realNames = {};

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

/**
 * Gets the name of `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {string} Returns the function name.
 */
function getFuncName(func) {
  var result = (func.name + ''),
      array = realNames[result],
      length = hasOwnProperty$4.call(realNames, result) ? array.length : 0;

  while (length--) {
    var data = array[length],
        otherFunc = data.func;
    if (otherFunc == null || otherFunc == func) {
      return data.name;
    }
  }
  return result;
}

/**
 * The base constructor for creating `lodash` wrapper objects.
 *
 * @private
 * @param {*} value The value to wrap.
 * @param {boolean} [chainAll] Enable explicit method chain sequences.
 */
function LodashWrapper(value, chainAll) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__chain__ = !!chainAll;
  this.__index__ = 0;
  this.__values__ = undefined;
}

LodashWrapper.prototype = baseCreate(baseLodash.prototype);
LodashWrapper.prototype.constructor = LodashWrapper;

/**
 * Creates a clone of `wrapper`.
 *
 * @private
 * @param {Object} wrapper The wrapper to clone.
 * @returns {Object} Returns the cloned wrapper.
 */
function wrapperClone(wrapper) {
  if (wrapper instanceof LazyWrapper) {
    return wrapper.clone();
  }
  var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
  result.__actions__ = copyArray(wrapper.__actions__);
  result.__index__  = wrapper.__index__;
  result.__values__ = wrapper.__values__;
  return result;
}

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Creates a `lodash` object which wraps `value` to enable implicit method
 * chain sequences. Methods that operate on and return arrays, collections,
 * and functions can be chained together. Methods that retrieve a single value
 * or may return a primitive value will automatically end the chain sequence
 * and return the unwrapped value. Otherwise, the value must be unwrapped
 * with `_#value`.
 *
 * Explicit chain sequences, which must be unwrapped with `_#value`, may be
 * enabled using `_.chain`.
 *
 * The execution of chained methods is lazy, that is, it's deferred until
 * `_#value` is implicitly or explicitly called.
 *
 * Lazy evaluation allows several methods to support shortcut fusion.
 * Shortcut fusion is an optimization to merge iteratee calls; this avoids
 * the creation of intermediate arrays and can greatly reduce the number of
 * iteratee executions. Sections of a chain sequence qualify for shortcut
 * fusion if the section is applied to an array and iteratees accept only
 * one argument. The heuristic for whether a section qualifies for shortcut
 * fusion is subject to change.
 *
 * Chaining is supported in custom builds as long as the `_#value` method is
 * directly or indirectly included in the build.
 *
 * In addition to lodash methods, wrappers have `Array` and `String` methods.
 *
 * The wrapper `Array` methods are:
 * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
 *
 * The wrapper `String` methods are:
 * `replace` and `split`
 *
 * The wrapper methods that support shortcut fusion are:
 * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
 * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
 * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
 *
 * The chainable wrapper methods are:
 * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
 * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
 * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
 * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
 * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
 * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
 * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
 * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
 * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
 * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
 * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
 * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
 * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
 * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
 * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
 * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
 * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
 * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
 * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
 * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
 * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
 * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
 * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
 * `zipObject`, `zipObjectDeep`, and `zipWith`
 *
 * The wrapper methods that are **not** chainable by default are:
 * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
 * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
 * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
 * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
 * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
 * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
 * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
 * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
 * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
 * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
 * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
 * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
 * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
 * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
 * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
 * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
 * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
 * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
 * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
 * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
 * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
 * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
 * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
 * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
 * `upperFirst`, `value`, and `words`
 *
 * @name _
 * @constructor
 * @category Seq
 * @param {*} value The value to wrap in a `lodash` instance.
 * @returns {Object} Returns the new `lodash` wrapper instance.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var wrapped = _([1, 2, 3]);
 *
 * // Returns an unwrapped value.
 * wrapped.reduce(_.add);
 * // => 6
 *
 * // Returns a wrapped value.
 * var squares = wrapped.map(square);
 *
 * _.isArray(squares);
 * // => false
 *
 * _.isArray(squares.value());
 * // => true
 */
function lodash$1(value) {
  if (isObjectLike(value) && !isArray$1(value) && !(value instanceof LazyWrapper)) {
    if (value instanceof LodashWrapper) {
      return value;
    }
    if (hasOwnProperty$3.call(value, '__wrapped__')) {
      return wrapperClone(value);
    }
  }
  return new LodashWrapper(value);
}

// Ensure wrappers are instances of `baseLodash`.
lodash$1.prototype = baseLodash.prototype;
lodash$1.prototype.constructor = lodash$1;

/**
 * Checks if `func` has a lazy counterpart.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
 *  else `false`.
 */
function isLaziable(func) {
  var funcName = getFuncName(func),
      other = lodash$1[funcName];

  if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
    return false;
  }
  if (func === other) {
    return true;
  }
  var data = getData(other);
  return !!data && func === data[0];
}

/**
 * Sets metadata for `func`.
 *
 * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
 * period of time, it will trip its breaker and transition to an identity
 * function to avoid garbage collection pauses in V8. See
 * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
 * for more details.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var setData = shortOut(baseSetData);

/** Used to match wrap detail comments. */
var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
    reSplitDetails = /,? & /;

/**
 * Extracts wrapper details from the `source` body comment.
 *
 * @private
 * @param {string} source The source to inspect.
 * @returns {Array} Returns the wrapper details.
 */
function getWrapDetails(source) {
  var match = source.match(reWrapDetails);
  return match ? match[1].split(reSplitDetails) : [];
}

/** Used to match wrap detail comments. */
var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;

/**
 * Inserts wrapper `details` in a comment at the top of the `source` body.
 *
 * @private
 * @param {string} source The source to modify.
 * @returns {Array} details The details to insert.
 * @returns {string} Returns the modified source.
 */
function insertWrapDetails(source, details) {
  var length = details.length;
  if (!length) {
    return source;
  }
  var lastIndex = length - 1;
  details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
  details = details.join(length > 2 ? ', ' : ' ');
  return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
}

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG$5 = 1,
    WRAP_BIND_KEY_FLAG$4 = 2,
    WRAP_CURRY_FLAG$5 = 8,
    WRAP_CURRY_RIGHT_FLAG$2 = 16,
    WRAP_PARTIAL_FLAG$2 = 32,
    WRAP_PARTIAL_RIGHT_FLAG$2 = 64,
    WRAP_ARY_FLAG$2 = 128,
    WRAP_REARG_FLAG$1 = 256,
    WRAP_FLIP_FLAG$1 = 512;

/** Used to associate wrap methods with their bit flags. */
var wrapFlags = [
  ['ary', WRAP_ARY_FLAG$2],
  ['bind', WRAP_BIND_FLAG$5],
  ['bindKey', WRAP_BIND_KEY_FLAG$4],
  ['curry', WRAP_CURRY_FLAG$5],
  ['curryRight', WRAP_CURRY_RIGHT_FLAG$2],
  ['flip', WRAP_FLIP_FLAG$1],
  ['partial', WRAP_PARTIAL_FLAG$2],
  ['partialRight', WRAP_PARTIAL_RIGHT_FLAG$2],
  ['rearg', WRAP_REARG_FLAG$1]
];

/**
 * Updates wrapper `details` based on `bitmask` flags.
 *
 * @private
 * @returns {Array} details The details to modify.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Array} Returns `details`.
 */
function updateWrapDetails(details, bitmask) {
  arrayEach(wrapFlags, function(pair) {
    var value = '_.' + pair[0];
    if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
      details.push(value);
    }
  });
  return details.sort();
}

/**
 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
 * with wrapper details in a comment at the top of the source body.
 *
 * @private
 * @param {Function} wrapper The function to modify.
 * @param {Function} reference The reference function.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Function} Returns `wrapper`.
 */
function setWrapToString(wrapper, reference, bitmask) {
  var source = (reference + '');
  return setToString$1(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
}

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG$4 = 1,
    WRAP_BIND_KEY_FLAG$3 = 2,
    WRAP_CURRY_BOUND_FLAG$1 = 4,
    WRAP_CURRY_FLAG$4 = 8,
    WRAP_PARTIAL_FLAG$1 = 32,
    WRAP_PARTIAL_RIGHT_FLAG$1 = 64;

/**
 * Creates a function that wraps `func` to continue currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {Function} wrapFunc The function to create the `func` wrapper.
 * @param {*} placeholder The placeholder value.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
  var isCurry = bitmask & WRAP_CURRY_FLAG$4,
      newHolders = isCurry ? holders : undefined,
      newHoldersRight = isCurry ? undefined : holders,
      newPartials = isCurry ? partials : undefined,
      newPartialsRight = isCurry ? undefined : partials;

  bitmask |= (isCurry ? WRAP_PARTIAL_FLAG$1 : WRAP_PARTIAL_RIGHT_FLAG$1);
  bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG$1 : WRAP_PARTIAL_FLAG$1);

  if (!(bitmask & WRAP_CURRY_BOUND_FLAG$1)) {
    bitmask &= ~(WRAP_BIND_FLAG$4 | WRAP_BIND_KEY_FLAG$3);
  }
  var newData = [
    func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
    newHoldersRight, argPos, ary, arity
  ];

  var result = wrapFunc.apply(undefined, newData);
  if (isLaziable(func)) {
    setData(result, newData);
  }
  result.placeholder = placeholder;
  return setWrapToString(result, func, bitmask);
}

/**
 * Gets the argument placeholder value for `func`.
 *
 * @private
 * @param {Function} func The function to inspect.
 * @returns {*} Returns the placeholder value.
 */
function getHolder(func) {
  var object = func;
  return object.placeholder;
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin$1 = Math.min;

/**
 * Reorder `array` according to the specified indexes where the element at
 * the first index is assigned as the first element, the element at
 * the second index is assigned as the second element, and so on.
 *
 * @private
 * @param {Array} array The array to reorder.
 * @param {Array} indexes The arranged array indexes.
 * @returns {Array} Returns `array`.
 */
function reorder(array, indexes) {
  var arrLength = array.length,
      length = nativeMin$1(indexes.length, arrLength),
      oldArray = copyArray(array);

  while (length--) {
    var index = indexes[length];
    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
  }
  return array;
}

/** Used as the internal argument placeholder. */
var PLACEHOLDER$1 = '__lodash_placeholder__';

/**
 * Replaces all `placeholder` elements in `array` with an internal placeholder
 * and returns an array of their indexes.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {*} placeholder The placeholder to replace.
 * @returns {Array} Returns the new array of placeholder indexes.
 */
function replaceHolders(array, placeholder) {
  var index = -1,
      length = array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value === placeholder || value === PLACEHOLDER$1) {
      array[index] = PLACEHOLDER$1;
      result[resIndex++] = index;
    }
  }
  return result;
}

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG$3 = 1,
    WRAP_BIND_KEY_FLAG$2 = 2,
    WRAP_CURRY_FLAG$3 = 8,
    WRAP_CURRY_RIGHT_FLAG$1 = 16,
    WRAP_ARY_FLAG$1 = 128,
    WRAP_FLIP_FLAG = 512;

/**
 * Creates a function that wraps `func` to invoke it with optional `this`
 * binding of `thisArg`, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [partialsRight] The arguments to append to those provided
 *  to the new function.
 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
  var isAry = bitmask & WRAP_ARY_FLAG$1,
      isBind = bitmask & WRAP_BIND_FLAG$3,
      isBindKey = bitmask & WRAP_BIND_KEY_FLAG$2,
      isCurried = bitmask & (WRAP_CURRY_FLAG$3 | WRAP_CURRY_RIGHT_FLAG$1),
      isFlip = bitmask & WRAP_FLIP_FLAG,
      Ctor = isBindKey ? undefined : createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length;

    while (index--) {
      args[index] = arguments[index];
    }
    if (isCurried) {
      var placeholder = getHolder(wrapper),
          holdersCount = countHolders(args, placeholder);
    }
    if (partials) {
      args = composeArgs(args, partials, holders, isCurried);
    }
    if (partialsRight) {
      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
    }
    length -= holdersCount;
    if (isCurried && length < arity) {
      var newHolders = replaceHolders(args, placeholder);
      return createRecurry(
        func, bitmask, createHybrid, wrapper.placeholder, thisArg,
        args, newHolders, argPos, ary, arity - length
      );
    }
    var thisBinding = isBind ? thisArg : this,
        fn = isBindKey ? thisBinding[func] : func;

    length = args.length;
    if (argPos) {
      args = reorder(args, argPos);
    } else if (isFlip && length > 1) {
      args.reverse();
    }
    if (isAry && ary < length) {
      args.length = ary;
    }
    if (this && this !== root && this instanceof wrapper) {
      fn = Ctor || createCtor(fn);
    }
    return fn.apply(thisBinding, args);
  }
  return wrapper;
}

/**
 * Creates a function that wraps `func` to enable currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {number} arity The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createCurry(func, bitmask, arity) {
  var Ctor = createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length,
        placeholder = getHolder(wrapper);

    while (index--) {
      args[index] = arguments[index];
    }
    var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
      ? []
      : replaceHolders(args, placeholder);

    length -= holders.length;
    if (length < arity) {
      return createRecurry(
        func, bitmask, createHybrid, wrapper.placeholder, undefined,
        args, holders, undefined, undefined, arity - length);
    }
    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return apply(fn, this, args);
  }
  return wrapper;
}

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG$2 = 1;

/**
 * Creates a function that wraps `func` to invoke it with the `this` binding
 * of `thisArg` and `partials` prepended to the arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to
 *  the new function.
 * @returns {Function} Returns the new wrapped function.
 */
function createPartial(func, bitmask, thisArg, partials) {
  var isBind = bitmask & WRAP_BIND_FLAG$2,
      Ctor = createCtor(func);

  function wrapper() {
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(leftLength + argsLength),
        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return apply(fn, isBind ? thisArg : this, args);
  }
  return wrapper;
}

/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG$1 = 1,
    WRAP_BIND_KEY_FLAG$1 = 2,
    WRAP_CURRY_BOUND_FLAG = 4,
    WRAP_CURRY_FLAG$2 = 8,
    WRAP_ARY_FLAG = 128,
    WRAP_REARG_FLAG = 256;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Merges the function metadata of `source` into `data`.
 *
 * Merging metadata reduces the number of wrappers used to invoke a function.
 * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
 * may be applied regardless of execution order. Methods like `_.ary` and
 * `_.rearg` modify function arguments, making the order in which they are
 * executed important, preventing the merging of metadata. However, we make
 * an exception for a safe combined case where curried functions have `_.ary`
 * and or `_.rearg` applied.
 *
 * @private
 * @param {Array} data The destination metadata.
 * @param {Array} source The source metadata.
 * @returns {Array} Returns `data`.
 */
function mergeData(data, source) {
  var bitmask = data[1],
      srcBitmask = source[1],
      newBitmask = bitmask | srcBitmask,
      isCommon = newBitmask < (WRAP_BIND_FLAG$1 | WRAP_BIND_KEY_FLAG$1 | WRAP_ARY_FLAG);

  var isCombo =
    ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG$2)) ||
    ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
    ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG$2));

  // Exit early if metadata can't be merged.
  if (!(isCommon || isCombo)) {
    return data;
  }
  // Use source `thisArg` if available.
  if (srcBitmask & WRAP_BIND_FLAG$1) {
    data[2] = source[2];
    // Set when currying a bound function.
    newBitmask |= bitmask & WRAP_BIND_FLAG$1 ? 0 : WRAP_CURRY_BOUND_FLAG;
  }
  // Compose partial arguments.
  var value = source[3];
  if (value) {
    var partials = data[3];
    data[3] = partials ? composeArgs(partials, value, source[4]) : value;
    data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
  }
  // Compose partial right arguments.
  value = source[5];
  if (value) {
    partials = data[5];
    data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
    data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
  }
  // Use source `argPos` if available.
  value = source[7];
  if (value) {
    data[7] = value;
  }
  // Use source `ary` if it's smaller.
  if (srcBitmask & WRAP_ARY_FLAG) {
    data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
  }
  // Use source `arity` if one is not provided.
  if (data[9] == null) {
    data[9] = source[9];
  }
  // Use source `func` and merge bitmasks.
  data[0] = source[0];
  data[1] = newBitmask;

  return data;
}

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

/** `Object#toString` result references. */
var symbolTag$1 = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag$1);
}

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/** Used as references for various `Number` constants. */
var INFINITY$2 = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY$2 || value === -INFINITY$2) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/** Error message constants. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_FLAG$1 = 8,
    WRAP_CURRY_RIGHT_FLAG = 16,
    WRAP_PARTIAL_FLAG = 32,
    WRAP_PARTIAL_RIGHT_FLAG = 64;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that either curries or invokes `func` with optional
 * `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags.
 *    1 - `_.bind`
 *    2 - `_.bindKey`
 *    4 - `_.curry` or `_.curryRight` of a bound function
 *    8 - `_.curry`
 *   16 - `_.curryRight`
 *   32 - `_.partial`
 *   64 - `_.partialRight`
 *  128 - `_.rearg`
 *  256 - `_.ary`
 *  512 - `_.flip`
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to be partially applied.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
  if (!isBindKey && typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  var length = partials ? partials.length : 0;
  if (!length) {
    bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
    partials = holders = undefined;
  }
  ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
  arity = arity === undefined ? arity : toInteger(arity);
  length -= holders ? holders.length : 0;

  if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
    var partialsRight = partials,
        holdersRight = holders;

    partials = holders = undefined;
  }
  var data = isBindKey ? undefined : getData(func);

  var newData = [
    func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
    argPos, ary, arity
  ];

  if (data) {
    mergeData(newData, data);
  }
  func = newData[0];
  bitmask = newData[1];
  thisArg = newData[2];
  partials = newData[3];
  holders = newData[4];
  arity = newData[9] = newData[9] === undefined
    ? (isBindKey ? 0 : func.length)
    : nativeMax(newData[9] - length, 0);

  if (!arity && bitmask & (WRAP_CURRY_FLAG$1 | WRAP_CURRY_RIGHT_FLAG)) {
    bitmask &= ~(WRAP_CURRY_FLAG$1 | WRAP_CURRY_RIGHT_FLAG);
  }
  if (!bitmask || bitmask == WRAP_BIND_FLAG) {
    var result = createBind(func, bitmask, thisArg);
  } else if (bitmask == WRAP_CURRY_FLAG$1 || bitmask == WRAP_CURRY_RIGHT_FLAG) {
    result = createCurry(func, bitmask, arity);
  } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
    result = createPartial(func, bitmask, thisArg, partials);
  } else {
    result = createHybrid.apply(undefined, newData);
  }
  var setter = data ? baseSetData : setData;
  return setWrapToString(setter(result, newData), func, bitmask);
}

/** Used to compose bitmasks for function metadata. */
var WRAP_CURRY_FLAG = 8;

/**
 * Creates a function that accepts arguments of `func` and either invokes
 * `func` returning its result, if at least `arity` number of arguments have
 * been provided, or returns a function that accepts the remaining `func`
 * arguments, and so on. The arity of `func` may be specified if `func.length`
 * is not sufficient.
 *
 * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
 * may be used as a placeholder for provided arguments.
 *
 * **Note:** This method doesn't set the "length" property of curried functions.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Function
 * @param {Function} func The function to curry.
 * @param {number} [arity=func.length] The arity of `func`.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Function} Returns the new curried function.
 * @example
 *
 * var abc = function(a, b, c) {
 *   return [a, b, c];
 * };
 *
 * var curried = _.curry(abc);
 *
 * curried(1)(2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2, 3);
 * // => [1, 2, 3]
 *
 * // Curried with placeholders.
 * curried(1)(_, 3)(2);
 * // => [1, 2, 3]
 */
function curry(func, arity, guard) {
  arity = guard ? undefined : arity;
  var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
  result.placeholder = curry.placeholder;
  return result;
}

// Assign default placeholders.
curry.placeholder = {};

var curry$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': curry
});

var require$$5 = /*@__PURE__*/getAugmentedNamespace(curry$1);

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/** Built-in value references. */
var spreadableSymbol = Symbol$1 ? Symbol$1.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray$1(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$5 = 1,
    COMPARE_UNORDERED_FLAG$3 = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Check that cyclic values are equal.
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG$3) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$4 = 1,
    COMPARE_UNORDERED_FLAG$2 = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag$1 = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag$1 = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag$1:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag$1:
      var convert = mapToArray;

    case setTag$1:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$2;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$2.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike$1(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$3 = 1;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) {
      return false;
    }
  }
  // Check that cyclic values are equal.
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

/* Built-in method references that are verified to be native. */
var Promise$1 = getNative(root, 'Promise');

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map$1),
    promiseCtorString = toSource(Promise$1),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map$1 && getTag(new Map$1) != mapTag) ||
    (Promise$1 && getTag(Promise$1.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

var getTag$1 = getTag;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$2 = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray$1(object),
      othIsArr = isArray$1(other),
      objTag = objIsArr ? arrayTag : getTag$1(object),
      othTag = othIsArr ? arrayTag : getTag$1(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$1 = 1,
    COMPARE_UNORDERED_FLAG$1 = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray$1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray$1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray$1(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray$1(object) || isArguments(object));
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray$1(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike$1(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike$1(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

/**
 * Creates an array of values by running each element in `collection` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * _.map([4, 8], square);
 * // => [16, 64]
 *
 * _.map({ 'a': 4, 'b': 8 }, square);
 * // => [16, 64] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // The `_.property` iteratee shorthand.
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map(collection, iteratee) {
  var func = isArray$1(collection) ? arrayMap : baseMap;
  return func(collection, baseIteratee(iteratee));
}

/**
 * Creates a flattened array of values by running each element in `collection`
 * thru `iteratee` and flattening the mapped results. The iteratee is invoked
 * with three arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * function duplicate(n) {
 *   return [n, n];
 * }
 *
 * _.flatMap([1, 2], duplicate);
 * // => [1, 1, 2, 2]
 */
function flatMap(collection, iteratee) {
  return baseFlatten(map(collection, iteratee), 1);
}

var flatMap$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': flatMap
});

var require$$6 = /*@__PURE__*/getAugmentedNamespace(flatMap$1);

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

var isEqual$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': isEqual
});

var require$$7 = /*@__PURE__*/getAugmentedNamespace(isEqual$1);

// group all the lodash import export in one place
Object.defineProperty(lodash$2, "__esModule", { value: true });
lodash$2.isEqual = lodash$2.flatMap = lodash$2.curry = lodash$2.merge = lodash$2.isPlainObject = lodash$2.isString = lodash$2.isNaN = void 0;
const tslib_1$6 = require$$0;
const isNaN_1 = tslib_1$6.__importDefault(require$$1$1);
lodash$2.isNaN = isNaN_1.default;
const isString_1 = tslib_1$6.__importDefault(require$$2);
lodash$2.isString = isString_1.default;
const isPlainObject_1 = tslib_1$6.__importDefault(require$$3);
lodash$2.isPlainObject = isPlainObject_1.default;
const merge_1 = tslib_1$6.__importDefault(require$$4);
lodash$2.merge = merge_1.default;
// import mapValues from 'lodash-es/mapValues'
// import mapKeys from 'lodash-es/mapKeys'
// import omitBy from 'lodash-es/omitBy'
/// import isEqual from 'lodash-es/isEqual'
// import findKey from 'lodash-es/findKey'
const curry_1 = tslib_1$6.__importDefault(require$$5);
lodash$2.curry = curry_1.default;
const flatMap_1 = tslib_1$6.__importDefault(require$$6);
lodash$2.flatMap = flatMap_1.default;
const isEqual_1 = tslib_1$6.__importDefault(require$$7);
lodash$2.isEqual = isEqual_1.default;

Object.defineProperty(common$2, "__esModule", { value: true });
common$2.formatStr = common$2.showDeep = common$2.nil = common$2.createEvtName = common$2.parseJson = common$2.toArray = common$2.inArray = void 0;
// bunch of generic helpers
// import isArray from 'lodash-es/isArray'
const lodash_1$4 = lodash$2;
/**
 * DIY in Array
 */
const inArray = (arr, value) => !!arr.filter(a => a === value).length;
common$2.inArray = inArray;
// quick and dirty to turn non array to array
const toArray = (arg) => Array.isArray(arg) ? arg : [arg];
common$2.toArray = toArray;
/**
 * parse string to json or just return the original value if error happened
 */
const parseJson = (n, t = true) => {
    try {
        return (0, lodash_1$4.isString)(n) ?
            JSON.parse(n) :
            JSON.parse(JSON.stringify(n));
    }
    catch (e) {
        if (t) {
            return n;
        }
        throw e; // just rethrow it
    }
};
common$2.parseJson = parseJson;
/**
 * create an event name
 */
const createEvtName = (...args) => args.join('_');
common$2.createEvtName = createEvtName;
/**
 * generic placeholder function
 */
const nil = () => false;
common$2.nil = nil;
/** handy method to show deep json structure */
const showDeep = (code) => {
    console.dir(code, { depth: null });
};
common$2.showDeep = showDeep;
/** from https://www.tutorialstonight.com/javascript-string-format.php
  change to a normal function
*/
function formatStr(str, ...args) {
    return str.replace(/{([0-9]+)}/g, (match, index) => (typeof args[index] === 'undefined' ? match : args[index]));
}
common$2.formatStr = formatStr;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.readOnly = exports.objectHasKey = exports.arrToObj = exports.assign = exports.getConfigValue = void 0;
	// bunch of object related methods
	const common_1 = common$2;
	const lodash_1 = lodash$2;
	/**
	 * simple util method to get the value from the config object
	 */
	const getConfigValue = (name, obj) => (obj && (0, lodash_1.isPlainObject)(obj) ? ((name in obj) ? obj[name] : undefined) : undefined);
	exports.getConfigValue = getConfigValue;
	/**
	 * Shorthand method for Object.assign
	 */
	const assign = (...args) => Reflect.apply(Object.assign, Object, args);
	exports.assign = assign;
	/**
	Array to object
	*/
	const arrToObj = (args, processor, initValue = {}) => args.map(processor).reduce((a, b) => (0, exports.assign)(a, b), initValue);
	exports.arrToObj = arrToObj;
	/**
	 * check if the key existing in an object
	 */
	const objectHasKey = (obj, key) => {
	    try {
	        const keys = Object.keys(obj);
	        return (0, common_1.inArray)(keys, key);
	    }
	    catch (e) {
	        // @_BUG when the obj is not an OBJECT we got some weird output
	        return false;
	    }
	};
	exports.objectHasKey = objectHasKey;
	/**
	 * Shorthand method to turn config into immutatble (readonly)
	 * was call freeze
	 */
	const readOnly = (config) => Object.freeze(config);
	exports.readOnly = readOnly;
} (object$1));

var validatorsClient = {};

var validators = {};

var validatorFactory = {};

var validatorBase = {};

var validationError = {};

var hasRequiredValidationError;

function requireValidationError () {
	if (hasRequiredValidationError) return validationError;
	hasRequiredValidationError = 1;
	// custom validation error class
	// when validaton failed
	// should there also be a errors result somewhere
	Object.defineProperty(validationError, "__esModule", { value: true });
	class ValidationError extends Error {
	    constructor(...args) {
	        super(...args);
	        this.message = args[0];
	        this.detail = args[1];
	        this.className = ValidationError.name;
	        if (Error.captureStackTrace) {
	            Error.captureStackTrace(this, ValidationError);
	        }
	    }
	}
	validationError.default = ValidationError;
	return validationError;
}

var generalException = {};

var hasRequiredGeneralException;

function requireGeneralException () {
	if (hasRequiredGeneralException) return generalException;
	hasRequiredGeneralException = 1;
	// this is a new Error class that is not part of the Jsonql
	// but we will use it in other external modules
	Object.defineProperty(generalException, "__esModule", { value: true });
	class GeneralException extends Error {
	    constructor(...args) {
	        super(...args);
	        this.message = args[0];
	        this.detail = args[1];
	        this.className = GeneralException.name;
	        if (Error.captureStackTrace) {
	            Error.captureStackTrace(this, GeneralException);
	        }
	    }
	}
	generalException.default = GeneralException;
	return generalException;
}

var empty = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isEmpty = exports.notEmpty = exports.isNotEmpty = exports.isEmptyObj = void 0;
	// a bunch of check if something is empty that was in the common.ts
	// check if an obj is empty, ported from Velocejs
	const lodash_1 = lodash$2;
	const isEmptyObj = (obj) => (obj && obj.constructor === Object && Object.keys(obj).length === 0);
	exports.isEmptyObj = isEmptyObj;
	/**
	 * Check several parameter that there is something in the param
	 */
	const isNotEmpty = (param) => (param !== undefined &&
	    // param !== false &&
	    param !== null &&
	    (param + '').trim() !== '');
	exports.isNotEmpty = isNotEmpty;
	/**
	 * Check several parameter that there is something in the param
	 this is problematic should rename to isNotEmptyParam
	 and we should check if its array is it empty array
	 if it's object then if its empty object
	 */
	function notEmpty(a, valueCheck = false) {
	    if (Array.isArray(a)) {
	        // @NOTE we now check if its an empty array as well
	        return valueCheck ? !!a.length : false;
	    }
	    if ((0, lodash_1.isPlainObject)(a)) {
	        return valueCheck ? !(0, exports.isEmptyObj)(a) : false;
	    }
	    return (0, exports.isNotEmpty)(a);
	}
	exports.notEmpty = notEmpty;
	/** just not to make my head hurt */
	const isEmpty = (value, valueCheck) => !notEmpty(value, valueCheck);
	exports.isEmpty = isEmpty;
} (empty));

var isFunction = {};

var hasRequiredIsFunction;

function requireIsFunction () {
	if (hasRequiredIsFunction) return isFunction;
	hasRequiredIsFunction = 1;
	Object.defineProperty(isFunction, "__esModule", { value: true });
	isFunction.isFunction = void 0;
	/**
	 * Simple check if the prop is function
	 * We found situtation where it report as an object but debug output show as [Function]
	 */
	const isFunction$1 = function (prop, debug = false) {
	    if (typeof prop === 'function') {
	        return true;
	    }
	    if (debug) {
	        console.error(`Expect to be Function type! Got ${typeof prop}`);
	    }
	    return false;
	};
	isFunction.isFunction = isFunction$1;
	return isFunction;
}

var chainPromises = {};

var hasRequiredChainPromises;

function requireChainPromises () {
	if (hasRequiredChainPromises) return chainPromises;
	hasRequiredChainPromises = 1;
	Object.defineProperty(chainPromises, "__esModule", { value: true });
	chainPromises.queuePromisesProcess = chainPromises.chainProcessPromises = chainPromises.chainPromises = void 0;
	// break it out on its own because
	// it's building from the lodash-es from scratch
	// according to this discussion https://github.com/lodash/lodash/issues/3298
	const lodash_1 = lodash$2;
	/**
	 * previously we already make sure the order of the namespaces
	 * and attach the auth client to it
	 */
	function chainPromises$1(promises, asObject = false) {
	    return promises.reduce((promiseChain, currentTask) => (promiseChain.then(chainResults => (currentTask.then(currentResult => (asObject === false ?
	        [...chainResults, currentResult] :
	        (0, lodash_1.merge)(chainResults, currentResult)))))), Promise.resolve(asObject === false ? [] : ((0, lodash_1.isPlainObject)(asObject) ? asObject : {})));
	}
	chainPromises.chainPromises = chainPromises$1;
	/**
	 * This one return a different result from the chainPromises
	 * it will be the same like chainFns that take one promise resolve as the next fn parameter
	 */
	function chainProcessPromises(initPromise, ...promises) {
	    return (...args) => (promises.reduce((promiseChain, currentTask) => (promiseChain.then((chainResult) => (currentTask(chainResult)))), Reflect.apply(initPromise, null, args)));
	}
	chainPromises.chainProcessPromises = chainProcessPromises;
	/**
	 * This is a combine method to run the above chain process
	 * cos sometime we don't want to have the process separate (see validator)
	 */
	function queuePromisesProcess(queue, ...initValue) {
	    // we need to make sure the Array is actually flat array
	    const q = (0, lodash_1.flatMap)(queue);
	    const ex = Reflect.apply(chainProcessPromises, null, q);
	    return Reflect.apply(ex, null, initValue);
	}
	chainPromises.queuePromisesProcess = queuePromisesProcess;
	return chainPromises;
}

var string = {};

var lodash = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.isPlainObject = exports.isString = exports.isNaN = void 0;
	// group all the lodash code in one place
	var lodash_1 = lodash$2;
	Object.defineProperty(exports, "isNaN", { enumerable: true, get: function () { return lodash_1.isNaN; } });
	Object.defineProperty(exports, "isString", { enumerable: true, get: function () { return lodash_1.isString; } });
	Object.defineProperty(exports, "isPlainObject", { enumerable: true, get: function () { return lodash_1.isPlainObject; } });
} (lodash));

// validate string type
Object.defineProperty(string, "__esModule", { value: true });
var checkString_1 = string.checkString = void 0;
const lodash_1$3 = lodash;
/**
 * double check if its string
 */
function checkString(value) {
    return ((value + '').trim() !== '') ? (0, lodash_1$3.isString)(value) : false;
}
checkString_1 = string.checkString = checkString;

var boolean = {};

// check for boolean
Object.defineProperty(boolean, "__esModule", { value: true });
var checkBoolean_1 = boolean.checkBoolean = void 0;
/**
 * if something is a boolean
 */
function checkBoolean(value) {
    return value !== null && value !== undefined && typeof value === 'boolean';
}
checkBoolean_1 = boolean.checkBoolean = checkBoolean;

var number = {};

Object.defineProperty(number, "__esModule", { value: true });
var checkUnsigned_1 = number.checkUnsigned = checkFloat_1 = number.checkFloat = checkInteger_1 = number.checkInteger = checkNumber_1 = number.checkNumber = void 0;
// validator numbers
// import { NUMBER_TYPES } from './constants';
const lodash_1$2 = lodash;
/**
 * @2015-05-04 found a problem if the value is a number like string
 * it will pass, so add a check if it's string before we pass to next
 */
function checkNumber(value) {
    return (0, lodash_1$2.isString)(value) ? false : !(0, lodash_1$2.isNaN)(parseFloat(value + ''));
}
var checkNumber_1 = number.checkNumber = checkNumber;
// Add more number type / value checking
function checkInteger(value) {
    console.log(`@TODO checkInteger`, value);
}
var checkInteger_1 = number.checkInteger = checkInteger;
function checkFloat(value) {
    console.log(`@TODO checkFloat`, value);
}
var checkFloat_1 = number.checkFloat = checkFloat;
function checkUnsigned(value) {
    console.log(`@TODO check unsigned`, value);
}
checkUnsigned_1 = number.checkUnsigned = checkUnsigned;

var any = {};

Object.defineProperty(any, "__esModule", { value: true });
var checkAny_1 = any.checkAny = void 0;
/** validate any thing only check if there is something */
function checkAny(value, checkNull = true) {
    if (value !== undefined && value !== '' && (value + '').trim() !== '') {
        if (checkNull === false || (checkNull === true && value !== null)) {
            return true;
        }
    }
    return false;
}
checkAny_1 = any.checkAny = checkAny;

var array = {};

var combine = {};

var constants$2 = {};

var hasRequiredConstants$1;

function requireConstants$1 () {
	if (hasRequiredConstants$1) return constants$2;
	hasRequiredConstants$1 = 1;
	(function (exports) {
		// ported from @jsonql/constants
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.KEYWORDS = exports.MAIN_NOT_FOUND_ERR = exports.ARG_NOT_MATCH_ERR = exports.RESERVED_WORD_ERR = exports.VALUE_KEY = exports.IDX_KEY = exports.PARAMS_KEY = exports.NAME_KEY = exports.RULES_KEY = exports.PATTERN_KEY = exports.PLUGIN_FN_KEY = exports.PLUGIN_KEY = exports.VALIDATE_ASYNC_KEY = exports.VALIDATE_KEY = exports.ARRAY_TYPE_RGT = exports.ARRAY_TYPE_LFT = exports.ARRAY_TS_TYPE_LFT = exports.OBJECT_TYPE = exports.ARRAY_TYPE = exports.NUMBER_TYPE = exports.STRING_TYPE = exports.BOOLEAN_TYPE = exports.OR_SEPERATOR = void 0;
		exports.OR_SEPERATOR = '|';
		exports.BOOLEAN_TYPE = 'boolean';
		exports.STRING_TYPE = 'string';
		exports.NUMBER_TYPE = 'number';
		exports.ARRAY_TYPE = 'array';
		exports.OBJECT_TYPE = 'object';
		// Legacy
		exports.ARRAY_TS_TYPE_LFT = 'Array<';
		exports.ARRAY_TYPE_LFT = 'array.<';
		exports.ARRAY_TYPE_RGT = '>';
		// local
		exports.VALIDATE_KEY = 'validate';
		exports.VALIDATE_ASYNC_KEY = 'validateAsync';
		exports.PLUGIN_KEY = 'plugin';
		exports.PLUGIN_FN_KEY = 'main';
		exports.PATTERN_KEY = 'pattern';
		exports.RULES_KEY = 'rules';
		exports.NAME_KEY = 'name';
		exports.PARAMS_KEY = 'params';
		exports.IDX_KEY = '$$idx';
		exports.VALUE_KEY = '$$value';
		exports.RESERVED_WORD_ERR = 'Your plugin config argument contains reserved keywords';
		exports.ARG_NOT_MATCH_ERR = "Your params doesn't matching your main argument list";
		exports.MAIN_NOT_FOUND_ERR = "Can not find 'main' method in your plugin config";
		exports.KEYWORDS = [
		    exports.PARAMS_KEY,
		    exports.PATTERN_KEY,
		    exports.VALIDATE_KEY,
		    exports.VALIDATE_ASYNC_KEY,
		    exports.PLUGIN_KEY,
		    exports.RULES_KEY,
		    'name',
		    'type',
		    'types',
		    'server',
		    'tstype',
		    'value',
		    'optional',
		    'tmp',
		    'pos',
		    'lastResult',
		];
} (constants$2));
	return constants$2;
}

Object.defineProperty(combine, "__esModule", { value: true });
var combineCheck_1 = combine.combineCheck = void 0;
// primitive types
const number_1 = number;
const string_1 = string;
const boolean_1 = boolean;
const any_1 = any;
const constants_1$7 = requireConstants$1();
/**
 * this is a wrapper method to call different one based on their type
 */
function combineCheck(type) {
    switch (type) {
        case constants_1$7.NUMBER_TYPE:
            return number_1.checkNumber;
        case constants_1$7.STRING_TYPE:
            return string_1.checkString;
        case constants_1$7.BOOLEAN_TYPE:
            return boolean_1.checkBoolean;
        default:
            return any_1.checkAny;
    }
}
combineCheck_1 = combine.combineCheck = combineCheck;

Object.defineProperty(array, "__esModule", { value: true });
var arrayTypeHandler_1 = array.arrayTypeHandler = isArrayLike_1 = array.isArrayLike = checkArray_1 = array.checkArray = void 0;
// validate array type
const lodash_1$1 = lodash;
const combine_1$2 = combine;
const constants_1$6 = requireConstants$1();
const STYLES = {
    ts: constants_1$6.ARRAY_TS_TYPE_LFT,
    jsdoc: constants_1$6.ARRAY_TYPE_LFT
};
/**
 * check if its array or array like
 * why the type is a not a boolean?
 */
function checkArray(value, type // @TODO more combination
) {
    if (Array.isArray(value)) {
        if (!type) {
            return true;
        }
        // we test it in reverse
        // @TODO if the type is an array (OR) then what?
        // we need to take into account this could be an array
        let c;
        if (Array.isArray(type)) { // Union type
            c = value.filter((v) => {
                // only need one is correct
                const ctn = type.length;
                for (let i = 0; i < ctn; ++i) {
                    const t = type[i];
                    if ((t === constants_1$6.ARRAY_TYPE && Array.isArray(v)) ||
                        (t === constants_1$6.OBJECT_TYPE && (0, lodash_1$1.isPlainObject)(v)) ||
                        (0, combine_1$2.combineCheck)(t)(v)) {
                        return false;
                    }
                }
                return true;
            });
        }
        else {
            c = value.filter(v => !(0, combine_1$2.combineCheck)(type)(v));
        }
        return !(c.length > 0);
    }
    return false;
}
var checkArray_1 = array.checkArray = checkArray;
/** Take the string type like array.<T> or Array<T> apart */
function destructArrayStr(type, syntax = 'ts') {
    const left = STYLES[syntax];
    if (!left) {
        throw new Error(`Syntax not supported! ${Object.keys(STYLES)}`);
    }
    if (type.indexOf(left) > -1 && type.indexOf(constants_1$6.ARRAY_TYPE_RGT) > -1) {
        const _type = type.replace(left, '').replace(constants_1$6.ARRAY_TYPE_RGT, '');
        if (_type.indexOf(constants_1$6.OR_SEPERATOR)) {
            // return as array
            return _type.split(constants_1$6.OR_SEPERATOR);
        }
        // return as array
        return [_type];
    }
    return false;
}
/**
 * check if it matches the array.<T> pattern
 * This method will be deprecated soon - we are not using the jsdoc to get the type any more
 * @TODO 2022-04-23 Instead of deprecated this we need to expand this method to use the swc generated map
 * also make it compatible between the array.<T> and the array<T> style (jsdoc or ts)
 */
function isArrayLike(type) {
    // debugFn(type)
    // check ts first
    const check1 = destructArrayStr(type);
    if (!check1) {
        return destructArrayStr(type, 'jsdoc');
    }
    /**
    Todo read the swc generate map here
  
    **/
    return false;
}
var isArrayLike_1 = array.isArrayLike = isArrayLike;
/**
 * we might encounter something like array.<T> then we need to take it apart
 @TODO_deprecated This method is no longer needed here
 */
function arrayTypeHandler(p, type) {
    const { arg } = p;
    // need a special case to handle the OR type
    // we need to test the args instead of the type(s)
    if (type.length > 1) {
        return !arg.filter((v) => (!(type.length > type.filter((t) => !(0, combine_1$2.combineCheck)(t)(v)).length))).length;
    }
    // type is array so this will be or!
    return type.length > type.filter((t) => !checkArray(arg, t)).length;
}
arrayTypeHandler_1 = array.arrayTypeHandler = arrayTypeHandler;

var object = {};

Object.defineProperty(object, "__esModule", { value: true });
var isEmptyObject_1 = object.isEmptyObject = objectTypeHandler_1 = object.objectTypeHandler = checkObject_1 = object.checkObject = void 0;
// validate object type
const lodash_1 = lodash;
// import filter from 'lodash-es/filter'
const combine_1$1 = combine;
const array_1$1 = array;
/**
 * check if the input is object also able to check if key(s) existed in that object
 @TODO need to rethink about how this checkObject keys should be
 */
function checkObject(value, keys) {
    if ((0, lodash_1.isPlainObject)(value)) {
        if (!keys) {
            return true;
        }
        // bs about ts
        if (typeof keys === 'string') {
            return keys in value;
        }
        // @TODO we might have to break it up into a different method
        else if ((0, array_1$1.checkArray)(keys)) {
            if (typeof keys[0] === 'string') {
                return checkIfKeysInObj(value, keys);
            }
            return checkIfNameTypeInObj(value, keys);
        }
    }
    return false;
}
var checkObject_1 = object.checkObject = checkObject;
/** check if the keys existed in the object */
function checkIfKeysInObj(value, keys) {
    return !keys.filter((key) => {
        return !(key in value);
    }).length;
}
/** check if JsonqlCheckObjectKeys is in the object */
function checkIfNameTypeInObj(value, keys) {
    // please note we DON'T care if some is optional
    // please refer to the contract.json for the keys
    return !keys.filter((key) => {
        const _value = value[key.name];
        return !(key.type.length > key.type.filter((type) => {
            let tmp;
            if (_value !== undefined) {
                if ((tmp = (0, array_1$1.isArrayLike)(type)) !== false) {
                    return !(0, array_1$1.arrayTypeHandler)({ arg: _value }, tmp);
                    // return tmp.filter(t => !checkArray(_value, t)).length;
                    // @TODO there might be an object within an object with keys as well :S
                }
                return !(0, combine_1$1.combineCheck)(type)(_value);
            }
            return true;
        }).length);
    }).length;
}
/**
 * fold this into it's own function to handler different object type
 */
const objectTypeHandler = function (p) {
    const { arg, param } = p;
    const _args = [arg];
    if (Array.isArray(param.keys) && param.keys.length) {
        _args.push(param.keys);
    }
    // just simple check
    return Reflect.apply(checkObject, null, _args);
};
var objectTypeHandler_1 = object.objectTypeHandler = objectTypeHandler;
/** check if an object is empty */
const isEmptyObject = function (value) {
    if ((0, lodash_1.isPlainObject)(value)) {
        const keys = Object.keys(value);
        return !keys.length;
    }
    return false;
};
isEmptyObject_1 = object.isEmptyObject = isEmptyObject;

var union = {};

Object.defineProperty(union, "__esModule", { value: true });
var checkUnionSync_1 = union.checkUnionSync = checkUnion_1 = union.checkUnion = generateReversePromisesFn_1 = union.generateReversePromisesFn = void 0;
const tslib_1$5 = require$$0;
const chain_promises_1$1 = requireChainPromises();
const combine_1 = combine;
const array_1 = array;
const object_1$2 = object;
const constants_1$5 = requireConstants$1();
/** wrap the or return result together */
function typeAsFail(result, type) {
    return result || type;
}
/**
We use the chainProcessPromises fail and exit side effects to
accomplish this task fast, because it's OR so only need to
have one of them pass that means all pass
so if one pass we throw Error and it will exist
if it fail we resolve it therefore the then is actually failed
*/
function generateReversePromisesFn(value, types, extended // this will be check keys
) {
    // we return it as a function therefore
    // if the last one fail the next one no need to get exeucte
    return types.map((type, i) => {
        const args = [value];
        if (extended && extended[i]) {
            args.push(extended[i]);
        }
        switch (type) {
            case constants_1$5.ARRAY_TYPE:
                return () => typeAsFail(Reflect.apply(array_1.checkArray, null, args), type);
            case constants_1$5.OBJECT_TYPE:
                return () => typeAsFail(Reflect.apply(object_1$2.checkObject, null, args), type);
            default:
                return () => typeAsFail((0, combine_1.combineCheck)(type)(value), type);
        }
    })
        .map(fn => (
    // this treat result in opposite way because once one pass
    // then we want to exit the queue (it's OR just need one to pass)
    () => tslib_1$5.__awaiter(this, void 0, void 0, function* () {
        const result = fn();
        // @TODO may be push them together in one array?
        return result === true ? Promise.reject(true) : Promise.resolve(result);
    })));
}
var generateReversePromisesFn_1 = union.generateReversePromisesFn = generateReversePromisesFn;
/**
  because the union type is OR
  therefore it has to be check in one rule
*/
function checkUnion(value, types, extended) {
    return tslib_1$5.__awaiter(this, void 0, void 0, function* () {
        const ps = generateReversePromisesFn(value, types, extended);
        // we wrap this in another promise to reverse the result
        return new Promise((resolver, rejecter) => {
            /**
            There is a weird behavior here, if we call the catch first
            the 'then' always get call, it might be a promise A behavior
            */
            (0, chain_promises_1$1.queuePromisesProcess)(ps, types[0])
                .then((type) => {
                // console.log('failed', type)
                rejecter(type);
            })
                .catch((res) => {
                // console.log('passed', res)
                resolver(res);
            });
        });
    });
}
var checkUnion_1 = union.checkUnion = checkUnion;
/**
 * Create a sync version of checkUnion
 */
function checkUnionSync(value, types) {
    const ctn = types.length;
    for (let i = 0; i < ctn; ++i) {
        const type = types[i];
        switch (type) {
            case constants_1$5.ARRAY_TYPE:
                if ((0, array_1.checkArray)(value)) {
                    return true;
                }
                break;
            case constants_1$5.OBJECT_TYPE:
                if ((0, object_1$2.checkObject)(value)) {
                    return true;
                }
                break;
            default:
                if ((0, combine_1.combineCheck)(type)(value)) {
                    return true;
                }
        }
    }
    return false;
}
checkUnionSync_1 = union.checkUnionSync = checkUnionSync;

var promisify = {};

var hasRequiredPromisify;

function requirePromisify () {
	if (hasRequiredPromisify) return promisify;
	hasRequiredPromisify = 1;
	// create our own promisify method here
	// because there are many situation we want the validating method to be async
	/// also this define here because the result is in reverse not suitable
	// for general purpose use
	Object.defineProperty(promisify, "__esModule", { value: true });
	promisify.reversePromisifyResult = promisify.promisify = void 0;
	const tslib_1 = require$$0;
	/** it's quite annoying Typescript Function type is useless */
	function promisify$1(fn) {
	    return (...args) => tslib_1.__awaiter(this, void 0, void 0, function* () {
	        const result = yield Reflect.apply(fn, null, args);
	        return result ? Promise.resolve(result) : Promise.reject(result);
	    });
	}
	promisify.promisify = promisify$1;
	/** When the result is true get rejected and vice vesa */
	function reversePromisifyResult(fn) {
	    return (...args) => tslib_1.__awaiter(this, void 0, void 0, function* () {
	        const result = yield Reflect.apply(fn, null, args);
	        return result ? Promise.reject(result) : Promise.resolve(result);
	    });
	}
	promisify.reversePromisifyResult = reversePromisifyResult;
	return promisify;
}

var promisifyExports = requirePromisify();

var plugins$1 = {};

var between = {};

var moreThan = {};

var len = {};

var hasRequiredLen;

function requireLen () {
	if (hasRequiredLen) return len;
	hasRequiredLen = 1;
	Object.defineProperty(len, "__esModule", { value: true });
	len.len = void 0;
	function len$1(value) {
	    return typeof value === 'string' ? value.length : value;
	}
	len.len = len$1;
	return len;
}

var hasRequiredMoreThan;

function requireMoreThan () {
	if (hasRequiredMoreThan) return moreThan;
	hasRequiredMoreThan = 1;
	Object.defineProperty(moreThan, "__esModule", { value: true });
	const len_1 = requireLen();
	const name = 'moreThan';
	function main(num, value) {
	    return (0, len_1.len)(value) > num;
	}
	moreThan.default = {
	    name,
	    main,
	    params: ['num']
	};
	return moreThan;
}

var lessThan = {};

var hasRequiredLessThan;

function requireLessThan () {
	if (hasRequiredLessThan) return lessThan;
	hasRequiredLessThan = 1;
	Object.defineProperty(lessThan, "__esModule", { value: true });
	const len_1 = requireLen();
	const name = "lessThan";
	function main(num, value) {
	    return (0, len_1.len)(value) < num;
	}
	lessThan.default = {
	    name,
	    main,
	    params: ['num']
	};
	return lessThan;
}

var hasRequiredBetween;

function requireBetween () {
	if (hasRequiredBetween) return between;
	hasRequiredBetween = 1;
	Object.defineProperty(between, "__esModule", { value: true });
	const tslib_1 = require$$0;
	// between
	const more_than_1 = tslib_1.__importDefault(requireMoreThan());
	const less_than_1 = tslib_1.__importDefault(requireLessThan());
	const name = 'between';
	function main(max, min, value) {
	    return less_than_1.default.main(max, value) && more_than_1.default.main(min, value);
	}
	// so when we register it, we know what param we should expect
	between.default = {
	    main,
	    name,
	    params: ['max', 'min']
	};
	return between;
}

var email = {};

var hasRequiredEmail;

function requireEmail () {
	if (hasRequiredEmail) return email;
	hasRequiredEmail = 1;
	// email validator
	// this is an example how to create a plugin
	// one default export method accept one parameter value return boolean
	// then export a named export call name: string and that's it
	// or just return a string regex pattern: string
	Object.defineProperty(email, "__esModule", { value: true });
	const name = 'email';
	function main(value) {
	    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return pattern.test(value);
	}
	email.default = {
	    main,
	    name,
	};
	return email;
}

var int = {};

var hasRequiredInt;

function requireInt () {
	if (hasRequiredInt) return int;
	hasRequiredInt = 1;
	(function (exports) {
		// test for integer
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.name = void 0;
		exports.name = "int";
		function main(value) {
		    return Number.isInteger(value);
		}
		exports.default = {
		    name: exports.name,
		    main,
		};
} (int));
	return int;
}

var lessThanEqual = {};

var hasRequiredLessThanEqual;

function requireLessThanEqual () {
	if (hasRequiredLessThanEqual) return lessThanEqual;
	hasRequiredLessThanEqual = 1;
	Object.defineProperty(lessThanEqual, "__esModule", { value: true });
	const len_1 = requireLen();
	const name = 'lessThanEqual';
	function main(num, value) {
	    return (0, len_1.len)(value) <= num;
	}
	lessThanEqual.default = {
	    name,
	    main,
	    params: ['num']
	};
	return lessThanEqual;
}

var moreThanEqual = {};

var hasRequiredMoreThanEqual;

function requireMoreThanEqual () {
	if (hasRequiredMoreThanEqual) return moreThanEqual;
	hasRequiredMoreThanEqual = 1;
	Object.defineProperty(moreThanEqual, "__esModule", { value: true });
	const len_1 = requireLen();
	const name = 'moreThanEqual';
	function main(num, value) {
	    return (0, len_1.len)(value) >= num;
	}
	moreThanEqual.default = {
	    name,
	    main,
	    params: ['num']
	};
	return moreThanEqual;
}

var uint = {};

var hasRequiredUint;

function requireUint () {
	if (hasRequiredUint) return uint;
	hasRequiredUint = 1;
	Object.defineProperty(uint, "__esModule", { value: true });
	const name = "unit";
	function main(value) {
	    return Number.isInteger(value) && value >= 0;
	}
	uint.default = {
	    name,
	    main,
	};
	return uint;
}

var within = {};

var hasRequiredWithin;

function requireWithin () {
	if (hasRequiredWithin) return within;
	hasRequiredWithin = 1;
	Object.defineProperty(within, "__esModule", { value: true });
	const tslib_1 = require$$0;
	const more_than_equal_1 = tslib_1.__importDefault(requireMoreThanEqual());
	const less_than_equal_1 = tslib_1.__importDefault(requireLessThanEqual());
	const name = 'main';
	function main(max, min, value) {
	    return less_than_equal_1.default.main(max, value) && more_than_equal_1.default.main(min, value);
	}
	within.default = {
	    name,
	    main,
	    params: ['max', 'min']
	};
	return within;
}

var hasRequiredPlugins$1;

function requirePlugins$1 () {
	if (hasRequiredPlugins$1) return plugins$1;
	hasRequiredPlugins$1 = 1;
	// This export files also will get build individually for the client side
	// and same thing could apply for the developer add rules
	Object.defineProperty(plugins$1, "__esModule", { value: true });
	plugins$1.plugins = void 0;
	const tslib_1 = require$$0;
	// Here we only provide a list of files and dynamicly import it
	const between_1 = tslib_1.__importDefault(requireBetween());
	const email_1 = tslib_1.__importDefault(requireEmail());
	const int_1 = tslib_1.__importDefault(requireInt());
	const less_than_equal_1 = tslib_1.__importDefault(requireLessThanEqual());
	const less_than_1 = tslib_1.__importDefault(requireLessThan());
	const more_than_equal_1 = tslib_1.__importDefault(requireMoreThanEqual());
	const more_than_1 = tslib_1.__importDefault(requireMoreThan());
	const uint_1 = tslib_1.__importDefault(requireUint());
	const within_1 = tslib_1.__importDefault(requireWithin());
	plugins$1.plugins = [
	    between_1.default,
	    email_1.default,
	    int_1.default,
	    less_than_equal_1.default,
	    less_than_1.default,
	    more_than_equal_1.default,
	    more_than_1.default,
	    uint_1.default,
	    within_1.default,
	];
	return plugins$1;
}

var pluginsExports$1 = requirePlugins$1();

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var plugins = {};

var hasRequiredPlugins;

function requirePlugins () {
	if (hasRequiredPlugins) return plugins;
	hasRequiredPlugins = 1;
	Object.defineProperty(plugins, "__esModule", { value: true });
	plugins.getPlugin = plugins.curryPlugin = void 0;
	const tslib_1 = require$$0;
	const lodash_1 = lodash$2;
	const general_exception_1 = tslib_1.__importDefault(requireGeneralException());
	const constants_1 = requireConstants$1();
	const index_1 = requirePlugins$1();
	/**
	  construct the curry plugin method
	  @0.5.0 we make this generic
	*/
	function curryPlugin(input, pluginConfig) {
	    const { plugin } = input;
	    if (plugin) {
	        const params = pluginConfig[constants_1.PARAMS_KEY]; // if we use pluginExport.params then TS complain!
	        if (params) {
	            // @BUG if the input missing the key then it wont throw for example
	            // we expect `arg` but pass the `min` then it will run but just failed
	            if (!checkArgKeys(input, params)) {
	                throw new general_exception_1.default(`Expected params: ${params.join(',')} not found!`);
	            }
	            const args = params.map((param) => input[param]);
	            return Reflect.apply((0, lodash_1.curry)(pluginConfig.main), null, args);
	        }
	        else {
	            throw new general_exception_1.default(`This plugin ${pluginConfig.name} can not be curry`);
	        }
	    }
	    throw new general_exception_1.default(`Unable to find plugin in config`);
	}
	plugins.curryPlugin = curryPlugin;
	/** check if the expected key presented in the config */
	function checkArgKeys(config, params) {
	    return params.filter(key => config[key]).length === params.length;
	}
	/** @TODO it needs to be a js file then it must be after compile */
	function getPlugin(pluginName) {
	    let p = index_1.plugins[pluginName];
	    if (p) {
	        p = p === '_' ? pluginName : p;
	        return Promise.resolve().then(() => tslib_1.__importStar(commonjsRequire('./' + [p, 'js'].join('.'))));
	    }
	    throw new Error(`${pluginName} is not found`);
	}
	plugins.getPlugin = getPlugin;
	return plugins;
}

var pluginsExports = requirePlugins();

var common$1 = {};

var regex = {};

var hasRequiredRegex;

function requireRegex () {
	if (hasRequiredRegex) return regex;
	hasRequiredRegex = 1;
	Object.defineProperty(regex, "__esModule", { value: true });
	regex.getRegex = regex.isRegExp = void 0;
	// port couple regex methods from the @to1source/event
	const lodash_1 = lodash$2;
	/**
	 * Just check if a pattern is an RegExp object
	 */
	function isRegExp(pat) {
	    return pat instanceof RegExp;
	}
	regex.isRegExp = isRegExp;
	/**
	 * Find from the array by matching the pattern
	 */
	function getRegex(pattern) {
	    switch (true) {
	        case isRegExp(pattern) === true:
	            return pattern;
	        case (0, lodash_1.isString)(pattern) === true:
	            return new RegExp(pattern);
	        default:
	            return false;
	    }
	}
	regex.getRegex = getRegex;
	return regex;
}

var src = {exports: {}};

var browser = {exports: {}};

/**
 * Helpers.
 */

var ms;
var hasRequiredMs;

function requireMs () {
	if (hasRequiredMs) return ms;
	hasRequiredMs = 1;
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var w = d * 7;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} [options]
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	ms = function(val, options) {
	  options = options || {};
	  var type = typeof val;
	  if (type === 'string' && val.length > 0) {
	    return parse(val);
	  } else if (type === 'number' && isFinite(val)) {
	    return options.long ? fmtLong(val) : fmtShort(val);
	  }
	  throw new Error(
	    'val is not a non-empty string or a valid number. val=' +
	      JSON.stringify(val)
	  );
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = String(str);
	  if (str.length > 100) {
	    return;
	  }
	  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
	    str
	  );
	  if (!match) {
	    return;
	  }
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'weeks':
	    case 'week':
	    case 'w':
	      return n * w;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	    default:
	      return undefined;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtShort(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
	    return Math.round(ms / d) + 'd';
	  }
	  if (msAbs >= h) {
	    return Math.round(ms / h) + 'h';
	  }
	  if (msAbs >= m) {
	    return Math.round(ms / m) + 'm';
	  }
	  if (msAbs >= s) {
	    return Math.round(ms / s) + 's';
	  }
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtLong(ms) {
	  var msAbs = Math.abs(ms);
	  if (msAbs >= d) {
	    return plural(ms, msAbs, d, 'day');
	  }
	  if (msAbs >= h) {
	    return plural(ms, msAbs, h, 'hour');
	  }
	  if (msAbs >= m) {
	    return plural(ms, msAbs, m, 'minute');
	  }
	  if (msAbs >= s) {
	    return plural(ms, msAbs, s, 'second');
	  }
	  return ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, msAbs, n, name) {
	  var isPlural = msAbs >= n * 1.5;
	  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
	}
	return ms;
}

var common;
var hasRequiredCommon$1;

function requireCommon$1 () {
	if (hasRequiredCommon$1) return common;
	hasRequiredCommon$1 = 1;
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 */

	function setup(env) {
		createDebug.debug = createDebug;
		createDebug.default = createDebug;
		createDebug.coerce = coerce;
		createDebug.disable = disable;
		createDebug.enable = enable;
		createDebug.enabled = enabled;
		createDebug.humanize = requireMs();
		createDebug.destroy = destroy;

		Object.keys(env).forEach(key => {
			createDebug[key] = env[key];
		});

		/**
		* The currently active debug mode names, and names to skip.
		*/

		createDebug.names = [];
		createDebug.skips = [];

		/**
		* Map of special "%n" handling functions, for the debug "format" argument.
		*
		* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
		*/
		createDebug.formatters = {};

		/**
		* Selects a color for a debug namespace
		* @param {String} namespace The namespace string for the debug instance to be colored
		* @return {Number|String} An ANSI color code for the given namespace
		* @api private
		*/
		function selectColor(namespace) {
			let hash = 0;

			for (let i = 0; i < namespace.length; i++) {
				hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
				hash |= 0; // Convert to 32bit integer
			}

			return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
		}
		createDebug.selectColor = selectColor;

		/**
		* Create a debugger with the given `namespace`.
		*
		* @param {String} namespace
		* @return {Function}
		* @api public
		*/
		function createDebug(namespace) {
			let prevTime;
			let enableOverride = null;
			let namespacesCache;
			let enabledCache;

			function debug(...args) {
				// Disabled?
				if (!debug.enabled) {
					return;
				}

				const self = debug;

				// Set `diff` timestamp
				const curr = Number(new Date());
				const ms = curr - (prevTime || curr);
				self.diff = ms;
				self.prev = prevTime;
				self.curr = curr;
				prevTime = curr;

				args[0] = createDebug.coerce(args[0]);

				if (typeof args[0] !== 'string') {
					// Anything else let's inspect with %O
					args.unshift('%O');
				}

				// Apply any `formatters` transformations
				let index = 0;
				args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
					// If we encounter an escaped % then don't increase the array index
					if (match === '%%') {
						return '%';
					}
					index++;
					const formatter = createDebug.formatters[format];
					if (typeof formatter === 'function') {
						const val = args[index];
						match = formatter.call(self, val);

						// Now we need to remove `args[index]` since it's inlined in the `format`
						args.splice(index, 1);
						index--;
					}
					return match;
				});

				// Apply env-specific formatting (colors, etc.)
				createDebug.formatArgs.call(self, args);

				const logFn = self.log || createDebug.log;
				logFn.apply(self, args);
			}

			debug.namespace = namespace;
			debug.useColors = createDebug.useColors();
			debug.color = createDebug.selectColor(namespace);
			debug.extend = extend;
			debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

			Object.defineProperty(debug, 'enabled', {
				enumerable: true,
				configurable: false,
				get: () => {
					if (enableOverride !== null) {
						return enableOverride;
					}
					if (namespacesCache !== createDebug.namespaces) {
						namespacesCache = createDebug.namespaces;
						enabledCache = createDebug.enabled(namespace);
					}

					return enabledCache;
				},
				set: v => {
					enableOverride = v;
				}
			});

			// Env-specific initialization logic for debug instances
			if (typeof createDebug.init === 'function') {
				createDebug.init(debug);
			}

			return debug;
		}

		function extend(namespace, delimiter) {
			const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
			newDebug.log = this.log;
			return newDebug;
		}

		/**
		* Enables a debug mode by namespaces. This can include modes
		* separated by a colon and wildcards.
		*
		* @param {String} namespaces
		* @api public
		*/
		function enable(namespaces) {
			createDebug.save(namespaces);
			createDebug.namespaces = namespaces;

			createDebug.names = [];
			createDebug.skips = [];

			let i;
			const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
			const len = split.length;

			for (i = 0; i < len; i++) {
				if (!split[i]) {
					// ignore empty strings
					continue;
				}

				namespaces = split[i].replace(/\*/g, '.*?');

				if (namespaces[0] === '-') {
					createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
				} else {
					createDebug.names.push(new RegExp('^' + namespaces + '$'));
				}
			}
		}

		/**
		* Disable debug output.
		*
		* @return {String} namespaces
		* @api public
		*/
		function disable() {
			const namespaces = [
				...createDebug.names.map(toNamespace),
				...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
			].join(',');
			createDebug.enable('');
			return namespaces;
		}

		/**
		* Returns true if the given mode name is enabled, false otherwise.
		*
		* @param {String} name
		* @return {Boolean}
		* @api public
		*/
		function enabled(name) {
			if (name[name.length - 1] === '*') {
				return true;
			}

			let i;
			let len;

			for (i = 0, len = createDebug.skips.length; i < len; i++) {
				if (createDebug.skips[i].test(name)) {
					return false;
				}
			}

			for (i = 0, len = createDebug.names.length; i < len; i++) {
				if (createDebug.names[i].test(name)) {
					return true;
				}
			}

			return false;
		}

		/**
		* Convert regexp to namespace
		*
		* @param {RegExp} regxep
		* @return {String} namespace
		* @api private
		*/
		function toNamespace(regexp) {
			return regexp.toString()
				.substring(2, regexp.toString().length - 2)
				.replace(/\.\*\?$/, '*');
		}

		/**
		* Coerce `val`.
		*
		* @param {Mixed} val
		* @return {Mixed}
		* @api private
		*/
		function coerce(val) {
			if (val instanceof Error) {
				return val.stack || val.message;
			}
			return val;
		}

		/**
		* XXX DO NOT USE. This is a temporary stub function.
		* XXX It WILL be removed in the next major release.
		*/
		function destroy() {
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}

		createDebug.enable(createDebug.load());

		return createDebug;
	}

	common = setup;
	return common;
}

/* eslint-env browser */

var hasRequiredBrowser;

function requireBrowser () {
	if (hasRequiredBrowser) return browser.exports;
	hasRequiredBrowser = 1;
	(function (module, exports) {
		/**
		 * This is the web browser implementation of `debug()`.
		 */

		exports.formatArgs = formatArgs;
		exports.save = save;
		exports.load = load;
		exports.useColors = useColors;
		exports.storage = localstorage();
		exports.destroy = (() => {
			let warned = false;

			return () => {
				if (!warned) {
					warned = true;
					console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
				}
			};
		})();

		/**
		 * Colors.
		 */

		exports.colors = [
			'#0000CC',
			'#0000FF',
			'#0033CC',
			'#0033FF',
			'#0066CC',
			'#0066FF',
			'#0099CC',
			'#0099FF',
			'#00CC00',
			'#00CC33',
			'#00CC66',
			'#00CC99',
			'#00CCCC',
			'#00CCFF',
			'#3300CC',
			'#3300FF',
			'#3333CC',
			'#3333FF',
			'#3366CC',
			'#3366FF',
			'#3399CC',
			'#3399FF',
			'#33CC00',
			'#33CC33',
			'#33CC66',
			'#33CC99',
			'#33CCCC',
			'#33CCFF',
			'#6600CC',
			'#6600FF',
			'#6633CC',
			'#6633FF',
			'#66CC00',
			'#66CC33',
			'#9900CC',
			'#9900FF',
			'#9933CC',
			'#9933FF',
			'#99CC00',
			'#99CC33',
			'#CC0000',
			'#CC0033',
			'#CC0066',
			'#CC0099',
			'#CC00CC',
			'#CC00FF',
			'#CC3300',
			'#CC3333',
			'#CC3366',
			'#CC3399',
			'#CC33CC',
			'#CC33FF',
			'#CC6600',
			'#CC6633',
			'#CC9900',
			'#CC9933',
			'#CCCC00',
			'#CCCC33',
			'#FF0000',
			'#FF0033',
			'#FF0066',
			'#FF0099',
			'#FF00CC',
			'#FF00FF',
			'#FF3300',
			'#FF3333',
			'#FF3366',
			'#FF3399',
			'#FF33CC',
			'#FF33FF',
			'#FF6600',
			'#FF6633',
			'#FF9900',
			'#FF9933',
			'#FFCC00',
			'#FFCC33'
		];

		/**
		 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
		 * and the Firebug extension (any Firefox version) are known
		 * to support "%c" CSS customizations.
		 *
		 * TODO: add a `localStorage` variable to explicitly enable/disable colors
		 */

		// eslint-disable-next-line complexity
		function useColors() {
			// NB: In an Electron preload script, document will be defined but not fully
			// initialized. Since we know we're in Chrome, we'll just detect this case
			// explicitly
			if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
				return true;
			}

			// Internet Explorer and Edge do not support colors.
			if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
				return false;
			}

			// Is webkit? http://stackoverflow.com/a/16459606/376773
			// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
			return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
				// Is firebug? http://stackoverflow.com/a/398120/376773
				(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
				// Is firefox >= v31?
				// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
				(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
				// Double check webkit in userAgent just in case we are in a worker
				(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
		}

		/**
		 * Colorize log arguments if enabled.
		 *
		 * @api public
		 */

		function formatArgs(args) {
			args[0] = (this.useColors ? '%c' : '') +
				this.namespace +
				(this.useColors ? ' %c' : ' ') +
				args[0] +
				(this.useColors ? '%c ' : ' ') +
				'+' + module.exports.humanize(this.diff);

			if (!this.useColors) {
				return;
			}

			const c = 'color: ' + this.color;
			args.splice(1, 0, c, 'color: inherit');

			// The final "%c" is somewhat tricky, because there could be other
			// arguments passed either before or after the %c, so we need to
			// figure out the correct index to insert the CSS into
			let index = 0;
			let lastC = 0;
			args[0].replace(/%[a-zA-Z%]/g, match => {
				if (match === '%%') {
					return;
				}
				index++;
				if (match === '%c') {
					// We only are interested in the *last* %c
					// (the user may have provided their own)
					lastC = index;
				}
			});

			args.splice(lastC, 0, c);
		}

		/**
		 * Invokes `console.debug()` when available.
		 * No-op when `console.debug` is not a "function".
		 * If `console.debug` is not available, falls back
		 * to `console.log`.
		 *
		 * @api public
		 */
		exports.log = console.debug || console.log || (() => {});

		/**
		 * Save `namespaces`.
		 *
		 * @param {String} namespaces
		 * @api private
		 */
		function save(namespaces) {
			try {
				if (namespaces) {
					exports.storage.setItem('debug', namespaces);
				} else {
					exports.storage.removeItem('debug');
				}
			} catch (error) {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}
		}

		/**
		 * Load `namespaces`.
		 *
		 * @return {String} returns the previously persisted debug modes
		 * @api private
		 */
		function load() {
			let r;
			try {
				r = exports.storage.getItem('debug');
			} catch (error) {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}

			// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
			if (!r && typeof process !== 'undefined' && 'env' in process) {
				r = process.env.DEBUG;
			}

			return r;
		}

		/**
		 * Localstorage attempts to return the localstorage.
		 *
		 * This is necessary because safari throws
		 * when a user disables cookies/localstorage
		 * and you attempt to access it.
		 *
		 * @return {LocalStorage}
		 * @api private
		 */

		function localstorage() {
			try {
				// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
				// The Browser also has localStorage in the global context.
				return localStorage;
			} catch (error) {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}
		}

		module.exports = requireCommon$1()(exports);

		const {formatters} = module.exports;

		/**
		 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
		 */

		formatters.j = function (v) {
			try {
				return JSON.stringify(v);
			} catch (error) {
				return '[UnexpectedJSONParseError]: ' + error.message;
			}
		};
} (browser, browser.exports));
	return browser.exports;
}

var node = {exports: {}};

var hasFlag;
var hasRequiredHasFlag;

function requireHasFlag () {
	if (hasRequiredHasFlag) return hasFlag;
	hasRequiredHasFlag = 1;

	hasFlag = (flag, argv = process.argv) => {
		const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
		const position = argv.indexOf(prefix + flag);
		const terminatorPosition = argv.indexOf('--');
		return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
	};
	return hasFlag;
}

var supportsColor_1;
var hasRequiredSupportsColor;

function requireSupportsColor () {
	if (hasRequiredSupportsColor) return supportsColor_1;
	hasRequiredSupportsColor = 1;
	const os = require$$0__default["default"];
	const tty = require$$1__default["default"];
	const hasFlag = requireHasFlag();

	const {env} = process;

	let forceColor;
	if (hasFlag('no-color') ||
		hasFlag('no-colors') ||
		hasFlag('color=false') ||
		hasFlag('color=never')) {
		forceColor = 0;
	} else if (hasFlag('color') ||
		hasFlag('colors') ||
		hasFlag('color=true') ||
		hasFlag('color=always')) {
		forceColor = 1;
	}

	if ('FORCE_COLOR' in env) {
		if (env.FORCE_COLOR === 'true') {
			forceColor = 1;
		} else if (env.FORCE_COLOR === 'false') {
			forceColor = 0;
		} else {
			forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
		}
	}

	function translateLevel(level) {
		if (level === 0) {
			return false;
		}

		return {
			level,
			hasBasic: true,
			has256: level >= 2,
			has16m: level >= 3
		};
	}

	function supportsColor(haveStream, streamIsTTY) {
		if (forceColor === 0) {
			return 0;
		}

		if (hasFlag('color=16m') ||
			hasFlag('color=full') ||
			hasFlag('color=truecolor')) {
			return 3;
		}

		if (hasFlag('color=256')) {
			return 2;
		}

		if (haveStream && !streamIsTTY && forceColor === undefined) {
			return 0;
		}

		const min = forceColor || 0;

		if (env.TERM === 'dumb') {
			return min;
		}

		if (process.platform === 'win32') {
			// Windows 10 build 10586 is the first Windows release that supports 256 colors.
			// Windows 10 build 14931 is the first release that supports 16m/TrueColor.
			const osRelease = os.release().split('.');
			if (
				Number(osRelease[0]) >= 10 &&
				Number(osRelease[2]) >= 10586
			) {
				return Number(osRelease[2]) >= 14931 ? 3 : 2;
			}

			return 1;
		}

		if ('CI' in env) {
			if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'GITHUB_ACTIONS', 'BUILDKITE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
				return 1;
			}

			return min;
		}

		if ('TEAMCITY_VERSION' in env) {
			return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
		}

		if (env.COLORTERM === 'truecolor') {
			return 3;
		}

		if ('TERM_PROGRAM' in env) {
			const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

			switch (env.TERM_PROGRAM) {
				case 'iTerm.app':
					return version >= 3 ? 3 : 2;
				case 'Apple_Terminal':
					return 2;
				// No default
			}
		}

		if (/-256(color)?$/i.test(env.TERM)) {
			return 2;
		}

		if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
			return 1;
		}

		if ('COLORTERM' in env) {
			return 1;
		}

		return min;
	}

	function getSupportLevel(stream) {
		const level = supportsColor(stream, stream && stream.isTTY);
		return translateLevel(level);
	}

	supportsColor_1 = {
		supportsColor: getSupportLevel,
		stdout: translateLevel(supportsColor(true, tty.isatty(1))),
		stderr: translateLevel(supportsColor(true, tty.isatty(2)))
	};
	return supportsColor_1;
}

/**
 * Module dependencies.
 */

var hasRequiredNode;

function requireNode () {
	if (hasRequiredNode) return node.exports;
	hasRequiredNode = 1;
	(function (module, exports) {
		const tty = require$$1__default["default"];
		const util = require$$1__default$1["default"];

		/**
		 * This is the Node.js implementation of `debug()`.
		 */

		exports.init = init;
		exports.log = log;
		exports.formatArgs = formatArgs;
		exports.save = save;
		exports.load = load;
		exports.useColors = useColors;
		exports.destroy = util.deprecate(
			() => {},
			'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
		);

		/**
		 * Colors.
		 */

		exports.colors = [6, 2, 3, 4, 5, 1];

		try {
			// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
			// eslint-disable-next-line import/no-extraneous-dependencies
			const supportsColor = requireSupportsColor();

			if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
				exports.colors = [
					20,
					21,
					26,
					27,
					32,
					33,
					38,
					39,
					40,
					41,
					42,
					43,
					44,
					45,
					56,
					57,
					62,
					63,
					68,
					69,
					74,
					75,
					76,
					77,
					78,
					79,
					80,
					81,
					92,
					93,
					98,
					99,
					112,
					113,
					128,
					129,
					134,
					135,
					148,
					149,
					160,
					161,
					162,
					163,
					164,
					165,
					166,
					167,
					168,
					169,
					170,
					171,
					172,
					173,
					178,
					179,
					184,
					185,
					196,
					197,
					198,
					199,
					200,
					201,
					202,
					203,
					204,
					205,
					206,
					207,
					208,
					209,
					214,
					215,
					220,
					221
				];
			}
		} catch (error) {
			// Swallow - we only care if `supports-color` is available; it doesn't have to be.
		}

		/**
		 * Build up the default `inspectOpts` object from the environment variables.
		 *
		 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
		 */

		exports.inspectOpts = Object.keys(process.env).filter(key => {
			return /^debug_/i.test(key);
		}).reduce((obj, key) => {
			// Camel-case
			const prop = key
				.substring(6)
				.toLowerCase()
				.replace(/_([a-z])/g, (_, k) => {
					return k.toUpperCase();
				});

			// Coerce string value into JS value
			let val = process.env[key];
			if (/^(yes|on|true|enabled)$/i.test(val)) {
				val = true;
			} else if (/^(no|off|false|disabled)$/i.test(val)) {
				val = false;
			} else if (val === 'null') {
				val = null;
			} else {
				val = Number(val);
			}

			obj[prop] = val;
			return obj;
		}, {});

		/**
		 * Is stdout a TTY? Colored output is enabled when `true`.
		 */

		function useColors() {
			return 'colors' in exports.inspectOpts ?
				Boolean(exports.inspectOpts.colors) :
				tty.isatty(process.stderr.fd);
		}

		/**
		 * Adds ANSI color escape codes if enabled.
		 *
		 * @api public
		 */

		function formatArgs(args) {
			const {namespace: name, useColors} = this;

			if (useColors) {
				const c = this.color;
				const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
				const prefix = `  ${colorCode};1m${name} \u001B[0m`;

				args[0] = prefix + args[0].split('\n').join('\n' + prefix);
				args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
			} else {
				args[0] = getDate() + name + ' ' + args[0];
			}
		}

		function getDate() {
			if (exports.inspectOpts.hideDate) {
				return '';
			}
			return new Date().toISOString() + ' ';
		}

		/**
		 * Invokes `util.format()` with the specified arguments and writes to stderr.
		 */

		function log(...args) {
			return process.stderr.write(util.format(...args) + '\n');
		}

		/**
		 * Save `namespaces`.
		 *
		 * @param {String} namespaces
		 * @api private
		 */
		function save(namespaces) {
			if (namespaces) {
				process.env.DEBUG = namespaces;
			} else {
				// If you set a process.env field to null or undefined, it gets cast to the
				// string 'null' or 'undefined'. Just delete instead.
				delete process.env.DEBUG;
			}
		}

		/**
		 * Load `namespaces`.
		 *
		 * @return {String} returns the previously persisted debug modes
		 * @api private
		 */

		function load() {
			return process.env.DEBUG;
		}

		/**
		 * Init logic for `debug` instances.
		 *
		 * Create a new `inspectOpts` object in case `useColors` is set
		 * differently for a particular `debug` instance.
		 */

		function init(debug) {
			debug.inspectOpts = {};

			const keys = Object.keys(exports.inspectOpts);
			for (let i = 0; i < keys.length; i++) {
				debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
			}
		}

		module.exports = requireCommon$1()(exports);

		const {formatters} = module.exports;

		/**
		 * Map %o to `util.inspect()`, all on a single line.
		 */

		formatters.o = function (v) {
			this.inspectOpts.colors = this.useColors;
			return util.inspect(v, this.inspectOpts)
				.split('\n')
				.map(str => str.trim())
				.join(' ');
		};

		/**
		 * Map %O to `util.inspect()`, allowing multiple lines if needed.
		 */

		formatters.O = function (v) {
			this.inspectOpts.colors = this.useColors;
			return util.inspect(v, this.inspectOpts);
		};
} (node, node.exports));
	return node.exports;
}

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

var hasRequiredSrc;

function requireSrc () {
	if (hasRequiredSrc) return src.exports;
	hasRequiredSrc = 1;
	(function (module) {
		if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
			module.exports = requireBrowser();
		} else {
			module.exports = requireNode();
		}
} (src));
	return src.exports;
}

var hasRequiredCommon;

function requireCommon () {
	if (hasRequiredCommon) return common$1;
	hasRequiredCommon = 1;
	Object.defineProperty(common$1, "__esModule", { value: true });
	common$1.patternPluginFanctory = common$1.isResultPackage = common$1.successThen = common$1.constructRuleCb = common$1.extractFnArgs = common$1.paramMatches = common$1.searchParamsKey = common$1.pluginHasFunc = common$1.checkPluginArg = void 0;
	const tslib_1 = require$$0;
	const validation_error_1 = tslib_1.__importDefault(requireValidationError());
	const general_exception_1 = tslib_1.__importDefault(requireGeneralException());
	const constants_1 = requireConstants$1();
	const common_1 = common$2;
	const object_1 = object$1;
	const is_function_1 = requireIsFunction();
	const regex_1 = requireRegex();
	const debug_1 = tslib_1.__importDefault(requireSrc());
	const debug = (0, debug_1.default)('jsonql:validator-core:common');
	/** check plugin argument against keywords list */
	function checkPluginArg(params) {
	    return !(params.filter(param => constants_1.KEYWORDS.includes(param)).length > 0);
	}
	common$1.checkPluginArg = checkPluginArg;
	/** now simply it with just one prop check main */
	function pluginHasFunc(rule) {
	    return rule[constants_1.PLUGIN_FN_KEY] && (0, is_function_1.isFunction)(rule[constants_1.PLUGIN_FN_KEY]);
	}
	common$1.pluginHasFunc = pluginHasFunc;
	/** Just take the keys without the value */
	function getArgsKey(rule) {
	    const params = extractFnArgs(rule.main.toString());
	    params.pop();
	    return params;
	}
	/** instead of just checking the user params, we go one step further to extract it for them */
	function searchParamsKey(rule) {
	    const params = getArgsKey(rule);
	    const l = params.length;
	    if (l === 0) {
	        return rule; // nothing to do
	    }
	    // now we check if the params has reserved word
	    if (!checkPluginArg(params)) {
	        throw new general_exception_1.default(constants_1.RESERVED_WORD_ERR);
	    }
	    rule[constants_1.PARAMS_KEY] = params;
	    return rule;
	}
	common$1.searchParamsKey = searchParamsKey;
	/** check if the params they provide is matching their main method */
	function paramMatches(rule) {
	    const params = getArgsKey(rule);
	    const l = params.length;
	    if (l === 0 && !rule[constants_1.PARAMS_KEY]) {
	        return true; // nothing to check
	    }
	    const _params = rule.params !== undefined && Array.isArray(rule.params)
	        ? rule.params : false;
	    if (_params === false) {
	        return false;
	    }
	    if (l > 0 && l === _params.length) {
	        if (!params.filter((param, i) => param !== _params[i]).length) {
	            return true;
	        }
	    }
	    return false;
	}
	common$1.paramMatches = paramMatches;
	/** take a function string and return its argument names */
	function extractFnArgs(fnStr) {
	    return fnStr.split('(')[1]
	        .split(')')[0]
	        .split(',')
	        .map(t => t.trim())
	        .filter(t => t !== '');
	}
	common$1.extractFnArgs = extractFnArgs;
	/**
	this will get re-use in the class to create method for the queue execution
	 */
	function constructRuleCb(argName, ruleFn, ruleName) {
	    return (value, lastResult, pos) => tslib_1.__awaiter(this, void 0, void 0, function* () {
	        // @NOTE keep getting problem with ruleFn is not a async funtion pass here
	        // so we need to first execute it then check if is thenable
	        return Reflect.apply(ruleFn, null, [value])
	            .then(successThen(argName, value, lastResult, pos))
	            .catch((error) => {
	            debug('failed', argName, value, error, pos);
	            // the name should be the validator name - not the property name
	            // because the pos already indicator the property
	            return Promise.reject(new validation_error_1.default(ruleName, pos));
	        });
	    });
	}
	common$1.constructRuleCb = constructRuleCb;
	/** This is taken out from the above then call for re-use when we want to fall through a rule */
	function successThen(argName, value, lastResult, pos // for internal debug use only
	) {
	    return (result) => {
	        const idx = pos[0];
	        debug('passed', argName, value, result, pos);
	        debug('lastResult', lastResult);
	        const newResult = { [constants_1.IDX_KEY]: idx, [constants_1.VALUE_KEY]: value };
	        if (lastResult === undefined) { // init
	            return { [argName]: newResult };
	        }
	        // here is the problem with spread result - they have the same name
	        if (argName in lastResult) { // we need to check if the key exist this is import NOT VALUE check
	            const lr = lastResult[argName];
	            if (isResultPackage(lr)) {
	                if (!lr.includes(newResult)) {
	                    lastResult[argName].push(newResult);
	                }
	            }
	            else if (lr[constants_1.IDX_KEY] !== idx) {
	                lastResult[argName] = (0, common_1.toArray)(lastResult[argName]).concat([newResult]);
	            }
	            // if it's the same then do nothing
	            return lastResult;
	        }
	        // return the argument name with the value
	        return (0, object_1.assign)(lastResult, { [argName]: newResult });
	    };
	}
	common$1.successThen = successThen;
	/** check to see if the lastResult contain our lastResult package format or just their value */
	function isResultPackage(lastResult, key = constants_1.IDX_KEY) {
	    try {
	        if (Array.isArray(lastResult)) {
	            return !!lastResult.filter((res) => key in res).length;
	        }
	    }
	    catch (e) {
	        debug('isResultPackage', e);
	    }
	    return false;
	}
	common$1.isResultPackage = isResultPackage;
	/** If the plugin provide a pattern and we construct a function out of it */
	function patternPluginFanctory(pattern) {
	    const regex = (0, regex_1.getRegex)(pattern);
	    return (value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
	        return regex.test(value) ?
	            Promise.resolve(true) :
	            Promise.reject(false);
	    });
	}
	common$1.patternPluginFanctory = patternPluginFanctory;
	return common$1;
}

var commonExports = requireCommon();

var validatorPlugins = {};

Object.defineProperty(validatorPlugins, "__esModule", { value: true });
var ValidatorPlugins_1 = validatorPlugins.ValidatorPlugins = void 0;
const tslib_1$4 = require$$0;
const general_exception_1$1 = tslib_1$4.__importDefault(requireGeneralException());
const constants_1$4 = requireConstants$1();
const plugins_1 = requirePlugins();
const promisify_1 = requirePromisify();
const common_1$2 = requireCommon();
const plugins_2 = requirePlugins$1();
const debug_1$4 = tslib_1$4.__importDefault(requireSrc());
const debug$4 = (0, debug_1$4.default)('jsonql:validator-core:validator-plugin');
// main
class ValidatorPlugins {
    /** with a idx to id this instance */
    constructor($version) {
        this.$version = $version;
        this._plugins = new Map();
        this._internalPluginNames = [];
        // register internal plugins
        plugins_2.plugins.forEach((plugin) => {
            // we don't do the convert here anymore, and wait until the look up
            // then we store it back JIT
            const name = plugin[constants_1$4.NAME_KEY];
            this._internalPluginNames.push(name);
            this._registerPlugin(name, plugin, true);
        });
    }
    /**
    find the plugin internal or external
    argName is the argument name
    */
    lookupPlugin(input, argName) {
        const pluginName = input[constants_1$4.PLUGIN_KEY];
        if (pluginName && this._plugins.has(pluginName)) {
            const pluginConfig = this._plugins.get(pluginName);
            // unconverted
            if (pluginConfig[constants_1$4.PLUGIN_FN_KEY] && !pluginConfig[constants_1$4.PARAMS_KEY]) {
                // let it fall to the next
                pluginConfig[constants_1$4.VALIDATE_ASYNC_KEY] = (0, promisify_1.promisify)(pluginConfig[constants_1$4.PLUGIN_FN_KEY]);
            }
            // already converted
            if (pluginConfig && pluginConfig[constants_1$4.VALIDATE_ASYNC_KEY] && !pluginConfig[constants_1$4.PARAMS_KEY]) {
                return (0, common_1$2.constructRuleCb)(argName, pluginConfig[constants_1$4.VALIDATE_ASYNC_KEY], pluginName);
            }
            // needs to curry
            if (pluginConfig && pluginConfig[constants_1$4.PARAMS_KEY]) {
                debug$4('pluginConfig --->', pluginConfig);
                debug$4('input----------->', input);
                const _input = input;
                return (0, common_1$2.constructRuleCb)(argName, (0, promisify_1.promisify)((0, plugins_1.curryPlugin)(_input, pluginConfig)), pluginName);
            }
        }
        debug$4('lookupPlugin', 'unable to find', pluginName);
        throw new general_exception_1$1.default(`Unable to find plugin: ${pluginName}`);
    }
    /** The public api to register a plugin */
    registerPlugin(name, pluginConfig) {
        this._registerPlugin(name, pluginConfig);
    }
    /** call this when loading external plugin, not allow to use directly */
    _registerExternalPlugin(name, pluginConfig) {
        this._registerPlugin(name, pluginConfig, false, true);
    }
    /** this is no longer in use and we change the usage to export list of names that can be add to contract */
    export(external = true) {
        const plugins = [];
        this._plugins.forEach((p, n) => {
            if (!this.isBuiltIn(n) && p.external === external) {
                plugins.push(p);
            }
        });
        return plugins;
    }
    /** just check if this plugin is built-in */
    isBuiltIn(pluginName) {
        return this._internalPluginNames.includes(pluginName);
    }
    // ------------------------- PRIVATE --------------------------//
    /** register plugins */
    _registerPlugin(name, pluginConfig, skipCheck = false, // when register internal plugin then skip it
    external = false // new in 0.9.11
    ) {
        if (!skipCheck) {
            if (this._plugins.has(name)) {
                throw new general_exception_1$1.default(`plugin ${name} already existed!`);
            }
            if (!(0, common_1$2.pluginHasFunc)(pluginConfig)) {
                debug$4('registerPlugin', constants_1$4.MAIN_NOT_FOUND_ERR);
                throw new general_exception_1$1.default(constants_1$4.MAIN_NOT_FOUND_ERR);
            }
            // Here we could extract the params instead of just checking
            if (pluginConfig[constants_1$4.PARAMS_KEY] === undefined) {
                pluginConfig = (0, common_1$2.searchParamsKey)(pluginConfig);
                debug$4('auto generate params for plugin', pluginConfig);
            }
            else if (pluginConfig[constants_1$4.PARAMS_KEY] !== undefined) { // if they provide the keys then we check
                if (!(0, common_1$2.checkPluginArg)(pluginConfig[constants_1$4.PARAMS_KEY])) {
                    debug$4('registerPlugin', constants_1$4.RESERVED_WORD_ERR);
                    throw new general_exception_1$1.default(constants_1$4.RESERVED_WORD_ERR);
                }
                if (!(0, common_1$2.paramMatches)(pluginConfig)) {
                    debug$4('registerPlugin', constants_1$4.ARG_NOT_MATCH_ERR);
                    throw new general_exception_1$1.default(constants_1$4.ARG_NOT_MATCH_ERR);
                }
            }
        }
        pluginConfig.name = name;
        pluginConfig.external = external;
        /**
        At this point it should only contain a main (or plus params) so we
        do nothing and just store it, we convert it only when they call it
        */
        this._plugins.set(name, pluginConfig);
    }
}
ValidatorPlugins_1 = validatorPlugins.ValidatorPlugins = ValidatorPlugins;

var constantsExports = requireConstants$1();

var index_d$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get checkString () { return checkString_1; },
  get checkBoolean () { return checkBoolean_1; },
  get checkNumber () { return checkNumber_1; },
  get checkInteger () { return checkInteger_1; },
  get checkFloat () { return checkFloat_1; },
  get checkUnsigned () { return checkUnsigned_1; },
  get checkAny () { return checkAny_1; },
  get checkArray () { return checkArray_1; },
  get isArrayLike () { return isArrayLike_1; },
  get arrayTypeHandler () { return arrayTypeHandler_1; },
  get checkObject () { return checkObject_1; },
  get objectTypeHandler () { return objectTypeHandler_1; },
  get isEmptyObject () { return isEmptyObject_1; },
  get combineCheck () { return combineCheck_1; },
  get checkUnion () { return checkUnion_1; },
  get checkUnionSync () { return checkUnionSync_1; },
  get generateReversePromisesFn () { return generateReversePromisesFn_1; },
  promisify: promisifyExports.promisify,
  reversePromisifyResult: promisifyExports.reversePromisifyResult,
  plugins: pluginsExports$1.plugins,
  curryPlugin: pluginsExports.curryPlugin,
  checkPluginArg: commonExports.checkPluginArg,
  pluginHasFunc: commonExports.pluginHasFunc,
  constructRuleCb: commonExports.constructRuleCb,
  successThen: commonExports.successThen,
  isResultPackage: commonExports.isResultPackage,
  patternPluginFanctory: commonExports.patternPluginFanctory,
  get ValidatorPlugins () { return ValidatorPlugins_1; },
  BOOLEAN_TYPE: constantsExports.BOOLEAN_TYPE,
  STRING_TYPE: constantsExports.STRING_TYPE,
  NUMBER_TYPE: constantsExports.NUMBER_TYPE,
  ARRAY_TYPE: constantsExports.ARRAY_TYPE,
  OBJECT_TYPE: constantsExports.OBJECT_TYPE,
  OR_SEPERATOR: constantsExports.OR_SEPERATOR,
  ARRAY_TYPE_LFT: constantsExports.ARRAY_TYPE_LFT,
  ARRAY_TYPE_RGT: constantsExports.ARRAY_TYPE_RGT,
  ARRAY_TS_TYPE_LFT: constantsExports.ARRAY_TS_TYPE_LFT,
  KEYWORDS: constantsExports.KEYWORDS,
  VALIDATE_KEY: constantsExports.VALIDATE_KEY,
  VALIDATE_ASYNC_KEY: constantsExports.VALIDATE_ASYNC_KEY,
  PLUGIN_KEY: constantsExports.PLUGIN_KEY,
  PLUGIN_FN_KEY: constantsExports.PLUGIN_FN_KEY,
  PATTERN_KEY: constantsExports.PATTERN_KEY,
  RULES_KEY: constantsExports.RULES_KEY,
  NAME_KEY: constantsExports.NAME_KEY,
  PARAMS_KEY: constantsExports.PARAMS_KEY,
  IDX_KEY: constantsExports.IDX_KEY,
  VALUE_KEY: constantsExports.VALUE_KEY
});

var require$$8 = /*@__PURE__*/getAugmentedNamespace(index_d$1);

var fn = {};

var constants$1 = {};

Object.defineProperty(constants$1, "__esModule", { value: true });
var RETURN_AS_RAW = constants$1.RETURN_AS_RAW = RETURN_AS_ARR = constants$1.RETURN_AS_ARR = RETURN_AS_OBJ = constants$1.RETURN_AS_OBJ = TS_TYPE_NAME = constants$1.TS_TYPE_NAME = TS_TYPE_REF = constants$1.TS_TYPE_REF = TS_TYPE_LIT = constants$1.TS_TYPE_LIT = DEFAULT_VALUE = constants$1.DEFAULT_VALUE = TS_ARRAY_TYPE = constants$1.TS_ARRAY_TYPE = TS_UNION_TYPE = constants$1.TS_UNION_TYPE = SPREAD_ARG_TYPE = constants$1.SPREAD_ARG_TYPE = constants$1.IS_SPREAD_VALUES_KEY = constants$1.SPREAD_PREFIX = constants$1.EXCEPTION_CASE_ERR = constants$1.PARAMS_NOT_ARRAY_ERR = constants$1.ARGS_NOT_ARRAY_ERR = void 0;
constants$1.ARGS_NOT_ARRAY_ERR = `Input argument is not an array!`;
constants$1.PARAMS_NOT_ARRAY_ERR = `Parameter is not an array`;
constants$1.EXCEPTION_CASE_ERR = `Exception happened don't know how to handle it`;
// use this to id if the input is spread
constants$1.SPREAD_PREFIX = '$_spread_arg_';
constants$1.IS_SPREAD_VALUES_KEY = '$$is_spread_values';
var SPREAD_ARG_TYPE = constants$1.SPREAD_ARG_TYPE = 'RestElement';
var TS_UNION_TYPE = constants$1.TS_UNION_TYPE = 'TsUnionType';
var TS_ARRAY_TYPE = constants$1.TS_ARRAY_TYPE = 'TsArrayType';
var DEFAULT_VALUE = constants$1.DEFAULT_VALUE = 'defaultvalue';
// when they type inline along the params
var TS_TYPE_LIT = constants$1.TS_TYPE_LIT = 'TsTypeLiteral';
// when pass a type reference we just treat them as object
var TS_TYPE_REF = constants$1.TS_TYPE_REF = 'TsTypeReference';
// this is for us to id what that is
var TS_TYPE_NAME = constants$1.TS_TYPE_NAME = 'tstype';
// return result as - default array 
var RETURN_AS_OBJ = constants$1.RETURN_AS_OBJ = 'object';
var RETURN_AS_ARR = constants$1.RETURN_AS_ARR = 'array';
RETURN_AS_RAW = constants$1.RETURN_AS_RAW = 'raw';

Object.defineProperty(fn, "__esModule", { value: true });
fn.getKey = fn.checkDuplicateRules = fn.getOptionalValue = fn.unwrapPreparedValidateResult = fn.processValidateResultsAsArrOfObj = fn.processValidateResults = fn.processValidateResultsAsObj = fn.processValidateResultsAsArr = fn.createAutomaticRules = void 0;
const tslib_1$3 = require$$0;
const validator_core_1$1 = require$$8;
const constants_1$3 = constants$1;
const empty_1$1 = empty;
const object_1$1 = object$1;
const debug_1$3 = tslib_1$3.__importDefault(requireSrc());
const debug$3 = (0, debug_1$3.default)('jsonql:validator:class:fn');
/**
The input is what the dev wrote in the validate
The input has two styles
1. object - the key is the parameter name
2. Array of Array, the index correspond to the argument position (later)
all of these has moved to the ValidatorFactoryBase
because the plugins are apply there
*/
/**
  generate an automatic valdiation rule using the AST map
  this part will always happen first then add the user
  generate valdiation rules
*/
function createAutomaticRules(astMap) {
    return astMap.map((ast) => {
        const { name } = ast;
        const ruleFn = getValidateRules(ast);
        const ruleName = ast[constants_1$3.TS_TYPE_NAME] || ast.type;
        debug$3('createAutomaticRules', name, ruleName);
        ast[validator_core_1$1.RULES_KEY] = [(0, validator_core_1$1.constructRuleCb)(name, ruleFn, ruleName)];
        return ast;
    });
}
fn.createAutomaticRules = createAutomaticRules;
/** wrapper method to wrap two steps together to make the class call easier to understand */
function processValidateResultsAsArr(argNames, validateResult) {
    return tslib_1$3.__awaiter(this, void 0, void 0, function* () {
        return processValidateResults(argNames, validateResult)
            .then(unwrapPreparedValidateResult);
    });
}
fn.processValidateResultsAsArr = processValidateResultsAsArr;
/** step to process the return result as object */
function processValidateResultsAsObj(argNames, validateResult) {
    return processValidateResultsAsArrOfObj(argNames, validateResult)
        .reduce((a, b) => (0, object_1$1.assign)(a, b), {});
}
fn.processValidateResultsAsObj = processValidateResultsAsObj;
/** need to do this in two steps, first package it again and unwrap it, then next step flatten it */
function processValidateResults(argNames, validateResult) {
    return tslib_1$3.__awaiter(this, void 0, void 0, function* () {
        return argNames.map((argName) => {
            if (validator_core_1$1.VALUE_KEY in validateResult[argName]) {
                return validateResult[argName][validator_core_1$1.VALUE_KEY];
            }
            else if ((0, validator_core_1$1.isResultPackage)(validateResult[argName])) {
                // @BUG this is still wrong its an array wrap in an array
                // we need to wrap this one more time for the next step
                return {
                    [constants_1$3.IS_SPREAD_VALUES_KEY]: validateResult[argName].map((res) => res[validator_core_1$1.VALUE_KEY])
                };
            }
            debug$3(`Return result when we couldn't find way to destruct: ${argName}`, validateResult[argName]);
            return validateResult[argName];
        });
    });
}
fn.processValidateResults = processValidateResults;
/** step to process the return result as object */
function processValidateResultsAsArrOfObj(argNames, validateResult) {
    return argNames.map((argName) => {
        switch (true) {
            case validator_core_1$1.VALUE_KEY in validateResult[argName]:
                return { [argName]: validateResult[argName][validator_core_1$1.VALUE_KEY] };
            case (0, validator_core_1$1.isResultPackage)(validateResult[argName]):
                return { [argName]: validateResult[argName].map((res) => res[validator_core_1$1.VALUE_KEY]) };
            default:
                return { [argName]: validateResult[argName] };
        }
    });
}
fn.processValidateResultsAsArrOfObj = processValidateResultsAsArrOfObj;
/** final step to unwarp the pack result for spread arguments */
// @NOTE there is a potential bug here when the spread type is Array<Array<any>>
// then when we use in the velocejs we flatMap and all the Array inside get flattern
// then again using spread with this wild open types is really BAD API design
function unwrapPreparedValidateResult(result // can not use unknown here
) {
    return tslib_1$3.__awaiter(this, void 0, void 0, function* () {
        debug$3('unwrapPreparedValidateResult', result);
        const ctn = result.length;
        if (ctn === 1 && (0, object_1$1.objectHasKey)(result[0], constants_1$3.IS_SPREAD_VALUES_KEY)) {
            return result[0][constants_1$3.IS_SPREAD_VALUES_KEY];
        }
        else if ((0, validator_core_1$1.isResultPackage)(result, constants_1$3.IS_SPREAD_VALUES_KEY)) {
            let tmp = [];
            for (let i = 0; i < ctn; ++i) {
                if (constants_1$3.IS_SPREAD_VALUES_KEY in result[i]) {
                    tmp = tmp.concat(result[i][constants_1$3.IS_SPREAD_VALUES_KEY]);
                }
                else {
                    tmp.push(result[i]);
                }
            }
            return tmp;
        }
        return result; // nothing to do should be all correct
    });
}
fn.unwrapPreparedValidateResult = unwrapPreparedValidateResult;
/** only deal with constructing the basic rules validation function */
function getValidateRules(ast) {
    debug$3('getValidateRules ast', ast);
    switch (ast[constants_1$3.TS_TYPE_NAME]) {
        case constants_1$3.TS_UNION_TYPE:
            return function unionFn(value) {
                return tslib_1$3.__awaiter(this, void 0, void 0, function* () {
                    return (0, validator_core_1$1.checkUnion)(value, ast.type);
                });
            };
        case constants_1$3.TS_ARRAY_TYPE || constants_1$3.SPREAD_ARG_TYPE:
            // need to apply for the type as well
            // @TODO need to examine the input to see what more sutation could come up
            return function arrayFn(value) {
                return tslib_1$3.__awaiter(this, void 0, void 0, function* () {
                    return (0, validator_core_1$1.promisify)(validator_core_1$1.checkArray)(value, ast.types);
                });
            };
        case constants_1$3.TS_TYPE_REF || constants_1$3.TS_TYPE_LIT:
            // @TODO should this get a special treatment
            return function anyFn(value) {
                return tslib_1$3.__awaiter(this, void 0, void 0, function* () {
                    return (0, validator_core_1$1.promisify)(validator_core_1$1.checkAny)(value);
                });
            };
        case constants_1$3.SPREAD_ARG_TYPE: // we need to create rule for this one, its been wrong rule
            return function combineFn(value) {
                return tslib_1$3.__awaiter(this, void 0, void 0, function* () {
                    return (0, validator_core_1$1.promisify)((0, validator_core_1$1.combineCheck)(ast.types))(value);
                });
            };
        default: // no tstype then should be primitive
            if ((0, validator_core_1$1.checkString)(ast.type)) {
                debug$3('validation type', ast.type);
                return function combineFn(value) {
                    return tslib_1$3.__awaiter(this, void 0, void 0, function* () {
                        return (0, validator_core_1$1.promisify)((0, validator_core_1$1.combineCheck)(ast.type))(value);
                    });
                };
            }
            // if both are not presented that means this could be a JS code
            // this happen when we use Decorator and toString() to extract the ast
            debug$3(`getValidateRules`, ast);
            return function emptyFn(value) {
                return tslib_1$3.__awaiter(this, void 0, void 0, function* () {
                    return (0, validator_core_1$1.promisify)(empty_1$1.notEmpty)(value, true);
                });
            };
    }
}
/** extract the default value if there is none */
function getOptionalValue(arg, param) {
    // should be the value undefined then search for defaultvalue
    if (param.tstype !== constants_1$3.SPREAD_ARG_TYPE && arg === undefined) { // spread argument can not have default value
        return param[constants_1$3.DEFAULT_VALUE] !== undefined
            ? param[constants_1$3.DEFAULT_VALUE]
            : undefined;
    }
    return arg;
}
fn.getOptionalValue = getOptionalValue;
/** check if the rule contain duplicate rules that can not be resolve */
function checkDuplicateRules(rule) {
    return [
        validator_core_1$1.VALIDATE_KEY, validator_core_1$1.VALIDATE_ASYNC_KEY, validator_core_1$1.PLUGIN_FN_KEY // @TODO should pattern be standalone?
    ].filter((key) => rule[key] !== undefined);
}
fn.checkDuplicateRules = checkDuplicateRules;
/** take the key part from a one level object */
function getKey(obj) {
    const keys = Object.keys(obj);
    return keys.length ? keys[0] : undefined;
}
fn.getKey = getKey;

Object.defineProperty(validatorBase, "__esModule", { value: true });
validatorBase.ValidatorBase = void 0;
const tslib_1$2 = require$$0;
const validation_error_1$1 = tslib_1$2.__importDefault(requireValidationError());
const general_exception_1 = tslib_1$2.__importDefault(requireGeneralException());
const empty_1 = empty;
const common_1$1 = common$2;
const object_1 = object$1;
const is_function_1 = requireIsFunction();
const chain_promises_1 = requireChainPromises();
const validator_core_1 = require$$8;
// ----- LOCAL ---- //
const fn_1$1 = fn;
const constants_1$2 = constants$1;
// ---- DEBUG ---- //
const debug_1$2 = tslib_1$2.__importDefault(requireSrc());
const debug$2 = (0, debug_1$2.default)('jsonql:validator:validator-base');
/**
The sequence how this should run
1. init - take the AST map and generate automatic validation rules
2. register internal plugins
3. (if any) user can register their own plugins
4. accept the user define rules, at this point we create the full validation map
5. Call the validate method with the data input then the validation will run
*/
class ValidatorBase {
    // main
    constructor(astMap, _validatorPluginsInstance) {
        this._validatorPluginsInstance = _validatorPluginsInstance;
        this._astWithBaseRules = (0, fn_1$1.createAutomaticRules)(astMap);
        // create the argument name list in order
        this._arguments = this._astWithBaseRules.map(rule => rule[validator_core_1.NAME_KEY]);
    }
    /** the main method then in it's sub class will get override */
    validate(values) {
        const queues = this._normalizeArgValues(values);
        return (0, chain_promises_1.queuePromisesProcess)(queues, undefined // the init value will now be undefined to know if its first
        );
    }
    /**
      on the client side even if its not require validation but we still need to prepare
      the argument for transport so we need the _normalizeArgValues without _prepareForExecution
    */
    prepareArgValues(values) {
        return this._normalizeArgValues(values, false);
    }
    /** just return the internal schema for validation for use, see export */
    get schema() {
        return this._schema || this._astWithBaseRules;
    }
    /** overload the addValidationRules method that allow to pass a function or async function */
    addValidationRules(input) {
        debug$2('addValidationRules', input);
        const clearInput = {};
        for (const propName in input) {
            // we convert this to array here now
            clearInput[propName] = (0, common_1$1.toArray)(input[propName])
                .map((inp) => {
                if ((0, is_function_1.isFunction)(inp)) {
                    return this._updateInput(inp);
                }
                return inp;
            });
        }
        // overload the parent method
        this._createSchema(clearInput);
    }
    /** just put the function into the right key */
    _updateInput(input) {
        // we just make it an async funtion regardless
        return {
            [validator_core_1.VALIDATE_ASYNC_KEY]: (0, validator_core_1.promisify)(input)
        };
    }
    // ----------------- validate ------------------ //
    /**
      when validate happens we check the input value
      correspond to out map, and apply the values
      argument values turn into an executable queue
    */
    _normalizeArgValues(values, execute = true) {
        debug$2('_normalizeArgValues', values);
        // there might not be a dev provided schema
        const params = this.schema;
        const pCtn = params.length;
        if (pCtn === 0) {
            return []; // nothing to do
        }
        if (!(0, validator_core_1.checkArray)(values)) {
            debug$2(values);
            throw new validation_error_1$1.default(constants_1$2.ARGS_NOT_ARRAY_ERR, values);
        }
        const vCtn = values.length;
        switch (true) {
            case vCtn === pCtn:
                if (execute === false) {
                    return (0, object_1.arrToObj)(values, (value, i) => ({ [params[i].name]: value }));
                }
                return values.map((value, i) => (this._prepareForExecution(value, params[i], i)));
            case vCtn < pCtn:
                debug$2(`Values pass less than params`);
                if (execute === false) {
                    return (0, object_1.arrToObj)(params, (param, i) => {
                        const _value = (0, fn_1$1.getOptionalValue)(values[i], param);
                        return { [param.name]: _value };
                    });
                }
                return params.map((param, i) => {
                    const _value = (0, fn_1$1.getOptionalValue)(values[i], param);
                    return this._prepareForExecution(_value, param, i);
                });
            case vCtn > pCtn: // this is the spread style argument
                debug$2('spread params', vCtn, pCtn);
                return this._processSpreadLikeArg(values, params, execute);
            default: // will not fall through here @TODO
                throw new validation_error_1$1.default(constants_1$2.EXCEPTION_CASE_ERR, [vCtn, pCtn]);
        }
    }
    /** The spread or mix with spread argument is too complicated to process in couple lines */
    _processSpreadLikeArg(values, params, execute) {
        // if it's spread only then there should be just one param
        const spreadParam = params.filter(p => p.tstype === constants_1$2.SPREAD_ARG_TYPE)[0];
        // if this is just grabbing the values then it should be name: Array<values>
        if (execute === false) {
            // @TODO there is couple more scenario that might break this fix as we go along 
            return values.map((value, i) => {
                if (!params[i]) {
                    return { [spreadParam.name]: [value] };
                }
                return params[i].name !== spreadParam.name
                    ? { [params[i].name]: value }
                    : { [spreadParam.name]: [value] };
            }).reduce((a, b) => {
                const k = (0, fn_1$1.getKey)(a);
                if (!k) { // init
                    return b;
                }
                const k2 = (0, fn_1$1.getKey)(b);
                if (!a[k2]) {
                    return (0, object_1.assign)({}, a, b);
                }
                a[k2] = a[k2].concat(b[k2]);
                return a;
            }, {});
        }
        // now search for the mixedRule - there should only be one, if not this idiot doesn't know what is doing
        // the problem is the type is any after the first param
        return values.map((value, i) => {
            // @NOTE the assign need to create new object otherwise we will polluate the params
            const param = params[i] || (0, object_1.assign)({}, spreadParam, { name: `${constants_1$2.SPREAD_PREFIX}${i}` });
            // this getOptionalValue is pointless
            // const _value = getOptionalValue(value, param)
            debug$2('spread param', value, param.name);
            return this._prepareForExecution(value, param, i);
        });
    }
    /**
      at this point we actually put the rules in the queue
      but we dont' run it yet until all rules are in the main queue
      this way, if one fail then the whole queue exited without running further
    */
    _prepareForExecution(value, param, idx) {
        const { rules, required, name } = param;
        if (rules && rules.length) {
            // we only need to return the queue
            return rules.map((rule, i) => {
                // if this is not required field and no value the we create a fake callback
                if (value === undefined && !required) {
                    debug$2(`skip the validation`, required);
                    return (lastResult) => tslib_1$2.__awaiter(this, void 0, void 0, function* () {
                        return ((0, validator_core_1.successThen)(name, value, lastResult, [idx, i])(true));
                    });
                }
                // when it fail then we return the index number
                return (lastResult) => tslib_1$2.__awaiter(this, void 0, void 0, function* () {
                    return Reflect.apply(rule, null, [value, lastResult, [idx, i]])
                        .then((result) => {
                        debug$2('Post rule result', result);
                        return result;
                    });
                });
            });
        }
        // stuff it with a placeholder fuction?
        debug$2('No rules to run');
        return () => tslib_1$2.__awaiter(this, void 0, void 0, function* () { return true; });
    }
    // ---------------------- schema -------------------------- //
    /** put the rule in here and make it into an async method */
    _createSchema(input) {
        let astWithRules = this._astWithBaseRules;
        // all we need to do is check if its empty input
        if ((0, empty_1.notEmpty)(input, true)) {
            astWithRules = this._applyObjectInput(astWithRules, input);
        }
        debug$2(`_createSchema`, astWithRules);
        this._schema = astWithRules;
    }
    /** nomalize the object style rules input */
    _applyObjectInput(astMap, input) {
        return astMap.map((ast) => {
            var _a;
            const propName = ast.name;
            if (input[propName]) {
                // there might not be a name in there and it's important
                const _input = input[propName].map((input) => {
                    input.name = propName;
                    return input;
                });
                const rules = this._transformInput(_input, propName);
                // debug('ast[RULES_KEY]', ast[RULES_KEY])
                if (rules && rules.length) {
                    ast[validator_core_1.RULES_KEY] = (_a = ast[validator_core_1.RULES_KEY]) === null || _a === void 0 ? void 0 : _a.concat(rules);
                }
            }
            return ast;
        });
    }
    /** this will transform the rules to executable */
    _transformInput(input, propName) {
        debug$2('_transformInput', input);
        return input.map((_input, i) => {
            const ruleKeys = (0, fn_1$1.checkDuplicateRules)(_input);
            if (ruleKeys.length > 1) {
                throw new Error(`You can only set one rule at a time! We found ${ruleKeys.join(',')}`);
            }
            // the name is not that important but still need one, if there is none we generate it
            const pluginName = _input.name || `customPluginName${i}`;
            switch (true) {
                case _input[validator_core_1.PLUGIN_KEY] !== undefined:
                    debug$2(`Should got here ----->`, _input[validator_core_1.PLUGIN_KEY]);
                    return this._lookupPlugin(_input, propName);
                case _input[validator_core_1.VALIDATE_KEY] !== undefined:
                    debug$2(`${validator_core_1.VALIDATE_KEY} ----->`, _input);
                    return (0, validator_core_1.constructRuleCb)(propName, (0, validator_core_1.promisify)(_input[validator_core_1.VALIDATE_KEY]), pluginName);
                case _input[validator_core_1.VALIDATE_ASYNC_KEY] !== undefined:
                    debug$2(`${validator_core_1.VALIDATE_ASYNC_KEY} ---->`, _input);
                    return (0, validator_core_1.constructRuleCb)(propName, _input[validator_core_1.VALIDATE_ASYNC_KEY], pluginName);
                default:
                    throw new general_exception_1.default(`unable to find rule for ${propName},
            we expect ${validator_core_1.PLUGIN_KEY}, ${validator_core_1.VALIDATE_KEY} or ${validator_core_1.VALIDATE_ASYNC_KEY}`);
            }
        });
    }
    /** wrapper methods for ValidatorPlugins */
    _lookupPlugin(input, propName) {
        // @TODO we should allow validator to use standalone without the plugin system
        // so when this plugin instance object is undefined we should skip it
        try {
            if (this._validatorPluginsInstance) {
                debug$2('_lookupPlugin --->', input, propName);
                return this._validatorPluginsInstance.lookupPlugin(input, propName);
            }
        }
        catch (e) {
            // @NOTE because the lookupPlugin method actually throw errors but we don't want
            // to crash it
            debug$2('catch _lookupPlugin error', e);
        }
        return (0, validator_core_1.constructRuleCb)(propName, () => tslib_1$2.__awaiter(this, void 0, void 0, function* () { return Promise.reject(false); }), 'NO_PLUGIN_DUMMY_FUNCTION');
    }
}
validatorBase.ValidatorBase = ValidatorBase;

Object.defineProperty(validatorFactory, "__esModule", { value: true });
var Validator_1 = validatorFactory.Validator = void 0;
const tslib_1$1 = require$$0;
const validator_base_1 = validatorBase;
const validator_plugins_1$1 = validatorPlugins;
const fn_1 = fn;
const constants_1$1 = constants$1;
const debug_1$1 = tslib_1$1.__importDefault(requireSrc());
const debug$1 = (0, debug_1$1.default)('jsonql:validator:class:index');
// main
class Validator extends validator_base_1.ValidatorBase {
    /**
      this is now change to accept an instance of ValidatorPlugins (share)
      if only call it with the astMap then it init it as a standalone like before
    */
    constructor(astMap, vp) {
        super(astMap, vp && vp instanceof validator_plugins_1$1.ValidatorPlugins ? vp : new validator_plugins_1$1.ValidatorPlugins(-1));
    }
    /** this is override the parent validate method with addtitional process for result */
    validate(values, returnAs = constants_1$1.RETURN_AS_ARR) {
        const _super = Object.create(null, {
            validate: { get: () => super.validate }
        });
        return tslib_1$1.__awaiter(this, void 0, void 0, function* () {
            // call the parent validate method
            return _super.validate.call(this, values)
                .then((result) => {
                switch (returnAs) {
                    case constants_1$1.RETURN_AS_RAW:
                        return result;
                    case constants_1$1.RETURN_AS_ARR:
                        return this._prepareValidateResultForFuncCall(result);
                    case constants_1$1.RETURN_AS_OBJ:
                    default:
                        return this._prepareValidateResultAsObject(result);
                }
            });
        });
    }
    /** wrapper for the plugin instance register plugin method */
    registerPlugin(name, plugin) {
        if (this._validatorPluginsInstance) {
            this._validatorPluginsInstance.registerPlugin(name, plugin);
        }
    }
    /** After the validation the success will get an object with
    argumentName: value object and we make it to an array matching
    the order of the call, then we can pass it directly to method that
    get validated */
    _prepareValidateResultForFuncCall(validateResult) {
        return tslib_1$1.__awaiter(this, void 0, void 0, function* () {
            debug$1('validateResult return as array', this._arguments, validateResult);
            // @TODO need to fix the spread input type return result
            return (0, fn_1.processValidateResultsAsArr)(this._arguments, validateResult);
        });
    }
    /** prepare the validation result as key value pair */
    _prepareValidateResultAsObject(validateResult) {
        return tslib_1$1.__awaiter(this, void 0, void 0, function* () {
            debug$1('validateResult return as object', this._arguments, validateResult);
            return (0, fn_1.processValidateResultsAsObj)(this._arguments, validateResult);
        });
    }
}
Validator_1 = validatorFactory.Validator = Validator;

var index_d = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get Validator () { return Validator_1; },
  get SPREAD_ARG_TYPE () { return SPREAD_ARG_TYPE; },
  get TS_UNION_TYPE () { return TS_UNION_TYPE; },
  get TS_ARRAY_TYPE () { return TS_ARRAY_TYPE; },
  get DEFAULT_VALUE () { return DEFAULT_VALUE; },
  get TS_TYPE_LIT () { return TS_TYPE_LIT; },
  get TS_TYPE_REF () { return TS_TYPE_REF; },
  get TS_TYPE_NAME () { return TS_TYPE_NAME; },
  get RETURN_AS_OBJ () { return RETURN_AS_OBJ; },
  get RETURN_AS_ARR () { return RETURN_AS_ARR; },
  get RETURN_AS_RAW () { return RETURN_AS_RAW; }
});

var require$$1 = /*@__PURE__*/getAugmentedNamespace(index_d);

var externalPluginLoader = {};

Object.defineProperty(externalPluginLoader, "__esModule", { value: true });
externalPluginLoader.ExternalPluginLoader = void 0;
// Use this when loading external plugins
const validator_plugins_1 = validatorPlugins;
// main
class ExternalPluginLoader extends validator_plugins_1.ValidatorPlugins {
    /** main method */
    registerExternalPlugin(name, pluginConfig) {
        this._registerExternalPlugin(name, pluginConfig);
    }
}
externalPluginLoader.ExternalPluginLoader = ExternalPluginLoader;

var cloneDeep = {};

var hasRequiredCloneDeep;

function requireCloneDeep () {
	if (hasRequiredCloneDeep) return cloneDeep;
	hasRequiredCloneDeep = 1;
	Object.defineProperty(cloneDeep, "__esModule", { value: true });
	cloneDeep.cloneDeep = void 0;
	const cloneDeep$1 = (obj) => JSON.parse(JSON.stringify(obj));
	cloneDeep.cloneDeep = cloneDeep$1;
	return cloneDeep;
}

var constants = {};

var hasRequiredConstants;

function requireConstants () {
	if (hasRequiredConstants) return constants;
	hasRequiredConstants = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		exports.SCHEMA_KEY = exports.RULES_KEY = void 0;
		var constants_1 = requireConstants$1();
		Object.defineProperty(exports, "RULES_KEY", { enumerable: true, get: function () { return constants_1.RULES_KEY; } });
		exports.SCHEMA_KEY = 'schema';
} (constants));
	return constants;
}

Object.defineProperty(validators, "__esModule", { value: true });
validators.Validators = void 0;
const tslib_1 = require$$0;
const validator_1 = require$$1;
const external_plugin_loader_1 = externalPluginLoader;
const validation_error_1 = tslib_1.__importDefault(requireValidationError());
const common_1 = common$2;
const clone_deep_1 = requireCloneDeep();
const constants_1 = requireConstants();
const debug_1 = tslib_1.__importDefault(requireSrc());
const debug = (0, debug_1.default)('velocejs:validator:main');
/**
  Instead of one ast per init
   we now pass the entire ast here
   then get it back via the propertyName
**/
class Validators {
    /** main */
    constructor(astMap) {
        this._validationRules = new Map();
        this._validators = new Map();
        this._plugin = new external_plugin_loader_1.ExternalPluginLoader();
        this._astMap = (0, clone_deep_1.cloneDeep)(astMap);
        for (const propertyName in this._astMap) {
            this._validators.set(propertyName, new validator_1.Validator(this._astMap[propertyName], this._plugin));
        }
    }
    /** get the validator */
    getValidator(propertyName) {
        if (this._validators.has(propertyName)) {
            const obj = this._validators.get(propertyName);
            // overload the method here
            return {
                addValidationRules: this._addValidationRules(propertyName, obj),
                validate: obj.validate.bind(obj),
                // for skipping the validation and just prepare the values
                prepareArgValues: obj.prepareArgValues.bind(obj)
            };
        }
        throw new validation_error_1.default(`${propertyName} validator is not registered!`);
    }
    /** directly call the addValidationRules with the propertyName */
    addRules(propertyName, rules) {
        const val = this.getValidator(propertyName);
        val.addValidationRules(rules);
        return val; // we return the validator to use
    }
    /** wrapper for ValidatorPlugin registerPlugin method */
    registerPlugin(name, pluginConfig) {
        // this._appendRules(name, pluginConfig)
        this._plugin.registerPlugin(name, pluginConfig);
    }
    /** export for contract */
    export() {
        const schema = {};
        this._validationRules.forEach((value, propName) => {
            const obj = this._validators.get(propName);
            schema[propName] = { [constants_1.RULES_KEY]: value, [constants_1.SCHEMA_KEY]: obj[constants_1.SCHEMA_KEY] };
        });
        debug('export schema', schema);
        const plugins = this._plugin.export();
        debug('plugin configs', plugins);
        return { schema, plugins };
    }
    /** check if this rule (plugin) can export to the public */
    checkRuleCanExport(plugins) {
        const externals = plugins.filter((plugin) => plugin.external)
            .map((plugin) => plugin.name);
        debug('available externals', externals);
        // return a method for checking
        return (rule) => {
            const { plugin } = rule;
            if (plugin) {
                debug('check plugin can export', plugin);
                return this._plugin.isBuiltIn(plugin) || externals.includes(plugin);
            }
            return false;
        };
    }
    /*
    @TODO
    When to add
    1. when a rule is add we check if this is internal plugin and not mark as `server`
    2. When a rule is insert via loadExtPlugin and the original plugin was not mark as server
  
    IDEA
    we could extract the inline code and store it in file (or just in memeory)
    and insert a new url (e.g. /veloce/plugin) then serve it up to the client
    */
    /** store the rules for later export */
    _appendRules(propertyName, input) {
        if (this._validationRules.has(propertyName)) {
            const existingRules = this._validationRules.get(propertyName);
            for (const propName in existingRules) {
                if (input[propName]) {
                    // we are going to just store everything and let the contract decided what to pick
                    existingRules[propName] = existingRules[propName].concat((0, common_1.toArray)(input[propName]));
                }
            }
            this._validationRules.set(propertyName, existingRules);
        }
        else {
            const cleanInput = {};
            for (const argName in input) {
                cleanInput[argName] = (0, common_1.toArray)(input[argName]);
            }
            debug('adding new rule', input, cleanInput);
            this._validationRules.set(propertyName, cleanInput);
        }
    }
    /** overload the Validator addValidationRules */
    _addValidationRules(propertyName, obj) {
        // @NOTE found a problem here, if we put in the wrong format { name, plugin }
        // instead of { argName: {plugin}} the editor won't warn this error
        // and it cause all kinds of problem
        return (input) => {
            const _input = this._checkInput(input);
            this._appendRules(propertyName, _input);
            return Reflect.apply(obj.addValidationRules, obj, [_input]);
        };
    }
    /** just to make sure the ValidationRuleRecord is correct */
    _checkInput(input) {
        const { name } = input;
        if (name) {
            const _input = (0, clone_deep_1.cloneDeep)(input);
            delete _input.name;
            return { [name]: _input };
        }
        return input;
    }
}
validators.Validators = Validators;

Object.defineProperty(validatorsClient, "__esModule", { value: true });
var ValidatorsClient_1 = validatorsClient.ValidatorsClient = void 0;
const validators_1 = validators;
/**
  Here we take the parent methods and onlly deal with the
  generate files / contract
**/
class ValidatorsClient extends validators_1.Validators {
    /** main */
    constructor(astMap) {
        super(astMap);
    }
    /** On the client side we don't need a map */
    registerPlugins(pluginConfigs) {
        for (const name in pluginConfigs) {
            const config = pluginConfigs[name];
            this.registerPlugin(name, config);
        }
    }
}
ValidatorsClient_1 = validatorsClient.ValidatorsClient = ValidatorsClient;

// main
class BaseClient {
    /** init the validators instance */ _prepareValidators(contract) {
        return new ValidatorsClient_1(object$1.arrToObj(contract.data, (data)=>({
                [data.name]: data.params
            })));
    }
    /**
  create the validator, now there will be a new field validate to indicate if
  this api actually need to validation
   */ _getValidatorFn(entry) {
        const validator = this._validators.getValidator(entry.name);
        if (entry.params && entry.validate === true) {
            const rules = object$1.arrToObj(entry.params, (params)=>params.rules ? {
                    [params.name]: params.rules
                } : {});
            validator.addValidationRules(rules);
            const fn = 'validate';
            return ({
                [fn]: async (args)=>Reflect.apply(validator.validate, validator, [
                        args,
                        RETURN_AS_OBJ$1
                    ])
            })[fn];
        } else if (entry.validate === false) {
            const fn = 'notValidate';
            return ({
                [fn]: async (args)=>Reflect.apply(validator.prepareArgValues, validator, [
                        args
                    ])
            })[fn];
        }
        // everything else
        const fn = 'dummy';
        return ({
            [fn]: async ()=>[]
        })[fn];
    }
    constructor(contract, _host = '/'){
        this._host = _host;
        this._validators = this._prepareValidators(contract);
    }
}

// main
class HttpClient extends BaseClient {
    /** The one method to handle all the method calls */ async comm(propertyName, params) {
        return Reflect.apply(this[propertyName], this, params || []);
    }
    /** wrap all the construct class member in one */ _mapMethod(entry) {
        const { name , type  } = entry;
        if (type === WEBSOCKET_METHOD) {
            return; // skip it
        }
        const validateFn = this._getValidatorFn(entry);
        // create the function as seen in
        // https://stackoverflow.com/questions/5905492/dynamic-function-name-in-javascript
        // its not amazing but at least we can see the name in console.log
        // @TODO how to pass the type info to the arguments
        this[name] = ({
            [name]: async function(...args) {
                // console.log('pass the arguments', args, 'to call', entry)
                // set validator
                return validateFn(args).then((result)=>this._executeHttpCall(entry, result));
            }
        })[name];
    }
    /** create the http calls, it was a private but keep having this method is declare but not read?
  warning - which stop the compiler but its read - see above!
  */ _executeHttpCall(entry, args) {
        const httpOpts = {
            url: [
                this._host,
                prepareUrl(entry, args)
            ].join('')
        };
        if (entry.type !== DEFAULT_REQUEST_METHOD) {
            httpOpts.method = entry.type;
            httpOpts.payload = args;
        }
        // console.log('httpOpts', httpOpts, args)
        // now call fetch
        return this._httpMethod(httpOpts);
    }
    constructor(contract, _httpMethod, _host = ''){
        super(contract, _host);
        this._httpMethod = _httpMethod;
        this._host = _host;
        contract.data.forEach((entry)=>{
            this._mapMethod(entry);
        });
    }
}

// separate client for websocket because the interface is completely different
class WsClient {
}

exports.HttpClient = HttpClient;
exports.WsClient = WsClient;
