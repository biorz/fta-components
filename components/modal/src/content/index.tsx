import { ScrollView } from '@tarojs/components'
import classNames from 'classnames'
import React from 'react'
import { ModalContentProps } from '../../types'
import '../index.scss'

export default class AtModalContent extends React.Component<ModalContentProps> {
  public render(): JSX.Element {
    const rootClass = classNames('fta-modal__content', this.props.className)
    return (
      <ScrollView scrollY className={rootClass}>
        {this.props.children}
      </ScrollView>
    )
  }
}
