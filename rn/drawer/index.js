import View from '@fta/components-rn/dist/components/View'
import React, { Fragment, createContext, Component } from 'react'
import { Modal as Modal$1, StyleSheet } from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'
import Image from '@fta/components-rn/dist/components/Image'
import Text from '@fta/components-rn/dist/components/Text'
import {
  px,
  ConfigConsumer,
  useClassesWithCare,
  inRN,
  Assets,
  systemInfo,
  inAndroid,
  inNotch,
  inWeb,
  inAlipay,
  upperCase,
} from '../common'

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

var indexScssStyleSheet$2 = StyleSheet.create({
  'fta-drawer': {
    position: 'relative',
    zIndex: 900,
  },
  'fta-drawer__mask': {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  'fta-drawer__content': {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: scalePx2dp(230),
    textAlign: 'left',
    backgroundColor: '#fff',
    zIndex: 901,
  },
  'fta-drawer--left': {
    left: 0,
    right: 'auto',
  },
  'fta-drawer--right': {
    left: 'auto',
    right: 0,
  },
})

var indexScssStyleSheet$1 = StyleSheet.create({
  'fta-icon__badge': {
    top: scalePx2dp(-11.5),
    left: scalePx2dp(11.5),
  },
  'fta-icon__dot': {
    top: scalePx2dp(-6),
    left: scalePx2dp(17),
  },
  'fta-icon': {
    borderRadius: scalePx2dp(3),
  },
  'fta-icon--medium': {
    width: scalePx2dp(23),
    height: scalePx2dp(23),
  },
  'fta-icon--medium--care': {
    width: scalePx2dp(30),
    height: scalePx2dp(30),
  },
  'fta-icon--large': {
    width: scalePx2dp(46),
    height: scalePx2dp(46),
  },
  'fta-icon--large--care': {
    width: scalePx2dp(60),
    height: scalePx2dp(60),
  },
  'fta-icon--large__badge': {
    top: scalePx2dp(-7.5),
    left: scalePx2dp(11.5),
  },
  'fta-icon--large__badge--dot': {
    top: scalePx2dp(-6),
    left: scalePx2dp(17),
  },
})

var indexScssStyleSheet1 = StyleSheet.create({
  'fta-list': {
    backgroundColor: '#fff',
  },
})

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

var listItemScssStyleSheet = StyleSheet.create({
  'fta-list': {},
  'fta-list__item-container': {
    flexDirection: 'row',
    alignItems: 'center',
  },
  'item-icon': {
    marginRight: scalePx2dp(11.5),
  },
  'item-border-line': {
    borderBottomWidth: scalePx2dp(0.5),
    borderBottomColor: '#e9e9e9',
    marginLeft: scalePx2dp(11.5),
  },
  'fta-list__item': {
    paddingTop: scalePx2dp(9.5),
    paddingRight: scalePx2dp(11.5),
    paddingBottom: scalePx2dp(9.5),
    paddingLeft: scalePx2dp(11.5),
  },
  'item-thumb': {
    marginRight: scalePx2dp(11.5),
    width: scalePx2dp(19),
    height: scalePx2dp(19),
  },
  'item-thumb__info': {
    width: '100%',
    height: '100%',
  },
  'item-thumb--care': {
    width: scalePx2dp(24.5),
    height: scalePx2dp(24.5),
  },
  'fta-list__item--disabled': {
    opacity: 0.3,
  },
  'item-extra': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'item-extra__info': {
    maxWidth: '100%',
    color: '#999',
    paddingRight: scalePx2dp(12.66667),
    fontSize: scalePx2dp(13.5),
    lineHeight: scalePx2dp(17.55),
  },
  'item-extra__info--care': {
    fontSize: scalePx2dp(17.5),
    lineHeight: scalePx2dp(23),
  },
  'item-extra__icon': {
    right: scalePx2dp(-4),
    position: 'absolute',
  },
  'item-extra__icon-arrow': {
    width: scalePx2dp(12.66667),
    height: scalePx2dp(12.66667),
  },
  'item-extra__icon-arrow--care': {
    width: scalePx2dp(16.5),
    height: scalePx2dp(16.5),
  },
  'item-extra__image': {
    width: scalePx2dp(19),
    height: scalePx2dp(19),
    marginRight: scalePx2dp(12.66667),
  },
  'item-extra__image-info': {
    width: '100%',
    height: '100%',
  },
  'item-extra__image--care': {
    width: scalePx2dp(24.5),
    height: scalePx2dp(24.5),
  },
  'fta-list__item-content': {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    overflow: 'hidden',
    marginRight: scalePx2dp(12.66667),
  },
  'fta-list__item-extra': {
    maxWidth: scalePx2dp(113),
    textAlign: 'right',
  },
  'item-content__info-title': {
    color: '#333',
    fontSize: scalePx2dp(17.5),
    lineHeight: scalePx2dp(22.75),
  },
  'item-content__info-title--care': {
    fontSize: scalePx2dp(23),
    lineHeight: scalePx2dp(29.5),
  },
  'item-content__info-note': {
    color: '#999',
    fontSize: scalePx2dp(11.5),
    lineHeight: scalePx2dp(14.95),
  },
  'item-content__info-note--care': {
    fontSize: scalePx2dp(15),
    lineHeight: scalePx2dp(19.5),
  },
})

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
  classNameArr.reduce((sty, cls) => Object.assign(sty, _styleSheet$3[cls.trim()]), style)
  return style
}
function _mergeEleStyles$2() {
  return [].concat.apply([], arguments).reduce((pre, cur) => Object.assign(pre, cur), {})
}
var _styleSheet$3 = listItemScssStyleSheet
var ListItem = (function (_React$Component) {
  _inherits(ListItem, _React$Component)
  var _super = _createSuper$3(ListItem)
  function ListItem() {
    var _this
    _classCallCheck(this, ListItem)
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }
    _this = _super.call.apply(_super, [this].concat(args))
    _this.handleClick = function (event) {
      if (typeof _this.props.onClick === 'function' && !_this.props.disabled) {
        _this.props.onClick(event)
      }
    }
    return _this
  }
  _createClass(ListItem, [
    {
      key: 'render',
      value: function render() {
        var _this2 = this
        var _this$props = this.props,
          note = _this$props.note,
          arrow = _this$props.arrow,
          thumb = _this$props.thumb,
          iconInfo = _this$props.iconInfo,
          disabled = _this$props.disabled,
          hasBorder = _this$props.hasBorder,
          extraThumb = _this$props.extraThumb
        var _this$props2 = this.props,
          extraText = _this$props2.extraText,
          title = _this$props2.title
        extraText = String(extraText)
        title = String(title)
        var iconStyle = {}
        if (iconInfo != null && iconInfo.color) {
          iconStyle.color = iconInfo.color
        }
        if (iconInfo != null && iconInfo.size) {
          iconStyle.fontSize = px(iconInfo.size)
        }
        return React.createElement(ConfigConsumer, null, function (_ref) {
          var careMode = _ref.careMode
          var iconClz = []
          if (iconInfo != null && iconInfo.value) {
            iconClz.push(
              ((iconInfo && iconInfo.prefixClass) || 'fta-icon') +
                '-' +
                (iconInfo && iconInfo.value)
            )
          }
          var _useClassesWithCare = useClassesWithCare(
              careMode,
              ['fta-list__item', thumb && 'fta-list__item--thumb'],
              iconClz,
              ['item-thumb'],
              ['item-content__info-title'],
              ['item-content__info-note'],
              ['item-extra__info'],
              ['item-extra__image'],
              ['item-extra__icon-arrow']
            ),
            _useClassesWithCare2 = _slicedToArray(_useClassesWithCare, 8),
            rootCareClz = _useClassesWithCare2[0],
            iconCareClz = _useClassesWithCare2[1],
            thumbCareClz = _useClassesWithCare2[2],
            titleClz = _useClassesWithCare2[3],
            noteClz = _useClassesWithCare2[4],
            extraClz = _useClassesWithCare2[5],
            extraImgClz = _useClassesWithCare2[6],
            arrowClz = _useClassesWithCare2[7]
          return React.createElement(
            View,
            null,
            React.createElement(
              View,
              {
                onClick: _this2.handleClick,
                hoverStyle: disabled || { backgroundColor: '#F0F0F0' },
                style: _getStyle$3(
                  classNames(
                    rootCareClz,
                    {
                      'fta-list__item--multiple': note,
                      'fta-list__item--disabled': disabled,
                      'fta-list__item--no-border': !hasBorder,
                    },
                    _this2.props.className
                  )
                ),
              },
              React.createElement(
                View,
                { style: _styleSheet$3['fta-list__item-container'] },
                thumb &&
                  React.createElement(
                    View,
                    { style: _getStyle$3(classNames('fta-list__item-thumb', thumbCareClz)) },
                    React.createElement(Image, {
                      mode: 'scaleToFill',
                      src: thumb,
                      style: _styleSheet$3['item-thumb__info'],
                    })
                  ),
                iconInfo && iconInfo.value
                  ? React.createElement(
                      View,
                      {
                        style: _mergeEleStyles$2(
                          _styleSheet$3['fta-list__item-icon'],
                          _styleSheet$3['item-icon']
                        ),
                      },
                      React.createElement(Text, {
                        style: _mergeEleStyles$2(
                          _getStyle$3(
                            classNames(
                              iconCareClz,
                              (iconInfo && iconInfo.prefixClass) || 'fta-icon',
                              iconInfo && iconInfo.className
                            )
                          ),
                          iconStyle
                        ),
                      })
                    )
                  : null,
                React.createElement(
                  View,
                  {
                    style: _mergeEleStyles$2(
                      _styleSheet$3['fta-list__item-content'],
                      _styleSheet$3['item-content']
                    ),
                  },
                  React.createElement(Text, { style: _getStyle$3(titleClz) }, title),
                  note
                    ? React.createElement(
                        View,
                        null,
                        React.createElement(Text, { style: _getStyle$3(noteClz) }, note)
                      )
                    : null
                ),
                React.createElement(
                  View,
                  {
                    style: _mergeEleStyles$2(
                      _styleSheet$3['fta-list__item-extra'],
                      _styleSheet$3['item-extra']
                    ),
                  },
                  extraText &&
                    React.createElement(Text, { style: _getStyle$3(extraClz) }, extraText),
                  extraThumb &&
                    !extraText &&
                    React.createElement(
                      View,
                      { style: _getStyle$3(extraImgClz) },
                      React.createElement(Image, {
                        mode: 'aspectFit',
                        src: extraThumb,
                        style: _styleSheet$3['item-extra__image-info'],
                      })
                    ),
                  arrow
                    ? React.createElement(
                        View,
                        { style: _styleSheet$3['item-extra__icon'] },
                        !inRN
                          ? React.createElement(Text, {
                              style: _getStyle$3(
                                classNames(
                                  'fta-icon fta-icon-chevron-' + (arrow === true ? 'right' : arrow),
                                  arrowClz
                                )
                              ),
                            })
                          : React.createElement(Image, {
                              mode: 'aspectFit',
                              src: Assets.arrow[arrow],
                              style: _getStyle$3(classNames('fta-icon', arrowClz)),
                            })
                      )
                    : null
                )
              )
            ),
            inRN && hasBorder
              ? React.createElement(View, { style: _styleSheet$3['item-border-line'] })
              : null
          )
        })
      },
    },
  ])
  return ListItem
})(React.Component)
ListItem.defaultProps = {
  note: '',
  disabled: false,
  title: '',
  thumb: '',
  hasBorder: true,
  extraText: '',
  extraThumb: '',
  iconInfo: { value: '' },
}
ListItem.propTypes = {
  note: PropTypes.string,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  thumb: PropTypes.string,
  onClick: PropTypes.func,
  hasBorder: PropTypes.bool,
  extraText: PropTypes.string,
  extraThumb: PropTypes.string,
  arrow: PropTypes.oneOf(['up', 'down', 'right', true, false]),
  iconInfo: PropTypes.shape({
    size: PropTypes.number,
    value: PropTypes.string,
    color: PropTypes.string,
    prefixClass: PropTypes.string,
    customStyle: PropTypes.oneOfType([PropTypes.object]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  }),
}

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
  classNameArr.reduce((sty, cls) => Object.assign(sty, _styleSheet$2[cls.trim()]), style)
  return style
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
var _styleSheet$2 = _mergeStyles(indexScssStyleSheet$1, indexScssStyleSheet1)
var List = (function (_React$Component) {
  _inherits(List, _React$Component)
  var _super = _createSuper$2(List)
  function List() {
    _classCallCheck(this, List)
    return _super.apply(this, arguments)
  }
  _createClass(List, [
    {
      key: 'render',
      value: function render() {
        var rootClass = classNames(
          'fta-list',
          { 'fta-list--no-border': !this.props.hasBorder },
          this.props.className
        )
        return React.createElement(View, { style: _getStyle$2(rootClass) }, this.props.children)
      },
    },
  ])
  return List
})(React.Component)
List.defaultProps = { hasBorder: true }
List.propTypes = { hasBorder: PropTypes.bool }

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

var indexScssStyleSheet = StyleSheet.create({})

var safeAreaContext = createContext({ disabled: false })

var safeArea = systemInfo.safeArea || { top: 0, bottom: 0, width: 0, height: 0, left: 0, right: 0 }
var isImmersive = systemInfo.screenHeight === systemInfo.windowHeight
var needSafeArea = isImmersive && inNotch
var _safeArea = {
  top:
    inRN && inAndroid
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
  classNameArr.reduce((sty, cls) => Object.assign(sty, _styleSheet$1[cls.trim()]), style)
  return style
}
function _mergeEleStyles$1() {
  return [].concat.apply([], arguments).reduce((pre, cur) => Object.assign(pre, cur), {})
}
var _styleSheet$1 = indexScssStyleSheet
var SafeAreaView = (function (_Component) {
  _inherits(SafeAreaView, _Component)
  var _super = _createSuper$1(SafeAreaView)
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
        return _objectSpread(
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
        if (inAlipay) return React.createElement(Fragment, null, this.props.children)
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
            _extends({}, props, { style: _mergeEleStyles$1(_getStyle$1(rootCla), rootStyle) }),
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
  var _super2 = _createSuper$1(SafeArea)
  function SafeArea() {
    _classCallCheck(this, SafeArea)
    return _super2.apply(this, arguments)
  }
  _createClass(SafeArea, [
    {
      key: 'getInlineStyle',
      value: function getInlineStyle(position, style) {
        var attr = this.props.useMargin ? 'margin' : 'padding'
        return _objectSpread(
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
          _extends({}, extraProps, { style: _mergeEleStyles$1(_getStyle$1(rootCla), rootStyle) }),
          children
        )
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this
        if (inAlipay) return null
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
var _styleSheet = indexScssStyleSheet$2
var Drawer = (function (_React$Component) {
  _inherits(Drawer, _React$Component)
  var _super = _createSuper(Drawer)
  function Drawer(props) {
    var _this
    _classCallCheck(this, Drawer)
    _this = _super.call(this, props)
    _this.inRN = true
    _this.state = { animShow: false, _show: props.show }
    return _this
  }
  _createClass(Drawer, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _show = this.state._show
        if (_show) this.animShow()
      },
    },
    {
      key: 'onItemClick',
      value: function onItemClick(index) {
        this.props.onItemClick && this.props.onItemClick(index)
        this.animHide()
      },
    },
    {
      key: 'onHide',
      value: function onHide() {
        var _this2 = this
        this.setState({ _show: false }, function () {
          _this2.props.onClose && _this2.props.onClose()
        })
      },
    },
    {
      key: 'animHide',
      value: function animHide() {
        var _this3 = this
        this.setState({ animShow: false })
        if (this.inRN) {
          return this.onHide()
        }
        setTimeout(function () {
          _this3.onHide()
        }, 300)
      },
    },
    {
      key: 'animShow',
      value: function animShow() {
        var _this4 = this
        this.setState({ _show: true })
        if (this.inRN) {
          this.setState({ animShow: true })
          return
        }
        setTimeout(function () {
          _this4.setState({ animShow: true })
        }, 200)
      },
    },
    {
      key: 'onMaskClick',
      value: function onMaskClick() {
        this.animHide()
      },
    },
    {
      key: 'UNSAFE_componentWillReceiveProps',
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        var show = nextProps.show
        if (show !== this.state._show) {
          show ? this.animShow() : this.animHide()
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this5 = this
        var _this$props = this.props,
          mask = _this$props.mask,
          width = _this$props.width,
          right = _this$props.right,
          items = _this$props.items,
          useNativeModal = _this$props.useNativeModal
        var _this$state = this.state,
          animShow = _this$state.animShow,
          _show = _this$state._show
        var rootClassName = ['fta-drawer']
        var maskStyle = { display: mask ? 'flex' : 'none', opacity: animShow ? 1 : 0 }
        var listStyle = this.inRN
          ? {}
          : {
              width: width,
              transition: animShow
                ? 'all 225ms cubic-bezier(0, 0, 0.2, 1)'
                : 'all 195ms cubic-bezier(0.4, 0, 0.6, 1)',
            }
        var classObject = {
          'fta-drawer--show': animShow,
          'fta-drawer--right': right,
          'fta-drawer--left': !right,
        }
        var viewBody = _show
          ? React.createElement(
              Fragment,
              null,
              React.createElement(View, {
                style: _mergeEleStyles(_styleSheet['fta-drawer__mask'], maskStyle),
                onClick: this.onMaskClick.bind(this),
              }),
              React.createElement(
                View,
                {
                  style: _mergeEleStyles(
                    _getStyle(classNames('fta-drawer__content', classObject)),
                    listStyle
                  ),
                },
                React.createElement(
                  SafeArea.View,
                  null,
                  !!items && items.length
                    ? React.createElement(
                        List,
                        null,
                        items.map(function (name, index) {
                          return React.createElement(ListItem, {
                            key: name + '-' + index,
                            'data-index': index,
                            onClick: _this5.onItemClick.bind(_this5, index),
                            title: name,
                            arrow: 'right',
                          })
                        })
                      )
                    : this.props.children
                )
              )
            )
          : React.createElement(Fragment, null)
        return _show
          ? this.inRN
            ? viewBody
            : React.createElement(
                Modal,
                { transparent: true, useNative: useNativeModal },
                React.createElement(
                  View,
                  {
                    style: _getStyle(classNames(rootClassName, classObject, this.props.className)),
                  },
                  viewBody
                )
              )
          : React.createElement(Fragment, null)
      },
    },
  ])
  return Drawer
})(React.Component)
Drawer.defaultProps = {
  show: false,
  mask: true,
  width: '',
  right: false,
  items: [],
  useNativeModal: true,
}
Drawer.propTypes = {
  show: PropTypes.bool,
  mask: PropTypes.bool,
  width: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  onItemClick: PropTypes.func,
  onClose: PropTypes.func,
}

export { Drawer as default }
