import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React from 'react'
import { isString } from '../../../common'
import '../../../style/components/modal/header.scss'
import { ModalHeaderProps } from '../../../types/modal'

export default class ModalHeader extends React.Component<ModalHeaderProps> {
  public render(): JSX.Element {
    const {
      className,
      // @ts-ignore
      style,
      customStyle,
      children,
    } = this.props
    const rootClass = classNames('fta-modal__header', className)
    return (
      <View className={rootClass} style={style}>
        {isString(children) ? (
          <Text style={customStyle} className='fta-modal__header-text'>
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
    )
  }
}
