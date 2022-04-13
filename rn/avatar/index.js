import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { inWeapp } from '../common'
import { StyleSheet } from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'
import Image from '../image'

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
  'fta-avatar': {
    borderRadius: scalePx2dp(6),
    backgroundColor: '#ccc',
    overflow: 'hidden',
  },
  'fta-avatar__text': {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },
  'fta-avatar__img': {
    width: '100%',
    height: '100%',
  },
  'fta-avatar--large': {
    width: scalePx2dp(92),
    height: scalePx2dp(92),
    borderRadius: scalePx2dp(7.5),
  },
  'fta-avatar--large__text': {
    fontSize: scalePx2dp(34.5),
    lineHeight: scalePx2dp(92),
  },
  'fta-avatar--medium': {
    width: scalePx2dp(69),
    height: scalePx2dp(69),
    borderRadius: scalePx2dp(6),
  },
  'fta-avatar--medium__text': {
    fontSize: scalePx2dp(30.5),
    lineHeight: scalePx2dp(69),
  },
  'fta-avatar--small': {
    width: scalePx2dp(54),
    height: scalePx2dp(54),
    borderRadius: scalePx2dp(5),
  },
  'fta-avatar--small__text': {
    fontSize: scalePx2dp(23),
    lineHeight: scalePx2dp(54),
  },
  'fta-avatar--mini': {
    width: scalePx2dp(46),
    height: scalePx2dp(46),
    borderRadius: scalePx2dp(4),
  },
  'fta-avatar--mini__text': {
    fontSize: scalePx2dp(19),
    lineHeight: scalePx2dp(46),
  },
  'fta-avatar--circle': {
    borderRadius: scalePx2dp(5000),
    overflow: 'hidden',
  },
})

var OpenData = function OpenData(props) {
  return React.createElement(Fragment, null)
}

var _excluded = [
  'size',
  'circle',
  'src',
  'text',
  'openData',
  'customStyle',
  'textClassName',
  'textStyle',
  'className',
]
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
function Avatar(props) {
  var _classObject
  var size = props.size,
    circle = props.circle,
    src = props.src,
    text = props.text,
    openData = props.openData,
    customStyle = props.customStyle,
    textClassName = props.textClassName,
    textStyle = props.textStyle,
    className = props.className,
    imageProps = _objectWithoutProperties(props, _excluded)
  var rootClassName = ['fta-avatar']
  var classObject =
    ((_classObject = {}),
    _defineProperty(_classObject, 'fta-avatar--' + size, true),
    _defineProperty(_classObject, 'fta-avatar--circle', circle),
    _classObject)
  var letter = ''
  if (text) letter = text
  var elem
  if (inWeapp && openData && openData.type === 'userAvatarUrl') {
    elem = React.createElement(OpenData, { type: openData.type })
  } else if (src) {
    return React.createElement(
      Image,
      _extends({ customStyle: customStyle, src: src }, imageProps, {
        style: _getStyle(classNames(rootClassName, classObject, className)),
      })
    )
  } else {
    var textClass = classNames('fta-avatar__text', 'fta-avatar--' + size + '__text', textClassName)
    elem = React.createElement(
      Text,
      { style: _mergeEleStyles(_getStyle(textClass), textStyle) },
      letter
    )
  }
  return React.createElement(
    View,
    {
      style: _mergeEleStyles(
        _getStyle(classNames(rootClassName, classObject, props.className)),
        customStyle
      ),
    },
    elem
  )
}
var defaultProps = {
  size: 'medium',
  circle: false,
  text: '',
  src: '',
  customStyle: {},
  className: '',
  showLoading: false,
  showError: false,
}
Avatar.defaultProps = defaultProps
var propTypes = {
  size: PropTypes.oneOf(['large', 'medium', 'small', 'mini']),
  circle: PropTypes.bool,
  text: PropTypes.string,
  src: PropTypes.string,
  openData: PropTypes.object,
  customStyle: PropTypes.object,
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
}
Avatar.propTypes = propTypes

export { Avatar as default }
