import Image from '@fta/components-rn/dist/components/Image'
import Input from '@fta/components-rn/dist/components/Input'
import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import React, {
  createContext,
  useContext,
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
  useEffect,
  Fragment,
} from 'react'
import { isString, Assets, inRN, useEnhancedState, inDev, isUndef, isArray } from '../common'
import {
  StyleSheet,
  Modal,
  findNodeHandle,
  UIManager,
  Platform,
  Animated,
  View as View$1,
  ScrollView as ScrollView$1,
} from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'
import { TouchableOpacity } from '../view'
import PropTypes from 'prop-types'

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {}
  var target = {}
  var sourceKeys = Object.keys(source)
  var key, i
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i]
    if (excluded.indexOf(key) >= 0) continue
    target[key] = source[key]
  }
  return target
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {}
  var target = _objectWithoutPropertiesLoose(source, excluded)
  var key, i
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source)
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i]
      if (excluded.indexOf(key) >= 0) continue
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue
      target[key] = source[key]
    }
  }
  return target
}

function _extends$1() {
  _extends$1 =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key]
          }
        }
      }
      return target
    }
  return _extends$1.apply(this, arguments)
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }
  return obj
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr
}

function _iterableToArrayLimit(arr, i) {
  var _i =
    arr == null
      ? null
      : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) || arr['@@iterator']
  if (_i == null) return
  var _arr = []
  var _n = true
  var _d = false
  var _s, _e
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value)
      if (i && _arr.length === i) break
    }
  } catch (err) {
    _d = true
    _e = err
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']()
    } finally {
      if (_d) throw _e
    }
  }
  return _arr
}

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i]
  }
  return arr2
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return
  if (typeof o === 'string') return _arrayLikeToArray$1(o, minLen)
  var n = Object.prototype.toString.call(o).slice(8, -1)
  if (n === 'Object' && o.constructor) n = o.constructor.name
  if (n === 'Map' || n === 'Set') return Array.from(o)
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$1(o, minLen)
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  )
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray$1(arr, i) ||
    _nonIterableRest()
  )
}

var runtime = { exports: {} }

;(function (module) {
  var runtime = (function (exports) {
    var Op = Object.prototype
    var hasOwn = Op.hasOwnProperty
    var undefined$1
    var $Symbol = typeof Symbol === 'function' ? Symbol : {}
    var iteratorSymbol = $Symbol.iterator || '@@iterator'
    var asyncIteratorSymbol = $Symbol.asyncIterator || '@@asyncIterator'
    var toStringTagSymbol = $Symbol.toStringTag || '@@toStringTag'
    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      })
      return obj[key]
    }
    try {
      define({}, '')
    } catch (err) {
      define = function define(obj, key, value) {
        return (obj[key] = value)
      }
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator
      var generator = Object.create(protoGenerator.prototype)
      var context = new Context(tryLocsList || [])
      generator._invoke = makeInvokeMethod(innerFn, self, context)
      return generator
    }
    exports.wrap = wrap
    function tryCatch(fn, obj, arg) {
      try {
        return { type: 'normal', arg: fn.call(obj, arg) }
      } catch (err) {
        return { type: 'throw', arg: err }
      }
    }
    var GenStateSuspendedStart = 'suspendedStart'
    var GenStateSuspendedYield = 'suspendedYield'
    var GenStateExecuting = 'executing'
    var GenStateCompleted = 'completed'
    var ContinueSentinel = {}
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {}
    define(IteratorPrototype, iteratorSymbol, function () {
      return this
    })
    var getProto = Object.getPrototypeOf
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])))
    if (
      NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)
    ) {
      IteratorPrototype = NativeIteratorPrototype
    }
    var Gp =
      (GeneratorFunctionPrototype.prototype =
      Generator.prototype =
        Object.create(IteratorPrototype))
    GeneratorFunction.prototype = GeneratorFunctionPrototype
    define(Gp, 'constructor', GeneratorFunctionPrototype)
    define(GeneratorFunctionPrototype, 'constructor', GeneratorFunction)
    GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      'GeneratorFunction'
    )
    function defineIteratorMethods(prototype) {
      ;['next', 'throw', 'return'].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg)
        })
      })
    }
    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === 'function' && genFun.constructor
      return ctor
        ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === 'GeneratorFunction'
        : false
    }
    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype)
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype
        define(genFun, toStringTagSymbol, 'GeneratorFunction')
      }
      genFun.prototype = Object.create(Gp)
      return genFun
    }
    exports.awrap = function (arg) {
      return { __await: arg }
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg)
        if (record.type === 'throw') {
          reject(record.arg)
        } else {
          var result = record.arg
          var value = result.value
          if (value && typeof value === 'object' && hasOwn.call(value, '__await')) {
            return PromiseImpl.resolve(value.__await).then(
              function (value) {
                invoke('next', value, resolve, reject)
              },
              function (err) {
                invoke('throw', err, resolve, reject)
              }
            )
          }
          return PromiseImpl.resolve(value).then(
            function (unwrapped) {
              result.value = unwrapped
              resolve(result)
            },
            function (error) {
              return invoke('throw', error, resolve, reject)
            }
          )
        }
      }
      var previousPromise
      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject)
          })
        }
        return (previousPromise = previousPromise
          ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg)
          : callInvokeWithMethodAndArg())
      }
      this._invoke = enqueue
    }
    defineIteratorMethods(AsyncIterator.prototype)
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this
    })
    exports.AsyncIterator = AsyncIterator
    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl)
      return exports.isGeneratorFunction(outerFn)
        ? iter
        : iter.next().then(function (result) {
            return result.done ? result.value : iter.next()
          })
    }
    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error('Generator is already running')
        }
        if (state === GenStateCompleted) {
          if (method === 'throw') {
            throw arg
          }
          return doneResult()
        }
        context.method = method
        context.arg = arg
        while (true) {
          var delegate = context.delegate
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context)
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue
              return delegateResult
            }
          }
          if (context.method === 'next') {
            context.sent = context._sent = context.arg
          } else if (context.method === 'throw') {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted
              throw context.arg
            }
            context.dispatchException(context.arg)
          } else if (context.method === 'return') {
            context.abrupt('return', context.arg)
          }
          state = GenStateExecuting
          var record = tryCatch(innerFn, self, context)
          if (record.type === 'normal') {
            state = context.done ? GenStateCompleted : GenStateSuspendedYield
            if (record.arg === ContinueSentinel) {
              continue
            }
            return { value: record.arg, done: context.done }
          } else if (record.type === 'throw') {
            state = GenStateCompleted
            context.method = 'throw'
            context.arg = record.arg
          }
        }
      }
    }
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method]
      if (method === undefined$1) {
        context.delegate = null
        if (context.method === 'throw') {
          if (delegate.iterator['return']) {
            context.method = 'return'
            context.arg = undefined$1
            maybeInvokeDelegate(delegate, context)
            if (context.method === 'throw') {
              return ContinueSentinel
            }
          }
          context.method = 'throw'
          context.arg = new TypeError("The iterator does not provide a 'throw' method")
        }
        return ContinueSentinel
      }
      var record = tryCatch(method, delegate.iterator, context.arg)
      if (record.type === 'throw') {
        context.method = 'throw'
        context.arg = record.arg
        context.delegate = null
        return ContinueSentinel
      }
      var info = record.arg
      if (!info) {
        context.method = 'throw'
        context.arg = new TypeError('iterator result is not an object')
        context.delegate = null
        return ContinueSentinel
      }
      if (info.done) {
        context[delegate.resultName] = info.value
        context.next = delegate.nextLoc
        if (context.method !== 'return') {
          context.method = 'next'
          context.arg = undefined$1
        }
      } else {
        return info
      }
      context.delegate = null
      return ContinueSentinel
    }
    defineIteratorMethods(Gp)
    define(Gp, toStringTagSymbol, 'Generator')
    define(Gp, iteratorSymbol, function () {
      return this
    })
    define(Gp, 'toString', function () {
      return '[object Generator]'
    })
    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] }
      if (1 in locs) {
        entry.catchLoc = locs[1]
      }
      if (2 in locs) {
        entry.finallyLoc = locs[2]
        entry.afterLoc = locs[3]
      }
      this.tryEntries.push(entry)
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {}
      record.type = 'normal'
      delete record.arg
      entry.completion = record
    }
    function Context(tryLocsList) {
      this.tryEntries = [{ tryLoc: 'root' }]
      tryLocsList.forEach(pushTryEntry, this)
      this.reset(true)
    }
    exports.keys = function (object) {
      var keys = []
      for (var key in object) {
        keys.push(key)
      }
      keys.reverse()
      return function next() {
        while (keys.length) {
          var key = keys.pop()
          if (key in object) {
            next.value = key
            next.done = false
            return next
          }
        }
        next.done = true
        return next
      }
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol]
        if (iteratorMethod) {
          return iteratorMethod.call(iterable)
        }
        if (typeof iterable.next === 'function') {
          return iterable
        }
        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              while (++i < iterable.length) {
                if (hasOwn.call(iterable, i)) {
                  next.value = iterable[i]
                  next.done = false
                  return next
                }
              }
              next.value = undefined$1
              next.done = true
              return next
            }
          return (next.next = next)
        }
      }
      return { next: doneResult }
    }
    exports.values = values
    function doneResult() {
      return { value: undefined$1, done: true }
    }
    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0
        this.next = 0
        this.sent = this._sent = undefined$1
        this.done = false
        this.delegate = null
        this.method = 'next'
        this.arg = undefined$1
        this.tryEntries.forEach(resetTryEntry)
        if (!skipTempReset) {
          for (var name in this) {
            if (name.charAt(0) === 't' && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1
            }
          }
        }
      },
      stop: function stop() {
        this.done = true
        var rootEntry = this.tryEntries[0]
        var rootRecord = rootEntry.completion
        if (rootRecord.type === 'throw') {
          throw rootRecord.arg
        }
        return this.rval
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception
        }
        var context = this
        function handle(loc, caught) {
          record.type = 'throw'
          record.arg = exception
          context.next = loc
          if (caught) {
            context.method = 'next'
            context.arg = undefined$1
          }
          return !!caught
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i]
          var record = entry.completion
          if (entry.tryLoc === 'root') {
            return handle('end')
          }
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, 'catchLoc')
            var hasFinally = hasOwn.call(entry, 'finallyLoc')
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true)
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc)
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true)
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc)
              }
            } else {
              throw new Error('try statement without catch or finally')
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i]
          if (
            entry.tryLoc <= this.prev &&
            hasOwn.call(entry, 'finallyLoc') &&
            this.prev < entry.finallyLoc
          ) {
            var finallyEntry = entry
            break
          }
        }
        if (
          finallyEntry &&
          (type === 'break' || type === 'continue') &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc
        ) {
          finallyEntry = null
        }
        var record = finallyEntry ? finallyEntry.completion : {}
        record.type = type
        record.arg = arg
        if (finallyEntry) {
          this.method = 'next'
          this.next = finallyEntry.finallyLoc
          return ContinueSentinel
        }
        return this.complete(record)
      },
      complete: function complete(record, afterLoc) {
        if (record.type === 'throw') {
          throw record.arg
        }
        if (record.type === 'break' || record.type === 'continue') {
          this.next = record.arg
        } else if (record.type === 'return') {
          this.rval = this.arg = record.arg
          this.method = 'return'
          this.next = 'end'
        } else if (record.type === 'normal' && afterLoc) {
          this.next = afterLoc
        }
        return ContinueSentinel
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i]
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc)
            resetTryEntry(entry)
            return ContinueSentinel
          }
        }
      },
      catch: function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i]
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion
            if (record.type === 'throw') {
              var thrown = record.arg
              resetTryEntry(entry)
            }
            return thrown
          }
        }
        throw new Error('illegal catch attempt')
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }
        if (this.method === 'next') {
          this.arg = undefined$1
        }
        return ContinueSentinel
      },
    }
    return exports
  })(module.exports)
  try {
    regeneratorRuntime = runtime
  } catch (accidentalStrictMode) {
    if (typeof globalThis === 'object') {
      globalThis.regeneratorRuntime = runtime
    } else {
      Function('r', 'regeneratorRuntime = r')(runtime)
    }
  }
})(runtime)

var regenerator = runtime.exports

function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key]
          }
        }
      }
      return target
    }
  return _extends.apply(this, arguments)
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype)
  subClass.prototype.constructor = subClass
  _setPrototypeOf$1(subClass, superClass)
}
function _getPrototypeOf$1(o) {
  _getPrototypeOf$1 = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
      }
  return _getPrototypeOf$1(o)
}
function _setPrototypeOf$1(o, p) {
  _setPrototypeOf$1 =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p
      return o
    }
  return _setPrototypeOf$1(o, p)
}
function _isNativeReflectConstruct$3() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false
  if (Reflect.construct.sham) return false
  if (typeof Proxy === 'function') return true
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}))
    return true
  } catch (e) {
    return false
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct$3()) {
    _construct = Reflect.construct
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null]
      a.push.apply(a, args)
      var Constructor = Function.bind.apply(Parent, a)
      var instance = new Constructor()
      if (Class) _setPrototypeOf$1(instance, Class.prototype)
      return instance
    }
  }
  return _construct.apply(null, arguments)
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf('[native code]') !== -1
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === 'function' ? new Map() : undefined
  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class
    if (typeof Class !== 'function') {
      throw new TypeError('Super expression must either be null or a function')
    }
    if (typeof _cache !== 'undefined') {
      if (_cache.has(Class)) return _cache.get(Class)
      _cache.set(Class, Wrapper)
    }
    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf$1(this).constructor)
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true },
    })
    return _setPrototypeOf$1(Wrapper, Class)
  }
  return _wrapNativeSuper(Class)
}
var formatRegExp = /%[sdj%]/g
var warning = function warning() {}
if (
  typeof process !== 'undefined' &&
  process.env &&
  true &&
  typeof window !== 'undefined' &&
  typeof document !== 'undefined'
) {
  warning = function warning(type, errors) {
    if (
      typeof console !== 'undefined' &&
      console.warn &&
      typeof ASYNC_VALIDATOR_NO_WARNING === 'undefined'
    ) {
      if (
        errors.every(function (e) {
          return typeof e === 'string'
        })
      ) {
        console.warn(type, errors)
      }
    }
  }
}
function convertFieldsError(errors) {
  if (!errors || !errors.length) return null
  var fields = {}
  errors.forEach(function (error) {
    var field = error.field
    fields[field] = fields[field] || []
    fields[field].push(error)
  })
  return fields
}
function format(template) {
  for (
    var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1;
    _key < _len;
    _key++
  ) {
    args[_key - 1] = arguments[_key]
  }
  var i = 0
  var len = args.length
  if (typeof template === 'function') {
    return template.apply(null, args)
  }
  if (typeof template === 'string') {
    var str = template.replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%'
      }
      if (i >= len) {
        return x
      }
      switch (x) {
        case '%s':
          return String(args[i++])
        case '%d':
          return Number(args[i++])
        case '%j':
          try {
            return JSON.stringify(args[i++])
          } catch (_) {
            return '[Circular]'
          }
          break
        default:
          return x
      }
    })
    return str
  }
  return template
}
function isNativeStringType(type) {
  return (
    type === 'string' ||
    type === 'url' ||
    type === 'hex' ||
    type === 'email' ||
    type === 'date' ||
    type === 'pattern'
  )
}
function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true
  }
  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true
  }
  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true
  }
  return false
}
function asyncParallelArray(arr, func, callback) {
  var results = []
  var total = 0
  var arrLength = arr.length
  function count(errors) {
    results.push.apply(results, errors || [])
    total++
    if (total === arrLength) {
      callback(results)
    }
  }
  arr.forEach(function (a) {
    func(a, count)
  })
}
function asyncSerialArray(arr, func, callback) {
  var index = 0
  var arrLength = arr.length
  function next(errors) {
    if (errors && errors.length) {
      callback(errors)
      return
    }
    var original = index
    index = index + 1
    if (original < arrLength) {
      func(arr[original], next)
    } else {
      callback([])
    }
  }
  next([])
}
function flattenObjArr(objArr) {
  var ret = []
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k] || [])
  })
  return ret
}
var AsyncValidationError = (function (_Error) {
  _inheritsLoose(AsyncValidationError, _Error)
  function AsyncValidationError(errors, fields) {
    var _this
    _this = _Error.call(this, 'Async Validation Error') || this
    _this.errors = errors
    _this.fields = fields
    return _this
  }
  return AsyncValidationError
})(_wrapNativeSuper(Error))
function asyncMap(objArr, option, func, callback, source) {
  if (option.first) {
    var _pending = new Promise(function (resolve, reject) {
      var next = function next(errors) {
        callback(errors)
        return errors.length
          ? reject(new AsyncValidationError(errors, convertFieldsError(errors)))
          : resolve(source)
      }
      var flattenArr = flattenObjArr(objArr)
      asyncSerialArray(flattenArr, func, next)
    })
    _pending['catch'](function (e) {
      return e
    })
    return _pending
  }
  var firstFields = option.firstFields === true ? Object.keys(objArr) : option.firstFields || []
  var objArrKeys = Object.keys(objArr)
  var objArrLength = objArrKeys.length
  var total = 0
  var results = []
  var pending = new Promise(function (resolve, reject) {
    var next = function next(errors) {
      results.push.apply(results, errors)
      total++
      if (total === objArrLength) {
        callback(results)
        return results.length
          ? reject(new AsyncValidationError(results, convertFieldsError(results)))
          : resolve(source)
      }
    }
    if (!objArrKeys.length) {
      callback(results)
      resolve(source)
    }
    objArrKeys.forEach(function (key) {
      var arr = objArr[key]
      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next)
      } else {
        asyncParallelArray(arr, func, next)
      }
    })
  })
  pending['catch'](function (e) {
    return e
  })
  return pending
}
function isErrorObj(obj) {
  return !!(obj && obj.message !== undefined)
}
function getValue(value, path) {
  var v = value
  for (var i = 0; i < path.length; i++) {
    if (v == undefined) {
      return v
    }
    v = v[path[i]]
  }
  return v
}
function complementError(rule, source) {
  return function (oe) {
    var fieldValue
    if (rule.fullFields) {
      fieldValue = getValue(source, rule.fullFields)
    } else {
      fieldValue = source[oe.field || rule.fullField]
    }
    if (isErrorObj(oe)) {
      oe.field = oe.field || rule.fullField
      oe.fieldValue = fieldValue
      return oe
    }
    return {
      message: typeof oe === 'function' ? oe() : oe,
      fieldValue: fieldValue,
      field: oe.field || rule.fullField,
    }
  }
}
function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s]
        if (typeof value === 'object' && typeof target[s] === 'object') {
          target[s] = _extends({}, target[s], value)
        } else {
          target[s] = value
        }
      }
    }
  }
  return target
}
var required$1 = function required(rule, value, source, errors, options, type) {
  if (
    rule.required &&
    (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))
  ) {
    errors.push(format(options.messages.required, rule.fullField))
  }
}
var whitespace = function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(format(options.messages.whitespace, rule.fullField))
  }
}
var pattern$2 = {
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  url: new RegExp(
    '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
    'i'
  ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i,
}
var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value
  },
  float: function float(value) {
    return types.number(value) && !types.integer(value)
  },
  array: function array(value) {
    return Array.isArray(value)
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true
    }
    try {
      return !!new RegExp(value)
    } catch (e) {
      return false
    }
  },
  date: function date(value) {
    return (
      typeof value.getTime === 'function' &&
      typeof value.getMonth === 'function' &&
      typeof value.getYear === 'function' &&
      !isNaN(value.getTime())
    )
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false
    }
    return typeof value === 'number'
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value)
  },
  method: function method(value) {
    return typeof value === 'function'
  },
  email: function email(value) {
    return typeof value === 'string' && value.length <= 320 && !!value.match(pattern$2.email)
  },
  url: function url(value) {
    return typeof value === 'string' && value.length <= 2048 && !!value.match(pattern$2.url)
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern$2.hex)
  },
}
var type$1 = function type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    required$1(rule, value, source, errors, options)
    return
  }
  var custom = [
    'integer',
    'float',
    'array',
    'regexp',
    'object',
    'method',
    'email',
    'number',
    'date',
    'url',
    'hex',
  ]
  var ruleType = rule.type
  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type))
    }
  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type))
  }
}
var range = function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number'
  var min = typeof rule.min === 'number'
  var max = typeof rule.max === 'number'
  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g
  var val = value
  var key = null
  var num = typeof value === 'number'
  var str = typeof value === 'string'
  var arr = Array.isArray(value)
  if (num) {
    key = 'number'
  } else if (str) {
    key = 'string'
  } else if (arr) {
    key = 'array'
  }
  if (!key) {
    return false
  }
  if (arr) {
    val = value.length
  }
  if (str) {
    val = value.replace(spRegexp, '_').length
  }
  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len))
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min))
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max))
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max))
  }
}
var ENUM$1 = 'enum'
var enumerable$1 = function enumerable(rule, value, source, errors, options) {
  rule[ENUM$1] = Array.isArray(rule[ENUM$1]) ? rule[ENUM$1] : []
  if (rule[ENUM$1].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM$1], rule.fullField, rule[ENUM$1].join(', ')))
  }
}
var pattern$1 = function pattern(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      rule.pattern.lastIndex = 0
      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern))
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern)
      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern))
      }
    }
  }
}
var rules = {
  required: required$1,
  whitespace: whitespace,
  type: type$1,
  range: range,
  enum: enumerable$1,
  pattern: pattern$1,
}
var string = function string(rule, value, callback, source, options) {
  var errors = []
  var validate = rule.required || (!rule.required && source.hasOwnProperty(rule.field))
  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback()
    }
    rules.required(rule, value, source, errors, options, 'string')
    if (!isEmptyValue(value, 'string')) {
      rules.type(rule, value, source, errors, options)
      rules.range(rule, value, source, errors, options)
      rules.pattern(rule, value, source, errors, options)
      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options)
      }
    }
  }
  callback(errors)
}
var method = function method(rule, value, callback, source, options) {
  var errors = []
  var validate = rule.required || (!rule.required && source.hasOwnProperty(rule.field))
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback()
    }
    rules.required(rule, value, source, errors, options)
    if (value !== undefined) {
      rules.type(rule, value, source, errors, options)
    }
  }
  callback(errors)
}
var number = function number(rule, value, callback, source, options) {
  var errors = []
  var validate = rule.required || (!rule.required && source.hasOwnProperty(rule.field))
  if (validate) {
    if (value === '') {
      value = undefined
    }
    if (isEmptyValue(value) && !rule.required) {
      return callback()
    }
    rules.required(rule, value, source, errors, options)
    if (value !== undefined) {
      rules.type(rule, value, source, errors, options)
      rules.range(rule, value, source, errors, options)
    }
  }
  callback(errors)
}
var _boolean = function _boolean(rule, value, callback, source, options) {
  var errors = []
  var validate = rule.required || (!rule.required && source.hasOwnProperty(rule.field))
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback()
    }
    rules.required(rule, value, source, errors, options)
    if (value !== undefined) {
      rules.type(rule, value, source, errors, options)
    }
  }
  callback(errors)
}
var regexp = function regexp(rule, value, callback, source, options) {
  var errors = []
  var validate = rule.required || (!rule.required && source.hasOwnProperty(rule.field))
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback()
    }
    rules.required(rule, value, source, errors, options)
    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options)
    }
  }
  callback(errors)
}
var integer = function integer(rule, value, callback, source, options) {
  var errors = []
  var validate = rule.required || (!rule.required && source.hasOwnProperty(rule.field))
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback()
    }
    rules.required(rule, value, source, errors, options)
    if (value !== undefined) {
      rules.type(rule, value, source, errors, options)
      rules.range(rule, value, source, errors, options)
    }
  }
  callback(errors)
}
var floatFn = function floatFn(rule, value, callback, source, options) {
  var errors = []
  var validate = rule.required || (!rule.required && source.hasOwnProperty(rule.field))
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback()
    }
    rules.required(rule, value, source, errors, options)
    if (value !== undefined) {
      rules.type(rule, value, source, errors, options)
      rules.range(rule, value, source, errors, options)
    }
  }
  callback(errors)
}
var array = function array(rule, value, callback, source, options) {
  var errors = []
  var validate = rule.required || (!rule.required && source.hasOwnProperty(rule.field))
  if (validate) {
    if ((value === undefined || value === null) && !rule.required) {
      return callback()
    }
    rules.required(rule, value, source, errors, options, 'array')
    if (value !== undefined && value !== null) {
      rules.type(rule, value, source, errors, options)
      rules.range(rule, value, source, errors, options)
    }
  }
  callback(errors)
}
var object = function object(rule, value, callback, source, options) {
  var errors = []
  var validate = rule.required || (!rule.required && source.hasOwnProperty(rule.field))
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback()
    }
    rules.required(rule, value, source, errors, options)
    if (value !== undefined) {
      rules.type(rule, value, source, errors, options)
    }
  }
  callback(errors)
}
var ENUM = 'enum'
var enumerable = function enumerable(rule, value, callback, source, options) {
  var errors = []
  var validate = rule.required || (!rule.required && source.hasOwnProperty(rule.field))
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback()
    }
    rules.required(rule, value, source, errors, options)
    if (value !== undefined) {
      rules[ENUM](rule, value, source, errors, options)
    }
  }
  callback(errors)
}
var pattern = function pattern(rule, value, callback, source, options) {
  var errors = []
  var validate = rule.required || (!rule.required && source.hasOwnProperty(rule.field))
  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback()
    }
    rules.required(rule, value, source, errors, options)
    if (!isEmptyValue(value, 'string')) {
      rules.pattern(rule, value, source, errors, options)
    }
  }
  callback(errors)
}
var date = function date(rule, value, callback, source, options) {
  var errors = []
  var validate = rule.required || (!rule.required && source.hasOwnProperty(rule.field))
  if (validate) {
    if (isEmptyValue(value, 'date') && !rule.required) {
      return callback()
    }
    rules.required(rule, value, source, errors, options)
    if (!isEmptyValue(value, 'date')) {
      var dateObject
      if (value instanceof Date) {
        dateObject = value
      } else {
        dateObject = new Date(value)
      }
      rules.type(rule, dateObject, source, errors, options)
      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options)
      }
    }
  }
  callback(errors)
}
var required = function required(rule, value, callback, source, options) {
  var errors = []
  var type = Array.isArray(value) ? 'array' : typeof value
  rules.required(rule, value, source, errors, options, type)
  callback(errors)
}
var type = function type(rule, value, callback, source, options) {
  var ruleType = rule.type
  var errors = []
  var validate = rule.required || (!rule.required && source.hasOwnProperty(rule.field))
  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback()
    }
    rules.required(rule, value, source, errors, options, ruleType)
    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options)
    }
  }
  callback(errors)
}
var any = function any(rule, value, callback, source, options) {
  var errors = []
  var validate = rule.required || (!rule.required && source.hasOwnProperty(rule.field))
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback()
    }
    rules.required(rule, value, source, errors, options)
  }
  callback(errors)
}
var validators = {
  string: string,
  method: method,
  number: number,
  boolean: _boolean,
  regexp: regexp,
  integer: integer,
  float: floatFn,
  array: array,
  object: object,
  enum: enumerable,
  pattern: pattern,
  date: date,
  url: type,
  hex: type,
  email: type,
  required: required,
  any: any,
}
function newMessages() {
  return {
    default: 'Validation error on field %s',
    required: '%s is required',
    enum: '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid',
    },
    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      boolean: '%s is not a %s',
      integer: '%s is not an %s',
      float: '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s',
    },
    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters',
    },
    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s',
    },
    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length',
    },
    pattern: { mismatch: '%s value %s does not match pattern %s' },
    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this))
      cloned.clone = this.clone
      return cloned
    },
  }
}
var messages = newMessages()
var Schema = (function () {
  function Schema(descriptor) {
    this.rules = null
    this._messages = messages
    this.define(descriptor)
  }
  var _proto = Schema.prototype
  _proto.define = function define(rules) {
    var _this = this
    if (!rules) {
      throw new Error('Cannot configure a schema with no rules')
    }
    if (typeof rules !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object')
    }
    this.rules = {}
    Object.keys(rules).forEach(function (name) {
      var item = rules[name]
      _this.rules[name] = Array.isArray(item) ? item : [item]
    })
  }
  _proto.messages = function messages(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages)
    }
    return this._messages
  }
  _proto.validate = function validate(source_, o, oc) {
    var _this2 = this
    if (o === void 0) {
      o = {}
    }
    if (oc === void 0) {
      oc = function oc() {}
    }
    var source = source_
    var options = o
    var callback = oc
    if (typeof options === 'function') {
      callback = options
      options = {}
    }
    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback(null, source)
      }
      return Promise.resolve(source)
    }
    function complete(results) {
      var errors = []
      var fields = {}
      function add(e) {
        if (Array.isArray(e)) {
          var _errors
          errors = (_errors = errors).concat.apply(_errors, e)
        } else {
          errors.push(e)
        }
      }
      for (var i = 0; i < results.length; i++) {
        add(results[i])
      }
      if (!errors.length) {
        callback(null, source)
      } else {
        fields = convertFieldsError(errors)
        callback(errors, fields)
      }
    }
    if (options.messages) {
      var messages$1 = this.messages()
      if (messages$1 === messages) {
        messages$1 = newMessages()
      }
      deepMerge(messages$1, options.messages)
      options.messages = messages$1
    } else {
      options.messages = this.messages()
    }
    var series = {}
    var keys = options.keys || Object.keys(this.rules)
    keys.forEach(function (z) {
      var arr = _this2.rules[z]
      var value = source[z]
      arr.forEach(function (r) {
        var rule = r
        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = _extends({}, source)
          }
          value = source[z] = rule.transform(value)
        }
        if (typeof rule === 'function') {
          rule = { validator: rule }
        } else {
          rule = _extends({}, rule)
        }
        rule.validator = _this2.getValidationMethod(rule)
        if (!rule.validator) {
          return
        }
        rule.field = z
        rule.fullField = rule.fullField || z
        rule.type = _this2.getType(rule)
        series[z] = series[z] || []
        series[z].push({ rule: rule, value: value, source: source, field: z })
      })
    })
    var errorFields = {}
    return asyncMap(
      series,
      options,
      function (data, doIt) {
        var rule = data.rule
        var deep =
          (rule.type === 'object' || rule.type === 'array') &&
          (typeof rule.fields === 'object' || typeof rule.defaultField === 'object')
        deep = deep && (rule.required || (!rule.required && data.value))
        rule.field = data.field
        function addFullField(key, schema) {
          return _extends({}, schema, {
            fullField: rule.fullField + '.' + key,
            fullFields: rule.fullFields ? [].concat(rule.fullFields, [key]) : [key],
          })
        }
        function cb(e) {
          if (e === void 0) {
            e = []
          }
          var errorList = Array.isArray(e) ? e : [e]
          if (!options.suppressWarning && errorList.length) {
            Schema.warning('async-validator:', errorList)
          }
          if (errorList.length && rule.message !== undefined) {
            errorList = [].concat(rule.message)
          }
          var filledErrors = errorList.map(complementError(rule, source))
          if (options.first && filledErrors.length) {
            errorFields[rule.field] = 1
            return doIt(filledErrors)
          }
          if (!deep) {
            doIt(filledErrors)
          } else {
            if (rule.required && !data.value) {
              if (rule.message !== undefined) {
                filledErrors = [].concat(rule.message).map(complementError(rule, source))
              } else if (options.error) {
                filledErrors = [options.error(rule, format(options.messages.required, rule.field))]
              }
              return doIt(filledErrors)
            }
            var fieldsSchema = {}
            if (rule.defaultField) {
              Object.keys(data.value).map(function (key) {
                fieldsSchema[key] = rule.defaultField
              })
            }
            fieldsSchema = _extends({}, fieldsSchema, data.rule.fields)
            var paredFieldsSchema = {}
            Object.keys(fieldsSchema).forEach(function (field) {
              var fieldSchema = fieldsSchema[field]
              var fieldSchemaList = Array.isArray(fieldSchema) ? fieldSchema : [fieldSchema]
              paredFieldsSchema[field] = fieldSchemaList.map(addFullField.bind(null, field))
            })
            var schema = new Schema(paredFieldsSchema)
            schema.messages(options.messages)
            if (data.rule.options) {
              data.rule.options.messages = options.messages
              data.rule.options.error = options.error
            }
            schema.validate(data.value, data.rule.options || options, function (errs) {
              var finalErrors = []
              if (filledErrors && filledErrors.length) {
                finalErrors.push.apply(finalErrors, filledErrors)
              }
              if (errs && errs.length) {
                finalErrors.push.apply(finalErrors, errs)
              }
              doIt(finalErrors.length ? finalErrors : null)
            })
          }
        }
        var res
        if (rule.asyncValidator) {
          res = rule.asyncValidator(rule, data.value, cb, data.source, options)
        } else if (rule.validator) {
          try {
            res = rule.validator(rule, data.value, cb, data.source, options)
          } catch (error) {
            console.error == null ? void 0 : console.error(error)
            setTimeout(function () {
              throw error
            }, 0)
            cb(error.message)
          }
          if (res === true) {
            cb()
          } else if (res === false) {
            cb(
              typeof rule.message === 'function'
                ? rule.message(rule.fullField || rule.field)
                : rule.message || (rule.fullField || rule.field) + ' fails'
            )
          } else if (res instanceof Array) {
            cb(res)
          } else if (res instanceof Error) {
            cb(res.message)
          }
        }
        if (res && res.then) {
          res.then(
            function () {
              return cb()
            },
            function (e) {
              return cb(e)
            }
          )
        }
      },
      function (results) {
        complete(results)
      },
      source
    )
  }
  _proto.getType = function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern'
    }
    if (
      typeof rule.validator !== 'function' &&
      rule.type &&
      !validators.hasOwnProperty(rule.type)
    ) {
      throw new Error(format('Unknown rule type %s', rule.type))
    }
    return rule.type || 'string'
  }
  _proto.getValidationMethod = function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator
    }
    var keys = Object.keys(rule)
    var messageIndex = keys.indexOf('message')
    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1)
    }
    if (keys.length === 1 && keys[0] === 'required') {
      return validators.required
    }
    return validators[this.getType(rule)] || undefined
  }
  return Schema
})()
Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function')
  }
  validators[type] = validator
}
Schema.warning = warning
Schema.messages = messages
Schema.validators = validators

var indexScssStyleSheet = StyleSheet.create({
  'fta-form': {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: '100%',
  },
  'fta-form-container': {
    height: '100%',
  },
  'fta-form-title': {
    paddingTop: scalePx2dp(18.75),
    marginTop: 0,
    marginRight: scalePx2dp(16.66667),
    marginBottom: scalePx2dp(16.14583),
    marginLeft: scalePx2dp(16.66667),
  },
  'fta-form-title__text': {
    fontSize: scalePx2dp(16.66667),
    fontWeight: '600',
    color: '#333',
  },
  'fta-form-tip': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scalePx2dp(14.58333),
    marginRight: scalePx2dp(10.41667),
    marginBottom: scalePx2dp(14.58333),
    marginLeft: scalePx2dp(10.41667),
  },
  'fta-form-tip-content': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: scalePx2dp(250),
  },
  'fta-form-tip__image': {
    width: scalePx2dp(14.58333),
    height: scalePx2dp(14.58333),
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: scalePx2dp(14.58333),
    marginRight: scalePx2dp(6.25),
  },
  'fta-form-tip__text': {
    fontSize: scalePx2dp(14.58333),
    color: '#666',
  },
  'fta-form-tip__button': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: scalePx2dp(72.91667),
    height: scalePx2dp(27.08333),
    borderRadius: scalePx2dp(4.16667),
    backgroundColor: '#fa871e',
  },
  'fta-form-tip__button__text': {
    fontSize: scalePx2dp(14.58333),
    color: '#fff',
  },
  'fta-form-full-screen': {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  'fta-form-modal': {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'fta-form-modal__text': {
    textAlign: 'center',
    color: '#f6f6f6',
    marginBottom: scalePx2dp(12.5),
    fontSize: scalePx2dp(16.66667),
    lineHeight: scalePx2dp(25),
  },
  'fta-form-modal__image': {
    width: scalePx2dp(291.66667),
    height: scalePx2dp(287.5),
  },
  'fta-form-item': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scalePx2dp(10.41667),
    marginRight: scalePx2dp(16.66667),
    marginBottom: 0,
    marginLeft: scalePx2dp(16.66667),
  },
  'fta-form-item-label': {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scalePx2dp(6.25),
  },
  'fta-form-item-label__text': {
    fontSize: scalePx2dp(14.58333),
    fontWeight: '400',
    color: '#333',
    flexShrink: 1,
  },
  'fta-form-item-content': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    minHeight: scalePx2dp(45.83333),
    width: scalePx2dp(233.33333),
    paddingTop: 0,
    paddingRight: scalePx2dp(10.41667),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(10.41667),
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: scalePx2dp(233.33333),
    borderRadius: scalePx2dp(8.33333),
    backgroundColor: '#f9f9f9',
  },
  'fta-form-item-content__text': {
    fontSize: scalePx2dp(16.66667),
    fontWeight: '500',
    color: '#333',
    flexShrink: 1,
  },
  input: {
    fontWeight: '500',
    height: scalePx2dp(45.83333),
    lineHeight: scalePx2dp(45.83333),
  },
  'fta-form-item-content__suffix': {
    marginLeft: scalePx2dp(10.41667),
    color: '#333',
    fontSize: scalePx2dp(16.66667),
  },
  'fta-form-item-content--hover': {
    opacity: 0.6,
  },
  'fta-form-item-content--error': {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#f33131',
  },
  'fta-form-item-arrow': {
    marginLeft: scalePx2dp(1.04167),
    width: scalePx2dp(16.66667),
    height: scalePx2dp(16.66667),
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: scalePx2dp(16.66667),
  },
  'fta-form-item-error': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: scalePx2dp(10.41667),
    width: '100%',
    paddingBottom: scalePx2dp(5.20833),
  },
  'fta-form-item-error-icon': {
    width: scalePx2dp(16.66667),
    height: scalePx2dp(16.66667),
    marginRight: scalePx2dp(2.60417),
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: scalePx2dp(16.66667),
  },
  'fta-form-item-error-wrap': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: scalePx2dp(233.33333),
    marginRight: scalePx2dp(16.66667),
  },
  'fta-form-item-error__text': {
    flexShrink: 1,
    color: '#f33131',
    fontSize: scalePx2dp(14.58333),
    lineHeight: scalePx2dp(16.66667),
  },
  'fta-form-item-placeholder': {
    fontSize: scalePx2dp(16.66667),
    fontWeight: '400',
    color: '#ccc',
    flexShrink: 1,
  },
  'fta-form-item-gap': {
    width: '100%',
    height: scalePx2dp(10.41667),
    backgroundColor: '#f5f5f5',
  },
  'fta-form-item-tooltip': {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: scalePx2dp(15.625),
    width: scalePx2dp(15.625),
    height: scalePx2dp(15.625),
    marginLeft: scalePx2dp(5.72917),
  },
  'fta-form-item-input': {
    display: 'flex',
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 0,
    height: scalePx2dp(45.83333),
    overflow: 'hidden',
  },
  'fta-form-item-input-hack': {
    position: 'absolute',
    zIndex: 10,
    left: scalePx2dp(10.41667),
    right: scalePx2dp(10.41667),
    height: scalePx2dp(12.5),
    bottom: 0,
    backgroundColor: '#f9f9f9',
  },
  'fta-form-item-input--empty': {
    fontWeight: '400',
  },
  'fta-form-item--readonly': {},
})

var context = createContext({
  rules: {},
  __root__: false,
  _showModal: function _showModal() {},
  store: { __named__: [], __anonymous__: [] },
})
function useFormConfig() {
  var config = useContext(context)
  return config
}
var FormProvider = context.Provider
context.Consumer

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object)
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object)
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })),
      keys.push.apply(keys, symbols)
  }
  return keys
}
function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {}
    i % 2
      ? ownKeys$1(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      : ownKeys$1(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
        })
  }
  return target
}
function FullScreen(props) {
  var className = props.className,
    customStyle = props.customStyle,
    style = props.style,
    children = props.children,
    onClick = props.onClick
  var rootClass = classNames('fta-form-full-screen', className)
  return React.createElement(
    Modal,
    { visible: true, transparent: true },
    React.createElement(
      View,
      {
        className: rootClass,
        style: _objectSpread$1(_objectSpread$1({}, style), customStyle),
        onClick: onClick,
      },
      children
    )
  )
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  Object.defineProperty(Constructor, 'prototype', { writable: false })
  return Constructor
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p
      return o
    }
  return _setPrototypeOf(o, p)
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function')
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  })
  Object.defineProperty(subClass, 'prototype', { writable: false })
  if (superClass) _setPrototypeOf(subClass, superClass)
}

function _typeof(obj) {
  '@babel/helpers - typeof'
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj
          }
        : function (obj) {
            return obj &&
              'function' == typeof Symbol &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? 'symbol'
              : typeof obj
          }),
    _typeof(obj)
  )
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
  }
  return self
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call
  } else if (call !== void 0) {
    throw new TypeError('Derived constructors may only return object or undefined')
  }
  return _assertThisInitialized(self)
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
      }
  return _getPrototypeOf(o)
}

var __awaiter$1 =
  (undefined && undefined.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var measureElement = function measureElement(element) {
  return __awaiter$1(
    void 0,
    void 0,
    void 0,
    regenerator.mark(function _callee() {
      var node
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              node = findNodeHandle(element)
              return _context.abrupt(
                'return',
                new Promise(function (resolve) {
                  UIManager.measureInWindow(node, function (x, y, width, height) {
                    resolve({ x: x, y: y, width: width, height: height })
                  })
                })
              )
            case 2:
            case 'end':
              return _context.stop()
          }
        }
      }, _callee)
    })
  )
}
var throttle = function throttle(func, limit) {
  var inThrottle = false
  return function () {
    var args = arguments
    var context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(function () {
        return (inThrottle = false)
      }, limit)
    }
  }
}

var computeScrollY = function computeScrollY(scrollViewLayout, viewLayout, scrollY, insets, align) {
  var scrollViewHeight = scrollViewLayout.height
  var childHeight = viewLayout.height
  var viewTopY = viewLayout.y - scrollViewLayout.y
  var viewBottomY = viewTopY + childHeight
  var computationData = {
    scrollViewHeight: scrollViewHeight,
    scrollY: scrollY,
    viewTopY: viewTopY,
    viewBottomY: viewBottomY,
    insets: insets,
  }
  switch (align) {
    case 'auto':
      return computeScrollYAuto(computationData)
    case 'top':
      return computeScrollYTop(computationData)
    case 'bottom':
      return computeScrollYBottom(computationData)
    case 'center':
      return computeScrollYCenter(computationData)
    default:
      throw new Error('align=' + align + ' not supported')
  }
}
var computeScrollYAuto = function computeScrollYAuto(data) {
  var scrollY = data.scrollY
  var scrollYTop = computeScrollYTop(data)
  if (scrollY > scrollYTop) {
    return scrollYTop
  }
  var scrollYBottom = computeScrollYBottom(data)
  if (scrollY < scrollYBottom) {
    return scrollYBottom
  }
  return scrollY
}
var computeScrollYTop = function computeScrollYTop(_ref) {
  _ref.scrollViewHeight
  var scrollY = _ref.scrollY,
    viewTopY = _ref.viewTopY,
    insets = _ref.insets
  return scrollY + viewTopY - insets.top
}
var computeScrollYBottom = function computeScrollYBottom(_ref2) {
  var scrollViewHeight = _ref2.scrollViewHeight,
    scrollY = _ref2.scrollY
  _ref2.viewTopY
  var viewBottomY = _ref2.viewBottomY,
    insets = _ref2.insets
  return scrollY + viewBottomY - scrollViewHeight + insets.bottom
}
var computeScrollYCenter = function computeScrollYCenter(data) {
  return (computeScrollYTop(data) + computeScrollYBottom(data)) / 2
}

var DefaultOptions = {
  align: 'auto',
  animated: true,
  immediate: false,
  insets: { top: 0, bottom: 0 },
  computeScrollY: computeScrollY,
  measureElement: measureElement,
}
var OptionKeys = Object.keys(DefaultOptions)
var normalizeOptions = function normalizeOptions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
  var fallbackOptions =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DefaultOptions
  return _extends$1(_extends$1(_extends$1({}, fallbackOptions), options), {
    insets: _extends$1(_extends$1({}, fallbackOptions.insets), options.insets),
  })
}
var DefaultHOCConfig = {
  refPropName: 'ref',
  getScrollViewNode: function getScrollViewNode(scrollView) {
    var shouldCallGetNode =
      !Platform.constants ||
      (Platform.constants.reactNativeVersion.major === 0 &&
        Platform.constants.reactNativeVersion.minor < 62)
    if (scrollView.getNode && shouldCallGetNode) {
      return scrollView.getNode()
    } else {
      return scrollView
    }
  },
  scrollEventThrottle: 16,
  options: DefaultOptions,
}
var normalizeHOCConfig = function normalizeHOCConfig() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
  return _extends$1(_extends$1(_extends$1({}, DefaultHOCConfig), config), {
    options: normalizeOptions(config.options, DefaultOptions),
  })
}

var __awaiter =
  (undefined && undefined.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var scrollIntoView = function scrollIntoView(scrollView, view, scrollY, options) {
  return __awaiter(
    void 0,
    void 0,
    void 0,
    regenerator.mark(function _callee() {
      var _normalizeOptions,
        align,
        animated,
        computeScrollY,
        measureElement,
        insets,
        _yield$Promise$all,
        _yield$Promise$all2,
        scrollViewLayout,
        viewLayout,
        newScrollY,
        scrollResponder
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              ;(_normalizeOptions = normalizeOptions(options)),
                (align = _normalizeOptions.align),
                (animated = _normalizeOptions.animated),
                (computeScrollY = _normalizeOptions.computeScrollY),
                (measureElement = _normalizeOptions.measureElement),
                (insets = _normalizeOptions.insets)
              _context.next = 3
              return Promise.all([measureElement(scrollView), measureElement(view)])
            case 3:
              _yield$Promise$all = _context.sent
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2)
              scrollViewLayout = _yield$Promise$all2[0]
              viewLayout = _yield$Promise$all2[1]
              newScrollY = computeScrollY(scrollViewLayout, viewLayout, scrollY, insets, align)
              scrollResponder = scrollView.getScrollResponder()
              if (scrollResponder.scrollResponderScrollTo != null) {
                scrollResponder.scrollResponderScrollTo({ x: 0, y: newScrollY, animated: animated })
              } else {
                scrollView.scrollTo({ x: 0, y: newScrollY, animated: animated })
              }
            case 10:
            case 'end':
              return _context.stop()
          }
        }
      }, _callee)
    })
  )
}
var ScrollIntoViewAPI = _createClass(function ScrollIntoViewAPI(dependencies) {
  var _this = this
  _classCallCheck(this, ScrollIntoViewAPI)
  this.getNormalizedOptions = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
    return normalizeOptions(options, _this.dependencies.getDefaultOptions())
  }
  this.scrollIntoView = function (view, options) {
    var normalizedOptions = _this.getNormalizedOptions(options)
    if (normalizedOptions.immediate) {
      return _this.scrollIntoViewImmediate(view, normalizedOptions)
    } else {
      return _this.scrollIntoViewThrottled(view, normalizedOptions)
    }
  }
  this.scrollIntoViewThrottled = throttle(function (view, options) {
    return scrollIntoView(
      _this.dependencies.getScrollView(),
      view,
      _this.dependencies.getScrollY(),
      options
    )
  }, 16)
  this.scrollIntoViewImmediate = function (view, options) {
    return scrollIntoView(
      _this.dependencies.getScrollView(),
      view,
      _this.dependencies.getScrollY(),
      options
    )
  }
  if (!dependencies.getScrollView) {
    throw new Error('getScrollView is required')
  }
  if (!dependencies.getScrollY) {
    throw new Error('getScrollY is required')
  }
  if (!dependencies.getDefaultOptions) {
    throw new Error('getDefaultOptions is required')
  }
  this.dependencies = dependencies
})

function _createSuper$2(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$2()
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor
      result = Reflect.construct(Super, arguments, NewTarget)
    } else {
      result = Super.apply(this, arguments)
    }
    return _possibleConstructorReturn(this, result)
  }
}
function _isNativeReflectConstruct$2() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false
  if (Reflect.construct.sham) return false
  if (typeof Proxy === 'function') return true
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}))
    return true
  } catch (e) {
    return false
  }
}
var Context = React.createContext(null)
var APIConsumer = Context.Consumer
var ProvideAPI = (function (_React$Component) {
  _inherits(ProvideAPI, _React$Component)
  var _super = _createSuper$2(ProvideAPI)
  function ProvideAPI() {
    var _this
    _classCallCheck(this, ProvideAPI)
    _this = _super.apply(this, arguments)
    _this.api = new ScrollIntoViewAPI(_this.props.dependencies)
    return _this
  }
  _createClass(ProvideAPI, [
    {
      key: 'render',
      value: function render() {
        return React.createElement(Context.Provider, { value: this.api }, this.props.children)
      },
    },
  ])
  return ProvideAPI
})(React.Component)

function _createSuper$1(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$1()
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor
      result = Reflect.construct(Super, arguments, NewTarget)
    } else {
      result = Super.apply(this, arguments)
    }
    return _possibleConstructorReturn(this, result)
  }
}
function _isNativeReflectConstruct$1() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false
  if (Reflect.construct.sham) return false
  if (typeof Proxy === 'function') return true
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}))
    return true
  } catch (e) {
    return false
  }
}
var __rest =
  (undefined && undefined.__rest) ||
  function (s, e) {
    var t = {}
    for (var p in s) {
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p]
    }
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]]
      }
    return t
  }
var wrapScrollViewHOC = function wrapScrollViewHOC(ScrollViewComp) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  var _normalizeHOCConfig = normalizeHOCConfig(config),
    refPropName = _normalizeHOCConfig.refPropName,
    getScrollViewNode = _normalizeHOCConfig.getScrollViewNode,
    scrollEventThrottle = _normalizeHOCConfig.scrollEventThrottle,
    options = _normalizeHOCConfig.options
  var ScrollViewWrapper = (function (_React$Component) {
    _inherits(ScrollViewWrapper, _React$Component)
    var _super = _createSuper$1(ScrollViewWrapper)
    function ScrollViewWrapper(props) {
      var _this
      _classCallCheck(this, ScrollViewWrapper)
      _this = _super.call(this, props)
      _this.handleRef = function (ref) {
        _this.ref.current = ref
        if (_this.props.innerRef) {
          if (typeof _this.props.innerRef.current !== 'undefined') {
            _this.props.innerRef.current = ref
          } else {
            _this.props.innerRef(ref)
          }
        }
      }
      _this.handleScroll = function (event) {
        _this.scrollY = event.nativeEvent.contentOffset.y
      }
      _this.getScrollY = function () {
        return _this.scrollY
      }
      _this.getScrollView = function () {
        return getScrollViewNode(_this.ref.current)
      }
      _this.getDefaultOptions = function () {
        return normalizeOptions(_this.props.scrollIntoViewOptions, options)
      }
      _this.ref = React.createRef()
      _this.scrollY = _this.props.contentOffset ? _this.props.contentOffset.y : 0
      _this.dependencies = {
        getScrollView: _this.getScrollView,
        getScrollY: _this.getScrollY,
        getDefaultOptions: _this.getDefaultOptions,
      }
      return _this
    }
    _createClass(ScrollViewWrapper, [
      {
        key: 'render',
        value: function render() {
          var _extends2
          var _a = this.props,
            children = _a.children,
            props = __rest(_a, ['children'])
          var scrollViewProps = _extends$1(
            _extends$1({}, props),
            ((_extends2 = {}),
            _defineProperty(_extends2, refPropName, this.handleRef),
            _defineProperty(
              _extends2,
              'scrollEventThrottle',
              this.props.scrollEventThrottle || scrollEventThrottle
            ),
            _defineProperty(
              _extends2,
              'onScroll',
              Animated.forkEvent(this.props.onScroll, this.handleScroll)
            ),
            _extends2)
          )
          return React.createElement(
            ScrollViewComp,
            _extends$1({}, scrollViewProps),
            React.createElement(ProvideAPI, { dependencies: this.dependencies }, children)
          )
        },
      },
    ])
    return ScrollViewWrapper
  })(React.Component)
  ScrollViewWrapper.displayName =
    'ScrollIntoViewWrapper(' +
    (ScrollViewComp.displayName || ScrollViewComp.name || 'Component') +
    ')'
  return React.forwardRef(function (props, ref) {
    return React.createElement(ScrollViewWrapper, _extends$1({ innerRef: ref }, props))
  })
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct()
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor
      result = Reflect.construct(Super, arguments, NewTarget)
    } else {
      result = Super.apply(this, arguments)
    }
    return _possibleConstructorReturn(this, result)
  }
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false
  if (Reflect.construct.sham) return false
  if (typeof Proxy === 'function') return true
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}))
    return true
  } catch (e) {
    return false
  }
}
var showNotInContextWarning = throttle(function () {
  console.warn(
    'ScrollIntoView API is not provided in React context. Make sure you wrapped your ScrollView component with wrapScrollView(ScrollView)'
  )
}, 5000)
var ContainerBase = (function (_React$Component) {
  _inherits(ContainerBase, _React$Component)
  var _super = _createSuper(ContainerBase)
  function ContainerBase() {
    var _this
    _classCallCheck(this, ContainerBase)
    _this = _super.apply(this, arguments)
    _this.container = React.createRef()
    _this.unmounted = false
    _this.ensureApiProvided = function () {
      if (_this.props.scrollIntoViewAPI) {
        return true
      } else {
        showNotInContextWarning()
        return false
      }
    }
    _this.getPropsOptions = function () {
      var options = _extends$1({}, _this.props.scrollIntoViewOptions)
      OptionKeys.forEach(function (optionKey) {
        var optionValue = _this.props[optionKey]
        if (typeof optionValue !== 'undefined') {
          options[optionKey] = optionValue
        }
      })
      return options
    }
    _this.scrollIntoView = function () {
      var providedOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
      if (_this.unmounted) {
        return
      }
      if (_this.ensureApiProvided()) {
        var options = _extends$1(_extends$1({}, _this.getPropsOptions()), providedOptions)
        _this.props.scrollIntoViewAPI.scrollIntoView(_this.container.current, options)
      }
    }
    return _this
  }
  _createClass(ContainerBase, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this
        setTimeout(function () {
          _this2.props.onMount && _this2.props.enabled && _this2.scrollIntoView()
        }, 0)
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var hasBeenEnabled = this.props.enabled && !prevProps.enabled
        if (this.props.onUpdate && hasBeenEnabled) {
          this.scrollIntoView()
          return
        }
        var keyHasChanged = this.props.scrollIntoViewKey !== prevProps.scrollIntoViewKey
        if (this.props.onUpdate && this.props.enabled && keyHasChanged) {
          this.scrollIntoView()
          return
        }
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.unmounted = true
      },
    },
    {
      key: 'render',
      value: function render() {
        return React.createElement(
          View$1,
          _extends$1({}, this.props, { ref: this.container, collapsable: false }),
          this.props.children
        )
      },
    },
  ])
  return ContainerBase
})(React.Component)
ContainerBase.propTypes = {
  enabled: PropTypes.bool.isRequired,
  scrollIntoViewKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  animated: PropTypes.bool.isRequired,
  immediate: PropTypes.bool.isRequired,
  onMount: PropTypes.bool.isRequired,
  onUpdate: PropTypes.bool.isRequired,
}
ContainerBase.defaultProps = {
  enabled: true,
  animated: true,
  immediate: false,
  onMount: true,
  onUpdate: true,
}
var Container = React.forwardRef(function (props, ref) {
  return React.createElement(APIConsumer, null, function (scrollIntoViewAPI) {
    return React.createElement(
      ContainerBase,
      _extends$1({ ref: ref }, props, { scrollIntoViewAPI: scrollIntoViewAPI })
    )
  })
})

var ScrollIntoView = Container
var wrapScrollViewConfigured = function wrapScrollViewConfigured(config) {
  return function (comp) {
    return wrapScrollViewHOC(comp, config)
  }
}

var ScrollView = wrapScrollViewConfigured({
  options: {},
  refPropName: 'ref',
  getScrollViewNode: function getScrollViewNode(ref) {
    return ref
  },
  scrollEventThrottle: 16,
})(ScrollView$1)

var isEmptyRules = function isEmptyRules(rules) {
  return !rules || !rules.length
}
var uniqueId = (function () {
  var count = 0
  return function () {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ''
    return '' + prefix + ++count
  }
})()
var parseChildren = function parseChildren(children, props) {
  return typeof children === 'function' ? children(props) : children
}
var omit = function omit(target) {
  var omitProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : []
  omitProps.forEach(function (key) {
    return delete target[key]
  })
  return target
}

var _excluded = ['className', 'style', 'placeholderClass', 'value']
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object)
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object)
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })),
      keys.push.apply(keys, symbols)
  }
  return keys
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {}
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
        })
  }
  return target
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = (typeof Symbol !== 'undefined' && o[Symbol.iterator]) || o['@@iterator']
  if (it) return (it = it.call(o)).next.bind(it)
  if (
    Array.isArray(o) ||
    (it = _unsupportedIterableToArray(o)) ||
    (allowArrayLike && o && typeof o.length === 'number')
  ) {
    if (it) o = it
    var i = 0
    return function () {
      if (i >= o.length) return { done: true }
      return { done: false, value: o[i++] }
    }
  }
  throw new TypeError(
    'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  )
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen)
  var n = Object.prototype.toString.call(o).slice(8, -1)
  if (n === 'Object' && o.constructor) n = o.constructor.name
  if (n === 'Map' || n === 'Set') return Array.from(o)
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen)
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i]
  }
  return arr2
}
function _getClassName() {
  var className = []
  var args = arguments[0]
  var type = Object.prototype.toString.call(args).slice(8, -1).toLowerCase()
  if (type === 'string') {
    args = args.trim()
    args && className.push(args)
  } else if (type === 'array') {
    args.forEach(function (cls) {
      cls = _getClassName(cls).trim()
      cls && className.push(cls)
    })
  } else if (type === 'object') {
    for (var k in args) {
      k = k.trim()
      if (k && args.hasOwnProperty(k) && args[k]) {
        className.push(k)
      }
    }
  }
  return className.join(' ').trim()
}
function _getStyle(classNameExpression) {
  var className = _getClassName(classNameExpression)
  var classNameArr = className.split(/\s+/)
  var style = {}
  classNameArr.reduce((sty, cls) => Object.assign(sty, _styleSheet[cls.trim()]), style)
  return style
}
function _mergeEleStyles() {
  return [].concat.apply([], arguments).reduce((pre, cur) => Object.assign(pre, cur), {})
}
var _styleSheet = indexScssStyleSheet
var justifyContentMap = { left: 'flex-start', center: 'center', right: 'flex-end' }
var validatePriority = { Higher: 0, High: 1, Normal: 2, Low: 3, Lower: 4 }
var validateStatus = { unset: -1, error: 0, success: 1, validating: 2 }
var inError = function inError(status) {
  return validateStatus.error === status
}
function Form(props, ref) {
  var children = props.children,
    title = props.title,
    titleAlign = props.titleAlign,
    customStyle = props.customStyle,
    className = props.className,
    labelStyle = props.labelStyle,
    labelClassName = props.labelClassName,
    contentClassName = props.contentClassName,
    contentStyle = props.contentStyle,
    readonly = props.readonly,
    align = props.align,
    rules = props.rules,
    onMount = props.onMount,
    onDestroy = props.onDestroy,
    suspendOnFirstError = props.suspendOnFirstError,
    style = props.style,
    placeholderTextColor = props.placeholderTextColor,
    labelTextClassName = props.labelTextClassName,
    labelTextStyle = props.labelTextStyle
  var _useState = useState(),
    _useState2 = _slicedToArray(_useState, 2),
    nodeId = _useState2[0],
    scrollIntoView = _useState2[1]
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    visible = _useState4[0],
    toggleVisible = _useState4[1]
  var exampleRef = useRef()
  var _showModal = function _showModal(example) {
    exampleRef.current = example
    toggleVisible(true)
  }
  var store = useRef({ __named__: [], __anonymous__: [] }).current
  var rootClass = classNames('fta-form', className)
  var refMethods = {
    validate: function validate(callback) {
      var __anonymous__,
        __named__,
        itemRefs,
        erroredPropMsgPairs,
        erroredAnonymousPairs,
        invalid,
        _iterator,
        _step,
        item,
        _ref,
        errMsg
      return regenerator.async(
        function validate$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                ;(__anonymous__ = store.__anonymous__), (__named__ = store.__named__)
                itemRefs = __named__.concat(__anonymous__)
                itemRefs.sort(function (a, b) {
                  return a.current.priority - b.current.priority
                })
                erroredPropMsgPairs = []
                erroredAnonymousPairs = []
                invalid = false
                _iterator = _createForOfIteratorHelperLoose(itemRefs)
              case 7:
                if ((_step = _iterator()).done) {
                  _context.next = 21
                  break
                }
                item = _step.value
                _ref = item.current
                _context.next = 12
                return regenerator.awrap(_ref.validateAsync())
              case 12:
                errMsg = _context.sent
                if (!(errMsg != null)) {
                  _context.next = 19
                  break
                }
                invalid = true
                if (_ref.prop) {
                  erroredPropMsgPairs.push([errMsg, _ref.prop, item])
                } else {
                  erroredAnonymousPairs.push([errMsg, item])
                }
                if (!suspendOnFirstError) {
                  _context.next = 19
                  break
                }
                callback == null
                  ? void 0
                  : callback(!invalid, erroredPropMsgPairs, erroredAnonymousPairs)
                return _context.abrupt('return', true)
              case 19:
                _context.next = 7
                break
              case 21:
                callback == null
                  ? void 0
                  : callback(!invalid, erroredPropMsgPairs, erroredAnonymousPairs)
                return _context.abrupt('return', false)
              case 23:
              case 'end':
                return _context.stop()
            }
          }
        },
        null,
        null,
        null,
        Promise
      )
    },
    highlight: function highlight(prop, message, scrollIntoView) {
      var ref = refMethods.obtain(prop)
      ref == null ? void 0 : ref.current.highlight(message, scrollIntoView)
    },
    obtain: function obtain(prop) {
      return store.__named__.find(function (ref) {
        return ref.current.prop === prop
      })
    },
    clearValidate: function clearValidate(props) {
      if (isUndef(props)) {
        var __named__ = store.__named__,
          __anonymous__ = store.__anonymous__
        __named__.concat(__anonymous__).forEach(function (ref) {
          return ref.current.clearValidate()
        })
      }
      if (!isArray(props)) {
        props = [props]
      }
      props.forEach(function (prop) {
        var ref = refMethods.obtain(prop)
        ref == null ? void 0 : ref.current.clearValidate()
      })
    },
    resetFields: function resetFields() {},
    validateField: function validateField(props, callback) {
      return Promise.resolve()
    },
    submit: function submit() {},
  }
  useImperativeHandle(ref, function () {
    return refMethods
  })
  useEffect(
    function () {
      !inRN && nodeId && setTimeout(scrollIntoView, 50)
    },
    [nodeId]
  )
  return React.createElement(
    FormProvider,
    {
      value: {
        rules: rules,
        align: align,
        labelClassName: labelClassName,
        labelStyle: labelStyle,
        contentClassName: contentClassName,
        contentStyle: contentStyle,
        readonly: readonly,
        onMount: onMount,
        onDestroy: onDestroy,
        scrollIntoView: scrollIntoView,
        placeholderTextColor: placeholderTextColor,
        labelTextClassName: labelTextClassName,
        labelTextStyle: labelTextStyle,
        store: store,
        _showModal: _showModal,
        __root__: true,
      },
    },
    React.createElement(
      ScrollView,
      {
        scrollY: true,
        scrollWithAnimation: true,
        scrollX: false,
        scrollIntoView: nodeId,
        style: _mergeEleStyles(
          _getStyle(rootClass),
          _objectSpread(_objectSpread({}, style), customStyle)
        ),
      },
      React.createElement(Title, { align: titleAlign }, title),
      children
    ),
    visible
      ? React.createElement(
          FullScreen,
          {
            onClick: function onClick() {
              return toggleVisible(false)
            },
            style: _styleSheet['fta-form-modal'],
          },
          React.createElement(
            Text,
            { style: _styleSheet['fta-form-modal__text'] },
            '\u70B9\u51FB\u4EFB\u610F\u533A\u57DF\u5173\u95ED'
          ),
          isString(exampleRef.current)
            ? React.createElement(Image, {
                src: exampleRef.current,
                mode: 'aspectFit',
                style: _styleSheet['fta-form-modal__image'],
              })
            : exampleRef.current
        )
      : null
  )
}
var initialFormItemState = { status: validateStatus.unset, message: null }
function FormItem(props, ref) {
  var label = props.label,
    value = props.value,
    required = props.required,
    prop = props.prop,
    children = props.children,
    render = props.render,
    errorTip = props.errorTip
  props.style
  var validatePriority = props.validatePriority,
    align = props.align,
    readonly = props.readonly,
    rules = props.rules,
    onMount = props.onMount,
    onDestroy = props.onDestroy,
    onItemClick = props.onItemClick
  var _children = render || children
  var scrollRef = useRef()
  var ctx = useFormConfig()
  var model = { ctx: ctx }
  var formItemId = useRef(
    inRN ? void 0 : prop ? 'fta-form-item-' + prop : uniqueId('fta-form-item-')
  ).current
  var _useEnhancedState = useEnhancedState(initialFormItemState),
    _useEnhancedState2 = _slicedToArray(_useEnhancedState, 2),
    state = _useEnhancedState2[0],
    setState = _useEnhancedState2[1]
  var refMethods = {
    prop: prop,
    priority: validatePriority,
    getRules: function getRules(_rules) {
      return _rules || rules || (prop && ctx.rules[prop]) || []
    },
    getValue: function getValue() {
      if (value == null && prop && model) {
        return model[prop]
      }
      return value
    },
    scrollIntoView: function scrollIntoView() {
      inRN ? scrollRef.current.scrollIntoView() : ctx.scrollIntoView(formItemId)
    },
    highlight: function highlight(message) {
      var scrollIntoView = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true
      setState({ status: validateStatus.error, message: message || errorTip })
      scrollIntoView && setTimeout(methodsRef.current.scrollIntoView, 200)
    },
    validate: function validate(callback, rules) {
      rules = refMethods.getRules(rules)
      if (isEmptyRules(rules) && isUndef(required)) {
        callback()
        return
      }
      setState('status', validateStatus.validating)
      var key = prop || 'value'
      var descriptor = _defineProperty({}, key, rules)
      var model = _defineProperty({}, key, refMethods.getValue())
      var validator = new Schema(descriptor)
      validator.validate(model, { firstFields: true }, function (errors) {
        var _errors$
        var status = errors ? validateStatus.error : validateStatus.success
        var message =
          (errors == null ? void 0 : (_errors$ = errors[0]) == null ? void 0 : _errors$.message) ||
          null
        setState({ status: status, message: message })
        callback(message)
      })
    },
    validateAsync: function validateAsync() {
      return new Promise(function (resolve) {
        return refMethods.validate(function (message) {
          return resolve(message)
        })
      })
    },
    clearValidate: function clearValidate() {
      setState(initialFormItemState)
    },
  }
  var methodsRef = useRef(refMethods)
  var errored = inError(state.status)
  useEffect(function () {
    methodsRef.current = refMethods
  })
  useEffect(function () {
    if (inDev && !ctx.__root__) {
      console.log(
        '[FTA View Warning]: FormItem ' +
          (label ? label : prop ? prop : '') +
          ' \u6CA1\u6709\u88ABForm\u5305\u88F9\uFF0C\u8BF7\u68C0\u67E5'
      )
    }
    var key = prop ? '__named__' : '__anonymous__'
    ctx.store[key].push(methodsRef)
    ctx.onMount == null ? void 0 : ctx.onMount(methodsRef)
    onMount == null ? void 0 : onMount(methodsRef)
    return function () {
      var i = ctx.store[key].indexOf(methodsRef)
      if (i > -1) ctx.store[key].splice(i, 1)
      ctx.onDestroy == null ? void 0 : ctx.onDestroy(methodsRef)
      onDestroy == null ? void 0 : onDestroy(methodsRef)
    }
  }, [])
  useImperativeHandle(ref, function () {
    return refMethods
  })
  var _align = align || ctx.align
  var _readonly = readonly === false ? false : readonly || ctx.readonly
  var getParsedChildren = function getParsedChildren() {
    return parseChildren(
      _children,
      omit(
        _objectSpread(
          _objectSpread({}, props),
          {},
          {
            align: _align,
            readonly: _readonly,
            error: errored,
            errorTip: state.message,
            itemRef: methodsRef,
          }
        ),
        [
          'className',
          'customStyle',
          'onClick',
          'onMount',
          'onDestroy',
          'inputProps',
          'render',
          'children',
        ]
      )
    )
  }
  if (isUndef(label)) {
    return React.createElement(
      ScrollIntoView,
      { ref: inRN ? scrollRef : void 0, id: formItemId },
      React.createElement(View, { onClick: onItemClick }, getParsedChildren())
    )
  }
  return React.createElement(
    ScrollIntoView,
    { ref: inRN ? scrollRef : void 0, id: formItemId },
    React.createElement(
      FormItemAppearance,
      omit(
        _objectSpread(
          _objectSpread({}, props),
          {},
          { error: errored, errorTip: state.message, itemRef: methodsRef }
        ),
        ['prop', 'required', 'rules', 'onMount', 'onDestroy', 'validatePriority']
      ),
      getParsedChildren()
    )
  )
}
function FormItemAppearance(props) {
  var ctx = useFormConfig()
  var label = props.label,
    className = props.className,
    customStyle = props.customStyle,
    tooltip = props.tooltip,
    tooltipIcon = props.tooltipIcon,
    itemRef = props.itemRef,
    children = props.children,
    render = props.render,
    value = props.value,
    format = props.format,
    readonly = props.readonly,
    placeholder = props.placeholder,
    arrow = props.arrow,
    style = props.style,
    error = props.error,
    errorTip = props.errorTip,
    align = props.align,
    onLabelClick = props.onLabelClick,
    onClick = props.onClick,
    onItemClick = props.onItemClick,
    labelClassName = props.labelClassName,
    labelStyle = props.labelStyle,
    contentClassName = props.contentClassName,
    contentStyle = props.contentStyle,
    inputRef = props.inputRef,
    inputProps = props.inputProps,
    placeholderTextColor = props.placeholderTextColor,
    hackColor = props.hackColor,
    suffix = props.suffix,
    labelTextStyle = props.labelTextStyle,
    labelTextClassName = props.labelTextClassName
  var _children = render || children
  var _align = align || ctx.align
  var _readonly = readonly === false ? false : readonly || ctx.readonly
  var readonlyFn = function readonlyFn(fn) {
    return _readonly ? void 0 : fn
  }
  var rootClass = classNames('fta-form-item', className)
  var rootStyle = _objectSpread(_objectSpread({}, style), customStyle)
  var _labelClassName = classNames('fta-form-item-label', ctx.labelClassName, labelClassName)
  var _contentClassName = classNames(
    'fta-form-item-content',
    ctx.contentClassName,
    contentClassName,
    error && 'fta-form-item-content--error'
  )
  var _labelStyle = _objectSpread(_objectSpread({}, ctx.labelStyle), labelStyle)
  var _contentStyle = _objectSpread(
    _objectSpread(
      _objectSpread({}, _align ? { justifyContent: justifyContentMap[_align] } : {}),
      ctx.contentStyle
    ),
    contentStyle
  )
  var _labelTextClass = classNames(
    'fta-form-item-label__text',
    ctx.labelTextClassName,
    labelTextClassName
  )
  var _labelTextStyle = _objectSpread(_objectSpread({}, ctx.labelTextStyle), labelTextStyle)
  var _onLabelCick = function _onLabelCick() {
    if ((onLabelClick == null ? void 0 : onLabelClick()) !== false && tooltip) {
      ctx._showModal(tooltip)
    }
  }
  var labelHoverClass =
    !_readonly && (tooltip || onLabelClick) ? 'fta-form-item-content--hover' : void 0
  var contentHoverClass = _readonly ? void 0 : 'fta-form-item-content--hover'
  var placeholderColor = placeholderTextColor || ctx.placeholderTextColor
  var _value = (itemRef == null ? void 0 : itemRef.current.getValue()) || value
  var _formatValue = format ? format(_value) : _value
  var alignStyle = { textAlign: _align || 'right' }
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      View,
      { style: _mergeEleStyles(_getStyle(rootClass), rootStyle), onClick: readonlyFn(onItemClick) },
      React.createElement(
        View,
        {
          style: _mergeEleStyles(_getStyle(_labelClassName), _labelStyle),
          onClick: readonlyFn(_onLabelCick),
          hoverClass: labelHoverClass,
          hoverStyle: _getStyle(labelHoverClass),
        },
        React.createElement(
          Text,
          { style: _mergeEleStyles(_getStyle(_labelTextClass), _labelTextStyle) },
          label
        ),
        tooltip && !_readonly ? React.createElement(ToolTip, { tooltipIcon: tooltipIcon }) : null
      ),
      React.createElement(
        View,
        {
          style: _mergeEleStyles(_getStyle(_contentClassName), _contentStyle),
          onClick: readonlyFn(onClick),
          hoverClass: contentHoverClass,
          hoverStyle: _getStyle(contentHoverClass),
        },
        _children == null
          ? _readonly || arrow
            ? (_formatValue == null || !String(_formatValue).length) && placeholder && !_readonly
              ? React.createElement(Placeholder, { style: alignStyle }, placeholder)
              : React.createElement(
                  Text,
                  {
                    style: _mergeEleStyles(_styleSheet['fta-form-item-content__text'], alignStyle),
                  },
                  _formatValue
                )
            : React.createElement(
                Fragment,
                null,
                React.createElement(
                  BuiltinInput,
                  _extends$1(
                    {
                      ref: inputRef,
                      placeholder: placeholder,
                      style: alignStyle,
                      value: _value,
                      placeholderTextColor: placeholderColor,
                    },
                    inputProps
                  )
                ),
                React.createElement(HackView, { color: hackColor })
              )
          : isString(_children)
          ? !_children.length && placeholder && !_readonly
            ? React.createElement(Placeholder, { style: alignStyle }, placeholder)
            : React.createElement(
                Text,
                { style: _mergeEleStyles(_styleSheet['fta-form-item-content__text'], alignStyle) },
                _children
              )
          : _children,
        isString(suffix)
          ? React.createElement(
              Text,
              { style: _styleSheet['fta-form-item-content__suffix'] },
              suffix
            )
          : suffix,
        arrow && !_readonly ? React.createElement(Arrow, null) : null
      )
    ),
    React.createElement(
      View,
      null,
      error && errorTip
        ? React.createElement(
            View,
            { style: _styleSheet['fta-form-item-error'] },
            React.createElement(
              View,
              { style: _styleSheet['fta-form-item-error-wrap'] },
              React.createElement(ErrorIcon, null),
              ' ',
              React.createElement(
                Text,
                { style: _styleSheet['fta-form-item-error__text'] },
                errorTip
              )
            )
          )
        : null
    )
  )
}
function Title(props) {
  var title = props.children,
    titleAlign = props.align
  return title
    ? React.createElement(
        View,
        { style: _mergeEleStyles(_styleSheet['fta-form-title'], { textAlign: titleAlign }) },
        isString(title)
          ? React.createElement(
              Text,
              {
                style: _mergeEleStyles(_styleSheet['fta-form-title__text'], {
                  textAlign: titleAlign,
                }),
              },
              title
            )
          : title
      )
    : null
}
function ToolTip(props) {
  var tooltipIcon = props.tooltipIcon
  return isString(tooltipIcon)
    ? React.createElement(Image, { src: tooltipIcon, style: _styleSheet['fta-form-item-tooltip'] })
    : tooltipIcon
}
var BuiltinInput = forwardRef(function _BuiltinInput(props, ref) {
  var className = props.className,
    style = props.style,
    placeholderClass = props.placeholderClass,
    value = props.value,
    extraProps = _objectWithoutProperties(props, _excluded)
  var isEmpty = value == null || (isString(value) && !value.length)
  var rootClass = classNames(
    'fta-form-item-input',
    'fta-form-item-content__text',
    isEmpty && 'fta-form-item-input--empty',
    className
  )
  var placeClass = classNames('fta-form-item-placeholder', placeholderClass)
  return React.createElement(
    Input,
    _extends$1(
      {
        numberOfLines: 1,
        style: _mergeEleStyles(_getStyle(rootClass), style),
        placeholderClass: placeClass,
        value: value,
        ref: ref,
      },
      extraProps
    )
  )
})
function HackView(props) {
  if (inRN) {
    return React.createElement(View, {
      style: _mergeEleStyles(
        _styleSheet['fta-form-item-input-hack'],
        props.color ? { backgroundColor: props.color } : void 0
      ),
      pointerEvents: 'none',
    })
  }
  return null
}
function Placeholder(props) {
  var children = props.children,
    style = props.style
  return isString(children)
    ? React.createElement(
        Text,
        { style: _mergeEleStyles(_styleSheet['fta-form-item-placeholder'], style) },
        children
      )
    : children
}
function Arrow() {
  return React.createElement(Image, {
    src: Assets.arrow.grey,
    style: _styleSheet['fta-form-item-arrow'],
  })
}
function ErrorIcon() {
  return React.createElement(Image, {
    src: Assets.icon.warning,
    style: _styleSheet['fta-form-item-error-icon'],
  })
}
function Gap() {
  return React.createElement(View, { style: _styleSheet['fta-form-item-gap'] })
}
function Tip(props) {
  var onClick = props.onClick,
    button = props.button,
    title = props.title,
    className = props.className,
    customStyle = props.customStyle,
    style = props.style
  var rootClass = classNames('fta-form-tip', className)
  var rootStyle = _objectSpread(_objectSpread({}, style), {}, { customStyle: customStyle })
  return React.createElement(
    View,
    { style: _mergeEleStyles(_getStyle(rootClass), rootStyle) },
    React.createElement(
      View,
      { style: _styleSheet['fta-form-tip-content'] },
      React.createElement(Image, {
        src: Assets.tip.info,
        style: _styleSheet['fta-form-tip__image'],
      }),
      isString(title)
        ? React.createElement(Text, { style: _styleSheet['fta-form-tip__text'] }, title)
        : title
    ),
    React.createElement(
      TouchableOpacity,
      { onClick: onClick, style: _styleSheet['fta-form-tip__button'] },
      React.createElement(Text, { style: _styleSheet['fta-form-tip__button__text'] }, button)
    )
  )
}
Tip.defaultProps = { button: '重新上传', title: '如需更新证件信息，请重新上传' }
var tooltipDefaultProps = { tooltipIcon: Assets.icon.question }
var formDefaultProps = { placeholderTextColor: '#cccccc', rules: {}, model: {}, titleAlign: 'left' }
var formItemDefaultProps = {
  placeholderTextColor: '#cccccc',
  validatePriority: validatePriority.Normal,
  onClick: function onClick() {},
}
ToolTip.defaultProps = tooltipDefaultProps
var ForwardForm = forwardRef(Form)
var FowardFormItem = forwardRef(FormItem)
ForwardForm.defaultProps = formDefaultProps
FowardFormItem.defaultProps = formItemDefaultProps
FormItemAppearance.defaultProps = { errorTip: '信息填写错误' }
ForwardForm.Item = FowardFormItem
ForwardForm.ItemView = FormItemAppearance
ForwardForm.Input = BuiltinInput
ForwardForm.Gap = Gap
ForwardForm.Tip = Tip
ForwardForm.ValidatePriority = validatePriority
ForwardForm.ValidateStatus = validateStatus
ForwardForm.AsyncValidator = Schema

export { FowardFormItem as FormItem, ForwardForm as default }
