import React, { useEffect, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import { Props } from './types'

// export function PolyMotion(props: Props) {
//   const { _isOpened, children } = props
//   return (
//     <Motion
//       style={{
//         x: spring(_isOpened ? 0 : -systemInfo.windowHeight || -800, {
//           stiffness: 400,
//           damping: 30,
//         }),
//       }}>
//       {children}
//     </Motion>
//   )
// }

export default function (props: Props): JSX.Element {
  const {
    _isOpened,
    children,
    // @ts-ignore
    style,
    customStyle,
  } = props
  const offsetAnim = useRef(new Animated.Value(0)).current
  const offset = offsetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  })

  const run = (toValue: number) => {
    offsetAnim.setValue(1 - toValue)
    Animated.timing(offsetAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.bezier(0.36, 0.66, 0.04, 1),
    }).start()
  }

  useEffect(() => {
    if (_isOpened) {
      run(1)
    } else {
      run(0)
    }
  }, [_isOpened])

  return (
    <Animated.View style={[{ transform: [{ translateY: offset }] }, style, customStyle]}>
      {children}
    </Animated.View>
  )
}
