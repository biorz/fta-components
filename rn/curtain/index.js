import Image from '@fta/components-rn/dist/components/Image'
import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { Assets } from '../common'
import { StyleSheet } from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'

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

var indexScssStyleSheet = StyleSheet.create({
  'fta-curtain': {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1080,
  },
  'fta-curtain__container': {
    display: 'flex',
    position: 'relative',
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
    width: '80%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },
  'fta-curtain__body': {
    position: 'relative',
    width: '100%',
  },
  'fta-curtain__btn-close': {
    display: 'flex',
    position: 'absolute',
    width: scalePx2dp(26.88),
    height: scalePx2dp(26.88),
    marginLeft: scalePx2dp(-13.44),
    left: '50%',
    bottom: scalePx2dp(-38.4),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scalePx2dp(4800),
    zIndex: 1080,
  },
  'fta-curtain__btn-close--top': {
    marginLeft: scalePx2dp(-13.44),
    top: scalePx2dp(-38.4),
    left: '50%',
    bottom: 'auto',
  },
  'fta-curtain__btn-close--top-left': {
    top: scalePx2dp(-38.4),
    left: 0,
    bottom: 'auto',
  },
  'fta-curtain__btn-close--top-right': {
    top: scalePx2dp(-38.4),
    left: 'auto',
    right: 0,
    bottom: 'auto',
  },
  'fta-curtain__btn-close--bottom': {
    marginLeft: scalePx2dp(-13.44),
    bottom: scalePx2dp(-38.4),
    left: '50%',
  },
  'fta-curtain__btn-close--bottom-left': {
    bottom: scalePx2dp(-38.4),
    left: 0,
  },
  'fta-curtain__btn-close--bottom-right': {
    bottom: scalePx2dp(-38.4),
    left: 'auto',
    right: 0,
  },
  'fta-curtain--closed': {
    display: 'none',
    position: 'relative',
  },
})

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
var Curtain = (function (_React$Component) {
  _inherits(Curtain, _React$Component)
  var _super = _createSuper(Curtain)
  function Curtain() {
    _classCallCheck(this, Curtain)
    return _super.apply(this, arguments)
  }
  _createClass(Curtain, [
    {
      key: 'onClose',
      value: function onClose(e) {
        e.stopPropagation == null ? void 0 : e.stopPropagation()
        this.props.onClose(e)
      },
    },
    {
      key: '_stopPropagation',
      value: function _stopPropagation(e) {
        e.stopPropagation == null ? void 0 : e.stopPropagation()
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          className = _this$props.className,
          customStyle = _this$props.customStyle,
          isOpened = _this$props.isOpened,
          closeBtnPosition = _this$props.closeBtnPosition
        var curtainClass = classNames(
          { 'fta-curtain': true, 'fta-curtain--closed': !isOpened },
          className
        )
        var btnCloseClass = classNames(
          _defineProperty(
            { 'fta-curtain__btn-close': true },
            'fta-curtain__btn-close--' + closeBtnPosition,
            closeBtnPosition
          )
        )
        return React.createElement(
          View,
          {
            style: _mergeEleStyles(_getStyle(curtainClass), customStyle),
            onClick: this._stopPropagation,
          },
          React.createElement(
            View,
            { style: _styleSheet['fta-curtain__container'] },
            React.createElement(
              View,
              { style: _styleSheet['fta-curtain__body'] },
              this.props.children,
              React.createElement(Image, {
                src: Assets.close.circle,
                onClick: this.onClose.bind(this),
                style: _getStyle(btnCloseClass),
              })
            )
          )
        )
      },
    },
  ])
  return Curtain
})(React.Component)
Curtain.defaultProps = {
  customStyle: {},
  className: '',
  isOpened: false,
  closeBtnPosition: 'bottom',
  onClose: function onClose() {},
}
Curtain.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  isOpened: PropTypes.bool,
  closeBtnPosition: PropTypes.string,
  onClose: PropTypes.func,
}

export { Curtain as default }
