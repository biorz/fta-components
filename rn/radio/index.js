import Image from '@fta/components-rn/dist/components/Image'
import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { isUndef, Assets } from '../common'
import { StyleSheet } from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'

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
  'fta-radio': {
    backgroundColor: '#fff',
    position: 'relative',
  },
  'fta-radio--inline': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingTop: 0,
    paddingRight: scalePx2dp(15.36),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(15.36),
  },
  'fta-radio__option': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scalePx2dp(15.36),
    paddingRight: scalePx2dp(15.36),
    paddingBottom: scalePx2dp(15.36),
    paddingLeft: scalePx2dp(15.36),
    borderWidth: scalePx2dp(0.48),
    borderStyle: 'solid',
    borderColor: '#e9e9e9',
  },
  'fta-radio__option--between': {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  'fta-radio__option--inline': {
    borderWidth: 0,
    borderColor: 'black',
    borderStyle: 'solid',
    paddingLeft: 0,
    paddingRight: 0,
  },
  'fta-radio-content': {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  'fta-radio__title': {
    display: 'flex',
    flexDirection: 'row',
    color: '#666',
    fontSize: scalePx2dp(17.28),
    lineHeight: scalePx2dp(22.464),
  },
  'fta-radio__title--selected': {
    color: '#333',
  },
  'fta-radio__title--disabled': {
    color: '#999',
  },
  'fta-radio__desc': {
    marginTop: scalePx2dp(2.88),
    color: '#ccc',
    fontSize: scalePx2dp(13.44),
    lineHeight: scalePx2dp(17.472),
  },
  'fta-radio__desc--selected': {
    color: '#999',
  },
  'fta-radio__desc--disabled': {
    color: '#ccc',
  },
  'fta-radio__icon-cnt': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scalePx2dp(4800),
    marginTop: scalePx2dp(1.92),
    marginRight: scalePx2dp(11.52),
    width: scalePx2dp(19.2),
    minWidth: scalePx2dp(19.2),
    height: scalePx2dp(19.2),
    color: 'transparent',
    fontSize: scalePx2dp(13.44),
    backgroundColor: '#ededed',
  },
  'fta-radio__icon-cnt--selected': {
    backgroundColor: '#fa871e',
  },
  'fta-radio__icon-cnt--between': {
    marginRight: 0,
    marginLeft: scalePx2dp(11.52),
  },
  'fta-radio__icon-cnt--inline': {
    marginRight: scalePx2dp(5.76),
  },
  'fta-radio-icon': {
    width: scalePx2dp(13.44),
    height: scalePx2dp(13.44),
  },
  'fta-radio-simple': {
    width: scalePx2dp(17.28),
    height: scalePx2dp(17.28),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scalePx2dp(4800),
  },
  'fta-radio-simple-container': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  'fta-radio-simple-container--disabled': {
    opacity: 0.3,
  },
  'fta-radio-simple-image': {
    width: scalePx2dp(12.48),
    height: scalePx2dp(12.48),
  },
  'fta-radio-simple--normal': {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#9a9a9a',
  },
  'fta-radio-simple--selected': {
    backgroundColor: '#fa871e',
  },
})

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
var Radio = (function (_React$Component) {
  _inherits(Radio, _React$Component)
  var _super = _createSuper(Radio)
  function Radio(props) {
    var _this
    _classCallCheck(this, Radio)
    _this = _super.call(this, props)
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this))
    return _this
  }
  _createClass(Radio, [
    {
      key: 'handleClick',
      value: function handleClick(idx) {
        var option = this.props.options[idx]
        var disabled = option.disabled,
          value = option.value
        if (disabled) return
        this.props.onClick(value)
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this
        var _this$props = this.props,
          customStyle = _this$props.customStyle,
          style = _this$props.style,
          className = _this$props.className,
          options = _this$props.options,
          icon = _this$props.icon,
          disabledIcon = _this$props.disabledIcon,
          selectedIcon = _this$props.selectedIcon,
          selectedDidsabledIcon = _this$props.selectedDidsabledIcon,
          type = _this$props.type,
          value = _this$props.value
        var rootCls = classNames('fta-radio', 'fta-radio--' + type, className)
        return React.createElement(
          View,
          {
            style: _mergeEleStyles(
              _getStyle(rootCls),
              _objectSpread(_objectSpread({}, style), customStyle)
            ),
          },
          options.map(function (option, idx) {
            var presentIcon
            var disabled = option.disabled,
              label = option.label,
              desc = option.desc
            var selected = value === option.value
            if (selected) {
              presentIcon = disabled ? selectedDidsabledIcon : selectedIcon
            } else {
              presentIcon = disabled ? disabledIcon : icon
            }
            var optionCls = classNames('fta-radio__option', 'fta-radio__option--' + type, {
              'fta-radio__option--disabled': disabled,
              'fta-radio__option--selected': selected,
            })
            var iconCntCls = classNames('fta-radio__icon-cnt', 'fta-radio__icon-cnt--' + type, {
              'fta-radio__icon-cnt--selected': selected,
              'fta-radio__icon-cnt--disabled': disabled,
            })
            var titleClz = classNames(
              'fta-radio__title',
              selected && 'fta-radio__title--selected',
              disabled && 'fta-radio__title--disabled'
            )
            var descClz = classNames(
              'fta-radio__desc',
              selected && 'fta-radio__desc--selected',
              disabled && 'fta-radio__desc--disabled'
            )
            return React.createElement(
              View,
              {
                key: idx,
                onClick: function onClick() {
                  return _this2.handleClick(idx)
                },
                style: _getStyle(optionCls),
              },
              isUndef(presentIcon)
                ? React.createElement(
                    View,
                    { style: _getStyle(iconCntCls) },
                    React.createElement(Image, {
                      src: Assets.check.default,
                      style: _styleSheet['fta-radio-icon'],
                    })
                  )
                : presentIcon,
              React.createElement(
                View,
                { style: _styleSheet['fta-radio-content'] },
                React.createElement(Text, { style: _getStyle(titleClz) }, label),
                desc && React.createElement(Text, { style: _getStyle(descClz) }, desc)
              )
            )
          })
        )
      },
    },
  ])
  return Radio
})(React.Component)
function SimpleRadio(props) {
  var active = props.active,
    disabled = props.disabled,
    icon = props.icon,
    disabledIcon = props.disabledIcon,
    selectedIcon = props.selectedIcon,
    selectedDidsabledIcon = props.selectedDidsabledIcon,
    controlled = props.controlled,
    onChange = props.onChange,
    children = props.children
  var _useState = useState(active),
    _useState2 = _slicedToArray(_useState, 2),
    _active = _useState2[0],
    setActive = _useState2[1]
  var checked = controlled ? active : _active
  var onClick = function onClick() {
    if (disabled) return
    if (!controlled) {
      setActive(!checked)
    }
    onChange(!checked)
  }
  var presentIcon
  if (checked) {
    presentIcon = disabled ? selectedDidsabledIcon || selectedIcon : selectedIcon
  } else {
    presentIcon = disabled ? disabledIcon || icon : icon
  }
  var rootClass = classNames(
    'fta-radio-simple-container',
    disabled &&
      (presentIcon === icon || presentIcon === selectedIcon) &&
      'fta-radio-simple-container--disabled'
  )
  return React.createElement(
    View,
    { onClick: onClick, style: _getStyle(rootClass) },
    presentIcon,
    children
  )
}
var simpleRadioImage = React.createElement(Image, {
  src: Assets.check.default,
  style: _styleSheet['fta-radio-simple-image'],
})
SimpleRadio.defaultProps = {
  icon: React.createElement(View, {
    style: _mergeEleStyles(
      _styleSheet['fta-radio-simple'],
      _styleSheet['fta-radio-simple--normal']
    ),
  }),
  selectedIcon: React.createElement(
    View,
    {
      style: _mergeEleStyles(
        _styleSheet['fta-radio-simple'],
        _styleSheet['fta-radio-simple--selected']
      ),
    },
    simpleRadioImage
  ),
  onChange: function onChange() {},
}
Radio.defaultProps = {
  customStyle: {},
  className: '',
  options: [],
  value: null,
  onClick: function onClick() {},
  type: 'left',
}
Radio.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  options: PropTypes.array,
  onClick: PropTypes.func,
}
Radio.Simple = SimpleRadio

export { Radio as default }
