import { ComponentClass, FC } from 'react'
import Component, { BaseComponent } from './base'

export interface LoadingProps extends Component {
  /**
   * 大小
   * @default 'normal'
   */
  size?: number
  /**
   * 类型
   */
  color?: string
}

declare const Loading: ComponentClass<LoadingProps>

export default Loading

export type CunstomLoadingEasing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'

export type CustomCubic = [number, number, number, number]

export interface CustomLoadingProps extends BaseComponent, LoadingProps {
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
   * 默认loading图片
   */
  src?: string
  /**
   * 动画曲线
   * @default 'linear'
   */
  easing?: CunstomLoadingEasing | CustomCubic
}

declare const CustomLoading: FC<CustomLoadingProps>

export { CustomLoading }
