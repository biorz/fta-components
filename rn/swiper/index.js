import TaroSwiper from '@fta/components-rn/dist/components/Swiper'
import TaroSwiperItem from '@fta/components-rn/dist/components/SwiperItem'
import classNames from 'classnames'
import React from 'react'
import { StyleSheet } from 'react-native'
import '@fta/runtime-rn/dist/scale2dp'

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

var indexScssStyleSheet = StyleSheet.create({})

var _excluded = ['className', 'style'],
  _excluded2 = ['className', 'style']
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
function Swiper(props) {
  var className = props.className,
    style = props.style,
    extraProps = _objectWithoutProperties(props, _excluded)
  var rootClz = classNames('fta-swiper', className)
  return React.createElement(
    TaroSwiper,
    _extends({ style: _mergeEleStyles(_getStyle(rootClz), style) }, extraProps)
  )
}
function SwiperItem(props) {
  var className = props.className,
    style = props.style,
    extraProps = _objectWithoutProperties(props, _excluded2)
  var rootClz = classNames('fta-swiper-item', className)
  return React.createElement(
    TaroSwiperItem,
    _extends({ style: _mergeEleStyles(_getStyle(rootClz), style) }, extraProps)
  )
}

export { SwiperItem, Swiper as default }
