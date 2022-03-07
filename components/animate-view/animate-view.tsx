import { View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { mergeStyle } from '../../common'
import { AnimateEasing, AnimateItem, AtAnimateViewProps } from '../../types/animate-view'

const s2ms = (val: number) => val / 1000

export default function AnimateView(props: AtAnimateViewProps) {
  const { play, config } = props
  const { styleStr } = formatConfig(config, false)
  const [style, setStyle] = React.useState(styleStr)

  React.useEffect(() => {
    // console.log('useEffect', play)
    if (!play) return

    const { styleStr, transitionStr } = formatConfig(config, true)

    setTimeout(() => {
      setStyle(`${styleStr};${transitionStr}`)
    }, 1)
  }, [play, config])

  return (
    <View className={classNames(props.className)} style={mergeStyle(props.style, style)}>
      {props.children}
    </View>
  )
}

AnimateView.defaultProps = {
  config: null,
  play: true,
  onClick: Function,
}

AnimateView.propTypes = {
  config: PropTypes.array,
  play: PropTypes.bool,
}

function getAnimateEasing(easing?: AnimateEasing | string) {
  return easing || 'linear'
}

function formatConfig(config: AnimateItem[], play: boolean) {
  const style = {}
  const transitionStyle = {}
  config.forEach((item) => {
    const { type, start, end, duration = 0, delay = 0, easing } = item

    const [key, valueKey] = type.split(':')
    const value = play ? end : start

    if (valueKey) {
      style[key] = style[key] || []
      style[key].push({
        key: valueKey,
        value,
      })
    } else {
      style[key] = value
    }

    transitionStyle[key] = `${s2ms(duration)}s ${getAnimateEasing(easing)} ${s2ms(delay)}s`
  })

  const styleStr = Object.entries(style)
    .map((item) => {
      let [key, value] = item
      if (value instanceof Array) {
        value = value.map(({ key, value }) => `${key}(${value})`).join(' ')
      }
      return `${key}:${value}`
    })
    .join(';')

  const transitionStr =
    'transition:' +
    Object.entries(transitionStyle)
      .map(([key, value]) => {
        return `${key} ${value}`
      })
      .join(',')

  return { styleStr, transitionStr }
}
