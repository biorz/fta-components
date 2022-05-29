import Button from '@fta/components-rn/dist/components/Button'
import Form from '@fta/components-rn/dist/components/Form'
import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { inWeapp, inWeb, inAlipay, isString, inRN } from '../common'
import { StyleSheet } from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'
import Loading from '../loading'

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
  'fta-button': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
    paddingTop: 0,
    paddingRight: scalePx2dp(16.66667),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(16.66667),
    height: scalePx2dp(45.83333),
    color: '#333',
    fontSize: scalePx2dp(18.75),
    lineHeight: scalePx2dp(46.875),
    textAlign: 'center',
    borderRadius: scalePx2dp(6.25),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e9e9e9',
  },
  'fta-button__wxbutton': {
    position: 'absolute',
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    opacity: 0,
    zIndex: 1,
  },
  'fta-button--active': {
    opacity: 0.6,
  },
  'fta-button--disabled': {
    opacity: 0.3,
  },
  'fta-button--large': {
    height: scalePx2dp(45.83333),
    paddingTop: 0,
    paddingRight: scalePx2dp(12.5),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(12.5),
    borderRadius: scalePx2dp(8.33333),
    width: scalePx2dp(343.75),
  },
  'fta-button--large--circle': {
    borderRadius: scalePx2dp(26.04167),
  },
  'fta-button--medium': {
    height: scalePx2dp(33.33333),
    paddingTop: 0,
    paddingRight: scalePx2dp(12.5),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(12.5),
    borderRadius: scalePx2dp(6.25),
    width: scalePx2dp(166.66667),
  },
  'fta-button--medium--circle': {
    borderRadius: scalePx2dp(18.75),
  },
  'fta-button--small': {
    height: scalePx2dp(25),
    paddingTop: 0,
    paddingRight: scalePx2dp(12.5),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(12.5),
    borderRadius: scalePx2dp(4.16667),
  },
  'fta-button--small--circle': {
    borderRadius: scalePx2dp(14.58333),
  },
  'fta-button--primary': {
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: '#fa871e',
    backgroundColor: '#fa871e',
  },
  'fta-button--primary--disabled': {
    backgroundColor: '#fa871e',
    opacity: 0.4,
  },
  'fta-button--primary--active': {
    backgroundColor: '#fa871e',
    opacity: 0.8,
  },
  'fta-button--secondary': {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#fa871e',
    backgroundColor: '#fff',
  },
  'fta-button--secondary--disabled': {
    backgroundColor: '#fff',
    opacity: 0.4,
  },
  'fta-button--secondary--active': {
    backgroundColor: '#fff',
    opacity: 0.8,
  },
  'fta-button--tertiary': {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#fa871e',
    backgroundColor: '#fff',
  },
  'fta-button--tertiary--disabled': {
    backgroundColor: '#fff',
    opacity: 0.4,
  },
  'fta-button--tertiary--active': {
    backgroundColor: '#fff',
    opacity: 0.8,
    color: '#fa871e',
  },
  'fta-button--fourth': {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ededed',
    backgroundColor: '#fff',
  },
  'fta-button--fourth--disabled': {
    backgroundColor: '#fff',
    opacity: 0.4,
  },
  'fta-button--fourth--active': {
    backgroundColor: '#fff',
    opacity: 0.8,
  },
  'fta-button__text': {
    fontSize: scalePx2dp(16.66667),
  },
  'fta-button__text--loading': {
    marginLeft: scalePx2dp(8.33333),
  },
  'fta-button__text--primary': {
    color: '#fff',
  },
  'fta-button__text--primary--disabled': {
    color: '#fff',
  },
  'fta-button__text--secondary': {
    color: '#fa871e',
  },
  'fta-button__text--secondary--disabled': {
    color: '#fa871e',
  },
  'fta-button__text--tertiary': {
    color: '#fa871e',
  },
  'fta-button__text--tertiary--disabled': {
    color: '#fa871e',
  },
  'fta-button__text--fourth': {
    color: '#666',
  },
  'fta-button__text--fourth--disabled': {
    color: '#ccc',
  },
  'fta-button__text--large': {
    fontSize: scalePx2dp(16.66667),
  },
  'fta-button__text--medium': {
    fontSize: scalePx2dp(14.58333),
  },
  'fta-button__text--small': {
    fontSize: scalePx2dp(12.5),
  },
  'fta-button--circle': {
    borderRadius: scalePx2dp(23.95833),
    overflow: 'hidden',
  },
  'fta-button--full': {
    width: '100%',
    maxWidth: '100%',
    borderRadius: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
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
var ButtonAdapter = inRN ? Button : View
var SIZE_CLASS = { small: 'small', medium: 'medium', large: 'large' }
var TYPE_CLASS = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  fourth: 'fourth',
}
var FTAButton = (function (_Component) {
  _inherits(FTAButton, _Component)
  var _super = _createSuper(FTAButton)
  function FTAButton(props) {
    _classCallCheck(this, FTAButton)
    return _super.call(this, props)
  }
  _createClass(FTAButton, [
    {
      key: 'onClick',
      value: function onClick(event) {
        if (!this.props.disabled) {
          this.props.onClick && this.props.onClick(event)
        }
      },
    },
    {
      key: 'onGetUserInfo',
      value: function onGetUserInfo(event) {
        this.props.onGetUserInfo && this.props.onGetUserInfo(event)
      },
    },
    {
      key: 'onContact',
      value: function onContact(event) {
        this.props.onContact && this.props.onContact(event)
      },
    },
    {
      key: 'onGetPhoneNumber',
      value: function onGetPhoneNumber(event) {
        this.props.onGetPhoneNumber && this.props.onGetPhoneNumber(event)
      },
    },
    {
      key: 'onError',
      value: function onError(event) {
        this.props.onError && this.props.onError(event)
      },
    },
    {
      key: 'onOpenSetting',
      value: function onOpenSetting(event) {
        this.props.onOpenSetting && this.props.onOpenSetting(event)
      },
    },
    {
      key: 'hoverStyle',
      get: function get() {
        var _this$props = this.props,
          disabled = _this$props.disabled,
          hoverStyle = _this$props.hoverStyle
        return disabled ? undefined : hoverStyle
      },
    },
    {
      key: 'hoverClass',
      get: function get() {
        var _this$props2 = this.props,
          disabled = _this$props2.disabled,
          hoverClassName = _this$props2.hoverClassName,
          type = _this$props2.type
        return disabled ? undefined : classNames('fta-button--' + type + '--active', hoverClassName)
      },
    },
    {
      key: 'onSumit',
      value: function onSumit(event) {
        if (inWeapp || inWeb) {
          this.$scope.triggerEvent('submit', event.detail, { bubbles: true, composed: true })
        }
      },
    },
    {
      key: 'onReset',
      value: function onReset(event) {
        if (inWeapp || inWeb) {
          this.$scope.triggerEvent('reset', event.detail, { bubbles: true, composed: true })
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _classNames
        var _this$props3 = this.props,
          size = _this$props3.size,
          type = _this$props3.type,
          circle = _this$props3.circle,
          full = _this$props3.full,
          loading = _this$props3.loading,
          disabled = _this$props3.disabled,
          customStyle = _this$props3.customStyle,
          formType = _this$props3.formType,
          openType = _this$props3.openType,
          lang = _this$props3.lang,
          sessionFrom = _this$props3.sessionFrom,
          sendMessageTitle = _this$props3.sendMessageTitle,
          sendMessagePath = _this$props3.sendMessagePath,
          sendMessageImg = _this$props3.sendMessageImg,
          showMessageCard = _this$props3.showMessageCard,
          appParameter = _this$props3.appParameter,
          textClassName = _this$props3.textClassName,
          textStyle = _this$props3.textStyle,
          className = _this$props3.className,
          children = _this$props3.children,
          style = _this$props3.style
        var rootClassName = classNames(
          'fta-button',
          ((_classNames = {}),
          _defineProperty(_classNames, 'fta-button--' + SIZE_CLASS[size], SIZE_CLASS[size]),
          _defineProperty(_classNames, 'fta-button--' + type, TYPE_CLASS[type]),
          _defineProperty(_classNames, 'fta-button--' + size + '--circle', circle),
          _defineProperty(_classNames, 'fta-button--full', full),
          _classNames),
          disabled && ['fta-button--disabled', 'fta-button--' + type + '--disabled'],
          className
        )
        var textClass = classNames(
          'fta-button__text',
          'fta-button__text--' + (SIZE_CLASS[size] || 'default'),
          'fta-button__text--' + (TYPE_CLASS[type] || 'default'),
          disabled && 'fta-button__text--' + type + '--disabled',
          loading && 'fta-button__text--loading fta-button__text--' + type + '--loading',
          textClassName
        )
        var loadingColor = type === 'primary' ? '#fff' : ''
        var loadingComponent
        if (loading === true) {
          loadingComponent = React.createElement(
            View,
            { style: _styleSheet['fta-button__icon'] },
            React.createElement(Loading, { color: loadingColor, size: size, useImage: true })
          )
          rootClassName = classNames(rootClassName)
        } else {
          loadingComponent = loading
        }
        var webButton = React.createElement(Button, {
          lang: lang,
          disabled: disabled,
          formType: formType,
          style: _styleSheet['fta-button__wxbutton'],
        })
        var button = React.createElement(Button, {
          formType: formType,
          openType: openType,
          lang: lang,
          sessionFrom: sessionFrom,
          sendMessageTitle: sendMessageTitle,
          sendMessagePath: sendMessagePath,
          sendMessageImg: sendMessageImg,
          showMessageCard: showMessageCard,
          appParameter: appParameter,
          onGetUserInfo: this.onGetUserInfo.bind(this),
          onGetPhoneNumber: this.onGetPhoneNumber.bind(this),
          onOpenSetting: this.onOpenSetting.bind(this),
          onError: this.onError.bind(this),
          onContact: this.onContact.bind(this),
          style: _styleSheet['fta-button__wxbutton'],
        })
        return React.createElement(
          ButtonAdapter,
          {
            disabled: disabled,
            style: _mergeEleStyles(
              _getStyle(rootClassName),
              _objectSpread(_objectSpread({}, style), customStyle)
            ),
            onClick: this.onClick.bind(this),
            hoverStyle: _mergeEleStyles(_getStyle(this.hoverClass), this.hoverStyle),
            hoverClass: this.hoverClass,
          },
          inWeb && !disabled && webButton,
          inWeapp &&
            !disabled &&
            React.createElement(
              Form,
              { onSubmit: this.onSumit.bind(this), onReset: this.onReset.bind(this) },
              button
            ),
          inAlipay && !disabled && button,
          loadingComponent,
          isString(children)
            ? React.createElement(
                Text,
                { style: _mergeEleStyles(_getStyle(textClass), textStyle) },
                children
              )
            : children
        )
      },
    },
  ])
  return FTAButton
})(Component)
FTAButton.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'fourth']),
  circle: PropTypes.bool,
  full: PropTypes.bool,
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  customStyle: PropTypes.object,
  textStyle: PropTypes.object,
  formType: PropTypes.oneOf(['submit', 'reset', '']),
  openType: PropTypes.oneOf([
    'contact',
    'share',
    'getUserInfo',
    'getPhoneNumber',
    'launchApp',
    'openSetting',
    'feedback',
    'getRealnameAuthInfo',
    'getAuthorize',
    'contactShare',
    '',
  ]),
  lang: PropTypes.string,
  sessionFrom: PropTypes.string,
  sendMessageTitle: PropTypes.string,
  sendMessagePath: PropTypes.string,
  sendMessageImg: PropTypes.string,
  showMessageCard: PropTypes.bool,
  appParameter: PropTypes.string,
  onGetUserInfo: PropTypes.func,
  onContact: PropTypes.func,
  onGetPhoneNumber: PropTypes.func,
  onError: PropTypes.func,
  onOpenSetting: PropTypes.func,
}
FTAButton.defaultProps = { customStyle: {}, textStyle: {}, type: 'primary' }

export { FTAButton as default }
