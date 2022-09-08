import { Text, View } from '@tarojs/components'
import React from 'react'
import { useCareClass } from '../../common'
import '../../style/components/selector/index.scss'

/**
 * @component
 * 计数小红点
 */
export default function CountDot(props: { children: string | number; theme?: string }) {
  const rootClass = useCareClass.single('fta-selector-count')
  const textClass = useCareClass.single('fta-selector-count__text')
  return (
    <View className={rootClass} style={props.theme ? { backgroundColor: props.theme } : void 0}>
      <Text className={textClass}>{props.children}</Text>
    </View>
  )
}
