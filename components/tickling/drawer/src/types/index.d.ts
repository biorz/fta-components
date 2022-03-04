import AtComponent from '@fta/common/types/base'
import { ComponentClass } from 'react'

export interface DrawerProps extends AtComponent {
  /**
   * 展示或隐藏
   * @default false
   */
  show: boolean
  /**
   * 是否需要遮罩
   * @default true
   */
  mask?: boolean
  /**
   * 抽屉宽度
   * @default 230px
   */
  width?: string
  /**
   * 是否从右侧滑出
   * @default false
   */
  right?: boolean
  /**
   * 菜单列表
   */
  items?: Array<string>
  /**
   * 点击菜单时触发
   */
  onItemClick?: (index: number) => void
  /**
   * 动画结束组件关闭的时候触发
   */
  onClose?: () => void
  /**
   * RN端使用原生Modal组件
   * @default true
   */
  useNativeModal?: boolean
}

export interface DrawerState {
  animShow: boolean
  _show: boolean
}

declare const AtDrawer: ComponentClass<DrawerProps>

export default AtDrawer
