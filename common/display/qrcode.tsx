import { useCareClass, useConfig } from '@fta/components/common'
import { Text, View } from '@tarojs/components'
// @ts-ignore
import ReactQRCode from 'qrcode.react'
import React from 'react'
import './qrcode.scss'

export default function QRCode(props: { qrcode: string; onClick(): void }) {
  const textClz = useCareClass(['fta-demo-qrcode__text'])
  const careMode = useConfig('careMode')
  return (
    <View className='fta-demo-qrcode' onClick={props.onClick}>
      <View className='fta-demo-qrcode-container'>
        <ReactQRCode
          size={careMode ? 88 * 1.5 : 88}
          className='fta-demo-qrcode-react'
          value={`ymm://rn.fta-view/index?initPath=${props.qrcode}`}
        />
        <Text className={textClz}>打开运满满App扫一扫</Text>
      </View>
      <Text></Text>
    </View>
  )
}
