import View from '@fta/components-rn/dist/components/View'
import React, { Fragment, createContext, Component, useRef, useEffect } from 'react'
import { Modal as Modal$1, StyleSheet, Easing, Animated } from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'
import Text from '@fta/components-rn/dist/components/Text'
import { getSystemInfoSync } from '@fta/taro-rn/dist/lib/getSystemInfoSync'
import '@fta/taro-rn'
import { getEnv } from '@fta/taro-rn/dist/lib/getEnv'
import '@fta/taro-rn/dist/lib/ENV_TYPE'
import Button from '@fta/components-rn/dist/components/Button'
import '@fta/components-rn/dist/components/Form'
import Image from '@fta/components-rn/dist/components/Image'

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

var classnames = { exports: {} }

;(function (module) {
  ;(function () {
    var hasOwn = {}.hasOwnProperty
    function classNames() {
      var classes = []
      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i]
        if (!arg) continue
        var argType = typeof arg
        if (argType === 'string' || argType === 'number') {
          classes.push(arg)
        } else if (Array.isArray(arg)) {
          if (arg.length) {
            var inner = classNames.apply(null, arg)
            if (inner) {
              classes.push(inner)
            }
          }
        } else if (argType === 'object') {
          if (arg.toString === Object.prototype.toString) {
            for (var key in arg) {
              if (hasOwn.call(arg, key) && arg[key]) {
                classes.push(key)
              }
            }
          } else {
            classes.push(arg.toString())
          }
        }
      }
      return classes.join(' ')
    }
    if (module.exports) {
      classNames.default = classNames
      module.exports = classNames
    } else {
      window.classNames = classNames
    }
  })()
})(classnames)
var classNames = classnames.exports

var propTypes = { exports: {} }

var reactIs = { exports: {} }

var reactIs_development = {}

{
  ;(function () {
    var hasSymbol = typeof Symbol === 'function' && Symbol.for
    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace
    var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf
    var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0
    var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1
    var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8
    var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3
    var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4
    var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9
    var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5
    var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6
    var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7
    function isValidElementType(type) {
      return (
        typeof type === 'string' ||
        typeof type === 'function' ||
        type === REACT_FRAGMENT_TYPE ||
        type === REACT_CONCURRENT_MODE_TYPE ||
        type === REACT_PROFILER_TYPE ||
        type === REACT_STRICT_MODE_TYPE ||
        type === REACT_SUSPENSE_TYPE ||
        type === REACT_SUSPENSE_LIST_TYPE ||
        (typeof type === 'object' &&
          type !== null &&
          (type.$$typeof === REACT_LAZY_TYPE ||
            type.$$typeof === REACT_MEMO_TYPE ||
            type.$$typeof === REACT_PROVIDER_TYPE ||
            type.$$typeof === REACT_CONTEXT_TYPE ||
            type.$$typeof === REACT_FORWARD_REF_TYPE ||
            type.$$typeof === REACT_FUNDAMENTAL_TYPE ||
            type.$$typeof === REACT_RESPONDER_TYPE ||
            type.$$typeof === REACT_SCOPE_TYPE ||
            type.$$typeof === REACT_BLOCK_TYPE))
      )
    }
    function typeOf(object) {
      if (typeof object === 'object' && object !== null) {
        var $$typeof = object.$$typeof
        switch ($$typeof) {
          case REACT_ELEMENT_TYPE:
            var type = object.type
            switch (type) {
              case REACT_ASYNC_MODE_TYPE:
              case REACT_CONCURRENT_MODE_TYPE:
              case REACT_FRAGMENT_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_SUSPENSE_TYPE:
                return type
              default:
                var $$typeofType = type && type.$$typeof
                switch ($$typeofType) {
                  case REACT_CONTEXT_TYPE:
                  case REACT_FORWARD_REF_TYPE:
                  case REACT_LAZY_TYPE:
                  case REACT_MEMO_TYPE:
                  case REACT_PROVIDER_TYPE:
                    return $$typeofType
                  default:
                    return $$typeof
                }
            }
          case REACT_PORTAL_TYPE:
            return $$typeof
        }
      }
      return undefined
    }
    var AsyncMode = REACT_ASYNC_MODE_TYPE
    var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE
    var ContextConsumer = REACT_CONTEXT_TYPE
    var ContextProvider = REACT_PROVIDER_TYPE
    var Element = REACT_ELEMENT_TYPE
    var ForwardRef = REACT_FORWARD_REF_TYPE
    var Fragment = REACT_FRAGMENT_TYPE
    var Lazy = REACT_LAZY_TYPE
    var Memo = REACT_MEMO_TYPE
    var Portal = REACT_PORTAL_TYPE
    var Profiler = REACT_PROFILER_TYPE
    var StrictMode = REACT_STRICT_MODE_TYPE
    var Suspense = REACT_SUSPENSE_TYPE
    var hasWarnedAboutDeprecatedIsAsyncMode = false
    function isAsyncMode(object) {
      {
        if (!hasWarnedAboutDeprecatedIsAsyncMode) {
          hasWarnedAboutDeprecatedIsAsyncMode = true
          console['warn'](
            'The ReactIs.isAsyncMode() alias has been deprecated, ' +
              'and will be removed in React 17+. Update your code to use ' +
              'ReactIs.isConcurrentMode() instead. It has the exact same API.'
          )
        }
      }
      return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE
    }
    function isConcurrentMode(object) {
      return typeOf(object) === REACT_CONCURRENT_MODE_TYPE
    }
    function isContextConsumer(object) {
      return typeOf(object) === REACT_CONTEXT_TYPE
    }
    function isContextProvider(object) {
      return typeOf(object) === REACT_PROVIDER_TYPE
    }
    function isElement(object) {
      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE
    }
    function isForwardRef(object) {
      return typeOf(object) === REACT_FORWARD_REF_TYPE
    }
    function isFragment(object) {
      return typeOf(object) === REACT_FRAGMENT_TYPE
    }
    function isLazy(object) {
      return typeOf(object) === REACT_LAZY_TYPE
    }
    function isMemo(object) {
      return typeOf(object) === REACT_MEMO_TYPE
    }
    function isPortal(object) {
      return typeOf(object) === REACT_PORTAL_TYPE
    }
    function isProfiler(object) {
      return typeOf(object) === REACT_PROFILER_TYPE
    }
    function isStrictMode(object) {
      return typeOf(object) === REACT_STRICT_MODE_TYPE
    }
    function isSuspense(object) {
      return typeOf(object) === REACT_SUSPENSE_TYPE
    }
    reactIs_development.AsyncMode = AsyncMode
    reactIs_development.ConcurrentMode = ConcurrentMode
    reactIs_development.ContextConsumer = ContextConsumer
    reactIs_development.ContextProvider = ContextProvider
    reactIs_development.Element = Element
    reactIs_development.ForwardRef = ForwardRef
    reactIs_development.Fragment = Fragment
    reactIs_development.Lazy = Lazy
    reactIs_development.Memo = Memo
    reactIs_development.Portal = Portal
    reactIs_development.Profiler = Profiler
    reactIs_development.StrictMode = StrictMode
    reactIs_development.Suspense = Suspense
    reactIs_development.isAsyncMode = isAsyncMode
    reactIs_development.isConcurrentMode = isConcurrentMode
    reactIs_development.isContextConsumer = isContextConsumer
    reactIs_development.isContextProvider = isContextProvider
    reactIs_development.isElement = isElement
    reactIs_development.isForwardRef = isForwardRef
    reactIs_development.isFragment = isFragment
    reactIs_development.isLazy = isLazy
    reactIs_development.isMemo = isMemo
    reactIs_development.isPortal = isPortal
    reactIs_development.isProfiler = isProfiler
    reactIs_development.isStrictMode = isStrictMode
    reactIs_development.isSuspense = isSuspense
    reactIs_development.isValidElementType = isValidElementType
    reactIs_development.typeOf = typeOf
  })()
}

{
  reactIs.exports = reactIs_development
}

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

var getOwnPropertySymbols = Object.getOwnPropertySymbols
var hasOwnProperty = Object.prototype.hasOwnProperty
var propIsEnumerable = Object.prototype.propertyIsEnumerable
function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined')
  }
  return Object(val)
}
function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false
    }
    var test1 = new String('abc')
    test1[5] = 'de'
    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false
    }
    var test2 = {}
    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n]
    })
    if (order2.join('') !== '0123456789') {
      return false
    }
    var test3 = {}
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter
    })
    if (Object.keys(_extends({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false
    }
    return true
  } catch (err) {
    return false
  }
}
var objectAssign = shouldUseNative()
  ? Object.assign
  : function (target, source) {
      var from
      var to = toObject(target)
      var symbols
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s])
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key]
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from)
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]]
            }
          }
        }
      }
      return to
    }

var ReactPropTypesSecret$2 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED'
var ReactPropTypesSecret_1 = ReactPropTypesSecret$2

var has$2 = Function.call.bind(Object.prototype.hasOwnProperty)

var printWarning$1 = function printWarning() {}
{
  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1
  var loggedTypeFailures = {}
  var has$1 = has$2
  printWarning$1 = function printWarning(text) {
    var message = 'Warning: ' + text
    if (typeof console !== 'undefined') {
      console.error(message)
    }
    try {
      throw new Error(message)
    } catch (x) {}
  }
}
function checkPropTypes$1(typeSpecs, values, location, componentName, getStack) {
  {
    for (var typeSpecName in typeSpecs) {
      if (has$1(typeSpecs, typeSpecName)) {
        var error
        try {
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') +
                ': ' +
                location +
                ' type `' +
                typeSpecName +
                '` is invalid; ' +
                'it must be a function, usually from the `prop-types` package, but received `' +
                typeof typeSpecs[typeSpecName] +
                '`.' +
                'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            )
            err.name = 'Invariant Violation'
            throw err
          }
          error = typeSpecs[typeSpecName](
            values,
            typeSpecName,
            componentName,
            location,
            null,
            ReactPropTypesSecret$1
          )
        } catch (ex) {
          error = ex
        }
        if (error && !(error instanceof Error)) {
          printWarning$1(
            (componentName || 'React class') +
              ': type specification of ' +
              location +
              ' `' +
              typeSpecName +
              '` is invalid; the type checker ' +
              'function must return `null` or an `Error` but returned a ' +
              typeof error +
              '. ' +
              'You may have forgotten to pass an argument to the type checker ' +
              'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
              'shape all require an argument).'
          )
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          loggedTypeFailures[error.message] = true
          var stack = getStack ? getStack() : ''
          printWarning$1(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          )
        }
      }
    }
  }
}
checkPropTypes$1.resetWarningCache = function () {
  {
    loggedTypeFailures = {}
  }
}
var checkPropTypes_1 = checkPropTypes$1

var ReactIs$1 = reactIs.exports
var assign = objectAssign
var ReactPropTypesSecret = ReactPropTypesSecret_1
var has = has$2
var checkPropTypes = checkPropTypes_1
var printWarning = function printWarning() {}
{
  printWarning = function printWarning(text) {
    var message = 'Warning: ' + text
    if (typeof console !== 'undefined') {
      console.error(message)
    }
    try {
      throw new Error(message)
    } catch (x) {}
  }
}
function emptyFunctionThatReturnsNull() {
  return null
}
var factoryWithTypeCheckers = function factoryWithTypeCheckers(
  isValidElement,
  throwOnDirectAccess
) {
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator
  var FAUX_ITERATOR_SYMBOL = '@@iterator'
  function getIteratorFn(maybeIterable) {
    var iteratorFn =
      maybeIterable &&
      ((ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL]) || maybeIterable[FAUX_ITERATOR_SYMBOL])
    if (typeof iteratorFn === 'function') {
      return iteratorFn
    }
  }
  var ANONYMOUS = '<<anonymous>>'
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),
    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  }
  function is(x, y) {
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y
    } else {
      return x !== x && y !== y
    }
  }
  function PropTypeError(message, data) {
    this.message = message
    this.data = data && typeof data === 'object' ? data : {}
    this.stack = ''
  }
  PropTypeError.prototype = Error.prototype
  function createChainableTypeChecker(validate) {
    {
      var manualPropTypeCallCache = {}
      var manualPropTypeWarningCount = 0
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS
      propFullName = propFullName || propName
      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
              'Use `PropTypes.checkPropTypes()` to call them. ' +
              'Read more at http://fb.me/use-check-prop-types'
          )
          err.name = 'Invariant Violation'
          throw err
        } else if (typeof console !== 'undefined') {
          var cacheKey = componentName + ':' + propName
          if (!manualPropTypeCallCache[cacheKey] && manualPropTypeWarningCount < 3) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
                'function for the `' +
                propFullName +
                '` prop on `' +
                componentName +
                '`. This is deprecated ' +
                'and will throw in the standalone `prop-types` package. ' +
                'You may be seeing this warning due to a third-party PropTypes ' +
                'library. See https://fb.me/react-warning-dont-call-proptypes ' +
                'for details.'
            )
            manualPropTypeCallCache[cacheKey] = true
            manualPropTypeWarningCount++
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError(
              'The ' +
                location +
                ' `' +
                propFullName +
                '` is marked as required ' +
                ('in `' + componentName + '`, but its value is `null`.')
            )
          }
          return new PropTypeError(
            'The ' +
              location +
              ' `' +
              propFullName +
              '` is marked as required in ' +
              ('`' + componentName + '`, but its value is `undefined`.')
          )
        }
        return null
      } else {
        return validate(props, propName, componentName, location, propFullName)
      }
    }
    var chainedCheckType = checkType.bind(null, false)
    chainedCheckType.isRequired = checkType.bind(null, true)
    return chainedCheckType
  }
  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName]
      var propType = getPropType(propValue)
      if (propType !== expectedType) {
        var preciseType = getPreciseType(propValue)
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type ' +
            ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') +
            ('`' + expectedType + '`.'),
          { expectedType: expectedType }
        )
      }
      return null
    }
    return createChainableTypeChecker(validate)
  }
  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull)
  }
  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError(
          'Property `' +
            propFullName +
            '` of component `' +
            componentName +
            '` has invalid PropType notation inside arrayOf.'
        )
      }
      var propValue = props[propName]
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue)
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type ' +
            ('`' + propType + '` supplied to `' + componentName + '`, expected an array.')
        )
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(
          propValue,
          i,
          componentName,
          location,
          propFullName + '[' + i + ']',
          ReactPropTypesSecret
        )
        if (error instanceof Error) {
          return error
        }
      }
      return null
    }
    return createChainableTypeChecker(validate)
  }
  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName]
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue)
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type ' +
            ('`' +
              propType +
              '` supplied to `' +
              componentName +
              '`, expected a single ReactElement.')
        )
      }
      return null
    }
    return createChainableTypeChecker(validate)
  }
  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName]
      if (!ReactIs$1.isValidElementType(propValue)) {
        var propType = getPropType(propValue)
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type ' +
            ('`' +
              propType +
              '` supplied to `' +
              componentName +
              '`, expected a single ReactElement type.')
        )
      }
      return null
    }
    return createChainableTypeChecker(validate)
  }
  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS
        var actualClassName = getClassName(props[propName])
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type ' +
            ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') +
            ('instance of `' + expectedClassName + '`.')
        )
      }
      return null
    }
    return createChainableTypeChecker(validate)
  }
  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' +
              arguments.length +
              ' arguments. ' +
              'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          )
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.')
        }
      }
      return emptyFunctionThatReturnsNull
    }
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName]
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null
        }
      }
      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value)
        if (type === 'symbol') {
          return String(value)
        }
        return value
      })
      return new PropTypeError(
        'Invalid ' +
          location +
          ' `' +
          propFullName +
          '` of value `' +
          String(propValue) +
          '` ' +
          ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.')
      )
    }
    return createChainableTypeChecker(validate)
  }
  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError(
          'Property `' +
            propFullName +
            '` of component `' +
            componentName +
            '` has invalid PropType notation inside objectOf.'
        )
      }
      var propValue = props[propName]
      var propType = getPropType(propValue)
      if (propType !== 'object') {
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type ' +
            ('`' + propType + '` supplied to `' + componentName + '`, expected an object.')
        )
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(
            propValue,
            key,
            componentName,
            location,
            propFullName + '.' + key,
            ReactPropTypesSecret
          )
          if (error instanceof Error) {
            return error
          }
        }
      }
      return null
    }
    return createChainableTypeChecker(validate)
  }
  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      printWarning('Invalid argument supplied to oneOfType, expected an instance of array.')
      return emptyFunctionThatReturnsNull
    }
    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i]
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
            'received ' +
            getPostfixForTypeWarning(checker) +
            ' at index ' +
            i +
            '.'
        )
        return emptyFunctionThatReturnsNull
      }
    }
    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = []
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i]
        var checkerResult = checker(
          props,
          propName,
          componentName,
          location,
          propFullName,
          ReactPropTypesSecret
        )
        if (checkerResult == null) {
          return null
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType)
        }
      }
      var expectedTypesMessage =
        expectedTypes.length > 0 ? ', expected one of type [' + expectedTypes.join(', ') + ']' : ''
      return new PropTypeError(
        'Invalid ' +
          location +
          ' `' +
          propFullName +
          '` supplied to ' +
          ('`' + componentName + '`' + expectedTypesMessage + '.')
      )
    }
    return createChainableTypeChecker(validate)
  }
  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` supplied to ' +
            ('`' + componentName + '`, expected a ReactNode.')
        )
      }
      return null
    }
    return createChainableTypeChecker(validate)
  }
  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') +
        ': ' +
        location +
        ' type `' +
        propFullName +
        '.' +
        key +
        '` is invalid; ' +
        'it must be a function, usually from the `prop-types` package, but received `' +
        type +
        '`.'
    )
  }
  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName]
      var propType = getPropType(propValue)
      if (propType !== 'object') {
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type `' +
            propType +
            '` ' +
            ('supplied to `' + componentName + '`, expected `object`.')
        )
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key]
        if (typeof checker !== 'function') {
          return invalidValidatorError(
            componentName,
            location,
            propFullName,
            key,
            getPreciseType(checker)
          )
        }
        var error = checker(
          propValue,
          key,
          componentName,
          location,
          propFullName + '.' + key,
          ReactPropTypesSecret
        )
        if (error) {
          return error
        }
      }
      return null
    }
    return createChainableTypeChecker(validate)
  }
  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName]
      var propType = getPropType(propValue)
      if (propType !== 'object') {
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type `' +
            propType +
            '` ' +
            ('supplied to `' + componentName + '`, expected `object`.')
        )
      }
      var allKeys = assign({}, props[propName], shapeTypes)
      for (var key in allKeys) {
        var checker = shapeTypes[key]
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(
            componentName,
            location,
            propFullName,
            key,
            getPreciseType(checker)
          )
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' +
              location +
              ' `' +
              propFullName +
              '` key `' +
              key +
              '` supplied to `' +
              componentName +
              '`.' +
              '\nBad object: ' +
              JSON.stringify(props[propName], null, '  ') +
              '\nValid keys: ' +
              JSON.stringify(Object.keys(shapeTypes), null, '  ')
          )
        }
        var error = checker(
          propValue,
          key,
          componentName,
          location,
          propFullName + '.' + key,
          ReactPropTypesSecret
        )
        if (error) {
          return error
        }
      }
      return null
    }
    return createChainableTypeChecker(validate)
  }
  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true
      case 'boolean':
        return !propValue
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode)
        }
        if (propValue === null || isValidElement(propValue)) {
          return true
        }
        var iteratorFn = getIteratorFn(propValue)
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue)
          var step
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false
              }
            }
          } else {
            while (!(step = iterator.next()).done) {
              var entry = step.value
              if (entry) {
                if (!isNode(entry[1])) {
                  return false
                }
              }
            }
          }
        } else {
          return false
        }
        return true
      default:
        return false
    }
  }
  function isSymbol(propType, propValue) {
    if (propType === 'symbol') {
      return true
    }
    if (!propValue) {
      return false
    }
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true
    }
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true
    }
    return false
  }
  function getPropType(propValue) {
    var propType = typeof propValue
    if (Array.isArray(propValue)) {
      return 'array'
    }
    if (propValue instanceof RegExp) {
      return 'object'
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol'
    }
    return propType
  }
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue
    }
    var propType = getPropType(propValue)
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date'
      } else if (propValue instanceof RegExp) {
        return 'regexp'
      }
    }
    return propType
  }
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value)
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type
      default:
        return type
    }
  }
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS
    }
    return propValue.constructor.name
  }
  ReactPropTypes.checkPropTypes = checkPropTypes
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache
  ReactPropTypes.PropTypes = ReactPropTypes
  return ReactPropTypes
}

{
  var ReactIs = reactIs.exports
  var throwOnDirectAccess = true
  propTypes.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess)
}
var PropTypes = propTypes.exports

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

var _excluded$1 = ['useNative', 'children']
function Modal(props) {
  var useNative = props.useNative,
    children = props.children,
    modalProps = _objectWithoutProperties(props, _excluded$1)
  return useNative
    ? React.createElement(Modal$1, modalProps, children)
    : React.createElement(Fragment, null, children)
}

var indexScssStyleSheet$3 = StyleSheet.create({
  'fta-action-sheet': {
    display: 'none',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 1010,
  },
  'fta-action-sheet__overlay': {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 1,
  },
  'fta-action-sheet__container': {
    borderTopLeftRadius: scalePx2dp(7.5),
    borderTopRightRadius: scalePx2dp(7.5),
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
  },
  'fta-action-sheet--active': {
    position: 'absolute',
    display: 'flex',
  },
})

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

var defaultContext = { careMode: false, platform: 'ymm', debugger: true }
var Context = createContext(defaultContext)
Context.displayName = 'GlobalConfigContext'
Context.Consumer

StyleSheet.create({
  'fta-text': {},
  'fta-text--1': {
    fontSize: scalePx2dp(21),
    lineHeight: scalePx2dp(27.3),
  },
  'fta-text--1--care': {
    fontSize: scalePx2dp(27.5),
    lineHeight: scalePx2dp(35.5),
  },
  'fta-text--2': {
    fontSize: scalePx2dp(19),
    lineHeight: scalePx2dp(24.7),
  },
  'fta-text--2--care': {
    fontSize: scalePx2dp(24.5),
    lineHeight: scalePx2dp(32),
  },
  'fta-text--3': {
    fontSize: scalePx2dp(17.5),
    lineHeight: scalePx2dp(22.75),
  },
  'fta-text--3--care': {
    fontSize: scalePx2dp(23),
    lineHeight: scalePx2dp(29.5),
  },
  'fta-text--4': {
    fontSize: scalePx2dp(15.5),
    lineHeight: scalePx2dp(20.15),
  },
  'fta-text--4--care': {
    fontSize: scalePx2dp(20),
    lineHeight: scalePx2dp(26),
  },
  'fta-text--5': {
    fontSize: scalePx2dp(13.5),
    lineHeight: scalePx2dp(17.55),
  },
  'fta-text--5--care': {
    fontSize: scalePx2dp(17.5),
    lineHeight: scalePx2dp(23),
  },
  'fta-text--6': {
    fontSize: scalePx2dp(11.5),
    lineHeight: scalePx2dp(14.95),
  },
  'fta-text--6--care': {
    fontSize: scalePx2dp(15),
    lineHeight: scalePx2dp(19.5),
  },
})

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr)
}

function _iterableToArray(iter) {
  if (
    (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
    iter['@@iterator'] != null
  )
    return Array.from(iter)
}

function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  )
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  )
}

StyleSheet.create({
  'fta-debugger': {
    position: 'absolute',
    bottom: scalePx2dp(50),
    right: scalePx2dp(20),
    width: scalePx2dp(40),
    height: scalePx2dp(40),
    backgroundColor: '#fff',
    borderRadius: scalePx2dp(150),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#fa871e',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  'fta-debugger__text': {
    color: '#fa871e',
  },
  'fta-debugger--care': {
    width: scalePx2dp(50),
    height: scalePx2dp(50),
  },
})

var Assets$1 = {
  close: {
    default:
      'https://image.ymm56.com/ymmfile/operation-biz/a5e1c2a8-e59e-4bb8-9a59-c8092d058258.png',
    circle:
      'https://image.ymm56.com/ymmfile/operation-biz/1e270684-078d-49c8-9e69-23fbe607404a.png',
    circleFull:
      'https://imagecdn.ymm56.com/ymmfile/static/resource/c4aa5762-5aad-40c8-9fab-9912569aec6c.png',
  },
  arrow: {
    true: 'https://imagecdn.ymm56.com/ymmfile/common-operation/65dd3d3d-1b53-4d36-b47a-160fce6d40f6.png',
    right:
      'https://imagecdn.ymm56.com/ymmfile/common-operation/65dd3d3d-1b53-4d36-b47a-160fce6d40f6.png',
    down: 'https://image.ymm56.com/ymmfile/operation-biz/27653ee0-6dc6-446a-a60c-38c322e280cc.png',
    up: 'https://image.ymm56.com/ymmfile/operation-biz/4193cb2e-863f-471f-b3bf-80f49c22069a.png',
    left: 'http://image.ymm56.com/boss/2018/1212/1544598761',
  },
  tip: {
    success:
      'https://imagecdn.ymm56.com/ymmfile/static/resource/a826715a-5d51-4bb9-8cd3-a2f75c03d1b7.png',
    error:
      'https://imagecdn.ymm56.com/ymmfile/static/resource/9c1dd2fc-40be-4363-ad7c-1038efba8f23.png',
    waiting:
      'https://imagecdn.ymm56.com/ymmfile/static/resource/f99ecdf5-66d2-4e59-9b20-425affff0f68.png',
    warning:
      'https://image.ymm56.com/ymmfile/operation-biz/ef9aa9a9-710f-40a6-922b-ac044ae168fb.png',
    info: 'https://image.ymm56.com/ymmfile/operation-biz/62398c75-bcc3-40c0-be5e-db16031c0fc5.png',
  },
  empty: {
    default:
      'https://image.ymm56.com/ymmfile/operation-biz/4469e30e-fe6b-4673-952c-c6a2d92ddc7b.png',
    error: 'https://image.ymm56.com/ymmfile/operation-biz/49c712cb-69cc-4e80-9ca8-d752605c403e.png',
  },
  check: {
    default:
      'https://imagecdn.ymm56.com/ymmfile/static/resource/f1b19e18-3105-4951-8e95-f0de00b221d2.png',
  },
  loading: {
    default:
      'https://imagecdn.ymm56.com/ymmfile/static/image/short_distance/rn_sd_loding_wihite_x2_2201280.png',
    blue: 'https://imagecdn.ymm56.com/ymmfile/static/image/short_distance/rn_loading_view_2201230.png',
  },
}

var TARO_ENV = 'rn'
var inWeb = TARO_ENV === 'h5'
var inWeapp = TARO_ENV === 'weapp'
var inAlipay = TARO_ENV === 'alipay'
var systemInfo = getSystemInfoSync()
systemInfo.windowWidth / 750
var px = function (size) {
  return size
}
var inIOS = systemInfo.platform === 'ios'
var inIPhone =
  systemInfo.system === 'iOS' ||
  systemInfo.brand === 'iPhone' ||
  systemInfo.model === 'iPhone' ||
  inIOS
var inNotch = inIPhone && (systemInfo.screenHeight >= 812 || systemInfo.screenWidth >= 812)
var inAndroid = systemInfo.platform === 'android'

getEnv()

var isUndef = function isUndef(val) {
  return typeof val === 'undefined'
}
var isString = function isString(val) {
  return typeof val === 'string'
}
var isFunction = function isFunction(val) {
  return typeof val === 'function'
}
var upperCase = function upperCase(val) {
  return val[0].toUpperCase() + val.slice(1)
}

var indexScssStyleSheet$2 = StyleSheet.create({})

var safeAreaContext = createContext({ disabled: false })

var safeArea = systemInfo.safeArea || { top: 0, bottom: 0, width: 0, height: 0, left: 0, right: 0 }
var isImmersive = systemInfo.screenHeight === systemInfo.windowHeight
var needSafeArea = isImmersive && inNotch
var _safeArea = {
  top: inAndroid
    ? 0
    : safeArea.top
    ? safeArea.top < 44 && inNotch
      ? 44
      : safeArea.top
    : isImmersive && inWeb
    ? (window._MBWEB_statusbarHeight || 0) / systemInfo.pixelRatio
    : inNotch
    ? 44
    : 0,
  bottom: safeArea.bottom
    ? systemInfo.screenHeight - safeArea.bottom
    : needSafeArea
    ? (window._MBWEB_bottombarHeight || 0) / systemInfo.pixelRatio
    : 0,
  left: safeArea.left,
  right: safeArea.right ? systemInfo.screenWidth - safeArea.right : 0,
}

var _excluded = ['disabled'],
  _excluded2 = ['className', 'style', 'children', 'useMargin'],
  _excluded3 = ['style', 'className', 'children', 'useMargin'],
  _excluded4 = ['disabled'],
  _excluded5 = ['top', 'bottom']
function ownKeys$3(object, enumerableOnly) {
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
function _objectSpread$3(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {}
    i % 2
      ? ownKeys$3(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      : ownKeys$3(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
        })
  }
  return target
}
function _createSuper$6(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$6()
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
function _isNativeReflectConstruct$6() {
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
function _getClassName$7() {
  var className = []
  var args = arguments[0]
  var type = Object.prototype.toString.call(args).slice(8, -1).toLowerCase()
  if (type === 'string') {
    args = args.trim()
    args && className.push(args)
  } else if (type === 'array') {
    args.forEach(function (cls) {
      cls = _getClassName$7(cls).trim()
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
function _getStyle$7(classNameExpression) {
  var className = _getClassName$7(classNameExpression)
  var classNameArr = className.split(/\s+/)
  var style = {}
  classNameArr.reduce((sty, cls) => Object.assign(sty, _styleSheet$8[cls.trim()]), style)
  return style
}
function _mergeEleStyles$4() {
  return [].concat.apply([], arguments).reduce((pre, cur) => Object.assign(pre, cur), {})
}
var _styleSheet$8 = indexScssStyleSheet$2
var SafeAreaView = (function (_Component) {
  _inherits(SafeAreaView, _Component)
  var _super = _createSuper$6(SafeAreaView)
  function SafeAreaView() {
    _classCallCheck(this, SafeAreaView)
    return _super.apply(this, arguments)
  }
  _createClass(SafeAreaView, [
    {
      key: 'getInlineStyle',
      value: function getInlineStyle(style) {
        var _objectSpread2
        var attr = this.props.useMargin ? 'margin' : 'padding'
        return _objectSpread$3(
          ((_objectSpread2 = {}),
          _defineProperty(_objectSpread2, attr + 'Top', px(_safeArea.top)),
          _defineProperty(_objectSpread2, attr + 'Bottom', px(_safeArea.bottom)),
          _defineProperty(_objectSpread2, attr + 'Left', px(_safeArea.left)),
          _defineProperty(_objectSpread2, attr + 'Right', px(_safeArea.right)),
          _objectSpread2),
          style
        )
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this = this
        return React.createElement(safeAreaContext.Consumer, null, function (ctx) {
          if (_this.props.disabled || ctx.disabled) {
            var _this$props = _this.props
            _this$props.disabled
            var _props = _objectWithoutProperties(_this$props, _excluded)
            return React.createElement(View, _props)
          }
          var _this$props2 = _this.props,
            className = _this$props2.className,
            style = _this$props2.style,
            children = _this$props2.children,
            useMargin = _this$props2.useMargin,
            props = _objectWithoutProperties(_this$props2, _excluded2)
          var rootCla = classNames(
            className,
            'fta-safe-area-container' + (useMargin ? '__margin' : '')
          )
          var rootStyle = _this.getInlineStyle(style)
          return React.createElement(
            View,
            _extends({}, props, { style: _mergeEleStyles$4(_getStyle$7(rootCla), rootStyle) }),
            children
          )
        })
      },
    },
  ])
  return SafeAreaView
})(Component)
SafeAreaView.defaultProps = { style: {}, disabled: false }
var SafeArea = (function (_Component2) {
  _inherits(SafeArea, _Component2)
  var _super2 = _createSuper$6(SafeArea)
  function SafeArea() {
    _classCallCheck(this, SafeArea)
    return _super2.apply(this, arguments)
  }
  _createClass(SafeArea, [
    {
      key: 'getInlineStyle',
      value: function getInlineStyle(position, style) {
        var attr = this.props.useMargin ? 'margin' : 'padding'
        return _objectSpread$3(
          _defineProperty({}, '' + attr + upperCase(position), px(_safeArea[position])),
          style
        )
      },
    },
    {
      key: 'renderSafeArea',
      value: function renderSafeArea(position, props) {
        props.style
        props.className
        var children = props.children,
          useMargin = props.useMargin,
          extraProps = _objectWithoutProperties(props, _excluded3)
        var rootStyle = this.getInlineStyle(position, props.style)
        var rootCla = classNames(
          props.className,
          'fta-safe-area-' + position + (useMargin ? '__margin' : '')
        )
        return React.createElement(
          View,
          _extends({}, extraProps, { style: _mergeEleStyles$4(_getStyle$7(rootCla), rootStyle) }),
          children
        )
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this
        return React.createElement(safeAreaContext.Consumer, null, function (ctx) {
          if (_this2.props.disabled || ctx.disabled) {
            var _this2$props = _this2.props
            _this2$props.disabled
            var _props2 = _objectWithoutProperties(_this2$props, _excluded4)
            return React.createElement(View, _props2)
          }
          var _this2$props2 = _this2.props,
            top = _this2$props2.top,
            bottom = _this2$props2.bottom,
            props = _objectWithoutProperties(_this2$props2, _excluded5)
          var position = !top && bottom ? 'bottom' : 'top'
          return _this2.renderSafeArea(position, props)
        })
      },
    },
  ])
  return SafeArea
})(Component)
SafeArea.defaultProps = { bottom: true, top: false, style: {}, disabled: false }
SafeArea.Consumer = safeAreaContext.Consumer
SafeArea.Provider = safeAreaContext.Provider
SafeArea.View = SafeAreaView

var bodyScssStyleSheet = StyleSheet.create({})

function _createSuper$5(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$5()
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
function _isNativeReflectConstruct$5() {
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
function _getClassName$6() {
  var className = []
  var args = arguments[0]
  var type = Object.prototype.toString.call(args).slice(8, -1).toLowerCase()
  if (type === 'string') {
    args = args.trim()
    args && className.push(args)
  } else if (type === 'array') {
    args.forEach(function (cls) {
      cls = _getClassName$6(cls).trim()
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
function _getStyle$6(classNameExpression) {
  var className = _getClassName$6(classNameExpression)
  var classNameArr = className.split(/\s+/)
  var style = {}
  classNameArr.reduce((sty, cls) => Object.assign(sty, _styleSheet$7[cls.trim()]), style)
  return style
}
var _styleSheet$7 = bodyScssStyleSheet
var AtActionSheetBody = (function (_React$Component) {
  _inherits(AtActionSheetBody, _React$Component)
  var _super = _createSuper$5(AtActionSheetBody)
  function AtActionSheetBody() {
    _classCallCheck(this, AtActionSheetBody)
    return _super.apply(this, arguments)
  }
  _createClass(AtActionSheetBody, [
    {
      key: 'render',
      value: function render() {
        var rootClass = classNames('fta-action-sheet__body', this.props.className)
        return React.createElement(View, { style: _getStyle$6(rootClass) }, this.props.children)
      },
    },
  ])
  return AtActionSheetBody
})(React.Component)

var activeScssStyleSheet = StyleSheet.create({
  'item-active': {
    backgroundColor: '#f5f5f5',
  },
})

var bodyItemScssStyleSheet = StyleSheet.create({
  'fta-action-sheet__item': {
    paddingTop: scalePx2dp(13.5),
    paddingRight: 0,
    paddingBottom: scalePx2dp(13.5),
    paddingLeft: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    borderBottomWidth: scalePx2dp(0.5),
    borderBottomColor: '#e9e9e9',
  },
  'fta-action-sheet__item__text': {
    fontSize: scalePx2dp(17.5),
    lineHeight: scalePx2dp(17.5),
    color: '#333',
  },
  'fta-action-sheet__item__hint': {
    color: '#999',
    fontSize: scalePx2dp(13.5),
    lineHeight: scalePx2dp(13.5),
    marginTop: scalePx2dp(6),
  },
  'item-no-border': {
    borderBottomWidth: 0,
  },
  'item-left': {
    alignItems: 'flex-start',
  },
})

function _createSuper$4(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$4()
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
function _isNativeReflectConstruct$4() {
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
function _getClassName$5() {
  var className = []
  var args = arguments[0]
  var type = Object.prototype.toString.call(args).slice(8, -1).toLowerCase()
  if (type === 'string') {
    args = args.trim()
    args && className.push(args)
  } else if (type === 'array') {
    args.forEach(function (cls) {
      cls = _getClassName$5(cls).trim()
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
function _getStyle$5(classNameExpression) {
  var className = _getClassName$5(classNameExpression)
  var classNameArr = className.split(/\s+/)
  var style = {}
  classNameArr.reduce((sty, cls) => Object.assign(sty, _styleSheet$6[cls.trim()]), style)
  return style
}
function _mergeEleStyles$3() {
  return [].concat.apply([], arguments).reduce((pre, cur) => Object.assign(pre, cur), {})
}
function _mergeStyles() {
  var newTarget = {}
  for (var index = 0; index < arguments.length; index++) {
    var target = arguments[index]
    for (var key in target) {
      newTarget[key] = _extends(newTarget[key] || {}, target[key])
    }
  }
  return newTarget
}
var _styleSheet$6 = _mergeStyles(activeScssStyleSheet, bodyItemScssStyleSheet)
var ActionSheetItem = (function (_React$Component) {
  _inherits(ActionSheetItem, _React$Component)
  var _super = _createSuper$4(ActionSheetItem)
  function ActionSheetItem() {
    var _this
    _classCallCheck(this, ActionSheetItem)
    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key]
    }
    _this = _super.call.apply(_super, [this].concat(_args))
    _this.handleClick = function (args) {
      var onClick = _this.props.onClick
      if (isFunction(onClick)) {
        onClick(args)
      }
    }
    return _this
  }
  _createClass(ActionSheetItem, [
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          textClassName = _this$props.textClassName,
          textStyle = _this$props.textStyle,
          noBorder = _this$props.noBorder,
          hint = _this$props.hint,
          left = _this$props.left
        var rootClass = classNames(
          'fta-action-sheet__item',
          noBorder && 'item-no-border',
          left && 'item-left',
          className
        )
        var textClass = classNames('fta-action-sheet__item__text', textClassName)
        var fragment = isString(children)
          ? React.createElement(
              Text,
              { style: _mergeEleStyles$3(_getStyle$5(textClass), textStyle) },
              children
            )
          : children
        var hintNode = isString(hint)
          ? React.createElement(
              Text,
              { style: _styleSheet$6['fta-action-sheet__item__hint'] },
              hint
            )
          : hint
        return React.createElement(
          View,
          {
            onClick: this.handleClick,
            hoverStyle: { opacity: 0.6 },
            style: _getStyle$5(rootClass),
          },
          fragment,
          hint ? hintNode : null
        )
      },
    },
  ])
  return ActionSheetItem
})(React.Component)
ActionSheetItem.defaultProps = { left: false }
ActionSheetItem.propTypes = { onClick: PropTypes.func }

var footerScssStyleSheet = StyleSheet.create({
  'fta-action-sheet__footer': {
    paddingTop: scalePx2dp(13.5),
    paddingRight: 0,
    paddingBottom: scalePx2dp(13.5),
    paddingLeft: 0,
    borderTopWidth: scalePx2dp(6),
    borderTopColor: '#f7f7f7',
    textAlign: 'center',
  },
  'fta-action-sheet__footer__text': {
    fontSize: scalePx2dp(17.5),
    color: '#333',
    textAlign: 'center',
  },
  'fta-action-sheet-footer': {
    borderTopWidth: scalePx2dp(0.5),
    borderTopColor: '#e9e9e9',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: scalePx2dp(65.5),
  },
})

var indexScssStyleSheet$1 = StyleSheet.create({
  'fta-button': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
    paddingTop: 0,
    paddingRight: scalePx2dp(15.5),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(15.5),
    height: scalePx2dp(42),
    color: '#333',
    fontSize: scalePx2dp(17.5),
    lineHeight: scalePx2dp(43),
    textAlign: 'center',
    borderRadius: scalePx2dp(6),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e9e9e9',
  },
  'fta-button__wxbutton': {
    position: 'absolute',
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    opacity: 0,
    zIndex: 1,
  },
  'fta-button--active': {
    opacity: 0.6,
  },
  'fta-button--disabled': {
    opacity: 0.3,
  },
  'fta-button--large': {
    height: scalePx2dp(42),
    paddingTop: 0,
    paddingRight: scalePx2dp(11.5),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(11.5),
    borderRadius: scalePx2dp(7.5),
    width: scalePx2dp(317),
  },
  'fta-button--large--circle': {
    borderRadius: scalePx2dp(24),
  },
  'fta-button--medium': {
    height: scalePx2dp(30.5),
    paddingTop: 0,
    paddingRight: scalePx2dp(11.5),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(11.5),
    borderRadius: scalePx2dp(6),
    width: scalePx2dp(153.5),
  },
  'fta-button--medium--circle': {
    borderRadius: scalePx2dp(17.5),
  },
  'fta-button--small': {
    height: scalePx2dp(23),
    paddingTop: 0,
    paddingRight: scalePx2dp(11.5),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(11.5),
    borderRadius: scalePx2dp(4),
  },
  'fta-button--small--circle': {
    borderRadius: scalePx2dp(13.5),
  },
  'fta-button--primary': {
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: '#fa871e',
    backgroundColor: '#fa871e',
  },
  'fta-button--primary--disabled': {
    backgroundColor: '#fa871e',
    opacity: 0.4,
  },
  'fta-button--primary--active': {
    backgroundColor: '#fa871e',
    opacity: 0.8,
  },
  'fta-button--secondary': {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#fa871e',
    backgroundColor: '#fff',
  },
  'fta-button--secondary--disabled': {
    backgroundColor: '#fff',
    opacity: 0.4,
  },
  'fta-button--secondary--active': {
    backgroundColor: '#fff',
    opacity: 0.8,
  },
  'fta-button--tertiary': {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#fa871e',
    backgroundColor: '#fff',
  },
  'fta-button--tertiary--disabled': {
    backgroundColor: '#fff',
    opacity: 0.4,
  },
  'fta-button--tertiary--active': {
    backgroundColor: '#fff',
    opacity: 0.8,
  },
  'fta-button__text': {
    fontSize: scalePx2dp(15.5),
  },
  'fta-button__text--loading': {
    marginLeft: scalePx2dp(7.5),
  },
  'fta-button__text--primary': {
    color: '#fff',
  },
  'fta-button__text--primary--disabled': {
    color: '#fff',
  },
  'fta-button__text--secondary': {
    color: '#fa871e',
  },
  'fta-button__text--secondary--disabled': {
    color: '#fa871e',
  },
  'fta-button__text--tertiary': {
    color: '#fa871e',
  },
  'fta-button__text--tertiary--disabled': {
    color: '#fa871e',
  },
  'fta-button__text--large': {
    fontSize: scalePx2dp(15.5),
  },
  'fta-button__text--medium': {
    fontSize: scalePx2dp(13.5),
  },
  'fta-button__text--small': {
    fontSize: scalePx2dp(11.5),
  },
  'fta-button--circle': {
    borderRadius: scalePx2dp(22),
    overflow: 'hidden',
  },
  'fta-button--full': {
    width: '100%',
    maxWidth: '100%',
    borderRadius: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
})

var indexScssStyleSheet = StyleSheet.create({
  'fta-loading': {
    overflow: 'hidden',
    width: scalePx2dp(15.5),
    height: scalePx2dp(15.5),
  },
  'fta-loading--small': {
    width: scalePx2dp(15.5),
    height: scalePx2dp(15.5),
  },
  'fta-loading--medium': {
    width: scalePx2dp(19),
    height: scalePx2dp(19),
  },
  'fta-loading--large': {
    width: scalePx2dp(23),
    height: scalePx2dp(23),
  },
  'fta-loading__view': {
    borderRadius: scalePx2dp(5000),
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderTopColor: '#fa871e',
    borderRightColor: '#fa871e',
    borderBottomColor: '#fa871e',
    borderLeftColor: 'transparent',
  },
  'fta-loading__view--small': {
    borderWidth: 1,
  },
  'fta-loading__view--medium': {
    borderWidth: 2,
  },
  'fta-loading__view--large': {
    borderWidth: 3,
  },
  'fta-loading__image': {
    width: '100%',
    height: '100%',
  },
  'fta-loading--circle': {
    borderRadius: scalePx2dp(5000),
  },
})

var Assets = {
  default:
    'https://imagecdn.ymm56.com/ymmfile/static/image/short_distance/rn_sd_loding_wihite_x2_2201280.png',
  dt: 'https://imagecdn.ymm56.com/ymmfile/static/image/short_distance/rn_loading_view_2201230.png',
}

function ownKeys$2(object, enumerableOnly) {
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
function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {}
    i % 2
      ? ownKeys$2(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      : ownKeys$2(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
        })
  }
  return target
}
function _getClassName$4() {
  var className = []
  var args = arguments[0]
  var type = Object.prototype.toString.call(args).slice(8, -1).toLowerCase()
  if (type === 'string') {
    args = args.trim()
    args && className.push(args)
  } else if (type === 'array') {
    args.forEach(function (cls) {
      cls = _getClassName$4(cls).trim()
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
function _getStyle$4(classNameExpression) {
  var className = _getClassName$4(classNameExpression)
  var classNameArr = className.split(/\s+/)
  var style = {}
  classNameArr.reduce((sty, cls) => Object.assign(sty, _styleSheet$5[cls.trim()]), style)
  return style
}
function _mergeEleStyles$2() {
  return [].concat.apply([], arguments).reduce((pre, cur) => Object.assign(pre, cur), {})
}
var _styleSheet$5 = indexScssStyleSheet
var EASING = {
  ease: Easing.inOut(Easing.ease),
  linear: Easing.linear,
  'ease-in': Easing.in(Easing.ease),
  'ease-out': Easing.out(Easing.ease),
  'ease-in-out': Easing.inOut(Easing.ease),
}
function Loading(props) {
  var angleAnim = useRef(new Animated.Value(0)).current
  var animateRef = useRef({ stop: function stop() {}, start: function start() {} })
  var src = props.src,
    customStyle = props.customStyle,
    className = props.className,
    style = props.style,
    stop = props.stop,
    duration = props.duration,
    easing = props.easing,
    circle = props.circle,
    useImage = props.useImage,
    size = props.size,
    color = props.color,
    tintColor = props.tintColor
  var run = function run() {
    animateRef.current = Animated.loop(
      Animated.timing(angleAnim, {
        duration: duration * 1000,
        toValue: 1,
        useNativeDriver: false,
        easing: EASING[easing] || Easing.bezier.apply(Easing, _toConsumableArray(easing)),
      })
    )
    animateRef.current.start()
  }
  var spin = angleAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] })
  useEffect(
    function () {
      stop ? (animateRef.current.stop == null ? void 0 : animateRef.current.stop()) : run()
      return animateRef.current.stop
    },
    [stop]
  )
  var rootClz = classNames('fta-loading', 'fta-loading--' + size, className)
  var borderStyle = color
    ? {
        borderTopColor: color,
        borderRightColor: color,
        borderBottomColor: color,
        borderLeftColor: 'transparent',
      }
    : {}
  return React.createElement(
    View,
    {
      style: _mergeEleStyles$2(
        _getStyle$4(rootClz),
        _objectSpread$2(
          _objectSpread$2(_objectSpread$2({}, customStyle), style),
          {},
          { borderRadius: circle ? 1000 : 0 }
        )
      ),
    },
    useImage
      ? React.createElement(Animated.Image, {
          source: { uri: src },
          style: _mergeEleStyles$2(_styleSheet$5['fta-loading__image'], {
            transform: [{ rotate: spin }],
          }),
        })
      : React.createElement(
          Animated.View,
          {
            style: _mergeEleStyles$2(
              _getStyle$4(classNames('fta-loading__view', 'fta-loading__view--' + size)),
              _objectSpread$2({ transform: [{ rotate: spin }] }, borderStyle)
            ),
          },
          inAndroid
            ? React.createElement(View, {
                style: {
                  width: '100%',
                  height: '100%',
                  top: '50%',
                  left: '50%',
                  backgroundColor: tintColor,
                },
              })
            : null
        )
  )
}
Loading.defaultProps = {
  size: 'medium',
  src: Assets.default,
  duration: 1,
  easing: 'linear',
  tintColor: '#fff',
}

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
function _createSuper$3(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$3()
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
function _getClassName$3() {
  var className = []
  var args = arguments[0]
  var type = Object.prototype.toString.call(args).slice(8, -1).toLowerCase()
  if (type === 'string') {
    args = args.trim()
    args && className.push(args)
  } else if (type === 'array') {
    args.forEach(function (cls) {
      cls = _getClassName$3(cls).trim()
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
function _getStyle$3(classNameExpression) {
  var className = _getClassName$3(classNameExpression)
  var classNameArr = className.split(/\s+/)
  var style = {}
  classNameArr.reduce((sty, cls) => Object.assign(sty, _styleSheet$4[cls.trim()]), style)
  return style
}
function _mergeEleStyles$1() {
  return [].concat.apply([], arguments).reduce((pre, cur) => Object.assign(pre, cur), {})
}
var _styleSheet$4 = indexScssStyleSheet$1
var SIZE_CLASS = { small: 'small', medium: 'medium', large: 'large' }
var TYPE_CLASS = { primary: 'primary', secondary: 'secondary', tertiary: 'tertiary' }
var FTAButton = (function (_Component) {
  _inherits(FTAButton, _Component)
  var _super = _createSuper$3(FTAButton)
  function FTAButton(props) {
    _classCallCheck(this, FTAButton)
    return _super.call(this, props)
  }
  _createClass(FTAButton, [
    {
      key: 'onClick',
      value: function onClick(event) {
        if (!this.props.disabled) {
          this.props.onClick && this.props.onClick(event)
        }
      },
    },
    {
      key: 'onGetUserInfo',
      value: function onGetUserInfo(event) {
        this.props.onGetUserInfo && this.props.onGetUserInfo(event)
      },
    },
    {
      key: 'onContact',
      value: function onContact(event) {
        this.props.onContact && this.props.onContact(event)
      },
    },
    {
      key: 'onGetPhoneNumber',
      value: function onGetPhoneNumber(event) {
        this.props.onGetPhoneNumber && this.props.onGetPhoneNumber(event)
      },
    },
    {
      key: 'onError',
      value: function onError(event) {
        this.props.onError && this.props.onError(event)
      },
    },
    {
      key: 'onOpenSetting',
      value: function onOpenSetting(event) {
        this.props.onOpenSetting && this.props.onOpenSetting(event)
      },
    },
    {
      key: 'hoverStyle',
      get: function get() {
        var _this$props = this.props,
          disabled = _this$props.disabled,
          hoverStyle = _this$props.hoverStyle
        return disabled ? undefined : hoverStyle
      },
    },
    {
      key: 'hoverClass',
      get: function get() {
        var _this$props2 = this.props,
          disabled = _this$props2.disabled,
          hoverClassName = _this$props2.hoverClassName,
          type = _this$props2.type
        return disabled ? undefined : classNames('fta-button--' + type + '--active', hoverClassName)
      },
    },
    { key: 'onSumit', value: function onSumit(event) {} },
    { key: 'onReset', value: function onReset(event) {} },
    {
      key: 'render',
      value: function render() {
        var _classNames
        var _this$props3 = this.props,
          size = _this$props3.size,
          type = _this$props3.type,
          circle = _this$props3.circle,
          full = _this$props3.full,
          loading = _this$props3.loading,
          disabled = _this$props3.disabled,
          customStyle = _this$props3.customStyle,
          formType = _this$props3.formType,
          openType = _this$props3.openType,
          lang = _this$props3.lang,
          sessionFrom = _this$props3.sessionFrom,
          sendMessageTitle = _this$props3.sendMessageTitle,
          sendMessagePath = _this$props3.sendMessagePath,
          sendMessageImg = _this$props3.sendMessageImg,
          showMessageCard = _this$props3.showMessageCard,
          appParameter = _this$props3.appParameter,
          textClassName = _this$props3.textClassName,
          textStyle = _this$props3.textStyle,
          className = _this$props3.className,
          children = _this$props3.children,
          style = _this$props3.style
        var rootClassName = classNames(
          'fta-button',
          ((_classNames = {}),
          _defineProperty(_classNames, 'fta-button--' + SIZE_CLASS[size], SIZE_CLASS[size]),
          _defineProperty(_classNames, 'fta-button--' + type, TYPE_CLASS[type]),
          _defineProperty(_classNames, 'fta-button--' + size + '--circle', circle),
          _defineProperty(_classNames, 'fta-button--full', full),
          _classNames),
          disabled && ['fta-button--disabled', 'fta-button--' + type + '--disabled'],
          className
        )
        var textClass = classNames(
          'fta-button__text',
          'fta-button__text--' + (SIZE_CLASS[size] || 'default'),
          'fta-button__text--' + (TYPE_CLASS[type] || 'default'),
          disabled && 'fta-button__text--' + type + '--disabled',
          loading && 'fta-button__text--loading',
          textClassName
        )
        var loadingColor = type === 'primary' ? '#fff' : ''
        var loadingComponent
        if (loading === true) {
          loadingComponent = React.createElement(
            View,
            { style: _styleSheet$4['fta-button__icon'] },
            React.createElement(Loading, { color: loadingColor, size: size, useImage: true })
          )
          rootClassName = classNames(rootClassName)
        } else {
          loadingComponent = loading
        }
        React.createElement(Button, {
          lang: lang,
          disabled: disabled,
          formType: formType,
          style: _styleSheet$4['fta-button__wxbutton'],
        })
        React.createElement(Button, {
          formType: formType,
          openType: openType,
          lang: lang,
          sessionFrom: sessionFrom,
          sendMessageTitle: sendMessageTitle,
          sendMessagePath: sendMessagePath,
          sendMessageImg: sendMessageImg,
          showMessageCard: showMessageCard,
          appParameter: appParameter,
          onGetUserInfo: this.onGetUserInfo.bind(this),
          onGetPhoneNumber: this.onGetPhoneNumber.bind(this),
          onOpenSetting: this.onOpenSetting.bind(this),
          onError: this.onError.bind(this),
          onContact: this.onContact.bind(this),
          style: _styleSheet$4['fta-button__wxbutton'],
        })
        return React.createElement(
          View,
          {
            style: _mergeEleStyles$1(
              _getStyle$3(rootClassName),
              _objectSpread$1(_objectSpread$1({}, style), customStyle)
            ),
            onClick: this.onClick.bind(this),
            hoverStyle: _mergeEleStyles$1(_getStyle$3(this.hoverClass), this.hoverStyle),
            hoverClass: this.hoverClass,
          },
          inWeb,
          inWeapp,
          inAlipay,
          loadingComponent,
          isUndef(children)
            ? null
            : React.createElement(
                Text,
                { style: _mergeEleStyles$1(_getStyle$3(textClass), textStyle) },
                children
              )
        )
      },
    },
  ])
  return FTAButton
})(Component)
FTAButton.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  circle: PropTypes.bool,
  full: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  customStyle: PropTypes.object,
  textStyle: PropTypes.object,
  formType: PropTypes.oneOf(['submit', 'reset', '']),
  openType: PropTypes.oneOf([
    'contact',
    'share',
    'getUserInfo',
    'getPhoneNumber',
    'launchApp',
    'openSetting',
    'feedback',
    'getRealnameAuthInfo',
    'getAuthorize',
    'contactShare',
    '',
  ]),
  lang: PropTypes.string,
  sessionFrom: PropTypes.string,
  sendMessageTitle: PropTypes.string,
  sendMessagePath: PropTypes.string,
  sendMessageImg: PropTypes.string,
  showMessageCard: PropTypes.bool,
  appParameter: PropTypes.string,
  onGetUserInfo: PropTypes.func,
  onContact: PropTypes.func,
  onGetPhoneNumber: PropTypes.func,
  onError: PropTypes.func,
  onOpenSetting: PropTypes.func,
}
FTAButton.defaultProps = { customStyle: {}, textStyle: {}, type: 'primary' }

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
function _getClassName$2() {
  var className = []
  var args = arguments[0]
  var type = Object.prototype.toString.call(args).slice(8, -1).toLowerCase()
  if (type === 'string') {
    args = args.trim()
    args && className.push(args)
  } else if (type === 'array') {
    args.forEach(function (cls) {
      cls = _getClassName$2(cls).trim()
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
function _getStyle$2(classNameExpression) {
  var className = _getClassName$2(classNameExpression)
  var classNameArr = className.split(/\s+/)
  var style = {}
  classNameArr.reduce((sty, cls) => Object.assign(sty, _styleSheet$3[cls.trim()]), style)
  return style
}
var _styleSheet$3 = footerScssStyleSheet
var ActionSheetFooter = (function (_React$Component) {
  _inherits(ActionSheetFooter, _React$Component)
  var _super = _createSuper$2(ActionSheetFooter)
  function ActionSheetFooter() {
    var _this
    _classCallCheck(this, ActionSheetFooter)
    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key]
    }
    _this = _super.call.apply(_super, [this].concat(_args))
    _this.handleClick = function () {
      var onClick = _this.props.onClick
      if (isFunction(onClick)) {
        onClick.apply(void 0, arguments)
      }
    }
    return _this
  }
  _createClass(ActionSheetFooter, [
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          onConfirm = _this$props.onConfirm,
          confirmText = _this$props.confirmText,
          icon = _this$props.icon
        if (icon && confirmText) {
          return React.createElement(
            View,
            { style: _styleSheet$3['fta-action-sheet-footer'] },
            React.createElement(
              FTAButton,
              { size: 'large', type: 'primary', onClick: onConfirm },
              confirmText
            )
          )
        }
        var rootClass = classNames('fta-action-sheet__footer', className)
        var fragment =
          typeof children === 'string'
            ? React.createElement(
                Text,
                { style: _styleSheet$3['fta-action-sheet__footer__text'] },
                children
              )
            : children
        return React.createElement(
          View,
          {
            onClick: this.handleClick,
            hoverStyle: { opacity: 0.6 },
            style: _getStyle$2(rootClass),
          },
          fragment
        )
      },
    },
  ])
  return ActionSheetFooter
})(React.Component)
ActionSheetFooter.defaultProps = {}
ActionSheetFooter.propTypes = { onClick: PropTypes.func }

var headerScssStyleSheet = StyleSheet.create({
  'fta-action-sheet__header': {
    textAlign: 'center',
    paddingTop: scalePx2dp(13.5),
    paddingRight: 0,
    paddingBottom: scalePx2dp(13.5),
    paddingLeft: 0,
    backgroundColor: 'transparent',
    borderBottomWidth: scalePx2dp(0.5),
    borderBottomColor: '#e9e9e9',
    overflow: 'hidden',
    position: 'relative',
  },
  'fta-action-sheet__header--no-title': {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    minHeight: scalePx2dp(34.5),
  },
  'fta-action-sheet__header--no-border': {
    borderBottomWidth: 0,
  },
  'fta-action-sheet__header--complex': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: scalePx2dp(56),
  },
  'fta-action-sheet__header-confirm': {
    position: 'absolute',
    overflow: 'hidden',
    right: scalePx2dp(13.5),
    backgroundColor: '#fa871e',
    color: '#fff',
    lineHeight: scalePx2dp(15.5),
    fontSize: scalePx2dp(15.5),
    paddingTop: scalePx2dp(7.5),
    paddingRight: scalePx2dp(11.5),
    paddingBottom: scalePx2dp(7.5),
    paddingLeft: scalePx2dp(11.5),
    borderRadius: scalePx2dp(15.5),
  },
  'fta-action-sheet__header-cancel': {
    position: 'absolute',
    color: '#666',
    fontSize: scalePx2dp(15.5),
    left: scalePx2dp(13.5),
  },
  'fta-action-sheet__header-text': {
    color: '#333',
    fontWeight: 'bold',
    fontSize: scalePx2dp(15.5),
  },
  'fta-action-sheet__header-close': {
    width: scalePx2dp(15.5),
    height: scalePx2dp(15.5),
    position: 'absolute',
    right: scalePx2dp(13.5),
  },
  'fta-action-sheet__header__text': {
    color: '#b2b2b2',
    fontSize: scalePx2dp(17.5),
    textAlign: 'center',
  },
})

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
function _getClassName$1() {
  var className = []
  var args = arguments[0]
  var type = Object.prototype.toString.call(args).slice(8, -1).toLowerCase()
  if (type === 'string') {
    args = args.trim()
    args && className.push(args)
  } else if (type === 'array') {
    args.forEach(function (cls) {
      cls = _getClassName$1(cls).trim()
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
function _getStyle$1(classNameExpression) {
  var className = _getClassName$1(classNameExpression)
  var classNameArr = className.split(/\s+/)
  var style = {}
  classNameArr.reduce((sty, cls) => Object.assign(sty, _styleSheet$2[cls.trim()]), style)
  return style
}
var _styleSheet$2 = headerScssStyleSheet
var ActionSheetHeader = (function (_Component) {
  _inherits(ActionSheetHeader, _Component)
  var _super = _createSuper$1(ActionSheetHeader)
  function ActionSheetHeader() {
    _classCallCheck(this, ActionSheetHeader)
    return _super.apply(this, arguments)
  }
  _createClass(ActionSheetHeader, [
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className
        var noBorder = children && children.border === false
        var isComplexType = children && (children.title || children.icon)
        var isSimpleType = children && children.icon && !children.title
        var classObject = {
          'fta-action-sheet__header--complex': isComplexType,
          'fta-action-sheet__header--no-title': isSimpleType,
          'fta-action-sheet__header--no-border': noBorder,
        }
        var rootClass = classNames('fta-action-sheet__header', classObject, className)
        var fragment
        var icon = null
        if (isString(children)) {
          fragment = React.createElement(
            Text,
            { style: _styleSheet$2['fta-action-sheet__header__text'] },
            children
          )
        } else if (isComplexType) {
          var _ref = children,
            title = _ref.title,
            confirmText = _ref.confirmText,
            cancelText = _ref.cancelText,
            onCancel = _ref.onCancel,
            onConfirm = _ref.onConfirm,
            _icon = _ref.icon
          fragment = React.createElement(
            React.Fragment,
            null,
            isString(cancelText) && !_icon
              ? React.createElement(
                  Text,
                  { onClick: onCancel, style: _styleSheet$2['fta-action-sheet__header-cancel'] },
                  cancelText
                )
              : _icon
              ? null
              : cancelText,
            isString(title)
              ? React.createElement(
                  Text,
                  { style: _styleSheet$2['fta-action-sheet__header-text'] },
                  title
                )
              : title,
            isString(confirmText) && !_icon
              ? React.createElement(
                  Text,
                  { onClick: onConfirm, style: _styleSheet$2['fta-action-sheet__header-confirm'] },
                  confirmText
                )
              : _icon
              ? null
              : confirmText,
            _icon === true || isString(_icon)
              ? React.createElement(Image, {
                  src: isString(_icon) ? _icon || Assets$1.close.default : Assets$1.close.default,
                  onClick: onCancel,
                  style: _styleSheet$2['fta-action-sheet__header-close'],
                })
              : _icon
          )
        } else {
          fragment = children
        }
        return React.createElement(View, { style: _getStyle$1(rootClass) }, fragment, icon)
      },
    },
  ])
  return ActionSheetHeader
})(Component)

var exampleScssStyleSheet = StyleSheet.create({
  'fta-action-sheet-example': {
    position: 'absolute',
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '100%',
    marginBottom: scalePx2dp(19),
  },
})

var _styleSheet$1 = exampleScssStyleSheet
function Motion(props) {
  var _isOpened = props._isOpened,
    children = props.children,
    example = props.example,
    style = props.style,
    customStyle = props.customStyle
  var offsetAnim = useRef(new Animated.Value(0)).current
  var offset = offsetAnim.interpolate({ inputRange: [0, 1], outputRange: [300, 0] })
  var run = function run(toValue) {
    offsetAnim.setValue(1 - toValue)
    Animated.timing(offsetAnim, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.bezier(0.36, 0.66, 0.04, 1),
    }).start()
  }
  useEffect(
    function () {
      if (_isOpened) {
        run(1)
      } else {
        run(0)
      }
    },
    [_isOpened]
  )
  return React.createElement(
    Animated.View,
    { style: [{ transform: [{ translateY: offset }] }, style, customStyle] },
    example
      ? React.createElement(View, { style: _styleSheet$1['fta-action-sheet-example'] }, example)
      : null,
    children
  )
}

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
var _styleSheet = indexScssStyleSheet$3
var ActionSheet = (function (_React$Component) {
  _inherits(ActionSheet, _React$Component)
  var _super = _createSuper(ActionSheet)
  function ActionSheet(props) {
    var _this
    _classCallCheck(this, ActionSheet)
    _this = _super.call(this, props)
    _this.handleClose = function () {
      if (typeof _this.props.onClose === 'function') {
        _this.props.onClose()
      }
    }
    _this.handleCancel = function () {
      if (typeof _this.props.onCancel === 'function') {
        return _this.props.onCancel()
      }
      _this.close()
    }
    _this.close = function () {
      if (_this.props.clickOverlayOnClose) {
        _this.setState({ _isOpened: false }, _this.handleClose)
      }
    }
    _this.handleTouchMove = function (e) {
      e.stopPropagation == null ? void 0 : e.stopPropagation()
      e.preventDefault == null ? void 0 : e.preventDefault()
    }
    var isOpened = props.isOpened
    _this.state = { _isOpened: isOpened }
    return _this
  }
  _createClass(ActionSheet, [
    {
      key: 'UNSAFE_componentWillReceiveProps',
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        var isOpened = nextProps.isOpened
        if (isOpened !== this.state._isOpened) {
          this.setState({ _isOpened: isOpened })
          !isOpened && this.handleClose()
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          title = _this$props.title,
          cancelText = _this$props.cancelText,
          className = _this$props.className,
          customStyle = _this$props.customStyle,
          containerClassName = _this$props.containerClassName,
          containerStyle = _this$props.containerStyle,
          useNativeModal = _this$props.useNativeModal,
          catchMove = _this$props.catchMove,
          example = _this$props.example
        var _isOpened = this.state._isOpened
        var rootClass = classNames(
          'fta-action-sheet',
          { 'fta-action-sheet--active': _isOpened },
          className
        )
        var containerClz = classNames('fta-action-sheet__container', containerClassName)
        return React.createElement(
          Modal,
          { transparent: true, visible: _isOpened, useNative: useNativeModal },
          React.createElement(
            View,
            { style: _mergeEleStyles(_getStyle(rootClass), customStyle), catchMove: catchMove },
            React.createElement(View, {
              onClick: this.close,
              onTouchMove: this.handleTouchMove,
              style: _styleSheet['fta-action-sheet__overlay'],
            }),
            React.createElement(
              Motion,
              {
                _isOpened: _isOpened,
                example: example,
                customStyle: _objectSpread({}, containerStyle),
                style: _getStyle(containerClz),
              },
              title ? React.createElement(ActionSheetHeader, null, title) : null,
              React.createElement(AtActionSheetBody, null, this.props.children),
              cancelText || (title != null && title.icon && title != null && title.confirmText)
                ? React.createElement(
                    ActionSheetFooter,
                    {
                      onClick: this.handleCancel,
                      icon: title == null ? void 0 : title.icon,
                      confirmText: title == null ? void 0 : title.confirmText,
                      onConfirm: title == null ? void 0 : title.onConfirm,
                    },
                    cancelText
                  )
                : null,
              React.createElement(SafeArea, null)
            )
          )
        )
      },
    },
  ])
  return ActionSheet
})(React.Component)
ActionSheet.defaultProps = {
  title: '',
  cancelText: '',
  isOpened: false,
  useNativeModal: true,
  catchMove: true,
  clickOverlayOnClose: true,
}
ActionSheet.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  isOpened: PropTypes.bool.isRequired,
  cancelText: PropTypes.string,
}

export {
  ActionSheetItem,
  ActionSheetItem as Item,
  ActionSheetItem as SheetItem,
  ActionSheet as default,
}
