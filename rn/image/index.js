import TaroImage from '@fta/components-rn/dist/components/Image'
import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import React, { Fragment, Component } from 'react'
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
  'fta-image': {
    width: scalePx2dp(115.2),
    height: scalePx2dp(115.2),
  },
  'fta-image--circle': {
    borderRadius: scalePx2dp(4800),
    overflow: 'hidden',
  },
  'fta-image--loading': {
    position: 'absolute',
    opacity: 0,
    width: scalePx2dp(0.48),
    height: scalePx2dp(0.48),
  },
  'fta-image--flex': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafbfc',
  },
  'fta-image--flex__text': {
    color: '#666',
  },
})

var _excluded = [
  'className',
  'src',
  'shape',
  'showLoading',
  'loadingIcon',
  'showError',
  'errorIcon',
  'customStyle',
  'bgColor',
  'onError',
  'onLoad',
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
var isString = function isString(val) {
  return typeof val === 'string'
}
var Image = (function (_Component) {
  _inherits(Image, _Component)
  var _super = _createSuper(Image)
  function Image(props) {
    var _this
    _classCallCheck(this, Image)
    _this = _super.call(this, props)
    _this.state = { _errored: false, _loaded: false }
    _this.onLoad = _this.onLoad.bind(_assertThisInitialized(_this))
    _this.onError = _this.onError.bind(_assertThisInitialized(_this))
    return _this
  }
  _createClass(Image, [
    {
      key: 'isLoading',
      get: function get() {
        return !this.state._errored && !this.state._loaded
      },
    },
    {
      key: 'needLoading',
      get: function get() {
        return !!(this.isLoading && this.props.showLoading && this.props.loadingIcon)
      },
    },
    {
      key: 'needError',
      get: function get() {
        return !!(this.state._errored && this.props.showError && this.props.errorIcon)
      },
    },
    {
      key: 'isCircle',
      get: function get() {
        return this.props.shape === 'circle'
      },
    },
    {
      key: 'onLoad',
      value: function onLoad(event) {
        var _this$props$onLoad, _this$props
        this.setState({ _loaded: true })
        return (_this$props$onLoad = (_this$props = this.props).onLoad) == null
          ? void 0
          : _this$props$onLoad.call(_this$props, event)
      },
    },
    {
      key: 'onError',
      value: function onError(event) {
        var _this$props$onError, _this$props2
        this.setState({ _errored: true })
        return (_this$props$onError = (_this$props2 = this.props).onError) == null
          ? void 0
          : _this$props$onError.call(_this$props2, event)
      },
    },
    {
      key: 'getInlineStyle',
      value: function getInlineStyle() {
        var style = _objectSpread({}, this.props.customStyle)
        var i
        if ((i = this.props.bgColor)) {
          style.backgroundColor = i
        }
        return style
      },
    },
    {
      key: 'renderIntermediate',
      value: function renderIntermediate(needRender, icon, className, style) {
        var circleClass = this.isCircle && 'fta-image--circle'
        return needRender
          ? isString(icon)
            ? React.createElement(TaroImage, {
                src: icon,
                style: _mergeEleStyles(_getStyle(classNames(className, circleClass)), style),
                mode: this.props.mode,
              })
            : React.createElement(
                View,
                {
                  style: _mergeEleStyles(
                    _getStyle(classNames(className, 'fta-image--flex', circleClass)),
                    this.getInlineStyle()
                  ),
                },
                icon
              )
          : null
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this$props3 = this.props,
          className = _this$props3.className,
          src = _this$props3.src
        _this$props3.shape
        var showLoading = _this$props3.showLoading,
          loadingIcon = _this$props3.loadingIcon,
          showError = _this$props3.showError,
          errorIcon = _this$props3.errorIcon,
          customStyle = _this$props3.customStyle
        _this$props3.bgColor
        _this$props3.onError
        _this$props3.onLoad
        var props = _objectWithoutProperties(_this$props3, _excluded)
        var _errored = this.state._errored
        var loadingClass = classNames('fta-image', className, this.isCircle && 'fta-image--circle')
        var rootClass = classNames(
          loadingClass,
          ((showLoading && this.isLoading) || (showError && _errored)) && 'fta-image--loading'
        )
        return React.createElement(
          Fragment,
          null,
          this.renderIntermediate(this.needLoading, loadingIcon, loadingClass, customStyle),
          this.renderIntermediate(this.needError, errorIcon, loadingClass, customStyle),
          React.createElement(
            TaroImage,
            _extends(
              {
                src: src,
                style: _mergeEleStyles(_getStyle(rootClass), this.getInlineStyle()),
                onLoad: this.onLoad,
                onError: this.onError,
              },
              props
            )
          )
        )
      },
    },
  ])
  return Image
})(Component)
Image.defaultProps = {
  showLoading: true,
  showError: true,
  loadingIcon: React.createElement(
    Text,
    { style: _styleSheet['fta-image--flex__text'] },
    '\u52A0\u8F7D\u4E2D'
  ),
  errorIcon: React.createElement(
    Text,
    { style: _styleSheet['fta-image--flex__text'] },
    '\u52A0\u8F7D\u5931\u8D25'
  ),
  src: '',
}

export { Image as default }
