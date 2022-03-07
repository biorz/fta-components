import { ButtonProps } from '@tarojs/components/types/Button'
import { CommonEventFunction } from '@tarojs/components/types/common'
import { ComponentClass } from 'react'
import AtComponent from './base'

type TaroButtonProps = Pick<
  ButtonProps,
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

export interface ButtonProps extends AtComponent, TaroButtonProps {
  /**
   * 按钮的大小
   * @default 'normal'
   */
  size?: 'normal' | 'small'
  /**
   * 按钮的类型
   */
  type?: 'primary' | 'secondary'
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
   * 点击按钮时触发
   */
  onClick?: CommonEventFunction

  style?: Record<string, any>

  textStyle?: Record<string, any>

  textClassName?: string
}

export interface ButtonState {
  isWEB: boolean
  isWEAPP: boolean
  isALIPAY: boolean
}

declare const Button: ComponentClass<ButtonProps>

export default Button
