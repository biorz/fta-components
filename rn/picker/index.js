import ScrollView from '@fta/components-rn/dist/components/ScrollView'
import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import React, { useState, memo, forwardRef, useRef, useEffect, useImperativeHandle } from 'react'
import { StyleSheet } from 'react-native'
import { scaleVu2dp } from '@fta/runtime-rn/dist/scale2dp'
import FloatLayout from '../action-sheet'

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

var indexScssStyleSheet = StyleSheet.create({
  'fta-picker': {
    paddingTop: 27,
    paddingRight: 0,
    paddingBottom: 27,
    paddingLeft: 0,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  'fta-picker-block': {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 150,
  },
  'fta-picker-item': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    overflow: 'hidden',
  },
  'fta-picker-item__text': {
    fontSize: 20,
    color: '#333',
  },
  'fta-picker-item--active': {
    opacity: 1,
  },
  'fta-picker-item--placeholder': {
    marginTop: 60,
    marginRight: 0,
    marginBottom: 60,
    marginLeft: 0,
    width: '100%',
  },
  'fta-picker-line': {
    top: 87,
    position: 'absolute',
    marginLeft: scaleVu2dp(4.45, 'vw'),
    width: scaleVu2dp(91, 'vw'),
    height: 30,
    borderTopWidth: 1,
    borderTopColor: '#e9e9e9',
    borderBottomWidth: 1,
    borderBottomColor: '#e9e9e9',
  },
  __viewportUnits: true,
  'fta-picker-opacity': {
    position: 'absolute',
    zIndex: 10,
    height: 62,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  'fta-picker-opacity--top': {
    top: 28,
  },
  'fta-picker-opacity--bottom': {
    bottom: 28,
  },
})

var ItemHeight = 30
var getAcitveIndex = function getAcitveIndex(scrollTop, maxLenth) {
  var index = Math.round(scrollTop / ItemHeight)
  return index >= maxLenth ? maxLenth - 1 : index
}
var getScrollTopOverIndex = function getScrollTopOverIndex(index) {
  return ItemHeight * index
}
var formatNum = function formatNum(num) {
  return num < 10 ? '0' + num : String(num)
}
var getCurrentDate = function getCurrentDate() {
  var date = new Date()
  return date.getFullYear() + '-' + formatNum(date.getMonth() + 1) + '-' + formatNum(date.getDate())
}
var getSelectorDepth = function getSelectorDepth(fields) {
  return fields === 'day' ? 3 : fields === 'month' ? 2 : 1
}
var parseDate = function parseDate(date) {
  return date.split('-').map(Number)
}
var genPeriodList = function genPeriodList(start, end) {
  return new Array(end - start + 1).fill(0).map(function (v, i) {
    return start + i
  })
}
var getDaysCount = function getDaysCount(year, month) {
  return new Date(year, month, 0).getDate()
}
var getAlignedIndex = function getAlignedIndex(scrollTop) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.08
  var indexOffset = scrollTop / ItemHeight
  var indexAligned = Math.round(indexOffset)
  var withinPrecision = Math.abs(indexOffset - indexAligned) <= precision
  if (withinPrecision) {
    return -1
  }
  return indexAligned * ItemHeight
}
var getCurrentTime = function getCurrentTime() {
  var date = new Date()
  var hours = date.getHours()
  var minutes = date.getMinutes()
  return formatNum(hours) + ':' + formatNum(minutes)
}
var parseTime = function parseTime(time) {
  return time.split(':').map(Number)
}
var useArray = function useArray(initialArray) {
  var _useState = useState(initialArray),
    _useState2 = _slicedToArray(_useState, 2),
    array = _useState2[0],
    _setArray = _useState2[1]
  var setArray = function setArray(value, index) {
    if (value === array[index]) return
    var copy = array.slice()
    copy[index] = value
    _setArray(copy)
  }
  return [array, setArray, _setArray]
}
var isChildrenNull = function isChildrenNull(children) {
  if (!children) return true
  if (
    Array.isArray(children) &&
    children.every(function (child) {
      return child == null
    })
  ) {
    return true
  }
  return false
}

var _excluded = [
  'isOpened',
  'children',
  'title',
  'methods',
  'cancelText',
  'confirmText',
  'onConfirm',
  'onCancel',
  'value',
]
function _mergeEleStyles() {
  return [].concat.apply([], arguments).reduce((pre, cur) => Object.assign(pre, cur), {})
}
var _styleSheet = indexScssStyleSheet
var builtInModes = ['selector', 'multiSelector', 'time', 'date', 'region']
function _ScrollArea(props) {
  var onScroll = props.onScroll,
    activeIndex = props.activeIndex,
    range = props.range,
    format = props.format,
    onChange = props.onChange,
    scrollWithAnimation = props.scrollWithAnimation
  var activeIndexRef = useRef(+activeIndex >= 0 ? +activeIndex : 0)
  var _useState = useState(getScrollTopOverIndex(activeIndex)),
    _useState2 = _slicedToArray(_useState, 2),
    scrollTop = _useState2[0],
    setScrollTop = _useState2[1]
  var timerRef = useRef()
  var scrollRef = useRef({ scrollTop: scrollTop, setScrollTop: setScrollTop }).current
  useEffect(
    function () {
      scrollRef.scrollTop = scrollTop
      scrollRef.setScrollTop = setScrollTop
    },
    [scrollTop, setScrollTop]
  )
  useEffect(
    function () {
      if (activeIndexRef.current !== activeIndex) {
        activeIndexRef.current = activeIndex
        setScrollTop(getScrollTopOverIndex(activeIndex))
      }
    },
    [activeIndex]
  )
  useEffect(
    function () {
      fixOffset()
    },
    [scrollTop]
  )
  var _onScroll = function _onScroll(e) {
    var scrollTop = e.detail.scrollTop
    var _activeIndex = getAcitveIndex(scrollTop, range.length)
    var _prevIndex = activeIndexRef.current
    var needChange = _prevIndex !== _activeIndex
    if (needChange) {
      activeIndexRef.current = _activeIndex
    }
    setScrollTop(scrollTop)
    needChange && (onChange == null ? void 0 : onChange(_activeIndex, _prevIndex))
    onScroll == null ? void 0 : onScroll(e.detail)
  }
  var _onScrollToLower = function _onScrollToLower(e) {
    var max = range.length - 1
    activeIndexRef.current = max
    max !== activeIndexRef.current &&
      (onChange == null ? void 0 : onChange(max, activeIndexRef.current))
    setScrollTop(getScrollTopOverIndex(max) + 0.001)
    onScroll == null ? void 0 : onScroll(e.detail)
  }
  var fixOffset = function fixOffset() {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(function () {
      var offset = getAlignedIndex(scrollRef.scrollTop)
      if (offset > -1) {
        scrollRef.setScrollTop(offset)
        timerRef.current = null
      }
    }, 300)
  }
  return React.createElement(
    ScrollView,
    {
      scrollY: true,
      lowerThreshold: 10,
      scrollTop: scrollTop,
      bounces: false,
      alwaysBounceVertical: false,
      scrollWithAnimation: scrollWithAnimation,
      showsVerticalScrollIndicator: false,
      onScroll: _onScroll,
      onScrollToLower: _onScrollToLower,
      style: _styleSheet['fta-picker-block'],
    },
    React.createElement(
      View,
      { style: _styleSheet['fta-picker-item--placeholder'] },
      range.map(function (v, i) {
        var _value = format(v)
        return React.createElement(
          View,
          {
            key: _value + '-' + i + '-' + range[0] + '-' + range.length,
            style: _styleSheet['fta-picker-item'],
          },
          React.createElement(
            Text,
            { numberOfLines: 1, style: _styleSheet['fta-picker-item__text'] },
            _value
          )
        )
      })
    )
  )
}
_ScrollArea.defaultProps = {
  scrollWithAnimation: true,
  activeIndex: 0,
  format: function format(v) {
    return v
  },
  onChange: function onChange() {},
}
var ScrollArea = memo(_ScrollArea)
var pickerMap = {
  selector: SelectorPicker,
  multiSelector: MultiSelectorPicker,
  time: TimePicker,
  date: DatePicker,
  region: RegionPicker,
}
function BasePicker(props) {
  var isOpened = props.isOpened,
    children = props.children,
    title = props.title,
    methods = props.methods,
    cancelText = props.cancelText,
    confirmText = props.confirmText,
    _onConfirm = props.onConfirm,
    _onCancel = props.onCancel,
    value = props.value,
    extrapProps = _objectWithoutProperties(props, _excluded)
  return React.createElement(
    FloatLayout,
    _extends(
      {
        isOpened: isOpened,
        title: {
          title: title,
          cancelText: cancelText,
          confirmText: confirmText,
          onConfirm: function onConfirm() {
            _onConfirm == null ? void 0 : _onConfirm(value)
            console.log('确认值', value)
            methods == null ? void 0 : methods.hide()
          },
          onCancel: function onCancel() {
            _onCancel == null ? void 0 : _onCancel(value)
            methods == null ? void 0 : methods.hide()
          },
        },
      },
      extrapProps
    ),
    React.createElement(
      View,
      { style: _styleSheet['fta-picker'] },
      children,
      isChildrenNull(children)
        ? null
        : React.createElement(
            React.Fragment,
            null,
            React.createElement(View, {
              pointerEvents: 'none',
              style: _mergeEleStyles(
                _styleSheet['fta-picker-opacity'],
                _styleSheet['fta-picker-opacity--top']
              ),
            }),
            React.createElement(View, {
              pointerEvents: 'none',
              style: _styleSheet['fta-picker-line'],
            }),
            React.createElement(View, {
              pointerEvents: 'none',
              style: _mergeEleStyles(
                _styleSheet['fta-picker-opacity'],
                _styleSheet['fta-picker-opacity--bottom']
              ),
            })
          )
    )
  )
}
BasePicker.defaultProps = { title: ' ', cancelText: '取消', confirmText: '确认' }
function _Picker(props, ref) {
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    visible = _useState4[0],
    toggle = _useState4[1]
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
  var mode = props.mode
  var _mode = builtInModes.includes(mode) ? mode : 'selector'
  var TypedPicker = pickerMap[_mode]
  return React.createElement(
    TypedPicker,
    _extends({}, props, { isOpened: visible, onClose: methods.hide, methods: methods })
  )
}
var Picker = forwardRef(_Picker)
var pickerDefaultProps = { mode: 'selector', range: [], onChange: function onChange() {} }
Picker.defaultProps = pickerDefaultProps
var createDefaultFormat = function createDefaultFormat(rangeKey) {
  return rangeKey
    ? function (value) {
        return value[rangeKey]
      }
    : void 0
}
function SelectorPicker(props) {
  var range = props.range,
    rangeKey = props.rangeKey,
    value = props.value,
    onChange = props.onChange,
    format = props.format
  var _format = format || createDefaultFormat(rangeKey)
  var ref = useRef(value || 0)
  var _onChange = function _onChange(newVal, oldVal) {
    onChange == null ? void 0 : onChange(newVal, oldVal)
    ref.current = newVal
  }
  return React.createElement(
    BasePicker,
    _extends({}, props, { value: ref.current }),
    React.createElement(ScrollArea, {
      format: _format,
      range: range,
      activeIndex: value,
      onChange: _onChange,
    })
  )
}
function MultiSelectorPicker(props) {
  var range = props.range,
    rangeKey = props.rangeKey,
    value = props.value,
    onChange = props.onChange,
    format = props.format
  var _useState5 = useState(
      value != null && value.length ? value : new Array(range.length).fill(0)
    ),
    _useState6 = _slicedToArray(_useState5, 2),
    _value = _useState6[0],
    setValue = _useState6[1]
  var ref = useRef(_value)
  var _onChange = function _onChange(newIndex, index) {
    var copy = _value.slice()
    copy[index] = newIndex
    onChange == null ? void 0 : onChange(copy, _value)
    setValue(copy)
    ref.current = copy
  }
  return React.createElement(
    BasePicker,
    _extends({}, props, { value: ref.current }),
    range.map(function (column, index) {
      var _format =
        Array.isArray(format) && format[index] ? format[index] : createDefaultFormat(rangeKey)
      return React.createElement(ScrollArea, {
        key: index,
        format: _format,
        range: column,
        activeIndex: _value[index],
        onChange: function onChange(newV) {
          return _onChange(newV, index)
        },
      })
    })
  )
}
var createTimeFormat = function createTimeFormat(format, index, defaultFormat) {
  return Array.isArray(format) && format[index] ? format[index] : defaultFormat
}
var months = genPeriodList(1, 12)
var days = genPeriodList(1, 31)
var dYearFormat = function dYearFormat(v) {
  return v === 9999 ? '长期' : v + '\u5E74'
}
var dMonthFormat = function dMonthFormat(v) {
  return v + '\u6708'
}
var dDayFormat = function dDayFormat(v) {
  return v + '\u65E5'
}
function DatePicker(props) {
  var start = props.start,
    end = props.end,
    value = props.value,
    onChange = props.onChange,
    longterm = props.longterm,
    format = props.format,
    fields = props.fields
  var depth = useRef(getSelectorDepth(fields)).current
  var _useRef$current = _slicedToArray(useRef(parseDate(start)).current, 3),
    y1 = _useRef$current[0],
    m1 = _useRef$current[1],
    d1 = _useRef$current[2]
  var _useRef$current2 = _slicedToArray(useRef(parseDate(end)).current, 3),
    y2 = _useRef$current2[0],
    m2 = _useRef$current2[1],
    d2 = _useRef$current2[2]
  var _useState7 = useState([0, 0, 0]),
    _useState8 = _slicedToArray(_useState7, 2),
    indexs = _useState8[0],
    _setIndexs = _useState8[1]
  var setIndexs = function setIndexs(value, depth) {
    var copy = indexs.slice()
    copy[depth] = value
    _setIndexs(copy)
    onChange == null ? void 0 : onChange(dateRef)
  }
  var nowDates = parseDate(value)
  var dateRef = useRef(nowDates).current
  var _dateRef = _slicedToArray(dateRef, 3),
    y = _dateRef[0],
    m = _dateRef[1],
    d = _dateRef[2]
  var years = useRef(genPeriodList(y1, y2).concat(longterm ? [9999] : [])).current
  var yTimerRef = useRef(null)
  var onYearChange = function onYearChange(i) {
    if (yTimerRef.current) {
      clearTimeout(yTimerRef.current)
      yTimerRef.current = null
    }
    yTimerRef.current = setTimeout(function () {
      dateRef[0] = years[i]
      setIndexs(years[i] === 9999 ? indexs[0] : i, 0)
    }, 150)
  }
  var MonthElement = null
  var DayElement = null
  var yIndex = years.indexOf(y)
  var YearElement = React.createElement(ScrollArea, {
    activeIndex: yIndex,
    range: years,
    format: createTimeFormat(format, 0, dYearFormat),
    onChange: onYearChange,
  })
  if (depth > 1) {
    var _months = months.slice()
    if (m2 !== 12 && dateRef[0] === y2) {
      _months.splice(m2, 12 - m2)
    }
    if (m1 !== 1 && dateRef[0] === y1) {
      _months.splice(0, m1 - 1)
    }
    var tmp
    var mActiveIndex =
      (tmp = _months.indexOf(m)) === -1
        ? m > _months[_months.length - 1]
          ? _months.length - 1
          : 0
        : tmp
    MonthElement = React.createElement(ScrollArea, {
      activeIndex: mActiveIndex,
      range: _months,
      format: createTimeFormat(format, 1, dMonthFormat),
      onChange: function onChange(i) {
        dateRef[1] = _months[i]
        setIndexs(i, 1)
      },
    })
    if (depth > 2) {
      var count = getDaysCount(y, m)
      var _days = days.slice(0, count)
      if (d2 !== count && dateRef[0] === y2 && dateRef[1] === m2) {
        _days.splice(d2, count - d2)
      }
      if (d1 !== 1 && dateRef[0] === y1 && dateRef[1] === m1) {
        _days.splice(0, d1 - 1)
      }
      var i
      var dActiveIndex =
        (i = _days.indexOf(d)) === -1 ? (d > _days[_days.length - 1] ? _days.length - 1 : 0) : i
      DayElement = React.createElement(ScrollArea, {
        activeIndex: dActiveIndex,
        range: _days,
        format: createTimeFormat(format, 2, dDayFormat),
        onChange: function onChange(i) {
          dateRef[2] = _days[i]
          setIndexs(i, 2)
        },
      })
    }
  }
  return React.createElement(
    BasePicker,
    _extends({}, props, { value: dateRef.map(formatNum).join('-') }),
    YearElement,
    MonthElement,
    DayElement
  )
}
DatePicker.defaultProps = {
  start: '1970-01-01',
  end: '2099-12-31',
  fields: 'day',
  value: getCurrentDate(),
  longterm: false,
}
var totalHours = genPeriodList(0, 23)
var totalMins = genPeriodList(0, 59)
function TimePicker(props) {
  var start = props.start,
    end = props.end,
    _props$value = props.value,
    value = _props$value === void 0 ? getCurrentTime() : _props$value
  var _useRef$current3 = _slicedToArray(useRef([parseTime(start), parseTime(end)]).current, 2),
    _useRef$current3$ = _slicedToArray(_useRef$current3[0], 2),
    h1 = _useRef$current3$[0],
    m1 = _useRef$current3$[1],
    _useRef$current3$2 = _slicedToArray(_useRef$current3[1], 2),
    h2 = _useRef$current3$2[0],
    m2 = _useRef$current3$2[1]
  var hours = useRef(totalHours.slice(h1, h2 + 1)).current
  var preRef = useRef(totalMins.length)
  var _useArray = useArray(parseTime(value)),
    _useArray2 = _slicedToArray(_useArray, 3),
    times = _useArray2[0],
    setTimes = _useArray2[1],
    replaceTimes = _useArray2[2]
  var _useArray3 = useArray([0, 0]),
    _useArray4 = _slicedToArray(_useArray3, 3),
    indexs = _useArray4[0],
    setIndexs = _useArray4[1],
    replaceIndexs = _useArray4[2]
  var _useState9 = useState(totalMins.slice()),
    _useState10 = _slicedToArray(_useState9, 2),
    mins = _useState10[0],
    setMins = _useState10[1]
  useEffect(
    function () {
      var _parseTime = parseTime(value),
        _parseTime2 = _slicedToArray(_parseTime, 2),
        h = _parseTime2[0],
        m = _parseTime2[1]
      var hIndex = 0
      var mIndex = 0
      if (h >= h1 && h <= h2) {
        hIndex = hours.indexOf(h)
        if (h1 === h2) {
          if (h === h1 && m >= m1 && m <= m2) {
            mIndex = m - m1
          }
        } else if (h > h1 && h < h2) {
          mIndex = m
        } else if (h === h1) {
          mIndex = m >= m1 ? m - m1 : 0
        } else if (h === h2) {
          mIndex = m <= m2 ? m : 0
        }
      }
      replaceIndexs([hIndex, mIndex])
      replaceTimes([hours[hIndex], mins[hIndex]])
    },
    [value]
  )
  useEffect(
    function () {
      var minsCopy = totalMins.slice()
      var activeHour = hours[indexs[0]]
      var shortened = false
      if (m2 !== 59 && hours[hours.length - 1] === activeHour) {
        minsCopy.splice(m2, 60 - m2)
        shortened = true
      }
      if (m1 !== 0 && hours[0] === activeHour) {
        minsCopy.splice(0, m1)
        shortened = true
      }
      if (shortened || preRef.current !== minsCopy.length || preRef.current !== 60) {
        preRef.current = minsCopy.length
        setMins(minsCopy)
        var mVal = mins[indexs[1]]
        var tmp
        if ((tmp = minsCopy.indexOf(mVal)) > -1) {
          setIndexs(tmp, 1)
        } else {
          setIndexs(0, 1)
        }
      }
    },
    [indexs[0]]
  )
  return React.createElement(
    BasePicker,
    _extends({}, props, { value: times.map(formatNum).join(':') }),
    React.createElement(ScrollArea, {
      activeIndex: indexs[0],
      range: hours,
      format: function format(v) {
        return formatNum(v) + '\u65F6'
      },
      onChange: function onChange(i) {
        setIndexs(i, 0)
        setTimes(hours[i], 0)
      },
    }),
    React.createElement(ScrollArea, {
      activeIndex: indexs[1],
      range: mins,
      format: function format(v) {
        return formatNum(v) + '\u5206'
      },
      onChange: function onChange(i) {
        setIndexs(i, 1)
        setTimes(mins[i], 1)
      },
    })
  )
}
TimePicker.defaultProps = { start: '00:00', end: '23:59' }
function RegionPicker() {
  return React.createElement(BasePicker, null)
}

export { BasePicker, ScrollArea, Picker as default }
