import AtComponent from '@fta/common/types/base'
import { CommonEventFunction } from '@tarojs/components/types/common'
import { ComponentClass, CSSProperties } from 'react'

export interface ModalProps extends AtComponent {
  /**
   * 元素的标题
   */
  title?: string
  /**
   * 是否显示模态框
   * @default false
   */
  isOpened: boolean
  /**
   * 元素的内容
   */
  content?: string
  /**
   * 点击浮层的时候时候自动关闭
   * @default true
   */
  closeOnClickOverlay?: boolean
  /**
   * 取消按钮的文本
   */
  cancelText?: string
  /**
   * 确认按钮的文本
   */
  confirmText?: string
  /**
   * 模态框类名
   */
  containerClassName?: string
  /**
   * 模态框内联样式
   */
  containerStyle?: CSSProperties
  /**
   * 蒙层类名
   */
  overlayClassName?: string
  /**
   * 蒙层内联样式
   */
  overlayStyle?: CSSProperties
  /**
   * 触发关闭时的事件
   */
  onClose?: CommonEventFunction
  /**
   * 点击取消按钮触发的事件
   */
  onCancel?: CommonEventFunction
  /**
   * 点击确认按钮触发的事件
   */
  onConfirm?: CommonEventFunction
}

export interface ModalState {
  _isOpened: boolean
  isWEB: boolean
}

export interface ModalActionProps extends AtComponent {
  isSimple?: boolean
}

export interface ModalContentProps extends AtComponent {}

export interface ModalHeaderProps extends AtComponent {}

declare const Modal: ComponentClass<ModalProps>

declare const ModalHeader: ComponentClass<ModalHeaderProps>

declare const ModalContent: ComponentClass<ModalContentProps>

declare const ModalAction: ComponentClass<ModalActionProps>

export { Modal, ModalHeader, ModalContent, ModalAction }

export default Modal
