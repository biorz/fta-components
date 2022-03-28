import { View } from '@tarojs/components'
import React, { FC } from 'react'
import { Text } from '../../components/typography'
import { useConfig } from '../context'
import './debugger.scss'
/**
 * Debug面板，生产环境不显示
 */
export const Debugger: FC = () => {
  if (!['dev', 'development'].includes(process.env.NODE_ENV)) return null
  const { toggle, careMode } = useConfig()
  return (
    <View className='fta-debugger' onClick={() => toggle('careMode', !careMode)}>
      <Text style={{ color: '#999' }}>{careMode ? '关怀' : '标准'}</Text>
    </View>
  )
}
