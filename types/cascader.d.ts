import { FC } from 'react'

export interface CascaderProps<T extends (string | number)[]> {
  value?: T
  options: any[]
}

declare const Cascader: FC<CascaderProps>
