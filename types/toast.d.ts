import React, { CSSProperties, ReactNode } from 'react'

export type ToastPostion = 'top' | 'center' | 'bottom'

export interface ToastProps {
  /**
   * 提示文本
   */
  title: ReactNode
  /**
   * 提示持续时间，设置为0则默认不关闭
   * @default 2
   */
  duration?: number
  /**
   * 是否需要蒙层，rn默认有蒙层，无法去除
   * @default true
   * @unsupported rn
   */
  mask?: boolean
  /**
   * 遮罩层是否透明
   * @default true
   */
  transparent?: boolean
  /**
   * 提示框位置
   * @default 'center'
   */
  position?: ToastPostion
  /**
   * 类名
   */
  className?: string
  /**
   * 内联样式
   */
  style?: CSSProperties
  /**
   * 文本类名
   */
  textClassName?: string
  /**
   * 文本内联样式
   */
  textStyle?: CSSProperties
  /**
   * 文本等级 1-6
   * @default 4
   */
  textLevel?: number
  /**
   * 点击蒙层时是否关闭
   * @default true
   */
  clickMaskOnClose?: boolean
}

export interface ToastRefMethods {
  show: (options?: Partial<ToastProps>) => void
  hide: () => void
}

declare const Toast: React.ForwardRefExoticComponent<
  ToastProps & React.RefAttributes<ToastRefMethods>
>

declare function useToast(
  defaultProps?: ToastProps
): readonly [React.MutableRefObject<ToastRefMethods>, JSX.Element]

export default Toast

export { useToast }
