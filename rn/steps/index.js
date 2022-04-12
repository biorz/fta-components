import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import React, { createContext, cloneElement } from 'react'
import { StyleSheet } from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'
import { getSystemInfoSync } from '@fta/taro-rn/dist/lib/getSystemInfoSync'
import '@fta/taro-rn'
import { getEnv } from '@fta/taro-rn/dist/lib/getEnv'
import '@fta/taro-rn/dist/lib/ENV_TYPE'

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

var classnames = { exports: {} }

;(function (module) {
  ;(function () {
    var hasOwn = {}.hasOwnProperty
    function classNames() {
      var classes = []
      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i]
        if (!arg) continue
        var argType = typeof arg
        if (argType === 'string' || argType === 'number') {
          classes.push(arg)
        } else if (Array.isArray(arg)) {
          if (arg.length) {
            var inner = classNames.apply(null, arg)
            if (inner) {
              classes.push(inner)
            }
          }
        } else if (argType === 'object') {
          if (arg.toString === Object.prototype.toString) {
            for (var key in arg) {
              if (hasOwn.call(arg, key) && arg[key]) {
                classes.push(key)
              }
            }
          } else {
            classes.push(arg.toString())
          }
        }
      }
      return classes.join(' ')
    }
    if (module.exports) {
      classNames.default = classNames
      module.exports = classNames
    } else {
      window.classNames = classNames
    }
  })()
})(classnames)
var classNames = classnames.exports

var defaultContext = { careMode: false, platform: 'ymm', debugger: true }
var Context = createContext(defaultContext)
Context.displayName = 'GlobalConfigContext'
Context.Consumer

StyleSheet.create({
  'fta-text': {},
  'fta-text--1': {
    fontSize: scalePx2dp(21),
    lineHeight: scalePx2dp(27.3),
  },
  'fta-text--1--care': {
    fontSize: scalePx2dp(27.5),
    lineHeight: scalePx2dp(35.5),
  },
  'fta-text--2': {
    fontSize: scalePx2dp(19),
    lineHeight: scalePx2dp(24.7),
  },
  'fta-text--2--care': {
    fontSize: scalePx2dp(24.5),
    lineHeight: scalePx2dp(32),
  },
  'fta-text--3': {
    fontSize: scalePx2dp(17.5),
    lineHeight: scalePx2dp(22.75),
  },
  'fta-text--3--care': {
    fontSize: scalePx2dp(23),
    lineHeight: scalePx2dp(29.5),
  },
  'fta-text--4': {
    fontSize: scalePx2dp(15.5),
    lineHeight: scalePx2dp(20.15),
  },
  'fta-text--4--care': {
    fontSize: scalePx2dp(20),
    lineHeight: scalePx2dp(26),
  },
  'fta-text--5': {
    fontSize: scalePx2dp(13.5),
    lineHeight: scalePx2dp(17.55),
  },
  'fta-text--5--care': {
    fontSize: scalePx2dp(17.5),
    lineHeight: scalePx2dp(23),
  },
  'fta-text--6': {
    fontSize: scalePx2dp(11.5),
    lineHeight: scalePx2dp(14.95),
  },
  'fta-text--6--care': {
    fontSize: scalePx2dp(15),
    lineHeight: scalePx2dp(19.5),
  },
})

StyleSheet.create({
  'fta-debugger': {
    position: 'absolute',
    bottom: scalePx2dp(50),
    right: scalePx2dp(20),
    width: scalePx2dp(40),
    height: scalePx2dp(40),
    backgroundColor: '#fff',
    borderRadius: scalePx2dp(150),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#fa871e',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  'fta-debugger__text': {
    color: '#fa871e',
  },
  'fta-debugger--care': {
    width: scalePx2dp(50),
    height: scalePx2dp(50),
  },
})

var systemInfo = getSystemInfoSync()
systemInfo.windowWidth / 750
var inIOS = systemInfo.platform === 'ios'
var inIPhone =
  systemInfo.system === 'iOS' ||
  systemInfo.brand === 'iPhone' ||
  systemInfo.model === 'iPhone' ||
  inIOS
inIPhone && (systemInfo.screenHeight >= 812 || systemInfo.screenWidth >= 812)
systemInfo.platform === 'android'

getEnv()

var isString = function isString(val) {
  return typeof val === 'string'
}
var isArray = Array.isArray

var indexScssStyleSheet = StyleSheet.create({
  'fta-steps': {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  'fta-step': {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  'fta-step-wrap': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  'fta-step-wrap--dot': {
    marginBottom: scalePx2dp(9.5),
  },
  'fta-step-wrap--ordered': {
    marginBottom: scalePx2dp(11.5),
  },
  'fta-step-wrap--custom': {
    marginBottom: scalePx2dp(6),
  },
  'fta-step-ball': {
    borderRadius: scalePx2dp(5000),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
  'fta-step-ball--dot': {
    width: scalePx2dp(8.5),
    height: scalePx2dp(8.5),
  },
  'fta-step-ball--ordered': {
    width: scalePx2dp(23),
    height: scalePx2dp(23),
    marginTop: 0,
    marginRight: scalePx2dp(6),
    marginBottom: 0,
    marginLeft: scalePx2dp(6),
  },
  'fta-step-ball--active': {
    backgroundColor: '#fa871e',
  },
  'fta-step-line': {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: scalePx2dp(2),
    backgroundColor: '#ccc',
  },
  'fta-step-line--active': {
    backgroundColor: '#fa871e',
  },
  'fta-step-line--inactive': {
    backgroundColor: '#ccc',
  },
  'fta-step-lineless': {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  'fta-step-title': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'fta-step-title__text': {
    color: '#ccc',
    fontSize: scalePx2dp(13.5),
    lineHeight: scalePx2dp(20.25),
  },
  'fta-step-title__text--active': {
    color: '#000',
  },
  'fta-step-desc': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'fta-step-desc__text': {
    color: '#ededed',
    fontSize: scalePx2dp(11.5),
    lineHeight: scalePx2dp(17.25),
  },
  'fta-step-desc__text--active': {
    color: '#ccc',
  },
  'fta-step-index': {
    color: '#fff',
    fontSize: scalePx2dp(13.5),
  },
  'fta-step-index--active': {
    color: '#999',
  },
})

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
var _styleSheet = indexScssStyleSheet
function Steps(props) {
  var children = props.children,
    items = props.items,
    current = props.current,
    type = props.type,
    _onChange = props.onChange,
    format = props.format
  return React.createElement(
    View,
    { style: _styleSheet['fta-steps'] },
    (children == null
      ? void 0
      : children.map == null
      ? void 0
      : children.map(function (child, index) {
          return cloneElement(child, {
            index: index,
            type: type,
            endpoint: index === children.length - 1,
            startpoint: !index,
            onChange: function onChange(i) {
              return i !== current && _onChange(i)
            },
            key: index,
            active: current >= index,
            current: current === index,
            mark: isArray(format) ? format[index] : format(index),
          })
        })) ||
      items.map(function (item, index) {
        return React.createElement(
          StepsItem,
          _extends(
            {
              onChange: function onChange(i) {
                return i !== current && _onChange(i)
              },
              key: index,
              index: index,
              active: current >= index,
              current: current === index,
              type: type,
              startpoint: !index,
              endpoint: index === items.length - 1,
              mark: isArray(format) ? format[index] : format(index),
            },
            item
          )
        )
      })
  )
}
Steps.defaultProps = {
  items: [],
  current: 0,
  type: 'dot',
  onChange: function onChange() {},
  format: function format(i) {
    return i + 1
  },
}
function StepsItem(props) {
  var title = props.title,
    desc = props.desc,
    startpoint = props.startpoint,
    endpoint = props.endpoint,
    active = props.active,
    type = props.type,
    current = props.current,
    index = props.index,
    mark = props.mark,
    onChange = props.onChange,
    render = props.render
  var rootClz = classNames('fta-step')
  var wrapClz = classNames('fta-step-wrap', 'fta-step-wrap--' + type)
  var ballClz = classNames(
    'fta-step-ball',
    type === 'dot' ? 'fta-step-ball--dot' : 'fta-step-ball--ordered',
    { 'fta-step-ball--active': active }
  )
  var leftLineClz = classNames('fta-step-line', { 'fta-step-line--active': active })
  var rightLineClz = classNames('fta-step-line', {
    'fta-step-line--active': active,
    'fta-step-line--inactive': current,
  })
  var titleClz = classNames('fta-step-title__text', { 'fta-step-title__text--active': active })
  var descClz = desc
    ? classNames('fta-step-desc__text', { 'fta-step-desc__text--active': active })
    : void 0
  return React.createElement(
    View,
    {
      onClick: function onClick() {
        return onChange == null ? void 0 : onChange(index)
      },
      style: _getStyle(rootClz),
    },
    React.createElement(
      View,
      { style: _getStyle(wrapClz) },
      startpoint
        ? React.createElement(View, { style: _styleSheet['fta-step-lineless'] })
        : React.createElement(View, { style: _getStyle(leftLineClz) }),
      type === 'custom' && render
        ? render
        : React.createElement(
            View,
            { style: _getStyle(ballClz) },
            type !== 'dot'
              ? React.createElement(Text, { style: _styleSheet['fta-step-index'] }, mark)
              : null
          ),
      endpoint
        ? React.createElement(View, { style: _styleSheet['fta-step-lineless'] })
        : React.createElement(View, { style: _getStyle(rightLineClz) })
    ),
    React.createElement(
      View,
      { style: _styleSheet['fta-step-title'] },
      isString(title) ? React.createElement(Text, { style: _getStyle(titleClz) }, title) : title
    ),
    desc
      ? React.createElement(
          View,
          { style: _styleSheet['fta-step-desc'] },
          isString(desc) ? React.createElement(Text, { style: _getStyle(descClz) }, desc) : desc
        )
      : null
  )
}
StepsItem.defaultProps = { type: 'dot' }

export { StepsItem, Steps as default }
