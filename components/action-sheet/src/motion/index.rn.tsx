import { systemInfo } from '@fta/common'
import React from 'react'
import { Motion, spring } from 'react-motion'
import { Props } from './types'

export default function (props: Props) {
  const { _isOpened, children } = props
  return (
    <Motion
      style={{
        x: spring(_isOpened ? 0 : -systemInfo.windowHeight || -800, {
          stiffness: 400,
          damping: 30,
        }),
      }}>
      {children}
    </Motion>
  )
}
