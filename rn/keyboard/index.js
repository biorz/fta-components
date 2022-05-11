import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import React, { useState, useMemo, useEffect } from 'react'
import { isString, isNumber } from '../common'
import { StyleSheet } from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'
import ActionSheet from '../action-sheet'

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
  'fta-keyboard': {
    backgroundColor: '#ececec',
    paddingTop: 0,
    paddingRight: scalePx2dp(7.68),
    paddingBottom: scalePx2dp(7.68),
    paddingLeft: scalePx2dp(7.68),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  'fta-keyboard-input': {
    paddingTop: scalePx2dp(13.44),
    paddingRight: scalePx2dp(15.36),
    paddingBottom: scalePx2dp(13.44),
    paddingLeft: scalePx2dp(15.36),
  },
  'fta-keyboard-input__inner': {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: scalePx2dp(40.32),
    borderRadius: scalePx2dp(5.76),
    backgroundColor: '#f6f6f6',
    paddingTop: 0,
    paddingRight: scalePx2dp(15.36),
    paddingBottom: 0,
    paddingLeft: scalePx2dp(15.36),
    justifyContent: 'center',
    overflow: 'hidden',
  },
  'fta-keyboard-input__inner-text': {
    fontWeight: '500',
    color: '#333',
    fontSize: scalePx2dp(19.2),
  },
  'fta-keyboard-item': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scalePx2dp(7.68),
    width: scalePx2dp(105.6),
    height: scalePx2dp(40.32),
    backgroundColor: '#fff',
    borderRadius: scalePx2dp(3.84),
  },
  'fta-keyboard-item__text': {
    fontSize: scalePx2dp(21.12),
    color: '#333',
  },
  'fta-keyboard-item--hover': {
    backgroundColor: '#dddddd',
  },
  'fta-keyboard-delete': {
    width: scalePx2dp(29.28),
    height: scalePx2dp(17.28),
    overflow: 'hidden',
  },
  'fta-keyboard-delete-square': {
    position: 'absolute',
    height: '100%',
    width: scalePx2dp(20.64),
    top: 0,
    left: scalePx2dp(8.64),
    backgroundColor: '#666666',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'fta-keyboard-delete-triangle': {
    width: 0,
    height: 0,
    position: 'absolute',
    left: scalePx2dp(-8.16),
    top: 0,
    borderWidth: scalePx2dp(8.64),
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRightColor: '#666666',
  },
  'fta-keyboard-delete__text': {
    zIndex: 1,
    color: '#fff',
    fontSize: scalePx2dp(15.36),
    lineHeight: scalePx2dp(17.28),
  },
  'fta-keyboard-placeholder': {
    color: '#999',
    fontWeight: '400',
    fontSize: scalePx2dp(15.36),
  },
})

var _excluded = [
  'type',
  'showInputBox',
  'value',
  'controlled',
  'validator',
  'disorder',
  'placeholder',
  'maxlength',
  'onChange',
  'onConfirm',
  'customButtons',
  'children',
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
var _styleSheet = indexScssStyleSheet
function disorderList(list, flag) {
  if (!flag) return list
  var newer = []
  var copied = list.slice()
  var len = copied.length
  while (len) {
    newer.push(copied.splice(~~(Math.random() * len), 1)[0])
    len = copied.length
  }
  return newer
}
function validate(value, validator) {
  var typing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true
  if (!validator) return true
  if (validator instanceof RegExp) {
    return validator.test(value)
  }
  if (typeof validator === 'function') {
    return validator(value, typing)
  }
  return true
}
var typePresets = ['number', 'decimal', 'id']
var baseButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9]
var presets = { number: [null, 0], decimal: ['.', 0], id: ['X', 0] }
var Validators = {
  number: /^(([1-9]\d*)|(0))$/,
  decimal: function decimal(value, typing) {
    return (
      typing ? /^(([1-9]\d*)|((0|([1-9]\d*))(\.\d*)))$/ : /^(([1-9]\d*)|((0|([1-9]\d*))(\.\d+)))$/
    ).test(value)
  },
  id: function id(value, typing) {
    return (
      typing
        ? /(^\d{0,18}$)|(^\d{17}X?$)/i
        : /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
    ).test(value)
  },
  phone: function phone(value, typing) {
    return (
      typing
        ? /^1\d{0,10}$/
        : /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    ).test(value)
  },
}
var InputAdapter = Text
function Keyboard(props) {
  var type = props.type,
    showInputBox = props.showInputBox,
    value = props.value,
    controlled = props.controlled,
    validator = props.validator,
    disorder = props.disorder,
    placeholder = props.placeholder,
    maxlength = props.maxlength,
    onChange = props.onChange,
    _onConfirm = props.onConfirm,
    customButtons = props.customButtons,
    children = props.children,
    actionSheetProps = _objectWithoutProperties(props, _excluded)
  var _useState = useState(String(value)),
    _useState2 = _slicedToArray(_useState, 2),
    val = _useState2[0],
    _setVal = _useState2[1]
  var isBasicType = typePresets.includes(type)
  var setVal = function setVal(char, index) {
    var newVal = val + String(char)
    if (newVal.length > maxlength) return
    if (controlled) return onChange(newVal, val)
    var _validator = validator || (isBasicType ? Validators[type] : void 0)
    if (validate(newVal, _validator)) {
      _setVal(newVal)
      onChange(newVal, val)
    }
  }
  var buttons = useMemo(
    function () {
      var orderedButtons = isBasicType
        ? baseButtons.concat(presets[type])
        : type === 'custom'
        ? customButtons
        : []
      var _buttons = disorderList(orderedButtons, disorder)
      if (type === 'number') {
        var pidx = _buttons.indexOf(null)
        _buttons.splice(pidx, 1)
        return _buttons.slice(0, 9).concat(null).concat(_buttons.slice(9))
      }
      return _buttons
    },
    [disorder, type]
  )
  useEffect(
    function () {
      if (controlled) {
        _setVal(String(value))
      }
    },
    [value, controlled]
  )
  var renderDeleteButton = function renderDeleteButton() {
    return React.createElement(
      KeyboardButton,
      {
        onClick: function onClick() {
          var newVal = val.slice(0, -1)
          _setVal(newVal)
          onChange(newVal, val)
        },
      },
      React.createElement(DeleteButton, null)
    )
  }
  var inputTextClz = classNames(
    'fta-keyboard-input__inner-text',
    placeholder && val === '' && 'fta-keyboard-placeholder'
  )
  var fullCustom = type === 'custom' && !(customButtons != null && customButtons.length)
  return React.createElement(
    ActionSheet,
    _extends({}, actionSheetProps, {
      onConfirm: function onConfirm() {
        return _onConfirm(val, validate(val, validator, false))
      },
    }),
    React.createElement(
      React.Fragment,
      null,
      showInputBox
        ? React.createElement(
            View,
            { style: _styleSheet['fta-keyboard-input'] },
            React.createElement(
              View,
              { style: _styleSheet['fta-keyboard-input__inner'] },
              React.createElement(
                InputAdapter,
                { style: _getStyle(inputTextClz) },
                val === '' ? placeholder : val
              )
            )
          )
        : null,
      React.createElement(
        View,
        { style: _styleSheet['fta-keyboard'] },
        fullCustom
          ? children
          : buttons.map(function (v, i) {
              return v == null
                ? React.createElement(Placeholder, { key: i })
                : React.createElement(
                    KeyboardButton,
                    { _index: i, key: i, val: v, onClick: setVal },
                    v
                  )
            }),
        fullCustom ? null : renderDeleteButton()
      )
    )
  )
}
function KeyboardButton(props) {
  var _onClick = props.onClick,
    val = props.val,
    _index = props._index,
    hoverStyle = props.hoverStyle,
    children = props.children
  return React.createElement(
    View,
    {
      hoverStyle: hoverStyle,
      hoverClass: 'fta-keyboard-item--hover',
      onClick: function onClick() {
        return _onClick == null ? void 0 : _onClick(val, _index)
      },
      style: _styleSheet['fta-keyboard-item'],
    },
    isString(children) || isNumber(children)
      ? React.createElement(Text, { style: _styleSheet['fta-keyboard-item__text'] }, children)
      : children ||
          React.createElement(Text, { style: _styleSheet['fta-keyboard-item__text'] }, val)
  )
}
function Placeholder() {
  return React.createElement(View, { style: _styleSheet['fta-keyboard-item'] })
}
function DeleteButton() {
  return React.createElement(
    View,
    { style: _styleSheet['fta-keyboard-delete'] },
    React.createElement(View, { style: _styleSheet['fta-keyboard-delete-triangle'] }),
    React.createElement(
      View,
      { style: _styleSheet['fta-keyboard-delete-square'] },
      React.createElement(Text, { style: _styleSheet['fta-keyboard-delete__text'] }, '\xD7')
    )
  )
}
var defaultProps = {
  value: '',
  controlled: false,
  showInputBox: true,
  type: 'number',
  maxlength: 140,
  title: { title: '请输入', cancelText: '取消', confirmText: '确定' },
  isOpened: true,
  disorder: false,
  customButtons: [],
  onChange: function onChange() {},
  onConfirm: function onConfirm() {},
}
var defaultItemProps = { hoverStyle: { backgroundColor: '#dddddd' } }
KeyboardButton.defaultProps = defaultItemProps
Keyboard.defaultProps = defaultProps
Keyboard.DeleteButton = DeleteButton
Keyboard.Placeholder = Placeholder
Keyboard.validators = Validators
Keyboard.Button = KeyboardButton

export { Keyboard as default }
