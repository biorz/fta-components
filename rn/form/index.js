import Image from '@fta/components-rn/dist/components/Image'
import ScrollView from '@fta/components-rn/dist/components/ScrollView'
import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import classNames from 'classnames'
import React, { createContext, forwardRef, useImperativeHandle, useState } from 'react'
import { isUndef, isString, Assets } from '../common'
import { StyleSheet } from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'
import { TouchableOpacity } from '../view'

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

var indexScssStyleSheet = StyleSheet.create({
  'fta-form': {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  'fta-form-container': {
    height: '100%',
  },
  'fta-form-title': {
    marginTop: scalePx2dp(17.28),
    marginRight: scalePx2dp(15.36),
    marginBottom: scalePx2dp(14.88),
    marginLeft: scalePx2dp(15.36),
  },
  'fta-form-title__text': {
    fontSize: scalePx2dp(15.36),
    fontWeight: '600',
    color: '#333',
  },
  'fta-form-tip': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scalePx2dp(13.44),
    marginRight: scalePx2dp(9.6),
    marginBottom: scalePx2dp(13.44),
    marginLeft: scalePx2dp(9.6),
  },
  'fta-form-tip-content': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  'fta-form-tip__image': {
    width: scalePx2dp(13.44),
    height: scalePx2dp(13.44),
    marginRight: scalePx2dp(5.76),
  },
  'fta-form-tip__text': {
    fontSize: scalePx2dp(13.44),
    color: '#666',
  },
  'fta-form-tip__button': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: scalePx2dp(67.2),
    height: scalePx2dp(24.96),
    borderRadius: scalePx2dp(3.84),
    backgroundColor: '#fa871e',
  },
  'fta-form-tip__button__text': {
    fontSize: scalePx2dp(13.44),
    color: '#fff',
  },
  'fta-form-item': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scalePx2dp(9.6),
    marginRight: scalePx2dp(15.36),
    marginBottom: 0,
    marginLeft: scalePx2dp(15.36),
  },
  'fta-form-item-label': {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  'fta-form-item-label__text': {
    fontSize: scalePx2dp(13.44),
    fontWeight: '400',
    color: '#333',
  },
  'fta-form-item-content': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    minHeight: scalePx2dp(42.24),
    width: scalePx2dp(202.56),
    paddingRight: scalePx2dp(15.36),
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: scalePx2dp(202.56),
    borderRadius: scalePx2dp(7.68),
    backgroundColor: '#f9f9f9',
  },
  'fta-form-item-content__text': {
    fontSize: scalePx2dp(15.36),
    fontWeight: '500',
    color: '#333',
  },
  'fta-form-item-content--hover': {
    opacity: 0.6,
  },
  'fta-form-item-content--error': {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#f33131',
  },
  'fta-form-item-arrow': {
    marginLeft: scalePx2dp(0.96),
    width: scalePx2dp(15.36),
    height: scalePx2dp(15.36),
  },
  'fta-form-item-error': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: scalePx2dp(9.6),
    paddingBottom: scalePx2dp(4.8),
  },
  'fta-form-item-error-icon': {
    width: scalePx2dp(15.36),
    height: scalePx2dp(15.36),
    marginRight: scalePx2dp(2.4),
  },
  'fta-form-item-error-wrap': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: scalePx2dp(217.92),
  },
  'fta-form-item-error__text': {
    color: '#f33131',
    fontSize: scalePx2dp(13.44),
    lineHeight: scalePx2dp(15.36),
  },
  'fta-form-item-placeholder': {
    fontSize: scalePx2dp(15.36),
    fontWeight: '400',
    color: '#ccc',
  },
  'fta-form-item-gap': {
    width: '100%',
    height: scalePx2dp(9.6),
    backgroundColor: '#f5f5f5',
  },
  'fta-form-item--readonly': {},
})

var context = createContext({ border: true, _showModal: false })
var FormProvider = context.Provider,
  FormConsumer = context.Consumer

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
var justifyContentMap = { left: 'flex-start', center: 'center', right: 'flex-end' }
function Form(props, ref) {
  var children = props.children,
    title = props.title,
    titleAlign = props.titleAlign,
    customStyle = props.customStyle,
    className = props.className,
    scrollWithAnimation = props.scrollWithAnimation
  props.readonly
  var align = props.align,
    style = props.style
  var rootClass = classNames('fta-form', className)
  useImperativeHandle(ref, function () {
    return {
      validate: function validate(callback) {
        return Promise.resolve()
      },
      validateField: function validateField(props, callback) {
        return Promise.resolve()
      },
      clearValidate: function clearValidate() {},
      resetFields: function resetFields() {},
      submit: function submit() {},
    }
  })
  return React.createElement(
    FormProvider,
    { value: { align: align } },
    React.createElement(
      ScrollView,
      {
        scrollY: true,
        scrollX: false,
        style: _mergeEleStyles(
          _getStyle(rootClass),
          _objectSpread(_objectSpread({}, style), customStyle)
        ),
        scrollWithAnimation: scrollWithAnimation,
      },
      React.createElement(Title, { align: titleAlign }, title),
      children
    )
  )
}
function FormItem(props, ref) {
  var label = props.label,
    tooltip = props.tooltip,
    renderTooltip = props.renderTooltip,
    prop = props.prop,
    children = props.children,
    placeholder = props.placeholder,
    arrow = props.arrow,
    error = props.error,
    errorTip = props.errorTip,
    align = props.align,
    onTooltipClick = props.onTooltipClick,
    onClick = props.onClick,
    labelClassName = props.labelClassName,
    labelStyle = props.labelStyle,
    contentClassName = props.contentClassName,
    contentStyle = props.contentStyle
  useImperativeHandle(ref, function () {
    return { resetField: function resetField() {}, clearValidate: function clearValidate() {} }
  })
  return React.createElement(FormConsumer, null, function (ctx) {
    var _align = align || ctx.align
    var _labelClassName = classNames('fta-form-item-label', ctx.labelClassName, labelClassName)
    var _contentClassName = classNames(
      'fta-form-item-content',
      ctx.contentClassName,
      contentClassName,
      error && 'fta-form-item-content--error'
    )
    var _labelStyle = _objectSpread(_objectSpread({}, ctx.labelStyle), labelStyle)
    var _contentStyle = _objectSpread(
      _objectSpread(
        _objectSpread({}, _align ? { justifyContent: justifyContentMap[_align] } : {}),
        ctx.contentStyle
      ),
      contentStyle
    )
    var rootClass = classNames('fta-form-item', {})
    var labelTextClass = classNames('fta-form-item-label__text')
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        View,
        { id: props ? 'form-' + prop : void 0, style: _getStyle(rootClass) },
        React.createElement(
          View,
          { style: _mergeEleStyles(_getStyle(_labelClassName), _labelStyle) },
          React.createElement(Text, { style: _getStyle(labelTextClass) }, label),
          tooltip
            ? React.createElement(ToolTip, {
                onTooltipClick: onTooltipClick,
                renderTooltip: renderTooltip,
                prop: prop,
              })
            : null
        ),
        React.createElement(
          View,
          {
            style: _mergeEleStyles(_getStyle(_contentClassName), _contentStyle),
            onClick: onClick,
            hoverStyle: { opacity: 0.6 },
            hoverClass: 'fta-form-item-content--hover',
          },
          isUndef(children)
            ? placeholder
              ? React.createElement(Placeholder, null, placeholder)
              : null
            : isString(children)
            ? !children.length && placeholder
              ? React.createElement(Placeholder, null, placeholder)
              : React.createElement(
                  Text,
                  { style: _styleSheet['fta-form-item-content__text'] },
                  children
                )
            : children,
          arrow ? React.createElement(Arrow, null) : null
        )
      ),
      error && errorTip
        ? React.createElement(
            View,
            { style: _styleSheet['fta-form-item-error'] },
            React.createElement(
              View,
              { style: _styleSheet['fta-form-item-error-wrap'] },
              React.createElement(ErrorIcon, null),
              ' ',
              React.createElement(
                Text,
                { style: _styleSheet['fta-form-item-error__text'] },
                errorTip
              )
            )
          )
        : null
    )
  })
}
function Title(props) {
  var title = props.children,
    titleAlign = props.align
  return title
    ? React.createElement(
        View,
        { style: _mergeEleStyles(_styleSheet['fta-form-title'], { textAlign: titleAlign }) },
        isString(title)
          ? React.createElement(
              Text,
              {
                style: _mergeEleStyles(_styleSheet['fta-form-title__text'], {
                  textAlign: titleAlign,
                }),
              },
              title
            )
          : title
      )
    : null
}
function ToolTip(props) {
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    visible = _useState2[0],
    toggle = _useState2[1]
  var tooltip = props.tooltip,
    onTooltipClick = props.onTooltipClick,
    prop = props.prop,
    renderTooltip = props.renderTooltip
  return React.createElement(
    View,
    {
      onClick: function onClick() {
        onTooltipClick(prop)
        toggle(!visible)
      },
      style: _styleSheet['fta-form-item-tooltip'],
    },
    isString(tooltip) ? React.createElement(Image, { src: tooltip }) : tooltip,
    visible ? renderTooltip : null
  )
}
function Placeholder(props) {
  var children = props.children
  return isString(children)
    ? React.createElement(Text, { style: _styleSheet['fta-form-item-placeholder'] }, children)
    : children
}
function Arrow() {
  return React.createElement(Image, {
    src: Assets.arrow.grey,
    style: _styleSheet['fta-form-item-arrow'],
  })
}
function ErrorIcon() {
  return React.createElement(Image, {
    src: Assets.icon.warning,
    style: _styleSheet['fta-form-item-error-icon'],
  })
}
function Gap() {
  return React.createElement(View, { style: _styleSheet['fta-form-item-gap'] })
}
function Tip(props) {
  var onClick = props.onClick,
    button = props.button,
    title = props.title,
    className = props.className,
    customStyle = props.customStyle,
    style = props.style
  var rootClass = classNames('fta-form-tip', className)
  var rootStyle = _objectSpread(_objectSpread({}, style), {}, { customStyle: customStyle })
  return React.createElement(
    View,
    { style: _mergeEleStyles(_getStyle(rootClass), rootStyle) },
    React.createElement(
      View,
      { style: _styleSheet['fta-form-tip-content'] },
      React.createElement(Image, {
        src: Assets.tip.info,
        style: _styleSheet['fta-form-tip__image'],
      }),
      isString(title)
        ? React.createElement(Text, { style: _styleSheet['fta-form-tip__text'] }, title)
        : title
    ),
    React.createElement(
      TouchableOpacity,
      { onClick: onClick, style: _styleSheet['fta-form-tip__button'] },
      React.createElement(Text, { style: _styleSheet['fta-form-tip__button__text'] }, button)
    )
  )
}
Tip.defaultProps = { button: '重新上传', title: '如需更新证件信息，请重新上传' }
var tooltipDefaultProps = {
  tooltip: '',
  onTooltipClick: function onTooltipClick() {},
  renderTooltip: null,
}
var formDefaultProps = { titleAlign: 'left' }
var formItemDefaultProps = {
  label: '',
  error: false,
  errorTip: '信息填写错误',
  onClick: function onClick() {},
}
ToolTip.defaultProps = tooltipDefaultProps
var ForwardForm = forwardRef(Form)
var FowardFormItem = forwardRef(FormItem)
ForwardForm.defaultProps = formDefaultProps
ForwardForm.Item = FormItem
ForwardForm.Gap = Gap
ForwardForm.Tip = Tip
FowardFormItem.defaultProps = formItemDefaultProps

export { FowardFormItem as FormItem, ForwardForm as default }
