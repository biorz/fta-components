import { CSSProperties, FC, ForwardRefExoticComponent, ReactElement } from 'react'
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

export interface Rect {
  width: number
  height: number
  x: number
  y: number
  bottom: number
  top: number
  right: number
  left: number
}

export type TooltipViewProps = {
  children: ReactElement
  /**
   * 自定义渲染tooltip
   */
  render?: ReactElement | ((rect: Rect) => ReactElement)
  /**
   * 是否显示遮罩层
   * @default false
   */
  overlay?: boolean

  overlayClassName?: string

  overlayStyle?: CSSProperties

  /**
   * 点击遮罩层关闭
   * @default true
   */
  clickOverlayOnClose?: boolean
}
export interface TooltipViewRefMethods {
  /**
   * 显示tooltip
   */
  show(): void
  /**
   * 隐藏tooltip
   */
  hide(): void
  /**
   * 重新定位
   */
  measure(): void
}

declare const Tooltip: FC<TooltipProps>

declare const TooltipView: ForwardRefExoticComponent<TooltipViewProps & Ref<TooltipViewRefMethods>>

declare function withTooltip<P>(Component: ComponentType<P>): FC<P>

export { Tooltip as default, TooltipView, withTooltip }
