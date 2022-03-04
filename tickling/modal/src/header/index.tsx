import { View } from '@tarojs/components'
import classNames from 'classnames'
import React from 'react'
import { ModalHeaderProps } from '../../types'
import '../index.scss'

export default class AtModalHeader extends React.Component<ModalHeaderProps> {
  public render(): JSX.Element {
    const rootClass = classNames('fta-modal__header', this.props.className)
    return <View className={rootClass}>{this.props.children}</View>
  }
}
