import { CommonEvent } from '@tarojs/components/types/common'
import { ComponentClass, CSSProperties } from 'react'
import BaseComponent from './base'

export interface ActionSheetProps extends BaseComponent {
  /**
   * 是否展示元素
   * @default false
   */
  isOpened: boolean
  /**
   * 元素的标题
   */
  title?: string
  /**
   * 取消按钮的内容
   */
  cancelText?: string
  /**
   * 容器类名
   */
  containerClassName?: string
  /**
   * 容易内联样式
   */
  containerStyle?: CSSProperties
  /**
   * 元素被关闭触发的事件
   */
  onClose?: (event?: CommonEvent) => void
  /**
   * 点击了底部取消按钮触发的事件
   */
  onCancel?: (event?: CommonEvent) => void
  /**
   * RN端使用原生Modal组件
   * @default true
   */
  useNativeModal?: boolean
}

export interface ActionSheetState {
  _isOpened: boolean
}

export interface ActionSheetHeaderProps extends BaseComponent {}

export interface ActionSheetFooterProps extends BaseComponent {
  onClick?: Function
}

export interface ActionSheetBodyProps extends BaseComponent {}

export interface ActionSheetItemProps extends BaseComponent {
  /**
   * 点击 Item 触发的事件
   */
  onClick?: (event?: CommonEvent) => void
}

declare const ActionSheetItem: ComponentClass<ActionSheetItemProps>

declare const Item: ComponentClass<ActionSheetItemProps>

declare const ActionSheet: ComponentClass<ActionSheetProps>

export default ActionSheet

export { ActionSheetItem, Item }