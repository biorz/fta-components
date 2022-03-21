import { View } from '@tarojs/components'
import React from 'react'
import { Props } from './types'

export default function (props: Props) {
  const { className, customStyle, children } = props
  return (
    <View className={className} style={customStyle}>
      {children}
    </View>
  )
}
