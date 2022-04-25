import {
  PickerDateProps as _PickerDateProps,
  PickerMultiSelectorProps as _PickerMultiSelectorProps,
  PickerSelectorProps as _PickerSelectorProps,
  PickerStandardProps,
  PickerTimeProps as _PickerTimeProps,
} from '@tarojs/components/types/Picker'
import { FC, ReactNode, Ref } from 'react'
import { ActionSheetProps } from './action-sheet'

export type Arrayable<T> = T | T[]

/**
 * 重写部分属性
 */
export interface FloatLayoutProps extends Omit<ActionSheetProps, 'title'> {
  /**
   * 点击确定按钮的回调
   */
  onConfirm?(val: Arrayable<number> | string): void
  /**
   * 点击取消按钮的回调
   */
  onCancel?(val: Arrayable<number> | string): void
  /**
   * 确认文本
   */
  confirmText?: string
  /**
   * 取消文本
   */
  cancalText?: string
  /**
   * 标题
   */
  title?: ReactNode
  /**
   * @private
   */
  forwardRef?: Ref<any>
  /**
   * @private
   */
  methods?: {
    show(): void
    hide(): void
  }
  /**
   * @private
   * 内部维护开启关闭
   */
  isOpened?: boolean
}

interface PickerOnChange<T extends 'single' | 'multi' | 'mixin'> {
  onChange?: T extends 'single'
    ? (newVal: number, oldVal: number) => void
    : T extends 'multi'
    ? (newVal: number[], oldVal: number[]) => void
    : (newVal: Arrayable<number>, oldVal: Arrayable<number>) => void
}

export type PickerMode = keyof PickerStandardProps.Mode

interface PickerOnChange<T extends 'single' | 'multi' | 'mixin'> {
  onChange?: T extends 'single'
    ? (newVal: number, oldVal: number) => void
    : T extends 'multi'
    ? (newVal: number[], oldVal: number[]) => void
    : (newVal: Arrayable<number>, oldVal: Arrayable<number>) => void
}

export type PickerMode = keyof PickerStandardProps.Mode

interface PickerSelectorProps extends PickerOnChange<'single'>, _PickerSelectorProps {}

interface PickerMultiSelectorProps extends PickerOnChange<'multi'>, _PickerMultiSelectorProps {}

interface PickerDateProps extends PickerOnChange<'mixin'>, _PickerDateProps {}

interface PickerTimeProps extends PickerOnChange<'mixin'>, _PickerTimeProps {}

export {
  PickerDateProps,
  PickerMultiSelectorProps,
  PickerSelectorProps,
  PickerStandardProps,
  PickerTimeProps,
}

export type PickerRefMethods = {
  /**
   * 弹出选择器面板
   */
  show(): void
  /**
   * 隐藏选择器面板
   */
  hide(): void
}

export type PickerProps = (
  | PickerSelectorProps
  | PickerMultiSelectorProps
  | PickerTimeProps
  | PickerDateProps
) &
  FloatLayoutProps & {
    /**
     * 格式化文本
     * @param columnIndex 多列选择时生效
     */
    format?: (value: any, columnIndex: number) => string | number
  }

declare const Picker: FC<PickerProps>

export default Picker
