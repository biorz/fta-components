import React, { createContext, useState, useContext, useRef, useEffect, useCallback } from 'react'
import View from '@fta/components-rn/dist/components/View'
import TaroText from '@fta/components-rn/dist/components/Text'
import {
  useCarelessClass as useCarelessClass$1,
  useCareMode as useCareMode$1,
  scale as scale$1,
  px as px$1,
} from '../common'
import { StyleSheet } from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'
import classNames from 'classnames'
export { default as classNames } from 'classnames'
import { getSystemInfoSync } from '@fta/taro-rn/dist/lib/getSystemInfoSync'
import Taro from '@fta/taro-rn'
import { getEnv } from '@fta/taro-rn/dist/lib/getEnv'
import { ENV_TYPE } from '@fta/taro-rn/dist/lib/ENV_TYPE'

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

var _excluded$1 = ['children']
function ownKeys$2(object, enumerableOnly) {
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
function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {}
    i % 2
      ? ownKeys$2(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      : ownKeys$2(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
        })
  }
  return target
}
var defaultContext = { careMode: false, platform: 'ymm', debugger: true }
var Context = createContext(defaultContext)
Context.displayName = 'GlobalConfigContext'
function ConfigProvider(props) {
  var children = props.children,
    extraProps = _objectWithoutProperties(props, _excluded$1)
  var _useState = useState(extraProps),
    _useState2 = _slicedToArray(_useState, 2),
    state = _useState2[0],
    setState = _useState2[1]
  extraProps.toggle = function (key, value) {
    return setState(
      _objectSpread$2(_objectSpread$2({}, state), {}, _defineProperty({}, key, value))
    )
  }
  return React.createElement(Context.Provider, { value: state }, children)
}
ConfigProvider.defaultProps = defaultContext
ConfigProvider.context = Context
function withCare(Component, careMode) {
  return function (props) {
    return React.createElement(
      ConfigProvider,
      { careMode: careMode },
      React.createElement(Component, props)
    )
  }
}
function useCareMode() {
  return useConfig('careMode')
}
function useConfig(key) {
  var ctx = useContext(Context)
  if (key) return ctx[key]
  return ctx
}
function useCareComponent(NormalComponent, CareModeComponent, props) {
  var careMode = useConfig('careMode')
  var DynamicComponent = careMode ? CareModeComponent : NormalComponent
  return props ? React.createElement(DynamicComponent, props) : DynamicComponent
}
var ConfigConsumer = Context.Consumer

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
  'fta-text': {},
  'fta-text--1': {
    fontSize: scalePx2dp(22.08),
    lineHeight: scalePx2dp(28.704),
  },
  'fta-text--1--care': {
    fontSize: scalePx2dp(28.8),
    lineHeight: scalePx2dp(37.44),
  },
  'fta-text--2': {
    fontSize: scalePx2dp(20.16),
    lineHeight: scalePx2dp(26.208),
  },
  'fta-text--2--care': {
    fontSize: scalePx2dp(26.4),
    lineHeight: scalePx2dp(34.08),
  },
  'fta-text--3': {
    fontSize: scalePx2dp(18.24),
    lineHeight: scalePx2dp(23.712),
  },
  'fta-text--3--care': {
    fontSize: scalePx2dp(23.52),
    lineHeight: scalePx2dp(30.72),
  },
  'fta-text--4': {
    fontSize: scalePx2dp(15.84),
    lineHeight: scalePx2dp(20.592),
  },
  'fta-text--4--care': {
    fontSize: scalePx2dp(20.64),
    lineHeight: scalePx2dp(26.88),
  },
  'fta-text--5': {
    fontSize: scalePx2dp(13.92),
    lineHeight: scalePx2dp(18.096),
  },
  'fta-text--5--care': {
    fontSize: scalePx2dp(18.24),
    lineHeight: scalePx2dp(23.52),
  },
  'fta-text--6': {
    fontSize: scalePx2dp(12),
    lineHeight: scalePx2dp(15.6),
  },
  'fta-text--6--care': {
    fontSize: scalePx2dp(15.84),
    lineHeight: scalePx2dp(20.16),
  },
})

var _excluded = ['className', 'style', 'level', 'children', 'size', 'color', 'scale', 'weight']
function ownKeys$1(object, enumerableOnly) {
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
function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {}
    i % 2
      ? ownKeys$1(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
      : ownKeys$1(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
        })
  }
  return target
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
var _styleSheet$1 = indexScssStyleSheet
function Text(props) {
  var className = props.className,
    style = props.style,
    level = props.level,
    children = props.children,
    size = props.size,
    color = props.color,
    scale = props.scale,
    weight = props.weight,
    extraProps = _objectWithoutProperties(props, _excluded)
  var textClz = useCarelessClass$1(['fta-text', size ? '' : 'fta-text--' + level], [className])
  var careMode = useCareMode$1()
  var textStyle = _objectSpread$1({}, style)
  if (color) {
    textStyle.color = color
  }
  if (weight) {
    textStyle.fontWeight = weight
  }
  if (size) {
    var fontSize = careMode ? size * 1.3 : size
    textStyle.fontSize = scale ? scale$1(fontSize) : px$1(fontSize)
  }
  return React.createElement(
    TaroText,
    _extends({ style: _mergeEleStyles$1(_getStyle$1(textClz), textStyle) }, extraProps),
    children
  )
}
var textDefaultProps = { level: 4, scale: true }
Text.defaultProps = textDefaultProps

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr)
}

function _iterableToArray(iter) {
  if (
    (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
    iter['@@iterator'] != null
  )
    return Array.from(iter)
}

function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  )
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  )
}

var isString$1 = function isString(s) {
  return typeof s === 'string' && s.length > 0
}
var useCareClass = function useCareClass(careClazz) {
  var suffix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '--care'
  var careMode = useConfig('careMode')
  return classNames(
    careMode
      ? careClazz.map(function (v) {
          return isString$1(v) ? v + ' ' + v + suffix : ''
        })
      : careClazz
  )
}
useCareClass.single = function () {
  var careMode = useConfig('careMode')
  for (var _len = arguments.length, careClazz = new Array(_len), _key = 0; _key < _len; _key++) {
    careClazz[_key] = arguments[_key]
  }
  return classNames(
    careMode
      ? careClazz.map(function (v) {
          return isString$1(v) ? v + ' ' + v + '--care' : ''
        })
      : careClazz
  )
}
var useCareClasses = function useCareClasses() {
  var careMode = useConfig('careMode')
  for (
    var _len2 = arguments.length, careClazzes = new Array(_len2), _key2 = 0;
    _key2 < _len2;
    _key2++
  ) {
    careClazzes[_key2] = arguments[_key2]
  }
  return careClazzes.map(function (careClazz) {
    return classNames(
      careMode
        ? careClazz.map(function (v) {
            return isString$1(v) ? v + ' ' + v + '--care' : ''
          })
        : careClazz
    )
  })
}
useCareClasses.single = function () {
  var careMode = useConfig('careMode')
  for (
    var _len3 = arguments.length, careClazz = new Array(_len3), _key3 = 0;
    _key3 < _len3;
    _key3++
  ) {
    careClazz[_key3] = arguments[_key3]
  }
  return careMode
    ? careClazz.map(function (v) {
        return isString$1(v) ? v + ' ' + v + '--care' : ''
      })
    : careClazz
}
var useCarelessClass = function useCarelessClass(careClazz, nonCareClasszz) {
  var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '--care'
  var careMode = useConfig('careMode')
  return classNames.apply(
    void 0,
    _toConsumableArray(
      (nonCareClasszz != null ? nonCareClasszz : []).concat(
        careMode
          ? careClazz.map(function (v) {
              return isString$1(v) ? v + ' ' + v + suffix : ''
            })
          : careClazz
      )
    )
  )
}
var useClassWithCare = function useClassWithCare(careMode, careClazz) {
  var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '--care'
  return classNames(
    careMode
      ? careClazz.map(function (v) {
          return isString$1(v) ? v + ' ' + v + suffix : ''
        })
      : careClazz
  )
}
useClassWithCare.single = function (careMode, careClass) {
  var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '--care'
  return careMode ? (isString$1(careMode) ? careClass + ' ' + careClass + suffix : '') : careClass
}
var useClassesWithCare = function useClassesWithCare(careMode) {
  for (
    var _len4 = arguments.length, careClazzes = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1;
    _key4 < _len4;
    _key4++
  ) {
    careClazzes[_key4 - 1] = arguments[_key4]
  }
  return careClazzes.map(function (careClazz) {
    return classNames(
      careMode
        ? careClazz.map(function (v) {
            return isString$1(v) ? v + ' ' + v + '--care' : ''
          })
        : careClazz
    )
  })
}
useClassesWithCare.single = function (careMode) {
  for (
    var _len5 = arguments.length, careClazz = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1;
    _key5 < _len5;
    _key5++
  ) {
    careClazz[_key5 - 1] = arguments[_key5]
  }
  return careClazz.map(function (v) {
    return careMode ? (isString$1(v) ? v + ' ' + v + '--care' : '') : v
  })
}

var debuggerScssStyleSheet = StyleSheet.create({
  'fta-debugger': {
    position: 'absolute',
    bottom: scalePx2dp(48),
    right: scalePx2dp(19.2),
    width: scalePx2dp(38.4),
    height: scalePx2dp(38.4),
    backgroundColor: '#fff',
    borderRadius: scalePx2dp(144),
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
    width: scalePx2dp(48),
    height: scalePx2dp(48),
  },
})

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
var _styleSheet = debuggerScssStyleSheet
var getTransformStyle = function (offset) {
  return { transform: [{ translateX: offset[0] }, { translateY: offset[1] }] }
}
var getNativeEvent = function (evt) {
  return evt.nativeEvent
}
var Debugger = function Debugger() {
  if (!['dev', 'development'].includes('dev')) return null
  var _useState = useState([0, 0]),
    _useState2 = _slicedToArray(_useState, 2),
    offset = _useState2[0],
    setOffset = _useState2[1]
  var start = useRef([0, 0]).current
  var prev = useRef([0, 0]).current
  var rootClass = useCareClass.single('fta-debugger')
  var _useConfig = useConfig(),
    toggle = _useConfig.toggle,
    careMode = _useConfig.careMode
  var onTouchStart = function onTouchStart(evt) {
    var changedTouches = evt.changedTouches
    prev[0] = offset[0]
    prev[1] = offset[1]
    start[0] = changedTouches[0].pageX
    start[1] = changedTouches[0].pageY
  }
  var onTouchMove = function onTouchMove(evt) {
    evt.stopPropagation == null ? void 0 : evt.stopPropagation()
    var _getNativeEvent = getNativeEvent(evt),
      changedTouches = _getNativeEvent.changedTouches
    var _changedTouches$ = changedTouches[0],
      pageX = _changedTouches$.pageX,
      pageY = _changedTouches$.pageY
    var _start = _slicedToArray(start, 2),
      x1 = _start[0],
      y1 = _start[1]
    var _prev = _slicedToArray(prev, 2),
      x = _prev[0],
      y = _prev[1]
    setOffset([pageX - x1 + x, pageY - y1 + y])
  }
  return React.createElement(
    View,
    {
      style: _mergeEleStyles(_getStyle(rootClass), getTransformStyle(offset)),
      onClick: function onClick() {
        return toggle('careMode', !careMode)
      },
      onTouchStart: onTouchStart,
      onTouchMove: onTouchMove,
    },
    React.createElement(
      Text,
      { style: _styleSheet['fta-debugger__text'] },
      careMode ? '关怀' : '标准'
    )
  )
}

var isObject = function isObject(val) {
  return Object.prototype.toString.call(val).slice(8, -1) === 'Object'
}
function deepMerge(source, target) {
  if (isObject(target)) {
    Object.entries(target).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1]
      if (isObject(val)) {
        deepMerge(source[key], val)
      } else {
        source[key] = val
      }
    })
  }
  return source
}

var Assets = {
  close: {
    default:
      'https://image.ymm56.com/ymmfile/operation-biz/a5e1c2a8-e59e-4bb8-9a59-c8092d058258.png',
    circle:
      'https://image.ymm56.com/ymmfile/operation-biz/1e270684-078d-49c8-9e69-23fbe607404a.png',
    circleFull:
      'https://imagecdn.ymm56.com/ymmfile/static/resource/c4aa5762-5aad-40c8-9fab-9912569aec6c.png',
  },
  arrow: {
    true: 'https://imagecdn.ymm56.com/ymmfile/common-operation/65dd3d3d-1b53-4d36-b47a-160fce6d40f6.png',
    right:
      'https://imagecdn.ymm56.com/ymmfile/common-operation/65dd3d3d-1b53-4d36-b47a-160fce6d40f6.png',
    down: 'https://image.ymm56.com/ymmfile/operation-biz/27653ee0-6dc6-446a-a60c-38c322e280cc.png',
    up: 'https://image.ymm56.com/ymmfile/operation-biz/4193cb2e-863f-471f-b3bf-80f49c22069a.png',
    left: 'http://image.ymm56.com/boss/2018/1212/1544598761',
  },
  tip: {
    success:
      'https://imagecdn.ymm56.com/ymmfile/static/resource/a826715a-5d51-4bb9-8cd3-a2f75c03d1b7.png',
    error:
      'https://imagecdn.ymm56.com/ymmfile/static/resource/9c1dd2fc-40be-4363-ad7c-1038efba8f23.png',
    waiting:
      'https://imagecdn.ymm56.com/ymmfile/static/resource/f99ecdf5-66d2-4e59-9b20-425affff0f68.png',
    warning:
      'https://image.ymm56.com/ymmfile/operation-biz/ef9aa9a9-710f-40a6-922b-ac044ae168fb.png',
    info: 'https://image.ymm56.com/ymmfile/operation-biz/62398c75-bcc3-40c0-be5e-db16031c0fc5.png',
  },
  empty: {
    default:
      'https://image.ymm56.com/ymmfile/operation-biz/4469e30e-fe6b-4673-952c-c6a2d92ddc7b.png',
    error: 'https://image.ymm56.com/ymmfile/operation-biz/49c712cb-69cc-4e80-9ca8-d752605c403e.png',
  },
  check: {
    default:
      'https://imagecdn.ymm56.com/ymmfile/static/resource/f1b19e18-3105-4951-8e95-f0de00b221d2.png',
  },
  loading: {
    default:
      'https://imagecdn.ymm56.com/ymmfile/static/image/short_distance/rn_sd_loding_wihite_x2_2201280.png',
    blue: 'https://imagecdn.ymm56.com/ymmfile/static/image/short_distance/rn_loading_view_2201230.png',
  },
}
var mergeAssets = function mergeAssets(newAssets) {
  deepMerge(Assets, newAssets)
}

var Themes = { color: { brand: '#fa871e', white: '#fff' } }
var mergeThemes = function mergeThemes(newThemes) {
  deepMerge(Themes, newThemes)
}

var inDev = false
var TARO_ENV = 'rn'
var inRN = TARO_ENV === 'rn'
var inWeb = TARO_ENV === 'h5'
var inWeapp = TARO_ENV === 'weapp'
var inAlipay = TARO_ENV === 'alipay'
var systemInfo = getSystemInfoSync()
var deviceRatio$1 = systemInfo.windowWidth / 720
var px = function (size) {
  return size
}
var autoFix = function autoFix(size) {
  return size * deviceRatio$1
}
var scale = function scale(size) {
  return px(autoFix(size))
}
var inIOS = systemInfo.platform === 'ios'
var inIPhone =
  systemInfo.system === 'iOS' ||
  systemInfo.brand === 'iPhone' ||
  systemInfo.model === 'iPhone' ||
  inIOS
var inNotch = inIPhone && (systemInfo.screenHeight >= 812 || systemInfo.screenWidth >= 812)
var inAndroid = systemInfo.platform === 'android'

var callbackAdaptor = function callbackAdaptor(callback) {
  return function (rect) {
    return callback(Array.isArray(rect) ? rect[0] : rect)
  }
}
function PolyCreateSelectorQuery(selector, callback) {
  var cb = callbackAdaptor(callback)
  var query = Taro.createSelectorQuery == null ? void 0 : Taro.createSelectorQuery()
  if (!query) return
  var el = query.select(selector)
  el.boundingClientRect(cb)
  query.exec(cb)
}

function delay() {
  var delayTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 25
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(null)
    }, delayTime)
  })
}

var ENV = getEnv()
var scrollTop = 0
function handleTouchScroll(flag) {
  if (ENV !== ENV_TYPE.WEB) {
    return
  }
  if (flag) {
    scrollTop = document.documentElement.scrollTop
    document.body.classList.add('at-frozen')
    document.body.style.top = -scrollTop + 'px'
  } else {
    document.body.style.top = ''
    document.body.classList.remove('at-frozen')
    document.documentElement.scrollTop = scrollTop
  }
}

function objectToString(style) {
  if (style && typeof style === 'object') {
    var styleStr = ''
    Object.keys(style).forEach(function (key) {
      var lowerCaseKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      styleStr += lowerCaseKey + ':' + style[key] + ';'
    })
    return styleStr
  } else if (style && typeof style === 'string') {
    return style
  }
  return ''
}

function mergeStyle() {
  for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
    styles[_key] = arguments[_key]
  }
  var _styles = styles.reduce(function (pre, cur) {
    return pre.concat(cur)
  }, [])
  if (
    _styles.some(function (style) {
      return typeof style == 'string'
    })
  ) {
    return _styles.reduce(function (pre, cur) {
      return pre + objectToString(cur)
    }, '')
  }
  return _styles.reduce(function (pre, cur) {
    return _extends(pre, cur)
  }, {})
}

var defaultDesignWidth = 750
var deviceRatio = { 640: 2.34 / 2, 750: 1, 828: 1.81 / 2 }
function pxTransform(size) {
  var designWidth =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultDesignWidth
  if (!size) return ''
  return size / deviceRatio[designWidth]
}

function transformIfPx(size) {
  if (!/px$/.test(String(size))) return size
  size = Number(String(size).replace(/px$/, ''))
  return pxTransform(size)
}

var useAfterwards = function useAfterwards(fn, deps) {
  var ref = useRef(false)
  useEffect(function () {
    if (!ref.current) {
      ref.current = true
    } else {
      fn == null ? void 0 : fn()
    }
  }, deps)
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
function useEnhancedState(initialState) {
  var _useState = useState(initialState),
    _useState2 = _slicedToArray(_useState, 2),
    state = _useState2[0],
    setState = _useState2[1]
  function setEnhancedState(record, val) {
    if (typeof record === 'string') {
      setState(_objectSpread(_objectSpread({}, state), {}, _defineProperty({}, record, val)))
    } else {
      setState(_objectSpread(_objectSpread({}, state), record))
    }
  }
  return [state, useCallback(setEnhancedState, [])]
}

var useMount = function useMount() {
  var mountRef = useRef(false)
  useEffect(function () {
    mountRef.current = true
  }, [])
  return function () {
    return mountRef.current
  }
}

var noob = {}
var noop = function noop() {}
var no = function no() {
  return false
}
var isUndef = function isUndef(val) {
  return typeof val === 'undefined'
}
var isString = function isString(val) {
  return typeof val === 'string'
}
var isNumber = function isNumber(val) {
  return typeof val === 'number'
}
var isBoolean = function isBoolean(val) {
  return typeof val === 'boolean'
}
var isFunction = function isFunction(val) {
  return typeof val === 'function'
}
var isArray = Array.isArray
var extend = Object.assign
var upperCase = function upperCase(val) {
  return val[0].toUpperCase() + val.slice(1)
}
var log = noob

export {
  Assets,
  ConfigConsumer,
  ConfigProvider,
  Debugger,
  TARO_ENV,
  Themes,
  autoFix,
  PolyCreateSelectorQuery as createSelectorQuery,
  deepMerge,
  delay,
  deviceRatio$1 as deviceRatio,
  extend,
  handleTouchScroll,
  inAlipay,
  inAndroid,
  inDev,
  inIOS,
  inIPhone,
  inNotch,
  inRN,
  inWeapp,
  inWeb,
  isArray,
  isBoolean,
  isFunction,
  isNumber,
  isObject,
  isString,
  isUndef,
  log,
  mergeAssets,
  mergeStyle,
  mergeThemes,
  no,
  noob,
  noop,
  objectToString,
  px,
  pxTransform,
  scale,
  systemInfo,
  transformIfPx,
  upperCase,
  useAfterwards,
  useCareClass,
  useCareClasses,
  useCareComponent,
  useCareMode,
  useCarelessClass,
  useClassWithCare,
  useClassesWithCare,
  useConfig,
  useEnhancedState,
  useMount,
  withCare,
}
