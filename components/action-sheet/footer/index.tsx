import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { isFunction } from '../../../common'
import '../../../style/components/action-sheet/footer.scss'
import { ActionSheetFooterProps } from '../../../types/action-sheet'

export default class ActionSheetFooter extends React.Component<ActionSheetFooterProps> {
  public static defaultProps: ActionSheetFooterProps
  public static propTypes: InferProps<ActionSheetFooterProps>

  private handleClick = (...args: any[]): void => {
    const onClick = this.props.onClick
    if (isFunction(onClick)) {
      onClick!(...args)
    }
  }

  public render(): JSX.Element {
    const rootClass = classNames('fta-action-sheet__footer', this.props.className)
    const children = this.props.children

    const fragment =
      typeof children === 'string' ? (
        <Text className='fta-action-sheet__footer__text'>{children}</Text>
      ) : (
        children
      )
    return (
      <View onClick={this.handleClick} className={rootClass} hoverStyle={{ opacity: 0.6 }}>
        {fragment}
      </View>
    )
  }
}

ActionSheetFooter.defaultProps = {
  // hoverClassName: 'item-active',
}

ActionSheetFooter.propTypes = {
  onClick: PropTypes.func,
}
