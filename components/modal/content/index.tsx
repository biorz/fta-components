import { ScrollView } from '@tarojs/components'
import classNames from 'classnames'
import React from 'react'
import '../../../style/components/modal/content.scss'
import { ModalContentProps } from '../../../types/modal'

export default class ModalContent extends React.Component<ModalContentProps> {
  public static defaultProps: ModalContentProps = {
    withTitle: true,
  }
  public render(): JSX.Element {
    const rootClass = classNames(
      'fta-modal__content',
      this.props.withTitle || 'fta-modal__content--no-title',
      this.props.className
    )
    return (
      <ScrollView
        scrollY
        // @ts-ignore
        alwaysBounceVertical={false}
        className={rootClass}
        style={this.props.customStyle}>
        {this.props.children}
      </ScrollView>
    )
  }
}
