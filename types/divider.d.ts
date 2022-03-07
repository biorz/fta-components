import { ComponentClass, CSSProperties } from 'react'

export type TextPosition = 'left' | 'center' | 'right'

export interface DividerProps {
  /**
   * 是否虚线，rn端支持不太理想，尤其是IOS「Unsupported dashed / dotted border style」
   * @default false
   */
  dashed?: boolean
  /**
   * 是否细线
   * @default true
   */
  hairline?: boolean
  /**
   * 是否以点替代文字，优先于text字段起作用
   * @default false
   */
  dot?: boolean

  /**
   * 文本内容
   */
  text?: string | number
  /**
   * 文本样式
   */
  textStyle?: CSSProperties
  /**
   * 文本类名
   */
  textClassName?: string
  /**
   * 内容文本的位置
   * @default 'center'
   */
  textPosition?: TextPosition
  /**
   * 线条颜色
   * @default '#dcdfe6'
   */
  lineColor?: string
}

declare const Divider: ComponentClass<DividerProps>

export default Divider
