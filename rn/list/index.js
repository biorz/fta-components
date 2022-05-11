import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet } from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'
import Image from '@fta/components-rn/dist/components/Image'
import Text from '@fta/components-rn/dist/components/Text'
import { px, ConfigConsumer, useClassesWithCare, inRN, Assets } from '../common'

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

var indexScssStyleSheet = StyleSheet.create({
  'fta-icon__badge': {
    top: scalePx2dp(-8.64),
    left: scalePx2dp(14.4),
  },
  'fta-icon__dot': {
    top: scalePx2dp(-2.88),
    left: scalePx2dp(20.16),
  },
  'fta-icon': {
    borderRadius: scalePx2dp(2.88),
  },
  'fta-icon--small': {
    width: scalePx2dp(11.52),
    height: scalePx2dp(11.52),
  },
  'fta-icon--small--care': {
    width: scalePx2dp(14.88),
    height: scalePx2dp(14.88),
  },
  'fta-icon--small__badge': {
    top: scalePx2dp(-5.76),
    right: scalePx2dp(-11.52),
  },
  'fta-icon--small__badge--dot': {
    top: scalePx2dp(-2.88),
    left: scalePx2dp(8.64),
  },
  'fta-icon--medium': {
    width: scalePx2dp(23.04),
    height: scalePx2dp(23.04),
  },
  'fta-icon--medium--care': {
    width: scalePx2dp(29.76),
    height: scalePx2dp(29.76),
  },
  'fta-icon--medium__badge': {
    top: scalePx2dp(-8.64),
    left: scalePx2dp(14.4),
  },
  'fta-icon--medium__badge--dot': {
    top: scalePx2dp(-2.88),
    left: scalePx2dp(20.16),
  },
  'fta-icon--large': {
    width: scalePx2dp(46.08),
    height: scalePx2dp(46.08),
  },
  'fta-icon--large--care': {
    width: scalePx2dp(60),
    height: scalePx2dp(60),
  },
  'fta-icon--large__badge': {
    top: scalePx2dp(-11.52),
    left: scalePx2dp(34.56),
  },
  'fta-icon--large__badge--dot': {
    top: scalePx2dp(2.88),
    left: scalePx2dp(43.2),
  },
})

var indexScssStyleSheet1 = StyleSheet.create({
  'fta-list': {
    backgroundColor: '#fff',
  },
})

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

var listItemScssStyleSheet = StyleSheet.create({
  'fta-list': {},
  'fta-list__item-container': {
    flexDirection: 'row',
    alignItems: 'center',
  },
  'item-icon': {
    marginRight: scalePx2dp(11.52),
  },
  'item-border-line': {
    borderBottomWidth: scalePx2dp(0.48),
    borderBottomColor: '#e9e9e9',
    marginLeft: scalePx2dp(11.52),
  },
  'fta-list__item': {
    paddingTop: scalePx2dp(9.6),
    paddingRight: scalePx2dp(11.52),
    paddingBottom: scalePx2dp(9.6),
    paddingLeft: scalePx2dp(11.52),
  },
  'item-thumb': {
    marginRight: scalePx2dp(11.52),
    width: scalePx2dp(19.2),
    height: scalePx2dp(19.2),
  },
  'item-thumb__info': {
    width: '100%',
    height: '100%',
  },
  'item-thumb--care': {
    width: scalePx2dp(24.96),
    height: scalePx2dp(24.96),
  },
  'fta-list__item--disabled': {
    opacity: 0.3,
  },
  'item-extra': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'item-extra__info': {
    maxWidth: '100%',
    color: '#999',
    paddingRight: scalePx2dp(12.8),
    fontSize: scalePx2dp(13.44),
    lineHeight: scalePx2dp(17.472),
  },
  'item-extra__info--care': {
    fontSize: scalePx2dp(17.28),
    lineHeight: scalePx2dp(22.56),
  },
  'item-extra__icon': {
    right: scalePx2dp(-3.84),
    position: 'absolute',
  },
  'item-extra__icon-arrow': {
    width: scalePx2dp(12.8),
    height: scalePx2dp(12.8),
  },
  'item-extra__icon-arrow--care': {
    width: scalePx2dp(16.8),
    height: scalePx2dp(16.8),
  },
  'item-extra__image': {
    width: scalePx2dp(19.2),
    height: scalePx2dp(19.2),
    marginRight: scalePx2dp(12.8),
  },
  'item-extra__image-info': {
    width: '100%',
    height: '100%',
  },
  'item-extra__image--care': {
    width: scalePx2dp(24.96),
    height: scalePx2dp(24.96),
  },
  'fta-list__item-content': {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    overflow: 'hidden',
    marginRight: scalePx2dp(12.8),
  },
  'fta-list__item-extra': {
    maxWidth: scalePx2dp(112.8),
    textAlign: 'right',
  },
  'item-content__info-title': {
    color: '#333',
    fontSize: scalePx2dp(15.36),
    lineHeight: scalePx2dp(19.968),
  },
  'item-content__info-title--care': {
    fontSize: scalePx2dp(20.16),
    lineHeight: scalePx2dp(25.92),
  },
  'item-content__info-note': {
    color: '#999',
    fontSize: scalePx2dp(11.52),
    lineHeight: scalePx2dp(14.976),
  },
  'item-content__info-note--care': {
    fontSize: scalePx2dp(14.88),
    lineHeight: scalePx2dp(19.68),
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
function _mergeEleStyles() {
  return [].concat.apply([], arguments).reduce((pre, cur) => Object.assign(pre, cur), {})
}
var _styleSheet$1 = listItemScssStyleSheet
var ListItem = (function (_React$Component) {
  _inherits(ListItem, _React$Component)
  var _super = _createSuper$1(ListItem)
  function ListItem() {
    var _this
    _classCallCheck(this, ListItem)
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }
    _this = _super.call.apply(_super, [this].concat(args))
    _this.handleClick = function (event) {
      if (typeof _this.props.onClick === 'function' && !_this.props.disabled) {
        _this.props.onClick(event)
      }
    }
    return _this
  }
  _createClass(ListItem, [
    {
      key: 'render',
      value: function render() {
        var _this2 = this
        var _this$props = this.props,
          note = _this$props.note,
          arrow = _this$props.arrow,
          thumb = _this$props.thumb,
          iconInfo = _this$props.iconInfo,
          disabled = _this$props.disabled,
          hasBorder = _this$props.hasBorder,
          extraThumb = _this$props.extraThumb
        var _this$props2 = this.props,
          extraText = _this$props2.extraText,
          title = _this$props2.title
        extraText = String(extraText)
        title = String(title)
        var iconStyle = {}
        if (iconInfo != null && iconInfo.color) {
          iconStyle.color = iconInfo.color
        }
        if (iconInfo != null && iconInfo.size) {
          iconStyle.fontSize = px(iconInfo.size)
        }
        return React.createElement(ConfigConsumer, null, function (_ref) {
          var careMode = _ref.careMode
          var iconClz = []
          if (iconInfo != null && iconInfo.value) {
            iconClz.push(
              ((iconInfo && iconInfo.prefixClass) || 'fta-icon') +
                '-' +
                (iconInfo && iconInfo.value)
            )
          }
          var _useClassesWithCare = useClassesWithCare(
              careMode,
              ['fta-list__item', thumb && 'fta-list__item--thumb'],
              iconClz,
              ['item-thumb'],
              ['item-content__info-title'],
              ['item-content__info-note'],
              ['item-extra__info'],
              ['item-extra__image'],
              ['item-extra__icon-arrow']
            ),
            _useClassesWithCare2 = _slicedToArray(_useClassesWithCare, 8),
            rootCareClz = _useClassesWithCare2[0],
            iconCareClz = _useClassesWithCare2[1],
            thumbCareClz = _useClassesWithCare2[2],
            titleClz = _useClassesWithCare2[3],
            noteClz = _useClassesWithCare2[4],
            extraClz = _useClassesWithCare2[5],
            extraImgClz = _useClassesWithCare2[6],
            arrowClz = _useClassesWithCare2[7]
          return React.createElement(
            View,
            null,
            React.createElement(
              View,
              {
                onClick: _this2.handleClick,
                hoverStyle: disabled || { backgroundColor: '#F0F0F0' },
                style: _getStyle$1(
                  classNames(
                    rootCareClz,
                    {
                      'fta-list__item--multiple': note,
                      'fta-list__item--disabled': disabled,
                      'fta-list__item--no-border': !hasBorder,
                    },
                    _this2.props.className
                  )
                ),
              },
              React.createElement(
                View,
                { style: _styleSheet$1['fta-list__item-container'] },
                thumb &&
                  React.createElement(
                    View,
                    { style: _getStyle$1(classNames('fta-list__item-thumb', thumbCareClz)) },
                    React.createElement(Image, {
                      mode: 'scaleToFill',
                      src: thumb,
                      style: _styleSheet$1['item-thumb__info'],
                    })
                  ),
                iconInfo && iconInfo.value
                  ? React.createElement(
                      View,
                      {
                        style: _mergeEleStyles(
                          _styleSheet$1['fta-list__item-icon'],
                          _styleSheet$1['item-icon']
                        ),
                      },
                      React.createElement(Text, {
                        style: _mergeEleStyles(
                          _getStyle$1(
                            classNames(
                              iconCareClz,
                              (iconInfo && iconInfo.prefixClass) || 'fta-icon',
                              iconInfo && iconInfo.className
                            )
                          ),
                          iconStyle
                        ),
                      })
                    )
                  : null,
                React.createElement(
                  View,
                  {
                    style: _mergeEleStyles(
                      _styleSheet$1['fta-list__item-content'],
                      _styleSheet$1['item-content']
                    ),
                  },
                  React.createElement(Text, { style: _getStyle$1(titleClz) }, title),
                  note
                    ? React.createElement(
                        View,
                        null,
                        React.createElement(Text, { style: _getStyle$1(noteClz) }, note)
                      )
                    : null
                ),
                React.createElement(
                  View,
                  {
                    style: _mergeEleStyles(
                      _styleSheet$1['fta-list__item-extra'],
                      _styleSheet$1['item-extra']
                    ),
                  },
                  extraText &&
                    React.createElement(Text, { style: _getStyle$1(extraClz) }, extraText),
                  extraThumb &&
                    !extraText &&
                    React.createElement(
                      View,
                      { style: _getStyle$1(extraImgClz) },
                      React.createElement(Image, {
                        mode: 'aspectFit',
                        src: extraThumb,
                        style: _styleSheet$1['item-extra__image-info'],
                      })
                    ),
                  arrow
                    ? React.createElement(
                        View,
                        { style: _styleSheet$1['item-extra__icon'] },
                        !inRN
                          ? React.createElement(Text, {
                              style: _getStyle$1(
                                classNames(
                                  'fta-icon fta-icon-chevron-' + (arrow === true ? 'right' : arrow),
                                  arrowClz
                                )
                              ),
                            })
                          : React.createElement(Image, {
                              mode: 'aspectFit',
                              src: Assets.arrow[arrow],
                              style: _getStyle$1(classNames('fta-icon', arrowClz)),
                            })
                      )
                    : null
                )
              )
            ),
            inRN && hasBorder
              ? React.createElement(View, { style: _styleSheet$1['item-border-line'] })
              : null
          )
        })
      },
    },
  ])
  return ListItem
})(React.Component)
ListItem.defaultProps = {
  note: '',
  disabled: false,
  title: '',
  thumb: '',
  hasBorder: true,
  extraText: '',
  extraThumb: '',
  iconInfo: { value: '' },
}
ListItem.propTypes = {
  note: PropTypes.string,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  thumb: PropTypes.string,
  onClick: PropTypes.func,
  hasBorder: PropTypes.bool,
  extraText: PropTypes.string,
  extraThumb: PropTypes.string,
  arrow: PropTypes.oneOf(['up', 'down', 'right', true, false]),
  iconInfo: PropTypes.shape({
    size: PropTypes.number,
    value: PropTypes.string,
    color: PropTypes.string,
    prefixClass: PropTypes.string,
    customStyle: PropTypes.oneOfType([PropTypes.object]),
    className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  }),
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
var _styleSheet = _mergeStyles(indexScssStyleSheet, indexScssStyleSheet1)
var List = (function (_React$Component) {
  _inherits(List, _React$Component)
  var _super = _createSuper(List)
  function List() {
    _classCallCheck(this, List)
    return _super.apply(this, arguments)
  }
  _createClass(List, [
    {
      key: 'render',
      value: function render() {
        var rootClass = classNames(
          'fta-list',
          { 'fta-list--no-border': !this.props.hasBorder },
          this.props.className
        )
        return React.createElement(View, { style: _getStyle(rootClass) }, this.props.children)
      },
    },
  ])
  return List
})(React.Component)
List.defaultProps = { hasBorder: true }
List.propTypes = { hasBorder: PropTypes.bool }

export { List, ListItem, List as default }
