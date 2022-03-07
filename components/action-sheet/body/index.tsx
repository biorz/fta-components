import { View } from '@tarojs/components'
import classNames from 'classnames'
import React from 'react'
import '../../../style/components/action-sheet/body.scss'
import { ActionSheetBodyProps } from '../../../types/action-sheet'

export default class AtActionSheetBody extends React.Component<ActionSheetBodyProps> {
  public render(): JSX.Element {
    const rootClass = classNames('fta-action-sheet__body', this.props.className)
    return <View className={rootClass}>{this.props.children}</View>
  }
}
