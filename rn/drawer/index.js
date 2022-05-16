import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Modal as Modal$1, StyleSheet } from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'
import List, { ListItem } from '../list'
import SafeArea from '../safe-area'

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
  'fta-drawer': {
    position: 'relative',
    zIndex: 900,
  },
  'fta-drawer__mask': {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  'fta-drawer__content': {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: scalePx2dp(239.58333),
    textAlign: 'left',
    backgroundColor: '#fff',
    zIndex: 901,
  },
  'fta-drawer--left': {
    left: 0,
    right: 'auto',
  },
  'fta-drawer--right': {
    left: 'auto',
    right: 0,
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
var Drawer = (function (_React$Component) {
  _inherits(Drawer, _React$Component)
  var _super = _createSuper(Drawer)
  function Drawer(props) {
    var _this
    _classCallCheck(this, Drawer)
    _this = _super.call(this, props)
    _this.inRN = true
    _this.state = { animShow: false, _show: props.show }
    return _this
  }
  _createClass(Drawer, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _show = this.state._show
        if (_show) this.animShow()
      },
    },
    {
      key: 'onItemClick',
      value: function onItemClick(index) {
        this.props.onItemClick && this.props.onItemClick(index)
        this.animHide()
      },
    },
    {
      key: 'onHide',
      value: function onHide() {
        var _this2 = this
        this.setState({ _show: false }, function () {
          _this2.props.onClose && _this2.props.onClose()
        })
      },
    },
    {
      key: 'animHide',
      value: function animHide() {
        var _this3 = this
        this.setState({ animShow: false })
        if (this.inRN) {
          return this.onHide()
        }
        setTimeout(function () {
          _this3.onHide()
        }, 300)
      },
    },
    {
      key: 'animShow',
      value: function animShow() {
        var _this4 = this
        this.setState({ _show: true })
        if (this.inRN) {
          this.setState({ animShow: true })
          return
        }
        setTimeout(function () {
          _this4.setState({ animShow: true })
        }, 200)
      },
    },
    {
      key: 'onMaskClick',
      value: function onMaskClick() {
        this.animHide()
      },
    },
    {
      key: 'UNSAFE_componentWillReceiveProps',
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        var show = nextProps.show
        if (show !== this.state._show) {
          show ? this.animShow() : this.animHide()
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this5 = this
        var _this$props = this.props,
          mask = _this$props.mask,
          width = _this$props.width,
          right = _this$props.right,
          items = _this$props.items,
          useNativeModal = _this$props.useNativeModal
        var _this$state = this.state,
          animShow = _this$state.animShow,
          _show = _this$state._show
        var rootClassName = ['fta-drawer']
        var maskStyle = { display: mask ? 'flex' : 'none', opacity: animShow ? 1 : 0 }
        var listStyle = this.inRN
          ? {}
          : {
              width: width,
              transition: animShow
                ? 'all 225ms cubic-bezier(0, 0, 0.2, 1)'
                : 'all 195ms cubic-bezier(0.4, 0, 0.6, 1)',
            }
        var classObject = {
          'fta-drawer--show': animShow,
          'fta-drawer--right': right,
          'fta-drawer--left': !right,
        }
        var viewBody = _show
          ? React.createElement(
              Fragment,
              null,
              React.createElement(View, {
                style: _mergeEleStyles(_styleSheet['fta-drawer__mask'], maskStyle),
                onClick: this.onMaskClick.bind(this),
              }),
              React.createElement(
                View,
                {
                  style: _mergeEleStyles(
                    _getStyle(classNames('fta-drawer__content', classObject)),
                    listStyle
                  ),
                },
                React.createElement(
                  SafeArea.View,
                  null,
                  !!items && items.length
                    ? React.createElement(
                        List,
                        null,
                        items.map(function (name, index) {
                          return React.createElement(ListItem, {
                            key: name + '-' + index,
                            'data-index': index,
                            onClick: _this5.onItemClick.bind(_this5, index),
                            title: name,
                            arrow: 'right',
                          })
                        })
                      )
                    : this.props.children
                )
              )
            )
          : React.createElement(Fragment, null)
        return _show
          ? this.inRN
            ? viewBody
            : React.createElement(
                Modal,
                { transparent: true, useNative: useNativeModal },
                React.createElement(
                  View,
                  {
                    style: _getStyle(classNames(rootClassName, classObject, this.props.className)),
                  },
                  viewBody
                )
              )
          : React.createElement(Fragment, null)
      },
    },
  ])
  return Drawer
})(React.Component)
Drawer.defaultProps = {
  show: false,
  mask: true,
  width: '',
  right: false,
  items: [],
  useNativeModal: true,
}
Drawer.propTypes = {
  show: PropTypes.bool,
  mask: PropTypes.bool,
  width: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  onItemClick: PropTypes.func,
  onClose: PropTypes.func,
}

export { Drawer as default }
