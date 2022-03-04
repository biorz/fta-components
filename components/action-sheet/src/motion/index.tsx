import React from 'react'
import { Props } from './types'

export default function (props: Props) {
  return <>{props.children!({ x: 0 })}</>
}
