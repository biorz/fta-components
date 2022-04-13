import { ComponentClass, ReactNode } from 'react'
import BaseComponent from './base'

export interface CheckboxOption<T> {
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

export type CheckboxType = 'between' | 'left' | 'inline'

export interface CheckboxProps<T> extends BaseComponent {
  options: Array<CheckboxOption<T>>

  selectedList: Array<T>

  onChange: (selectedList: Array<T>) => void
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
  type?: CheckboxType
}

declare const Checkbox: ComponentClass<CheckboxProps<any>>

export default Checkbox
