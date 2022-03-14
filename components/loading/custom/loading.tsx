import { Image, View } from '@tarojs/components'
import classNames from 'classnames'
import React, { CSSProperties } from 'react'
import '../../../style/components/loading/index.scss'
import { CustomLoadingProps } from '../../../types/loading'
import { Assets } from './assets'

export function Loading(props: CustomLoadingProps): JSX.Element {
  const { src, customStyle, className, stop, duration, easing, circle } = props
  const rootClz = classNames('fta-loading--custom', circle && 'fta-loading--circle', className)
  const imageStyle: CSSProperties = { animationDuration: `${duration}s` }
  if (stop) {
    imageStyle.animationPlayState = 'paused'
  }

  imageStyle.animationTimingFunction = Array.isArray(easing)
    ? `cubic-bezier(${easing.toString()})`
    : easing

  return (
    <View className={rootClz} style={customStyle}>
      {<Image className='fta-loading--custom__image' style={imageStyle} src={src!}></Image>}
    </View>
  )
}

Loading.defaultProps = {
  src: Assets.default,
  duration: 1,
  easing: 'linear',
}
