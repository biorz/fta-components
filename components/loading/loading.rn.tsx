import { View } from '@tarojs/components'
import classNames from 'classnames'
import React, { useEffect, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import { inAndroid } from '../../common'
import '../../style/components/loading/index.scss'
import { BaseEasing, LoadingProps } from '../../types/loading'
import { Assets } from './assets'

const EASING: Record<BaseEasing, any> = {
  ease: Easing.inOut(Easing.ease),
  linear: Easing.linear,
  'ease-in': Easing.in(Easing.ease),
  'ease-out': Easing.out(Easing.ease),
  'ease-in-out': Easing.inOut(Easing.ease),
}

function Loading(props: LoadingProps): JSX.Element {
  const angleAnim = useRef<number>(new Animated.Value(0)).current
  const animateRef = useRef({
    stop: () => {},
    start: () => {},
  })

  const {
    src,
    customStyle,
    className,
    stop,
    duration,
    easing,
    circle,
    useImage,
    size,
    color,
    tintColor,
  } = props

  const run = () => {
    animateRef.current = Animated.loop(
      Animated.timing(angleAnim, {
        duration: duration! * 1000,
        toValue: 1,
        useNativeDriver: false,
        easing: EASING[easing as BaseEasing] || Easing.bezier.apply(easing),
      })
    )
    animateRef.current.start()
  }
  // @ts-ignore
  const spin = angleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  useEffect(() => {
    stop ? animateRef.current.stop?.() : run()
    return animateRef.current.stop
  }, [stop])

  const rootClz = classNames('fta-loading', `fta-loading--${size}`, className)
  const borderStyle = color
    ? {
        borderTopColor: color,
        borderRightColor: color,
        borderBottomColor: color,
        borderLeftColor: 'transparent',
      }
    : {}
  return (
    <View className={rootClz} style={{ ...customStyle, borderRadius: circle ? 1000 : 0 }}>
      {useImage ? (
        <Animated.Image
          source={{ uri: src }}
          className='fta-loading__image'
          style={[{ transform: [{ rotate: spin }] }]}
        />
      ) : (
        <Animated.View
          className={classNames('fta-loading__view', `fta-loading__view--${size}`)}
          style={{ transform: [{ rotate: spin }], ...borderStyle }}>
          {inAndroid ? (
            <View
              style={{
                width: '100%',
                height: '100%',
                top: '50%',
                left: '50%',
                backgroundColor: tintColor,
              }}
            />
          ) : null}
        </Animated.View>
      )}
    </View>
  )
}

Loading.defaultProps = {
  size: 'medium',
  src: Assets.default,
  duration: 1,
  easing: 'linear',
  tintColor: '#fff',
}

export default Loading
