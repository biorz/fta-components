import React from 'react'
import { IButtonProps, IButtonState } from './types'
export default class App extends React.Component<IButtonProps, IButtonState> {
  static defaultProps: {
    size: string
    type: string
    plain: boolean
    disabled: boolean
    shape: string
    hoverStartTime: number
    hoverStayTime: number
    hoverStopPropagation: boolean
    hoverClass: string
    loading: boolean
    lang: string
  }
  render(): JSX.Element
}
