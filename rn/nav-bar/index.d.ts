import { ComponentClass, CSSProperties, FC, ReactElement } from 'react'
import { TouchableOpacityProps } from './view'

export interface NavBarButtonProps {
  style?: CSSProperties
  className?: string
  tintColor?: string
  title?: string | number
  handler?(): void
  disabled?: boolean
  accessible?: boolean
  accessibilityLabel?: string
}

export interface ButtonProps {
  /**
   * 按钮文本
   */
  title: string
  /**
   * 按钮样式
   */
  style?: CSSProperties
  /**
   * 按钮类名
   */
  className?: CSSProperties
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 点击事件回调
   */
  handler?(): void

  tintColor?: string

  accessible?: boolean

  accessibilityLabel?: string
}

export interface TitleProps {
  /**
   * 标题文本
   */
  title: string
  /**
   * 背景色
   */
  tintColor?: string
  /**
   * 形状
   */
  ellipsizeMode?: string
  /**
   * 文本行数
   */
  numberOfLines?: number
  /**
   * 点击标题时的回调
   */
  handler?(): void
}

export type StatusBarAnimation = 'fade' | 'slide' | 'none'

export interface StatusBarProps {
  /**
   * 状态栏样式
   */
  style?: 'light-content' | 'default'
  /**
   * 是否隐藏
   * @default false
   */
  hidden?: boolean
  /**
   * 背景色
   */
  tintColor?: string
  /**
   * The background color of the status bar.
   * default system StatusBar background color, or 'black' if not defined
   * @supported Android
   * @default 'black'
   */
  backgroundColor?: string
  /**
   * 隐藏时的动画
   */
  hideAnimation?: StatusBarAnimation
  /**
   * 出现时的动画
   */
  showAnimation?: StatusBarAnimation

  [key: string]: any
}

export interface NavBarProps {
  /**
   * 容器类名
   */
  containerClassName?: string
  /**
   * 容器内联样式
   */
  containerStyle?: CSSProperties
  /**
   * 安全区类名
   */
  safeAreaClassName?: string
  /**
   * 安全区内联样式
   */
  safeAreaStyle?: CSSProperties
  /**
   * 标题颜色
   */
  tintColor?: string
  /**
   * 标题信息
   */
  title?: ReactElement | TitleProps
  /**
   * 左侧按钮
   */
  leftButton?: ReactElement | ButtonProps
  /**
   * 右侧按钮
   */
  rightButton?: ReactElement | ButtonProps
  /**
   * 内部View内联样式
   */
  style?: CSSProperties
  /**
   * 状态栏相关信息
   */
  statusBar?: StatusBarProps
  /**
   * 内部View 类名
   */
  className?: string
}

export interface BackIconProps extends TouchableOpacityProps {
  /**
   * 图标的颜色
   */
  color?: string
}

declare const NavBar: ComponentClass<NavBarProps> & {
  /**
   * 返回 ICON URL
   */
  backIcon: string

  /**
   * 带返回 ICON 的组件
   */
  BackIcon: FC<BackIconProps>
}

declare const NavBarButton: FC<NavBarButtonProps>

export default NavBar

export { NavBarButton }
