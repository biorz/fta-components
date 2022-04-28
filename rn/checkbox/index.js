import Image from '@fta/components-rn/dist/components/Image'
import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { isUndef, Assets } from '../common'
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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i]
  }
  return arr2
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

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen)
  var n = Object.prototype.toString.call(o).slice(8, -1)
  if (n === 'Object' && o.constructor) n = o.constructor.name
  if (n === 'Map' || n === 'Set') return Array.from(o)
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen)
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
  'fta-checkbox': {
    backgroundColor: '#fff',
    position: 'relative',
  },
  'fta-checkbox--inline': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingTop: 0,
    paddingRight: scalePx2dp(15.84),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(15.84),
  },
  'fta-checkbox__option': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scalePx2dp(15.84),
    paddingRight: scalePx2dp(15.84),
    paddingBottom: scalePx2dp(15.84),
    paddingLeft: scalePx2dp(15.84),
    borderWidth: scalePx2dp(0.48),
    borderStyle: 'solid',
    borderColor: '#e9e9e9',
  },
  'fta-checkbox__option--between': {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  'fta-checkbox__option--inline': {
    borderWidth: 0,
    borderColor: 'black',
    borderStyle: 'solid',
    paddingLeft: 0,
    paddingRight: 0,
  },
  'fta-checkbox-content': {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  'fta-checkbox__title': {
    display: 'flex',
    flexDirection: 'row',
    color: '#666',
    fontSize: scalePx2dp(18.24),
    lineHeight: scalePx2dp(23.712),
  },
  'fta-checkbox__title--selected': {
    color: '#333',
  },
  'fta-checkbox__title--disabled': {
    color: '#999',
  },
  'fta-checkbox__desc': {
    marginTop: scalePx2dp(2.88),
    color: '#ccc',
    fontSize: scalePx2dp(13.92),
    lineHeight: scalePx2dp(18.096),
  },
  'fta-checkbox__desc--selected': {
    color: '#999',
  },
  'fta-checkbox__desc--disabled': {
    color: '#ccc',
  },
  'fta-checkbox__icon-cnt': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scalePx2dp(4800),
    marginTop: scalePx2dp(1.92),
    marginRight: scalePx2dp(12),
    width: scalePx2dp(19.2),
    minWidth: scalePx2dp(19.2),
    height: scalePx2dp(19.2),
    color: 'transparent',
    fontSize: scalePx2dp(13.92),
    backgroundColor: '#ededed',
  },
  'fta-checkbox__icon-cnt--selected': {
    backgroundColor: '#fa871e',
  },
  'fta-checkbox__icon-cnt--between': {
    marginRight: 0,
    marginLeft: scalePx2dp(12),
  },
  'fta-checkbox__icon-cnt--inline': {
    marginRight: scalePx2dp(6.24),
  },
  'fta-checkbox-icon': {
    width: scalePx2dp(13.92),
    height: scalePx2dp(13.92),
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
var Checkbox = (function (_React$Component) {
  _inherits(Checkbox, _React$Component)
  var _super = _createSuper(Checkbox)
  function Checkbox(props) {
    var _this
    _classCallCheck(this, Checkbox)
    _this = _super.call(this, props)
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this))
    return _this
  }
  _createClass(Checkbox, [
    {
      key: 'handleClick',
      value: function handleClick(idx) {
        var _this$props = this.props,
          selectedList = _this$props.selectedList,
          options = _this$props.options
        var option = options[idx]
        var disabled = option.disabled,
          value = option.value
        if (disabled) return
        var selectedSet = new Set(selectedList)
        if (!selectedSet.has(value)) {
          selectedSet.add(value)
        } else {
          selectedSet.delete(value)
        }
        this.props.onChange(_toConsumableArray(selectedSet))
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this
        var _this$props2 = this.props,
          customStyle = _this$props2.customStyle,
          style = _this$props2.style,
          className = _this$props2.className,
          options = _this$props2.options,
          selectedList = _this$props2.selectedList,
          icon = _this$props2.icon,
          disabledIcon = _this$props2.disabledIcon,
          selectedIcon = _this$props2.selectedIcon,
          selectedDidsabledIcon = _this$props2.selectedDidsabledIcon,
          type = _this$props2.type
        var rootCls = classNames('fta-checkbox', 'fta-checkbox--' + type, className)
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
            var value = option.value,
              disabled = option.disabled,
              label = option.label,
              desc = option.desc
            var selected = selectedList.includes(value)
            if (selected) {
              presentIcon = disabled ? selectedDidsabledIcon : selectedIcon
            } else {
              presentIcon = disabled ? disabledIcon : icon
            }
            var optionCls = classNames('fta-checkbox__option', 'fta-checkbox__option--' + type, {
              'fta-checkbox__option--disabled': disabled,
              'fta-checkbox__option--selected': selected,
            })
            var iconCntCls = classNames(
              'fta-checkbox__icon-cnt',
              'fta-checkbox__icon-cnt--' + type,
              {
                'fta-checkbox__icon-cnt--selected': selected,
                'fta-checkbox__icon-cnt--disabled': disabled,
              }
            )
            var titleClz = classNames(
              'fta-checkbox__title',
              selected && 'fta-checkbox__title--selected',
              disabled && 'fta-checkbox__title--disabled'
            )
            var descClz = classNames(
              'fta-checkbox__desc',
              selected && 'fta-checkbox__desc--selected',
              disabled && 'fta-checkbox__desc--disabled'
            )
            return React.createElement(
              View,
              {
                key: value,
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
                      style: _styleSheet['fta-checkbox-icon'],
                    })
                  )
                : presentIcon,
              React.createElement(
                View,
                { style: _styleSheet['fta-checkbox-content'] },
                React.createElement(Text, { style: _getStyle(titleClz) }, label),
                desc && React.createElement(Text, { style: _getStyle(descClz) }, desc)
              )
            )
          })
        )
      },
    },
  ])
  return Checkbox
})(React.Component)
Checkbox.defaultProps = {
  customStyle: {},
  className: '',
  options: [],
  selectedList: [],
  onChange: function onChange() {},
  type: 'left',
}
Checkbox.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  options: PropTypes.array,
  selectedList: PropTypes.array,
  onChange: PropTypes.func,
}

export { Checkbox as default }
