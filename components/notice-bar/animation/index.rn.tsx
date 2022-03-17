import React, { FC, useEffect, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import { AnimatedProps } from './type'

export const AnimatedView: FC<AnimatedProps> = ({ children, className, style, duration = 6 }) => {
  const animatedRef = useRef(new Animated.Value(0)).current
  const ref = useRef<any>()

  const run = () => {
    ref.current = Animated.loop(
      Animated.timing(animatedRef, {
        duration: duration * 1000,
        toValue: 1,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    )
    ref.current.start()
  }
  // @ts-ignore
  const trans = animatedRef.interpolate({
    inputRange: [0, 1],
    outputRange: ['400%', '-400%'],
  })

  const composeStyle = [
    { transform: [{ translateX: trans }] },
    // @ts-ignore
    ...style,
    {
      paddingLeft: 0,
    },
  ]

  useEffect(() => {
    run()
    // return ref.current?.stop?.()
  }, [])

  return (
    <Animated.View className={className} style={composeStyle}>
      {children}
    </Animated.View>
  )
}
