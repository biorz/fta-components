import TaroSwitch from '@fta/components-rn/dist/components/Switch'
import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { inRN, Themes, isString } from '../common'
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
  'fta-switch': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingTop: scalePx2dp(9.5),
    paddingRight: scalePx2dp(15.5),
    paddingBottom: scalePx2dp(9.5),
    paddingLeft: 0,
    marginBottom: scalePx2dp(0.5),
  },
  'fta-switch__title': {
    marginLeft: scalePx2dp(15.5),
    flexGrow: 6,
    flexShrink: 1,
    flexBasis: 0,
    color: '#333',
    fontSize: scalePx2dp(15.5),
  },
  'fta-switch__container': {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    position: 'relative',
    flexGrow: 2,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: '#fff',
  },
  'fta-switch__switch': {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#dfdfdf',
  },
  'fta-switch__mask': {
    position: 'absolute',
    display: 'none',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 700,
  },
  'switch--disabled': {
    opacity: 0.3,
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
var Switch = (function (_React$Component) {
  _inherits(Switch, _React$Component)
  var _super = _createSuper(Switch)
  function Switch() {
    var _this
    _classCallCheck(this, Switch)
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }
    _this = _super.call.apply(_super, [this].concat(args))
    _this.state = { checked: !!_this.props.checked }
    _this.handleChange = function (event) {
      var _event$detail = event.detail,
        value = _event$detail.value,
        checked = _event$detail.checked
      var state = typeof value === 'undefined' ? checked : value
      _this.setState({ checked: state }, function () {
        _this.props.onChange == null ? void 0 : _this.props.onChange(state)
      })
    }
    return _this
  }
  _createClass(Switch, [
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          customStyle = _this$props.customStyle,
          className = _this$props.className,
          disabled = _this$props.disabled,
          border = _this$props.border,
          title = _this$props.title,
          color = _this$props.color
        var rootCls = classNames('fta-switch', { 'fta-switch--without-border': !border }, className)
        var containerCls = classNames('fta-switch__container', { 'fta-switch--disabled': disabled })
        var swithStyle = inRN
          ? { backgroundColor: this.state.checked ? color : disabled ? '#ccc' : '#efefef' }
          : {}
        var extraProps = inRN ? { width: 52, height: 32 } : {}
        var switchClz = classNames('fta-switch__switch', disabled && 'switch--disabled')
        var switchElm = React.createElement(
          View,
          { style: _getStyle(containerCls) },
          disabled && React.createElement(View, { style: _styleSheet['fta-switch__mask'] }),
          React.createElement(
            TaroSwitch,
            _extends(
              {
                style: _mergeEleStyles(_getStyle(switchClz), swithStyle),
                disabled: disabled,
                checked: this.state.checked,
                color: inRN ? Themes.color.white : color,
                onChange: this.handleChange,
              },
              extraProps
            )
          )
        )
        if (!title) return switchElm
        return React.createElement(
          View,
          { style: _mergeEleStyles(_getStyle(rootCls), customStyle) },
          isString(title)
            ? React.createElement(Text, { style: _styleSheet['fta-switch__title'] }, title)
            : title,
          switchElm
        )
      },
    },
  ])
  return Switch
})(React.Component)
Switch.defaultProps = {
  customStyle: {},
  className: '',
  title: '',
  color: Themes.color.brand,
  border: true,
  disabled: false,
  checked: false,
}
Switch.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  title: PropTypes.string,
  color: PropTypes.string,
  checked: PropTypes.bool,
  border: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
}

export { Switch as default }