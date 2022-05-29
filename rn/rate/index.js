import Image from '@fta/components-rn/dist/components/Image'
import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import React, { useRef } from 'react'
import { scale } from '../common'
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

var indexScssStyleSheet = StyleSheet.create({
  'fta-rate': {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  'fta-star': {
    width: scalePx2dp(18.75),
    height: scalePx2dp(18.75),
    marginRight: scalePx2dp(8.33333),
  },
  'fta-star--last': {
    marginRight: 0,
  },
  'fta-star-image': {
    width: '100%',
    height: '100%',
  },
  'fta-star--placeholder': {
    position: 'absolute',
    width: '50%',
    height: '100%',
    zIndex: 1,
    top: 0,
  },
  'fta-star--left': {
    left: 0,
  },
  'fta-star--right': {
    right: 0,
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
var IMAGE_PREFIX = 'https://imagecdn.ymm56.com/ymmfile/static/resource/'
var STAR = {
  inactive: '0a8f0880-6fcd-4e37-8480-cbd3408bd6b7.png',
  active: '68b1135e-3a2f-4caa-9662-08a9676aee53.png',
  halfactive: '92aa7285-f3ac-4cd9-9ca3-8d6115e2d9e9.png',
  inactivedisabled: '93310f72-eeac-4287-8e7f-dd232880ccd1.png',
  activedisabled: '641a42f9-0122-4899-abed-2bd798d8b965.png',
  halfdisabled: 'e80a3fac-541d-41a6-b419-37e2e92e9df5.png',
}
function Rate(props) {
  var value = props.value,
    customStyle = props.customStyle,
    className = props.className,
    onChange = props.onChange,
    count = props.count,
    min = props.min,
    half = props.half,
    readonly = props.readonly,
    disabled = props.disabled,
    size = props.size,
    gutter = props.gutter,
    style = props.style
  var emptyList = useRef(new Array(count).fill(null)).current
  var rootClass = classNames('fta-rate', className)
  var rootStyle = _objectSpread(_objectSpread({}, style), customStyle)
  var onStarClick = function onStarClick(index, left) {
    if (readonly || disabled || (!half && value === index + 1)) return
    if (index + 1 < min) {
      onChange == null ? void 0 : onChange(min)
      return
    }
    if (half) {
      var newVal = index + (left ? 0.5 : 1)
      if (newVal !== value) {
        onChange == null ? void 0 : onChange(newVal)
      }
    } else {
      onChange == null ? void 0 : onChange(index + 1)
    }
  }
  var getStarStatus = function getStarStatus(i) {
    var val = value - 1
    var result = val - i
    if (result >= 0) {
      return disabled ? 'activedisabled' : 'active'
    } else {
      if (half && result === -0.5) {
        return disabled ? 'halfdisabled' : 'halfactive'
      } else {
        return disabled ? 'inactivedisabled' : 'inactive'
      }
    }
  }
  return React.createElement(
    View,
    { style: _mergeEleStyles(_getStyle(rootClass), rootStyle) },
    emptyList.map(function (_, i) {
      return React.createElement(Star, {
        key: i,
        half: half,
        size: size,
        gutter: gutter,
        onClick: function onClick(left) {
          return onStarClick(i, left)
        },
        src: IMAGE_PREFIX + (STAR[getStarStatus(i)] || STAR.inactive),
      })
    })
  )
}
function Star(props) {
  var src = props.src,
    size = props.size,
    gutter = props.gutter,
    half = props.half,
    last = props.last,
    onClick = props.onClick
  var rootClass = classNames('fta-star', last && 'fta-start--last')
  var rootStyle = {}
  if (size) {
    rootStyle.width = scale(size)
    rootStyle.height = scale(size)
  }
  if (gutter) rootStyle.marginRight = scale(gutter)
  var onHalfClick = function onHalfClick(left) {
    if (half) {
      onClick == null ? void 0 : onClick(left)
    }
  }
  return React.createElement(
    View,
    {
      style: _mergeEleStyles(_getStyle(rootClass), rootStyle),
      onClick: half
        ? void 0
        : function () {
            return onClick == null ? void 0 : onClick(true)
          },
    },
    React.createElement(Image, {
      src: src || IMAGE_PREFIX + STAR.active,
      style: _styleSheet['fta-star-image'],
    }),
    half
      ? React.createElement(
          React.Fragment,
          null,
          React.createElement(View, {
            onClick: function onClick() {
              return onHalfClick(true)
            },
            style: _mergeEleStyles(
              _styleSheet['fta-star--placeholder'],
              _styleSheet['fta-star--left']
            ),
          }),
          React.createElement(View, {
            onClick: function onClick() {
              return onHalfClick(false)
            },
            style: _mergeEleStyles(
              _styleSheet['fta-star--placeholder'],
              _styleSheet['fta-star--right']
            ),
          })
        )
      : null
  )
}
var RateDefaultProps = { value: 1, min: 1, count: 5, half: false, readonly: false, disabled: false }
Rate.defaultProps = RateDefaultProps

export { Rate as default }
