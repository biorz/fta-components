import Image from '@fta/components-rn/dist/components/Image'
import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { ConfigConsumer, isNumber, inRN, scale, useClassWithCare } from '../common'
import { StyleSheet } from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'
import Badge from '../badge'

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
  'fta-icon__badge': {
    top: scalePx2dp(-11.5),
    left: scalePx2dp(11.5),
  },
  'fta-icon__dot': {
    top: scalePx2dp(-6),
    left: scalePx2dp(17),
  },
  'fta-icon': {
    borderRadius: scalePx2dp(3),
  },
  'fta-icon--medium': {
    width: scalePx2dp(23),
    height: scalePx2dp(23),
  },
  'fta-icon--medium--care': {
    width: scalePx2dp(30),
    height: scalePx2dp(30),
  },
  'fta-icon--large': {
    width: scalePx2dp(46),
    height: scalePx2dp(46),
  },
  'fta-icon--large--care': {
    width: scalePx2dp(60),
    height: scalePx2dp(60),
  },
  'fta-icon--large__badge': {
    top: scalePx2dp(-7.5),
    left: scalePx2dp(11.5),
  },
  'fta-icon--large__badge--dot': {
    top: scalePx2dp(-6),
    left: scalePx2dp(17),
  },
})

var _excluded = ['customStyle', 'className', 'isDot']
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
var ContainerAdaptor = inRN ? View : Fragment
var Icon = (function (_React$Component) {
  _inherits(Icon, _React$Component)
  var _super = _createSuper(Icon)
  function Icon(props) {
    var _this
    _classCallCheck(this, Icon)
    _this = _super.call(this, props)
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this))
    return _this
  }
  _createClass(Icon, [
    {
      key: 'handleClick',
      value: function handleClick() {
        var _this$props$onClick, _this$props
        ;(_this$props$onClick = (_this$props = this.props).onClick) == null
          ? void 0
          : _this$props$onClick.call(_this$props, arguments)
      },
    },
    {
      key: 'renderBadge',
      value: function renderBadge() {
        var _this$props2 = this.props,
          badge = _this$props2.badge,
          size = _this$props2.size
        if (badge) {
          var customStyle = badge.customStyle,
            className = badge.className,
            isDot = badge.isDot,
            props = _objectWithoutProperties(badge, _excluded)
          var rootClz = classNames(
            'fta-icon__' + (isDot ? 'dot' : 'badge'),
            'fta-icon-' + size + '__badge' + (isDot ? '--dot' : ''),
            className
          )
          return React.createElement(
            Badge,
            _extends({ absolute: true }, props, {
              isDot: isDot,
              customStyle: customStyle,
              style: _getStyle(rootClz),
            })
          )
        }
        return null
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this
        var _this$props3 = this.props,
          customStyle = _this$props3.customStyle,
          className = _this$props3.className,
          prefixClass = _this$props3.prefixClass,
          value = _this$props3.value,
          size = _this$props3.size,
          color = _this$props3.color,
          scale$1 = _this$props3.scale,
          src = _this$props3.src,
          image = _this$props3.image,
          badge = _this$props3.badge
        var IconAdaptor = inRN || image ? Image : Text
        return React.createElement(ConfigConsumer, null, function (_ref) {
          var careMode = _ref.careMode
          var careClass = ''
          var rootStyle = _objectSpread({}, customStyle)
          if (isNumber(size)) {
            var _size = careMode ? size * 1.3 : size
            if (inRN) {
              rootStyle.height = scale$1 ? scale(_size) : _size
              rootStyle.width = rootStyle.height
            } else {
              rootStyle.fontSize = scale$1 ? scale(_size) : _size
            }
          } else {
            careClass = useClassWithCare(careMode, ['fta-icon--' + size])
          }
          if (color) {
            rootStyle[inRN ? 'tintColor' : 'color'] = color
          }
          var iconName = value ? prefixClass + '-' + value : ''
          return React.createElement(
            ContainerAdaptor,
            null,
            React.createElement(
              IconAdaptor,
              {
                src: src,
                style: _mergeEleStyles(
                  _getStyle(classNames(prefixClass, iconName, careClass, className)),
                  rootStyle
                ),
                tintColor: color,
                onClick: _this2.handleClick,
              },
              !inRN && badge ? _this2.renderBadge() : null
            ),
            inRN && badge ? _this2.renderBadge() : null
          )
        })
      },
    },
  ])
  return Icon
})(React.Component)
Icon.defaultProps = {
  scale: true,
  customStyle: {},
  className: '',
  prefixClass: 'fta-icon',
  value: '',
  color: '',
  src: 'https://imagecdn.ymm56.com/ymmfile/common-operation/65dd3d3d-1b53-4d36-b47a-160fce6d40f6.png',
  size: 24,
  image: false,
}
Icon.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  prefixClass: PropTypes.string,
  value: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
}

export { Icon as default }
