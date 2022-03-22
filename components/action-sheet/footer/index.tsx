import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { isFunction } from '../../../common'
import '../../../style/components/action-sheet/footer.scss'
import { ActionSheetFooterProps } from '../../../types/action-sheet'
import Button from '../../button'

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
    const { children, className, onConfirm, confirmText, icon } = this.props
    if (icon && confirmText) {
      return (
        <View className='fta-action-sheet-footer'>
          {/* <TouchableOpacity onClick={onConfirm} className='fta-action-sheet-footer-button'>
            <Text className='fta-action-sheet-footer-button__text'>{confirmText}</Text>
          </TouchableOpacity> */}
          <Button size='large' type='primary' onClick={onConfirm}>
            {confirmText}
          </Button>
        </View>
      )
    }
    const rootClass = classNames('fta-action-sheet__footer', className)

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
