import { ComponentType, CSSProperties, FC } from 'react'
import { PropsWithChildren } from './base'
import { NavBarProps } from './nav-bar'
import { SafeAreaViewProps } from './safe-area'

export interface LayoutProps<T = any> extends PropsWithChildren, NavBarProps {
  /**
   * 是否可以滚动（使用ScrollView作为包裹容器）
   * @default true
   */
  scrollable?: boolean
  /**
   * 根结点类名
   */
  rootClassName?: string
  /**
   * 根结点内联样式
   */
  rootStyle?: CSSProperties
  /**
   * 容器类名
   */
  wrapperClassName?: string
  /**
   * 容器内联样式
   */
  wrapperStyle?: CSSProperties
  /**
   * 自定义wrapper组件
   */
  customWrapper?: ComponentType<T>
  /**
   * 安全区相关配置
   */
  safeArea?: Omit<SafeAreaViewProps, 'className' | 'style'>
  /**
   * 安全区类名
   */
  safeAreaClassName?: string
  /**
   * 安全区样式
   */
  safeAreaStyle?: CSSProperties
}

declare const Layout: FC<LayoutProps>

export default Layout
