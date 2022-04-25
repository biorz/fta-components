import {
  PickerDateProps as _PickerDateProps,
  PickerMultiSelectorProps as _PickerMultiSelectorProps,
  PickerSelectorProps as _PickerSelectorProps,
  PickerStandardProps,
  PickerTimeProps as _PickerTimeProps,
} from '@tarojs/components/types/Picker'
import { FC } from 'react'
import { ActionSheetProps } from './action-sheet'

export type Arrayable<T> = T | T[]
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

export type PickerProps = (
  | PickerSelectorProps
  | PickerMultiSelectorProps
  | PickerTimeProps
  | PickerDateProps
) &
  ActionSheetProps & {
    /**
     * 格式化文本
     */
    format?: Arrayable<(value: any) => string | number>
  }

declare const Picker: FC<PickerProps>

export default Picker
