import TaroText from '@fta/components-rn/dist/components/Text'
import React from 'react'
import { useCarelessClass, useCareMode, scale, px } from '../common'
import { StyleSheet } from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'

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
  var textStyle = _objectSpread({}, style)
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
    _extends({ style: _mergeEleStyles(_getStyle(textClz), textStyle) }, extraProps),
    children
  )
}
var textDefaultProps = { level: 4, scale: true }
Text.defaultProps = textDefaultProps

export { Text }
