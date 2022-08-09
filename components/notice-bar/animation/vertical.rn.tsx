import React, { FC, useEffect, useRef, useState } from 'react'
import { Animated, Easing } from 'react-native'
import { VerticalProps } from './type'

export const VerticalView: FC<VerticalProps> = ({
  children,
  className,
  style = {},
  duration = 1,
  length,
  onAnimEnd,
}) => {
  const animatedRef = useRef(new Animated.Value(0)).current
  const ref = useRef<any>()
  const [anim, setAnim] = useState(true)
  const [height, setHeight] = useState(0)

  const run = (callback?) => {
    // ref.current = Animated.loop(
    ref.current = Animated.timing(animatedRef, {
      duration: 1000,
      toValue: 1,
      useNativeDriver: true,
      easing: Easing.linear,
    })
    // )
    ref.current.start(callback)
  }

  const recover = () => {
    animatedRef.setValue(0)
  }

  // @ts-ignore
  const trans = animatedRef.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -height / length],
  })

  const onLayout = (e) => {
    setHeight(e.nativeEvent.layout.height)
  }

  const composeStyle = [
    { transform: [{ translateY: trans }] },
    // @ts-ignore
    style,
    {
      paddingLeft: 0,
    },
  ]

  const runAnimation = () => {
    anim &&
      run(() => {
        onAnimEnd()
        recover()
        setAnim(false)
        setTimeout(runAnimation, duration * 1000)
      })
  }
  useEffect(() => {
    setTimeout(runAnimation, duration * 1000)
    // return ref.current?.stop?.()
  }, [anim])

  return (
    <Animated.View className={className} style={composeStyle} onLayout={onLayout}>
      {children}
    </Animated.View>
  )
}
