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

export type PickerProps =
  | PickerMultiSelectorProps
  | PickerTimeProps
  | PickerDateProps
  | PickerRegionProps
  | PickerSelectorProps

declare const Picker: FC<PickerProps>

export default Picker
