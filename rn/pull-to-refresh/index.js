import ScrollView from '@fta/components-rn/dist/components/ScrollView'
import Text from '@fta/components-rn/dist/components/Text'
import View from '@fta/components-rn/dist/components/View'
import React, { useState, useRef, useEffect } from 'react'
import { px, inRN } from '../common'
import { StyleSheet } from 'react-native'
import { scalePx2dp } from '@fta/runtime-rn/dist/scale2dp'

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
  'fta-pull-to-refresh': {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  'fta-pull-to-refresh-head': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  'fta-pull-to-refresh-content': {
    height: scalePx2dp(208.33333),
    overflow: 'hidden',
  },
  'fta-pull-to-refresh-scrollview': {
    height: '100%',
    backgroundColor: 'red',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
})

function _mergeEleStyles() {
  return [].concat.apply([], arguments).reduce((pre, cur) => Object.assign(pre, cur), {})
}
var _styleSheet = indexScssStyleSheet
var getPageY = function getPageY(e) {
  return e.changedTouches[0].pageY
}
var getCrossPageY = inRN
  ? function (e) {
      return e.nativeEvent.pageY
    }
  : getPageY
function PullToRefresh(props) {
  var children = props.children
  var _useState = useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    height = _useState2[0],
    setHeight = _useState2[1]
  var _useState3 = useState(true),
    _useState4 = _slicedToArray(_useState3, 2),
    reachTop = _useState4[0],
    setReachTop = _useState4[1]
  var _useState5 = useState(0),
    _useState6 = _slicedToArray(_useState5, 2),
    scrollTop = _useState6[0],
    setScrollTop = _useState6[1]
  var ref = useRef({ start: 0, preHeight: 0, height: height, setHeight: setHeight }).current
  useEffect(
    function () {
      ref.height = height
      ref.setHeight = setHeight
    },
    [height]
  )
  var onTouchStart = function onTouchStart(evt) {
    evt.preventDefault == null ? void 0 : evt.preventDefault()
    ref.preHeight = height
    console.log('ontouchstart evt')
    ref.start = getCrossPageY(evt)
  }
  var onTouchMove = function onTouchMove(evt) {
    console.log('onTouchMove evt')
    if (!reachTop) {
      ref.start = getCrossPageY(evt)
      return
    }
    var pageY = getCrossPageY(evt)
    var offset = pageY - ref.start + ref.preHeight
    if (offset > 0) {
      setHeight(offset)
    } else {
      setHeight(0)
    }
    console.log(pageY)
  }
  var onTouchEnd = function onTouchEnd() {
    console.log('触摸结束')
  }
  var onScroll = function onScroll(evt) {
    console.log('scrolltop', evt.detail.scrollTop)
    setScrollTop(evt.detail.scrollTop)
  }
  return React.createElement(
    View,
    { catchMove: true, style: _styleSheet['fta-pull-to-refresh'] },
    React.createElement(
      View,
      {
        style: _mergeEleStyles(_styleSheet['fta-pull-to-refresh-head'], {
          height: px(height),
          backgroundColor: '#999',
        }),
      },
      React.createElement(Text, null, '\u4E0B\u62C9\u52A0\u8F7D')
    ),
    React.createElement(
      View,
      { style: _styleSheet['fta-pull-to-refresh-content'] },
      React.createElement(
        ScrollView,
        {
          scrollY: true,
          upperThreshold: 2,
          bounces: false,
          scrollTop: scrollTop,
          onTouchStart: onTouchStart,
          onTouchMove: onTouchMove,
          onTouchEnd: onTouchEnd,
          onScrollToUpper: function onScrollToUpper(evt) {
            console.log('滚动到顶部', evt)
            setReachTop(true)
          },
          onScroll: onScroll,
          style: _styleSheet['fta-pull-to-refresh-scrollview'],
        },
        children
      )
    )
  )
}

export { PullToRefresh as default }
