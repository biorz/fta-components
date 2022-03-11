import { CommonEventFunction } from '@tarojs/components/types/common'
import { ComponentClass } from 'react'
import Component from './base'

export type IconSize = 'small' | 'medium' | 'large' | number
export interface IconProps extends Component {
  /**
   * icon名称
   */
  value: string
  /**
   * icon颜色
   */
  color?: string
  /**
   * 自定义样式前缀
   * @default 'fta-icon'
   */
  prefixClass?: string
  /**
   * 图标大小
   * @default 'medium' 48px (720设计稿)
   */
  size?: IconSize
  /**
   * 是否根据屏幕宽度响应式缩放
   * @default true
   */
  scale?: boolean
  /**
   * 非RN平台是否用图片资源进行占位
   * @default false
   */
  image?: boolean
  /**
   * rn平台默认使用图片，设置image: true, 则所有平台使用图片占位
   */
  src?: string
  /**
   * 点击图标时的回调
   */

  onClick?: CommonEventFunction
}

declare const Icon: ComponentClass<IconProps>

export default Icon
