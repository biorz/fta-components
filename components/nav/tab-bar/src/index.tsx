import { View } from '@tarojs/components'
import React, { Component } from 'react'
import { TabBarItemProps, TabBarProps, TabBarState } from '../types'
import './style/index.scss'

class TabBarItem extends Component<TabBarItemProps> {
  render() {
    return <View></View>
  }
}

class TabBar extends Component<TabBarProps, TabBarState> {
  public static defaultProps: TabBarProps
  public static Item: typeof TabBarItem
  public state: TabBarState = {
    _activeIndex: 0,
  }

  public render(): JSX.Element {
    return <View className='fta-tab-bar'>{this.props.children}</View>
  }
}

TabBar.Item = TabBarItem

export { TabBarItem }
export default TabBar
