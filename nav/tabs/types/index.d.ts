import { ComponentClass, CSSProperties } from 'react'

interface FTAComponentProps {
  /**
   * 类名
   */
  className?: string
  /**
   * 内联样式
   */
  style?: CSSProperties
}

export interface TabsContext {
  /**
   * 激活时的样式
   */
  activeClassName?: string
  /**
   * 是否全部禁用
   * @default false
   */
  disabled?: boolean
  /**
   * 禁用时类名
   */
  disabledClassName?: string
  /**
   * tab项的类名
   */
  tabClassName?: string
  /**
   * 当前激活的索引
   */
  activeIndex?: number
  /**
   * 是否可以滚动
   * @default false
   */
  scrollable?: boolean
  /**
   * 水平排列还是垂直排列
   * @default false
   */
  vertical?: boolean
  /**
   * 切换tab时的回调
   */
  onChange?(active: number, value: any): void
}

// export type TabsMode = 'horizontal' | 'vertical'

export interface TabOption extends FTAComponentProps {
  /**
   * 标签文本或节点
   */
  label?: ReactNode
  /**
   * 标签绑定的值
   */
  value?: any
  /**
   * 是否禁用当前选项卡
   * @default false
   */
  disabled?: boolean
  /**
   * 文本类名
   */
  labelClassName?: string
  /**
   * 文本内联样式
   */
  labelStyle?: CSSProperties
}
export interface TabsProps extends FTAComponentProps, TabsContext {
  /**
   * json形式的tab列表，优先级高于插槽子元素
   */
  options?: (TabOption | string | number | boolean)[]
  /**
   * 是否是受控组件
   * @default true
   */
  controls?: boolean
  /**
   * tab项的类名，仅在options为`string[]`时生效
   */
  // tabClassName?: string
}

export interface TabsState {
  /**
   * 非受控组件当前的索引
   */
  _activeIndex?: number
}

export interface TabProps extends FTAComponentProps {
  /**
   * 是否禁用当前选项卡
   * @default false
   */
  disabled?: boolean
  /**
   * 是否是激活状态
   * @default false
   */
  active?: boolean
  /**
   * 当前tab的索引
   */
  index?: number
  /**
   * 当前tab绑定的值
   */
  value?: any
}

declare const Tab: ComponentClass<TabProps>

declare const Tabs: ComponentClass<TabsProps> & {
  Tab: typeof Tab
}

export { Tab }

export default Tabs
