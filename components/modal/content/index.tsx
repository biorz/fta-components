import { ScrollView } from '@tarojs/components'
import classNames from 'classnames'
import React from 'react'
import '../../../style/components/modal/content.scss'
import { ModalContentProps } from '../../../types/modal'

export default class AtModalContent extends React.Component<ModalContentProps> {
  public render(): JSX.Element {
    const rootClass = classNames('fta-modal__content', this.props.className)
    return (
      <ScrollView scrollY className={rootClass} style={this.props.customStyle}>
        {this.props.children}
      </ScrollView>
    )
  }
}
