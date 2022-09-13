import { View } from '@tarojs/components'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import '../../style/components/icon/index.scss'
import '../../style/components/list/list.scss'
import { ListProps } from '../../types/list'
import ListItem from './list-item'
export { ListItem }

export default class List extends React.Component<ListProps> {
  public static defaultProps: ListProps
  public static propTypes: InferProps<ListProps>
  // public static Item: typeof AtListItem

  public render(): JSX.Element {
    const rootClass = classNames(
      'fta-list',
      {
        'fta-list--no-border': !this.props.hasBorder,
      },
      this.props.className
    )

    return <View className={rootClass}>{this.props.children}</View>
  }
}

List.defaultProps = {
  hasBorder: true,
}

List.propTypes = {
  hasBorder: PropTypes.bool,
}
