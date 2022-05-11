import Image from '@fta/components-rn/dist/components/Image'
import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import React from 'react'
import { Assets, isString } from '../common'
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
  'fta-upload': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    width: scalePx2dp(159.36),
    height: scalePx2dp(96.96),
    borderRadius: scalePx2dp(3.84),
  },
  'fta-upload-camera': {
    width: scalePx2dp(36),
    height: scalePx2dp(36),
    marginTop: scalePx2dp(22.56),
  },
  'fta-upload-placeholder': {
    marginTop: scalePx2dp(6.72),
    color: '#333',
    fontSize: scalePx2dp(11.52),
  },
  'fta-upload-image': {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  'fta-upload--empty': {
    backgroundColor: '#ecf5fd',
  },
  'fta-upload--error': {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'red',
  },
  'fta-upload-errortip': {
    marginTop: scalePx2dp(4.8),
    textAlign: 'center',
    fontSize: scalePx2dp(11.52),
    color: '#ff5b60',
    lineHeight: scalePx2dp(14.976),
  },
})

var _excluded = [
  'camera',
  'placeholder',
  'customStyle',
  'className',
  'error',
  'image',
  'src',
  'errorTip',
  'style',
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
function Upload(props) {
  var camera = props.camera,
    placeholder = props.placeholder,
    customStyle = props.customStyle,
    className = props.className,
    error = props.error,
    image = props.image,
    src = props.src,
    errorTip = props.errorTip,
    style = props.style,
    extraProps = _objectWithoutProperties(props, _excluded)
  var rootClz = classNames('fta-upload', className, {
    'fta-upload--error': error,
    'fta-upload--empty': !src && !image,
  })
  return React.createElement(
    View,
    null,
    React.createElement(
      View,
      _extends(
        {
          style: _mergeEleStyles(
            _getStyle(rootClz),
            _objectSpread(_objectSpread({}, style), customStyle)
          ),
        },
        extraProps
      ),
      src
        ? React.createElement(Image, {
            src: src,
            mode: 'aspectFill',
            style: _styleSheet['fta-upload-image'],
          })
        : React.createElement(
            React.Fragment,
            null,
            image
              ? React.createElement(Image, { src: image, style: _styleSheet['fta-upload-image'] })
              : null,
            React.createElement(Image, { src: camera, style: _styleSheet['fta-upload-camera'] }),
            isString(placeholder)
              ? React.createElement(
                  Text,
                  { style: _styleSheet['fta-upload-placeholder'] },
                  placeholder
                )
              : placeholder
          )
    ),
    error && errorTip
      ? isString(errorTip)
        ? React.createElement(Text, { style: _styleSheet['fta-upload-errortip'] }, errorTip)
        : errorTip
      : null
  )
}
var defaultProps = {
  camera: Assets.camera.default,
  placeholder: '上传图片',
  error: false,
  errorTip: '请重新上传',
}
Upload.defaultProps = defaultProps

export { Upload as default }
