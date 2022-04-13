import { ComponentClass } from 'react'
import BaseComponent from './base'

export interface RadioOption<T> {
  /**
   * 选项标识符，必须保证唯一
   */
  value: T
  /**
   * 选项标题
   */
  label: ReactNode
  /**
   * 选项描述，显示在标题下方的文字
   */
  desc?: ReactNode
  /**
   * 是否禁止点击
   * @default false
   */
  disabled?: boolean
}

export type RadioType = 'left' | 'inline' | 'between'

export interface RadioProps<T> extends BaseComponent {
  /**
   * 输入框当前值，用户需要通过 onClick 事件来更新 value 值，必填
   */
  value: T
  /**
   * 选项列表
   */
  options: Array<RadioOption<T>>
  /**
   * 点击选项触发事件,开发者需要通过此事件来更新 value，onClick 函数必填
   */
  onClick: (vaule: T) => void

  /**
   * 自定义选中icon
   */
  selectedIcon?: ReactNode
  /**
   * 自定义未选中icon
   */
  icon?: ReactNode
  /**
   * 自定义禁用icon
   */
  disabledIcon?: ReactNode
  /**
   * 自定义禁用 & 选中 icon
   */
  selectedDidsabledIcon?: ReactNode
  /**
   * 展现类型
   * @default 'left'
   */
  type?: RadioType
}

declare const Radio: ComponentClass<RadioProps<any>>

export default Radio
