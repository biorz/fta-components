import { FC } from 'react'
import BaseComponent from './base'

export type LineMargin =
  | string
  | number
  | {
      left?: string | number
      top?: string | number
      right?: string | number
      bottom?: string | number
    }

export interface LineProps extends BaseComponent {
  /**
   * 线条颜色
   * @default '#f8f8f8'
   */
  color?: string
  /**
   * 长度，设计稿720px
   * @default '100%'
   */
  length?: string | number
  /**
   * 是否纵向显示
   * @default 'false'
   */
  col?: boolean
  /**
   * 是否显示细边框
   * @default false
   */
  hairline?: boolean
  /**
   * 是否虚线
   * @default false
   */
  dashed?: boolean
  /**
   * 线条与上下左右元素的边距，设计稿720px
   */
  margin?: LineMargin
}

declare const Line: FC<LineProps>

export default Line
