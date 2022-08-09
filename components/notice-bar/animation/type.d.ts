import { CSSProperties } from 'react'
import BaseComponent, { PropsWithChildren } from 'types/base'

export interface AnimatedProps extends BaseComponent, PropsWithChildren {
  style?: CSSProperties

  duration?: number
}

export interface VerticalProps extends AnimatedProps {
  length: number

  onAnimEnd(): any
}
