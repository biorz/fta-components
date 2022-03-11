import { NativeButtonProps } from '@tarojs/components/types/Button'
import { CommonEventFunction } from '@tarojs/components/types/common'
import { ComponentClass, CSSProperties } from 'react'
import BaseComponent, { BaseTextComponent } from './base'

type TaroButtonProps = Pick<
  NativeButtonProps,
  | 'formType'
  | 'openType'
  | 'lang'
  | 'sessionFrom'
  | 'sendMessageTitle'
  | 'sendMessagePath'
  | 'sendMessageImg'
  | 'showMessageCard'
  | 'appParameter'
  | 'onContact'
  | 'onGetUserInfo'
  | 'onGetPhoneNumber'
  | 'onOpenSetting'
  | 'onError'
>

export type ButtonSize = 'small' | 'medium' | 'large'
export type ButtonType = 'primary' | 'secondary' | 'tertiary'

export interface ButtonProps extends BaseComponent, BaseTextComponent, Partial<TaroButtonProps> {
  /**
   * 按钮的大小
   * @default 'medium'
   */
  size?: ButtonSize
  /**
   * 按钮的类型
   */
  type?: ButtonType
  /**
   * 设置按钮圆角
   * @default false
   */
  circle?: boolean
  /**
   * 是否通栏样式（即按钮宽度为屏幕宽度时的样式）
   * @default false
   */
  full?: boolean
  /**
   * 设置按钮的载入状态
   * @default false
   */
  loading?: boolean
  /**
   * 设置按钮为禁用态（不可点击）
   * @default false
   */
  disabled?: boolean
  /**
   * 按钮激活时的类名
   * @unsupported rn
   */
  hoverClass?: string
  /**
   * 按钮激活时的样式
   * @supported rn
   */
  hoverStyle?: CSSProperties
  /**
   * 按钮激活时的类名，全平台兼容n, h5和小程序
   *
   */
  hoverClassName?: string
  /**
   * 点击按钮时触发
   */
  onClick?: CommonEventFunction
}

declare const Button: ComponentClass<ButtonProps>

export default Button
