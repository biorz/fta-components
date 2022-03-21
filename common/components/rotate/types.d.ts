import { ReactNode } from 'react'

export type RotateTiming = 'ease' | 'ease-in' | 'ease-out' | 'linear'

export interface RotateProps {
  /**
   * 旋转一周花费时间，单位ms
   * @default 15000
   */
  duration?: number
  /**
   * 是否无限循环
   * @default true
   */
  loop?: boolean
  /**
   * 缓动函数类型
   */
  timing?: RotateTiming
  /**
   * 动画结束
   */
  stop?: boolean

  children?: ReactNode
}
