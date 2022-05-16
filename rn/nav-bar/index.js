import Image from '@fta/components-rn/dist/components/Image'
import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { Fragment, Component } from 'react'
import {
  useCareClass,
  inIOS,
  inAndroid,
  ConfigConsumer,
  Assets,
  useCarelessClass,
  useClassWithCare,
} from '../common'
import { StyleSheet, StatusBar } from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'
import SafeArea from '../safe-area'
import { Text } from '../typography'
import { TouchableOpacity } from '../view'

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

var indexScssStyleSheet = StyleSheet.create({
  'fta-nav-bar': {
    backgroundColor: '#fff',
  },
  'fta-nav-bar-left-button': {
    marginLeft: scalePx2dp(14.58333),
  },
  'fta-nav-bar-right-button': {
    marginRight: scalePx2dp(14.58333),
  },
  'fta-nav-bar-title-container': {
    display: 'flex',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  'fta-nav-bar-title-text': {
    letterSpacing: scalePx2dp(0.52083),
    color: '#333',
    fontWeight: '600',
  },
  'fta-nav-bar-custom-title': {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: scalePx2dp(7.29167),
    alignItems: 'center',
  },
  'fta-nav-bar-back': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scalePx2dp(14.58333),
  },
  'fta-nav-bar-back__image': {
    width: scalePx2dp(16.66667),
    height: scalePx2dp(16.66667),
  },
  'fta-nav-bar-back__image--care': {
    width: scalePx2dp(21.875),
    height: scalePx2dp(21.875),
  },
  'fta-nav-bar-container': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: scalePx2dp(45.83333),
  },
  'fta-status-bar': {
    height: 44,
  },
  'fta-nav-bar-button-container': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    position: 'relative',
    zIndex: 10,
  },
})

var navbarButtonScssStyleSheet = StyleSheet.create({
  'fta-nav-bar-button': {
    display: 'flex',
    position: 'relative',
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  'fta-nav-bar-button__text': {
    letterSpacing: scalePx2dp(0.52083),
    color: '#fa871e',
  },
})

function _getClassName$1() {
  var className = []
  var args = arguments[0]
  var type = Object.prototype.toString.call(args).slice(8, -1).toLowerCase()
  if (type === 'string') {
    args = args.trim()
    args && className.push(args)
  } else if (type === 'array') {
    args.forEach(function (cls) {
      cls = _getClassName$1(cls).trim()
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
function _getStyle$1(classNameExpression) {
  var className = _getClassName$1(classNameExpression)
  var classNameArr = className.split(/\s+/)
  var style = {}
  classNameArr.reduce((sty, cls) => Object.assign(sty, _styleSheet$1[cls.trim()]), style)
  return style
}
function _mergeEleStyles$1() {
  return [].concat.apply([], arguments).reduce((pre, cur) => Object.assign(pre, cur), {})
}
var _styleSheet$1 = navbarButtonScssStyleSheet
function NavbarButton(props) {
  var textClz = useCareClass(['fta-nav-bar-button__text'])
  var style = props.style,
    className = props.className,
    tintColor = props.tintColor,
    title = props.title,
    handler = props.handler,
    disabled = props.disabled,
    accessible = props.accessible,
    accessibilityLabel = props.accessibilityLabel
  var rootClass = classNames('fta-nav-bar-button', className)
  return React.createElement(
    TouchableOpacity,
    {
      style: _mergeEleStyles$1(_getStyle$1(rootClass), style),
      onClick: handler,
      disabled: disabled,
      accessible: accessible,
      accessibilityLabel: accessibilityLabel,
    },
    React.createElement(
      Text,
      {
        level: 3,
        style: _mergeEleStyles$1(_getStyle$1(textClz), tintColor ? { color: tintColor } : {}),
      },
      title
    )
  )
}
NavbarButton.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  tintColor: PropTypes.string,
  title: PropTypes.string,
  handler: PropTypes.func,
  disabled: PropTypes.bool,
  accessible: PropTypes.bool,
  accessibilityLabel: PropTypes.string,
}
NavbarButton.defaultProps = {
  style: {},
  title: '',
  disabled: false,
  handler: function handler() {
    return {}
  },
}

var _excluded = ['className', 'style', 'color'],
  _excluded2 = [
    'containerStyle',
    'tintColor',
    'title',
    'leftButton',
    'rightButton',
    'style',
    'className',
    'containerClassName',
    'safeAreaClassName',
    'safeAreaStyle',
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
function useBackIcon(props) {
  props.className
  var style = props.style,
    color = props.color,
    extraProps = _objectWithoutProperties(props, _excluded)
  var imageClz = useCarelessClass(['fta-nav-bar-back__image'])
  var colorStyle = { tintColor: color }
  return React.createElement(
    TouchableOpacity,
    _extends({ activeOpacity: 0.6 }, extraProps, { style: _styleSheet['fta-nav-bar-back'] }),
    React.createElement(Image, {
      src: NavBar.backIcon,
      style: _mergeEleStyles(
        _getStyle(imageClz),
        _objectSpread(_objectSpread({}, style), colorStyle)
      ),
      tintColor: color,
      mode: 'aspectFit',
    })
  )
}
function getTitleElement(data, careMode) {
  var titleClz = useClassWithCare(careMode, ['fta-nav-bar-custom-title'])
  if (!data || data.props) {
    return React.createElement(View, { style: _getStyle(titleClz) }, data)
  }
  var colorStyle = data.tintColor ? { color: data.tintColor } : null
  var textStyle = _objectSpread(_objectSpread({}, data.style), colorStyle)
  return React.createElement(
    View,
    { style: _styleSheet['fta-nav-bar-title-container'] },
    React.createElement(
      Text,
      {
        level: 3,
        onClick: data.handler,
        ellipsizeMode: data.ellipsizeMode,
        numberOfLines: data.numberOfLines,
        style: _mergeEleStyles(_styleSheet['fta-nav-bar-title-text'], textStyle),
      },
      data.title
    )
  )
}
function getButtonElement(data, className) {
  return React.createElement(
    View,
    { style: _styleSheet['fta-nav-bar-button-container'] },
    !data || data.props
      ? data
      : React.createElement(NavbarButton, {
          title: data.title,
          style: _mergeEleStyles(_getStyle(classNames(className, data.className)), data.style),
          tintColor: data.tintColor,
          handler: data.handler,
          disabled: data.disabled,
          accessible: data.accessible,
          accessibilityLabel: data.accessibilityLabel,
        })
  )
}
var NavBar = (function (_Component) {
  _inherits(NavBar, _Component)
  var _super = _createSuper(NavBar)
  function NavBar() {
    _classCallCheck(this, NavBar)
    return _super.apply(this, arguments)
  }
  _createClass(NavBar, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.customizeStatusBar()
      },
    },
    {
      key: 'UNSAFE_componentWillReceiveProps',
      value: function UNSAFE_componentWillReceiveProps() {
        this.customizeStatusBar()
      },
    },
    {
      key: 'customizeStatusBar',
      value: function customizeStatusBar() {
        var _this$props$statusBar = this.props.statusBar,
          statusBar = _this$props$statusBar === void 0 ? {} : _this$props$statusBar
        if (inIOS) {
          if (statusBar.style) {
            StatusBar == null
              ? void 0
              : StatusBar.setBarStyle == null
              ? void 0
              : StatusBar.setBarStyle(statusBar.style)
          }
          var animation = statusBar.hidden ? statusBar.hideAnimation : statusBar.showAnimation
          StatusBar.showHideTransition = animation
          StatusBar.hidden = statusBar.hidden
        } else if (inAndroid && statusBar.backgroundColor) {
          StatusBar == null ? void 0 : StatusBar.setBackgroundColor(statusBar.backgroundColor)
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this$props$statusBar2
        var _this$props = this.props,
          containerStyle = _this$props.containerStyle,
          tintColor = _this$props.tintColor,
          title = _this$props.title,
          leftButton = _this$props.leftButton,
          rightButton = _this$props.rightButton,
          style = _this$props.style,
          className = _this$props.className,
          containerClassName = _this$props.containerClassName
        _this$props.safeAreaClassName
        var safeAreaStyle = _this$props.safeAreaStyle,
          props = _objectWithoutProperties(_this$props, _excluded2)
        var customTintColor = tintColor ? { backgroundColor: tintColor } : {}
        var customStatusBarTintColor =
          (_this$props$statusBar2 = this.props.statusBar) != null &&
          _this$props$statusBar2.tintColor
            ? { backgroundColor: this.props.statusBar.tintColor }
            : {}
        var rootStyle = _objectSpread(
          _objectSpread(_objectSpread({}, customTintColor), customStatusBarTintColor),
          containerStyle
        )
        var rootClass = classNames('fta-nav-bar', containerClassName)
        var statusBar = React.createElement(SafeArea, { top: true, style: safeAreaStyle })
        var showStatusBar = !this.props.statusBar.hidden
        if (inIOS) {
          statusBar = showStatusBar ? statusBar : null
        }
        return React.createElement(ConfigConsumer, null, function (_ref) {
          var careMode = _ref.careMode
          return React.createElement(
            Fragment,
            null,
            statusBar,
            React.createElement(
              View,
              _extends({ style: _mergeEleStyles(_getStyle(rootClass), rootStyle) }, props),
              React.createElement(
                View,
                {
                  style: _mergeEleStyles(
                    _getStyle(classNames('fta-nav-bar-container', className)),
                    style
                  ),
                },
                getTitleElement(title, careMode),
                getButtonElement(leftButton, 'fta-nav-bar-left-button'),
                getButtonElement(rightButton, 'fta-nav-bar-right-button')
              )
            )
          )
        })
      },
    },
  ])
  return NavBar
})(Component)
NavBar.backIcon = Assets.arrow.left
NavBar.BackIcon = useBackIcon
NavBar.defaultProps = {
  style: {},
  tintColor: '',
  statusBar: { style: 'default', hidden: false, hideAnimation: 'slide', showAnimation: 'slide' },
  containerStyle: {},
  safeAreaStyle: { backgroundColor: 'white' },
}
var ButtonShape = {
  title: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([null])]),
  handler: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}
var TitleShape = {
  title: PropTypes.string.isRequired,
  tintColor: PropTypes.string,
  ellipsizeMode: PropTypes.string,
  numberOfLines: PropTypes.number,
}
var StatusBarShape = {
  style: PropTypes.oneOf(['light-content', 'default']),
  hidden: PropTypes.bool,
  tintColor: PropTypes.string,
  hideAnimation: PropTypes.oneOf(['fade', 'slide', 'none']),
  showAnimation: PropTypes.oneOf(['fade', 'slide', 'none']),
}
NavBar.propTypes = {
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.oneOf([null])]),
  tintColor: PropTypes.string,
  statusBar: PropTypes.shape(StatusBarShape),
  leftButton: PropTypes.oneOfType([
    PropTypes.shape(ButtonShape),
    PropTypes.element,
    PropTypes.oneOf([null]),
  ]),
  rightButton: PropTypes.oneOfType([
    PropTypes.shape(ButtonShape),
    PropTypes.element,
    PropTypes.oneOf([null]),
  ]),
  title: PropTypes.oneOfType([
    PropTypes.shape(TitleShape),
    PropTypes.element,
    PropTypes.oneOf([null]),
  ]),
  containerStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export { NavbarButton as NavBarButton, NavBar as default }
