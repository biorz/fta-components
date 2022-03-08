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
  containerClassName?: string
  containerStyle?: CSSProperties
  safeAreaClassName?: string
  safeAreaStyle?: CSSProperties
  tintColor?: string
  title?: ReactElement | TitleProps
  leftButton?: ReactElement | ButtonProps
  rightButton?: ReactElement | ButtonProps
  style?: CSSProperties
  statusBar?: StatusBarProps
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

export { NavBarButton }

export default NavBar
