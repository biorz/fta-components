import { FC } from 'react'
import BaseComponent from './base'

export type BaseEasing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'

export type CubicEasing = [number, number, number, number]

export type LoadingSize = 'small' | 'medium' | 'large'
export interface LoadingProps extends BaseComponent {
  /**
   * 周期动画时间，单位秒
   * @default 1
   */
  duration?: number
  /**
   * 是否静止状态
   * @default false
   */
  stop?: boolean
  /**
   * 圆形
   * @default false
   */
  circle?: boolean
  /**
   * 动画曲线
   * @default 'linear'
   */
  easing?: BaseEasing | CubicEasing
  /**
   * 是否使用图片素材
   * @default false
   */
  useImage?: boolean
  /**
   * loading大小
   * @default 'medium'
   */
  size?: LoadingSize
  /**
   * loading图片，在useImage为true时生效
   */
  src?: string
  /**
   * 颜色，当为图片类型时不可用
   */
  color?: string
  /**
   * 在安卓系统中实现该loading组件，需传入当前loading所在的背景色
   * @default '#fff'
   * @supported Android
   */
  tintColor?: string
}

declare const Loading: FC<LoadingProps>

export default Loading
