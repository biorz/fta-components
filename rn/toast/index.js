import View from '@fta/components-rn/dist/components/View'
import React, {
  Fragment,
  useRef,
  useEffect,
  forwardRef,
  useState,
  useImperativeHandle,
  useMemo,
} from 'react'
import {
  inAndroid,
  useCarelessClass,
  useCareMode,
  scale,
  px,
  useEnhancedState,
  inRN,
} from '../common'
import { Modal as Modal$1, StyleSheet, Easing, Animated } from 'react-native'
import { scaleVu2dp, scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'
import TaroText from '@fta/components-rn/dist/components/Text'

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

var _excluded$1 = ['useNative', 'children']
function Modal(props) {
  var useNative = props.useNative,
    children = props.children,
    modalProps = _objectWithoutProperties(props, _excluded$1)
  return useNative
    ? React.createElement(Modal$1, modalProps, children)
    : React.createElement(Fragment, null, children)
}

var indexScssStyleSheet$2 = StyleSheet.create({
  'fta-toast': {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1090,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  'fta-toast--custom': {
    height: scaleVu2dp(100, 'vh'),
  },
  __viewportUnits: true,
  'fta-toast-view': {
    display: 'flex',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingTop: scalePx2dp(14.5),
    paddingRight: scalePx2dp(13.5),
    paddingBottom: scalePx2dp(14.5),
    paddingLeft: scalePx2dp(13.5),
    borderRadius: scalePx2dp(7.5),
    maxWidth: scalePx2dp(215),
    minWidth: scalePx2dp(78.5),
  },
  'fta-toast-view--loading': {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: scalePx2dp(6),
    justifyContent: 'center',
  },
  'fta-toast-view--icon': {
    flexDirection: 'row',
  },
  'fta-toast-loading': {
    width: scalePx2dp(27),
    height: scalePx2dp(27),
    marginBottom: scalePx2dp(7),
  },
  'fta-toast__text': {
    color: '#fff',
    textAlign: 'center',
  },
  'fta-toast--overlay': {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  'fta-toast--transparent': {},
  'fta-toast--center': {
    alignItems: 'center',
  },
  'fta-toast--top': {
    alignItems: 'flex-start',
    paddingTop: scalePx2dp(96),
  },
  'fta-toast--bottom': {
    alignItems: 'flex-end',
    paddingBottom: scalePx2dp(96),
  },
})

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

var indexScssStyleSheet$1 = StyleSheet.create({
  'fta-loading': {
    overflow: 'hidden',
    width: scalePx2dp(15.5),
    height: scalePx2dp(15.5),
  },
  'fta-loading--small': {
    width: scalePx2dp(15.5),
    height: scalePx2dp(15.5),
  },
  'fta-loading--medium': {
    width: scalePx2dp(19),
    height: scalePx2dp(19),
  },
  'fta-loading--large': {
    width: scalePx2dp(23),
    height: scalePx2dp(23),
  },
  'fta-loading__view': {
    borderRadius: scalePx2dp(5000),
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
    borderRadius: scalePx2dp(5000),
  },
})

var Assets = {
  default:
    'https://imagecdn.ymm56.com/ymmfile/static/image/short_distance/rn_sd_loding_wihite_x2_2201280.png',
  dt: 'https://imagecdn.ymm56.com/ymmfile/static/image/short_distance/rn_loading_view_2201230.png',
}

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
var _styleSheet$2 = indexScssStyleSheet$1
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
      style: _mergeEleStyles$2(
        _getStyle$2(rootClz),
        _objectSpread$2(
          _objectSpread$2(_objectSpread$2({}, customStyle), style),
          {},
          { borderRadius: circle ? 1000 : 0 }
        )
      ),
    },
    useImage
      ? React.createElement(Animated.Image, {
          source: { uri: src },
          style: _mergeEleStyles$2(_styleSheet$2['fta-loading__image'], {
            transform: [{ rotate: spin }],
          }),
        })
      : React.createElement(
          Animated.View,
          {
            style: _mergeEleStyles$2(
              _getStyle$2(classNames('fta-loading__view', 'fta-loading__view--' + size)),
              _objectSpread$2({ transform: [{ rotate: spin }] }, borderStyle)
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

var indexScssStyleSheet = StyleSheet.create({
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
    scale$1 = props.scale,
    weight = props.weight,
    extraProps = _objectWithoutProperties(props, _excluded)
  var textClz = useCarelessClass(['fta-text', size ? '' : 'fta-text--' + level], [className])
  var careMode = useCareMode()
  var textStyle = _objectSpread$1({}, style)
  if (color) {
    textStyle.color = color
  }
  if (weight) {
    textStyle.fontWeight = weight
  }
  if (size) {
    var fontSize = careMode ? size * 1.3 : size
    textStyle.fontSize = scale$1 ? scale(fontSize) : px(fontSize)
  }
  return React.createElement(
    TaroText,
    _extends({ style: _mergeEleStyles$1(_getStyle$1(textClz), textStyle) }, extraProps),
    children
  )
}
var textDefaultProps = { level: 4, scale: true }
Text.defaultProps = textDefaultProps

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
var _styleSheet = indexScssStyleSheet$2
var nullTimer = null
function Toast(props, ref) {
  var _useEnhancedState = useEnhancedState(props),
    _useEnhancedState2 = _slicedToArray(_useEnhancedState, 2),
    state = _useEnhancedState2[0],
    setState = _useEnhancedState2[1]
  var title = state.title,
    duration = state.duration,
    mask = state.mask,
    position = state.position,
    textClassName = state.textClassName,
    textStyle = state.textStyle,
    className = state.className,
    customStyle = state.customStyle,
    transparent = state.transparent,
    textLevel = state.textLevel,
    clickMaskOnClose = state.clickMaskOnClose,
    loading = state.loading,
    icon = state.icon,
    useNative = state.useNative,
    containerClassName = state.containerClassName,
    customContainerStyle = state.customContainerStyle,
    onMaskClick = state.onMaskClick
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    visible = _useState2[0],
    toggleVisible = _useState2[1]
  var _ref = useRef({ timer: nullTimer, toggleVisible: toggleVisible })
  var rootClz = classNames(
    'fta-toast',
    'fta-toast--' + position,
    !useNative && inRN && 'fta-toast--custom',
    mask ? 'fta-toast--overlay' : 'fta-toast--transparent',
    className
  )
  var containerClz = classNames(
    'fta-toast-view',
    icon && 'fta-toast-view--icon',
    loading && 'fta-toast-view--loading',
    containerClassName
  )
  var rootStyle = _objectSpread({}, customStyle)
  var textClz = classNames('fta-toast__text', icon && 'fta-toast__text--icon', textClassName)
  if (transparent) {
    rootStyle.backgroundColor = 'transparent'
  }
  useEffect(
    function () {
      _ref.current.toggleVisible = toggleVisible
    },
    [toggleVisible]
  )
  var setTimer = function setTimer(force) {
    if (duration > 0 && (force || visible)) {
      _ref.current.timer = setTimeout(function () {
        return _ref.current.toggleVisible(false)
      }, duration * 1000)
    }
  }
  var clearTimer = function clearTimer() {
    clearTimeout(_ref.current.timer)
    _ref.current.timer = nullTimer
  }
  useImperativeHandle(ref, function () {
    return {
      show: function show(options) {
        clearTimer()
        setState(options)
        toggleVisible(true)
      },
      hide: function hide() {
        clearTimer()
        toggleVisible(false)
      },
    }
  })
  useEffect(
    function () {
      setState(props)
    },
    [props]
  )
  useEffect(function () {
    if (!_ref.current.timer) {
      setTimer()
    }
    return clearTimer
  }, [])
  useEffect(
    function () {
      if (visible) {
        setTimer(state.duration > 0)
        return clearTimer
      }
    },
    [state, visible]
  )
  var _onMaskClick = function _onMaskClick() {
    if (clickMaskOnClose) {
      clearTimer()
      toggleVisible(false)
    }
    onMaskClick()
  }
  var ToastView = React.createElement(
    View,
    { style: _mergeEleStyles(_getStyle(rootClz), rootStyle), onClick: _onMaskClick },
    React.createElement(
      View,
      { style: _mergeEleStyles(_getStyle(containerClz), customContainerStyle) },
      loading === true
        ? React.createElement(Loading, { useImage: true, style: _styleSheet['fta-toast-loading'] })
        : loading,
      !loading && icon,
      title
        ? React.createElement(
            Text,
            {
              level: textLevel,
              style: _mergeEleStyles(_getStyle(textClz), textStyle),
              pointerEvents: 'none',
            },
            title
          )
        : null
    )
  )
  return React.createElement(
    Modal,
    { transparent: true, visible: visible, useNative: useNative },
    inRN ? ToastView : visible ? ToastView : null
  )
}
var defaultProps = {
  title: '',
  duration: 2,
  mask: true,
  transparent: true,
  position: 'center',
  textLevel: 4,
  clickMaskOnClose: false,
  loading: false,
  icon: false,
  useNative: true,
  onMaskClick: function onMaskClick() {},
}
var ForwardToast = forwardRef(Toast)
ForwardToast.defaultProps = defaultProps
function useToast() {
  var defaultProps =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { title: '' }
  var ref = useRef()
  var toastInstance = useMemo(function () {
    return React.createElement(ForwardToast, _extends({}, defaultProps, { ref: ref }))
  }, [])
  return [ref, toastInstance]
}

export { ForwardToast as default, useToast }
