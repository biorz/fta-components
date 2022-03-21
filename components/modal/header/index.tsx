import { View } from '@tarojs/components'
import classNames from 'classnames'
import React from 'react'
import '../../../style/components/modal/header.scss'
import { ModalHeaderProps } from '../../../types/modal'

export default class ModalHeader extends React.Component<ModalHeaderProps> {
  public render(): JSX.Element {
    const rootClass = classNames('fta-modal__header', this.props.className)
    return (
      <View className={rootClass} style={this.props.customStyle}>
        {this.props.children}
      </View>
    )
  }
}
