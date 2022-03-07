import React, { Component, Fragment } from 'react'
import { StatusBarProps } from '../../../types/nav-bar'

export default class StatusBar extends Component<StatusBarProps> {
  public render() {
    return <Fragment>{this.props.children}</Fragment>
  }
}
