import { ScrollView, Text, View } from '@tarojs/components'
import React, { useEffect, useRef, useState } from 'react'
import { inRN, px } from '../../common'
import '../../style/components/pull-to-refresh/index.scss'
import { PullToRefreshProps } from '../../types/pull-to-refresh'

const getPageY = inRN ? (e) => e.nativeEvent.pageY : (e) => e.changedTouches[0].pageY as number

function PullToRefresh(props: PullToRefreshProps) {
  const { children } = props
  const [height, setHeight] = useState(0)
  const [scrollTop, setScrollTop] = useState(0)
  const ref = useRef({ start: 0, preHeight: 0, height, setHeight }).current

  useEffect(() => {
    ref.height = height
    ref.setHeight = setHeight
  }, [height])

  const onTouchStart = (evt) => {
    ref.preHeight = height
    // alert('触摸')
    ref.start = evt.changedTouches[0].pageY
    evt.stopPropagation?.()
    // console.log(getPageY(evt))
  }

  const onTouchMove = (evt) => {
    // evt.stopPropagation?.()
    // evt.preventDefault?.()
    const pageY = getPageY(evt)
    const offset = (pageY - ref.start) / 3 + ref.preHeight
    setHeight(offset > 0 ? offset : 0)
    console.log(pageY)
  }
  return (
    <View catchMove className='fta-pull-to-refresh'>
      <View
        className='fta-pull-to-refresh-head'
        style={{ height: px(height), backgroundColor: '#000' }}>
        <Text>下拉加载</Text>
      </View>
      <View
        // onTouchStart={onTouchStart}
        // onTouchMove={onTouchMove}
        // onTouchEnd={() => {
        //   console.log('触摸结束')
        // }}
        className='fta-pull-to-refresh-content'>
        <ScrollView
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={() => {
            console.log('触摸结束')
          }}
          scrollY
          className='fta-pull-to-refresh-scrollview'
          // scrollTop={scrollTop}
          // onScroll={(evt) => setScrollTop(evt.detail.scrollTop)}
        >
          {children}
        </ScrollView>
      </View>
    </View>
  )
}

export default PullToRefresh
