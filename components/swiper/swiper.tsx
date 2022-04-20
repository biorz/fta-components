import { Swiper as TaroSwiper, SwiperItem as TaroSwiperItem } from '@tarojs/components'
import classNames from 'classnames'
import React from 'react'
import '../../style/components/swiper/index.scss'
import { SwiperItemProps, SwiperProps } from '../../types/swiper'

function Swiper(props: SwiperProps) {
  const { className, style, ...extraProps } = props
  const rootClz = classNames('fta-swiper', className)
  return <TaroSwiper className={rootClz} style={style} {...extraProps} />
}

function SwiperItem(props: SwiperItemProps) {
  const { className, style, ...extraProps } = props
  const rootClz = classNames('fta-swiper-item', className)
  return <TaroSwiperItem className={rootClz} style={style} {...extraProps} />
}

export { SwiperItem, Swiper as default }
