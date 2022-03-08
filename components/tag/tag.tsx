import { Image, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import '../../style/components/tag/index.scss'

interface IProps {
  text: string
  shape?: string
  size?: string
  clickTag?: Function
  clickIcon?: Function
  closeable?: string
  color?: string
  bgColor?: string
  mode?: 'dark' | 'plain' | 'light'
  borderColor?: string
  type?: 'success' | 'info' | 'warning' | 'error' | 'primary'
}
interface Istate {
  isRN: boolean
}
export default class Tag extends Component<IProps, Istate> {
  state = {
    isRN: Taro.getEnv() === Taro.ENV_TYPE.RN,
  }
  render() {
    const {
      mode = 'light',
      type = 'primary',
      text,
      shape = 'square',
      size = 'medium',
      clickTag = () => {},
      clickIcon = () => {},
      closeable = false,
    } = this.props
    const { isRN } = this.state
    return (
      <View className={`fta-tag  fta-shape-${shape} fta-size-${size} fta-mode-${mode}-${type}`}>
        <Text
          onClick={(e) => clickTag(e)}
          className={`fta-size-${size}__word fta-mode-${mode}-${type}__word`}>
          {text}
        </Text>
        {closeable && !isRN ? (
          <Text className='fta-icon fta-icon-close' onClick={() => clickIcon()}></Text>
        ) : null}
        {closeable && isRN ? (
          <Image
            className='fta-tag__icon'
            src='https://image.ymm56.com/ymmfile/operation-biz/f45222e4-4884-43ef-ae5b-fb2bd79d7263.png'
          />
        ) : null}
      </View>
    )
  }
}
