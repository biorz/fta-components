import { CSSProperties, FC } from 'react'

export type BadgeType = 'warning' | 'primary' | 'info' | 'success' | 'error'

export type NumberType = 'overflow' | 'ellipsis' | 'limit'

export type BadgeShape = 'circle' | 'horn' | 'square'

export interface BadgeProps {
  /**
   * 类名
   */
  className?: string
  /**
   * 内联样式
   */
  style?: CSSProperties
  /**
   * 文字类名
   */
  textClassName?: string
  /**
   * 文字内联样式
   */
  textStyle?: CSSProperties
  /**
   * 不展示数字，只有一个小点
   * @default false
   */
  isDot?: boolean
  /**
   * 展示的数字，大于 overflowCount 时显示为 ${overflowCount}+，为0且show-zero为false时隐藏
   */
  value?: string | number
  /**
   * 组件是否显示
   * @default true
   */
  show?: boolean
  /**
   * 最大值，超过最大值会显示 '{max}+'
   * @default 99
   */
  max?: number
  /**
   * 主题类型
   * @default 'error'
   */
  type?: BadgeType
  /**
   * 当数值为 0 时，是否展示 Badge
   * @default false
   */
  showZero?: boolean
  /**
   * 字体颜色
   * @default null
   */
  color?: CSSProperties['color']
  /**
   * 背景颜色，优先级比type高，如设置，type参数会失效
   * @default null
   */
  bgColor?: CSSProperties['color']
  /**
   * 显示方式
   */
  numberType?: NumberType
  /**
   * shape	徽标形状，circle-四角均为圆角，horn-左下角为直角
   * @default 'circle'
   */
  shape?: BadgeShape
  /**
   * 设置badge的位置偏移，格式为 [x, y]，也即设置的为top和right的值，absolute为true时有效
   */
  offset?: [number | string, number | string]

  /**
   * 组件是否绝对定位，为true时，offset参数才有效
   * @default false
   */
  absolute?: boolean
}

declare const Badge: FC<BadgeProps>

export default Badge
