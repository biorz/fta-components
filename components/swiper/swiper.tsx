/**
 * title: 'Swiper 滑动视图容器'
 * componentName: 'Swiper'
 * des: '滑块视图容器，常用于走马灯、轮播图'
 * previewUrl: 'components/form/checkbox'
 * materialType: 'component'
 * package: '@fta/components'
 */

import React from 'react'
import { SwiperProps } from '../../types/swiper'
import '../../style/components/swiper/index.scss'
import { View } from '@tarojs/components'

function Swiper(props: SwiperProps) {
  return <View className='fta-swiper'></View>
}

export default Swiper
