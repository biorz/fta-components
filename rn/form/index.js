import Image from '@fta/components-rn/dist/components/Image'
import Text from '@fta/components-rn/dist/components/Text'
import View$1 from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import React, {
  createContext,
  useContext,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from 'react'
import { isUndef, isString, Assets } from '../common'
import {
  StyleSheet,
  findNodeHandle,
  UIManager,
  Platform,
  Animated,
  View,
  ScrollView as ScrollView$1,
} from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'
import { TouchableOpacity } from '../view'
import PropTypes from 'prop-types'

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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i]
  }
  return arr2
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

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  )
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  )
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

var indexScssStyleSheet = StyleSheet.create({
  'fta-form': {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  'fta-form-container': {
    height: '100%',
  },
  'fta-form-title': {
    marginTop: scalePx2dp(17.28),
    marginRight: scalePx2dp(15.36),
    marginBottom: scalePx2dp(14.88),
    marginLeft: scalePx2dp(15.36),
  },
  'fta-form-title__text': {
    fontSize: scalePx2dp(15.36),
    fontWeight: '600',
    color: '#333',
  },
  'fta-form-tip': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scalePx2dp(13.44),
    marginRight: scalePx2dp(9.6),
    marginBottom: scalePx2dp(13.44),
    marginLeft: scalePx2dp(9.6),
  },
  'fta-form-tip-content': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  'fta-form-tip__image': {
    width: scalePx2dp(13.44),
    height: scalePx2dp(13.44),
    marginRight: scalePx2dp(5.76),
  },
  'fta-form-tip__text': {
    fontSize: scalePx2dp(13.44),
    color: '#666',
  },
  'fta-form-tip__button': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: scalePx2dp(67.2),
    height: scalePx2dp(24.96),
    borderRadius: scalePx2dp(3.84),
    backgroundColor: '#fa871e',
  },
  'fta-form-tip__button__text': {
    fontSize: scalePx2dp(13.44),
    color: '#fff',
  },
  'fta-form-item': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scalePx2dp(9.6),
    marginRight: scalePx2dp(15.36),
    marginBottom: 0,
    marginLeft: scalePx2dp(15.36),
  },
  'fta-form-item-label': {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  'fta-form-item-label__text': {
    fontSize: scalePx2dp(13.44),
    fontWeight: '400',
    color: '#333',
  },
  'fta-form-item-content': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    minHeight: scalePx2dp(42.24),
    width: scalePx2dp(202.56),
    paddingRight: scalePx2dp(15.36),
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: scalePx2dp(202.56),
    borderRadius: scalePx2dp(7.68),
    backgroundColor: '#f9f9f9',
  },
  'fta-form-item-content__text': {
    fontSize: scalePx2dp(15.36),
    fontWeight: '500',
    color: '#333',
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
    marginLeft: scalePx2dp(0.96),
    width: scalePx2dp(15.36),
    height: scalePx2dp(15.36),
  },
  'fta-form-item-error': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: scalePx2dp(9.6),
    paddingBottom: scalePx2dp(4.8),
  },
  'fta-form-item-error-icon': {
    width: scalePx2dp(15.36),
    height: scalePx2dp(15.36),
    marginRight: scalePx2dp(2.4),
  },
  'fta-form-item-error-wrap': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: scalePx2dp(217.92),
  },
  'fta-form-item-error__text': {
    color: '#f33131',
    fontSize: scalePx2dp(13.44),
    lineHeight: scalePx2dp(15.36),
  },
  'fta-form-item-placeholder': {
    fontSize: scalePx2dp(15.36),
    fontWeight: '400',
    color: '#ccc',
  },
  'fta-form-item-gap': {
    width: '100%',
    height: scalePx2dp(9.6),
    backgroundColor: '#f5f5f5',
  },
  'fta-form-item--readonly': {},
})

var context = createContext({ _showModal: false })
function useFormConfig() {
  var config = useContext(context)
  return config
}
var FormProvider = context.Provider
context.Consumer

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
  return _extends(_extends(_extends({}, fallbackOptions), options), {
    insets: _extends(_extends({}, fallbackOptions.insets), options.insets),
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
  return _extends(_extends(_extends({}, DefaultHOCConfig), config), {
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
          var scrollViewProps = _extends(
            _extends({}, props),
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
            _extends({}, scrollViewProps),
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
    return React.createElement(ScrollViewWrapper, _extends({ innerRef: ref }, props))
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
      var options = _extends({}, _this.props.scrollIntoViewOptions)
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
        var options = _extends(_extends({}, _this.getPropsOptions()), providedOptions)
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
          View,
          _extends({}, this.props, { ref: this.container, collapsable: false }),
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
      _extends({ ref: ref }, props, { scrollIntoViewAPI: scrollIntoViewAPI })
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
    onMount = props.onMount,
    onDestroy = props.onDestroy,
    style = props.style
  var rootClass = classNames('fta-form', className)
  useImperativeHandle(ref, function () {
    return {
      validate: function validate(callback) {
        return Promise.resolve()
      },
      validateField: function validateField(props, callback) {
        return Promise.resolve()
      },
      clearValidate: function clearValidate() {},
      resetFields: function resetFields() {},
      submit: function submit() {},
    }
  })
  return React.createElement(
    FormProvider,
    {
      value: {
        align: align,
        labelClassName: labelClassName,
        labelStyle: labelStyle,
        contentClassName: contentClassName,
        contentStyle: contentStyle,
        readonly: readonly,
        onMount: onMount,
        onDestroy: onDestroy,
      },
    },
    React.createElement(
      ScrollView,
      {
        scrollY: true,
        scrollWithAnimation: true,
        scrollX: false,
        style: _mergeEleStyles(
          _getStyle(rootClass),
          _objectSpread(_objectSpread({}, style), customStyle)
        ),
      },
      React.createElement(Title, { align: titleAlign }, title),
      children
    )
  )
}
function FormItem(props, ref) {
  var label = props.label,
    value = props.value,
    tooltip = props.tooltip,
    renderTooltip = props.renderTooltip,
    prop = props.prop,
    children = props.children,
    placeholder = props.placeholder,
    arrow = props.arrow,
    error = props.error,
    errorTip = props.errorTip,
    align = props.align,
    onTooltipClick = props.onTooltipClick,
    onClick = props.onClick,
    labelClassName = props.labelClassName,
    labelStyle = props.labelStyle,
    contentClassName = props.contentClassName,
    contentStyle = props.contentStyle,
    readonly = props.readonly,
    rules = props.rules,
    onMount = props.onMount,
    onDestroy = props.onDestroy
  var ctx = useFormConfig()
  console.log('formConfig', ctx)
  var refMethods = {
    getRules: function getRules() {
      return rules
    },
    getValue: function getValue() {
      return value
    },
    clearValidate: function clearValidate() {},
    resetField: function resetField() {},
    __test__: function __test__() {
      console.log('__test__ executed - label: ' + label)
    },
  }
  useEffect(function () {
    ctx.onMount == null ? void 0 : ctx.onMount(refMethods)
    onMount == null ? void 0 : onMount(refMethods)
    return function () {
      ctx.onDestroy == null ? void 0 : ctx.onDestroy(refMethods)
      onDestroy == null ? void 0 : onDestroy(refMethods)
    }
  }, [])
  useImperativeHandle(ref, function () {
    return refMethods
  })
  var _align = align || ctx.align
  readonly === false ? false : readonly || ctx.readonly
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
  var rootClass = classNames('fta-form-item')
  var labelTextClass = classNames('fta-form-item-label__text')
  return React.createElement(
    ScrollIntoView,
    null,
    React.createElement(
      View$1,
      { id: props ? 'form-' + prop : void 0, style: _getStyle(rootClass) },
      React.createElement(
        View$1,
        { style: _mergeEleStyles(_getStyle(_labelClassName), _labelStyle) },
        React.createElement(Text, { style: _getStyle(labelTextClass) }, label),
        tooltip
          ? React.createElement(ToolTip, {
              onTooltipClick: onTooltipClick,
              renderTooltip: renderTooltip,
              prop: prop,
            })
          : null
      ),
      React.createElement(
        View$1,
        {
          style: _mergeEleStyles(_getStyle(_contentClassName), _contentStyle),
          onClick: onClick,
          hoverStyle: { opacity: 0.6 },
          hoverClass: 'fta-form-item-content--hover',
        },
        isUndef(children)
          ? placeholder
            ? React.createElement(Placeholder, null, placeholder)
            : null
          : isString(children)
          ? !children.length && placeholder
            ? React.createElement(Placeholder, null, placeholder)
            : React.createElement(
                Text,
                { style: _styleSheet['fta-form-item-content__text'] },
                children
              )
          : children,
        arrow ? React.createElement(Arrow, null) : null
      )
    ),
    error && errorTip
      ? React.createElement(
          View$1,
          { style: _styleSheet['fta-form-item-error'] },
          React.createElement(
            View$1,
            { style: _styleSheet['fta-form-item-error-wrap'] },
            React.createElement(ErrorIcon, null),
            ' ',
            React.createElement(Text, { style: _styleSheet['fta-form-item-error__text'] }, errorTip)
          )
        )
      : null
  )
}
function Title(props) {
  var title = props.children,
    titleAlign = props.align
  return title
    ? React.createElement(
        View$1,
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
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    visible = _useState2[0],
    toggle = _useState2[1]
  var tooltip = props.tooltip,
    onTooltipClick = props.onTooltipClick,
    prop = props.prop,
    renderTooltip = props.renderTooltip
  return React.createElement(
    View$1,
    {
      onClick: function onClick() {
        onTooltipClick(prop)
        toggle(!visible)
      },
      style: _styleSheet['fta-form-item-tooltip'],
    },
    isString(tooltip) ? React.createElement(Image, { src: tooltip }) : tooltip,
    visible ? renderTooltip : null
  )
}
function Placeholder(props) {
  var children = props.children
  return isString(children)
    ? React.createElement(Text, { style: _styleSheet['fta-form-item-placeholder'] }, children)
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
  return React.createElement(View$1, { style: _styleSheet['fta-form-item-gap'] })
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
    View$1,
    { style: _mergeEleStyles(_getStyle(rootClass), rootStyle) },
    React.createElement(
      View$1,
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
var tooltipDefaultProps = {
  tooltip: '',
  onTooltipClick: function onTooltipClick() {},
  renderTooltip: null,
}
var formDefaultProps = { titleAlign: 'left' }
var formItemDefaultProps = {
  label: '',
  error: false,
  errorTip: '信息填写错误',
  validatePriority: validatePriority.Normal,
  onClick: function onClick() {},
}
ToolTip.defaultProps = tooltipDefaultProps
var ForwardForm = forwardRef(Form)
var FowardFormItem = forwardRef(FormItem)
ForwardForm.defaultProps = formDefaultProps
ForwardForm.Item = FowardFormItem
ForwardForm.Gap = Gap
ForwardForm.Tip = Tip
ForwardForm.ValidatePriority = validatePriority
FowardFormItem.defaultProps = formItemDefaultProps

export { FowardFormItem as FormItem, ForwardForm as default }
