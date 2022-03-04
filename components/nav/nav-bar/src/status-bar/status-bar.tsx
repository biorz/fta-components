import React, { Component, Fragment } from 'react'
import { StatusBarProps } from '../../types'

export default class StatusBar extends Component<StatusBarProps> {
  public render() {
    return <Fragment>{this.props.children}</Fragment>
  }
}
