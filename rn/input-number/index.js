import Input from '@fta/components-rn/dist/components/Input'
import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { px } from '../common'
import { StyleSheet } from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'

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

var commonjsGlobal =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : typeof self !== 'undefined'
    ? self
    : {}

var INFINITY = 1 / 0
var symbolTag = '[object Symbol]'
var freeGlobal =
  typeof commonjsGlobal == 'object' &&
  commonjsGlobal &&
  commonjsGlobal.Object === Object &&
  commonjsGlobal
var freeSelf = typeof self == 'object' && self && self.Object === Object && self
var root = freeGlobal || freeSelf || Function('return this')()
var objectProto = Object.prototype
var objectToString = objectProto.toString
var Symbol$1 = root.Symbol
var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
  symbolToString = symbolProto ? symbolProto.toString : undefined
function baseToString(value) {
  if (typeof value == 'string') {
    return value
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : ''
  }
  var result = value + ''
  return result == '0' && 1 / value == -INFINITY ? '-0' : result
}
function isObjectLike(value) {
  return !!value && typeof value == 'object'
}
function isSymbol(value) {
  return (
    typeof value == 'symbol' || (isObjectLike(value) && objectToString.call(value) == symbolTag)
  )
}
function toString(value) {
  return value == null ? '' : baseToString(value)
}
var lodash_tostring = toString

var indexScssStyleSheet = StyleSheet.create({
  'fta-input-number': {
    borderTopWidth: scalePx2dp(0.5),
    borderTopColor: '#e9e9e9',
    borderBottomWidth: scalePx2dp(0.5),
    borderBottomColor: '#e9e9e9',
    borderRightWidth: scalePx2dp(0.5),
    borderRightColor: '#e9e9e9',
    borderLeftWidth: scalePx2dp(0.5),
    borderLeftColor: '#e9e9e9',
    flexDirection: 'row',
    fontSize: scalePx2dp(15.5),
    borderRadius: scalePx2dp(6),
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  'fta-input-number__btn': {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: scalePx2dp(10),
    paddingRight: scalePx2dp(10),
    paddingBottom: scalePx2dp(10),
    paddingLeft: scalePx2dp(10),
    color: '#fa871e',
    fontSize: scalePx2dp(19),
    textAlign: 'center',
    lineHeight: scalePx2dp(19.5),
    overflow: 'hidden',
    backgroundColor: '#ededed',
  },
  'fta-input-number__input': {
    width: scalePx2dp(60),
    height: 'auto',
    borderRadius: 0,
    color: '#333',
    fontSize: scalePx2dp(19),
    textAlign: 'center',
    backgroundColor: '#f7f7f7',
    borderLeftWidth: scalePx2dp(0.5),
    borderLeftColor: '#e9e9e9',
    borderRightWidth: scalePx2dp(0.5),
    borderRightColor: '#e9e9e9',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: scalePx2dp(6),
    paddingRight: scalePx2dp(6),
    paddingBottom: scalePx2dp(6),
    paddingLeft: scalePx2dp(6),
  },
  input: {
    width: scalePx2dp(60),
    height: 'auto',
    borderRadius: 0,
    color: '#333',
    fontSize: scalePx2dp(19),
    textAlign: 'center',
    backgroundColor: '#f7f7f7',
    borderLeftWidth: scalePx2dp(0.5),
    borderLeftColor: '#e9e9e9',
    borderRightWidth: scalePx2dp(0.5),
    borderRightColor: '#e9e9e9',
    paddingTop: scalePx2dp(6),
    paddingRight: scalePx2dp(6),
    paddingBottom: scalePx2dp(6),
    paddingLeft: scalePx2dp(6),
  },
  'fta-input-number--disabled': {
    color: '#ccc',
  },
  'fta-input-number__btn-subtract': {
    fontSize: scalePx2dp(18),
  },
  'fta-input-number__btn-add': {
    fontSize: scalePx2dp(18),
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
function addNum(num1, num2) {
  var sq1, sq2
  try {
    sq1 = lodash_tostring(num1).split('.')[1].length
  } catch (e) {
    sq1 = 0
  }
  try {
    sq2 = lodash_tostring(num2).split('.')[1].length
  } catch (e) {
    sq2 = 0
  }
  var m = Math.pow(10, Math.max(sq1, sq2))
  return (Math.round(num1 * m) + Math.round(num2 * m)) / m
}
function parseValue(num) {
  if (num === '') return '0'
  var numStr = lodash_tostring(num)
  if (numStr.indexOf('0') === 0 && numStr.indexOf('.') === -1) {
    return lodash_tostring(parseFloat(num))
  }
  return lodash_tostring(num)
}
var InputNumber = (function (_React$Component) {
  _inherits(InputNumber, _React$Component)
  var _super = _createSuper(InputNumber)
  function InputNumber() {
    var _this
    _classCallCheck(this, InputNumber)
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }
    _this = _super.call.apply(_super, [this].concat(args))
    _this.handleValue = function (value) {
      var _this$props = _this.props,
        _this$props$max = _this$props.max,
        max = _this$props$max === void 0 ? 100 : _this$props$max,
        _this$props$min = _this$props.min,
        min = _this$props$min === void 0 ? 0 : _this$props$min
      var resultValue = value === '' ? min : value
      if (resultValue > max) {
        resultValue = max
        _this.handleError({ type: 'OVER', errorValue: resultValue })
      }
      if (resultValue < min) {
        resultValue = min
        _this.handleError({ type: 'LOW', errorValue: resultValue })
      }
      if (resultValue && !Number(resultValue)) {
        resultValue = parseFloat(String(resultValue)) || min
        _this.handleError({ type: 'OVER', errorValue: resultValue })
      }
      resultValue = parseValue(String(resultValue))
      return resultValue
    }
    _this.handleInput = function (e) {
      var value = e.target.value
      var disabled = _this.props.disabled
      if (disabled) return ''
      var newValue = _this.handleValue(value)
      _this.props.onChange(Number(newValue), e)
      return newValue
    }
    _this.handleBlur = function (event) {
      return _this.props.onBlur && _this.props.onBlur(event)
    }
    _this.handleError = function (errorValue) {
      if (!_this.props.onErrorInput) {
        return
      }
      _this.props.onErrorInput(errorValue)
    }
    return _this
  }
  _createClass(InputNumber, [
    {
      key: 'handleClick',
      value: function handleClick(clickType, e) {
        var _this$props2 = this.props,
          disabled = _this$props2.disabled,
          value = _this$props2.value,
          _this$props2$min = _this$props2.min,
          min = _this$props2$min === void 0 ? 0 : _this$props2$min,
          _this$props2$max = _this$props2.max,
          max = _this$props2$max === void 0 ? 100 : _this$props2$max,
          _this$props2$step = _this$props2.step,
          step = _this$props2$step === void 0 ? 1 : _this$props2$step
        var lowThanMin = clickType === 'minus' && value <= min
        var overThanMax = clickType === 'plus' && value >= max
        if (lowThanMin || overThanMax || disabled) {
          var _deltaValue = clickType === 'minus' ? -step : step
          var errorValue = addNum(Number(value), _deltaValue)
          if (disabled) {
            this.handleError({ type: 'DISABLED', errorValue: errorValue })
          } else {
            this.handleError({ type: lowThanMin ? 'LOW' : 'OVER', errorValue: errorValue })
          }
          return
        }
        var deltaValue = clickType === 'minus' ? -step : step
        var newValue = addNum(Number(value), deltaValue)
        newValue = Number(this.handleValue(newValue))
        this.props.onChange(newValue, e)
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this$props3 = this.props,
          customStyle = _this$props3.customStyle,
          className = _this$props3.className,
          width = _this$props3.width,
          disabled = _this$props3.disabled,
          value = _this$props3.value,
          type = _this$props3.type,
          _this$props3$min = _this$props3.min,
          min = _this$props3$min === void 0 ? 0 : _this$props3$min,
          _this$props3$max = _this$props3.max,
          max = _this$props3$max === void 0 ? 100 : _this$props3$max,
          size = _this$props3.size,
          disabledInput = _this$props3.disabledInput
        var inputStyle = width ? { width: px(width) } : {}
        var inputValue = Number(this.handleValue(value))
        var rootCls = classNames(
          'fta-input-number',
          { 'fta-input-number--lg': size === 'large' },
          className
        )
        var minusBtnCls = classNames('fta-input-number__btn', {
          'fta-input-number--disabled': inputValue <= min || disabled,
        })
        var plusBtnCls = classNames('fta-input-number__btn', {
          'fta-input-number--disabled': inputValue >= max || disabled,
        })
        return React.createElement(
          View,
          { style: _mergeEleStyles(_getStyle(rootCls), customStyle) },
          React.createElement(
            Text,
            { onClick: this.handleClick.bind(this, 'minus'), style: _getStyle(minusBtnCls) },
            '-'
          ),
          React.createElement(Input, {
            style: _mergeEleStyles(_styleSheet['fta-input-number__input'], inputStyle),
            type: type,
            value: String(inputValue),
            disabled: disabledInput || disabled,
            onInput: this.handleInput,
            onBlur: this.handleBlur,
          }),
          React.createElement(
            Text,
            { onClick: this.handleClick.bind(this, 'plus'), style: _getStyle(plusBtnCls) },
            '+'
          )
        )
      },
    },
  ])
  return InputNumber
})(React.Component)
InputNumber.defaultProps = {
  customStyle: {},
  className: '',
  disabled: false,
  disabledInput: false,
  value: 1,
  type: 'number',
  width: 0,
  min: 0,
  max: 100,
  step: 1,
  size: 'normal',
  onChange: function onChange() {},
}
InputNumber.propTypes = {
  customStyle: PropTypes.object,
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.oneOf(['number', 'digit']),
  disabled: PropTypes.bool,
  width: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  size: PropTypes.oneOf(['normal', 'large']),
  disabledInput: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onErrorInput: PropTypes.func,
}

export { InputNumber as default }
