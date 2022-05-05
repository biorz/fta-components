import { FC, ReactNode } from 'react'
import { FloatLayoutProps } from './picker'

export type Option = {
  label?: ReactNode
  value: string | number
  children?: Option[]
}
export interface CascaderProps<T = (string | number)[]> extends FloatLayoutProps {
  ref?: Ref<FormRefMethods>
  /**
   * 级联选项列表
   */
  options: Option[]
  /**
   * 默认选中的值
   */
  value?: T
  /**
   * 指定级联选择的深度
   */
  depth?: number
  /**
   * 选中的值变化之后的回调
   */
  onChange?(newVal: T): void
  /**
   * 点击确定按钮后的回调
   */
  onConfirm?(newVal: T): void
}

declare const Cascader: FC<CascaderProps>

export default Cascader
