import { ComponentClass, ReactNode } from 'react'
import BaseComponent from './base'

export interface CheckboxOption<T> {
  value: T
  label: ReactNode
  desc?: ReactNode
  disabled?: boolean
}

export type CheckboxType = 'between' | 'left' | 'row' | 'button'

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

  type?: CheckboxType
}

declare const Checkbox: ComponentClass<CheckboxProps<any>>

export default Checkbox
