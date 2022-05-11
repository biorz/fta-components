import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import React, { useState, useRef, useEffect, Fragment } from 'react'
import { StyleSheet } from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'
import '@fta/taro-rn'

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

var indexScssStyleSheet = StyleSheet.create({
  'fta-swipe-action': {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    height: 'auto',
  },
  'fta-swipe-action-modal': {
    position: 'relative',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    zIndex: 1,
  },
  'fta-swipe-action-modal__transition': {},
  'fta-swipe-action-button-group': {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 'auto',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    zIndex: 0,
  },
  'fta-swipe-action-button-group-left': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 'auto',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    zIndex: 0,
  },
  'fta-swipe-action-button': {
    height: '100%',
    backgroundColor: '#999',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    paddingRight: scalePx2dp(19.2),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(19.2),
  },
  'fta-swipe-action-button__text': {
    color: '#fff',
    fontSize: scalePx2dp(15.36),
  },
  'fta-swipe-action-follow': {
    right: 'auto',
  },
  'fta-swipe-action-follow-left': {
    left: 'auto',
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
var px = function (num) {
  return num
}
var transitionClass = 'fta-swipe-action-modal__transition'
var getPageX = function (e) {
  return e.nativeEvent.pageX
}
function isMovable(left, offset, distance) {
  return ((!left && offset <= 0) || (left && offset >= 0)) && Math.abs(offset) <= distance
}
function SwipeAction(props) {
  var className = props.className,
    children = props.children,
    style = props.style,
    disabled = props.disabled,
    show = props.show,
    left = props.left,
    breakpoint = props.breakpoint,
    render = props.render,
    options = props.options,
    swipeClassName = props.swipeClassName,
    swipeStyle = props.swipeStyle,
    follow = props.follow
  var _useState = useState(props.distance || 0),
    _useState2 = _slicedToArray(_useState, 2),
    distance = _useState2[0],
    setDistance = _useState2[1]
  var _useState3 = useState(0),
    _useState4 = _slicedToArray(_useState3, 2),
    offset = _useState4[0],
    setOffset = _useState4[1]
  var _useState5 = useState(transitionClass),
    _useState6 = _slicedToArray(_useState5, 2),
    transition = _useState6[0],
    useTransition = _useState6[1]
  var ref = useRef({
    setOffset: setOffset,
    startX: 0,
    offset: 0,
    timer: null,
    show: false,
    transitionClass: '',
  })
  var rootClass = classNames('fta-swipe-action', className)
  useEffect(function () {}, [])
  useEffect(
    function () {
      ref.current.show = show
    },
    [props.show]
  )
  useEffect(
    function () {
      ref.current.setOffset = setOffset
    },
    [setOffset]
  )
  useEffect(
    function () {
      var d = show ? (left ? distance : -1 * distance) : 0
      setOffset(d)
      ref.current.offset = d
    },
    [show, setOffset, distance, left]
  )
  function onTouchStart(e) {
    if (disabled) return
    useTransition('')
    var cur = ref.current
    cur.startX = e.changedTouches[0].pageX
    cur.transitionClass = ''
  }
  function onTouchMove(e) {
    if (disabled) return
    e.preventDefault == null ? void 0 : e.preventDefault()
    var deltaX = getPageX(e) - ref.current.startX + ref.current.offset
    if (isMovable(left, deltaX, distance)) {
      setOffset(deltaX)
      setTimer()
    }
  }
  function autoPositioning(deltaX) {
    var _ref$current = ref.current,
      setOffset = _ref$current.setOffset,
      show = _ref$current.show
    var ratio = show ? 1 - breakpoint : breakpoint
    var offset = 0
    if (left && deltaX > 0) {
      offset = deltaX > distance * ratio ? distance : 0
      setOffset(offset)
      props.onToggle == null ? void 0 : props.onToggle(!!offset)
    } else if (!left && deltaX < 0) {
      offset = deltaX * -1 > distance * ratio ? -1 * distance : 0
      setOffset(offset)
      props.onToggle == null ? void 0 : props.onToggle(!!offset)
    }
    ref.current.show = !!offset
    ref.current.offset = offset
  }
  function handleLayout(e) {
    !distance && setDistance(e.nativeEvent.layout.width)
  }
  function onTouchEnd(e) {
    if (disabled) return
    useTransition(transitionClass)
    var t
    if ((t = ref.current.timer)) clearTimeout(t)
    var deltaX = e.changedTouches[0].pageX - ref.current.startX + ref.current.offset
    if (isMovable(left, deltaX, distance)) {
      autoPositioning(deltaX)
    } else {
      autoPositioning(offset)
    }
  }
  function setTimer() {
    var timer = ref.current.timer
    if (timer) {
      clearTimeout(timer)
      ref.current.timer = null
    }
    ref.current.timer = setTimeout(function () {
      useTransition(transitionClass)
      autoPositioning(offset)
    }, 300)
  }
  return React.createElement(
    View,
    { style: _mergeEleStyles(_getStyle(rootClass), style) },
    React.createElement(
      View,
      {
        style: _mergeEleStyles(
          _getStyle(classNames('fta-swipe-action-modal', transition, swipeClassName)),
          _objectSpread(_objectSpread({}, swipeStyle), {}, { left: px(offset) })
        ),
        onTouchStart: onTouchStart,
        onTouchMove: onTouchMove,
        onTouchEnd: onTouchEnd,
      },
      children
    ),
    React.createElement(
      View,
      {
        style: _mergeEleStyles(
          _getStyle(
            classNames(
              'fta-swipe-action-button-group',
              transition,
              left && 'fta-swipe-action-button-group-left',
              follow && (left ? 'fta-swipe-action-follow-left' : 'fta-swipe-action-follow')
            )
          ),
          follow
            ? _defineProperty(
                {},
                left ? 'left' : 'right',
                px(-distance + (left ? offset : -offset))
              )
            : {}
        ),
        onLayout: handleLayout,
      },
      render ||
        React.createElement(
          Fragment,
          null,
          options.map(function (o, i) {
            return React.createElement(
              View,
              {
                key: i,
                style: _mergeEleStyles(
                  _getStyle(classNames('fta-swipe-action-button', o.containerClassName)),
                  o.containerStyle
                ),
                onClick: o.onClick,
              },
              React.createElement(
                Text,
                {
                  style: _mergeEleStyles(
                    _getStyle(classNames('fta-swipe-action-button__text', o.textClassName)),
                    o.textStyle
                  ),
                },
                o.text
              )
            )
          })
        )
    )
  )
}
var defaultProps = { left: false, show: false, breakpoint: 0.3, swipeStyle: {}, follow: false }
SwipeAction.defaultProps = defaultProps

export { SwipeAction as default }
