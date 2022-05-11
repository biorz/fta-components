import Input from '@fta/components-rn/dist/components/Input'
import Label from '@fta/components-rn/dist/components/Label'
import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
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
  'fta-input': {
    position: 'relative',
    paddingTop: scalePx2dp(9.6),
    paddingRight: 0,
    paddingBottom: scalePx2dp(9.6),
    paddingLeft: scalePx2dp(15.36),
    color: '#333',
    backgroundColor: '#fff',
    marginBottom: scalePx2dp(0.48),
    borderBottomWidth: scalePx2dp(0.24),
    borderColor: '#e9e9e9',
  },
  'fta-input__container': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  'fta-input__title': {
    marginRight: scalePx2dp(7.68),
    width: scalePx2dp(82.56),
    fontSize: scalePx2dp(15.36),
    textAlign: 'left',
  },
  'fta-input__input': {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    display: 'flex',
    paddingRight: scalePx2dp(7.68),
    color: '#333',
    fontSize: scalePx2dp(15.36),
  },
  placeholder: {
    color: '#ccc',
  },
  input: {
    color: '#333',
    fontSize: scalePx2dp(15.36),
    height: scalePx2dp(21.504),
  },
  'fta-input__icon': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scalePx2dp(4.8),
    width: scalePx2dp(19.2),
    minWidth: scalePx2dp(19.2),
    height: '100%',
    fontSize: scalePx2dp(15.36),
    textAlign: 'center',
  },
  'fta-input__icon-close': {
    color: '#ccc',
  },
  'fta-input__icon-alert': {
    color: '#ff5b60',
  },
  'fta-input__children': {
    display: 'flex',
    flexDirection: 'row',
    borderLeftWidth: scalePx2dp(0.24),
    borderColor: '#e9e9e9',
  },
  view: {
    display: 'flex',
    paddingTop: 0,
    paddingRight: scalePx2dp(7.68),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(7.68),
    color: '#ff5b60',
    fontSize: scalePx2dp(15.36),
    textAlign: 'center',
  },
  div: {
    display: 'flex',
    paddingTop: 0,
    paddingRight: scalePx2dp(7.68),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(7.68),
    color: '#ff5b60',
    fontSize: scalePx2dp(15.36),
    textAlign: 'center',
  },
  span: {
    display: 'flex',
    paddingTop: 0,
    paddingRight: scalePx2dp(7.68),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(7.68),
    color: '#ff5b60',
    fontSize: scalePx2dp(15.36),
    textAlign: 'center',
  },
  text: {
    display: 'flex',
    paddingTop: 0,
    paddingRight: scalePx2dp(7.68),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(7.68),
    color: '#ff5b60',
    fontSize: scalePx2dp(15.36),
    textAlign: 'center',
  },
  image: {
    display: 'flex',
    paddingTop: 0,
    paddingRight: scalePx2dp(7.68),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(7.68),
    color: '#ff5b60',
    fontSize: scalePx2dp(15.36),
    textAlign: 'center',
    width: scalePx2dp(69.6),
    height: scalePx2dp(28.8),
  },
  'taro-img': {
    display: 'flex',
    paddingTop: 0,
    paddingRight: scalePx2dp(7.68),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(7.68),
    color: '#ff5b60',
    fontSize: scalePx2dp(15.36),
    textAlign: 'center',
    width: scalePx2dp(69.6),
    height: scalePx2dp(28.8),
  },
  img: {
    display: 'flex',
    width: scalePx2dp(69.6),
    height: scalePx2dp(28.8),
  },
  'fta-input--error': {
    color: '#ff5b60',
  },
  'fta-input--disabled': {
    opacity: 0.3,
  },
  'fta-input--without-border': {
    borderWidth: 0,
  },
})

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
function getInputProps(props) {
  var actualProps = {
    type: props.type,
    maxlength: props.maxlength,
    disabled: props.disabled,
    password: false,
  }
  switch (actualProps.type) {
    case 'phone':
      actualProps.type = 'number'
      actualProps.maxlength = 11
      break
    case 'password':
      actualProps.type = 'text'
      actualProps.password = true
      break
  }
  if (!props.disabled && !props.editable) {
    actualProps.disabled = true
  }
  return actualProps
}
var FTAInput = (function (_React$Component) {
  _inherits(FTAInput, _React$Component)
  var _super = _createSuper(FTAInput)
  function FTAInput() {
    var _this
    _classCallCheck(this, FTAInput)
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }
    _this = _super.call.apply(_super, [this].concat(args))
    _this.inputClearing = false
    _this.handleInput = function (event) {
      return _this.props.onChange(event.detail.value, event)
    }
    _this.handleFocus = function (event) {
      if (typeof _this.props.onFocus === 'function') {
        _this.props.onFocus(event.detail.value, event)
      }
    }
    _this.handleBlur = function (event) {
      if (typeof _this.props.onBlur === 'function') {
        _this.props.onBlur(event.detail.value, event)
      }
      if (event.type === 'blur' && !_this.inputClearing) {
        _this.props.onChange(event.detail.value, event)
      }
      _this.inputClearing = false
    }
    _this.handleConfirm = function (event) {
      if (typeof _this.props.onConfirm === 'function') {
        _this.props.onConfirm(event.detail.value, event)
      }
    }
    _this.handleClick = function (event) {
      if (!_this.props.editable && typeof _this.props.onClick === 'function') {
        _this.props.onClick(event)
      }
    }
    _this.handleClearValue = function (event) {
      _this.inputClearing = true
      _this.props.onChange('', event)
    }
    _this.handleKeyboardHeightChange = function (event) {
      if (typeof _this.props.onKeyboardHeightChange === 'function') {
        _this.props.onKeyboardHeightChange(event)
      }
    }
    _this.handleErrorClick = function (event) {
      if (typeof _this.props.onErrorClick === 'function') {
        _this.props.onErrorClick(event)
      }
    }
    return _this
  }
  _createClass(FTAInput, [
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          className = _this$props.className,
          customStyle = _this$props.customStyle,
          name = _this$props.name,
          cursorSpacing = _this$props.cursorSpacing,
          confirmType = _this$props.confirmType,
          cursor = _this$props.cursor,
          selectionStart = _this$props.selectionStart,
          selectionEnd = _this$props.selectionEnd,
          adjustPosition = _this$props.adjustPosition,
          border = _this$props.border,
          title = _this$props.title,
          error = _this$props.error,
          clear = _this$props.clear,
          placeholder = _this$props.placeholder,
          placeholderStyle = _this$props.placeholderStyle,
          placeholderClass = _this$props.placeholderClass,
          autoFocus = _this$props.autoFocus,
          focus = _this$props.focus,
          value = _this$props.value,
          required = _this$props.required
        var _getInputProps = getInputProps(this.props),
          type = _getInputProps.type,
          maxlength = _getInputProps.maxlength,
          disabled = _getInputProps.disabled,
          password = _getInputProps.password
        var rootCls = classNames('fta-input', { 'fta-input--without-border': !border }, className)
        var containerCls = classNames('fta-input__container', {
          'fta-input--error': error,
          'fta-input--disabled': disabled,
        })
        var overlayCls = classNames('fta-input__overlay', {
          'fta-input__overlay--hidden': !disabled,
        })
        var placeholderCls = classNames('placeholder', placeholderClass)
        var id = name && { id: name }
        return React.createElement(
          View,
          { style: _mergeEleStyles(_getStyle(rootCls), customStyle) },
          React.createElement(
            View,
            { style: _getStyle(containerCls) },
            React.createElement(View, { onClick: this.handleClick, style: _getStyle(overlayCls) }),
            title &&
              React.createElement(
                Label,
                {
                  for: name,
                  style: _getStyle(
                    'fta-input__title ' + (required && 'fta-input__title--required')
                  ),
                },
                title
              ),
            React.createElement(
              Input,
              _extends({}, id, {
                name: name,
                type: type,
                disabled: disabled,
                password: password,
                placeholderStyle: placeholderStyle,
                placeholderClass: placeholderCls,
                placeholder: placeholder,
                cursorSpacing: cursorSpacing,
                maxlength: maxlength,
                autoFocus: autoFocus,
                focus: focus,
                value: value,
                confirmType: confirmType,
                cursor: cursor,
                selectionStart: selectionStart,
                selectionEnd: selectionEnd,
                adjustPosition: adjustPosition,
                onInput: this.handleInput,
                onFocus: this.handleFocus,
                onBlur: this.handleBlur,
                onConfirm: this.handleConfirm,
                onKeyboardHeightChange: this.handleKeyboardHeightChange,
                style: _styleSheet['fta-input__input'],
              })
            ),
            clear &&
              value &&
              React.createElement(
                View,
                { onTouchEnd: this.handleClearValue, style: _styleSheet['fta-input__icon'] },
                React.createElement(Text, {
                  style: _mergeEleStyles(
                    _styleSheet['fta-icon'],
                    _styleSheet['fta-icon-close-circle'],
                    _styleSheet['fta-input__icon-close']
                  ),
                })
              ),
            error &&
              React.createElement(
                View,
                { onTouchStart: this.handleErrorClick, style: _styleSheet['fta-input__icon'] },
                React.createElement(Text, {
                  style: _mergeEleStyles(
                    _styleSheet['fta-icon'],
                    _styleSheet['fta-icon-alert-circle'],
                    _styleSheet['fta-input__icon-alert']
                  ),
                })
              ),
            React.createElement(
              View,
              { style: _styleSheet['fta-input__children'] },
              this.props.children
            )
          )
        )
      },
    },
  ])
  return FTAInput
})(React.Component)
FTAInput.defaultProps = {
  className: '',
  customStyle: {},
  value: '',
  name: '',
  placeholder: '',
  placeholderStyle: '',
  placeholderClass: '',
  title: '',
  cursorSpacing: 50,
  confirmType: 'done',
  cursor: 0,
  selectionStart: -1,
  selectionEnd: -1,
  adjustPosition: true,
  maxlength: 140,
  type: 'text',
  disabled: false,
  border: true,
  editable: true,
  error: false,
  clear: false,
  autoFocus: false,
  focus: false,
  required: false,
  onChange: function onChange() {},
}
FTAInput.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  customStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderStyle: PropTypes.string,
  placeholderClass: PropTypes.string,
  title: PropTypes.string,
  confirmType: PropTypes.string,
  cursor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectionStart: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectionEnd: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  adjustPosition: PropTypes.bool,
  cursorSpacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxlength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  border: PropTypes.bool,
  editable: PropTypes.bool,
  error: PropTypes.bool,
  clear: PropTypes.bool,
  autoFocus: PropTypes.bool,
  focus: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onConfirm: PropTypes.func,
  onErrorClick: PropTypes.func,
  onClick: PropTypes.func,
  required: PropTypes.bool,
}

export { FTAInput as default }
