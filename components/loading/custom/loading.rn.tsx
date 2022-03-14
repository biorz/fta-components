import { View } from '@tarojs/components'
import classNames from 'classnames'
import React, { useEffect, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import '../../../style/components/loading/index.scss'
import { CunstomLoadingEasing, CustomLoadingProps } from '../../../types/loading'
import { Assets } from './assets'

const EASING: Record<CunstomLoadingEasing, any> = {
  ease: Easing.inOut(Easing.ease),
  linear: Easing.linear,
  'ease-in': Easing.in(Easing.ease),
  'ease-out': Easing.out(Easing.ease),
  'ease-in-out': Easing.inOut(Easing.ease),
}

export function Loading(props: CustomLoadingProps): JSX.Element {
  const angleAnim = useRef<number>(new Animated.Value(0)).current
  const animateRef = useRef({
    stop: () => {},
    start: () => {},
  })

  const { src, customStyle, className, stop, duration, easing, circle } = props

  const run = () => {
    animateRef.current = Animated.loop(
      Animated.timing(angleAnim, {
        duration: duration! * 1000,
        toValue: 1,
        useNativeDriver: false,
        easing: EASING[easing as CunstomLoadingEasing] || Easing.bezier.apply(easing),
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

  const rootClz = classNames('fta-loading--custom', className)
  return (
    <View className={rootClz} style={{ ...customStyle, borderRadius: circle ? 1000 : 0 }}>
      <Animated.Image
        source={{ uri: src }}
        className='fta-loading--custom__image'
        style={[{ transform: [{ rotate: spin }] }]}></Animated.Image>
    </View>
  )
}

Loading.defaultProps = {
  src: Assets.default,
  duration: 1,
  easing: 'linear',
}
