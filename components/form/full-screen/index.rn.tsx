import { View } from '@tarojs/components'
import classNames from 'classnames'
import React from 'react'
import { Modal } from 'react-native'
import { FullScreenProps } from './type'

export function FullScreen(props: FullScreenProps): JSX.Element {
  const {
    className,
    customStyle,
    // @ts-ignore
    style,
    children,
    onClick,
  } = props

  const rootClass = classNames('fta-form-full-screen', className)
  return (
    <Modal visible={true} transparent={true}>
      <View className={rootClass} style={{ ...style, ...customStyle }} onClick={onClick}>
        {children}
      </View>
    </Modal>
  )
}
