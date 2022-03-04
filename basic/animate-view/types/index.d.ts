import AtComponent from '@fta/common/types/base'
import { ComponentClass } from 'react'
import { AnimateEasing } from '../src/props'

export type AnimateEasing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'

export enum AnimateType {
  'opacity' = 'opacity',
  'transform:scale' = 'transform:scale',
  'transform:translateY' = 'transform:translateY',
}

export interface AnimateItem {
  type: AnimateType | string
  start: number | string
  end: number | string
  easing?: AnimateEasing
  duration?: number
  delay?: number
  useNativeDriver?: boolean
}

export interface AtAnimateViewProps extends AtComponent {
  children: any
  config: AnimateItem[]
  play: boolean
  style?: any
  onClick?: Function
}

declare const AnimateView: ComponentClass<AtAnimateViewProps>

export default AnimateView
