import { View } from '@tarojs/components'
import React from 'react'
import '../../../style/components/action-sheet/example.scss'
import { Props } from './types'

export default function (props: Props) {
  const { className, customStyle, children, example } = props
  return (
    <View className={className} style={customStyle}>
      {example ? <View className='fta-action-sheet-example'>{example}</View> : null}
      {children}
    </View>
  )
}
