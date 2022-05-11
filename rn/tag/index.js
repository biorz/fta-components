import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import React from 'react'
import { useCarelessClass, isString } from '../common'
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
  'fta-tag': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: scalePx2dp(19.2),
    paddingTop: 0,
    paddingRight: scalePx2dp(5.76),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(5.76),
    borderRadius: scalePx2dp(3.84),
  },
  'fta-tag--care': {
    height: scalePx2dp(24.96),
    paddingTop: 0,
    paddingRight: scalePx2dp(7.68),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(7.68),
    borderRadius: scalePx2dp(4.8),
  },
  'fta-tag--bordered': {
    borderWidth: 1,
    borderStyle: 'solid',
  },
  'fta-tag--primary': {
    borderColor: '#fa871e',
  },
  'fta-tag--warning': {
    borderColor: '#ff8843',
  },
  'fta-tag--success': {
    borderColor: '#28aa91',
  },
  'fta-tag--error': {
    borderColor: '#ff5b60',
  },
  'fta-tag--info': {
    borderColor: '#3ca0e6',
  },
  'fta-tag__text': {
    fontSize: scalePx2dp(11.52),
    fontWeight: '400',
  },
  'fta-tag__text--care': {
    fontSize: scalePx2dp(14.88),
  },
  'fta-tag__text--primary': {
    color: '#fa871e',
  },
  'fta-tag__text--warning': {
    color: '#ff8843',
  },
  'fta-tag__text--success': {
    color: '#28aa91',
  },
  'fta-tag__text--error': {
    color: '#ff5b60',
  },
  'fta-tag__text--info': {
    color: '#3ca0e6',
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
function Tag(props) {
  var className = props.className,
    customStyle = props.customStyle,
    type = props.type,
    textStyle = props.textStyle,
    textClassName = props.textClassName,
    bgColor = props.bgColor,
    border = props.border,
    color = props.color,
    borderColor = props.borderColor,
    children = props.children,
    onClick = props.onClick
  var rootClz = useCarelessClass(
    ['fta-tag'],
    ['fta-tag--' + type, border && 'fta-tag--bordered', className]
  )
  var textClz = useCarelessClass(['fta-tag__text'], ['fta-tag__text--' + type, textClassName])
  var rootStyle = _objectSpread({}, customStyle)
  var txtStyle = _objectSpread({}, textStyle)
  if (bgColor) rootStyle.backgroundColor = bgColor
  if (borderColor) rootStyle.borderColor = borderColor
  if (color) txtStyle.color = color
  return React.createElement(
    View,
    { onClick: onClick, style: _mergeEleStyles(_getStyle(rootClz), rootStyle) },
    isString(children)
      ? React.createElement(
          Text,
          { style: _mergeEleStyles(_getStyle(textClz), txtStyle) },
          children
        )
      : children
  )
}
var defaultProps = { type: 'primary', border: true }
Tag.defaultProps = defaultProps

export { Tag as default }
