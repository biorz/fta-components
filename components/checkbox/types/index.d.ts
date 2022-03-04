import AtComponent from '@fta/common/types/base'
import { ComponentClass } from 'react'

export interface CheckboxOption<T> {
  value: T
  label: string
  desc?: string
  disabled?: boolean
}

export interface CheckboxProps<T> extends AtComponent {
  options: Array<CheckboxOption<T>>

  selectedList: Array<T>

  onChange: (selectedList: Array<T>) => void
}

declare const Checkbox: ComponentClass<CheckboxProps<any>>

export default Checkbox
