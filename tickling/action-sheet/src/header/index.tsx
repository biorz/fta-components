import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import React from 'react'
import { ActionSheetHeaderProps } from '../../types'
import './style.scss'

export default class AtActionSheetHeader extends React.Component<ActionSheetHeaderProps> {
  public render(): JSX.Element {
    const rootClass = classNames('fta-action-sheet__header', this.props.className)
    const children = this.props.children
    if (process.env.TARO_ENV !== 'rn') {
      return <View className={rootClass}>{children}</View>
    }
    const fragment =
      typeof children === 'string' ? (
        <Text className='fta-action-sheet__header__text'>{children}</Text>
      ) : (
        children
      )

    return <View className={rootClass}>{fragment}</View>
  }
}
