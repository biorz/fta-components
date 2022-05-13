import { View } from '@tarojs/components'
import classNames from 'classnames'
import React from 'react'
import '../../../style/components/form/index.scss'
import { FullScreenProps } from './type'

export function FullScreen(props: FullScreenProps): JSX.Element {
  const { className, customStyle, children, onClick } = props

  const rootClass = classNames('fta-form-full-screen', className)
  return (
    <View className={rootClass} style={customStyle} onClick={onClick}>
      {children}
    </View>
  )
}
