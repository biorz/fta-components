import Text from '@fta/components-rn/dist/components/Text'
import TaroTextArea from '@fta/components-rn/dist/components/Textarea'
import View from '@fta/components-rn/dist/components/View'
import { getEnv } from '@fta/taro-rn/dist/lib/getEnv'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { pxTransform } from '../common'
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

var indexScssStyleSheet = StyleSheet.create({
  'fta-textarea': {
    paddingTop: scalePx2dp(8.33333),
    paddingRight: scalePx2dp(8.33333),
    paddingBottom: scalePx2dp(8.33333),
    paddingLeft: scalePx2dp(8.33333),
    width: '100%',
    fontSize: scalePx2dp(18.75),
    lineHeight: scalePx2dp(24.375),
    borderRadius: scalePx2dp(6.25),
    backgroundColor: '#fff',
  },
  'fta-textarea__textarea': {
    width: '100%',
    height: scalePx2dp(75),
    fontSize: scalePx2dp(18.75),
    borderRadius: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    borderWidth: 0,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  placeholder: {
    color: '#ccc',
  },
  textarea: {},
  'fta-textarea__counter': {
    paddingTop: scalePx2dp(6.25),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  'fta-textarea__counter-current': {
    lineHeight: scalePx2dp(21.66667),
    color: '#c9c9c9',
  },
  'fta-textarea__counter-full': {
    color: '#ff5b60',
  },
  'fta-textarea__counter-limit': {
    lineHeight: scalePx2dp(21.66667),
    color: '#c9c9c9',
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
function getMaxLength(maxLength, textOverflowForbidden) {
  if (!textOverflowForbidden) {
    return maxLength + 500
  }
  return maxLength
}
var ENV = getEnv()
var Textarea = (function (_React$Component) {
  _inherits(Textarea, _React$Component)
  var _super = _createSuper(Textarea)
  function Textarea() {
    var _this
    _classCallCheck(this, Textarea)
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }
    _this = _super.call.apply(_super, [this].concat(args))
    _this.handleInput = function (event) {
      _this.props.onChange(event.target.value, event)
    }
    _this.handleFocus = function (event) {
      _this.props.onFocus && _this.props.onFocus(event)
    }
    _this.handleBlur = function (event) {
      _this.props.onBlur && _this.props.onBlur(event)
    }
    _this.handleConfirm = function (event) {
      _this.props.onConfirm && _this.props.onConfirm(event)
    }
    _this.handleLinechange = function (event) {
      _this.props.onLinechange && _this.props.onLinechange(event)
    }
    return _this
  }
  _createClass(Textarea, [
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          customStyle = _this$props.customStyle,
          className = _this$props.className,
          value = _this$props.value,
          cursorSpacing = _this$props.cursorSpacing,
          placeholder = _this$props.placeholder,
          _this$props$placehold = _this$props.placeholderStyle,
          placeholderStyle =
            _this$props$placehold === void 0 ? { color: 'red' } : _this$props$placehold,
          placeholderClass = _this$props.placeholderClass,
          _this$props$maxLength = _this$props.maxLength,
          maxLength = _this$props$maxLength === void 0 ? 200 : _this$props$maxLength,
          count = _this$props.count,
          disabled = _this$props.disabled,
          autoFocus = _this$props.autoFocus,
          focus = _this$props.focus,
          showConfirmBar = _this$props.showConfirmBar,
          selectionStart = _this$props.selectionStart,
          selectionEnd = _this$props.selectionEnd,
          fixed = _this$props.fixed,
          _this$props$textOverf = _this$props.textOverflowForbidden,
          textOverflowForbidden = _this$props$textOverf === void 0 ? true : _this$props$textOverf,
          height = _this$props.height,
          title = _this$props.title
        var _maxLength = parseInt(maxLength.toString())
        var actualMaxLength = getMaxLength(_maxLength, textOverflowForbidden)
        var textareaStyle = height ? 'height:' + pxTransform(Number(height)) : ''
        var rootCls = classNames('fta-textarea', 'fta-textarea--' + ENV, className)
        var placeholderCls = classNames('placeholder', placeholderClass)
        return React.createElement(
          View,
          { style: _mergeEleStyles(_getStyle(rootCls), customStyle) },
          title ? React.createElement(Text, null, title) : null,
          React.createElement(TaroTextArea, {
            style: _mergeEleStyles(_styleSheet['fta-textarea__textarea'], textareaStyle),
            placeholderStyle: placeholderStyle,
            placeholderClass: placeholderCls,
            cursorSpacing: cursorSpacing,
            value: value,
            maxlength: actualMaxLength,
            placeholder: placeholder,
            disabled: disabled,
            autoFocus: autoFocus,
            focus: focus,
            showConfirmBar: showConfirmBar,
            selectionStart: selectionStart,
            selectionEnd: selectionEnd,
            fixed: fixed,
            onInput: this.handleInput,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onConfirm: this.handleConfirm,
            onLineChange: this.handleLinechange,
          }),
          count &&
            React.createElement(
              View,
              { style: _styleSheet['fta-textarea__counter'] },
              React.createElement(
                Text,
                {
                  style: _getStyle(
                    classNames(
                      'fta-textarea__counter-current',
                      value.length == _maxLength && 'fta-textarea__counter-full'
                    )
                  ),
                },
                value.length
              ),
              React.createElement(
                Text,
                { style: _styleSheet['fta-textarea__counter-limit'] },
                '/',
                _maxLength
              )
            )
        )
      },
    },
  ])
  return Textarea
})(React.Component)
Textarea.defaultProps = {
  customStyle: {},
  className: '',
  value: '',
  cursorSpacing: 100,
  maxLength: 200,
  placeholder: '',
  disabled: false,
  autoFocus: false,
  focus: false,
  showConfirmBar: false,
  selectionStart: -1,
  selectionEnd: -1,
  count: true,
  fixed: false,
  height: '',
  textOverflowForbidden: true,
  onChange: function onChange() {},
}
Textarea.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  value: PropTypes.string.isRequired,
  cursorSpacing: PropTypes.number,
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholderClass: PropTypes.string,
  placeholderStyle: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  focus: PropTypes.bool,
  showConfirmBar: PropTypes.bool,
  selectionStart: PropTypes.number,
  selectionEnd: PropTypes.number,
  count: PropTypes.bool,
  textOverflowForbidden: PropTypes.bool,
  fixed: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onLinechange: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onConfirm: PropTypes.func,
}

export { Textarea as default }
