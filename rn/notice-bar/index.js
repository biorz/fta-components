import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import Taro from '@fta/taro-rn'
import classNames from 'classnames'
import React, { useRef, useEffect, Component } from 'react'
import {
  inRN,
  inWeb,
  inWeapp,
  inAlipay,
  ConfigConsumer,
  useClassesWithCare,
  isString,
  isBoolean,
  Assets,
} from '../common'
import { StyleSheet, Animated, Easing } from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'
import Icon from '../icon'
import PropTypes from 'prop-types'

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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  Object.defineProperty(Constructor, 'prototype', { writable: false })
  return Constructor
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p
      return o
    }
  return _setPrototypeOf(o, p)
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function')
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  })
  Object.defineProperty(subClass, 'prototype', { writable: false })
  if (superClass) _setPrototypeOf(subClass, superClass)
}

function _typeof(obj) {
  '@babel/helpers - typeof'
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj
          }
        : function (obj) {
            return obj &&
              'function' == typeof Symbol &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? 'symbol'
              : typeof obj
          }),
    _typeof(obj)
  )
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
  }
  return self
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call
  } else if (call !== void 0) {
    throw new TypeError('Derived constructors may only return object or undefined')
  }
  return _assertThisInitialized(self)
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
      }
  return _getPrototypeOf(o)
}

var indexScssStyleSheet = StyleSheet.create({
  'fta-noticebar': {
    display: 'flex',
    paddingTop: scalePx2dp(9.12),
    paddingRight: scalePx2dp(13.92),
    paddingBottom: scalePx2dp(9.12),
    paddingLeft: scalePx2dp(13.92),
    backgroundColor: '#fff3e8',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  'fta-noticebar-icon': {
    marginRight: scalePx2dp(10.08),
  },
  'fta-noticebar__content': {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    color: '#ff5b00',
  },
  'fta-noticebar__content--marquee': {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  'fta-noticebar__content-text': {
    color: '#ff5b00',
    fontSize: scalePx2dp(15.84),
  },
  'fta-noticebar__content-inner--marquee': {
    paddingLeft: '100%',
  },
  'fta-noticebar__content-text--care': {
    fontSize: scalePx2dp(20.64),
  },
  'fta-noticebar__close': {
    width: scalePx2dp(15.84),
    height: scalePx2dp(15.84),
    marginLeft: scalePx2dp(10.08),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'fta-icon-close': {
    color: '#ff5b00',
    fontSize: scalePx2dp(15.84),
    width: scalePx2dp(15.84),
    height: scalePx2dp(15.84),
  },
  'fta-icon-close--care': {
    fontSize: scalePx2dp(20.64),
    width: scalePx2dp(20.64),
    height: scalePx2dp(20.64),
  },
  'fta-noticebar__close--care': {
    width: scalePx2dp(20.64),
    height: scalePx2dp(20.64),
  },
  'fta-noticebar--single': {},
  'fta-noticebar__content-inner': {},
  'fta-noticebar__text--marquee': {},
  'fta-noticebar__text--single': {},
})

var AnimatedView = function AnimatedView(_ref) {
  var children = _ref.children,
    className = _ref.className,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style,
    _ref$duration = _ref.duration,
    duration = _ref$duration === void 0 ? 6 : _ref$duration
  var animatedRef = useRef(new Animated.Value(0)).current
  var ref = useRef()
  var run = function run() {
    ref.current = Animated.loop(
      Animated.timing(animatedRef, {
        duration: duration * 1000,
        toValue: 1,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    )
    ref.current.start()
  }
  var trans = animatedRef.interpolate({ inputRange: [0, 1], outputRange: ['400%', '-400%'] })
  var composeStyle = [{ transform: [{ translateX: trans }] }, style, { paddingLeft: 0 }]
  useEffect(function () {
    run()
  }, [])
  return React.createElement(Animated.View, { className: className, style: composeStyle }, children)
}

var defaultProps = { close: false, single: false, marquee: false, icon: false, speed: 100 }
var propTypes = {
  close: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  single: PropTypes.bool,
  marquee: PropTypes.bool,
  speed: PropTypes.number,
  moreText: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  customStyle: PropTypes.object,
  onClose: PropTypes.func,
}

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
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct()
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor
      result = Reflect.construct(Super, arguments, NewTarget)
    } else {
      result = Super.apply(this, arguments)
    }
    return _possibleConstructorReturn(this, result)
  }
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false
  if (Reflect.construct.sham) return false
  if (typeof Proxy === 'function') return true
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}))
    return true
  } catch (e) {
    return false
  }
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
var NoticeBar = (function (_Component) {
  _inherits(NoticeBar, _Component)
  var _super = _createSuper(NoticeBar)
  function NoticeBar(props) {
    var _this
    _classCallCheck(this, NoticeBar)
    _this = _super.call(this, props)
    var animElemId = 'J_' + Math.ceil(Math.random() * 10e5).toString(36)
    _this.state = { show: true, animElemId: animElemId, animationData: { actions: [{}] }, dura: 15 }
    return _this
  }
  _createClass(NoticeBar, [
    {
      key: 'onClose',
      value: function onClose(event) {
        this.setState({ show: false })
        this.props.onClose && this.props.onClose(event)
      },
    },
    {
      key: 'UNSAFE_componentWillReceiveProps',
      value: function UNSAFE_componentWillReceiveProps() {
        if (!this.timeout) {
          this.interval && clearInterval(this.interval)
          this.initAnimation()
        }
      },
    },
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (!this.props.marquee) return
        this.initAnimation()
      },
    },
    {
      key: 'initAnimation',
      value: function initAnimation() {
        var _this2 = this
        if (inRN) return
        this.timeout = setTimeout(function () {
          _this2.timeout = null
          if (inWeb) {
            var _this2$props$speed = _this2.props.speed,
              speed = _this2$props$speed === void 0 ? 100 : _this2$props$speed
            var elem = document.querySelector('.' + _this2.state.animElemId)
            if (!elem) return
            var width = elem.getBoundingClientRect().width
            var dura = width / +speed
            _this2.setState({ dura: dura })
          } else if (inWeapp || inAlipay) {
            var query = Taro.createSelectorQuery()
            var queryCb = function queryCb(res) {
              var queryRes = res[0]
              if (!queryRes) return
              var width = queryRes.width
              var _this2$props$speed2 = _this2.props.speed,
                speed = _this2$props$speed2 === void 0 ? 100 : _this2$props$speed2
              var dura = width / +speed
              var animation = Taro.createAnimation({
                duration: dura * 1000,
                timingFunction: 'linear',
              })
              var resetAnimation = Taro.createAnimation({ duration: 0, timingFunction: 'linear' })
              var resetOpacityAnimation = Taro.createAnimation({
                duration: 0,
                timingFunction: 'linear',
              })
              var animBody = function animBody() {
                resetOpacityAnimation.opacity(0).step()
                _this2.setState({ animationData: resetOpacityAnimation.export() })
                setTimeout(function () {
                  resetAnimation.translateX(0).step()
                  _this2.setState({ animationData: resetAnimation.export() })
                }, 300)
                setTimeout(function () {
                  resetOpacityAnimation.opacity(1).step()
                  _this2.setState({ animationData: resetOpacityAnimation.export() })
                }, 600)
                setTimeout(function () {
                  animation.translateX(-width).step()
                  _this2.setState({ animationData: animation.export() })
                }, 900)
              }
              animBody()
              _this2.interval = setInterval(animBody, dura * 1000 + 1000)
            }
            query
              .select('.' + _this2.state.animElemId)
              .boundingClientRect(queryCb)
              .exec(queryCb)
          }
        }, 1000)
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this3 = this
        var _this$props = this.props,
          single = _this$props.single,
          icon = _this$props.icon,
          marquee = _this$props.marquee,
          customStyle = _this$props.customStyle,
          className = _this$props.className,
          textClassName = _this$props.textClassName,
          textStyle = _this$props.textStyle,
          children = _this$props.children
        var close = this.props.close
        var _this$state = this.state,
          dura = _this$state.dura,
          show = _this$state.show,
          animElemId = _this$state.animElemId,
          animationData = _this$state.animationData
        var rootClassName = 'fta-noticebar'
        var style = {}
        var innerClassName = [
          'fta-noticebar__content-inner',
          marquee && 'fta-noticebar__content-inner--marquee',
        ]
        if (marquee) {
          close = false
          style['animation-duration'] = dura + 's'
          innerClassName.push(animElemId)
        }
        var classObject = {
          'fta-noticebar--marquee': marquee,
          'fta-noticebar--weapp': marquee && (inAlipay || inWeapp),
        }
        var composeTextStyle = _objectSpread({}, textStyle)
        var AnimatedAdaptor = inRN && marquee ? AnimatedView : View
        return show
          ? React.createElement(ConfigConsumer, null, function (_ref) {
              var careMode = _ref.careMode
              var _useClassesWithCare$s = useClassesWithCare.single(
                  careMode,
                  'fta-noticebar__close',
                  'fta-icon-close',
                  'fta-noticebar__content-text'
                ),
                _useClassesWithCare$s2 = _slicedToArray(_useClassesWithCare$s, 3),
                closeViewClz = _useClassesWithCare$s2[0],
                closeClz = _useClassesWithCare$s2[1],
                textClz = _useClassesWithCare$s2[2]
              return React.createElement(
                View,
                {
                  style: _mergeEleStyles(
                    _getStyle(classNames(rootClassName, classObject, className)),
                    customStyle
                  ),
                },
                icon
                  ? React.createElement(View, { style: _styleSheet['fta-noticebar-icon'] }, icon)
                  : null,
                React.createElement(
                  View,
                  {
                    style: _getStyle(
                      classNames(
                        'fta-noticebar__content',
                        marquee && 'fta-noticebar__content--marquee'
                      )
                    ),
                  },
                  React.createElement(
                    AnimatedAdaptor,
                    {
                      id: animElemId,
                      animation: animationData,
                      style: _mergeEleStyles(
                        _getStyle(
                          classNames(innerClassName, !marquee && single && 'fta-noticebar--single')
                        ),
                        style
                      ),
                    },
                    isString(children)
                      ? React.createElement(
                          Text,
                          {
                            style: _mergeEleStyles(
                              _getStyle(
                                classNames(
                                  textClz,
                                  { 'fta-noticebar__text--single': single },
                                  { 'fta-noticebar__text--marquee': marquee },
                                  textClassName
                                )
                              ),
                              composeTextStyle
                            ),
                            numberOfLines: single || marquee ? 1 : 0,
                          },
                          children
                        )
                      : children
                  )
                ),
                close === false
                  ? null
                  : React.createElement(
                      View,
                      { onClick: _this3.onClose.bind(_this3), style: _getStyle(closeViewClz) },
                      isBoolean(close)
                        ? React.createElement(Icon, {
                            value: 'close',
                            src: Assets.close.default,
                            style: _getStyle(closeClz),
                          })
                        : close
                    )
              )
            })
          : null
      },
    },
  ])
  return NoticeBar
})(Component)
NoticeBar.defaultProps = defaultProps
NoticeBar.propTypes = propTypes

export { NoticeBar as default }
