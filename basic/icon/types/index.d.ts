import Component from '@fta/common/types/base'
import { CommonEventFunction } from '@tarojs/components/types/common'
import { ComponentClass, CSSProperties } from 'react'

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
   * 自定义行内样式
   */
  customStyle?: CSSProperties
  /**
   * 自定义样式前缀
   * @default 'fta-icon'
   */
  prefixClass?: string
  /**
   * 图标大小
   * @default 24
   */
  size?: number
  /**
   * 是否根据屏幕宽度响应式缩放
   * @default true
   */
  scale?: boolean
  /**
   * 点击图标时的回调
   */
  onClick?: CommonEventFunction
}

declare const Icon: ComponentClass<IconProps>

export default Icon
