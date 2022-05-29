import { ScrollView, Text, View } from '@tarojs/components'
import React, { useEffect, useRef, useState } from 'react'
import { inRN, px } from '../../common'
import '../../style/components/pull-to-refresh/index.scss'
import { PullToRefreshProps } from '../../types/pull-to-refresh'

const getPageY = (e) => e.changedTouches[0].pageY as number

const getCrossPageY = inRN ? (e) => e.nativeEvent.pageY : getPageY

// inRN ? (e) => e.nativeEvent.pageY :

function PullToRefresh(props: PullToRefreshProps) {
  const { children } = props
  const [height, setHeight] = useState(0)
  const [reachTop, setReachTop] = useState(true)
  const [scrollTop, setScrollTop] = useState(0)
  const ref = useRef({ start: 0, preHeight: 0, height, setHeight }).current

  useEffect(() => {
    ref.height = height
    ref.setHeight = setHeight
  }, [height])

  const onTouchStart = (evt) => {
    // 阻止事件冒泡
    evt.preventDefault?.()
    ref.preHeight = height
    // alert('触摸')
    console.log('ontouchstart evt')
    ref.start = getCrossPageY(evt)
    // evt.stopPropagation?.()
    // console.log(getPageY(evt))
  }

  const onTouchMove = (evt) => {
    console.log('onTouchMove evt')
    // 阻止事件冒泡
    // evt.preventDefault?.()
    if (!reachTop) {
      ref.start = getCrossPageY(evt)
      return
    }
    const pageY = getCrossPageY(evt)
    const offset = pageY - ref.start + ref.preHeight
    if (offset > 0) {
      setHeight(offset)
    } else {
      // if (offset < 5) {
      //   setReachTop(false)
      // } else {
      //   setReachTop(true)
      // }
      setHeight(0)
      // setReachTop(false)
    }
    console.log(pageY)
  }

  const onTouchEnd = () => {
    console.log('触摸结束')
  }

  const onScroll = (evt) => {
    console.log('scrolltop', evt.detail.scrollTop)
    setScrollTop(evt.detail.scrollTop)
    if (reachTop) {
      // evt.prenventDefault?.()
      // setReachTop(false)
    }
  }
  return (
    <View catchMove className='fta-pull-to-refresh'>
      <View
        className='fta-pull-to-refresh-head'
        style={{ height: px(height), backgroundColor: '#999' }}>
        <Text>下拉加载</Text>
      </View>
      <View className='fta-pull-to-refresh-content'>
        <ScrollView
          scrollY
          upperThreshold={2}
          bounces={false}
          scrollTop={scrollTop}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onScrollToUpper={(evt) => {
            console.log('滚动到顶部', evt)
            setReachTop(true)
          }}
          onScroll={onScroll}
          className='fta-pull-to-refresh-scrollview'>
          {children}
        </ScrollView>
      </View>
    </View>
  )
}

export default PullToRefresh
