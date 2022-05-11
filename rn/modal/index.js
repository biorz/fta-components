import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { StyleSheet, Modal } from 'react-native'
import { isString, handleTouchScroll } from '../common'
import { scalePx2dp, scaleVu2dp } from '@fta/runtime-rn/dist/scale2dp'
import { TouchableOpacity } from '../view'
import ScrollView from '@fta/components-rn/dist/components/ScrollView'

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
  button: {
    color: '#333',
    fontSize: scalePx2dp(17.28),
    fontWeight: '400',
    marginTop: 0,
    borderWidth: 0,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 0,
  },
  'fta-modal__action__button': {
    color: '#333',
    fontSize: scalePx2dp(17.28),
    fontWeight: '400',
    marginTop: 0,
    borderWidth: 0,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 0,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: scalePx2dp(48),
  },
  'content-simple__text': {
    color: '#333',
    fontSize: scalePx2dp(15.36),
    fontWeight: '400',
    lineHeight: scalePx2dp(19.968),
    textAlign: 'center',
  },
  'fta-modal': {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: 1000,
  },
  'fta-modal__overlay': {
    opacity: 1,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  'fta-modal__container': {
    opacity: 1,
    maxHeight: scaleVu2dp(80, 'vh'),
    alignItems: 'center',
    justifyContent: 'center',
    width: scalePx2dp(283.2),
    borderRadius: scalePx2dp(7.68),
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  'fta-modal--active': {
    display: 'flex',
  },
  __viewportUnits: true,
  'fta-modal__header-text': {
    color: '#333',
    fontSize: scalePx2dp(17.28),
    fontWeight: '600',
    textAlign: 'center',
  },
  'content-simple': {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  'content-simple--left': {
    textAlign: 'left',
    justifyContent: 'flex-start',
  },
  'content-simple--right': {
    textAlign: 'right',
    justifyContent: 'flex-end',
  },
  'fta-modal__action': {},
  'button--border': {
    borderLeftWidth: scalePx2dp(0.24),
    borderColor: '#ededed',
  },
  'button-confirm__text': {
    color: '#fa871e',
  },
  'fta-modal__action__button--confirm': {
    color: '#fa871e',
  },
})

var actionScssStyleSheet = StyleSheet.create({
  'fta-modal__footer': {
    display: 'flex',
    flexDirection: 'row',
    borderTopWidth: scalePx2dp(0.24),
    borderColor: '#e9e9e9',
  },
  'fta-modal__action': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
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
  classNameArr.reduce((sty, cls) => Object.assign(sty, _styleSheet$3[cls.trim()]), style)
  return style
}
var _styleSheet$3 = actionScssStyleSheet
var ModalAction = (function (_React$Component) {
  _inherits(ModalAction, _React$Component)
  var _super = _createSuper$3(ModalAction)
  function ModalAction() {
    _classCallCheck(this, ModalAction)
    return _super.apply(this, arguments)
  }
  _createClass(ModalAction, [
    {
      key: 'render',
      value: function render() {
        var rootClass = classNames(
          'fta-modal__footer',
          { 'fta-modal__footer--simple': this.props.isSimple },
          this.props.className
        )
        return React.createElement(
          View,
          { style: _getStyle$3(rootClass) },
          React.createElement(
            View,
            { style: _styleSheet$3['fta-modal__action'] },
            this.props.children
          )
        )
      },
    },
  ])
  return ModalAction
})(React.Component)
ModalAction.defaultProps = { isSimple: false }
ModalAction.propTypes = { isSimple: PropTypes.bool }

var contentScssStyleSheet = StyleSheet.create({
  'fta-modal__content': {
    color: '#333',
    fontSize: scalePx2dp(15.36),
    fontWeight: '400',
    lineHeight: scalePx2dp(19.968),
    paddingTop: scalePx2dp(11.52),
    paddingRight: scalePx2dp(28.8),
    paddingBottom: scalePx2dp(28.8),
    paddingLeft: scalePx2dp(28.8),
    maxHeight: scalePx2dp(403.2),
    textAlign: 'center',
    width: '100%',
  },
  'fta-modal__content--no-title': {
    paddingTop: scalePx2dp(28.8),
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
  classNameArr.reduce((sty, cls) => Object.assign(sty, _styleSheet$2[cls.trim()]), style)
  return style
}
function _mergeEleStyles$2() {
  return [].concat.apply([], arguments).reduce((pre, cur) => Object.assign(pre, cur), {})
}
var _styleSheet$2 = contentScssStyleSheet
var ModalContent = (function (_React$Component) {
  _inherits(ModalContent, _React$Component)
  var _super = _createSuper$2(ModalContent)
  function ModalContent() {
    _classCallCheck(this, ModalContent)
    return _super.apply(this, arguments)
  }
  _createClass(ModalContent, [
    {
      key: 'render',
      value: function render() {
        var rootClass = classNames(
          'fta-modal__content',
          this.props.withTitle || 'fta-modal__content--no-title',
          this.props.className
        )
        return React.createElement(
          ScrollView,
          {
            scrollY: true,
            alwaysBounceVertical: false,
            style: _mergeEleStyles$2(_getStyle$2(rootClass), this.props.customStyle),
          },
          this.props.children
        )
      },
    },
  ])
  return ModalContent
})(React.Component)
ModalContent.defaultProps = { withTitle: true }

var headerScssStyleSheet = StyleSheet.create({
  'fta-modal__header': {
    paddingTop: scalePx2dp(28.8),
    paddingRight: scalePx2dp(28.8),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(28.8),
  },
  'fta-modal__header-text': {
    color: '#333',
    fontSize: scalePx2dp(17.28),
    fontWeight: 'bold',
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
  classNameArr.reduce((sty, cls) => Object.assign(sty, _styleSheet$1[cls.trim()]), style)
  return style
}
function _mergeEleStyles$1() {
  return [].concat.apply([], arguments).reduce((pre, cur) => Object.assign(pre, cur), {})
}
var _styleSheet$1 = headerScssStyleSheet
var ModalHeader = (function (_React$Component) {
  _inherits(ModalHeader, _React$Component)
  var _super = _createSuper$1(ModalHeader)
  function ModalHeader() {
    _classCallCheck(this, ModalHeader)
    return _super.apply(this, arguments)
  }
  _createClass(ModalHeader, [
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          className = _this$props.className,
          style = _this$props.style,
          customStyle = _this$props.customStyle,
          children = _this$props.children
        var rootClass = classNames('fta-modal__header', className)
        return React.createElement(
          View,
          { style: _mergeEleStyles$1(_getStyle$1(rootClass), style) },
          isString(children)
            ? React.createElement(
                Text,
                { style: _mergeEleStyles$1(_styleSheet$1['fta-modal__header-text'], customStyle) },
                children
              )
            : children
        )
      },
    },
  ])
  return ModalHeader
})(React.Component)

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
var FTAModal = (function (_React$Component) {
  _inherits(FTAModal, _React$Component)
  var _super = _createSuper(FTAModal)
  function FTAModal(props) {
    var _this
    _classCallCheck(this, FTAModal)
    _this = _super.call(this, props)
    _this.handleClickOverlay = function () {
      if (_this.props.closeOnClickOverlay) {
        _this.setState({ _isOpened: false }, _this.handleClose)
      }
    }
    _this.handleClose = function (event) {
      if (typeof _this.props.onClose === 'function') {
        _this.props.onClose(event)
      }
    }
    _this.handleCancel = function (event) {
      if (typeof _this.props.onCancel === 'function') {
        _this.props.onCancel(event)
      }
    }
    _this.handleConfirm = function (event) {
      if (typeof _this.props.onConfirm === 'function') {
        _this.props.onConfirm(event)
      }
    }
    _this.handleTouchMove = function (e) {
      e.stopPropagation()
    }
    var isOpened = props.isOpened
    _this.state = { _isOpened: isOpened }
    return _this
  }
  _createClass(FTAModal, [
    {
      key: 'UNSAFE_componentWillReceiveProps',
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        var isOpened = nextProps.isOpened
        if (this.props.isOpened !== isOpened) {
          handleTouchScroll(isOpened)
        }
        if (isOpened !== this.state._isOpened) {
          this.setState({ _isOpened: isOpened })
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _isOpened = this.state._isOpened
        var _this$props = this.props,
          title = _this$props.title,
          content = _this$props.content,
          cancelText = _this$props.cancelText,
          confirmText = _this$props.confirmText,
          containerClassName = _this$props.containerClassName,
          containerStyle = _this$props.containerStyle,
          overlayClassName = _this$props.overlayClassName,
          overlayStyle = _this$props.overlayStyle,
          contentAlign = _this$props.contentAlign
        var rootClass = classNames(
          'fta-modal',
          { 'fta-modal--active': _isOpened },
          this.props.className
        )
        var containerClz = classNames('fta-modal__container', containerClassName)
        var overlay = React.createElement(View, {
          onClick: this.handleClickOverlay,
          style: _mergeEleStyles(
            _getStyle(classNames('fta-modal__overlay', overlayClassName)),
            overlayStyle
          ),
        })
        if (!_isOpened) return React.createElement(Fragment, null)
        if (title || content) {
          var isRenderAction = cancelText || confirmText
          return React.createElement(
            Modal,
            {
              visible: _isOpened,
              animationType: 'none',
              transparent: true,
              hardwareAccelerated: true,
              onRequestClose: this.handleClose,
            },
            React.createElement(
              View,
              { style: _getStyle(rootClass) },
              overlay,
              React.createElement(
                View,
                { style: _mergeEleStyles(_getStyle(containerClz), containerStyle) },
                title && React.createElement(ModalHeader, null, title),
                content &&
                  React.createElement(
                    ModalContent,
                    { withTitle: !!title },
                    React.createElement(
                      View,
                      {
                        style: _getStyle(
                          classNames(
                            'content-simple',
                            !title && 'cotent-simple--notitle',
                            'content-simple--' + contentAlign
                          )
                        ),
                      },
                      React.createElement(
                        Text,
                        { style: _styleSheet['content-simple__text'] },
                        content
                      )
                    )
                  ),
                isRenderAction &&
                  React.createElement(
                    ModalAction,
                    { isSimple: true },
                    cancelText &&
                      React.createElement(
                        TouchableOpacity,
                        {
                          hoverStyle: { opacity: 0.6 },
                          onClick: this.handleCancel,
                          style: _mergeEleStyles(
                            _styleSheet['fta-modal__action__button'],
                            _styleSheet['fta-modal__action__button--cancel']
                          ),
                        },
                        React.createElement(
                          Text,
                          {
                            style: _mergeEleStyles(
                              _styleSheet['button'],
                              _styleSheet['button-cancel__text']
                            ),
                          },
                          cancelText
                        )
                      ),
                    confirmText &&
                      React.createElement(
                        TouchableOpacity,
                        {
                          hoverStyle: { opacity: 0.6 },
                          onClick: this.handleConfirm,
                          style: _getStyle(
                            'fta-modal__action__button fta-modal__action__button--confirm ' +
                              (cancelText ? 'button--border' : '')
                          ),
                        },
                        React.createElement(
                          Text,
                          {
                            style: _mergeEleStyles(
                              _styleSheet['button'],
                              _styleSheet['button-confirm__text']
                            ),
                          },
                          confirmText
                        )
                      )
                  )
              )
            )
          )
        }
        return React.createElement(
          Modal,
          {
            visible: _isOpened,
            animationType: 'none',
            transparent: true,
            hardwareAccelerated: true,
            onRequestClose: this.handleClose,
            style: _styleSheet['fta-modal'],
          },
          React.createElement(
            View,
            { style: _getStyle(rootClass) },
            overlay,
            React.createElement(
              View,
              { style: _mergeEleStyles(_getStyle(containerClz), containerStyle) },
              this.props.children
            )
          )
        )
      },
    },
  ])
  return FTAModal
})(React.Component)
FTAModal.defaultProps = { isOpened: false, closeOnClickOverlay: false, contentAlign: 'center' }
FTAModal.propTypes = {
  title: PropTypes.string,
  isOpened: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func,
  content: PropTypes.string,
  closeOnClickOverlay: PropTypes.bool,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
}

export { FTAModal as Modal, ModalAction, ModalContent, ModalHeader, FTAModal as default }
