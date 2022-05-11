import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { Fragment, Component, useRef, useEffect } from 'react'
import { Modal as Modal$1, StyleSheet, Animated, Easing } from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'
import SafeArea from '../safe-area'
import Text from '@fta/components-rn/dist/components/Text'
import { isFunction, isString, Assets } from '../common'
import Button from '../button'
import Image from '@fta/components-rn/dist/components/Image'

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

var _excluded = ['useNative', 'children']
function Modal(props) {
  var useNative = props.useNative,
    children = props.children,
    modalProps = _objectWithoutProperties(props, _excluded)
  return useNative
    ? React.createElement(Modal$1, modalProps, children)
    : React.createElement(Fragment, null, children)
}

var indexScssStyleSheet = StyleSheet.create({
  'fta-action-sheet': {
    display: 'none',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 1010,
  },
  'fta-action-sheet__overlay': {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 1,
  },
  'fta-action-sheet__container': {
    borderTopLeftRadius: scalePx2dp(7.68),
    borderTopRightRadius: scalePx2dp(7.68),
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
  },
  'fta-action-sheet--active': {
    position: 'absolute',
    display: 'flex',
  },
})

var bodyScssStyleSheet = StyleSheet.create({})

function _createSuper$4(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$4()
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
function _isNativeReflectConstruct$4() {
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
function _getClassName$4() {
  var className = []
  var args = arguments[0]
  var type = Object.prototype.toString.call(args).slice(8, -1).toLowerCase()
  if (type === 'string') {
    args = args.trim()
    args && className.push(args)
  } else if (type === 'array') {
    args.forEach(function (cls) {
      cls = _getClassName$4(cls).trim()
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
function _getStyle$4(classNameExpression) {
  var className = _getClassName$4(classNameExpression)
  var classNameArr = className.split(/\s+/)
  var style = {}
  classNameArr.reduce((sty, cls) => Object.assign(sty, _styleSheet$5[cls.trim()]), style)
  return style
}
var _styleSheet$5 = bodyScssStyleSheet
var AtActionSheetBody = (function (_React$Component) {
  _inherits(AtActionSheetBody, _React$Component)
  var _super = _createSuper$4(AtActionSheetBody)
  function AtActionSheetBody() {
    _classCallCheck(this, AtActionSheetBody)
    return _super.apply(this, arguments)
  }
  _createClass(AtActionSheetBody, [
    {
      key: 'render',
      value: function render() {
        var rootClass = classNames('fta-action-sheet__body', this.props.className)
        return React.createElement(View, { style: _getStyle$4(rootClass) }, this.props.children)
      },
    },
  ])
  return AtActionSheetBody
})(React.Component)

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

var activeScssStyleSheet = StyleSheet.create({
  'item-active': {
    backgroundColor: '#f5f5f5',
  },
})

var bodyItemScssStyleSheet = StyleSheet.create({
  'fta-action-sheet__item': {
    paddingTop: scalePx2dp(13.44),
    paddingRight: 0,
    paddingBottom: scalePx2dp(13.44),
    paddingLeft: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    borderBottomWidth: scalePx2dp(0.48),
    borderBottomColor: '#e9e9e9',
  },
  'fta-action-sheet__item__text': {
    fontSize: scalePx2dp(17.28),
    lineHeight: scalePx2dp(17.28),
    color: '#333',
  },
  'fta-action-sheet__item__hint': {
    color: '#999',
    fontSize: scalePx2dp(13.44),
    lineHeight: scalePx2dp(13.44),
    marginTop: scalePx2dp(5.76),
  },
  'item-no-border': {
    borderBottomWidth: 0,
  },
  'item-left': {
    alignItems: 'flex-start',
  },
})

function _createSuper$3(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$3()
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
function _isNativeReflectConstruct$3() {
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
function _getClassName$3() {
  var className = []
  var args = arguments[0]
  var type = Object.prototype.toString.call(args).slice(8, -1).toLowerCase()
  if (type === 'string') {
    args = args.trim()
    args && className.push(args)
  } else if (type === 'array') {
    args.forEach(function (cls) {
      cls = _getClassName$3(cls).trim()
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
function _getStyle$3(classNameExpression) {
  var className = _getClassName$3(classNameExpression)
  var classNameArr = className.split(/\s+/)
  var style = {}
  classNameArr.reduce((sty, cls) => Object.assign(sty, _styleSheet$4[cls.trim()]), style)
  return style
}
function _mergeEleStyles$1() {
  return [].concat.apply([], arguments).reduce((pre, cur) => Object.assign(pre, cur), {})
}
function _mergeStyles() {
  var newTarget = {}
  for (var index = 0; index < arguments.length; index++) {
    var target = arguments[index]
    for (var key in target) {
      newTarget[key] = _extends(newTarget[key] || {}, target[key])
    }
  }
  return newTarget
}
var _styleSheet$4 = _mergeStyles(activeScssStyleSheet, bodyItemScssStyleSheet)
var ActionSheetItem = (function (_React$Component) {
  _inherits(ActionSheetItem, _React$Component)
  var _super = _createSuper$3(ActionSheetItem)
  function ActionSheetItem() {
    var _this
    _classCallCheck(this, ActionSheetItem)
    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key]
    }
    _this = _super.call.apply(_super, [this].concat(_args))
    _this.handleClick = function (args) {
      var onClick = _this.props.onClick
      if (isFunction(onClick)) {
        onClick(args)
      }
    }
    return _this
  }
  _createClass(ActionSheetItem, [
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          textClassName = _this$props.textClassName,
          textStyle = _this$props.textStyle,
          noBorder = _this$props.noBorder,
          hint = _this$props.hint,
          left = _this$props.left
        var rootClass = classNames(
          'fta-action-sheet__item',
          noBorder && 'item-no-border',
          left && 'item-left',
          className
        )
        var textClass = classNames('fta-action-sheet__item__text', textClassName)
        var fragment = isString(children)
          ? React.createElement(
              Text,
              { style: _mergeEleStyles$1(_getStyle$3(textClass), textStyle) },
              children
            )
          : children
        var hintNode = isString(hint)
          ? React.createElement(
              Text,
              { style: _styleSheet$4['fta-action-sheet__item__hint'] },
              hint
            )
          : hint
        return React.createElement(
          View,
          {
            onClick: this.handleClick,
            hoverStyle: { opacity: 0.6 },
            style: _getStyle$3(rootClass),
          },
          fragment,
          hint ? hintNode : null
        )
      },
    },
  ])
  return ActionSheetItem
})(React.Component)
ActionSheetItem.defaultProps = { left: false }
ActionSheetItem.propTypes = { onClick: PropTypes.func }

var footerScssStyleSheet = StyleSheet.create({
  'fta-action-sheet__footer': {
    paddingTop: scalePx2dp(13.44),
    paddingRight: 0,
    paddingBottom: scalePx2dp(13.44),
    paddingLeft: 0,
    borderTopWidth: scalePx2dp(5.76),
    borderTopColor: '#f7f7f7',
    textAlign: 'center',
  },
  'fta-action-sheet__footer__text': {
    fontSize: scalePx2dp(17.28),
    color: '#333',
    textAlign: 'center',
  },
  'fta-action-sheet-footer': {
    borderTopWidth: scalePx2dp(0.48),
    borderTopColor: '#e9e9e9',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: scalePx2dp(65.28),
  },
})

function _createSuper$2(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$2()
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
function _isNativeReflectConstruct$2() {
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
function _getClassName$2() {
  var className = []
  var args = arguments[0]
  var type = Object.prototype.toString.call(args).slice(8, -1).toLowerCase()
  if (type === 'string') {
    args = args.trim()
    args && className.push(args)
  } else if (type === 'array') {
    args.forEach(function (cls) {
      cls = _getClassName$2(cls).trim()
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
function _getStyle$2(classNameExpression) {
  var className = _getClassName$2(classNameExpression)
  var classNameArr = className.split(/\s+/)
  var style = {}
  classNameArr.reduce((sty, cls) => Object.assign(sty, _styleSheet$3[cls.trim()]), style)
  return style
}
var _styleSheet$3 = footerScssStyleSheet
var ActionSheetFooter = (function (_React$Component) {
  _inherits(ActionSheetFooter, _React$Component)
  var _super = _createSuper$2(ActionSheetFooter)
  function ActionSheetFooter() {
    var _this
    _classCallCheck(this, ActionSheetFooter)
    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key]
    }
    _this = _super.call.apply(_super, [this].concat(_args))
    _this.handleClick = function () {
      var onClick = _this.props.onClick
      if (isFunction(onClick)) {
        onClick.apply(void 0, arguments)
      }
    }
    return _this
  }
  _createClass(ActionSheetFooter, [
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          onConfirm = _this$props.onConfirm,
          confirmText = _this$props.confirmText,
          icon = _this$props.icon
        if (icon && confirmText) {
          return React.createElement(
            View,
            { style: _styleSheet$3['fta-action-sheet-footer'] },
            React.createElement(
              Button,
              { size: 'large', type: 'primary', onClick: onConfirm },
              confirmText
            )
          )
        }
        var rootClass = classNames('fta-action-sheet__footer', className)
        var fragment =
          typeof children === 'string'
            ? React.createElement(
                Text,
                { style: _styleSheet$3['fta-action-sheet__footer__text'] },
                children
              )
            : children
        return React.createElement(
          View,
          {
            onClick: this.handleClick,
            hoverStyle: { opacity: 0.6 },
            style: _getStyle$2(rootClass),
          },
          fragment
        )
      },
    },
  ])
  return ActionSheetFooter
})(React.Component)
ActionSheetFooter.defaultProps = {}
ActionSheetFooter.propTypes = { onClick: PropTypes.func }

var headerScssStyleSheet = StyleSheet.create({
  'fta-action-sheet__header': {
    textAlign: 'center',
    paddingTop: scalePx2dp(13.44),
    paddingRight: 0,
    paddingBottom: scalePx2dp(13.44),
    paddingLeft: 0,
    backgroundColor: 'transparent',
    borderBottomWidth: scalePx2dp(0.48),
    borderBottomColor: '#e9e9e9',
    overflow: 'hidden',
    position: 'relative',
  },
  'fta-action-sheet__header--no-title': {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    minHeight: scalePx2dp(34.56),
  },
  'fta-action-sheet__header--no-border': {
    borderBottomWidth: 0,
  },
  'fta-action-sheet__header--complex': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: scalePx2dp(56.16),
  },
  'fta-action-sheet__header-confirm': {
    position: 'absolute',
    overflow: 'hidden',
    right: scalePx2dp(13.44),
    backgroundColor: '#fa871e',
    color: '#fff',
    lineHeight: scalePx2dp(15.36),
    fontSize: scalePx2dp(15.36),
    paddingTop: scalePx2dp(7.68),
    paddingRight: scalePx2dp(11.52),
    paddingBottom: scalePx2dp(7.68),
    paddingLeft: scalePx2dp(11.52),
    borderRadius: scalePx2dp(15.36),
  },
  'fta-action-sheet__header-cancel': {
    position: 'absolute',
    color: '#666',
    fontSize: scalePx2dp(15.36),
    left: scalePx2dp(13.44),
  },
  'fta-action-sheet__header-text': {
    color: '#333',
    fontWeight: 'bold',
    fontSize: scalePx2dp(15.36),
  },
  'fta-action-sheet__header-close': {
    width: scalePx2dp(15.36),
    height: scalePx2dp(15.36),
    position: 'absolute',
    right: scalePx2dp(13.44),
  },
  'fta-action-sheet__header__text': {
    color: '#b2b2b2',
    fontSize: scalePx2dp(17.28),
    textAlign: 'center',
  },
})

function _createSuper$1(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$1()
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
function _isNativeReflectConstruct$1() {
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
  classNameArr.reduce((sty, cls) => Object.assign(sty, _styleSheet$2[cls.trim()]), style)
  return style
}
var _styleSheet$2 = headerScssStyleSheet
var ActionSheetHeader = (function (_Component) {
  _inherits(ActionSheetHeader, _Component)
  var _super = _createSuper$1(ActionSheetHeader)
  function ActionSheetHeader() {
    _classCallCheck(this, ActionSheetHeader)
    return _super.apply(this, arguments)
  }
  _createClass(ActionSheetHeader, [
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className
        var noBorder = children && children.border === false
        var isComplexType = children && (children.title || children.icon)
        var isSimpleType = children && children.icon && !children.title
        var classObject = {
          'fta-action-sheet__header--complex': isComplexType,
          'fta-action-sheet__header--no-title': isSimpleType,
          'fta-action-sheet__header--no-border': noBorder,
        }
        var rootClass = classNames('fta-action-sheet__header', classObject, className)
        var fragment
        var icon = null
        if (isString(children)) {
          fragment = React.createElement(
            Text,
            { style: _styleSheet$2['fta-action-sheet__header__text'] },
            children
          )
        } else if (isComplexType) {
          var _ref = children,
            title = _ref.title,
            confirmText = _ref.confirmText,
            cancelText = _ref.cancelText,
            onCancel = _ref.onCancel,
            onConfirm = _ref.onConfirm,
            _icon = _ref.icon
          fragment = React.createElement(
            React.Fragment,
            null,
            isString(cancelText) && !_icon
              ? React.createElement(
                  Text,
                  { onClick: onCancel, style: _styleSheet$2['fta-action-sheet__header-cancel'] },
                  cancelText
                )
              : _icon
              ? null
              : cancelText,
            isString(title)
              ? React.createElement(
                  Text,
                  { style: _styleSheet$2['fta-action-sheet__header-text'] },
                  title
                )
              : title,
            isString(confirmText) && !_icon
              ? React.createElement(
                  Text,
                  { onClick: onConfirm, style: _styleSheet$2['fta-action-sheet__header-confirm'] },
                  confirmText
                )
              : _icon
              ? null
              : confirmText,
            _icon === true || isString(_icon)
              ? React.createElement(Image, {
                  src: isString(_icon) ? _icon || Assets.close.default : Assets.close.default,
                  onClick: onCancel,
                  style: _styleSheet$2['fta-action-sheet__header-close'],
                })
              : _icon
          )
        } else {
          fragment = children
        }
        return React.createElement(View, { style: _getStyle$1(rootClass) }, fragment, icon)
      },
    },
  ])
  return ActionSheetHeader
})(Component)

var exampleScssStyleSheet = StyleSheet.create({
  'fta-action-sheet-example': {
    position: 'absolute',
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '100%',
    marginBottom: scalePx2dp(19.2),
  },
})

var _styleSheet$1 = exampleScssStyleSheet
function Motion(props) {
  var _isOpened = props._isOpened,
    children = props.children,
    example = props.example,
    style = props.style,
    customStyle = props.customStyle
  var offsetAnim = useRef(new Animated.Value(0)).current
  var offset = offsetAnim.interpolate({ inputRange: [0, 1], outputRange: [300, 0] })
  var run = function run(toValue) {
    offsetAnim.setValue(1 - toValue)
    Animated.timing(offsetAnim, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.bezier(0.36, 0.66, 0.04, 1),
    }).start()
  }
  useEffect(
    function () {
      if (_isOpened) {
        run(1)
      } else {
        run(0)
      }
    },
    [_isOpened]
  )
  return React.createElement(
    Animated.View,
    { style: [{ transform: [{ translateY: offset }] }, style, customStyle] },
    example
      ? React.createElement(View, { style: _styleSheet$1['fta-action-sheet-example'] }, example)
      : null,
    children
  )
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
var ActionSheet = (function (_React$Component) {
  _inherits(ActionSheet, _React$Component)
  var _super = _createSuper(ActionSheet)
  function ActionSheet(props) {
    var _this
    _classCallCheck(this, ActionSheet)
    _this = _super.call(this, props)
    _this.handleClose = function () {
      if (typeof _this.props.onClose === 'function') {
        _this.props.onClose()
      }
    }
    _this.handleCancel = function () {
      if (typeof _this.props.onCancel === 'function') {
        return _this.props.onCancel()
      }
      _this.close()
    }
    _this.close = function () {
      if (_this.props.clickOverlayOnClose) {
        _this.setState({ _isOpened: false }, _this.handleClose)
      }
    }
    _this.handleTouchMove = function (e) {
      e.stopPropagation == null ? void 0 : e.stopPropagation()
      e.preventDefault == null ? void 0 : e.preventDefault()
    }
    var isOpened = props.isOpened
    _this.state = { _isOpened: isOpened }
    return _this
  }
  _createClass(ActionSheet, [
    {
      key: 'UNSAFE_componentWillReceiveProps',
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        var isOpened = nextProps.isOpened
        if (isOpened !== this.state._isOpened) {
          this.setState({ _isOpened: isOpened })
          !isOpened && this.handleClose()
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          title = _this$props.title,
          cancelText = _this$props.cancelText,
          className = _this$props.className,
          customStyle = _this$props.customStyle,
          containerClassName = _this$props.containerClassName,
          containerStyle = _this$props.containerStyle,
          useNativeModal = _this$props.useNativeModal,
          catchMove = _this$props.catchMove,
          example = _this$props.example
        var _isOpened = this.state._isOpened
        var rootClass = classNames(
          'fta-action-sheet',
          { 'fta-action-sheet--active': _isOpened },
          className
        )
        var containerClz = classNames('fta-action-sheet__container', containerClassName)
        return React.createElement(
          Modal,
          { transparent: true, visible: _isOpened, useNative: useNativeModal },
          React.createElement(
            View,
            { style: _mergeEleStyles(_getStyle(rootClass), customStyle), catchMove: catchMove },
            React.createElement(View, {
              onClick: this.close,
              onTouchMove: this.handleTouchMove,
              style: _styleSheet['fta-action-sheet__overlay'],
            }),
            React.createElement(
              Motion,
              {
                _isOpened: _isOpened,
                example: example,
                customStyle: _objectSpread({}, containerStyle),
                style: _getStyle(containerClz),
              },
              title ? React.createElement(ActionSheetHeader, null, title) : null,
              React.createElement(AtActionSheetBody, null, this.props.children),
              cancelText || (title != null && title.icon && title != null && title.confirmText)
                ? React.createElement(
                    ActionSheetFooter,
                    {
                      onClick: this.handleCancel,
                      icon: title == null ? void 0 : title.icon,
                      confirmText: title == null ? void 0 : title.confirmText,
                      onConfirm: title == null ? void 0 : title.onConfirm,
                    },
                    cancelText
                  )
                : null,
              React.createElement(SafeArea, { bottom: true })
            )
          )
        )
      },
    },
  ])
  return ActionSheet
})(React.Component)
ActionSheet.defaultProps = {
  title: '',
  cancelText: '',
  isOpened: false,
  useNativeModal: true,
  catchMove: true,
  clickOverlayOnClose: true,
}
ActionSheet.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  isOpened: PropTypes.bool.isRequired,
  cancelText: PropTypes.string,
}

export {
  ActionSheetItem,
  ActionSheetItem as Item,
  ActionSheetItem as SheetItem,
  ActionSheet as default,
}
