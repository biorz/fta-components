import ScrollView from '@fta/components-rn/dist/components/ScrollView'
import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import { isString } from '../common'
import { StyleSheet } from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'

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

var indexScssStyleSheet = StyleSheet.create({
  'fta-infinite-scroll': {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: '100%',
  },
  'fta-infinite-scroll-loader': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: scalePx2dp(52.08333),
  },
  'fta-infinite-scroll-loader__text': {
    color: '#999',
    fontSize: scalePx2dp(16.66667),
  },
})

var _excluded = [
  'className',
  'customStyle',
  'style',
  'children',
  'hasMore',
  'loader',
  'loaded',
  'threshold',
  'loadMore',
  'onScrollToLower',
]
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
function InfiniteScroll(props) {
  var loadingRef = useRef(false)
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    hasLoad = _useState2[0],
    setLoad = _useState2[1]
  var className = props.className,
    customStyle = props.customStyle,
    style = props.style,
    children = props.children,
    hasMore = props.hasMore,
    loader = props.loader,
    loaded = props.loaded,
    threshold = props.threshold,
    loadMore = props.loadMore,
    onScrollToLower = props.onScrollToLower,
    extraProps = _objectWithoutProperties(props, _excluded)
  var rootClass = classNames('fta-infinite-scroll', className)
  var rootStyle = _objectSpread(_objectSpread({}, style), customStyle)
  var onLoad = function onLoad(evt) {
    return regenerator.async(
      function onLoad$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              onScrollToLower == null ? void 0 : onScrollToLower(evt)
              if (!(loadingRef.current || !hasMore)) {
                _context.next = 3
                break
              }
              return _context.abrupt('return')
            case 3:
              loadingRef.current = true
              _context.prev = 4
              _context.next = 7
              return regenerator.awrap(Promise.resolve(loadMore == null ? void 0 : loadMore()))
            case 7:
              _context.next = 11
              break
            case 9:
              _context.prev = 9
              _context.t0 = _context['catch'](4)
            case 11:
              setLoad(true)
              loadingRef.current = false
            case 13:
            case 'end':
              return _context.stop()
          }
        }
      },
      null,
      null,
      [[4, 9]],
      Promise
    )
  }
  return React.createElement(
    ScrollView,
    _extends(
      {
        scrollY: true,
        style: _mergeEleStyles(_getStyle(rootClass), rootStyle),
        lowerThreshold: threshold,
        onScrollToLower: onLoad,
      },
      extraProps
    ),
    children,
    !hasLoad || hasMore
      ? isString(loader)
        ? React.createElement(Loader, { title: loader })
        : loader
      : isString(loaded)
      ? React.createElement(Loader, { title: loaded })
      : loaded
  )
}
function Loader(props) {
  return React.createElement(
    View,
    { style: _styleSheet['fta-infinite-scroll-loader'] },
    React.createElement(
      Text,
      { style: _styleSheet['fta-infinite-scroll-loader__text'] },
      props.title
    )
  )
}
var defaultProps = { threshold: 100, loader: '加载中...', loaded: '没有更多数据了哦' }
InfiniteScroll.defaultProps = defaultProps

export { InfiniteScroll as default }
