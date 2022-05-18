import { ScrollView, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import '../../style/components/infinite-scroll/index.scss'
import { InfiniteScrollProps } from '../../types/infinite-scroll'

function InfiniteScroll(props: InfiniteScrollProps): JSX.Element {
  const loadingRef = useRef(false)
  // const [loading, toggleLoading] = useState(false)
  const [hasLoad, setLoad] = useState(false)

  const {
    className,
    customStyle,
    // @ts-ignore
    style,
    children,
    hasMore,
    loadMore,
    loader,
    loaded,
    threshold,
  } = props
  const rootClass = classNames('fta-infinite-scroll', className)
  const rootStyle = { ...style, ...customStyle }

  const onLoad = async () => {
    if (loadingRef.current || !hasMore) return console.log('已经在加载中了啊')
    // toggleLoading(true)
    loadingRef.current = true
    try {
      await Promise.resolve(loadMore?.())
    } catch (error) {}
    setLoad(true)
    // toggleLoading(false)
    loadingRef.current = false
  }
  return (
    <ScrollView
      scrollY
      className={rootClass}
      style={rootStyle}
      lowerThreshold={threshold}
      onScrollToLower={onLoad}>
      {children}
      {!hasLoad || hasMore ? loader : loaded}
    </ScrollView>
  )
}

function Loader(props: { title: string }): JSX.Element {
  return (
    <View className='fta-infinite-scroll-loader'>
      <Text className='fta-infinite-scroll-loader__text'>{props.title}</Text>
    </View>
  )
}

const defaultProps: InfiniteScrollProps = {
  threshold: 50,
  loader: <Loader title='加载中...' />,
  loaded: <Loader title='没有更多数据了哦' />,
}

InfiniteScroll.defaultProps = defaultProps

export default InfiniteScroll
