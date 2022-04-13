import { FC } from 'react'
import BaseComponent from './base'

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

export interface AtAnimateViewProps extends BaseComponent {
  children: any
  config: AnimateItem[]
  play: boolean
  style?: any
  onClick?: Function
}

declare const AnimateView: FC<AtAnimateViewProps>

export default AnimateView
