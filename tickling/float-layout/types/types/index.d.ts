import * as React from 'react'
export interface IFloatLayoutProps {
  visible: boolean
  children?: React.ReactNode
  maskClosable?: boolean
  title?: React.ReactNode | string
  style?: React.CSSProperties
  confirmText?: React.ReactNode | string
  cancelText?: React.ReactNode | string
  onConfirm?: (res?: any) => void
  onCancel?: (res?: any) => void
}
