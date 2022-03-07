import { ComponentClass } from 'react'
import BaseComponent from './base'

export interface GapProps extends BaseComponent {
  /**
   * 背景颜色
   */
  bgColor?: string
  /**
   * 间隔槽高度，单位px
   */
  height?: number
  /**
   * 间隔槽宽度，单位px
   */
  width?: number
  /**
   * 与前一个元素的距离，单位px
   */
  top?: number
  /**
   * 与后一个元素的距离，单位px
   */
  bottom?: number
  /**
   * 与左边元素的距离，单位px
   */
  left?: number
  /**
   * 与右边元素的距离，单位px
   */
  right?: number

  [key: string]: any
}

declare const Gap: ComponentClass<GapProps>

export default Gap
