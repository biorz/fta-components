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
    const { withTitle, className, style, customStyle, children } = this.props
    const rootClass = classNames(
      'fta-modal__content',
      withTitle || 'fta-modal__content--no-title',
      className
    )

    const rootStyle = {
      ...style,
      ...customStyle,
    }
    return (
      <ScrollView
        scrollY
        // @ts-ignore
        alwaysBounceVertical={false}
        className={rootClass}
        style={rootStyle}>
        {children}
      </ScrollView>
    )
  }
}
