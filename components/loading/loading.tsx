import { Image, View } from '@tarojs/components'
import classNames from 'classnames'
import React, { CSSProperties } from 'react'
import '../../style/components/loading/index.scss'
import { LoadingProps } from '../../types/loading'
import { Assets } from './assets'

function Loading(props: LoadingProps): JSX.Element {
  const { src, customStyle, className, stop, duration, easing, circle, useImage, size, color } =
    props
  const rootClz = classNames(
    'fta-loading',
    `fta-loading--${size}`,
    circle && 'fta-loading--circle',
    className
  )
  const imageStyle: CSSProperties = { animationDuration: `${duration}s` }
  if (stop) {
    imageStyle.animationPlayState = 'paused'
  }
  if (color) {
    imageStyle.borderColor = color
    imageStyle.borderLeftColor = 'transparent'
  }

  imageStyle.animationTimingFunction = Array.isArray(easing)
    ? `cubic-bezier(${easing.toString()})`
    : easing

  return (
    <View className={rootClz} style={customStyle}>
      {useImage ? (
        <Image className='fta-loading__image' style={imageStyle} src={src!} />
      ) : (
        <View
          className={classNames('fta-loading__view', `fta-loading__view--${size}`)}
          style={imageStyle}
        />
      )}
    </View>
  )
}

Loading.defaultProps = {
  src: Assets.default,
  duration: 1,
  easing: 'linear',
  size: 'medium',
}

export default Loading
