import { CSSProperties, FC, ReactElement } from 'react'
import BaseComponent, { PropsWithChildren } from './base'

export interface TooltipProps extends BaseComponent, PropsWithChildren {
  /**
   * 显示的内容，可传入自定义节点
   */
  content?: string | ReactElement

  textClassName?: string

  textStyle?: CSSProperties

  contentClassName?: string

  contentStyle?: CSSProperties
  /**
   * 是否显示
   * @default true
   */
  isOpened?: boolean
  /**
   * 自定义三角形图标
   */
  icon?: string

  iconClassName?: string

  iconStyle?: CSSProperties

  popoverClassName?: string

  popoverStyle?: CSSProperties
}

declare const Tooltip: FC<TooltipProps>

export default Tooltip
