import { FC, ReactNode, RefObject } from 'react'

export interface Option {
  label: string
  value?: any
}

export interface BaseDropdown {
  /**
   * 是否对item列表绝对定位，不支持RN
   * @unsupported rn
   * @default true
   */
  absolute?: boolean
  /**
   * 自定义激活时的箭头图标
   */
  arrow?: string
  /**
   * 自定义选中时的对号图标
   */
  check?: string
  /**
   * 选中值改变的回调
   */
  onChange?(prop: string, value: any): any
}

export interface DropdownWithChildren extends BaseDropdown {
  /**
   * 自定义节点
   */
  children?: ReactNode
}

export interface DropdownWithList extends BaseDropdown {
  /**
   * 下拉菜单列表
   */
  list?: DropdownItemProps[]
}

export type DropdownProps = DropdownWithChildren | DropdownWithList

export interface DropdownItemProps {
  /**
   * 当前item标识
   */
  prop?: string
  /**
   * 显示的标题
   */
  title?: string
  /**
   * 列表
   */
  options?: Option[]
  /**
   * 默认激活的索引，设置为-1则默认不聚焦
   */
  activeIndex?: number
  /**
   * 阻止默认展开事件
   * @default false
   * @since 1.0.3-beta.5
   */
  preventDefault?: boolean
  /**
   * menu 点击事件
   * @since 1.0.3-beta.5
   */
  onClick?: () => void
}

export interface DropdownOptionProps {
  /**
   * 展示文本
   */
  children: string
  /**
   * 当前项是否激活
   */
  active?: boolean
  /**
   * 不展示下边框
   */
  borderless?: boolean
  /**
   * 自定义选中图标
   */
  check?: string
  /**
   * 点击当前项的回调
   */
  onClick?: () => any
}

export interface DropdownSideEffectState
  extends Required<Pick<DropdownItemProps, 'options' | 'activeIndex' | 'prop'>>,
    Pick<DropdownItemProps, 'preventDefault'> {
  //  activeItem: number
  /**
   * 是否打开选择面板
   * @private
   */
  isOpened: boolean
  /**
   * 值改变时候的回调
   */
  onChange: (activeIndex: number) => any

  rect: any

  height: number
}

export interface DropdownRef {
  close: () => void
}

export interface DropdownItemRef extends DropdownRef {
  isOpened?: () => boolean
}

export interface DropdownContext extends Pick<DropdownProps, 'arrow' | 'check'> {
  register: <T extends RefObject<any>>(ref: T) => void

  unregister: <T extends RefObject<any>>(ref: T) => void

  toggle: <T extends any, K extends any>(t: T, k?: K) => void

  [key: string]: any
}

declare const Dropdown: FC<DropdownProps>

declare const DropdownItem: FC<DropdownItemProps>

declare const DropdownOption: FC<DropdownOptionProps>

export { Dropdown as default, DropdownItem, DropdownOption }
