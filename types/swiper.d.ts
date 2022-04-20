import { SwiperProps } from '@tarojs/components/types/Swiper'
import { SwiperItemProps } from '@tarojs/components/types/SwiperItem'
import { FC } from 'react'

declare const Swiper: FC<SwiperProps>

declare const SwiperItem: FC<SwiperItemProps>

export { SwiperItem, SwiperProps, SwiperItemProps }

export default Swiper
