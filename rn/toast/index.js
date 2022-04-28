import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import React, {
  Fragment,
  forwardRef,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react'
import { useEnhancedState, inRN } from '../common'
import { Modal as Modal$1, StyleSheet } from 'react-native'
import { scaleVu2dp, scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'
import Loading from '../loading'
import { Text } from '../typography'

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
    paddingTop: scalePx2dp(14.88),
    paddingRight: scalePx2dp(13.92),
    paddingBottom: scalePx2dp(14.88),
    paddingLeft: scalePx2dp(13.92),
    borderRadius: scalePx2dp(8.16),
    maxWidth: scalePx2dp(224.16),
    minWidth: scalePx2dp(82.08),
  },
  'fta-toast-view--loading': {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: scalePx2dp(6.24),
    justifyContent: 'center',
  },
  'fta-toast-view--icon': {
    flexDirection: 'row',
  },
  'fta-toast-loading': {
    width: scalePx2dp(27.84),
    height: scalePx2dp(27.84),
    marginBottom: scalePx2dp(7.68),
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
    paddingTop: scalePx2dp(99.84),
  },
  'fta-toast--bottom': {
    alignItems: 'flex-end',
    paddingBottom: scalePx2dp(99.84),
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
