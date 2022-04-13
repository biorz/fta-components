import View from '@fta/components-rn/dist/components/View'
import React, { createContext, useContext, Fragment, Component } from 'react'
import { systemInfo, inRN, inAndroid, inNotch, inWeb, px, inAlipay, upperCase } from '../common'
import { StyleSheet } from 'react-native'
import '@fta/runtime-rn/dist/scale2dp'

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

var indexScssStyleSheet = StyleSheet.create({})

var safeAreaContext = createContext({ disabled: false })
var useSafeArea = function useSafeArea() {
  return useContext(safeAreaContext)
}

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
var _styleSheet = indexScssStyleSheet
var SafeAreaView = (function (_Component) {
  _inherits(SafeAreaView, _Component)
  var _super = _createSuper(SafeAreaView)
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
            _extends({}, props, { style: _mergeEleStyles(_getStyle(rootCla), rootStyle) }),
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
  var _super2 = _createSuper(SafeArea)
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
          _extends({}, extraProps, { style: _mergeEleStyles(_getStyle(rootCla), rootStyle) }),
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

export { SafeAreaView, _safeArea, SafeArea as default, useSafeArea }
