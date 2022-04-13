import View from '@fta/components-rn/dist/components/View'
export { default as TouchableWithoutFeedback } from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component, cloneElement } from 'react'
import { inRN, createSelectorQuery } from '../common'
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

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
  }
  return self
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

var indexScssStyleSheet = StyleSheet.create({
  'fta-view-disabled': {
    opacity: 0.8,
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

var COLOR = {
  black: ['#000', '#000000', 'rgb(0,0,0)', 'black'],
  white: ['#fff', '#ffffff', 'rgb(255,255,255)', 'white'],
}
var colorList = Object.values(COLOR).reduce(function (prev, cur) {
  return [].concat(_toConsumableArray(prev), _toConsumableArray(cur))
}, [])
var colorMap = Object.entries(COLOR).reduce(function (prev, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    key = _ref2[0],
    list = _ref2[1]
  list.forEach(function (v) {
    return (prev[v] = key)
  })
  return prev
}, {})
var opacityList = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]

var _excluded = ['onLayout', 'className', 'children', 'style'],
  _excluded2 = ['children', 'activeOpacity'],
  _excluded3 = ['activeOpacity', 'underlayColor', 'children', 'underlayClass'],
  _excluded4 = [
    'hoverClass',
    'hoverStyle',
    'onClick',
    'disabled',
    'disabledClassName',
    'children',
    'className',
    'style',
  ]
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
var count = 0
var LayoutView = (function (_Component) {
  _inherits(LayoutView, _Component)
  var _super = _createSuper(LayoutView)
  function LayoutView(props) {
    var _this
    _classCallCheck(this, LayoutView)
    _this = _super.call(this, props)
    _this._id = ++count
    _this._onLayout = _this._onLayout.bind(_assertThisInitialized(_this))
    return _this
  }
  _createClass(LayoutView, [
    {
      key: '_onLayout',
      value: function _onLayout(evt) {
        var _this$props$onLayout, _this$props
        ;(_this$props$onLayout = (_this$props = this.props).onLayout) == null
          ? void 0
          : _this$props$onLayout.call(_this$props, evt.nativeEvent.layout, evt)
      },
    },
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this
        this.props.onLayout &&
          !inRN &&
          (createSelectorQuery == null
            ? void 0
            : createSelectorQuery('._fta-view-layout__' + this._id, function (result) {
                _this2.props.onLayout(result, result)
              }))
      },
    },
    {
      key: 'render',
      value: function render() {
        if (this.props.disabled) return renderDisabledView(this.props)
        var _this$props2 = this.props,
          onLayout = _this$props2.onLayout,
          className = _this$props2.className,
          children = _this$props2.children,
          style = _this$props2.style,
          props = _objectWithoutProperties(_this$props2, _excluded)
        var rootClass = classNames('_fta-view-layout__' + this._id, className)
        return React.createElement(
          View,
          _extends(
            {
              onLayout: onLayout && this._onLayout,
              style: _mergeEleStyles(_getStyle(rootClass), style),
            },
            props
          ),
          children
        )
      },
    },
  ])
  return LayoutView
})(Component)
LayoutView.defaultProps = { onLayout: null, disabled: false }
var TouchableOpacity = (function (_Component2) {
  _inherits(TouchableOpacity, _Component2)
  var _super2 = _createSuper(TouchableOpacity)
  function TouchableOpacity() {
    _classCallCheck(this, TouchableOpacity)
    return _super2.apply(this, arguments)
  }
  _createClass(TouchableOpacity, [
    {
      key: 'render',
      value: function render() {
        if (this.props.disabled) return renderDisabledView(this.props)
        var _this$props3 = this.props,
          children = _this$props3.children,
          activeOpacity = _this$props3.activeOpacity,
          props = _objectWithoutProperties(_this$props3, _excluded2)
        return React.createElement(
          View,
          _extends({}, props, {
            hoverStyle: { opacity: activeOpacity },
            hoverClass: 'fta-view-hover__' + activeOpacity * 10,
          }),
          children
        )
      },
    },
  ])
  return TouchableOpacity
})(Component)
TouchableOpacity.defaultProps = { activeOpacity: 0.8 }
TouchableOpacity.propTypes = {
  activeOpacity: inRN ? PropTypes.number : PropTypes.oneOf(opacityList),
}
var TouchableHighlight = (function (_Component3) {
  _inherits(TouchableHighlight, _Component3)
  var _super3 = _createSuper(TouchableHighlight)
  function TouchableHighlight() {
    _classCallCheck(this, TouchableHighlight)
    return _super3.apply(this, arguments)
  }
  _createClass(TouchableHighlight, [
    {
      key: 'render',
      value: function render() {
        if (this.props.disabled) return renderDisabledView(this.props)
        var _this$props4 = this.props,
          activeOpacity = _this$props4.activeOpacity,
          underlayColor = _this$props4.underlayColor,
          children = _this$props4.children,
          underlayClass = _this$props4.underlayClass,
          props = _objectWithoutProperties(_this$props4, _excluded3)
        var hoverClass
        if (underlayClass) hoverClass = underlayClass
        else if (!inRN) {
          if (!~colorList.indexOf(underlayColor)) {
            underlayColor = '#000'
          } else {
            hoverClass = 'fta-view-hover__' + colorMap[underlayColor]
          }
        }
        var clonedChildren = cloneElement(children, {
          hoverClass: 'fta-view-hover__' + activeOpacity * 10,
          hoverStyle: { opacity: activeOpacity },
        })
        return React.createElement(
          View,
          _extends(
            { hoverStyle: { backgroundColor: underlayColor }, hoverClass: hoverClass },
            props
          ),
          clonedChildren
        )
      },
    },
  ])
  return TouchableHighlight
})(Component)
TouchableHighlight.defaultProps = { underlayColor: '#000', activeOpacity: 0.2, underlayClass: null }
TouchableHighlight.propTypes = {
  underlayColor: inRN ? PropTypes.any : PropTypes.oneOf(colorList),
  activeOpacity: inRN ? PropTypes.number : PropTypes.oneOf(opacityList),
}
function renderDisabledView(props) {
  props.hoverClass
  props.hoverStyle
  props.onClick
  props.disabled
  var disabledClassName = props.disabledClassName,
    children = props.children,
    className = props.className,
    style = props.style,
    _props = _objectWithoutProperties(props, _excluded4)
  var rootClass = classNames(className, 'fta-view-disabled', disabledClassName)
  return React.createElement(
    View,
    _extends({}, _props, { style: _mergeEleStyles(_getStyle(rootClass), style) }),
    children
  )
}

export { TouchableHighlight, TouchableOpacity, LayoutView as View, LayoutView as default }
