import { FC } from 'react'
import BaseComponent, { PropsWithChildren } from './base'

export interface ModalProps {
  /**
   * 是否使用固定定位，rn中使用Modal组件包裹
   * @default true
   */
  fixed?: boolean
  /**
   * 是否显示遮罩层
   */
  show?: boolean

  [key: string]: any
}

export interface OverlayProps extends BaseComponent, PropsWithChildren, ModalProps {
  /**
   * 透明度
   */
  opacity?: number
  /**
   * 背景色（rgba等色彩也可以实现半透明效果）
   */
  bgColor?: string
  /**
   * 组件层级
   * @default 99
   */
  zIndex?: number
  /**
   * 子节点是否居中显示
   * @default false
   */
  center?: boolean
  /**
   * 点击遮罩层时的回调
   */
  onClick?: () => void
}

declare const Overlay: FC<OverlayProps>

export default Overlay
