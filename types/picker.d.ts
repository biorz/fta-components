import {
  Picker,
  PickerDateProps,
  PickerMultiSelectorProps,
  PickerRegionProps,
  PickerSelectorProps,
  PickerStandardProps,
  PickerTimeProps,
} from '@tarojs/components/types/Picker'
import { FC } from 'react'

export type PickerMode = keyof PickerStandardProps.Mode

export type PickerProps = (
  | PickerMultiSelectorProps
  | PickerTimeProps
  | PickerDateProps
  | PickerRegionProps
  | PickerSelectorProps
) & {
  /**
   * 每一个item项的绝对高度， 单位px
   * @default 40
   */
  itemHeight?: number
}

declare const Picker: FC<PickerProps>

export default Picker
