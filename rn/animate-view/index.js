import PropTypes from 'prop-types'
import React from 'react'
import { Animated, Easing } from 'react-native'
import { transformIfPx } from '../common'

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

function AnimateView(props) {
  var play = props.play,
    config = props.config
  var _formatConfig = formatConfig(config),
    animatedConfig = _formatConfig.animatedConfig,
    animatedStyle = _formatConfig.animatedStyle
  var _React$useState = React.useState(animatedStyle),
    _React$useState2 = _slicedToArray(_React$useState, 1),
    style = _React$useState2[0]
  React.useEffect(
    function () {
      if (!play) {
        return
      }
      Animated.parallel(
        animatedConfig.map(function (item) {
          return Animated.timing.apply(Animated, item)
        }),
        { stopTogether: false }
      ).start()
    },
    [play]
  )
  return React.createElement(
    Animated.View,
    { style: mergeStyle(props.style || {}, style) },
    props.children
  )
}
AnimateView.defaultProps = { config: null, play: true }
AnimateView.propTypes = { config: PropTypes.array, play: PropTypes.bool }
function formatConfig(config) {
  if (!config || !config.length) return { animatedConfig: [], animatedStyle: {} }
  var animatedConfig = []
  var animatedStyle = {}
  config.forEach(function (item) {
    var type = item.type,
      start = item.start,
      end = item.end,
      duration = item.duration,
      delay = item.delay,
      easing = item.easing,
      useNativeDriver = item.useNativeDriver
    var animatedValue = new Animated.Value(transformIfPx(start))
    animatedConfig.push([
      animatedValue,
      {
        toValue: transformIfPx(end),
        duration: duration,
        delay: delay || 0,
        easing: getAnimateEasing(easing),
        useNativeDriver: useNativeDriver || false,
      },
    ])
    var _type$split = type.split(':'),
      _type$split2 = _slicedToArray(_type$split, 2),
      key = _type$split2[0],
      valueKey = _type$split2[1]
    if (valueKey) {
      animatedStyle[key] = animatedStyle[key] || []
      animatedStyle[key].push(_defineProperty({}, valueKey, animatedValue))
    } else {
      animatedStyle[key] = animatedValue
    }
  })
  return { animatedConfig: animatedConfig, animatedStyle: animatedStyle }
}
function getAnimateEasing(easing) {
  switch (easing) {
    case 'linear':
      return null
    case 'ease-in':
      return Easing.in(Easing.ease)
    case 'ease-out':
      return Easing.out(Easing.ease)
    case 'ease':
    case 'ease-in-out':
      return Easing.inOut(Easing.ease)
  }
}
function mergeStyle() {
  var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  source = (Array.isArray(source) ? source : [source]).concat(target)
  return source.reduce(function (pre, cur) {
    return _extends(pre, cur)
  }, {})
}

export { AnimateView as default }
