import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import React, { useRef, useEffect } from 'react'
import { StyleSheet, Easing, Animated } from 'react-native'
import { inAndroid } from '../common'
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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i]
  }
  return arr2
}

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

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen)
  var n = Object.prototype.toString.call(o).slice(8, -1)
  if (n === 'Object' && o.constructor) n = o.constructor.name
  if (n === 'Map' || n === 'Set') return Array.from(o)
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen)
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

var indexScssStyleSheet = StyleSheet.create({
  'fta-loading': {
    overflow: 'hidden',
    width: scalePx2dp(15.36),
    height: scalePx2dp(15.36),
  },
  'fta-loading--small': {
    width: scalePx2dp(15.36),
    height: scalePx2dp(15.36),
  },
  'fta-loading--medium': {
    width: scalePx2dp(19.2),
    height: scalePx2dp(19.2),
  },
  'fta-loading--large': {
    width: scalePx2dp(23.04),
    height: scalePx2dp(23.04),
  },
  'fta-loading__view': {
    borderRadius: scalePx2dp(4800),
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderTopColor: '#fa871e',
    borderRightColor: '#fa871e',
    borderBottomColor: '#fa871e',
    borderLeftColor: 'transparent',
  },
  'fta-loading__view--small': {
    borderWidth: 1,
  },
  'fta-loading__view--medium': {
    borderWidth: 2,
  },
  'fta-loading__view--large': {
    borderWidth: 3,
  },
  'fta-loading__image': {
    width: '100%',
    height: '100%',
  },
  'fta-loading--circle': {
    borderRadius: scalePx2dp(4800),
  },
})

var Assets = {
  default:
    'https://imagecdn.ymm56.com/ymmfile/static/image/short_distance/rn_sd_loding_wihite_x2_2201280.png',
  dt: 'https://imagecdn.ymm56.com/ymmfile/static/image/short_distance/rn_loading_view_2201230.png',
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
var EASING = {
  ease: Easing.inOut(Easing.ease),
  linear: Easing.linear,
  'ease-in': Easing.in(Easing.ease),
  'ease-out': Easing.out(Easing.ease),
  'ease-in-out': Easing.inOut(Easing.ease),
}
function Loading(props) {
  var angleAnim = useRef(new Animated.Value(0)).current
  var animateRef = useRef({ stop: function stop() {}, start: function start() {} })
  var src = props.src,
    customStyle = props.customStyle,
    className = props.className,
    style = props.style,
    stop = props.stop,
    duration = props.duration,
    easing = props.easing,
    circle = props.circle,
    useImage = props.useImage,
    size = props.size,
    color = props.color,
    tintColor = props.tintColor
  var run = function run() {
    animateRef.current = Animated.loop(
      Animated.timing(angleAnim, {
        duration: duration * 1000,
        toValue: 1,
        useNativeDriver: false,
        easing: EASING[easing] || Easing.bezier.apply(Easing, _toConsumableArray(easing)),
      })
    )
    animateRef.current.start()
  }
  var spin = angleAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] })
  useEffect(
    function () {
      stop ? (animateRef.current.stop == null ? void 0 : animateRef.current.stop()) : run()
      return animateRef.current.stop
    },
    [stop]
  )
  var rootClz = classNames('fta-loading', 'fta-loading--' + size, className)
  var borderStyle = color
    ? {
        borderTopColor: color,
        borderRightColor: color,
        borderBottomColor: color,
        borderLeftColor: 'transparent',
      }
    : {}
  return React.createElement(
    View,
    {
      style: _mergeEleStyles(
        _getStyle(rootClz),
        _objectSpread(
          _objectSpread(_objectSpread({}, customStyle), style),
          {},
          { borderRadius: circle ? 1000 : 0 }
        )
      ),
    },
    useImage
      ? React.createElement(Animated.Image, {
          source: { uri: src },
          style: _mergeEleStyles(_styleSheet['fta-loading__image'], {
            transform: [{ rotate: spin }],
          }),
        })
      : React.createElement(
          Animated.View,
          {
            style: _mergeEleStyles(
              _getStyle(classNames('fta-loading__view', 'fta-loading__view--' + size)),
              _objectSpread({ transform: [{ rotate: spin }] }, borderStyle)
            ),
          },
          inAndroid
            ? React.createElement(View, {
                style: {
                  width: '100%',
                  height: '100%',
                  top: '50%',
                  left: '50%',
                  backgroundColor: tintColor,
                },
              })
            : null
        )
  )
}
Loading.defaultProps = {
  size: 'medium',
  src: Assets.default,
  duration: 1,
  easing: 'linear',
  tintColor: '#fff',
}

export { Loading as default }
