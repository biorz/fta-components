import { ComponentClass } from 'react'

export interface TabBarItemProps {}

export interface TabBarItemOption {
  pagePath?: string
  text?: string
  icon?: string
  selectedIcon?: string
  onClick?: () => void
}

export interface TabBarProps {
  activeIndex: number
  /**
   * tab 上的文字/icon默认颜色
   */
  color: string
  /**
   * tab 上的文字/icon选中时的颜色
   */
  selectedColor: string
  /**
   * tab 的背景色
   */
  backgroundColor: string
  /**
   * tab边框的颜色
   */
  borderStyle?: string
  /**
   * tab 的列表，详见 list 属性说明，最少 2 个、最多 5 个 tab
   */
  list: TabBarItemOption[]
  /**
   * tabBar的位置，仅支持 bottom / top，在fixed属性为true时生效
   */
  position: 'bottom' | 'top'
}

export interface TabBarState {
  _activeIndex: number
}

declare const TabBarItem: ComponentClass<TabBarItemProps>

declare const TabBar: ComponentClass<TabBarProps, TabBarState> & { Item: typeof TabBarItem }

export default TabBar
