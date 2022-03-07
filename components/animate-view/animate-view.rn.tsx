import PropTypes from 'prop-types'
import React from 'react'
import { Animated, Easing } from 'react-native'
import { transformIfPx } from '../../common'
import { AnimateEasing, AnimateItem, AtAnimateViewProps } from '../../types/animate-view'

export default function AnimateView(props: AtAnimateViewProps) {
  const { play, config } = props
  const { animatedConfig, animatedStyle } = formatConfig(config)
  const [style] = React.useState(animatedStyle)
  React.useEffect(() => {
    // console.log('useEffect play', play)
    if (!play) {
      //  setStyle(animatedStyle)
      return
    }

    Animated.parallel(
      animatedConfig.map((item) => Animated.timing.apply(Animated, item)),
      {
        stopTogether: false,
      }
    ).start()

    // console.log('useEffect start')
  }, [play])

  return (
    <Animated.View style={mergeStyle(props.style || {}, style)}>{props.children}</Animated.View>
  )
}

AnimateView.defaultProps = {
  config: null,
  play: true,
}

AnimateView.propTypes = {
  config: PropTypes.array,
  play: PropTypes.bool,
}

function formatConfig(config: AnimateItem[]): { animatedConfig: any; animatedStyle: Object } {
  if (!config || !config.length) return { animatedConfig: [], animatedStyle: {} }
  const animatedConfig = [] // animated config
  const animatedStyle = {} // animated component style
  config.forEach((item) => {
    const { type, start, end, duration, delay, easing, useNativeDriver } = item
    const animatedValue = new Animated.Value(transformIfPx(start))
    animatedConfig.push([
      animatedValue,
      {
        toValue: transformIfPx(end),
        duration: duration,
        delay: delay || 0,
        easing: getAnimateEasing(easing),
        useNativeDriver: useNativeDriver || false,
      },
    ])

    const [key, valueKey] = type.split(':')
    if (valueKey) {
      animatedStyle[key] = animatedStyle[key] || []
      animatedStyle[key].push({
        [valueKey]: animatedValue,
      })
    } else {
      animatedStyle[key] = animatedValue
    }
  })
  return { animatedConfig, animatedStyle }
}

// todo: ease 自定曲线
function getAnimateEasing(easing: AnimateEasing) {
  switch (easing) {
    case 'linear':
      return null
    case 'ease-in':
      return Easing.in(Easing.ease)
    case 'ease-out':
      return Easing.out(Easing.ease)
    case 'ease':
    case 'ease-in-out':
      return Easing.inOut(Easing.ease)
  }
}

export function mergeStyle(source = {}, target = {}) {
  source = (Array.isArray(source) ? source : [source]).concat(target)
  return (source as Object[]).reduce((pre, cur) => Object.assign(pre, cur), {})
}
