import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { ActionSheetFooterProps } from '../../types'
import './style.scss'
export default class ActionSheetFooter extends React.Component<ActionSheetFooterProps> {
  public static defaultProps: ActionSheetFooterProps
  public static propTypes: InferProps<ActionSheetFooterProps>

  private handleClick = (...args: any[]): void => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(...args)
    }
  }

  public render(): JSX.Element {
    const rootClass = classNames('fta-action-sheet__footer', this.props.className)
    const children = this.props.children

    if (process.env.TARO_ENV !== 'rn') {
      return (
        <View onClick={this.handleClick} className={rootClass}>
          {children}
        </View>
      )
    }
    const fragment =
      typeof children === 'string' ? (
        <Text className='fta-action-sheet__footer__text'>{children}</Text>
      ) : (
        children
      )
    return (
      <View onClick={this.handleClick} className={rootClass}>
        {fragment}
      </View>
    )
  }
}

ActionSheetFooter.propTypes = {
  onClick: PropTypes.func,
}
