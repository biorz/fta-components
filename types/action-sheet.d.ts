import { CommonEvent } from '@tarojs/components/types/common'
import { ComponentClass, CSSProperties, ReactNode } from 'react'
import BaseComponent, { BaseTextComponent } from './base'

export interface CustomTitle {
  title: ReactNode
  onConfirm?: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
  icon?: ReactNode
  border?: boolean
}
export interface ActionSheetProps extends BaseComponent {
  /**
   * 是否展示元素
   * @default false
   */
  isOpened: boolean
  /**
   * 元素的标题
   */
  title?: ReactNode | CustomTitle
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
  /**
   * 是否阻止内容滑动穿透
   * @default true
   */
  catchMove?: boolean
  /**
   * 点击遮罩层关闭
   * @default false
   */
  clickOverlayOnClose?: boolean
  /**
   * 示例区域（安卓示例区域不可点击）
   */
  example?: ReactNode
  /**
   * 点击确定时的回调
   */
  onConfirm?: () => void
  /**
   * 点击取消/关闭时的回调
   */
  onCancel?: () => void
}

export interface ActionSheetState {
  _isOpened: boolean
}

export interface ActionSheetHeaderProps extends BaseComponent {
  children?: ReactNode | CustomTitle
}

export interface ActionSheetFooterProps extends BaseComponent, Partial<CustomTitle> {
  onClick?: Function
}

export interface ActionSheetBodyProps extends BaseComponent {}

export interface ActionSheetItemProps extends BaseComponent, BaseTextComponent {
  /**
   * 点击 Item 触发的事件
   */
  onClick?: (event?: CommonEvent) => void
  /**
   * 是否无边框线
   * @default false
   */
  noBorder?: boolean
  /**
   * 标题下方辅助文案
   */
  hint?: ReactNode
  /**
   * 文本是否左对齐
   * @default false
   */
  left?: boolean
}

declare const ActionSheetItem: ComponentClass<ActionSheetItemProps>

declare const Item: ComponentClass<ActionSheetItemProps>

declare const ActionSheet: ComponentClass<ActionSheetProps>

export default ActionSheet

export { ActionSheetItem, Item }
