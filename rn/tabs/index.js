import ScrollView from '@fta/components-rn/dist/components/ScrollView'
import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import React, { createContext, isValidElement, Fragment, cloneElement, Component } from 'react'
import { ConfigConsumer, useClassWithCare } from '../common'
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

var indexScssStyleSheet = StyleSheet.create({
  'fta-tabs': {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  'fta-tabs--vertical': {
    alignSelf: 'flex-start',
    flexDirection: 'column',
    borderBottomWidth: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
  },
  'fta-tab': {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginTop: 0,
    marginRight: scalePx2dp(11.5),
    marginBottom: 0,
    marginLeft: scalePx2dp(11.5),
    justifyContent: 'center',
    alignItems: 'center',
    height: scalePx2dp(38.5),
  },
  'fta-tab__text': {
    fontSize: scalePx2dp(17.5),
    color: '#333',
  },
  'fta-tab__text--care': {
    fontSize: scalePx2dp(23),
  },
  'taro-text-core': {},
  'fta-tab--vertical': {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: scalePx2dp(9.5),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(9.5),
  },
  'fta-tab--active': {
    borderBottomColor: '#fa871e',
  },
  'fta-tab--active__text': {
    color: '#fa871e',
  },
  'fta-tab--active--care': {
    borderBottomWidth: scalePx2dp(2),
  },
})

var TabContext = createContext({ disabled: false, activeIndex: 0, onChange: null })

var _excluded = ['className', 'style', 'children', 'scrollable', 'options', 'controls'],
  _excluded2 = ['label', 'labelClassName', 'labelStyle', 'className', 'style']
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
function cloneChidren(nodeList, index) {
  var tabCursor = 0
  return nodeList.map(function (el, i) {
    if (!isValidElement(el) || el.type !== Tab) return React.createElement(Fragment, { key: i }, el)
    return cloneElement(el, {
      active: index === tabCursor,
      key: 'fta_tab_' + tabCursor,
      index: tabCursor++,
    })
  })
}
var isString = function isString(val) {
  return typeof val === 'string'
}
var isPrimitive = function isPrimitive(val) {
  return ['number', 'string', 'boolean'].includes(typeof val)
}
var Tabs = (function (_Component) {
  _inherits(Tabs, _Component)
  var _super = _createSuper(Tabs)
  function Tabs() {
    var _this
    _classCallCheck(this, Tabs)
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }
    _this = _super.call.apply(_super, [this].concat(args))
    _this.state = { _activeIndex: _this.props.activeIndex || 0 }
    _this._onChange = function (i, val) {
      _this.setState({ _activeIndex: i })
      _this.props.onChange == null ? void 0 : _this.props.onChange(i, val)
    }
    return _this
  }
  _createClass(Tabs, [
    {
      key: 'activeIndex',
      get: function get() {
        return this.props.controls ? this.props.activeIndex : this.state._activeIndex
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this
        var _this$props = this.props,
          className = _this$props.className,
          style = _this$props.style,
          children = _this$props.children,
          scrollable = _this$props.scrollable,
          options = _this$props.options,
          controls = _this$props.controls,
          props = _objectWithoutProperties(_this$props, _excluded)
        var activeIndex = this.activeIndex
        var vertical = this.props.vertical
        var clonedChildren
        if (Array.isArray(options)) {
          clonedChildren = options.map(function (item, i) {
            if (isPrimitive(item))
              return React.createElement(
                Tab,
                {
                  active: i === activeIndex,
                  key: i,
                  index: i,
                  value: item,
                  style: _getStyle(classNames(_this2.props.tabClassName)),
                },
                item + ''
              )
            var label = item.label,
              labelClassName = item.labelClassName,
              labelStyle = item.labelStyle,
              className = item.className,
              style = item.style,
              props = _objectWithoutProperties(item, _excluded2)
            return React.createElement(
              Tab,
              _extends(
                {
                  style: _mergeEleStyles(
                    _getStyle(classNames(className, _this2.props.tabClassName)),
                    style
                  ),
                  active: i === activeIndex,
                  key: i,
                  index: i,
                },
                props
              ),
              isString(label)
                ? React.createElement(
                    Text,
                    { style: _mergeEleStyles(_getStyle(labelClassName), labelStyle) },
                    label
                  )
                : label
            )
          })
        } else {
          clonedChildren = Array.isArray(children) ? cloneChidren(children, activeIndex) : children
        }
        var rootClass = classNames('fta-tabs', vertical && 'fta-tabs--vertical', className)
        var RootView = scrollable ? ScrollView : View
        var scrollProps = _defineProperty({}, 'scroll' + (vertical ? 'Y' : 'X'), true)
        return React.createElement(
          TabContext.Provider,
          {
            value: controls
              ? props
              : _objectSpread(_objectSpread({}, props), {}, { onChange: this._onChange }),
          },
          React.createElement(
            RootView,
            _extends({ style: _mergeEleStyles(_getStyle(rootClass), style) }, props, scrollProps),
            clonedChildren
          )
        )
      },
    },
  ])
  return Tabs
})(Component)
Tabs.defaultProps = {
  activeIndex: 0,
  onChange: null,
  disabled: false,
  scrollable: false,
  vertical: false,
  options: null,
  controls: true,
}
var Tab = (function (_Component2) {
  _inherits(Tab, _Component2)
  var _super2 = _createSuper(Tab)
  function Tab() {
    _classCallCheck(this, Tab)
    return _super2.apply(this, arguments)
  }
  _createClass(Tab, [
    {
      key: 'render',
      value: function render() {
        var _this$props2 = this.props,
          className = _this$props2.className,
          style = _this$props2.style,
          disabled = _this$props2.disabled,
          active = _this$props2.active,
          children = _this$props2.children,
          index = _this$props2.index,
          value = _this$props2.value
        return React.createElement(ConfigConsumer, null, function (_ref) {
          var careMode = _ref.careMode
          return React.createElement(TabContext.Consumer, null, function (context) {
            var isDisabled = disabled || context.disabled
            var rootClass = classNames(
              'fta-tab',
              context.vertical && 'fta-tab--vertical',
              context.tabClassName,
              className,
              isDisabled
                ? 'fta-tab--disabled'
                : active &&
                    classNames(
                      useClassWithCare(careMode, ['fta-tab--active']),
                      context.activeClassName
                    ),
              isDisabled && context.disabledClassName
            )
            return React.createElement(
              View,
              {
                style: _mergeEleStyles(_getStyle(rootClass), style),
                onClick: function onClick() {
                  return (
                    isDisabled ||
                    (context.onChange == null ? void 0 : context.onChange(index, value))
                  )
                },
              },
              isString(children)
                ? React.createElement(
                    Text,
                    {
                      style: _getStyle(
                        classNames(
                          useClassWithCare(careMode, ['fta-tab__text']),
                          isDisabled
                            ? 'fta-tab--disabled__text'
                            : active
                            ? 'fta-tab--active__text'
                            : null
                        )
                      ),
                    },
                    children
                  )
                : children
            )
          })
        })
      },
    },
  ])
  return Tab
})(Component)
Tab.defaultProps = { active: false, disabled: false }
Tabs.Tab = Tab

export { Tab, Tabs as default }
