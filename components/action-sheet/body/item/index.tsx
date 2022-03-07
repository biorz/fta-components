import { View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import '../../../../style/components/action-sheet/body-item.scss'
import { ActionSheetItemProps } from '../../../../types/action-sheet'

export default class AtActionSheetItem extends React.Component<ActionSheetItemProps> {
  public static defaultProps: ActionSheetItemProps
  public static propTypes: InferProps<ActionSheetItemProps>

  private handleClick = (args: any): void => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(args)
    }
  }

  public render(): JSX.Element {
    const rootClass = classNames('fta-action-sheet__item', this.props.className)

    return (
      <View className={rootClass} onClick={this.handleClick}>
        {this.props.children}
      </View>
    )
  }
}

AtActionSheetItem.propTypes = {
  onClick: PropTypes.func,
}
