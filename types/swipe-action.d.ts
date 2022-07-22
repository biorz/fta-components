import { CSSProperties, FC, ReactNode } from 'react'

export interface SwipeActionRef {
  startX: number
  offset: number
  timer: NodeJS.Timer | null
  transitionClass: string
  setOffset(offset: number): void
  show?: boolean
}

export interface SwipeActionOption {
  text: string | number
  containerStyle?: CSSProperties | string
  textStyle?: CSSProperties | string
  containerClassName?: string
  textClassName?: string
  onClick?: () => any
}

export interface SwipeActionProps {
  /**
   * 按钮选项
   * @default []
   */
  options?: SwipeActionOption[]
  /**
   * 控制打开或者关闭
   * @default false
   */
  show?: boolean

  /**
   * 按钮在左侧，右滑打开
   * @default false
   */
  left?: boolean

  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * 最远滑动距离，不指定则自动计算单元格宽度
   * @default null
   */
  distance?: number
  /**
   * 滑动断点，滑动到一定距离后松手自动展开或收起
   * @default 0.5
   */
  breakpoint?: number
  /**
   * 自定义渲染按钮区
   */
  render?: ReactNode
  /**
   * 按钮区域是否跟随移动
   * @default false
   */
  follow?: boolean
  /**
   * 包裹层类名
   */
  className?: string
  /**
   * 包裹层样式
   */
  style?: CSSProperties
  /**
   * 滑动层类名
   */
  swipeClassName?: string
  /**
   * 滑动层样式
   */
  swipeStyle?: CSSProperties
  /**
   * 打开或者关闭时候的回调
   */
  onToggle?: (isOpened: boolean) => void

  children?: ReactNode
}

declare const SwipeAction: FC<SwipeActionProps>

export default SwipeAction
