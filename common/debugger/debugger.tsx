import { ITouchEvent, View } from '@tarojs/components'
import React, { FC, useRef, useState } from 'react'
import { Text } from '../../components/typography'
import { useConfig } from '../context'
import './debugger.scss'

type Coordinate = [number, number]

const outOfRN = process.env.TARO_ENV !== 'rn'

const getTransformStyle = outOfRN
  ? (offset: Coordinate) => ({
      transform: `translate(${offset[0]}px, ${offset[1]}px)`,
    })
  : (offset: Coordinate) => ({
      transform: [
        {
          translateX: offset[0],
        },
        {
          translateY: offset[1],
        },
      ],
    })

const getNativeEvent = outOfRN ? (evt) => evt : (evt) => evt.nativeEvent

/**
 * Debug面板，生产环境不显示
 */
export const Debugger: FC = () => {
  if (!['dev', 'development'].includes(process.env.NODE_ENV)) return null
  const [offset, setOffset] = useState<Coordinate>([0, 0])
  const start = useRef<Coordinate>([0, 0]).current
  const prev = useRef<Coordinate>([0, 0]).current

  const { toggle, careMode } = useConfig()
  const onTouchStart = (evt: ITouchEvent) => {
    const { changedTouches } = evt
    prev[0] = offset[0]
    prev[1] = offset[1]
    start[0] = changedTouches[0].pageX
    start[1] = changedTouches[0].pageY
  }

  const onTouchMove = (evt: ITouchEvent) => {
    // alert(evt.stopPropagation)
    evt.stopPropagation?.()
    // console.log('evt', evt.nativeEvent)
    const { changedTouches } = getNativeEvent(evt)
    const { pageX, pageY } = changedTouches[0]
    const [x1, y1] = start
    const [x, y] = prev
    setOffset([pageX - x1 + x, pageY - y1 + y])
  }

  // const onTouchEnd = (evt: ITouchEvent) => {
  // start[0] = 0
  // start[1] = 0
  // prev[0] = offset[0]
  // prev[1] = offset[1]
  // const {touches} = evt
  // setOffset([touches[0].clientX, touches[0].clientY])
  // alert('触摸停止')
  // }

  return (
    <View
      // @ts-ignore
      style={getTransformStyle(offset)}
      className='fta-debugger'
      onClick={() => toggle('careMode', !careMode)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}>
      <Text style={{ color: '#999' }}>{careMode ? '关怀' : '标准'}</Text>
    </View>
  )
}
