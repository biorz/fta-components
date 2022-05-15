import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
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
  'fta-segmented-control': {
    borderTopWidth: scalePx2dp(0.52083),
    borderTopColor: '#fa871e',
    borderBottomWidth: scalePx2dp(0.52083),
    borderBottomColor: '#fa871e',
    borderRightWidth: scalePx2dp(0.52083),
    borderRightColor: '#fa871e',
    borderLeftWidth: scalePx2dp(0.52083),
    borderLeftColor: '#fa871e',
    width: '100%',
    borderRadius: scalePx2dp(6.25),
    overflow: 'hidden',
    flexDirection: 'row',
  },
  'fta-segmented-control__item': {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    textAlign: 'center',
    paddingTop: scalePx2dp(4.16667),
    paddingRight: scalePx2dp(4.16667),
    paddingBottom: scalePx2dp(4.16667),
    paddingLeft: scalePx2dp(4.16667),
    minWidth: scalePx2dp(62.5),
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  'fta-segmented-control__item--bordered': {
    borderLeftWidth: scalePx2dp(0.52083),
    borderLeftColor: '#fa871e',
  },
  'fta-segmented-control__item__text': {
    textAlign: 'center',
    color: '#fa871e',
    fontSize: scalePx2dp(16.66667),
  },
  'fta-segmented-control__item--active': {
    backgroundColor: '#fa871e',
  },
  'fta-segmented-control__item--active__text': {
    color: '#fff',
  },
  'fta-segmented-control--disabled': {
    opacity: 0.3,
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
var SegmentedControl = (function (_React$Component) {
  _inherits(SegmentedControl, _React$Component)
  var _super = _createSuper(SegmentedControl)
  function SegmentedControl() {
    _classCallCheck(this, SegmentedControl)
    return _super.apply(this, arguments)
  }
  _createClass(SegmentedControl, [
    {
      key: 'handleClick',
      value: function handleClick(index, event) {
        if (this.props.disabled) return
        this.props.onClick(index, event)
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this = this
        var _this$props = this.props,
          customStyle = _this$props.customStyle,
          className = _this$props.className,
          disabled = _this$props.disabled,
          values = _this$props.values,
          selectedColor = _this$props.selectedColor,
          current = _this$props.current,
          color = _this$props.color
        var itemStyle = {}
        var selectedItemStyle = {}
        var itemTextStyle = {}
        var selectedTextStyle = {}
        var borderStyle = {}
        if (color) {
          selectedTextStyle.color = color
          itemStyle.backgroundColor = color
        }
        if (selectedColor) {
          selectedItemStyle.backgroundColor = selectedColor
          itemTextStyle.color = selectedColor
          borderStyle.borderLeftColor = selectedColor
          borderStyle.borderRightColor = selectedColor
          borderStyle.borderTopColor = selectedColor
          borderStyle.borderBottomColor = selectedColor
        }
        var rootCls = classNames(
          'fta-segmented-control',
          { 'fta-segmented-control--disabled': disabled },
          className
        )
        return React.createElement(
          View,
          {
            style: _mergeEleStyles(
              _getStyle(rootCls),
              _objectSpread(_objectSpread({}, borderStyle), customStyle)
            ),
          },
          values.map(function (value, i) {
            return React.createElement(
              View,
              {
                style: _mergeEleStyles(
                  _getStyle(
                    classNames('fta-segmented-control__item', {
                      'fta-segmented-control__item--active': current === i,
                      'fta-segmented-control__item--bordered': !!i,
                    })
                  ),
                  _objectSpread(
                    _objectSpread({}, current === i ? selectedItemStyle : itemStyle),
                    borderStyle
                  )
                ),
                key: value,
                onClick: _this.handleClick.bind(_this, i),
              },
              React.createElement(
                Text,
                {
                  style: _mergeEleStyles(
                    _getStyle(
                      classNames('fta-segmented-control__item__text', {
                        'fta-segmented-control__item--active__text': current === i,
                      })
                    ),
                    current === i ? selectedTextStyle : itemTextStyle
                  ),
                },
                value
              )
            )
          })
        )
      },
    },
  ])
  return SegmentedControl
})(React.Component)
SegmentedControl.defaultProps = {
  customStyle: {},
  className: '',
  current: 0,
  disabled: false,
  values: [],
  onClick: function onClick() {},
}
SegmentedControl.propTypes = {
  customStyle: PropTypes.object,
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  current: PropTypes.number,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  values: PropTypes.array,
  onClick: PropTypes.func,
}

export { SegmentedControl as default }
