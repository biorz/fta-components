import React, { CSSProperties, ReactNode } from 'react'
import BaseComponent, { BaseTextComponent } from './base'

export type ToastPostion = 'top' | 'center' | 'bottom'

export interface ToastProps extends BaseComponent, BaseTextComponent {
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
   * 是否展示loading图标，可自定义
   * @default false
   */
  loading?: ReactNode
  /**
   * 文字前展示图标
   */
  icon?: ReactNode
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
   * 文本等级 1-6
   * @default 4
   */
  textLevel?: number
  /**
   * 点击蒙层时是否关闭
   * @default true
   */
  clickMaskOnClose?: boolean
  /**
   * 窗体类名
   */
  containerClassName?: boolean
  /**
   * 容器内联样式
   */
  customContainerStyle?: CSSProperties
  /**
   * 点击遮罩层的回调
   */
  onMaskClick?: () => void
  /**
   * 是否使用显示遮罩层
   * @default true
   * @supported rn
   */
  useNative?: boolean
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
