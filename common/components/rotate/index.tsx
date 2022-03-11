import { View } from '@tarojs/components'
import React from 'react'
import { RotateProps } from './types'

export default function Rotate(props: RotateProps) {
  const { loop, duration, timing, stop } = props
  return <View>{props.children}</View>
}
