import Image from '@fta/components-rn/dist/components/Image'
import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import React from 'react'
import { isString } from '../common'
import { StyleSheet } from 'react-native'
import { scaleVu2dp, scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'

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
  'fta-tooltip': {},
  'fta-tooltip-popover': {
    position: 'absolute',
    width: scaleVu2dp(50, 'vw'),
    flexWrap: 'nowrap',
    zIndex: 1,
    bottom: '150%',
    left: scalePx2dp(-10.41667),
  },
  __viewportUnits: true,
  'fta-tooltip-popover__content': {
    borderRadius: scalePx2dp(8.33333),
    paddingTop: scalePx2dp(8.33333),
    paddingRight: scalePx2dp(12.5),
    paddingBottom: scalePx2dp(8.33333),
    paddingLeft: scalePx2dp(12.5),
    backgroundColor: '#ff5b00',
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'fta-tooltip-popover__content__text': {
    fontSize: scalePx2dp(16.66667),
    lineHeight: scalePx2dp(18.33333),
    color: '#fff',
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
  },
  'fta-tooltip-popover__icon': {
    position: 'absolute',
    zIndex: 1,
    top: '99%',
    left: scalePx2dp(12.5),
    width: scalePx2dp(14.58333),
    height: scalePx2dp(7.29167),
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
function Tooltip(props) {
  var children = props.children,
    className = props.className,
    customStyle = props.customStyle,
    style = props.style,
    content = props.content,
    isOpened = props.isOpened,
    icon = props.icon,
    iconClassName = props.iconClassName,
    iconStyle = props.iconStyle,
    contentClassName = props.contentClassName,
    contentStyle = props.contentStyle,
    popoverClassName = props.popoverClassName,
    popoverStyle = props.popoverStyle,
    textClassName = props.textClassName,
    textStyle = props.textStyle
  var rootClass = classNames('fta-tooltip', className)
  var iconClass = classNames('fta-tooltip-popover__icon', iconClassName)
  var popClass = classNames('fta-tooltip-popover', popoverClassName)
  var textClass = classNames('fta-tooltip-popover__content__text', textClassName)
  var contentClass = classNames('fta-tooltip-popover__content', contentClassName)
  return React.createElement(
    View,
    {
      style: _mergeEleStyles(
        _getStyle(rootClass),
        _objectSpread(_objectSpread({}, style), customStyle)
      ),
    },
    isOpened
      ? React.createElement(
          View,
          { style: _mergeEleStyles(_getStyle(popClass), popoverStyle), pointerEvents: 'box-none' },
          React.createElement(
            View,
            { style: _mergeEleStyles(_getStyle(contentClass), contentStyle) },
            isString(content)
              ? React.createElement(
                  Text,
                  { style: _mergeEleStyles(_getStyle(textClass), textStyle) },
                  content
                )
              : content
          ),
          React.createElement(Image, {
            style: _mergeEleStyles(_getStyle(iconClass), iconStyle),
            src: icon,
          })
        )
      : null,
    children
  )
}
var defaultProps = {
  isOpened: true,
  icon: 'https://imagecdn.ymm56.com/ymmfile/static/resource/006b5964-32f4-47ba-9c5f-6209360421ad.png',
}
Tooltip.defaultProps = defaultProps

export { Tooltip as default }
