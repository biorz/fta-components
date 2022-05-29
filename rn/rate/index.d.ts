import { FC } from 'react'
import BaseComponent from './base'

export interface RateProps extends BaseComponent {
  /**
   * 选择星星的数量
   * @default 1
   */
  value?: number
  /**
   * 星星总数量
   * @default 5
   */
  count?: number
  /**
   * 是否只读
   * @default false
   */
  readonly?: boolean
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 星星尺寸，默认 28px （设计稿720px）
   * @default 36
   */
  size?: number
  /**
   * 星星之间的距离
   * @default 16
   */
  gutter?: number
  /**
   * 最少选中星星的个数
   * @default 1
   */
  min?: number
  /**
   * 是否允许半星选择
   * @default false
   */
  half?: boolean
  /**
   * 选中的值变化的回调
   */
  onChange?: (count: number) => any
}

export interface StarProps extends Pick<RateProps, 'disabled' | 'half' | 'size' | 'gutter'> {
  /**
   * 星星的图片
   */
  src?: string
  /**
   * 当前星星是否激活
   */
  active?: 0 | 1 | 2
  /**
   * 是否是最后一个星星
   * @private
   * @default false
   */
  last?: boolean
  /**
   * 当前星星的索引
   * @private
   */
  index?: number
  /**
   * 点击星星的回调
   */
  onClick?: (left: boolean) => void
}

declare const Rate: FC<RateProps>

export default Rate
