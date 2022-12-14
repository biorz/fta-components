import { ComponentClass } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import BaseComponent from './base'
export interface RnSwitchProps {
  width?: number
  height?: number
  value?: boolean
  disabled?: boolean
  circleColorActive?: string
  circleColorInactive?: string
  backgroundActive?: string
  backgroundInactive?: string
  onAsyncPress?: (cb: (result: boolean) => void) => void
  onSyncPress?: (value: boolean) => void
  style?: StyleProp<ViewStyle>
  circleStyle?: StyleProp<ViewStyle>
  color?: any
}
export interface SwitchProps extends BaseComponent {
  /**
   * 标签名
   */
  title?: string
  /**
   * 背景颜色
   */
  color?: string
  /**
   * 是否显示开启
   * @default false
   */
  checked?: boolean
  /**
   * 是否禁止点击
   * @default false
   */
  disabled?: boolean
  /**
   * 是否显示下划线边框
   * @default false
   */
  border?: boolean
  /**
   * 输入框值改变时触发的事件
   */
  onChange?: (value: boolean) => void
  /**
   * rn 原生属性
   */
  rnProps?: RnSwitchProps
}

export interface SwitchState {
  checked: boolean
}

declare const Switch: ComponentClass<SwitchProps>

export default Switch
