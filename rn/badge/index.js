import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { useCareClass, useCarelessClass } from '../common'
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
  'fta-badge': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scalePx2dp(5208.33333),
    overflow: 'hidden',
    height: scalePx2dp(16.66667),
    paddingTop: 0,
    paddingRight: scalePx2dp(5.72917),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(5.72917),
    minWidth: scalePx2dp(16.66667),
  },
  'fta-badge-text': {
    zIndex: 1,
    color: '#fff',
    fontSize: scalePx2dp(12.5),
    lineHeight: scalePx2dp(16.66667),
  },
  'fta-badge-text--care': {
    fontSize: scalePx2dp(16.14583),
    lineHeight: scalePx2dp(21.875),
  },
  'fta-badge--error': {
    backgroundColor: '#ff5b60',
  },
  'fta-badge--warning': {
    backgroundColor: '#ff8843',
  },
  'fta-badge--success': {
    backgroundColor: '#28aa91',
  },
  'fta-badge--info': {
    backgroundColor: '#3ca0e6',
  },
  'fta-badge--primary': {
    backgroundColor: '#fa871e',
  },
  'fta-badge--dot': {
    borderRadius: scalePx2dp(5208.33333),
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    minWidth: 0,
    width: scalePx2dp(8.33333),
    height: scalePx2dp(8.33333),
  },
  'fta-badge--dot--care': {
    width: scalePx2dp(10.9375),
    height: scalePx2dp(10.9375),
  },
  'fta-badge--horn': {
    borderBottomLeftRadius: 0,
  },
  'fta-badge--square': {
    borderRadius: 0,
  },
  'fta-badge--absolute': {
    position: 'absolute',
  },
  'fta-badge--care': {
    height: scalePx2dp(21.875),
    minWidth: scalePx2dp(21.875),
    paddingTop: 0,
    paddingRight: scalePx2dp(7.29167),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(7.29167),
  },
  'fta-badge--rimless': {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
  },
  'fta-badge--coupon': {
    borderRadius: 0,
  },
  'fta-badge--sector': {
    width: scalePx2dp(41.66667),
    height: scalePx2dp(41.66667),
    borderRadius: 0,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  'fta-badge-coupon': {
    width: scalePx2dp(6.25),
    height: scalePx2dp(6.25),
    borderRadius: scalePx2dp(5208.33333),
    position: 'absolute',
    top: scalePx2dp(5.20833),
    backgroundColor: '#fff',
  },
  'fta-badge-coupon--care': {
    width: scalePx2dp(8.33333),
    height: scalePx2dp(8.33333),
    borderRadius: scalePx2dp(5208.33333),
    top: scalePx2dp(6.77083),
  },
  'coupon-left': {
    left: scalePx2dp(-3.125),
  },
  'coupon-left--care': {
    left: scalePx2dp(-4.16667),
  },
  'coupon-right': {
    right: scalePx2dp(-4.16667),
  },
  'coupon-right--care': {
    right: scalePx2dp(-4.16667),
  },
  'fta-badge--sector--care': {
    width: scalePx2dp(54.16667),
    height: scalePx2dp(54.16667),
  },
  'fta-badge--sector__text': {
    paddingTop: scalePx2dp(6.25),
  },
  'fta-badge--sector__text--care': {
    paddingTop: scalePx2dp(8.33333),
  },
  'fta-badge-sector': {
    position: 'absolute',
    zIndex: 0,
    width: scalePx2dp(83.33333),
    height: scalePx2dp(83.33333),
    borderRadius: scalePx2dp(5208.33333),
    bottom: 0,
    right: scalePx2dp(-41.66667),
  },
  'fta-badge-sector--care': {
    width: scalePx2dp(108.33333),
    height: scalePx2dp(108.33333),
    borderRadius: scalePx2dp(5208.33333),
    right: scalePx2dp(-54.16667),
  },
})

var _excluded = [
  'className',
  'textClassName',
  'textStyle',
  'value',
  'type',
  'numberType',
  'shape',
  'isDot',
  'show',
  'showZero',
  'absolute',
  'offset',
  'customStyle',
  'max',
  'color',
  'bgColor',
]
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
var shapes = ['circle', 'horn', 'square', 'sector', 'coupon']
var types = ['primary', 'info', 'success', 'warning', 'error']
var numberTypes = ['ellipsis', 'limit', 'overflow']
var hit = function hit(prop, propList, prefix) {
  return propList.includes(prop) ? '' + prefix + prop : null
}
var handleValue = function handleValue(value, max, numberType) {
  var val = value
  var num = +val
  if (!Number.isNaN(num) && num > max) {
    switch (numberType) {
      case 'overflow':
        val = max + '+'
        break
      case 'ellipsis':
        val = max + '...'
        break
      case 'limit':
        if (num >= 1000) {
          var base, suffix
          if (num < 10000) {
            base = 1000
            suffix = 'k'
          } else {
            base = 10000
            suffix = 'w'
          }
          var d = num / base
          if (/.\d{3,}/.test(d + '')) {
            d = d.toFixed(2)
          }
          val = d + suffix
        }
        break
    }
  }
  return val
}
function Badge(props) {
  var className = props.className,
    textClassName = props.textClassName,
    textStyle = props.textStyle,
    value = props.value,
    type = props.type,
    numberType = props.numberType,
    shape = props.shape,
    isDot = props.isDot,
    show = props.show,
    showZero = props.showZero,
    absolute = props.absolute,
    offset = props.offset,
    customStyle = props.customStyle,
    max = props.max,
    color = props.color,
    bgColor = props.bgColor,
    extraProps = _objectWithoutProperties(props, _excluded)
  if (!show || (value === 0 && !showZero && !isDot)) return React.createElement(Fragment, null)
  var careClz = useCareClass([
    'fta-badge',
    hit(shape, shapes, 'fta-badge--'),
    isDot && 'fta-badge--dot',
  ])
  var isSector = shape === 'sector'
  var realVal = handleValue(value, max, numberType)
  var isSingle = String(realVal).length === 1
  var typeClz = hit(type, types, 'fta-badge--')
  var rootClass = classNames(
    typeClz,
    careClz,
    absolute && 'fta-badge--absolute',
    isSingle && shape === 'circle' && 'fta-badge--rimless',
    className
  )
  var textClz = useCarelessClass(
    ['fta-badge-text', isSector && 'fta-badge--sector__text'],
    [textClassName]
  )
  var rootStyle =
    absolute && offset
      ? _objectSpread(_objectSpread({}, customStyle), {}, { top: offset[0], right: offset[1] })
      : _objectSpread({}, customStyle)
  if (bgColor) {
    rootStyle.backgroundColor = bgColor
  }
  var textStyles = _objectSpread({}, textStyle)
  if (color) textStyles.color = color
  return React.createElement(
    View,
    _extends({ style: _mergeEleStyles(_getStyle(rootClass), rootStyle) }, extraProps),
    isDot
      ? null
      : React.createElement(
          Text,
          { style: _mergeEleStyles(_getStyle(textClz), textStyles) },
          realVal
        ),
    shape === 'coupon'
      ? React.createElement(
          Fragment,
          null,
          React.createElement(View, {
            style: _getStyle(useCareClass(['fta-badge-coupon', 'coupon-left'])),
          }),
          React.createElement(View, {
            style: _getStyle(useCareClass(['fta-badge-coupon', 'coupon-right'])),
          })
        )
      : null,
    isSector
      ? React.createElement(View, {
          style: _getStyle(useCarelessClass(['fta-badge-sector'], [typeClz])),
        })
      : null
  )
}
var defaultProps = {
  isDot: false,
  show: true,
  type: 'error',
  shape: 'circle',
  showZero: false,
  max: 99,
  numberType: 'overflow',
  color: '',
  bgColor: '',
}
var propTypes = {
  type: PropTypes.oneOf(types),
  numberType: PropTypes.oneOf(numberTypes),
  shape: PropTypes.oneOf(shapes),
  offset: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ]),
}
Badge.defaultProps = defaultProps
Badge.propTypes = propTypes

export { Badge as default }
