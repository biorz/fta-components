import React, { FC } from 'react'
import { View } from '@tarojs/components'
import { IFloatLayoutProps } from './types'
import './index.scss'
/**
 * 自定义浮动弹层，解决滚动穿透
 * @param props
 * @returns
 */
const FloatLayout: FC<IFloatLayoutProps> = (props) => {
  const {
    visible,
    title,
    style,
    children,
    cancelText,
    confirmText,
    maskClosable,
    onConfirm,
    onCancel,
  } = props

  if (!visible) return null

  // 取消按钮
  const handleCancel = () => {
    if (!cancelText) return
    onCancel?.()
  }

  // 确认按钮
  const handleConfirm = () => {
    if (!confirmText) return
    onConfirm?.()
  }

  // 关闭遮罩层
  const handleCloseMasker = () => {
    if (!maskClosable) return
    onCancel?.()
  }

  // 渲染取消按钮
  const renderCancelText = () => {
    if (!cancelText) return null
    return (
      <View className='float_layout_cancel_text' onClick={handleCancel}>
        {cancelText}
      </View>
    )
  }

  // 渲染确认按钮
  const renderConfirmText = () => {
    if (!confirmText) return null
    return (
      <View className='float_layout_confirm_text' onClick={handleConfirm}>
        {confirmText}
      </View>
    )
  }

  return (
    <View className='float_layout_overlay' catchMove onClick={handleCloseMasker}>
      <View
        className='float_layout_body'
        style={{
          ...style,
        }}
        onClick={(e) => e.stopPropagation()}>
        <View className='float_layout_header'>
          {renderCancelText()}
          <View className='float_layout_header_title'>{title}</View>
          {renderConfirmText()}
        </View>
        {children}
      </View>
    </View>
  )
}

export const floatLayoutProps: IFloatLayoutProps = {
  visible: false,
  maskClosable: true,
  style: {},
  title: '请选择',
  confirmText: '确定',
  cancelText: '取消',
  onConfirm: () => {},
  onCancel: () => {},
}

FloatLayout.defaultProps = floatLayoutProps

export default FloatLayout
