import { Text, View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { isFunction, isString } from '../../../../common'
import '../../../../style/components/action-sheet/active.scss'
import '../../../../style/components/action-sheet/body-item.scss'
import { ActionSheetItemProps } from '../../../../types/action-sheet'

export default class ActionSheetItem extends React.Component<ActionSheetItemProps> {
  public static defaultProps: ActionSheetItemProps
  public static propTypes: InferProps<ActionSheetItemProps>

  private handleClick = (args: any): void => {
    const onClick = this.props.onClick
    if (isFunction(onClick)) {
      onClick!(args)
    }
  }

  public render(): JSX.Element {
    const { children, className, textClassName, textStyle, noBorder, hint } = this.props
    const rootClass = classNames('fta-action-sheet__item', noBorder && 'item-no-border', className)
    const textClass = classNames('fta-action-sheet__item__text', textClassName)
    const fragment = isString(children) ? (
      <Text className={textClass} style={textStyle}>
        {children}
      </Text>
    ) : (
      children
    )
    const hintNode = isString(hint) ? (
      <Text className='fta-action-sheet__item__hint'>{hint}</Text>
    ) : (
      hint
    )

    return (
      <View className={rootClass} onClick={this.handleClick} hoverStyle={{ opacity: 0.6 }}>
        {fragment}
        {hint ? hintNode : null}
      </View>
    )
  }
}

ActionSheetItem.propTypes = {
  onClick: PropTypes.func,
}
