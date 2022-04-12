import View from '@fta/components-rn/dist/components/View'
import React, { createContext, Component } from 'react'
import '@fta/components-rn/dist/components/Text'
import { StyleSheet } from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'
import { getSystemInfoSync } from '@fta/taro-rn/dist/lib/getSystemInfoSync'
import '@fta/taro-rn'
import { getEnv } from '@fta/taro-rn/dist/lib/getEnv'
import '@fta/taro-rn/dist/lib/ENV_TYPE'

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

var classnames = { exports: {} }

;(function (module) {
  ;(function () {
    var hasOwn = {}.hasOwnProperty
    function classNames() {
      var classes = []
      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i]
        if (!arg) continue
        var argType = typeof arg
        if (argType === 'string' || argType === 'number') {
          classes.push(arg)
        } else if (Array.isArray(arg)) {
          if (arg.length) {
            var inner = classNames.apply(null, arg)
            if (inner) {
              classes.push(inner)
            }
          }
        } else if (argType === 'object') {
          if (arg.toString === Object.prototype.toString) {
            for (var key in arg) {
              if (hasOwn.call(arg, key) && arg[key]) {
                classes.push(key)
              }
            }
          } else {
            classes.push(arg.toString())
          }
        }
      }
      return classes.join(' ')
    }
    if (module.exports) {
      classNames.default = classNames
      module.exports = classNames
    } else {
      window.classNames = classNames
    }
  })()
})(classnames)
var classNames = classnames.exports

var defaultContext = { careMode: false, platform: 'ymm', debugger: true }
var Context = createContext(defaultContext)
Context.displayName = 'GlobalConfigContext'
var ConfigConsumer = Context.Consumer

StyleSheet.create({
  'fta-text': {},
  'fta-text--1': {
    fontSize: scalePx2dp(21),
    lineHeight: scalePx2dp(27.3),
  },
  'fta-text--1--care': {
    fontSize: scalePx2dp(27.5),
    lineHeight: scalePx2dp(35.5),
  },
  'fta-text--2': {
    fontSize: scalePx2dp(19),
    lineHeight: scalePx2dp(24.7),
  },
  'fta-text--2--care': {
    fontSize: scalePx2dp(24.5),
    lineHeight: scalePx2dp(32),
  },
  'fta-text--3': {
    fontSize: scalePx2dp(17.5),
    lineHeight: scalePx2dp(22.75),
  },
  'fta-text--3--care': {
    fontSize: scalePx2dp(23),
    lineHeight: scalePx2dp(29.5),
  },
  'fta-text--4': {
    fontSize: scalePx2dp(15.5),
    lineHeight: scalePx2dp(20.15),
  },
  'fta-text--4--care': {
    fontSize: scalePx2dp(20),
    lineHeight: scalePx2dp(26),
  },
  'fta-text--5': {
    fontSize: scalePx2dp(13.5),
    lineHeight: scalePx2dp(17.55),
  },
  'fta-text--5--care': {
    fontSize: scalePx2dp(17.5),
    lineHeight: scalePx2dp(23),
  },
  'fta-text--6': {
    fontSize: scalePx2dp(11.5),
    lineHeight: scalePx2dp(14.95),
  },
  'fta-text--6--care': {
    fontSize: scalePx2dp(15),
    lineHeight: scalePx2dp(19.5),
  },
})

var isString = function isString(s) {
  return typeof s === 'string' && s.length > 0
}
var useClassWithCare = function useClassWithCare(careMode, careClazz) {
  var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '--care'
  return classNames(
    careMode
      ? careClazz.map(function (v) {
          return isString(v) ? v + ' ' + v + suffix : ''
        })
      : careClazz
  )
}
useClassWithCare.single = function (careMode, careClass) {
  var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '--care'
  return careMode ? (isString(careMode) ? careClass + ' ' + careClass + suffix : '') : careClass
}

StyleSheet.create({
  'fta-debugger': {
    position: 'absolute',
    bottom: scalePx2dp(50),
    right: scalePx2dp(20),
    width: scalePx2dp(40),
    height: scalePx2dp(40),
    backgroundColor: '#fff',
    borderRadius: scalePx2dp(150),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#fa871e',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  'fta-debugger__text': {
    color: '#fa871e',
  },
  'fta-debugger--care': {
    width: scalePx2dp(50),
    height: scalePx2dp(50),
  },
})

var systemInfo = getSystemInfoSync()
systemInfo.windowWidth / 750
var inIOS = systemInfo.platform === 'ios'
var inIPhone =
  systemInfo.system === 'iOS' ||
  systemInfo.brand === 'iPhone' ||
  systemInfo.model === 'iPhone' ||
  inIOS
inIPhone && (systemInfo.screenHeight >= 812 || systemInfo.screenWidth >= 812)
systemInfo.platform === 'android'

getEnv()

var indexScssStyleSheet = StyleSheet.create({
  'fta-timeline': {
    marginLeft: scalePx2dp(7),
  },
  'fta-timeline-item': {
    position: 'relative',
  },
  'fta-timeline-item-view': {
    marginLeft: scalePx2dp(16),
    paddingBottom: scalePx2dp(12),
  },
  'fta-timeline-item-node': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: scalePx2dp(5),
    bottom: scalePx2dp(-5),
    height: '100%',
  },
  'fta-timeline-item-dot': {
    borderRadius: scalePx2dp(5000),
    width: scalePx2dp(8),
    height: scalePx2dp(8),
    backgroundColor: '#ddd',
  },
  'fta-timeline-item-dot--care': {
    width: scalePx2dp(10.5),
    height: scalePx2dp(10.5),
  },
  'fta-timeline-item-dot--hollow': {
    borderWidth: scalePx2dp(2),
    backgroundColor: 'transparent',
  },
  'fta-timeline-item-line': {
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
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
var TimelineItem = (function (_Component) {
  _inherits(TimelineItem, _Component)
  var _super = _createSuper(TimelineItem)
  function TimelineItem() {
    _classCallCheck(this, TimelineItem)
    return _super.apply(this, arguments)
  }
  _createClass(TimelineItem, [
    {
      key: 'render',
      value: function render() {
        var _this = this
        var _this$props = this.props,
          color = _this$props.color,
          icon = _this$props.icon,
          _this$props$hollow = _this$props.hollow,
          hollow = _this$props$hollow === void 0 ? false : _this$props$hollow
        var dotStyle = {}
        if (color) {
          dotStyle[hollow ? 'borderColor' : 'backgroundColor'] = color
        }
        return React.createElement(ConfigConsumer, null, function (_ref) {
          var careMode = _ref.careMode
          var dotClass = classNames(
            useClassWithCare(careMode, ['fta-timeline-item-dot']),
            hollow && 'fta-timeline-item-dot--hollow'
          )
          return React.createElement(
            View,
            { style: _styleSheet['fta-timeline-item'] },
            React.createElement(
              View,
              { style: _styleSheet['fta-timeline-item-view'] },
              _this.props.children
            ),
            React.createElement(
              View,
              { style: _styleSheet['fta-timeline-item-node'] },
              icon ||
                React.createElement(View, {
                  style: _mergeEleStyles(_getStyle(dotClass), dotStyle),
                }),
              React.createElement(View, { style: _styleSheet['fta-timeline-item-line'] })
            )
          )
        })
      },
    },
  ])
  return TimelineItem
})(Component)
var Timeline = (function (_Component2) {
  _inherits(Timeline, _Component2)
  var _super2 = _createSuper(Timeline)
  function Timeline() {
    _classCallCheck(this, Timeline)
    return _super2.apply(this, arguments)
  }
  _createClass(Timeline, [
    {
      key: 'render',
      value: function render() {
        var _this$props2 = this.props,
          reverse = _this$props2.reverse,
          children = _this$props2.children
        var _children = reverse && Array.isArray(children) ? children.slice().reverse() : children
        return React.createElement(View, { style: _styleSheet['fta-timeline'] }, _children)
      },
    },
  ])
  return Timeline
})(Component)
Timeline.defaultProps = { reverse: false }
Timeline.Item = TimelineItem

export { TimelineItem, Timeline as default }
