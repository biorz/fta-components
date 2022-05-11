import React, { forwardRef, useRef, useState, useImperativeHandle, useEffect } from 'react'
import { BasePicker, ScrollArea } from '../picker'

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

var _excluded = ['value', 'options', 'onChange', 'onConfirm', 'depth']
function parsevValueAndOptions(value, options, depth, index, collections) {
  var v = value[index]
  var i = 0
  if (
    v == null ||
    (i = options.findIndex(function (_) {
      return _.value === v
    })) === -1
  ) {
    v = options[0].value
    i = i === -1 ? 0 : i
  }
  value[index] = v
  collections.value.push(v)
  collections.indexs.push(i)
  collections.ranges.push(
    options.map(function (_ref) {
      var label = _ref.label,
        value = _ref.value
      return label == null ? value : label
    })
  )
  if (++index === depth) return collections
  return parsevValueAndOptions(value, options[i].children || [], depth, index, collections)
}
function getRangesAndValuesOverIndexs(indexs, options) {
  var tmpList = []
  var values = []
  var tmp = options
  var len = indexs.length
  indexs.forEach(function (v, i) {
    values.push(tmp[v].value)
    tmpList.push(
      tmp.map(function (_ref2) {
        var label = _ref2.label,
          value = _ref2.value
        return label == null ? value : label
      })
    )
    if (i + 1 < len) {
      var _tmp$v
      tmp = ((_tmp$v = tmp[v]) == null ? void 0 : _tmp$v.children) || []
    }
  })
  return { ranges: tmpList, values: values }
}
function getDepth(options) {
  var depth = 0
  var tmp = options[0]
  while (tmp) {
    var _tmp$children
    depth++
    tmp = (_tmp$children = tmp.children) == null ? void 0 : _tmp$children[0]
  }
  return depth
}
var Cascader = forwardRef(function Cascader(props, ref) {
  var value = props.value,
    options = props.options
  props.onChange
  props.onConfirm
  var depth = props.depth,
    extraProps = _objectWithoutProperties(props, _excluded)
  var _depth = useRef(depth || getDepth(options)).current
  var emptys = useRef(new Array(_depth).fill(0)).current
  var _useState = useState(emptys),
    _useState2 = _slicedToArray(_useState, 2),
    indexs = _useState2[0],
    setIndexs = _useState2[1]
  var _useState3 = useState(value),
    _useState4 = _slicedToArray(_useState3, 2),
    values = _useState4[0],
    setValues = _useState4[1]
  var _useState5 = useState(
      emptys.map(function () {
        return []
      })
    ),
    _useState6 = _slicedToArray(_useState5, 2),
    ranges = _useState6[0],
    setRanges = _useState6[1]
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    visible = _useState8[0],
    toggle = _useState8[1]
  var startRef = useRef(+new Date())
  var methods = {
    show: function show() {
      toggle(true)
    },
    hide: function hide() {
      toggle(false)
    },
  }
  useImperativeHandle(ref, function () {
    return methods
  })
  var _onChange = function _onChange(newIndex, index) {
    if (+new Date() - startRef.current < 1000) return
    var icopy = indexs.slice()
    if (index + 1 < _depth) {
      for (var i = index + 1; i < _depth; i++) {
        icopy[i] = 0
      }
    }
    icopy[index] = newIndex
    var _getRangesAndValuesOv = getRangesAndValuesOverIndexs(icopy, options),
      ranges = _getRangesAndValuesOv.ranges,
      values = _getRangesAndValuesOv.values
    setValues(values)
    setIndexs(icopy)
    setRanges(ranges)
  }
  useEffect(
    function () {
      var arrayValue = Array.isArray(value) ? value : []
      var collections = parsevValueAndOptions(arrayValue, options, _depth, 0, {
        indexs: [],
        value: [],
        ranges: [],
      })
      setValues(collections.values)
      setRanges(collections.ranges)
      setIndexs(collections.indexs)
      startRef.current = +new Date()
    },
    [value]
  )
  return React.createElement(
    BasePicker,
    _extends({}, extraProps, {
      methods: methods,
      isOpened: visible,
      onClose: methods.hide,
      value: values,
    }),
    emptys.map(function (_, i) {
      return React.createElement(ScrollArea, {
        activeIndex: indexs[i],
        range: ranges[i] || [],
        key: i,
        onChange: function onChange(newIndex) {
          return _onChange(newIndex, i)
        },
      })
    })
  )
})
var defaultProps = { options: [], value: [], depth: 0 }
Cascader.defaultProps = defaultProps

export { Cascader as default }
